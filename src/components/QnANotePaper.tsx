import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './shadcn/dialog';
import { NOTE_COLORS } from '../enums/note-colors';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import { ref, set, remove } from 'firebase/database';
import { db, adminUid } from '../services/firebaseService';

export interface QnANote {
  id: string; 
  name: string;
  content: string;
  color: string;
  isComplete: boolean;
  uid: string;
}

export default function QnANotePaper({ name, content, color, isComplete, id, uid }: QnANote) {
  const [isOpen, setIsOpen] = useState(false);
  const currentUid = useAuthStore((s) => s.uid);

  const noteColor = color || NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];

  // Check permissions: Admin, author of the question, or running in local dev mode
  const isDev = import.meta.env.DEV;
  const canComplete = currentUid === adminUid || currentUid === uid || isDev;
  const canDelete = currentUid === adminUid || currentUid === uid || isDev;

  const completeNote = useMutation({
    mutationFn: async () => {
      if (!canComplete) {
        alert("Bạn không có quyền đánh dấu hoàn thành câu hỏi này!");
        return;
      }
      
      try {
        const isCompleteRef = ref(db, `notes/${id}/isComplete`);
        await set(isCompleteRef, true);
      } catch (err) {
        console.warn("Firebase set failed, falling back to localStorage:", err);
        const completedLocal = JSON.parse(localStorage.getItem("completed_notes") || "{}");
        completedLocal[id] = true;
        localStorage.setItem("completed_notes", JSON.stringify(completedLocal));
        
        window.dispatchEvent(new Event("local-notes-updated"));
      }
    },
    onSuccess: () => {
      setIsOpen(false);
    }
  });

  const deleteNote = useMutation({
    mutationFn: async () => {
      if (!canDelete) {
        alert("Bạn không có quyền xóa câu hỏi này!");
        return;
      }

      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?");
      if (!confirmDelete) {
        return;
      }
      
      try {
        const noteRef = ref(db, `notes/${id}`);
        await remove(noteRef);
      } catch (err) {
        console.warn("Firebase delete failed, falling back to localStorage:", err);
        const deletedLocal = JSON.parse(localStorage.getItem("deleted_notes") || "{}");
        deletedLocal[id] = true;
        localStorage.setItem("deleted_notes", JSON.stringify(deletedLocal));
        
        window.dispatchEvent(new Event("local-notes-updated"));
      }
    },
    onSuccess: () => {
      setIsOpen(false);
    }
  });

  // Color glow mapping
  const colorGlowMap: Record<string, { label: string; textClass: string; bgBadge: string }> = {
    '#fef3c7': { label: 'Học tập', textClass: 'text-amber-800', bgBadge: 'bg-amber-100/80 border-amber-200/50' },
    '#bbf7d0': { label: 'Góp ý', textClass: 'text-emerald-800', bgBadge: 'bg-emerald-100/80 border-emerald-200/50' },
    '#bfdbfe': { label: 'Thảo luận', textClass: 'text-sky-800', bgBadge: 'bg-sky-100/80 border-sky-200/50' },
    '#fce7f3': { label: 'Câu hỏi', textClass: 'text-rose-800', bgBadge: 'bg-rose-100/80 border-rose-200/50' },
    '#c7d2fe': { label: 'Đóng góp', textClass: 'text-indigo-800', bgBadge: 'bg-indigo-100/80 border-indigo-200/50' },
    '#d9f99d': { label: 'Ý tưởng', textClass: 'text-lime-800', bgBadge: 'bg-lime-100/80 border-lime-200/50' },
  };

  const styleGlow = colorGlowMap[noteColor] || colorGlowMap['#fef3c7'];
  const rotateAngle = ((id.charCodeAt(0) || 0) + (id.charCodeAt(id.length - 1) || 0)) % 6 - 3;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="group relative w-full h-56 rounded-md p-6 pt-8 border border-[#d3c29d] bg-[#fbf5e6] flex flex-col justify-between shadow-[2px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[4px_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          style={{
            transform: `rotate(${rotateAngle}deg)`,
            backgroundImage: "repeating-linear-gradient(to bottom, rgba(78,58,36,0.03) 0 1px, transparent 1px 24px)",
            backgroundSize: "100% 24px",
          }}
        >
          {/* Brass Pin / Tack at the top */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10">
            <div className="w-3.5 h-3.5 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.35)] border border-amber-800/40 relative">
              <div className="w-1 h-1 bg-white/50 rounded-full absolute top-0.5 left-0.5" />
            </div>
          </div>

          {/* Paper Corner fold overlay */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-transparent via-[#ebdcb9] to-[#ebdcb9] rounded-bl shadow-[0_1px_2px_rgba(0,0,0,0.1)] pointer-events-none" />

          {/* Header */}
          <div className="border-b border-[#ebdcb9] pb-2 mb-2">
            <h3 className="font-serif font-bold text-[#4e3a24] text-base truncate pr-4">
              {name}
            </h3>
            <span className={`text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded border ${styleGlow.bgBadge} ${styleGlow.textClass}`}>
              {styleGlow.label}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            <p className="text-xs text-[#5c4a37] font-medium leading-relaxed whitespace-pre-wrap h-full overflow-y-auto scrollbar-none pr-1">
              {content}
            </p>

            {isComplete && (
              <div className="absolute right-0 bottom-0 border-2 border-red-600/35 text-red-600/45 text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded rotate-[-12deg] select-none bg-[#fbf5e6]/90 shadow-sm">
                ĐÃ DUYỆT
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col bg-[#fbf5e6] border border-[#d3c29d] text-[#4e3a24] shadow-2xl rounded-xl p-6">
        <DialogHeader className="border-b border-[#ebdcb9] pb-4">
          <div className="flex items-center justify-between mt-2">
            <DialogTitle className="text-2xl font-serif font-bold text-[#4e3a24]">
              {name}
            </DialogTitle>
            <span className={`text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded border ${styleGlow.bgBadge} ${styleGlow.textClass}`}>
              {styleGlow.label}
            </span>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 py-6">
          <div className="flex-1 p-5 rounded-lg bg-[#faf0d7] border border-[#e5d8b8] overflow-y-auto custom-scrollbar">
            <p className="text-[#5c4a37] leading-relaxed whitespace-pre-wrap text-sm font-medium">
              {content}
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center gap-2 border-t border-[#ebdcb9] pt-4">
          {isComplete ? (
            <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Vấn đề đã thông suốt
            </span>
          ) : (
            <span className="text-xs font-medium text-amber-800/60">
              Chờ ý kiến luận đàm...
            </span>
          )}
          <div className="flex gap-2 ml-auto">
            {canComplete && !isComplete && (
              <button
                onClick={() => completeNote.mutate()}
                disabled={completeNote.isPending}
                className="px-4 py-2 rounded bg-amber-700 hover:bg-amber-800 text-[#fbf5e6] font-bold text-xs tracking-wider uppercase transition-colors duration-200 disabled:opacity-50 cursor-pointer shadow"
              >
                {completeNote.isPending ? 'Xử lý...' : 'Đã giải đáp'}
              </button>
            )}
            
            {canDelete && (
              <button
                onClick={() => deleteNote.mutate()}
                disabled={deleteNote.isPending}
                className="px-4 py-2 rounded border border-red-800/30 bg-red-50 hover:bg-red-100 text-red-800 font-bold text-xs tracking-wider uppercase transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                {deleteNote.isPending ? 'Xóa...' : 'Xóa bỏ'}
              </button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
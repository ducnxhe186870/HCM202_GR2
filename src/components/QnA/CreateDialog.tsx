import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip"
import { Input } from "../shadcn/input"
import { Textarea } from "../shadcn/textarea"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../../stores/authStore"
import { push, ref, set } from "firebase/database"
import { db } from "../../services/firebaseService"
import { NOTE_COLORS } from "../../enums/note-colors"


export default function CreateDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const uid = useAuthStore((s) => s.uid);

  const createNote = useMutation({
    mutationFn: async () => {
      const trimmedName = name.trim();
      const trimmedContent = content.trim();
      if (!trimmedName || !trimmedContent) {
        alert("Please fill name and content");
        return;
      }

      if (!uid) {
        alert("Auth not ready yet. Please refresh or try again.");
        return;
      }

      const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];

      const notesRef = ref(db, "notes");
      const newRef = push(notesRef);
      await set(newRef, {
        name: name,
        content: content,
        color: color,
        uid: uid,
        isComplete: false
      });

      return newRef.key;
    },
    onSuccess: () => { setName(""); setContent(""); setIsOpen(false)},
    onError: (err) => {console.error("create note error:", err); alert("Failed to create note. See console for details.");}
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="group flex justify-center items-center cursor-pointer transform-gpu will-change-transform">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer z-10 inline-flex items-center justify-center w-14 h-14 rounded-full border 
          border-amber-500/30 bg-gradient-to-br from-amber-600 to-amber-900 text-amber-100 shadow-lg transition-all 
          duration-200 ease-out hover:shadow-amber-500/10 group-hover:scale-[1.05] active:scale-95 
          focus:outline-none focus:ring-2 focus:ring-amber-500/40">
              <Plus className="w-7 h-7" />
            </div>
          </TooltipTrigger>

          <TooltipContent side="right" sideOffset={12}>
            <p className="font-bold text-xs bg-[#12131a] text-amber-400 border border-amber-900/30 px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-wider">
              Tạo câu hỏi
            </p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      
      <DialogContent className="bg-[#fbf5e6] border border-[#d3c29d] text-[#4e3a24] w-110 p-6 rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-[#4e3a24]">
            Tạo câu hỏi mới
          </DialogTitle>
          <DialogDescription className="mt-4" asChild>
            <form onSubmit={(e) => { e.preventDefault(); createNote.mutate() }}>
              <div className="flex flex-col justify-start items-start gap-5">
                <div className="grid w-full items-center gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-[#5c4a37]">Tên nhóm / Tác giả</label>
                  <Input 
                    disabled={createNote.isPending} 
                    type="text" 
                    id="name" 
                    placeholder="Ví dụ: Nhóm 1, Nguyễn Văn A..." 
                    required
                    className="focus-visible:ring-1 focus-visible:ring-amber-700 bg-[#faf0d7] border-[#d3c29d] text-[#4e3a24] placeholder:text-[#8a765d]/50 disabled:opacity-50"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>

                <div className="grid w-full items-center gap-2">
                  <label htmlFor="content" className="text-sm font-semibold text-[#5c4a37]">Nội dung câu hỏi / ý kiến</label>
                  <Textarea 
                    disabled={createNote.isPending} 
                    id="content" 
                    placeholder="Nhập nội dung câu hỏi hoặc ý kiến của bạn..." 
                    required
                    className="bg-[#faf0d7] border-[#d3c29d] text-[#4e3a24] placeholder:text-[#8a765d]/50 focus-visible:ring-1 focus-visible:ring-amber-700 h-32 overflow-auto custom-scrollbar disabled:opacity-50"
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                  />
                </div>
              </div>

              <button 
                disabled={createNote.isPending} 
                type="submit" 
                className="mt-6 w-full bg-amber-700 hover:bg-amber-800 text-[#fbf5e6] font-bold py-2.5 rounded cursor-pointer transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs"
              >
                {createNote.isPending ? 'Đang gửi...' : 'Gửi câu hỏi'}
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

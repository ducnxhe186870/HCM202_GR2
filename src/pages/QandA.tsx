import { useStore } from "zustand";
import { AnimatedGridPattern } from "../components/magicui/Backgrounds/AnimatedGridPattern";
import { cn } from "../utils/cn";
import { useAuthStore } from "../stores/authStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import QnANotePaper, { type QnANote } from "../components/QnANotePaper";
import CreateDialog from "../components/QnA/CreateDialog";
import { db } from "../services/firebaseService"; 
import {
  ref as dbRef,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off as dbOff,
  DataSnapshot,
} from "firebase/database";

export default function QandA() {
  const [notes, setNotes] = useState<QnANote[]>([]);

  const { user, loading } = useStore(useAuthStore);

  useEffect(() => {
    if (user) {
      console.log("Your UID:", user.uid);
    } else {
      console.log("No user yet — waiting for auth...");
    }
  }, [user]);

  useEffect(() => {
    const handleLocalUpdate = () => {
      setNotes((prev) => {
        const completedLocal = JSON.parse(localStorage.getItem("completed_notes") || "{}");
        const deletedLocal = JSON.parse(localStorage.getItem("deleted_notes") || "{}");
        
        return prev
          .filter((n) => !deletedLocal[n.id])
          .map((n) => (completedLocal[n.id] ? { ...n, isComplete: true } : n));
      });
    };
    
    window.addEventListener("local-notes-updated", handleLocalUpdate);
    return () => window.removeEventListener("local-notes-updated", handleLocalUpdate);
  }, []);

  useEffect(() => {
    const notesRef = dbRef(db, "notes");

    const snapToNote = (snap: DataSnapshot): QnANote | null => {
      const val = snap.val();
      if (!val) return null;
      const noteId = snap.key as string;

      // Check if deleted locally
      const deletedLocal = JSON.parse(localStorage.getItem("deleted_notes") || "{}");
      if (deletedLocal[noteId]) return null;

      const completedLocal = JSON.parse(localStorage.getItem("completed_notes") || "{}");
      return {
        id: noteId,
        name: val.name,
        content: val.content,
        color: val.color,
        uid: val.uid,
        isComplete: !!val.isComplete || !!completedLocal[noteId],
      };
    };

    // child added
    const unsubAdded = onChildAdded(notesRef, (snap) => {
      const note = snapToNote(snap);
      if (!note) return;
      setNotes((prev) => {
        // avoid duplicates
        if (prev.find((n) => n.id === note.id)) return prev;
        return [...prev, note];
      });
    });

    // child changed
    const unsubChanged = onChildChanged(notesRef, (snap) => {
      const note = snapToNote(snap);
      if (!note) return;
      setNotes((prev) => prev.map((n) => (n.id === note.id ? note : n)));
    });

    // child removed
    const unsubRemoved = onChildRemoved(notesRef, (snap) => {
      const id = snap.key;
      if (!id) return;
      setNotes((prev) => prev.filter((n) => n.id !== id));
    });

    // cleanup
    return () => {
      try {
        unsubAdded();
        unsubChanged();
        unsubRemoved();
      } catch {
        dbOff(notesRef);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0d0e12] overflow-x-hidden flex flex-col justify-start items-center pt-28 pb-12 z-0">
      {/* Background patterns */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.12}
        duration={3}
        className={cn("inset-x-0 inset-y-[-30%] h-[150%] skew-y-12 -z-20 text-amber-500/10")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/95 to-[#12131a]/95 -z-30" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-8 max-w-2xl px-4 z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)] mb-2 uppercase">
          Diễn Đàn Luận Đàm
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-medium tracking-wide uppercase">
          Nơi trao đổi ý kiến, đề xuất câu hỏi và tháo gỡ vướng mắc về bài học Sức mạnh Đại Đoàn Kết
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-4" />
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col justify-center items-center gap-4 cursor-wait z-10 my-auto">
          <Loader2 className="size-16 text-amber-500 animate-spin" />
          <p className="font-semibold text-amber-500/70 tracking-wider text-sm">Đang tải bản lưu trữ...</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl px-6 md:px-10 flex-1 flex flex-col z-10 justify-start items-center">
          {notes.length === 0 ? (
            <div className="w-full flex-1 flex flex-col justify-center items-center text-center py-20 border border-amber-900/10 rounded-2xl bg-[#12131a]/40 backdrop-blur-sm">
              <p className="text-neutral-500 text-lg font-medium">Chưa có câu hỏi nào được lưu trữ.</p>
              <p className="text-neutral-600 text-sm mt-1">Hãy nhấn nút ở góc dưới để tạo câu hỏi đầu tiên!</p>
            </div>
          ) : (
            <div className="w-full bg-[#161720]/30 border border-amber-900/25 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[58vh] flex flex-col justify-center">
              {/* Decorative gold accent lines */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

              <div className="flex flex-wrap justify-center gap-8 overflow-y-auto max-h-[52vh] pr-2 scrollbar-thin scrollbar-thumb-amber-900/30 scrollbar-track-transparent py-4">
                {notes.map((note, index) => (
                  <div key={note.id} className="w-72 shrink-0">
                    <QnANotePaper 
                      key={index} 
                      name={note.name} 
                      content={note.content} 
                      isComplete={note.isComplete} 
                      color={note.color ?? "#fef3c7"} 
                      id={note.id}
                      uid={note.uid}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating button */}
      <div className="fixed bottom-8 left-8 z-50">
        <CreateDialog />
      </div>
    </div>
  );
}

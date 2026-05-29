import { useEffect, useRef, useState } from "react";
import { Pause, SendHorizonal, Speech, SquareMinus } from "lucide-react";
import { createPortal } from "react-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { ScrollArea } from "./shadcn/scroll-area";
import ReactMarkdown from 'react-markdown'
import { Textarea } from "./shadcn/textarea";
import { clsx } from "clsx";
import { useAiChatMutation } from "../hooks/useGoogleAI";

export interface ChatMessage {
  isBot: boolean;
  msg: string;
  sentAt: Date;
}

export default function FloatAIChat() {
  const [animate, setAnimate] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [chatHistory, setChatHistory] = useState(() => {
    const chatHistoryStr = sessionStorage.getItem("chatHistory");
    return chatHistoryStr ? JSON.parse(chatHistoryStr) as ChatMessage[] : [] as ChatMessage[];
  });

  const [userMsg, setUserMsg] = useState("")

  const viewportRef = useRef(null);

  // Speech synthesis state
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Cleanup any speaking on unmount
  useEffect(() => {
    return () => {
      try {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      } catch {
        // ignore cleanup errors
      }
    };
  }, []);

  function getVietnameseVoice(): SpeechSynthesisVoice | null {
    if (!(typeof window !== "undefined" && "speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const viCandidates = voices.filter(v => v.lang?.toLowerCase().startsWith("vi"));
    if (viCandidates.length > 0) return viCandidates[0];
    return null;
  };

  const speakText = (index: number, text: string) => {
    if (!(typeof window !== "undefined" && "speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance === "undefined") {
      alert("Trình duyệt của bạn không hỗ trợ đọc văn bản.");
      return;
    }

    const synth = window.speechSynthesis;

    // If clicking same bubble, toggle using our own state for reliability
    if (speakingIndex === index) {
      if (isPaused) {
        try { synth.resume(); } catch { /* ignore */ }
        setIsPaused(false);
        setTimeout(() => {
          if (synth.paused) {
            try { synth.resume(); } catch { /* ignore */ }
          }
        }, 0);
      } else {
        try { synth.pause(); } catch { /* ignore */ }
        setIsPaused(true);
      }
      return;
    }

    // If switching to another bubble, stop previous
    if (synth.speaking || synth.paused) {
      synth.cancel();
    }

    const voice = getVietnameseVoice();
    if (!voice) {
      alert("Trình duyệt của bạn không hỗ trợ đọc văn bản.");
      return;
    }
    const ut = new SpeechSynthesisUtterance(text);
    ut.voice = voice;
    ut.lang = voice?.lang ?? "vi-VN";
    ut.rate = 1;
    ut.onpause = () => setIsPaused(true);
    ut.onresume = () => setIsPaused(false);
    ut.onend = () => {
      setSpeakingIndex(null);
      setIsPaused(false);
      utteranceRef.current = null;
    };
    utteranceRef.current = ut;
    setSpeakingIndex(index);
    setIsPaused(false);
    synth.speak(ut);
  };

  useEffect(() => {
    const chatHistoryStr = JSON.stringify(chatHistory);
    sessionStorage.setItem("chatHistory", chatHistoryStr);
  }, [chatHistory])

  useEffect(() => {
    if (viewportRef.current) {
      const scrollArea = viewportRef.current as HTMLDivElement;
      scrollArea.scroll({ top: scrollArea.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  const aiChat = useAiChatMutation();

  return createPortal(
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <button 
          title="Gr2Bot - Trợ lý số"
          onClick={() => { setAnimate(false); setIsOpen(!isOpen) }}
          className={clsx(
            "fixed bottom-6 right-6 cursor-pointer border border-red-600/30 rounded-full bg-white/95 p-1.5 hover:border-red-500 hover:shadow-[0_0_15px_rgba(185,28,28,0.15)] transition-all z-[9999] focus:outline-none flex items-center justify-center shadow-lg",
            animate && "animate-bounce"
          )}
        >
          <img src="/imgs/avatar/vietnamball.png" alt="Bot Ball" className="size-11 hover:scale-105 transition-transform" />
        </button>
      </PopoverTrigger>

      <PopoverContent side="left" align="end"
        className={clsx(
          "w-96 h-[500px] grid grid-rows-[auto_1fr_auto] p-0 border border-red-800/20 bg-white/95 rounded-xl shadow-2xl overflow-hidden",
          "transition-all duration-300 ease-out",
          "data-[state=open]:animate-popover-in",
          "data-[state=closed]:animate-popover-out"
        )}>

        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-red-700 to-red-800 px-4 py-3 border-b border-red-800/30">
          <div className="flex gap-2.5 items-center">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Trợ Lý Gr2Bot</h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
            <SquareMinus className="text-stone-400 hover:text-white size-4 cursor-pointer" />
          </button>
        </div>

        {/* Chat Message Window */}
        <div className="flex-1 min-h-0 bg-[#FDF6E3]/60 pt-3">
          <ScrollArea viewportRef={viewportRef} className="h-full w-full px-3 pb-3">
            <div className="h-full w-full grid auto-rows-auto gap-3.5">

              {/* Welcome Message */}
              <div className="flex justify-start items-start gap-2.5 pe-10">
                <img src="/imgs/avatar/vietnamball.png" alt="Bot Image" className="size-9 rounded-full object-cover border border-red-800/15" />
                <div className="text-xs rounded-xl rounded-tl-none p-3 bg-stone-100 border border-stone-200 text-stone-700 leading-relaxed shadow-sm">
                  Xin chào! Tôi là Gr2Bot – trợ lý ảo giúp bạn tìm hiểu về chuyên đề Tư tưởng Hồ Chí Minh.<br />
                  Bạn muốn nghiên cứu nội dung nào? (Ví dụ: “Vai trò của đại đoàn kết”, “Mặt trận dân tộc thống nhất”)
                </div>
              </div>

              {chatHistory && (
                chatHistory.map((msg, index) => {
                  if (msg.isBot) {
                    return (
                      <div key={index} className="flex justify-start items-start gap-2.5 pe-10">
                        <img src="/imgs/avatar/vietnamball.png" alt="Bot Image" className="size-9 rounded-full object-cover border border-red-800/15" />

                        <div className="flex flex-col gap-1 w-full">
                          <button onClick={() => speakText(index, msg.msg)} className="group flex justify-start items-center gap-1.5 ps-1 cursor-pointer w-fit text-stone-400" title="Đọc nội dung">
                            {speakingIndex === index && !isPaused ? (
                              <>
                                <Pause className="size-3.5 text-red-600 animate-pulse" />
                                <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Đang đọc...</span>
                              </>
                            ) : (
                              <>
                                <Speech className="size-3.5 group-hover:text-red-500 transition-colors" />
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:text-stone-500 transition-opacity uppercase tracking-wider font-semibold">Đọc bài</span>
                              </>
                            )}
                          </button>

                          <div className="text-xs rounded-xl rounded-tl-none p-3 bg-stone-100 border border-stone-200 text-stone-700 leading-relaxed shadow-sm prose max-w-full break-words prose-p:my-0">
                            <ReactMarkdown>
                              {msg.msg}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex justify-end items-start gap-2.5 ps-10">
                        <p className="text-xs rounded-xl rounded-tr-none p-3 bg-red-50 border border-red-600/15 text-stone-800 leading-relaxed shadow-sm break-words max-w-full">
                          {msg.msg}
                        </p>
                        <img src="/imgs/avatar/user.png" alt="User Avatar" className="size-9 rounded-full object-cover border border-red-900/20" />
                      </div>
                    );
                  }
                })
              )}

              {aiChat.isPending && (
                <div className="flex justify-start items-start gap-2.5 pe-10">
                  <img src="/imgs/avatar/vietnamball.png" alt="Bot Image" className="size-9 rounded-full object-cover border border-red-800/15" />
                  <div className="text-xs rounded-xl rounded-tl-none p-3 bg-stone-100 border border-stone-200 text-stone-500 leading-relaxed shadow-sm flex items-center gap-3">
                    Đang chiêm nghiệm
                    <span className="flex justify-center items-center gap-1 h-3">
                      <span className="size-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="size-1 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="size-1 bg-red-500 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                </div>
              )}

            </div>
          </ScrollArea>
        </div>

        {/* Input Bar */}
        <div className="flex bg-white border-t border-red-800/15 px-3 py-2.5 items-center gap-2">
          <Textarea
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.altKey
              ) {
                e.preventDefault();
                if (userMsg.trim()) {
                  const msg = userMsg;
                  setUserMsg("");
                  aiChat.mutate({ userChat: msg, chatHistory, setChatHistory });
                }
              }
            }}
            placeholder="Hỏi trợ lý số về bài học..."
            className="text-xs flex-1 h-10 min-h-[40px] max-h-[80px] p-2 bg-white border border-stone-300 text-stone-800 focus-visible:ring-1 focus-visible:ring-red-600/50 rounded-lg resize-none custom-scrollbar" />

          <button 
            disabled={!userMsg || aiChat.isPending}
            className="p-2.5 cursor-pointer bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 disabled:from-stone-300 disabled:to-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shrink-0 shadow"
            onClick={() => {
              if (!userMsg.trim()) return;
              const msg = userMsg;
              setUserMsg("");
              aiChat.mutate({ userChat: msg, chatHistory, setChatHistory });
            }}
          >
            <SendHorizonal className="size-4 shrink-0" />
          </button>
        </div>

      </PopoverContent>
    </Popover>,
    document.body
  )
}

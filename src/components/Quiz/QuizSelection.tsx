import { useState } from "react";
import { Link } from "react-router";
import { Particles } from "../magicui/Special Effect/particles";

// Custom CSS for animations
const customStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse-gentle {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out;
  }
  
  .animate-pulse-gentle {
    animation: pulse-gentle 2s ease-in-out infinite;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
`;

interface QuizChapter {
  id: string;
  title: string;
  description: string;
  parts: number;
  color: string;
  icon: string;
}

const quizChapters: QuizChapter[] = [
  {
    id: "dai-doan-ket",
    title: "Đại đoàn kết toàn dân tộc",
    description:
      "Kiểm tra kiến thức về đại đoàn kết toàn dân tộc trong tư tưởng Hồ Chí Minh thông qua các câu hỏi đa dạng",
    parts: 15,
    color: "from-orange-500 to-red-600",
    icon: "🤝",
  },
  {
    id: "mat-tran-dan-toc",
    title: "Mặt trận dân tộc thống nhất",
    description:
      "Tìm hiểu về vai trò và nguyên tắc hoạt động của Mặt trận dân tộc thống nhất",
    parts: 15,
    color: "from-blue-500 to-indigo-600",
    icon: "🏛️",
  },
  {
    id: "tu-tuong-ho-chi-minh-dai-doan-ket",
    title: "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc",
    description:
      "Ôn tập kiến thức qua 30 thẻ ghi nhớ flashcard về tư tưởng Hồ Chí Minh",
    parts: 30,
    color: "from-green-500 to-emerald-600",
    icon: "📚",
  },
];

export default function QuizSelection() {
  const [selectedChapter, setSelectedChapter] = useState<string>("");

  return (
    <>
      {/* Inject custom animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <div
        className="min-h-screen relative p-6 pt-16 bg-gradient-to-b from-[#0d0e12] to-[#12131a]"
      >
      {/* Background Image overlay with low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("/imgs/Quiz đại đoàn kết dân tộc.jpg")',
        }}
      />
      {/* Background overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 via-transparent to-neutral-950/95 pointer-events-none"
      />

      {/* Particles Background Effect */}
      <Particles
        className="absolute inset-0 z-[11]"
        quantity={60}
        staticity={30}
        ease={70}
        color="#d97706"
        size={1.2}
        vx={0.1}
        vy={0.1}
      />

      <div className="max-w-5xl mx-auto relative z-20">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            Đấu trường Kiến thức Lịch sử
          </div>

          <h1
            className="text-4xl md:text-5xl font-title tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 mb-2 drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]"
          >
            ĐẠI ĐOÀN KẾT
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 font-heading mb-4">
            Khảo Thí Kiến Thức Tương Tác
          </h2>

          <p className="text-base text-neutral-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Chọn sảnh khảo thí để bắt đầu rèn luyện và kiểm tra kiến thức về tư tưởng Hồ Chí Minh.
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-6 h-px bg-amber-900"></div>
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-6 h-px bg-amber-900"></div>
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quizChapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`group relative gold-glow-panel bg-[#12131a]/85 border border-amber-900/30 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
                selectedChapter === chapter.id ? "border-amber-400 ring-1 ring-amber-400/50" : ""
              }`}
              onClick={() => setSelectedChapter(chapter.id)}
            >
              {/* Icon */}
              <div className="text-3xl mb-3">{chapter.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-bold text-neutral-100 mb-2 leading-snug group-hover:text-amber-400 transition-colors font-heading">
                {chapter.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                {chapter.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <Link
                  to={chapter.id === "tu-tuong-ho-chi-minh-dai-doan-ket" ? "/flashcard-study" : `/quiz?chapter=${chapter.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200"
                >
                  {chapter.id === "tu-tuong-ho-chi-minh-dai-doan-ket" ? "Ôn tập" : "Bắt đầu"}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <span className="text-neutral-500 text-xs font-semibold">
                  {chapter.parts} câu
                </span>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>


      </div>
    </div>
    </>
  );
}

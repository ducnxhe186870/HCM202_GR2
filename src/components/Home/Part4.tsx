import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { TypingAnimation } from "../magicui/Text Animations/TypingAnimation";

function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delayMs = 0,
  once = true,
  offset = 0.15,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delayMs?: number;
  once?: boolean;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              const id = setTimeout(() => setVisible(true), delayMs);
              if (!once) {
                // cleanup timer when leaving view
                return () => clearTimeout(id);
              }
            } else {
              setVisible(true);
            }
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: offset }
    );

    io.observe(element);
    return () => io.disconnect();
  }, [delayMs, offset, once]);

  const base = "opacity-0 translate-y-6";
  const active = "opacity-100 translate-y-0";

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? active : base
      } ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

export default function Part4() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0d0e12] to-[#12131a]">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("/imgs/Bác%20Hồ%20với%20nhân%20dân.jpg")',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950/80 pointer-events-none"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <Reveal className="text-center mb-10">
          <h1 className="flex justify-center items-center relative uppercase text-amber-500 font-heading text-3xl md:text-4xl mb-4 min-h-[100px] z-10 drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]">
            <TypingAnimation
              startOnView={true}
              duration={50}
              className="text-amber-500 font-heading text-2xl md:text-3xl"
            >
              Hình thức & Nguyên tắc tổ chức
            </TypingAnimation>
          </h1>
          {/* Animated divider under main title */}
          <div
            className={`w-32 h-1 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto mb-6 scale-in`}
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="mt-2 inline-block px-6 py-2.5 bg-amber-500/10 backdrop-blur-lg rounded-2xl border border-amber-500/30 shadow-2xl">
            <p className="text-lg text-amber-400 font-medium font-heading">
              Mặt trận dân tộc thống nhất
            </p>
          </div>
        </Reveal>

        <div className="max-w-5xl mx-auto">
          {/* Section A: Hình thức tổ chức */}
          <div className="mb-12">
            <Reveal className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg font-bold text-neutral-950">A</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-1 font-heading">Hình thức tổ chức</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full scale-in" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Reveal>

            {/* Definition Card */}
            <Reveal className="gold-glow-panel rounded-2xl p-6 mb-6 border border-amber-900/30 bg-[#161722]/80 shadow-2xl backdrop-blur-md">
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-500 border border-amber-500/30">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2 font-heading">
                    Mặt trận dân tộc thống nhất
                  </h3>
                  <p className="text-base text-neutral-300 mb-3 leading-relaxed">
                    Mặt trận dân tộc thống nhất là nơi quy tụ mọi tổ chức và cá
                    nhân yêu nước, tập hợp mọi người dân nước Việt, cả trong
                    nước lẫn kiều bào sinh sống ở nước ngoài.
                  </p>
                  <p className="text-base text-neutral-300 leading-relaxed">
                    Đây là nơi đoàn kết mọi tổ chức, cá nhân yêu nước, mọi tầng
                    lớp nhân dân Việt Nam, tạo sức mạnh đại đoàn kết vô địch.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Mission Card */}
            <Reveal
              className="crimson-glow-panel rounded-2xl p-6 mb-6 border border-red-900/30 bg-[#161722]/80 shadow-2xl backdrop-blur-md"
              delayMs={50}
            >
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-red-500 border border-red-500/30">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-2 font-heading">
                    Nhiệm vụ hàng đầu
                  </h3>
                  <p className="text-base text-neutral-300 leading-relaxed">
                    Đưa quần chúng vào các tổ chức yêu nước phù hợp với từng
                    giai đoạn cách mạng, từng ngành nghề, giới, lứa tuổi, tôn
                    giáo để tập hợp tối đa sức mạnh quần chúng.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Toggle details button */}
            <div className="text-center mb-8">
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                {showDetails ? "Thu gọn chi tiết" : "📖 Xem chi tiết đầy đủ"}
              </button>
            </div>

            {/* Timeline Section */}
            {showDetails && (
              <Reveal className="gold-glow-panel rounded-2xl p-6 md:p-8 border border-amber-900/30 bg-[#12131a]/85 shadow-2xl backdrop-blur-md">
                <h3 className="text-2xl font-bold text-amber-500 mb-8 text-center font-heading">
                  Các tên gọi của Mặt trận qua các thời kỳ lịch sử
                </h3>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-red-500 rounded-full opacity-35"></div>

                  {/* Timeline items */}
                  <div className="space-y-6">
                    {[
                      {
                        year: "1936",
                        name: "Mặt trận Dân chủ Đông Dương",
                        color: "from-red-500/20 to-red-600/10",
                        textBorder: "border-red-900/30",
                        textColor: "text-red-400"
                      },
                      {
                        year: "1939",
                        name: "Mặt trận Nhân dân phản đế Đông Dương",
                        color: "from-orange-500/20 to-orange-600/10",
                        textBorder: "border-orange-900/30",
                        textColor: "text-orange-400"
                      },
                      {
                        year: "1941",
                        name: "Mặt trận Việt Minh",
                        color: "from-yellow-500/20 to-yellow-600/10",
                        textBorder: "border-yellow-900/30",
                        textColor: "text-yellow-400"
                      },
                      {
                        year: "1951",
                        name: "Mặt trận Liên Việt",
                        color: "from-emerald-500/20 to-emerald-600/10",
                        textBorder: "border-emerald-900/30",
                        textColor: "text-emerald-400"
                      },
                      {
                        year: "1960",
                        name: "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
                        color: "from-blue-500/20 to-blue-600/10",
                        textBorder: "border-blue-900/30",
                        textColor: "text-blue-400"
                      },
                      {
                        year: "1968",
                        name: "Liên minh các lực lượng Dân tộc, Dân chủ và Hòa bình Việt Nam",
                        color: "from-indigo-500/20 to-indigo-600/10",
                        textBorder: "border-indigo-900/30",
                        textColor: "text-indigo-400"
                      },
                      {
                        year: "1976",
                        name: "Mặt trận Tổ quốc Việt Nam",
                        color: "from-purple-500/20 to-purple-600/10",
                        textBorder: "border-purple-900/30",
                        textColor: "text-purple-400"
                      },
                    ].map((item, index) => (
                      <Reveal
                        key={index}
                        className="relative flex items-center"
                        delayMs={index * 50}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center z-10 bg-neutral-900 border-2 border-amber-500/40 text-amber-500 text-xs font-bold shadow-lg"
                        >
                          {item.year}
                        </div>
                        <div className={`ml-4 md:ml-6 bg-[#161722]/80 backdrop-blur-sm rounded-xl p-4 flex-1 border ${item.textBorder} hover:border-amber-500/30 transition-all duration-300`}>
                          <h4 className="text-lg font-bold text-neutral-100 font-heading">
                            {item.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1">Giai đoạn năm {item.year}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Section B: Nguyên tắc xây dựng và hoạt động */}
          {showDetails && (
            <div className="mb-12">
              <Reveal className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-neutral-950">B</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-100 mb-1 font-heading">Nguyên tắc hoạt động</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full scale-in" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Reveal>

              {/* Principles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Principle 1 */}
                <Reveal className="gold-glow-panel rounded-2xl p-6 border border-amber-900/30 bg-[#12131a]/80 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 text-amber-500 border border-amber-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3 font-heading">Nền tảng liên minh vững vàng</h3>
                  <p className="text-sm text-neutral-300 mb-4">
                    Xây dựng trên nền tảng liên minh công – nông – trí thức, dưới sự lãnh đạo của Đảng.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#0d0e12]/60 rounded-lg p-3 border border-amber-900/10">
                      <p className="text-neutral-400 leading-relaxed">
                        <span className="font-semibold text-amber-500">Công – nông</span> làm nòng cốt, là lực lượng đông đảo và cách mạng nhất.
                      </p>
                    </div>
                    <div className="bg-[#0d0e12]/60 rounded-lg p-3 border border-amber-900/10">
                      <p className="text-neutral-400 leading-relaxed">
                        Liên kết giai cấp chặt chẽ với trí thức tạo nền tảng vững chắc.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Principle 2 */}
                <Reveal className="gold-glow-panel rounded-2xl p-6 border border-amber-900/30 bg-[#12131a]/80 shadow-2xl backdrop-blur-md" delayMs={50}>
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 text-red-500 border border-red-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-400 mb-3 font-heading">Hiệp thương dân chủ thực chất</h3>
                  <p className="text-sm text-neutral-300 mb-4">
                    Hoạt động theo nguyên tắc hiệp thương, bàn bạc công khai, đi đến đồng thuận thực chất.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#0d0e12]/60 rounded-lg p-3 border border-red-900/10">
                      <p className="text-neutral-400 leading-relaxed">
                        Bàn bạc dân chủ rộng rãi, tôn trọng ý kiến khác biệt hợp lý.
                      </p>
                    </div>
                    <div className="bg-[#0d0e12]/60 rounded-lg p-3 border border-red-900/10">
                      <p className="text-neutral-400 leading-relaxed">
                        Lấy điểm chung tối thượng là độc lập tự do dân tộc làm quy chuẩn thống nhất.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Principle 3 */}
                <Reveal className="gold-glow-panel rounded-2xl p-6 border border-amber-900/30 bg-[#12131a]/80 shadow-2xl backdrop-blur-md" delayMs={100}>
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 text-amber-500 border border-amber-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3 font-heading">Đoàn kết lâu dài, chân thành</h3>
                  <p className="text-sm text-neutral-300 mb-4">
                    Đoàn kết không mang tính thời sự nhất thời mà là sự gắn bó lâu dài, thân ái vì sự nghiệp nước nhà.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#0d0e12]/60 rounded-lg p-3 border border-amber-900/10">
                      <p className="text-neutral-400 leading-relaxed italic">
                        "Cầu đồng tồn dị" - Tìm điểm chung, tôn trọng các khác biệt chính đáng, chân thành phê bình để cùng tiến bộ.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          )}

          {/* Conclusion Section */}
          {showDetails && (
            <Reveal className="crimson-glow-panel rounded-2xl p-8 md:p-10 border border-red-900/30 bg-[#12131a]/85 shadow-2xl backdrop-blur-md">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4 font-heading">
                  Ý NGHĨA THỜI ĐẠI
                </h2>
                <div className="max-w-3xl mx-auto space-y-4 text-base">
                  <p className="text-neutral-300 leading-relaxed">
                    Mặt trận dân tộc thống nhất là một phát kiến vĩ đại của Đảng và Hồ Chí Minh. Cho đến ngày nay, các nguyên tắc hiệp thương dân chủ và tự nguyện gắn bó vẫn giữ nguyên vẹn giá trị hạt nhân trong việc quy tụ sức mạnh người Việt trên toàn cầu để xây dựng quốc gia cường thịnh.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
      {/* Local animations for Part4 */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .scale-in { animation: scaleIn 0.8s ease-out forwards; transform-origin: left center; }
      `}</style>
    </div>
  );
}

import { ShootingStars } from "../components/aceternityui/shooting-stars";
import { StarsBackground } from "../components/aceternityui/stars-background";
import { AuroraText } from "../components/magicui/aurora-text";
import { Target, Users, ShieldCheck, Scale, Workflow } from "lucide-react";
import ChatGPTLogo from "../assets/ChatGPT_logo.svg?react"
import ChatGPT from "../assets/ChatGPT.svg?react"
import GeminiLogo from "../assets/Google-gemini-icon.svg?react"
import GeminiLetter from "../assets/Google_Gemini_logo.svg?react"
import { Pointer } from "../components/magicui/pointer";

const rules = [
  {
    title: "Nguyên tắc 1",
    content:
      "AI được sử dụng với vai trò công cụ hỗ trợ, không thay thế tư duy, phân tích và sáng tạo của nhóm.",
  },
  {
    title: "Nguyên tắc 2",
    content:
      "Mọi thông tin do AI cung cấp đều được kiểm chứng, đối chiếu với nguồn chính thống.",
  },
  {
    title: "Nguyên tắc 3",
    content:
      "Nội dung cuối cùng được chỉnh sửa, biên tập bởi các thành viên, không sao chép nguyên văn từ AI.",
  },
  {
    title: "Nguyên tắc 4",
    content:
      "Đảm bảo tính minh bạch, liêm chính học thuật và đạo đức trong việc ứng dụng công nghệ.",
  },
];

const LOs = [
  {
    code: "LO3",
    content:
      "Hiểu hệ thống tư tưởng Hồ Chí Minh (độc lập dân tộc, CNXH, đại đoàn kết, đoàn kết quốc tế, xây dựng Đảng – Nhà nước, đạo đức – văn hóa – con người).",
  },
  {
    code: "LO4",
    content:
      "Hiểu được vai trò nền tảng lý luận của Chủ nghĩa Mác-Lênin, tư tưởng Hồ Chí Minh đối với đường lối của Đảng, Nhà nước.",
  },
  {
    code: "LO6",
    content:
      "Phát triển kỹ năng làm việc nhóm, tư duy phân tích – đánh giá, tìm kiếm và trình bày tài liệu, ứng dụng AI có đạo đức.",
  },
  {
    code: "LO7",
    content:
      "Củng cố tinh thần yêu nước, ý thức công dân, kỷ luật, thái độ nghề nghiệp đúng đắn, tinh thần học tập suốt đời.",
  },
  {
    code: "LO8",
    content:
      "Hình thành tác phong chuyên nghiệp, khoa học, có khả năng cập nhật kiến thức mới chủ động.",
  },
];

export default function Overview() {
  return (
    <div className="relative text-stone-600 w-full min-h-screen bg-[#FDF6E3] px-6 md:px-12 pt-28 pb-20 overflow-x-hidden z-0 scrollbar-thin scrollbar-thumb-red-800/20 scrollbar-track-transparent">
      {/* Subtle map projection in background */}
      <img 
        className="fixed opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 scale-110 select-none" 
        src="/imgs/Vietnam_(orthographic_projection).svg" 
        alt="Vietnam Outline"
      />

      <div className="max-w-6xl mx-auto z-10 relative space-y-16">
        {/* Title Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider uppercase">
            <span className="bg-gradient-to-b from-red-800 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(185,28,28,0.15)]">
              <AuroraText>Tổng Quan </AuroraText> Dự Án
            </span>
          </h2>
          <div className="space-y-1 text-sm md:text-base font-medium tracking-wide text-stone-500 uppercase">
            <p>“Đại Đoàn Kết – Sức mạnh dân tộc Việt Nam”</p>
            <p className="text-red-700/80 text-xs md:text-sm">"Kết nối truyền thống – Ứng dụng công nghệ – Lan tỏa giá trị đoàn kết"</p>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-600/40 to-transparent mx-auto mt-4" />
        </div>

        {/* I. Tóm tắt dự án */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold uppercase tracking-wider text-red-600 border-l-2 border-red-600 pl-3 flex items-center gap-2">
            I. Tóm tắt dự án
          </h3>
          
          <div className="space-y-6">
            <p className="text-stone-600 leading-relaxed max-w-4xl text-base">
              Dự án làm rõ <span className="font-semibold text-amber-700">tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc</span>,
              coi đây là <span className="font-semibold text-amber-700">chiến lược cơ bản, lâu dài và xuyên suốt</span> của cách mạng Việt Nam.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              <div className="relative overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/60 backdrop-blur-sm p-6 shadow-sm hover:border-red-600/30 transition duration-300 lg:col-span-4 group hover:shadow-[0_0_20px_rgba(185,28,28,0.06)]">
                <h4 className="text-base font-bold text-amber-700 flex items-center gap-2">
                  <Target className="size-5 text-red-700" /> Vai trò
                </h4>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(320px_200px_at_15%_0%,rgba(185,28,28,0.04),transparent_60%)]" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">Đại đoàn kết là nhân tố quyết định thành bại của cách mạng.</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/60 backdrop-blur-sm p-6 shadow-sm hover:border-red-600/30 transition duration-300 lg:col-span-4 group hover:shadow-[0_0_20px_rgba(185,28,28,0.06)]">
                <h4 className="text-base font-bold text-amber-700 flex items-center gap-2">
                  <Users className="size-5 text-red-700" /> Lực lượng
                </h4>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(320px_200px_at_85%_0%,rgba(185,28,28,0.04),transparent_60%)]" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">Toàn dân Việt Nam; <span className="font-semibold text-stone-700">liên minh công – nông – trí thức</span> là nòng cốt.</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/60 backdrop-blur-sm p-6 shadow-sm hover:border-red-600/30 transition duration-300 lg:col-span-4 group hover:shadow-[0_0_20px_rgba(185,28,28,0.06)]">
                <h4 className="text-base font-bold text-amber-700 flex items-center gap-2">
                  <ShieldCheck className="size-5 text-red-700" /> Điều kiện
                </h4>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(300px_180px_at_0%_100%,rgba(185,28,28,0.04),transparent_60%)]" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">Đặt lợi ích chung lên cao nhất, kế thừa truyền thống, khoan dung và tin dân.</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/60 backdrop-blur-sm p-6 shadow-sm hover:border-red-600/30 transition duration-300 lg:col-span-6 group hover:shadow-[0_0_20px_rgba(185,28,28,0.06)]">
                <h4 className="text-base font-bold text-amber-700 flex items-center gap-2">
                  <Scale className="size-5 text-red-700" /> Hình thức & nguyên tắc
                </h4>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(380px_220px_at_100%_0%,rgba(185,28,28,0.04),transparent_60%)]" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">Mặt trận dân tộc thống nhất dưới sự lãnh đạo của Đảng; hiệp thương dân chủ; đoàn kết lâu dài.</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/60 backdrop-blur-sm p-6 shadow-sm hover:border-red-600/30 transition duration-300 lg:col-span-6 group hover:shadow-[0_0_20px_rgba(185,28,28,0.06)]">
                <h4 className="text-base font-bold text-amber-700 flex items-center gap-2">
                  <Workflow className="size-5 text-red-700" /> Phương thức
                </h4>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_200px_at_50%_100%,rgba(185,28,28,0.04),transparent_60%)]" />
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">Dân vận khéo, tổ chức quần chúng, quy tụ vào mặt trận.</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-emerald-800/20 bg-emerald-50/50 backdrop-blur-sm p-6 mt-4 shadow-sm">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(280px_140px_at_20%_0%,rgba(16,185,129,0.05),transparent_60%)]" />
              <p className="relative text-emerald-900 font-medium leading-relaxed text-sm">
                <span className="block text-xs uppercase tracking-wider text-emerald-700 font-extrabold mb-1">Kết luận</span>
                Đại đoàn kết vừa là mục tiêu, vừa là động lực, là cội nguồn sức mạnh vô địch của dân tộc Việt Nam trong kháng chiến và xây dựng, hội nhập hiện nay.
              </p>
            </div>
          </div>
        </div>

        {/* II. Learning Outcomes */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold uppercase tracking-wider text-red-600 border-l-2 border-red-600 pl-3 flex items-center gap-2">
            II. Chuẩn đầu ra (Learning Outcomes)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6">
            {LOs.map((lo) => (
              <div key={lo.code} className="lg:col-span-2 h-full">
                <div className="relative h-full overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/60 backdrop-blur-sm p-5 shadow-sm hover:border-red-600/30 transition duration-300 flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(185,28,28,0.06)]">
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(260px_160px_at_15%_0%,rgba(185,28,28,0.02),transparent_60%),radial-gradient(260px_160px_at_85%_100%,rgba(185,28,28,0.02),transparent_60%)]" />
                  <div className="relative z-10 flex items-start gap-3">
                    <span className="shrink-0 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                      {lo.code}
                    </span>
                    <p className="text-stone-500 text-xs md:text-sm leading-relaxed">{lo.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* III. Báo cáo sử dụng AI */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold uppercase tracking-wider text-red-600 border-l-2 border-red-600 pl-3 flex items-center gap-2">
            III. Ứng dụng Trí tuệ nhân tạo (AI)
          </h3>
          
          <div className="space-y-8 pl-3 md:pl-5">
            {/* 1. Công cụ sử dụng */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-700">1. Công cụ đã sử dụng</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="flex flex-col items-center justify-center gap-4 py-8 px-6 bg-[#FAF0DC]/50 border border-red-800/10 hover:border-red-600/30 rounded-xl relative overflow-hidden transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <ChatGPTLogo className="size-8 text-stone-700" />
                    <span className="text-lg font-bold text-stone-800">ChatGPT</span>
                  </div>
                  <Pointer className="z-10">
                    <div className="flex items-center gap-2 bg-white px-3 py-1 border border-stone-300 text-[10px] text-stone-500 rounded-full select-none cursor-pointer">
                      <ChatGPT className="size-4 text-emerald-500 animate-spin" /> Tương tác trợ lý
                    </div>
                  </Pointer>
                </div>
                
                <div className="flex flex-col items-center justify-center gap-4 py-8 px-6 bg-[#FAF0DC]/50 border border-red-800/10 hover:border-red-600/30 rounded-xl relative overflow-hidden transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <GeminiLogo className="size-8 text-stone-700" />
                    <span className="text-lg font-bold text-stone-800">Google Gemini</span>
                  </div>
                  <Pointer className="z-10">
                    <div className="flex items-center gap-2 bg-white px-3 py-1 border border-stone-300 text-[10px] text-stone-500 rounded-full select-none cursor-pointer">
                      <GeminiLetter className="h-4 w-12 animate-pulse" /> Trợ lý Google
                    </div>
                  </Pointer>
                </div>
              </div>
            </div>

            {/* 2. Cách sử dụng */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-stone-700">2. Phương thức ứng dụng</h4>
              <ul className="space-y-2 list-none text-stone-500 text-sm leading-relaxed max-w-4xl">
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>Tổng hợp và lập dàn ý sơ bộ từ các chương giáo trình Tư tưởng Hồ Chí Minh chính quy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>Hệ thống hóa ngân hàng câu hỏi ôn tập, tinh lọc các nội dung cốt lõi và bài học thực tiễn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>Hỗ trợ thiết kế cấu trúc giao diện trang web trưng bày số và tối ưu hóa trải nghiệm người dùng.</span>
                </li>
              </ul>
            </div>

            {/* 3. Nhiệm vụ nhóm */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-stone-700">3. Nhiệm vụ kiểm chứng của thành viên</h4>
              <ul className="space-y-2 list-none text-stone-500 text-sm leading-relaxed max-w-4xl">
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>Đối chiếu nghiêm ngặt mọi thông tin số liệu do AI cung cấp với văn bản gốc (giáo trình, văn kiện Đảng, Hồ Chí Minh Toàn tập).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>Tích hợp dẫn chứng thực tiễn về sức mạnh khối đại đoàn kết toàn dân tộc qua các thời kỳ lịch sử.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold shrink-0 mt-0.5">•</span>
                  <span>Biên tập, trau chuốt ngôn ngữ học thuật nhằm đáp ứng chuẩn mực nghiên cứu môn học.</span>
                </li>
              </ul>
            </div>

            {/* 4. Nguyên tắc đạo đức sử dụng AI */}
            <div className="space-y-4 pt-2">
              <h4 className="text-base font-bold text-stone-700">4. Nguyên tắc ứng dụng AI có đạo đức</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rules.map((rule, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl border border-red-800/15 bg-[#FAF0DC]/40 p-5 hover:border-red-600/30 transition duration-300 flex flex-col justify-between">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(220px_140px_at_15%_0%,rgba(251,191,36,0.03),transparent_60%),radial-gradient(220px_140px_at_85%_100%,rgba(251,146,60,0.03),transparent_60%)]" />
                    <div className="relative z-10 space-y-4">
                      <div className="text-xs font-extrabold text-red-600 flex items-center gap-2 uppercase tracking-wide">
                        <Scale className="size-4 shrink-0" /> {rule.title}
                      </div>
                      <p className="text-stone-500 text-xs md:text-sm leading-relaxed">{rule.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShootingStars minDelay={2500} maxDelay={4500} />
      <StarsBackground twinkleProbability={0.6} />
    </div>
  );
}

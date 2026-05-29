import { Link } from "react-router";
import { ShootingStars } from "../components/aceternityui/shooting-stars";
import { StarsBackground } from "../components/aceternityui/stars-background";
import { BookText, Brain, Film, Images, ExternalLink } from "lucide-react";

const imgSources = [
  {
    url: "https://ajc.edu.vn/gia-tri-lich-su-cua-cach-mang-thang-tam-nam-1945-trong-ky-nguyen-phat-trien-moi-cua-dan-toc-14056.htm",
    title: "Học viện Báo chí & Tuyên truyền - Giá trị lịch sử Cách mạng Tháng Tám"
  },
  {
    url: "https://ussh.vnu.edu.vn/vi/news/nhan-vat-su-kien/bao-chi-ho-chi-minh-ban-sac-va-dau-an-doc-dao-cua-chu-the-sang-tao-15322.html",
    title: "Đại học KHXH&NV Hà Nội - Báo chí Hồ Chí Minh bản sắc và dấu ấn"
  },
  {
    url: "https://thitruongtaichinhtiente.vn/tu-hao-truyen-thong-ve-vang-cua-quan-doi-nhan-dan-viet-nam-43698.html",
    title: "Thị trường Tài chính Tiền tệ - Truyền thống vẻ vang QĐND Việt Nam"
  },
  {
    url: "https://woodencore.com/tranh-ban-do-viet-nam-bang-go-3d-mix-5-mau-nen-nau-cookie/?srsltid=AfmBOopCUKpW0Z39RpeYahExxYWtf7IOrebXjci_lqU1HMkmZYjdIGkq",
    title: "Tranh Bản đồ Việt Nam bằng gỗ 3D (Minh họa bản đồ)"
  },
  {
    url: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam",
    title: "Wikipedia - Tổng quan địa lý & Lịch sử Việt Nam"
  }
];

const videoSources = [
  {
    url: "https://www.youtube.com/watch?v=AtbQeFo0c0U&utm_source=chatgpt.com",
    title: "Phim tư liệu: Sức mạnh khối đại đoàn kết toàn dân tộc"
  },
  {
    url: "https://youtu.be/euqtheBsAYo?feature=shared",
    title: "Tư liệu nghệ thuật: Giai điệu đoàn kết & Cách mạng"
  }
];

const aiUsages = [
  "Gemini (model: gemini-2.5-flash) phục vụ tích hợp Chatbot tư vấn học tập và giải đáp tự động.",
  "ChatGPT (model: gpt-4o) hỗ trợ biên tập nội dung, tối ưu từ vựng và gợi ý phong cách thiết kế.",
  "Gemini (model: gemini-2.5-pro) hỗ trợ rà soát cấu trúc tư liệu, phân loại tài liệu tham khảo theo hệ quy chiếu chính thống."
];

export default function Source() {
  return (
    <div className="relative w-full min-h-screen bg-[#0d0e12] px-6 md:px-12 pt-28 pb-20 overflow-x-hidden z-0">
      {/* Subtle map projection in background */}
      <img 
        className="fixed opacity-[0.05] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 scale-110 select-none filter invert" 
        src="/imgs/Vietnam_(orthographic_projection).svg" 
        alt="Vietnam Map Background"
      />
      
      <div className="max-w-6xl mx-auto z-10 relative space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider uppercase">
            <span className="bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]">
              Tài Nguyên Lưu Trữ
            </span>
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-medium tracking-wide uppercase">
            Nguồn tư liệu, hình ảnh và hệ cơ sở tri thức ứng dụng trong dự án
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-4" />
        </div>

        {/* Shelf Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box 1: Giáo trình (Content) */}
          <div className="relative overflow-hidden rounded-xl border border-amber-900/30 bg-[#161720]/60 backdrop-blur-sm p-6 hover:border-amber-500/40 transition duration-300 group hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] flex flex-col justify-between">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(280px_160px_at_10%_0%,rgba(245,158,11,0.03),transparent_60%)]" />
            <div>
              <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
                <BookText className="size-5 text-amber-500" /> Giáo trình & Lý luận
              </h3>
              <div className="space-y-3 text-neutral-400 text-sm leading-relaxed">
                <p className="font-semibold text-neutral-200">
                  Giáo trình Tư tưởng Hồ Chí Minh
                </p>
                <p>
                  Bộ Giáo dục và Đào tạo (Nhà xuất bản Chính trị quốc gia Sự thật). Trọng tâm nghiên cứu chuyên đề: "Tư tưởng Hồ Chí Minh về Đại đoàn kết toàn dân tộc và đoàn kết quốc tế".
                </p>
                <p>
                  Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII của Đảng, các chỉ thị về tăng cường khối Đại đoàn kết toàn dân tộc trong thời kỳ mới.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: Video */}
          <div className="relative overflow-hidden rounded-xl border border-amber-900/30 bg-[#161720]/60 backdrop-blur-sm p-6 hover:border-amber-500/40 transition duration-300 group hover:shadow-[0_0_20px_rgba(245,158,11,0.06)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(280px_160px_at_10%_0%,rgba(245,158,11,0.03),transparent_60%)]" />
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
              <Film className="size-5 text-amber-500" /> Tư liệu nghe nhìn
            </h3>
            <div className="space-y-4">
              {videoSources.map((item, idx) => (
                <div key={idx} className="group/item flex items-start gap-2">
                  <span className="text-amber-500 mt-1 font-bold shrink-0">•</span>
                  <Link 
                    to={item.url} 
                    target="_blank" 
                    className="text-neutral-400 group-hover/item:text-amber-400 text-sm transition-colors leading-relaxed flex items-center gap-1.5 hover:underline"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="size-3.5 shrink-0 opacity-40 group-hover/item:opacity-100" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Box 3: Hình ảnh */}
          <div className="relative overflow-hidden rounded-xl border border-amber-900/30 bg-[#161720]/60 backdrop-blur-sm p-6 hover:border-amber-500/40 transition duration-300 group hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] md:col-span-2">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(280px_160px_at_10%_0%,rgba(245,158,11,0.03),transparent_60%)]" />
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
              <Images className="size-5 text-amber-500" /> Tư liệu hình ảnh & Lịch sử
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imgSources.map((item, idx) => (
                <div key={idx} className="group/item flex items-start gap-2">
                  <span className="text-amber-500 mt-1 font-bold shrink-0">•</span>
                  <Link 
                    to={item.url} 
                    target="_blank" 
                    className="text-neutral-400 group-hover/item:text-amber-400 text-sm transition-colors leading-relaxed flex items-center gap-1.5 hover:underline"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="size-3.5 shrink-0 opacity-40 group-hover/item:opacity-100" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Box 4: AI & Đạo đức học thuật */}
          <div className="relative overflow-hidden rounded-xl border border-amber-900/30 bg-[#161720]/60 backdrop-blur-sm p-6 hover:border-amber-500/40 transition duration-300 group hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] md:col-span-2">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(280px_160px_at_10%_0%,rgba(245,158,11,0.03),transparent_60%)]" />
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
              <Brain className="size-5 text-amber-500" /> Trí tuệ nhân tạo & Đạo đức học thuật
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="bg-[#12131a]/60 border border-neutral-800/60 p-4 rounded-lg">
                <h4 className="text-neutral-200 font-semibold mb-2">Nguyên tắc ứng dụng AI:</h4>
                <ul className="space-y-1.5 text-neutral-400 leading-relaxed list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500/60 font-bold shrink-0 mt-0.5">•</span>
                    <span>Chỉ khai thác AI làm công cụ trợ giúp xử lý dữ liệu và định hình cấu trúc, không thay thế tư duy phản biện của nhóm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500/60 font-bold shrink-0 mt-0.5">•</span>
                    <span>Tất cả dữ kiện lịch sử hoặc lý luận học tập đều được kiểm định bằng giáo trình và tài liệu nghiên cứu chính thống.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-neutral-200 font-semibold">Nhật ký sử dụng AI:</h4>
                <div className="space-y-2 pl-3">
                  {aiUsages.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-neutral-400 text-sm">
                      <span className="text-amber-500 font-bold shrink-0 mt-1">•</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
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

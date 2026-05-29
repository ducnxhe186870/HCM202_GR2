import { Shield, Code, BookOpen, Presentation, Users } from "lucide-react";
import { Particles } from "../components/magicui/Special Effect/particles";

const members = [
  {
    name: "Nguyễn Nhật Anh",
    role: "TRƯỞNG NHÓM",
    mssv: "HE161252",
    works: "Điều phối & tổng hợp dự án, nghiên cứu lý luận chính trị, thuyết trình, phản biện nhóm.",
    initials: "NA",
    tags: ["Leader", "Research", "Presenter"],
  },
  {
    name: "Nguyễn Xuân Đức",
    role: "Thành viên",
    mssv: "HE186870",
    works: "Phát triển Web, thiết kế giao diện & cơ sở dữ liệu, tối ưu hóa hiệu năng và triển khai ứng dụng.",
    initials: "XĐ",
    tags: ["Dev", "Designer", "Research"],
  },
  {
    name: "Vũ Hải Sơn",
    role: "Thành viên",
    mssv: "HE186802",
    works: "Nghiên cứu tư liệu lý luận học tập, hỗ trợ xây dựng nội dung bài học.",
    initials: "HS",
    tags: ["Research", "Content"],
  },
  {
    name: "Lê Lâm Phong",
    role: "Thành viên",
    mssv: "HA180094",
    works: "Nghiên cứu tư liệu lịch sử, tổng hợp nội dung thuyết trình, phản biện nhóm.",
    initials: "LP",
    tags: ["Research", "Content", "Presenter"],
  },
  {
    name: "Đỗ Mai Lan",
    role: "Thành viên",
    mssv: "HE172636",
    works: "Nghiên cứu tư liệu chính trị, tổng hợp nội dung, hỗ trợ biên tập thông tin.",
    initials: "ML",
    tags: ["Research", "Content"],
  },
  {
    name: "Kiều Ngọc Tuấn",
    role: "Thành viên",
    mssv: "HE161046",
    works: "Nghiên cứu giáo trình lý luận chính trị, tổng hợp tài liệu tham khảo chính quy.",
    initials: "NT",
    tags: ["Research", "Content"],
  },
  {
    name: "Đỗ Quang Anh",
    role: "Thành viên",
    mssv: "HE186977",
    works: "Nghiên cứu giáo trình, biên soạn ngân hàng câu hỏi trắc nghiệm.",
    initials: "QA",
    tags: ["Research", "Content"],
  },
  {
    name: "Nguyễn Tuấn Minh",
    role: "Thành viên",
    mssv: "HE181922",
    works: "Nghiên cứu tài liệu tham khảo, hỗ trợ xây dựng nội dung và slide minh họa.",
    initials: "TM",
    tags: ["Research", "Content"],
  },
  {
    name: "Hoàng Đình Trung",
    role: "Thành viên",
    mssv: "HS180548",
    works: "Hỗ trợ biên tập nội dung, phản biện lý luận học thuật.",
    initials: "ĐT",
    tags: ["Research", "Content", "Presenter"],
  },
  {
    name: "Trần Minh Tú",
    role: "Thành viên",
    mssv: "HE161755",
    works: "Hỗ trợ kiểm định thông tin chính quy, rà soát cấu trúc tư liệu.",
    initials: "MT",
    tags: ["Research", "Content"],
  }
];

export default function Member() {
  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-[#FDF6E3] to-white flex flex-col justify-center items-center select-none">
      
      {/* Background Vietnam map with low opacity */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-5 pointer-events-none"
        style={{ backgroundImage: 'url("/imgs/vnmap-3d.png")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 pointer-events-none" />

      {/* Gold star particles */}
      <Particles
        className="absolute inset-0 z-10"
        quantity={50}
        staticity={30}
        ease={70}
        color="#b91c1c"
        size={1.2}
      />

      <div className="max-w-6xl w-full relative z-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Users className="w-4.5 h-4.5" /> Thành viên dự án
          </div>
          
          <h1 className="text-4xl md:text-5xl font-title tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-amber-600 to-red-700 drop-shadow-[0_0_8px_rgba(185,28,28,0.2)]">
            BAN ĐIỀU PHỐI HỢP LỰC
          </h1>
          <p className="text-stone-500 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Đội ngũ phát triển dự án "Đại Đoàn Kết" - HCM202, kết hợp nghiên cứu lý luận chính trị và ứng dụng công nghệ số.
          </p>
        </div>

        {/* Member cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-center">
          {members.map((member) => {
            const isLeader = member.role === "TRƯỞNG NHÓM";
            
            return (
              <div 
                key={member.name}
                className={`gold-glow-panel rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] bg-white/90 border relative group overflow-hidden ${
                  isLeader ? "border-red-600/40 shadow-[0_0_20px_rgba(185,28,28,0.1)]" : "border-red-800/15"
                }`}
              >
                {/* Background light indicator for leader */}
                {isLeader && (
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-red-600/10 blur-xl pointer-events-none" />
                )}

                <div>
                  {/* Card top: initials icon and leader badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${
                      isLeader 
                        ? "bg-red-600/15 text-red-600 border-red-600/30 shadow-[0_0_10px_rgba(185,28,28,0.15)]" 
                        : "bg-stone-200/60 text-stone-600 border-stone-300/50"
                    }`}>
                      {member.initials}
                    </div>

                    {isLeader && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-red-600 text-white tracking-wider shadow-md">
                        <Shield className="w-3.5 h-3.5" /> Trưởng Nhóm
                      </span>
                    )}
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-xl font-bold font-heading text-stone-800 group-hover:text-red-600 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <div className="flex gap-2 items-center mt-0.5 mb-4">
                    <span className="text-xs font-semibold text-stone-400">
                      {member.role}
                    </span>
                    <span className="text-stone-400">|</span>
                    <span className="text-xs font-mono font-semibold text-red-700/80">
                      {member.mssv}
                    </span>
                  </div>

                  {/* Works / Responsibility */}
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    {member.works}
                  </p>
                </div>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-red-800/8">
                  {member.tags.map((tag) => {
                    let IconComponent = BookOpen;
                    if (tag === "Dev") IconComponent = Code;
                    if (tag === "Presenter") IconComponent = Presentation;
                    
                    return (
                      <span 
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide bg-stone-200/60 border border-stone-300/50 text-stone-600"
                      >
                        <IconComponent className="w-3 h-3" /> {tag}
                      </span>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
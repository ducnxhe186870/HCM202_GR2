import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../aceternityui/draggable-card";
import ReactMarkdown from "react-markdown";
import { TypingAnimation } from "../magicui/Text Animations/TypingAnimation";

const items = [
  {
    text: `
### Ví dụ lịch sử
- **Kháng chiến chống Pháp**: Việt Minh quy tụ công nhân, nông dân, trí thức, tư sản dân tộc.  
- **Kháng chiến chống Mỹ**: Nhân dân cả nước đồng lòng, đồng thời nhận được sự ủng hộ to lớn từ phong trào phản chiến và bạn bè quốc tế.  
    `,
    className: "absolute top-40 left-[58%] rotate-[6deg] prose prose-invert prose-amber max-w-xs gold-glow-panel p-6 rounded-2xl border border-amber-900/30 text-neutral-200 shadow-2xl select-none",
  },
  {
    text: `
### Đoàn kết trong nước & quốc tế
Hồ Chí Minh nhấn mạnh: **đại đoàn kết trong nước phải gắn với đoàn kết quốc tế**, bao gồm:  
- Phong trào cộng sản & công nhân  
- Các lực lượng tiến bộ trên thế giới  
- Nhân dân yêu chuộng hòa bình  
`,
    className: "absolute top-10 left-[48%] rotate-[4deg] prose prose-invert prose-amber max-w-xs gold-glow-panel p-6 rounded-2xl border border-amber-900/30 text-neutral-200 shadow-2xl select-none",
  },
  {
    text: `
### Lãnh đạo của Đảng
- Đảng Cộng sản Việt Nam phải là **lực lượng lãnh đạo khối đại đoàn kết**.  
- Đảng phải:  
  - **Đứng vững trên lập trường giai cấp công nhân**  
  - **Giải quyết hài hòa mối quan hệ giữa lợi ích giai cấp và lợi ích dân tộc**  
    `,
    className: "absolute top-48 left-[20%] rotate-[-4deg] prose prose-invert prose-amber max-w-xs gold-glow-panel p-6 rounded-2xl border border-amber-900/30 text-neutral-200 shadow-2xl select-none",
  },
  {
    text: `
## Chủ thể đoàn kết
Theo Hồ Chí Minh, **chủ thể của đoàn kết là toàn dân Việt Nam** – không phân biệt dân tộc, tôn giáo, giai cấp, giàu nghèo, tuổi tác.
Trong đó, lực lượng nòng cốt vững chắc là **liên minh công – nông – trí thức**, dưới sự lãnh đạo của Đảng.
    `,
    className: "absolute top-12 left-[15%] rotate-[-3deg] prose prose-invert prose-amber max-w-xs gold-glow-panel p-6 rounded-2xl border border-amber-900/30 text-neutral-200 shadow-2xl select-none",
  },
];

const finalText = `
### Ý nghĩa thực tiễn
Điều này cho thấy:  
- Đại đoàn kết **không chỉ là sức mạnh dân tộc** mà còn là **cầu nối để Việt Nam hội nhập quốc tế** trong bối cảnh toàn cầu hóa.  
- Nền tảng càng vững chắc → Khối đại đoàn kết càng mở rộng.  
- **Không một thế lực nào có thể làm suy yếu được sức mạnh ấy.**
`;

export default function Part2() {
  return (
    <div className="w-full min-h-[90vh] bg-gradient-to-b from-[#0d0e12] to-[#12131a] p-6 md:p-10 flex flex-col relative select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.06),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10">
        <h3 className="flex justify-center items-center relative uppercase text-amber-500 font-heading text-4xl md:text-5xl mt-4 mb-6 z-10 drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]">
          <TypingAnimation
            startOnView={true}
            duration={50}
            className="text-amber-500 font-heading text-3xl md:text-4xl text-center"
          >
            Lực lượng của khối đại đoàn kết
          </TypingAnimation>
        </h3>

        <div className="relative text-xs text-neutral-500 text-center mb-6">
          * Di chuột và kéo thả các tấm thẻ để khám phá các khía cạnh khác nhau
        </div>

        <DraggableCardContainer className="relative flex min-h-[550px] w-full items-center justify-center overflow-visible">
          {/* Final Text Card (glowing centerpiece) */}
          <div className="bg-[#12131a]/95 text-neutral-200 border border-amber-500/40 absolute prose prose-invert prose-amber top-1/2 mx-auto max-w-sm -translate-y-1/2 text-start p-6 rounded-2xl shadow-[0_0_30px_rgba(217,119,6,0.15)] backdrop-blur-md z-0 pointer-events-none">
            <ReactMarkdown>{finalText}</ReactMarkdown>
          </div>
          
          {items.map((item, idx) => (
            <DraggableCardBody key={idx} className={item.className}>
              <ReactMarkdown>{item.text}</ReactMarkdown>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </div>
  );
}

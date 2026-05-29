// Part1.tsx — fixed: no snap-back, fade-to-next in-place
import React, { useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Hand } from "lucide-react";
import { TypingAnimation } from "../magicui/Text Animations/TypingAnimation";
import { Lens } from "../aceternityui/lens";

const texts = [
  `
# Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc

## 1. Đại đoàn kết là chiến lược, không phải thủ đoạn
Trong tư tưởng Hồ Chí Minh, **đại đoàn kết toàn dân tộc** không phải là sách lược hay thủ đoạn chính trị,  
mà là **chiến lược lâu dài, nhất quán** của cách mạng Việt Nam.  

Người nói rõ:  

> “Sử dạy cho ta bài học này: Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do.  
> Trái lại lúc nào dân ta không đoàn kết thì bị nước ngoài xâm lấn”.

## 2. Ý nghĩa sống còn của đại đoàn kết
- Đây là vấn đề **mang tính sống còn** của dân tộc Việt Nam.  
- Vì vậy, chiến lược này được duy trì cả trong:
  - Cách mạng dân tộc dân chủ nhân dân.  
  - Cách mạng xã hội chủ nghĩa.  

## 3. Sự điều chỉnh linh hoạt trong từng giai đoạn
Trong mỗi giai đoạn cách mạng:  
- Trước những yêu cầu và nhiệm vụ khác nhau:  
  - **Chính sách và phương pháp tập hợp đại đoàn kết** có thể và cần thiết phải **điều chỉnh** cho phù hợp với từng đối tượng.  
- Tuy nhiên:  
  - **Chủ trương đại đoàn kết toàn dân tộc** không bao giờ được thay đổi.  
  - Vì đó là **nhân tố quyết định sự thành bại của cách mạng**.

`,

  `
### Hồ Chí Minh nhiều lần nhấn mạnh:

> *“Đoàn kết là sức mạnh của chúng ta.”*  
> *“Đoàn kết là sức mạnh, đoàn kết là thắng lợi.”*  
> *“Đoàn kết là sức mạnh, là then chốt của thành công.”*  
> *“Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.”*

Điều này cho thấy, đại đoàn kết là vấn đề **chiến lược, then chốt của thành công cách mạng**, đồng thời vừa là **mục tiêu**, vừa là **nhiệm vụ hàng đầu**. Vì cách mạng là sự nghiệp của quần chúng, do quần chúng và vì quần chúng. Chính vì vậy Đảng phải thức tỉnh, tập hợp, tổ chức, lãnh đạo nhân dân thành khối đại đoàn kết, tạo nên sức mạnh tổng hợp.
`,

  `
### **Thực tiễn chứng minh**

Nhìn lại lịch sử, cuối thế kỷ XIX, các phong trào **Cần Vương, Đông Du, Đông Kinh Nghĩa Thục…** thất bại vì chưa tập hợp được sức mạnh toàn dân.  

Nhưng đến **Cách mạng Tháng Tám 1945**, nhờ có khối đại đoàn kết dân tộc dưới sự lãnh đạo của Đảng, nhân dân ta đã giành được độc lập.  

Trong lời kết thúc buổi ra mắt **Đảng Lao động Việt Nam** ngày *3-3-1951*, Hồ Chí Minh tuyên bố:

> *“Mục đích của Đảng Lao động Việt Nam có thể gồm trong tám chữ là:  
> **ĐOÀN KẾT TOÀN DÂN, PHỤNG SỰ TỔ QUỐC**”*

Trong **kháng chiến chống Pháp, chống Mỹ**, và cả trong **công cuộc Đổi mới sau 1986**, chính sức mạnh đoàn kết đã đưa dân tộc đi đến thắng lợi. Đây là minh chứng hùng hồn cho **tư tưởng Hồ Chí Minh về vai trò của đoàn kết**.

`,
];

export default function Part1() {
  const [hovering, setHovering] = useState(false);

  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const startXRef = useRef<number | null>(null);
  const isPointerDownRef = useRef(false);
  const hasThrownRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const inactivityTimerRef = useRef<number | null>(null);
  const lastRenderedXRef = useRef<number>(0);
  const [showHint, setShowHint] = useState(true);
  const rafIdRef = useRef<number | null>(null);
  const pendingTransformRef = useRef<{
    x: number;
    y: number;
    rotate: number;
  } | null>(null);

  const throwThreshold = 110; // px threshold to trigger throw

  async function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    startXRef.current = e.clientX;
    isPointerDownRef.current = true;
    hasThrownRef.current = false;
    setIsDragging(true);
    setShowHint(false);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    await controls.set({ x: 0, opacity: 1, scale: 1, zIndex: 50 });
  }

  async function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (
      !isPointerDownRef.current ||
      hasThrownRef.current ||
      startXRef.current == null
    )
      return;
    const distance = Math.abs(e.clientX - startXRef.current);
    const effective = distance < 2 ? 0 : distance; // deadzone to avoid jitter
    const leftX = -effective; // always move left relative to distance
    const rotate = -Math.min(18, distance * 0.08);
    const yLift = -Math.min(40, distance * 0.12);

    // move with the pointer (left only)
    if (Math.abs(leftX - lastRenderedXRef.current) > 0.5) {
      pendingTransformRef.current = { x: leftX, y: yLift, rotate };
      if (rafIdRef.current == null) {
        rafIdRef.current = window.requestAnimationFrame(() => {
          const p = pendingTransformRef.current;
          if (p) {
            controls.set({ x: p.x, y: p.y, rotate: p.rotate });
            lastRenderedXRef.current = p.x;
          }
          rafIdRef.current = null;
        });
      }
    }

    // reset inactivity timer: if user stops moving without releasing, snap back
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    inactivityTimerRef.current = window.setTimeout(async () => {
      if (isPointerDownRef.current && !hasThrownRef.current) {
        await controls.start({
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 26 },
        });
        isPointerDownRef.current = false;
        setIsDragging(false);
      }
    }, 180);

    // if beyond threshold, finish throw immediately
    if (distance > throwThreshold) {
      hasThrownRef.current = true;
      setIsDragging(false);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      pendingTransformRef.current = null;
      controls.stop();
      await controls.start({
        x: -900,
        y: yLift - 40,
        rotate: -25,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeIn" },
      });
      isPointerDownRef.current = false;
      startXRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }

      setIndex((s) => (s + 1) % texts.length);
      await controls.set({ x: 0, y: 0, rotate: 0, opacity: 0, scale: 1 });
      await controls.start({
        opacity: 1,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      });
    }
  }

  async function handlePointerUp(e?: React.PointerEvent<HTMLDivElement>) {
    // if not thrown, spring back to center
    if (!hasThrownRef.current) {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      pendingTransformRef.current = null;
      controls.stop();
      await controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 26 },
      });
    }
    isPointerDownRef.current = false;
    startXRef.current = null;
    setIsDragging(false);
    if (e) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
  }

  async function handlePointerCancel(e: React.PointerEvent<HTMLDivElement>) {
    await handlePointerUp(e);
  }

  async function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    // treat leave as up to avoid stuck state
    if (isPointerDownRef.current) {
      await handlePointerUp(e);
    }
  }

  return (
    <div className="w-full min-h-[80vh] bg-gradient-to-b from-[#FDF6E3] to-white p-6 md:p-12 flex flex-col items-center justify-center relative">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Title & Swipable Cards */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
          <h3 className="uppercase text-red-700 font-heading text-4xl md:text-5xl mb-10 text-center lg:text-left drop-shadow-[0_0_8px_rgba(185,28,28,0.2)]">
            <TypingAnimation
              startOnView={true}
              duration={50}
              className="text-red-700 font-heading text-3xl md:text-4xl"
            >
              Vai trò của đại đoàn kết
            </TypingAnimation>
          </h3>

          <div
            className="relative"
            style={{ touchAction: "none" }}
          >
            {/* BACK LAYERS (visual gold-glowing stack effect) */}
            <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-red-800/10 bg-white/40 backdrop-blur-sm -z-10 shadow-lg" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border border-red-800/15 bg-white/60 backdrop-blur-sm -z-10 shadow-md" />

            {/* Swipe hint */}
            {showHint && !isDragging && (
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-40 pointer-events-none select-none animate-swipeLeftHint">
                <Hand className="text-red-700 size-12 drop-shadow-[0_0_6px_rgba(185,28,28,0.3)]" />
              </div>
            )}

            {/* TOP (interactive) LAYER - Glowing Glass Plate */}
            <motion.div
              className="relative rounded-2xl border border-red-600/30 font-heading text-stone-700 select-none z-30 shadow-2xl p-8"
              animate={controls}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onPointerLeave={handlePointerLeave}
              whileTap={{ scale: 0.995 }}
              whileHover={{ scale: 1.005 }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)",
                width: "550px",
                maxWidth: "100%",
                cursor: isDragging ? "grabbing" : "grab",
                opacity: 1,
                scale: 1,
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            >
              <div className="absolute top-3 right-4 text-xs font-bold text-red-700/50">
                {index + 1} / {texts.length} • Trượt để xem tiếp
              </div>

              <div className="relative h-96 overflow-y-auto pr-2 dark-scrollbar prose prose-stone max-w-none text-stone-600">
                <ReactMarkdown>{texts[index]}</ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Historical Photo with Lens Zoom */}
        <div className="lg:col-span-5 flex justify-center items-center mt-8 lg:mt-0">
          <div className="relative rounded-2xl border border-red-800/15 p-2 bg-white/80 shadow-2xl w-full max-w-sm">
            <Lens hovering={hovering} setHovering={setHovering}>
              <img
                src="/imgs/bacho.webp"
                alt="Chủ tịch Hồ Chí Minh"
                className="rounded-xl w-full object-cover transform scale-x-[-1] cursor-none shadow-md brightness-90 hover:brightness-100 transition-all duration-300"
              />
            </Lens>
            <div className="text-center mt-3 text-xs text-stone-400 font-semibold italic">
              Bác Hồ kính yêu với khối đại đoàn kết toàn dân tộc
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

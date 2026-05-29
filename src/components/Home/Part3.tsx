import { Link } from "react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, stagger, useAnimate, useInView, AnimatePresence } from "motion/react";
import { cn } from "../../utils/cn";
import { CometCard } from "../aceternityui/Card Components/cometCard";

// Custom TextGenerateEffect with startOnView support
const TextGenerateEffectOnView = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  startOnView = true,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  startOnView?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if ((startOnView && isInView) || !startOnView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    }
  }, [isInView, startOnView, animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="flex flex-wrap justify-center items-center">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-white opacity-0 inline-block mr-2 md:mr-3"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={cn("font-bold", className)}>
      <div className="text-white font-heading text-4xl md:text-5xl leading-tight tracking-normal uppercase text-center [text-shadow:-3px_2px_0px_black] drop-shadow-lg">
        {renderWords()}
      </div>
    </div>
  );
};

// Types
type CardData = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  image: string;
  content: string[];
};

// Animated Tabs Component
const AnimatedTabs = ({ cardData }: { cardData: CardData[] }) => {
  const [activeTab, setActiveTab] = useState(cardData[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!tabsRef.current?.contains(document.activeElement)) return;
    
    switch (e.key) {
      case "ArrowLeft": {
        e.preventDefault();
        const currentIndex = cardData.findIndex((card: CardData) => card.id === activeTab);
        const newLeftIndex = currentIndex > 0 ? currentIndex - 1 : cardData.length - 1;
        setActiveTab(cardData[newLeftIndex].id);
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        const currentRightIndex = cardData.findIndex((card: CardData) => card.id === activeTab);
        const newRightIndex = currentRightIndex < cardData.length - 1 ? currentRightIndex + 1 : 0;
        setActiveTab(cardData[newRightIndex].id);
        break;
      }
      case "Enter":
      case " ":
        e.preventDefault();
        break;
    }
  }, [cardData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown]);

  const activeCard = cardData.find((card: CardData) => card.id === activeTab) || cardData[0];

  const handleTabClick = (cardId: string) => {
    setActiveTab(cardId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tabs Bar */}
      <div 
        ref={tabsRef}
        className="relative mb-8"
        role="tablist"
        aria-label="Điều kiện xây dựng khối đại đoàn kết"
      >
        <div className="flex justify-center gap-2 md:gap-4 bg-black/20 backdrop-blur-sm rounded-full p-2 border border-white/20">
          {cardData.map((card: CardData) => (
            <button
              key={card.id}
              role="tab"
              aria-selected={activeTab === card.id}
              aria-controls={`tabpanel-${card.id}`}
              tabIndex={activeTab === card.id ? 0 : -1}
              className={cn(
                "relative px-3 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 z-10",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
                activeTab === card.id 
                  ? "text-white" 
                  : "text-gray-400 hover:text-gray-200 hover:scale-105"
              )}
              onClick={() => handleTabClick(card.id)}
            >
              {/* Active pill background */}
              {activeTab === card.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: card.color }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 block uppercase font-bold">
                {card.id.toUpperCase()}
              </span>
              <span className="relative z-10 block text-xs opacity-80 hidden sm:block">
                {card.title.slice(0, 20)}...
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <motion.div
        className="relative min-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${activeCard.color}15 0%, ${activeCard.color}25 100%)`
        }}
        animate={prefersReducedMotion ? {} : {
          background: `linear-gradient(135deg, ${activeCard.color}15 0%, ${activeCard.color}25 100%)`
        }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="relative w-full h-full p-6 md:p-8"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <CometCard className="w-full h-full">
                <motion.img
                  src={activeCard.image}
                  alt={activeCard.title}
                  className="w-full h-full object-cover opacity-15 rounded-3xl"
                  loading="lazy"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
              </CometCard>
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60 rounded-3xl" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start h-full min-h-[500px] p-4">
              {/* Left: Image Rectangle */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CometCard 
                  className="relative w-72 h-80 md:w-96 md:h-[420px]"
                  rotateDepth={15}
                  translateDepth={12}
                >
                  <div 
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                    style={{ 
                      border: `6px solid ${activeCard.color}`,
                      boxShadow: `0 0 40px ${activeCard.color}30, 0 20px 60px rgba(0,0,0,0.3)`
                    }}
                  >
                    <img
                      src={activeCard.image}
                      alt={activeCard.title}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 rounded-xl" />
                    
                    {/* Badge */}
                    <div 
                      className="absolute top-4 right-4 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${activeCard.color}E6`,
                        border: `2px solid ${activeCard.color}`
                      }}
                    >
                      {activeCard.id.toUpperCase()}
                    </div>

                    {/* Image Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-xl">
                      <h3 className="text-white font-bold text-lg md:text-xl mb-1 drop-shadow-lg">
                        {activeCard.title.length > 30 ? `${activeCard.title.slice(0, 30)}...` : activeCard.title}
                      </h3>
                      <p className="text-gray-200 text-sm opacity-90">
                        {activeCard.subtitle.length > 40 ? `${activeCard.subtitle.slice(0, 40)}...` : activeCard.subtitle}
                      </p>
                    </div>
                  </div>
                </CometCard>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                className="text-white space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {activeCard.title}
                  </h2>
                  <p className="text-xl text-gray-200 mb-6 italic">
                    {activeCard.subtitle}
                  </p>
                </motion.div>

                {/* Content Scroll Area */}
                <motion.div
                  className="max-h-60 overflow-y-auto space-y-4 pr-4 custom-scrollbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {activeCard.content.map((text: string, index: number) => (
                    <motion.p
                      key={index}
                      className="text-gray-100 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                    >
                      {activeCard.id === "c" && index === 0 ? (
                        <em>"{text.replace(/"/g, "")}"</em>
                      ) : (
                        text
                      )}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Modern Meaning */}
                <motion.div
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <strong className="text-yellow-300">Ý nghĩa hôm nay:</strong>
                  <p className="text-gray-200 mt-2">
                    {activeCard.id === "a" && "Lợi ích chung là mẫu số chung giúp hoà giải khác biệt và tạo nền tảng hợp tác. Khi đặt lợi ích tối cao của dân tộc và lợi ích căn bản của nhân dân lao động lên trên, mọi chính sách, quyết sách và hành động đều dễ được đồng thuận hơn; từ đó giảm xung đột lợi ích, gia tăng tính bền vững trong liên kết xã hội và thúc đẩy phát triển toàn diện."}
                    {activeCard.id === "b" && "Truyền thống lịch sử là nguồn sức mạnh tinh thần, kết nối thế hệ này với thế hệ khác. Việc khơi dậy và gìn giữ giá trị yêu nước, tinh thần nhân nghĩa và truyền thống đoàn kết không chỉ nuôi dưỡng bản sắc dân tộc mà còn tạo động lực tinh thần để cộng đồng cùng vượt khó, chung tay đối mặt thử thách thời đại."}
                    {activeCard.id === "c" && "Khoan dung là điều kiện then chốt để hoá giải mâu thuẫn xã hội và mở cửa cho quá trình hòa giải, tái hoà nhập. Thái độ bao dung giúp xây dựng môi trường chính trị – xã hội ổn định, thu hút sự trở về của những người lầm lạc hay bất đồng trước đây, đồng thời khuyến khích đối thoại, chia sẻ thay vì đối đầu."}
                    {activeCard.id === "d" && "Tin tưởng vào năng lực và phẩm giá của nhân dân là cốt lõi để thúc đẩy sự tham gia rộng rãi và sáng tạo của xã hội. Khi Đảng và Nhà nước dựa vào nhân dân, lắng nghe và trao quyền cho cộng đồng, chính sách sẽ thực tế, hiệu quả hơn; niềm tin ấy cũng tạo nên sức mạnh nội tại để quốc gia tự cường và phát triển bền vững."}
                  </p>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <Link
                    to={`/part3/${activeCard.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      background: `linear-gradient(135deg, ${activeCard.color} 0%, ${activeCard.color}dd 100%)` 
                    }}
                  >
                    🔎 Khám phá chi tiết
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default function Part3() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cardData: CardData[] = [
    {
      id: "a",
      title: "Phải lấy lợi ích chung làm điểm quy tụ",
      subtitle: "đồng thời tôn trọng những lợi ích khác biệt chính đáng",
      color: "#FA8072",
      image: "/imgs/Part3/Phải lấy lợi ích chung làm điểm quy tụ.jpg",
      content: [
        "Phải xử lý tốt quan hệ lợi ích, tìm ra điểm tương đồng và lợi ích chung.",
        "Lấy lợi ích tối cao của dân tộc và lợi ích căn bản của nhân dân lao động làm mục tiêu phấn đấu.",
        "Đây là nguyên tắc bất di bất dịch, là ngọn cờ đoàn kết, là mẫu số chung để quy tụ các tầng lớp, giai cấp, dân tộc, tôn giáo trong Mặt trận.",
      ],
    },
    {
      id: "b",
      title: "Kế thừa truyền thống yêu nước",
      subtitle: "nhân nghĩa – đoàn kết",
      color: "#E49B0F",
      image: "/imgs/Part3/Kế thừa truyền thống yêu nước.jpg",
      content: [
        "Yêu nước – nhân nghĩa – đoàn kết là cội nguồn sức mạnh giúp dân tộc vượt qua thiên tai, địch họa và giành thắng lợi.",
      ],
    },
    {
      id: "c",
      title: "Có lòng khoan dung, độ lượng",
      subtitle: "Lời dạy của Chủ tịch Hồ Chí Minh",
      color: "#059669",
      image: "/imgs/Part3/Có lòng khoan dung, độ lượng.jpg",
      content: [
        '"Năm ngón tay có ngón dài ngón ngắn, nhưng cả năm ngón đều thuộc về một bàn tay. Trong mấy triệu người cũng có người thế này thế khác, nhưng thế này hay thế khác đều dòng dõi tổ tiên ta. Vậy nên phải khoan hồng, đại độ... Có như thế mới thành đoàn kết, có đại đoàn kết thì tương lai chắc chắn sẽ vẻ vang."',
      ],
    },
    {
      id: "d",
      title: "Có niềm tin vào nhân dân",
      subtitle: "Nhân dân là nền tảng của cách mạng",
      color: "#6495ED",
      image: "/imgs/Part3/Có niềm tin vào nhân dân.jpg",
      content: [
        "Nhân dân là nền tảng, gốc rễ, chủ thể của mặt trận.",
        "Là chỗ dựa vững chắc của Đảng, là cội nguồn sức mạnh vô tận quyết định thắng lợi của cách mạng.",
        "Muốn thực hiện đại đoàn kết cần yêu dân, tin dân, dựa vào dân, sống và đấu tranh vì hạnh phúc của nhân dân.",
        "Trong kháng chiến, nhờ tin dân và khoan dung, Đảng đã quy tụ được cả những người từng đứng ở phía bên kia nhưng sau đó quay về với dân tộc.",
      ],
    },
  ];


  return (
    <section
      className="min-h-[100vh] pb-16 relative"
    >
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-overlay"
        style={{
          backgroundImage:
            'url("/imgs/Part3/Điều kiện để xây dựng khối đại đoàn kết toàn dân tộc.jpg")',
        }}
      ></div>
      <div className="z-0 absolute size-full top-0 bg-gradient-to-b from-[#0d0e12]/95 via-[#12131a]/95 to-[#0d0e12]/95 pointer-events-none" />
      {/* <div className="absolute inset-0 animated-bg-enhanced"></div> */}
      {/* Additional patriotic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20"></div>
      {/* Header */}
      <div className="text-center py-12 relative z-10">
        <h1 className="flex justify-center items-center relative mb-4 min-h-[120px] z-10">
          <TextGenerateEffectOnView
            words="Điều kiện để xây dựng khối đại đoàn kết toàn dân tộc"
            className="w-full"
            filter={true}
            duration={2}
            startOnView={true}
          />
        </h1>

        {/* Animated divider */}
        <div
          className={`w-32 h-1 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto mb-6 scale-in`}
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Animated button */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "4.5s" }}
        >
          <Link
            to="/part3"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            📖 Xem chi tiết đầy đủ
          </Link>
        </div>
      </div>

      {/* Animated Tabs Section */}
      <div className="container mx-auto px-6 pb-12 relative z-10">
        <AnimatedTabs cardData={cardData} />
      </div>

      <style>{`
        
        /* CometCard perspective */
        .perspective-distant {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        
        .transform-3d {
          transform-style: preserve-3d;
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
        
        /* Fade in animation for header elements */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        /* Scale animation for divider */
        @keyframes scaleIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .scale-in {
          animation: scaleIn 1s ease-out forwards;
        }
        
        /* Subtle background animation */
        @keyframes backgroundPulse {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animated-bg-enhanced {
          background: linear-gradient(-45deg, 
            rgba(15, 23, 42, 0.85), 
            rgba(30, 41, 59, 0.75), 
            rgba(15, 23, 42, 0.85), 
            rgba(30, 41, 59, 0.9));
          background-size: 400% 400%;
          animation: backgroundPulse 8s ease-in-out infinite;
        }

        /* Enhanced animations */
        @keyframes slideInFromDirection {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideInFromDirection 0.8s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 1.2s ease-out forwards;
          animation-delay: 0.5s;
        }

        .card {
          position: relative;
          width: 320px;
          height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s;
          transition-delay: 0.5s;
          cursor: pointer;
        }

        .card:hover {
          width: 600px;
          transition-delay: 0.5s;
        }

        .card .circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .card .circle::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #191919;
          border: 8px solid var(--clr);
          border-radius: 24px;
          transition: 0.5s, background 0.5s;
          transition-delay: 0.75s, 1s;
          filter: drop-shadow(0 0 15px var(--clr)) drop-shadow(0 0 80px var(--clr));
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card:hover .circle::before {
          transition-delay: 0.5s;
          background: var(--clr);
        }

        .card .circle .logo {
          position: relative;
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 50%;
          transition: 0.5s;
          transition-delay: 0.5s;
          z-index: 2;
        }

        .card:hover .circle .logo {
          transform: scale(0);
          transition-delay: 0s;
        }

        .card .product_img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0) rotate(315deg);
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 50%;
          transition: 0.5s ease-in-out;
        }

        .card:hover .product_img {
          transition-delay: 0.75s;
          top: 50%;
          left: 80%;
          width: 180px;
          height: 180px;
          transform: translate(-50%, -50%) scale(1) rotate(15deg);
        }

        .card .content {
          position: absolute;
          width: 55%;
          left: 15%;
          padding: 20px;
          opacity: 0;
          transition: 0.5s;
          visibility: hidden;
          max-height: 350px;
          overflow-y: auto;
        }

        .card:hover .content {
          transition-delay: 0.75s;
          opacity: 1;
          visibility: visible;
          left: 20px;
        }

        .card .content .badge {
          display: inline-block;
          background: var(--clr);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .card .content h2 {
          color: #fff;
          text-transform: uppercase;
          font-size: 1.8em;
          line-height: 1.2em;
          margin-bottom: 8px;
        }

        .card .content .subtitle {
          color: #ccc;
          font-size: 0.9em;
          margin-bottom: 15px;
          font-style: italic;
        }

        .card .content .scroll-content {
          max-height: 180px;
          overflow-y: auto;
          margin-bottom: 15px;
          padding-right: 10px;
        }

        .card .content .content-text {
          color: #fff;
          font-size: 0.85em;
          line-height: 1.4em;
          margin-bottom: 10px;
          text-align: justify;
        }

        .card .content .modern-meaning {
          color: #ffd700;
          font-size: 0.8em;
          line-height: 1.3em;
          background: rgba(255, 215, 0, 0.1);
          padding: 8px;
          border-radius: 8px;
          border-left: 3px solid #ffd700;
        }

        .card .content::-webkit-scrollbar {
          width: 4px;
        }

        .card .content::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }

        .card .content::-webkit-scrollbar-thumb {
          background: var(--clr);
          border-radius: 4px;
        }

        .card .content .scroll-content::-webkit-scrollbar {
          width: 4px;
        }

        .card .content .scroll-content::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }

        .card .content .scroll-content::-webkit-scrollbar-thumb {
          background: var(--clr);
          border-radius: 4px;
        }

        /* Modern button styling */
        .modern-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 12px;
          text-decoration: none;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .modern-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        .modern-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .modern-btn:hover::before {
          left: 100%;
        }

        @media (max-width: 1024px) {
          .card { width: 300px; height: 360px; }
        }

        @media (max-width: 768px) {
          .card {
            width: 280px;
            height: 320px;
          }
          
          .card:hover {
            width: 320px;
          }

          .card .content {
            width: 70%;
            left: 10%;
          }
          
          .card:hover .content {
            left: 15px;
          }
          
          .card .content h2 {
            font-size: 1.4em;
          }
        }
      `}</style>
    </section>
  );
}

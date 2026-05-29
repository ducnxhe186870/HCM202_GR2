import { useState, useEffect, useRef, useCallback } from "react";
import type { CarouselItem } from "./AudioPlayer";

// Carousel data structure - this should match the data in Part3Detail.tsx
const carouselData: CarouselItem[] = [
  {
    id: "a-loi-ich-chung",
    index: 1,
    title: "Phải lấy lợi ích chung làm điểm quy tụ",
    teaser: "đồng thời tôn trọng những lợi ích khác biệt chính đáng",
    heroImage: "/imgs/Part3/Phải lấy lợi ích chung làm điểm quy tụ.jpg",
    badge: "Mục tiêu 1",
    highlight: true,
    contentHtml:
      "Phải lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng những lợi ích khác biệt chính đáng. Phải xử lý tốt quan hệ lợi ích, tìm ra điểm tương đồng và lợi ích chung. Lấy lợi ích tối cao của dân tộc và lợi ích căn bản của nhân dân lao động làm mục tiêu phấn đấu.",
    color: "#dc2626",
    audio: {
      src: "/audios/a.mp3",
      transcript:
        "Phải lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng những lợi ích khác biệt chính đáng. Phải xử lý tốt quan hệ lợi ích, tìm ra điểm tương đồng và lợi ích chung.",
      duration: 4282,
    },
    subtitle: "Xây dựng khối đại đoàn kết toàn dân tộc",
    quote: {
      text: "Phải xử lý tốt quan hệ lợi ích, tìm ra điểm tương đồng và lợi ích chung. Lấy lợi ích tối cao của dân tộc và lợi ích căn bản của nhân dân lao động làm mục tiêu phấn đấu.",
      source: "Chủ tịch Hồ Chí Minh",
    },
    mainPoints: [
      "Xử lý tốt quan hệ lợi ích giữa các tầng lớp xã hội",
      "Tìm ra điểm tương đồng và lợi ích chung",
      "Lấy lợi ích tối cao của dân tộc làm mục tiêu",
      "Tôn trọng những lợi ích khác biệt chính đáng",
    ],
    media: {
      type: "image",
      src: "/imgs/Part3/Phải lấy lợi ích chung làm điểm quy tụ.jpg",
      alt: "Đại đoàn kết dân tộc",
      caption: "Đại đoàn kết toàn dân tộc là sức mạnh vô địch",
    },
    examples: [
      {
        title: "Chính sách đại đoàn kết dân tộc",
        desc: "Xây dựng khối đại đoàn kết toàn dân tộc trong thời kỳ đổi mới",
        link: "https://www.tapchicongsan.org.vn/media-story/-/asset_publisher/V8hhp4dK31Gf/content/dai-doan-ket-toan-dan-toc-coi-nguon-cua-y-chi-niem-tin-suc-manh-de-xay-dung-bao-ve-to-quoc-trong-ky-nguyen-moi",
        external: true,
      },
      {
        title: "Đoàn kết các tôn giáo",
        desc: "Tôn trọng quyền tự do tín ngưỡng, tôn giáo của nhân dân",
        link: null,
        external: false,
      },
    ],
    references: [
      "Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc",
    ],
    footerNote: "Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc",
  },
  {
    id: "b-truyen-thong",
    index: 2,
    title: "Kế thừa truyền thống yêu nước",
    teaser: "nhân nghĩa – đoàn kết",
    heroImage: "/imgs/Part3/Kế thừa truyền thống yêu nước.jpg",
    badge: "Mục tiêu 2",
    highlight: false,
    contentHtml:
      "Yêu nước – nhân nghĩa – đoàn kết là cội nguồn sức mạnh giúp dân tộc vượt qua thiên tai, địch họa và giành thắng lợi.",
    color: "#d97706",
    audio: {
      src: "/audios/b.mp3",
      transcript:
        "Yêu nước – nhân nghĩa – đoàn kết là cội nguồn sức mạnh giúp dân tộc vượt qua thiên tai, địch họa và giành thắng lợi.",
      duration: 755,
    },
    subtitle: "Truyền thống dân tộc Việt Nam",
    quote: {
      text: "Yêu nước – nhân nghĩa – đoàn kết là cội nguồn sức mạnh giúp dân tộc vượt qua thiên tai, địch họa và giành thắng lợi.",
      source: "Chủ tịch Hồ Chí Minh",
    },
    mainPoints: [
      "Truyền thống yêu nước nồng nàn",
      "Tinh thần nhân nghĩa cao cả",
      "Truyền thống đoàn kết dân tộc",
      "Sức mạnh vượt qua mọi khó khăn",
    ],
    media: {
      type: "image",
      src: "/imgs/Part3/Kế thừa truyền thống yêu nước.jpg",
      alt: "Truyền thống yêu nước",
      caption: "Truyền thống yêu nước của dân tộc Việt Nam",
    },
    examples: [
      {
        title: "Lịch sử dựng nước và giữ nước",
        desc: "Từ thời Hùng Vương đến thời đại Hồ Chí Minh",
        link: null,
        external: false,
      },
    ],
    references: [],
    footerNote: "Truyền thống dân tộc Việt Nam",
  },
  {
    id: "c-khoan-dung",
    index: 3,
    title: "Có lòng khoan dung, độ lượng",
    teaser: "Lời dạy của Chủ tịch Hồ Chí Minh",
    heroImage: "/imgs/Part3/Có lòng khoan dung, độ lượng.jpg",
    badge: "Mục tiêu 3",
    highlight: true,
    contentHtml:
      'Hồ Chí Minh dạy: "Năm ngón tay có ngón dài ngón ngắn, nhưng cả năm ngón đều thuộc về một bàn tay. Trong mấy triệu người cũng có người thế này thế khác, nhưng thế này hay thế khác đều dòng dõi tổ tiên ta. Vậy nên phải khoan hồng, đại độ... Có như thế mới thành đoàn kết, có đại đoàn kết thì tương lai chắc chắn sẽ vẻ vang."',
    color: "#059669",
    audio: {
      src: "/audios/c.mp3",
      transcript:
        "Năm ngón tay có ngón dài ngón ngắn, nhưng cả năm ngón đều thuộc về một bàn tay. Trong mấy triệu người cũng có người thế này thế khác, nhưng thế này hay thế khác đều dòng dõi tổ tiên ta.",
      duration: 1086,
    },
    subtitle: "Tinh thần khoan dung, độ lượng",
    quote: {
      text: "Năm ngón tay có ngón dài ngón ngắn, nhưng cả năm ngón đều thuộc về một bàn tay. Trong mấy triệu người cũng có người thế này thế khác, nhưng thế này hay thế khác đều dòng dõi tổ tiên ta. Vậy nên phải khoan hồng, đại độ... Có như thế mới thành đoàn kết, có đại đoàn kết thì tương lai chắc chắn sẽ vẻ vang.",
      source: "Chủ tịch Hồ Chí Minh",
    },
    mainPoints: [
      "Khoan dung với những khác biệt",
      "Độ lượng với những sai lầm",
      "Đoàn kết trong đa dạng",
      "Tương lai vẻ vang nhờ đoàn kết",
    ],
    media: {
      type: "image",
      src: "/imgs/Part3/Có lòng khoan dung, độ lượng.jpg",
      alt: "Lòng khoan dung, độ lượng",
      caption: "Tinh thần khoan dung, độ lượng của Bác Hồ",
    },
    examples: [
      {
        title: "Chính sách hòa hợp dân tộc",
        desc: "Hòa hợp, hòa giải dân tộc sau chiến tranh",
        link: null,
        external: false,
      },
    ],
    references: [],
    footerNote: "Tư tưởng Hồ Chí Minh về khoan dung, độ lượng",
  },
  {
    id: "d-tin-nhan-dan",
    index: 4,
    title: "Có niềm tin vào nhân dân",
    teaser: "Nhân dân là nền tảng của cách mạng",
    heroImage: "/imgs/Part3/Có niềm tin vào nhân dân.jpg",
    badge: "Mục tiêu 4",
    highlight: false,
    contentHtml:
      "Nhân dân là nền tảng, gốc rễ, chủ thể của mặt trận. Là chỗ dựa vững chắc của Đảng, là cội nguồn sức mạnh vô tận quyết định thắng lợi của cách mạng.",
    color: "#2563eb",
    audio: {
      src: "/audios/d.mp3",
      transcript:
        "Nhân dân là nền tảng, gốc rễ, chủ thể của mặt trận. Là chỗ dựa vững chắc của Đảng, là cội nguồn sức mạnh vô tận quyết định thắng lợi của cách mạng.",
      duration: 835,
    },
    subtitle: "Niềm tin vào sức mạnh nhân dân",
    quote: {
      text: "Nhân dân là nền tảng, gốc rễ, chủ thể của mặt trận. Là chỗ dựa vững chắc của Đảng, là cội nguồn sức mạnh vô tận quyết định thắng lợi của cách mạng.",
      source: "Chủ tịch Hồ Chí Minh",
    },
    mainPoints: [
      "Nhân dân là nền tảng của cách mạng",
      "Tin tưởng vào sức mạnh nhân dân",
      "Dựa vào nhân dân trong mọi hoạt động",
      "Nhân dân quyết định thắng lợi",
    ],
    media: {
      type: "image",
      src: "/imgs/Part3/Có niềm tin vào nhân dân.jpg",
      alt: "Niềm tin vào nhân dân",
      caption: "Bác Hồ với nhân dân",
    },
    examples: [
      {
        title: "Phong trào cách mạng",
        desc: "Nhân dân là lực lượng chính của cách mạng",
        link: null,
        external: false,
      },
    ],
    references: [],
    footerNote: "Tư tưởng Hồ Chí Minh về nhân dân",
  },
];

// Center Mode Carousel Component
export function CenterModeCarousel({
  onOpenModal,
}: {
  onOpenModal: (item: CarouselItem) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const intervalRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = carouselData.length;

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setSlideDirection('left');
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % totalItems);
          setTimeout(() => {
            setIsTransitioning(false);
            setSlideDirection(null);
          }, 100);
        }, 100);
      }
    }, 5000);
  }, [totalItems, isTransitioning]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle autoplay based on state
  useEffect(() => {
    if (isPlaying && !isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isPlaying, isHovered, startAutoplay, stopAutoplay]);

  // Navigation functions with smooth animations
  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 100);
    }, 100);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 100);
    }, 100);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning]);

  // Get visible items (center + adjacent)
  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalItems) % totalItems;
      items.push({
        ...carouselData[index],
        position: i,
        isCenter: i === 0,
      });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-[600px] flex items-center justify-center"
      role="region"
      aria-roledescription="carousel"
      aria-label="Danh sách mục tiêu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold">
          {currentIndex + 1} / {totalItems}
        </span>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 px-3 py-1 rounded-full border border-gray-300 bg-white shadow-sm text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label={
          isPlaying ? "Tạm dừng phát tự động" : "Tiếp tục phát tự động"
        }
        aria-pressed={!isPlaying}
      >
        {isPlaying ? (
          <svg
            className="w-4 h-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {isPlaying ? "Tạm dừng" : "Phát"}
      </button>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 z-40"
        aria-label="Trước"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 z-40"
        aria-label="Sau"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Carousel items */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-16">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {visibleItems.map((item, index) => {
            const isCenter = item.isCenter;
            const isLeft = item.position === -1;
            const isRight = item.position === 1;

            return (
              <div
                key={`${item.id}-${index}`}
                className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
                  isCenter
                    ? "w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[760px] h-[400px] sm:h-[450px] md:h-[480px] z-30 scale-100"
                    : isLeft
                    ? "hidden md:block w-[180px] lg:w-[240px] h-[270px] lg:h-[288px] z-20 scale-90 opacity-60"
                    : isRight
                    ? "hidden md:block w-[180px] lg:w-[240px] h-[270px] lg:h-[288px] z-20 scale-90 opacity-60"
                    : "hidden"
                } ${
                  isTransitioning && isCenter
                    ? slideDirection === 'left'
                      ? 'translate-x-8 opacity-70'
                      : slideDirection === 'right'
                      ? '-translate-x-8 opacity-70'
                      : ''
                    : ''
                }`}
                role="group"
                aria-label={`${item.badge}: ${item.title}`}
                style={{
                  transform: isCenter 
                    ? isTransitioning
                      ? slideDirection === 'left'
                        ? 'translateX(32px) scale(1)'
                        : slideDirection === 'right'
                        ? 'translateX(-32px) scale(1)'
                        : 'translateX(0) scale(1)'
                      : 'translateX(0) scale(1)'
                    : isLeft 
                    ? 'translateX(-64px) scale(0.9)' 
                    : isRight 
                    ? 'translateX(64px) scale(0.9)' 
                    : 'translateX(0) scale(0.9)',
                  transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                  {/* Hero Image */}
                  <div className="relative h-[45%] overflow-hidden">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    {/* Image overlay with badge */}
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.badge}
                    </div>
                    {/* Highlight badge */}
                    {item.highlight && (
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Nổi bật
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 h-[55%] flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.teaser}
                      </p>

                      {/* Quote box */}
                      <div className="border-l-4 border-red-300 bg-red-50 rounded-md p-4 mb-4">
                        <p className="text-sm text-gray-700 italic line-clamp-3">
                          {item.contentHtml}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => onOpenModal(item)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Xem chi tiết đầy đủ
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {carouselData[currentIndex]?.title}
      </div>
    </div>
  );
}

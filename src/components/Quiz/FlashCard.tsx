import React, { useState, useCallback, useEffect, type ReactNode } from "react";
import { cn } from "../../utils/cn";

// Types and Interfaces
export interface FlashCardData {
  id: number;
  question: string | ReactNode;
  answer: string | ReactNode;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface FlashCardProps {
  /** Card data containing question and answer */
  card: FlashCardData;
  /** Custom className for styling */
  className?: string;
  /** Card dimensions */
  width?: string | number;
  height?: string | number;
  /** Flip direction */
  flipDirection?: 'horizontal' | 'vertical';
  /** Disable flip on click */
  disableFlip?: boolean;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when card is flipped */
  onFlip?: (isFlipped: boolean) => void;
  /** Auto flip back after duration (ms) */
  autoFlipBack?: number;
  /** Show card number */
  showCardNumber?: boolean;
  /** Color theme */
  theme?: 'amber' | 'blue' | 'green' | 'purple' | 'red';
}

export interface FlashCardDeckProps {
  /** Array of flashcard data */
  cards: FlashCardData[];
  /** Custom className */
  className?: string;
  /** Show progress */
  showProgress?: boolean;
  /** Auto advance to next card */
  autoAdvance?: boolean;
  /** Auto advance duration (ms) */
  autoAdvanceDuration?: number;
  /** Callback when deck completes */
  onComplete?: () => void;
  /** Callback when card changes */
  onCardChange?: (cardIndex: number, card: FlashCardData) => void;
}

// Theme configurations
const themes = {
  amber: {
    front: 'from-amber-50 to-amber-100 border-amber-300',
    back: 'from-green-50 to-green-100 border-green-300',
    frontAccent: 'bg-amber-500 text-amber-600',
    backAccent: 'bg-green-500 text-green-600'
  },
  blue: {
    front: 'from-blue-50 to-blue-100 border-blue-300',
    back: 'from-indigo-50 to-indigo-100 border-indigo-300',
    frontAccent: 'bg-blue-500 text-blue-600',
    backAccent: 'bg-indigo-500 text-indigo-600'
  },
  green: {
    front: 'from-green-50 to-green-100 border-green-300',
    back: 'from-emerald-50 to-emerald-100 border-emerald-300',
    frontAccent: 'bg-green-500 text-green-600',
    backAccent: 'bg-emerald-500 text-emerald-600'
  },
  purple: {
    front: 'from-purple-50 to-purple-100 border-purple-300',
    back: 'from-violet-50 to-violet-100 border-violet-300',
    frontAccent: 'bg-purple-500 text-purple-600',
    backAccent: 'bg-violet-500 text-violet-600'
  },
  red: {
    front: 'from-red-50 to-red-100 border-red-300',
    back: 'from-rose-50 to-rose-100 border-rose-300',
    frontAccent: 'bg-red-500 text-red-600',
    backAccent: 'bg-rose-500 text-rose-600'
  }
};

// Single FlashCard Component
export function FlashCard({
  card,
  className,
  width = "100%",
  height = "16rem",
  flipDirection = 'horizontal',
  disableFlip = false,
  style,
  onFlip,
  autoFlipBack,
  showCardNumber = true,
  theme = 'amber'
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const themeConfig = themes[theme];

  const handleFlip = useCallback(() => {
    if (disableFlip) return;
    
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    onFlip?.(newFlippedState);
  }, [isFlipped, disableFlip, onFlip]);

  // Auto flip back functionality
  useEffect(() => {
    if (isFlipped && autoFlipBack) {
      const timer = setTimeout(() => {
        setIsFlipped(false);
        onFlip?.(false);
      }, autoFlipBack);
      return () => clearTimeout(timer);
    }
  }, [isFlipped, autoFlipBack, onFlip]);

  // Keyboard accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlip();
    }
  }, [handleFlip]);

  const flipClass = flipDirection === 'horizontal' ? 'rotate-y-180' : 'rotate-x-180';
  const backfaceClass = flipDirection === 'horizontal' ? 'rotate-y-180' : 'rotate-x-180';

  return (
    <div 
      className={cn("perspective-1000", className)}
      style={{ width, height, ...style }}
    >
      <div
        className={cn(
          "relative w-full h-full cursor-pointer transition-transform duration-700 transform-style-preserve-3d",
          !disableFlip && "hover:scale-105",
          isFlipped ? flipClass : ""
        )}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={disableFlip ? -1 : 0}
        role="button"
        aria-label={`Flashcard ${card.id}: ${isFlipped ? 'showing answer' : 'showing question'}`}
        aria-pressed={isFlipped}
      >
        {/* Front Side - Question */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={cn(
            "h-full bg-gradient-to-br border-2 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300",
            themeConfig.front
          )}>
            <div className="flex flex-col h-full">
              {showCardNumber && (
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium text-white",
                    themeConfig.frontAccent.split(' ')[0]
                  )}>
                    {card.category ? `${card.category} ` : ''}#{card.id}
                  </span>
                  <span className={cn(
                    "text-sm font-medium",
                    themeConfig.frontAccent.split(' ')[1]
                  )}>
                    Câu hỏi
                  </span>
                </div>
              )}
              
              <div className="flex-1 flex items-center justify-center p-2">
                <div className="text-gray-800 text-base sm:text-lg font-medium text-center leading-relaxed">
                  {card.question}
                </div>
              </div>
              
              {!disableFlip && (
                <div className={cn(
                  "text-center text-sm mt-4",
                  themeConfig.frontAccent.split(' ')[1]
                )}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Nhấn để xem đáp án
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div className={cn("absolute inset-0 w-full h-full backface-hidden", backfaceClass)}>
          <div className={cn(
            "h-full bg-gradient-to-br border-2 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300",
            themeConfig.back
          )}>
            <div className="flex flex-col h-full">
              {showCardNumber && (
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium text-white",
                    themeConfig.backAccent.split(' ')[0]
                  )}>
                    {card.category ? `${card.category} ` : ''}#{card.id}
                  </span>
                  <span className={cn(
                    "text-sm font-medium",
                    themeConfig.backAccent.split(' ')[1]
                  )}>
                    Đáp án
                  </span>
                </div>
              )}
              
              <div className="flex-1 flex items-center justify-center p-2">
                <div className="text-gray-800 text-lg sm:text-xl font-semibold text-center leading-relaxed">
                  {card.answer}
                </div>
              </div>
              
              {!disableFlip && (
                <div className={cn(
                  "text-center text-sm mt-4",
                  themeConfig.backAccent.split(' ')[1]
                )}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nhấn để xem lại câu hỏi
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FlashCard Deck Component with Navigation
export function FlashCardDeck({
  cards,
  className,
  showProgress = true,
  autoAdvance = false,
  autoAdvanceDuration = 5000,
  onComplete,
  onCardChange
}: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setFlippedCards] = useState<Set<number>>(new Set());
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  const studiedProgress = (studiedCards.size / cards.length) * 100;

  // Auto advance functionality
  useEffect(() => {
    if (autoAdvance && currentIndex < cards.length - 1) {
      const timer = setTimeout(() => {
        goToNext();
      }, autoAdvanceDuration);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, autoAdvance, autoAdvanceDuration]);

  // Call onComplete when finished
  useEffect(() => {
    if (currentIndex >= cards.length - 1 && studiedCards.size === cards.length) {
      onComplete?.();
    }
  }, [currentIndex, studiedCards.size, cards.length, onComplete]);

  // Call onCardChange when card changes
  useEffect(() => {
    if (currentCard) {
      onCardChange?.(currentIndex, currentCard);
    }
  }, [currentIndex, currentCard, onCardChange]);

  const goToNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, cards.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToCard = useCallback((index: number) => {
    if (index >= 0 && index < cards.length) {
      setCurrentIndex(index);
    }
  }, [cards.length]);

  const handleCardFlip = useCallback((isFlipped: boolean) => {
    if (isFlipped) {
      setFlippedCards(prev => new Set(prev).add(currentIndex));
      setStudiedCards(prev => new Set(prev).add(currentIndex));
    }
  }, [currentIndex]);

  const markAsStudied = useCallback(() => {
    setStudiedCards(prev => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const resetProgress = useCallback(() => {
    setFlippedCards(new Set());
    setStudiedCards(new Set());
    setCurrentIndex(0);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        goToNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        goToPrevious();
        break;
      case 'Home':
        event.preventDefault();
        goToCard(0);
        break;
      case 'End':
        event.preventDefault();
        goToCard(cards.length - 1);
        break;
    }
  }, [goToNext, goToPrevious, goToCard, cards.length]);

  console.log('FlashCardDeck rendered with cards:', cards.length);
  console.log('Current card:', currentCard);

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có thẻ nào để hiển thị</p>
        <p className="text-gray-400 text-sm mt-2">Debug: cards = {JSON.stringify(cards)}</p>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có thẻ hiện tại để hiển thị</p>
        <p className="text-gray-400 text-sm mt-2">Debug: currentIndex = {currentIndex}, cards.length = {cards.length}</p>
      </div>
    );
  }

  return (
    <div 
      className={cn("max-w-2xl mx-auto", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Flashcard deck"
    >
      {/* Progress Section */}
      {showProgress && (
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Tiến độ: {currentIndex + 1} / {cards.length}</span>
            <span>Đã học: {studiedCards.size} / {cards.length}</span>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Tiến độ: ${Math.round(progress)}%`}
              />
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${studiedProgress}%` }}
                role="progressbar"
                aria-valuenow={studiedProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Đã học: ${Math.round(studiedProgress)}%`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main FlashCard */}
      <div className="mb-6">
        <FlashCard
          card={currentCard}
          onFlip={handleCardFlip}
          theme={studiedCards.has(currentIndex) ? 'green' : 'amber'}
          className="mx-auto"
          height="20rem"
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
            currentIndex === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
          )}
          aria-label="Thẻ trước"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Trước
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <button
            onClick={markAsStudied}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              studiedCards.has(currentIndex)
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            )}
            aria-label={studiedCards.has(currentIndex) ? "Đã đánh dấu là đã học" : "Đánh dấu là đã học"}
          >
            {studiedCards.has(currentIndex) ? "✓ Đã học" : "Đánh dấu"}
          </button>

          <button
            onClick={resetProgress}
            className="px-3 py-2 bg-gray-600 text-gray-300 hover:bg-gray-500 rounded-lg text-sm font-medium transition-all duration-200"
            aria-label="Đặt lại tiến độ"
          >
            Reset
          </button>
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
            currentIndex === cards.length - 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
          )}
          aria-label="Thẻ sau"
        >
          Sau
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Card Index Indicators */}
      <div className="flex flex-wrap justify-center gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            className={cn(
              "w-8 h-8 rounded-full text-sm font-medium transition-all duration-200",
              index === currentIndex
                ? "bg-amber-500 text-white shadow-lg scale-110"
                : studiedCards.has(index)
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            )}
            aria-label={`Đi đến thẻ ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Completion Message */}
      {studiedCards.size === cards.length && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
          <div className="text-green-400 font-semibold mb-2">🎉 Chúc mừng!</div>
          <div className="text-gray-300">Bạn đã hoàn thành tất cả {cards.length} thẻ học!</div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Phím tắt: ← → (điều hướng), Space/Enter (lật thẻ), Home/End (đầu/cuối)</p>
      </div>
    </div>
  );
}

// Flash Card Data
export const flashCardData: FlashCardData[] = [
  {
    id: 1,
    question: "Theo Hồ Chí Minh, đại đoàn kết toàn dân tộc có vai trò như thế nào?",
    answer: "Là chiến lược lâu dài, nhất quán"
  },
  {
    id: 2,
    question: "Hồ Chí Minh khẳng định: \"Đoàn kết là ...\"",
    answer: "Sức mạnh, then chốt của thành công"
  },
  {
    id: 3,
    question: "Nguyên nhân chủ yếu khiến các phong trào Cần Vương, Đông Du, Đông Kinh Nghĩa Thục... cuối thế kỷ XIX thất bại là:",
    answer: "Chưa tập hợp được sức mạnh toàn dân"
  },
  {
    id: 4,
    question: "Trong khối đại đoàn kết toàn dân tộc, lực lượng nòng cốt là:",
    answer: "Công - nông - trí thức"
  },
  {
    id: 5,
    question: "Theo Hồ Chí Minh, Đảng Cộng sản Việt Nam muốn lãnh đạo khối đại đoàn kết toàn dân tộc thì cần:",
    answer: "Kết hợp hài hòa lợi ích giai cấp và dân tộc"
  },
  {
    id: 6,
    question: "Đại đoàn kết toàn dân tộc phải gắn liền với:",
    answer: "Đoàn kết quốc tế"
  },
  {
    id: 7,
    question: "Nguyên tắc bất di bất dịch để xây dựng khối đại đoàn kết toàn dân tộc là:",
    answer: "Lấy lợi ích chung làm điểm quy tụ"
  },
  {
    id: 8,
    question: "Truyền thống nào được Hồ Chí Minh coi là cội nguồn sức mạnh để đoàn kết dân tộc?",
    answer: "Yêu nước - nhân nghĩa - đoàn kết"
  },
  {
    id: 9,
    question: "Hồ Chí Minh ví dụ \"Năm ngón tay có ngón dài ngón ngắn... Có như thế mới thành đoàn kết, có đại đoàn kết thì tương lai chắc chắn sẽ vẻ vang\" để nhấn mạnh điều gì?",
    answer: "Cần phải khoan dung, độ lượng để đoàn kết"
  },
  {
    id: 10,
    question: "Nguyên tắc tối cao trong tư tưởng Hồ Chí Minh về xây dựng khối đại đoàn kết toàn dân tộc là:",
    answer: "Yêu dân, tin dân, dựa vào dân, vì dân"
  },
  {
    id: 11,
    question: "Trong tư tưởng Hồ Chí Minh, chủ thể của khối đại đoàn kết toàn dân tộc là:",
    answer: "Toàn dân Việt Nam không phân biệt dân tộc, tôn giáo, giai cấp"
  },
  {
    id: 12,
    question: "Theo Hồ Chí Minh, để lãnh đạo khối đại đoàn kết, Đảng Cộng sản Việt Nam cần đứng vững trên lập trường nào?",
    answer: "Giai cấp công nhân"
  },
  {
    id: 13,
    question: "Trong kháng chiến chống Mỹ, sức mạnh của đại đoàn kết dân tộc còn được củng cố nhờ:",
    answer: "Sự hỗ trợ từ phong trào phản chiến và nhân dân tiến bộ thế giới"
  },
  {
    id: 14,
    question: "Theo Hồ Chí Minh, muốn thực hiện đại đoàn kết phải:",
    answer: "Đặt lợi ích dân tộc và nhân dân lao động làm mục tiêu phấn đấu"
  },
  {
    id: 15,
    question: "Nguyên lý mácxít nào được Hồ Chí Minh quán triệt khi khẳng định \"Cách mạng là sự nghiệp của quần chúng\"?",
    answer: "Nguyên lý quần chúng là động lực của lịch sử"
  },
  {
    id: 16,
    question: "Hình thức tổ chức cơ bản của khối đại đoàn kết dân tộc theo Hồ Chí Minh là gì?",
    answer: "Mặt trận dân tộc thống nhất"
  },
  {
    id: 17,
    question: "Nguyên tắc quan trọng nhất trong hoạt động của Mặt trận dân tộc thống nhất là:",
    answer: "Hiệp thương dân chủ"
  },
  {
    id: 18,
    question: "Nội dung nào KHÔNG thuộc nguyên tắc hoạt động của Mặt trận dân tộc thống nhất?",
    answer: "Chỉ tập hợp công - nông"
  },
  {
    id: 19,
    question: "Theo Hồ Chí Minh, nền tảng để hình thành Mặt trận dân tộc thống nhất là gì?",
    answer: "Lợi ích tối cao của dân tộc"
  },
  {
    id: 20,
    question: "Một phương thức quan trọng để xây dựng khối đại đoàn kết dân tộc là:",
    answer: "Thống nhất ý chí và hành động trên cơ sở lợi ích dân tộc"
  },
  {
    id: 21,
    question: "Để xây dựng đại đoàn kết dân tộc, Hồ Chí Minh đặc biệt coi trọng yếu tố nào?",
    answer: "Lòng tin và tinh thần yêu nước"
  },
  {
    id: 22,
    question: "Tinh thần đoàn kết của Hồ Chí Minh được thể hiện qua khẩu hiệu nào?",
    answer: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công"
  },
  {
    id: 23,
    question: "Trong khối đại đoàn kết dân tộc, Hồ Chí Minh nhấn mạnh phải:",
    answer: "Tôn trọng sự khác biệt và kết hợp hài hòa lợi ích"
  },
  {
    id: 24,
    question: "Một phương thức xây dựng khối đại đoàn kết dân tộc là:",
    answer: "Củng cố mối quan hệ giữa Đảng, Nhà nước và Nhân dân"
  },
  {
    id: 25,
    question: "Ý nghĩa lớn nhất của việc xây dựng khối đại đoàn kết dân tộc theo Hồ Chí Minh là:",
    answer: "Tạo sức mạnh tổng hợp để giành và giữ độc lập dân tộc"
  },
  {
    id: 26,
    question: "Trong các giai đoạn cách mạng, Mặt trận dân tộc thống nhất có thể thay đổi tên gọi, nhưng bản chất là gì?",
    answer: "Tổ chức tập hợp mọi lực lượng yêu nước dưới sự lãnh đạo của Đảng"
  },
  {
    id: 27,
    question: "Theo Hồ Chí Minh, đoàn kết trong Mặt trận dân tộc thống nhất phải dựa trên phương châm nào?",
    answer: "Cầu đồng tồn dị"
  },
  {
    id: 28,
    question: "Hồ Chí Minh yêu cầu việc phê bình trong khối đoàn kết phải được thực hiện như thế nào?",
    answer: "Trên lập trường thân ái, vì nước, vì dân"
  },
  {
    id: 29,
    question: "Phương thức cơ bản nhất để xây dựng khối đại đoàn kết dân tộc, theo Hồ Chí Minh, là gì?",
    answer: "Dân vận khéo"
  },
  {
    id: 30,
    question: "Mục đích cuối cùng của việc thành lập các đoàn thể quần chúng là gì?",
    answer: "Gắn kết quần chúng vào khối đại đoàn kết chung trong Mặt trận"
  }
];

import { useState } from "react";
import {
  FlashCard,
  FlashCardDeck,
  flashCardData,
  type FlashCardData,
} from "../components/Quiz/FlashCard";
import { Particles } from "../components/magicui/Special Effect/particles";

export default function FlashCardStudy() {
  console.log("FlashCardStudy component rendered!");
  console.log("flashCardData length:", flashCardData.length);

  const [studyMode, setStudyMode] = useState<"deck" | "grid">("deck");
  const [completionMessage, setCompletionMessage] = useState<string>("");

  const handleComplete = () => {
    setCompletionMessage("Chúc mừng! Bạn đã hoàn thành tất cả các thẻ học!");
    setTimeout(() => setCompletionMessage(""), 5000);
  };

  const handleCardChange = (cardIndex: number, card: FlashCardData) => {
    // Log hoặc track progress nếu cần
    console.log(`Đang học thẻ ${cardIndex + 1}: ${card.question}`);
  };

  // Check if flashCardData is empty
  if (!flashCardData || flashCardData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Lỗi: Không có dữ liệu flashcard
          </h1>
          <p className="text-gray-300">
            Vui lòng kiểm tra lại dữ liệu flashcard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative p-6 pt-20"
      style={{
        backgroundImage: 'url("/imgs/Quiz đại đoàn kết dân tộc.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(15, 23, 42, 0.9) 100%)",
        }}
      />

      {/* Particles Background Effect */}
      <Particles
        className="absolute inset-0 z-[11]"
        quantity={60}
        staticity={40}
        ease={80}
        color="#fbbf24"
        size={1.0}
        vx={0.05}
        vy={0.05}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-600/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            Thẻ ghi nhớ FlashCard
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Tư tưởng Hồ Chí Minh về Đại đoàn kết toàn dân tộc
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Ôn tập kiến thức qua 30 thẻ ghi nhớ. Sử dụng phím mũi tên hoặc nhấn
            để điều hướng
          </p>

          {/* Study Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setStudyMode("deck")}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  studyMode === "deck"
                    ? "bg-amber-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Chế độ từng thẻ
              </button>
              <button
                onClick={() => setStudyMode("grid")}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  studyMode === "grid"
                    ? "bg-amber-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Chế độ lưới
              </button>
            </div>
          </div>

          {/* Completion Message */}
          {completionMessage && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold">
              {completionMessage}
            </div>
          )}
        </div>

        {/* Debug Info */}
        {/* <div className="mb-8 p-4 bg-gray-800/50 rounded-lg text-center">
          <p className="text-white">Debug: StudyMode = {studyMode}</p>
          <p className="text-white">
            FlashCard Data Length: {flashCardData.length}
          </p>
        </div> */}

        {/* Main Content */}
        {studyMode === "deck" ? (
          <div className="text-center">
            {/* <p className="text-white mb-4">Loading FlashCardDeck...</p> */}
            <FlashCardDeck
              cards={flashCardData}
              showProgress={true}
              onComplete={handleComplete}
              onCardChange={handleCardChange}
              className="max-w-4xl mx-auto"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {flashCardData.map((card) => (
              <FlashCard
                key={card.id}
                card={card}
                height="16rem"
                theme="amber"
                className="mx-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

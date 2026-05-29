import { useState, useEffect } from "react";
import type { CarouselItem } from "./AudioPlayer";
import { AudioPlayer } from "./AudioPlayer";
import { ShareButton } from "./ShareButton";
import { useFocusTrap } from "./useFocusTrap";

// Detailed Modal Component
export function DetailModal({
  item,
  isOpen,
  onClose,
  activeAudioId,
  onAudioPlay,
  onAudioPause,
}: {
  item: CarouselItem;
  isOpen: boolean;
  onClose: () => void;
  activeAudioId: string | null;
  onAudioPlay: (id: string) => void;
  onAudioPause: () => void;
}) {
  const modalRef = useFocusTrap(isOpen);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${item.id}`}
        aria-describedby={`modal-description-${item.id}`}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] w-full max-w-[min(1100px,92vw)] md:max-w-[min(900px,94vw)] lg:max-w-[1100px]"
        >
          {/* Header */}
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 relative"
            style={{ minHeight: "140px" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Badge */}
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                  {item.index}
                </div>

                <div>
                  <h2
                    id={`modal-title-${item.id}`}
                    className="text-2xl md:text-3xl font-extrabold mb-2"
                  >
                    {item.title}
                  </h2>
                  <p
                    id={`modal-description-${item.id}`}
                    className="text-lg opacity-90"
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Đóng"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px-80px)]">
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Quote Box */}
                  {item.quote && (
                    <div className="bg-gray-50 border-l-4 border-red-300 p-6 rounded-lg">
                      <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
                        "{item.quote.text}"
                      </blockquote>
                      <cite className="text-red-600 font-semibold">
                        — {item.quote.source}
                      </cite>
                    </div>
                  )}

                  {/* Audio Player */}
                  {item.audio && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Nghe âm thanh
                      </h3>
                      <AudioPlayer
                        item={item}
                        isActive={activeAudioId === item.id}
                        onPlay={onAudioPlay}
                        onPause={onAudioPause}
                      />
                    </div>
                  )}

                  {/* Main Content */}
                  {item.mainPoints && item.mainPoints.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Nội dung chính
                      </h3>
                      <ul className="space-y-3">
                        {item.mainPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Examples */}
                  {item.examples && item.examples.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Ví dụ thực tiễn
                      </h3>
                      <div className="space-y-4">
                        {item.examples.map((example, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 border border-blue-100"
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {example.title}
                            </h4>
                            <p className="text-gray-700 mb-3">{example.desc}</p>
                            {example.link && (
                              <a
                                href={example.link}
                                target={example.external ? "_blank" : "_self"}
                                rel={
                                  example.external ? "noopener noreferrer" : ""
                                }
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                              >
                                {example.external && (
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                )}
                                {example.external ? "Xem thêm" : "Chi tiết"}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* References */}
                  {item.references && item.references.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Tài liệu tham khảo
                      </h3>
                      <ul className="space-y-2">
                        {item.references.map((ref, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {typeof ref === 'string' ? (
                              ref
                            ) : (
                              <a
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                {ref.title}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column - Media */}
                <div className="lg:col-span-1">
                  {item.media && (
                    <div className="sticky top-6">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                        <div className="relative">
                          <img
                            src={item.media.src}
                            alt={item.media.alt}
                            className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setIsLightboxOpen(true)}
                          />
                          {item.media.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                              <p className="text-sm">{item.media.caption}</p>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <button
                            onClick={() => setIsLightboxOpen(true)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Xem ảnh
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">{item.footerNote}</div>
            <div className="flex items-center gap-3">
              <ShareButton item={item} />
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && item.media && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-60 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={item.media.src}
              alt={item.media.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200"
              aria-label="Đóng ảnh"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Screen reader announcement */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Đã mở chi tiết: {item.title}
      </div>
    </>
  );
}

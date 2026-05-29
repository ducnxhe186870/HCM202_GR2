import { Link } from "react-router";
import { useState, useEffect } from "react";
import TopBar from "../TopBar";
import data from "../../data/gr2.json";
import { TextAnimate } from "../magicui/Text Animations/TextAnimate";
import { CenterModeCarousel } from "./CenterModeCarousel";
import { DetailModal } from "./DetailModal";
import type { CarouselItem } from "./AudioPlayer";

type SectionData = {
  id: string;
  label: string;
  subtitle: string;
  teaser: string;
  color: string;
  image: string;
  content: string;
};

type PageData = {
  pageTitle: string;
  hero: {
    subtitle: string;
    highlight: string;
  };
  sections: SectionData[];
  references: Array<{
    title: string;
    note: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};

export default function Part3Detail() {
  const pageData = data as PageData;
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Also ensure body scroll is reset
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Prevent any scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []); // Empty dependency array means this runs only once when component mounts

  // Audio player handlers
  const handleAudioPlay = (audioId: string) => {
    setActiveAudioId(audioId);
  };

  const handleAudioPause = () => {
    setActiveAudioId(null);
  };

  // Modal handlers
  const handleOpenModal = (item: CarouselItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Set page title and meta description
  useEffect(() => {
    document.title = pageData.seo.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageData.seo.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = pageData.seo.description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", pageData.seo.keywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = pageData.seo.keywords;
      document.head.appendChild(meta);
    }
  }, [pageData.seo]);

  // Main page with carousel
  return (
    <main className="relative min-h-screen" lang="vi">
      {/* Local NavBar */}
      <div className="relative z-20">
  <TopBar />
      </div>

      {/* Enhanced Header with Parallax Effect */}
      <header
        className="relative z-10 min-h-[75vh] md:min-h-[82vh] py-20 md:py-24 bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'url("/imgs/Part3/Bác Hồ.jpg")' }}
      >
        {/* Enhanced Overlay with Patriotic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-black/60 to-yellow-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-red-500 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-yellow-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: "1s"}}></div>
        
        {/* Main Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto pb-16">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-red-600/20 to-yellow-600/20 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wider uppercase">Tư tưởng Hồ Chí Minh</span>
          </div>
 
          {/* Main Title with Enhanced Effects */}
          <h1 className="flex justify-center items-center relative mb-8">
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView={true}
              duration={2}
              className="text-white font-bold text-3xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-center [text-shadow:0_4px_20px_rgba(0,0,0,0.8)] drop-shadow-2xl"
            >
              {pageData.pageTitle}
            </TextAnimate>
          </h1>
 
          {/* Subtitle with Stagger Animation */}
          <div className="mb-8 animate-fade-in-up" style={{animationDelay: "1s"}}>
            <p className="text-xl md:text-3xl text-white/95 mb-6 font-light leading-relaxed">
              {pageData.hero.subtitle}
            </p>
          </div>
          {/* Enhanced Divider */}
          <div className="flex items-center justify-center mb-8 animate-fade-in-up" style={{animationDelay: "1.5s"}}>
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-16"></div>
            <div className="mx-4 w-12 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-full shadow-lg"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-16"></div>
          </div>
 
          {/* Quote with Enhanced Styling */}
          <blockquote className="relative animate-fade-in-up" style={{animationDelay: "2s"}}>
            <div className="absolute -top-4 -left-4 text-6xl text-red-400/30 font-serif">"</div>
            <p className="text-lg md:text-2xl italic text-white/90 font-light leading-relaxed max-w-4xl mx-auto relative z-10 px-8">
              {pageData.hero.highlight}
            </p>
            <div className="absolute -bottom-4 -right-4 text-6xl text-yellow-400/30 font-serif">"</div>
          </blockquote>
        </div>
 
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2 font-medium">Cuộn xuống</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main content area with enhanced design */}
      <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Section Transition */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/10 to-transparent"></div>
        
        {/* Enhanced Page title section */}
        <div className="relative text-center py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Section Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-yellow-100 border border-red-200 mb-8">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V8z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 text-sm font-semibold tracking-wide">Nội dung chính</span>
            </div>

            <h2 className="flex justify-center items-center relative mb-6">
              <TextAnimate
                animation="slideUp"
                by="word"
                startOnView={true}
                duration={1.5}
                className="text-gray-900 font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-center"
              >
                Khám phá chi tiết từng mục tiêu
              </TextAnimate>
            </h2>

            {/* Enhanced Divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-400"></div>
                <div className="mx-3 w-16 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-full shadow-lg"></div>
                <div className="w-8 h-px bg-gradient-to-r from-red-400 to-transparent"></div>
              </div>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Tìm hiểu sâu hơn về những điều kiện cần thiết để xây dựng khối đại đoàn kết toàn dân tộc theo tư tưởng Hồ Chí Minh
            </p>
          </div>
        </div>

        {/* Enhanced Carousel Container */}
        <div className="relative pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-red-50/30"></div>
          <CenterModeCarousel onOpenModal={handleOpenModal} />
        </div>



        {/* Enhanced Navigation Section */}
        <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 py-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-20" style={{backgroundImage: "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><polygon points=\"36,34 24,42 14,26 26,18\"/></g></g></svg>')"}}></div>
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Tiếp tục khám phá
              </h3>
              <p className="text-red-100 text-lg mb-8 leading-relaxed">
                Hãy quay lại trang chủ để khám phá thêm nhiều nội dung thú vị khác về tư tưởng Hồ Chí Minh
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/"
                  className="group inline-flex items-center px-8 py-4 rounded-2xl bg-white text-red-600 font-bold shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <svg
                    className="w-6 h-6 mr-3 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Quay lại trang chủ
                </Link>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Lên đầu trang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          activeAudioId={activeAudioId}
          onAudioPlay={handleAudioPlay}
          onAudioPause={handleAudioPause}
        />
      )}

      {/* Enhanced Animations and Styles */}
      <style>{`
        /* Custom Animations */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        /* Enhanced Parallax Effect */
        .bg-fixed {
          background-attachment: fixed;
        }
        
        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }
        
        /* Responsive Typography */
        @media (max-width: 640px) {
          .text-7xl {
            font-size: 3rem;
            line-height: 1.1;
          }
          .text-6xl {
            font-size: 2.5rem;
            line-height: 1.1;
          }
          .text-5xl {
            font-size: 2rem;
            line-height: 1.2;
          }
        }
        
        /* Enhanced Focus States */
        button:focus,
        a:focus {
          outline: none;
          ring: 2px;
          ring-offset: 2px;
          ring-red-500: true;
        }
        
        @media print {
          .relative.min-h-screen {
            background: white !important;
            color: black !important;
          }
          .fixed {
            position: static !important;
          }
          .absolute {
            display: none !important;
          }
          .bg-white\\/5, .bg-white\\/10, .bg-slate-900\\/75, .bg-gradient-to-t {
            background: white !important;
            color: black !important;
          }
          .text-white, .text-slate-200, .text-slate-100 {
            color: black !important;
          }
          .border-white\\/20, .border-white\\/10 {
            border-color: #ccc !important;
          }
          header {
            height: auto !important;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          header .relative.z-10.text-center {
            background: none !important;
            color: black !important;
          }
          header h1, header p {
            color: black !important;
            text-shadow: none !important;
          }
          .w-32.h-1.bg-gradient-to-r {
            background: #ccc !important;
          }
          .bg-white {
            background: white !important;
            box-shadow: none !important;
            border: 1px solid #ccc !important;
          }
          .shadow-lg, .shadow-inner {
            box-shadow: none !important;
          }
          .border {
            border-color: #ccc !important;
          }
          .text-gray-800, .text-gray-700, .text-gray-600 {
            color: black !important;
          }
          .bg-gray-50 {
            background: white !important;
          }
          .rounded-2xl {
            border-radius: 8px !important;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </main>
  );
}

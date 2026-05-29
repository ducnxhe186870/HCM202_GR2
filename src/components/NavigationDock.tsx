import { Link, useLocation } from "react-router";
import { useVTNavigate } from "../hooks/useVTNavigate";
import { Home, HelpCircle, Users, Info, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function NavigationDock() {
  const vtNavigate = useVTNavigate();
  const location = useLocation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems = [
    { name: "Sảnh Chính", path: "/", icon: Home },
    { name: "Khảo Thí (Quiz)", path: "/quiz", icon: Award },
    { name: "Hỏi Đáp", path: "/q&a", icon: HelpCircle },
    { name: "Thành Viên", path: "/members", icon: Users },
    // { name: "Tài Liệu", path: "/sources", icon: BookOpen },
    { name: "Tổng Quan", path: "/overview", icon: Info },
  ];

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  function handleNav(e: React.MouseEvent, to: string) {
    e.preventDefault();
    vtNavigate(to);
  }

  // Preload route component on hover
  function handleMouseEnter(route: string, index: number) {
    setHoveredIdx(index);
    switch (route) {
      case '/': import('../pages/Home'); break;
      case '/quiz': import('../pages/Quiz'); break;
      case '/q&a': import('../pages/QandA'); break;
      case '/members': import('../pages/Member'); break;
      case '/overview': import('../pages/Overview'); break;
      case '/sources': import('../pages/Source'); break;
    }
  }

  return (
    <div 
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="flex items-end gap-2 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-red-800/12 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      >
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          // Calculate scale and translation for macOS-like dock effect
          let scale = 1;
          let translateY = 0;
          
          if (hoveredIdx !== null) {
            const distance = Math.abs(idx - hoveredIdx);
            if (distance === 0) {
              scale = 1.2;
              translateY = -6;
            } else if (distance === 1) {
              scale = 1.08;
              translateY = -2;
            }
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNav(e, item.path)}
              onMouseEnter={() => handleMouseEnter(item.path, idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative group flex flex-col items-center p-1.5 rounded-xl transition-all duration-250 ease-out"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Tooltip */}
              <span className="absolute -top-10 px-2.5 py-1 rounded-lg text-xs font-bold text-red-700 bg-white border border-red-800/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                {item.name}
              </span>

              {/* Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_rgba(185,28,28,0.6)]" />
              )}

              {/* Icon Container */}
              <div 
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? "bg-red-50 text-red-700 border border-red-600/25" 
                    : "text-stone-400 hover:text-red-600 hover:bg-red-50/60 border border-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

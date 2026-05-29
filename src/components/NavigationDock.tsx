import { Link, useLocation } from "react-router";
import { useVTNavigate } from "../hooks/useVTNavigate";
import { Home, HelpCircle, Users, Info, Award } from "lucide-react";
import { useState } from "react";

export default function NavigationDock() {
  const vtNavigate = useVTNavigate();
  const location = useLocation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const menuItems = [
    { name: "Sảnh Chính", path: "/", icon: Home },
    { name: "Khảo Thí (Quiz)", path: "/quiz", icon: Award },
    { name: "Hỏi Đáp", path: "/q&a", icon: HelpCircle },
    { name: "Thành Viên", path: "/members", icon: Users },
    // { name: "Tài Liệu", path: "/sources", icon: BookOpen },
    { name: "Tổng Quan", path: "/overview", icon: Info },
  ];

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto">
      <div 
        className="flex items-end gap-3 px-6 py-3 rounded-3xl bg-[#12131a]/85 backdrop-blur-xl border border-amber-900/30 shadow-[0_15px_50px_rgba(0,0,0,0.8)]"
        style={{
          boxShadow: "0 10px 40px -10px rgba(217, 119, 6, 0.15), 0 15px 50px rgba(0,0,0,0.8)"
        }}
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
              scale = 1.25;
              translateY = -8;
            } else if (distance === 1) {
              scale = 1.1;
              translateY = -3;
            }
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNav(e, item.path)}
              onMouseEnter={() => handleMouseEnter(item.path, idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative group flex flex-col items-center p-2 rounded-2xl transition-all duration-250 ease-out"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Tooltip */}
              <span className="absolute -top-12 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-[#161722] border border-amber-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                {item.name}
              </span>

              {/* Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
              )}

              {/* Icon Container */}
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" 
                    : "text-neutral-400 hover:text-amber-400 hover:bg-neutral-800/50 border border-transparent"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

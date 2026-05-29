
import { useEffect, useState, useRef, useCallback } from "react"

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false)
  const sequenceRef = useRef<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [transition, setTransition] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const toggleEasterEgg = useCallback(async (activate: boolean) => {
    if (!containerRef.current) return

    if (!activate) {
      setShowContent(false)
      await new Promise(resolve => setTimeout(resolve, 300))
    }

    setIsActive(activate)
    await new Promise(resolve => setTimeout(resolve, 50))

    setTransition(true)

    const x = window.innerWidth / 2
    const y = window.innerHeight / 2
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const animation = containerRef.current.animate(
      {
        clipPath: activate
          ? [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ]
          : [
            `circle(${maxRadius}px at ${x}px ${y}px)`,
            `circle(0px at ${x}px ${y}px)`,
          ],
        opacity: activate ? [0, 1] : [1, 0],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        fill: "forwards"
      }
    )

    await animation.finished

    setTransition(false)

    if (activate) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setShowContent(true)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) {
        toggleEasterEgg(false)
        return
      }

      let keyChar = ""
      if (e.key === "Shift" || e.code === "ShiftLeft" || e.code === "ShiftRight") {
        keyChar = "shift"
      } else if (e.code.startsWith("Key")) {
        keyChar = e.code.substring(3).toLowerCase()
      } else {
        keyChar = e.key.toLowerCase()
      }

      if (keyChar) {
        const prev = sequenceRef.current
        if (keyChar === "shift" && prev[prev.length - 1] === "shift") {
          return
        }
        const nextSeq = [...prev, keyChar].slice(-4)
        if (
          nextSeq.length === 4 &&
          nextSeq[0] === "shift" &&
          nextSeq[1] === "d" &&
          nextSeq[2] === "u" &&
          nextSeq[3] === "c"
        ) {
          toggleEasterEgg(true)
          sequenceRef.current = []
          return
        }
        sequenceRef.current = nextSeq
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isActive, toggleEasterEgg])

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 4,
    opacity: Math.random() * 0.5 + 0.2,
  }))

  // Generate stars
  const stars = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
  }))

  const members = [
    "Nguyễn Nhật Anh (Nhóm trưởng)",
    "Nguyễn Xuân Đức",
    "Vũ Hải Sơn",
    "Lê Lâm Phong",
    "Đỗ Mai Lan",
    "Kiều Ngọc Tuấn",
    "Đỗ Quang Anh",
    "Nguyễn Tuấn Minh",
    "Hoàng Đình Trung",
    "Trần Minh Tú",
  ]

  return (
    <div
      ref={containerRef}
      style={{
        clipPath: !transition && !isActive ? 'circle(0px at 50% 50%)' : undefined,
        opacity: !transition && !isActive ? 0 : undefined,
      }}
      className={`
        fixed inset-0 z-200 flex flex-col justify-center items-center
        size-full overflow-hidden
        transition-opacity duration-300
        ${!isActive && !transition ? 'pointer-events-none' : ''}
      `}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-amber-900" />
      
      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,246,227,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.2)_0%,transparent_50%)]" />

      {/* Floating gold particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-400/60 pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 2}px rgba(251, 191, 36, 0.4)`,
          }}
        />
      ))}

      {/* Twinkling stars */}
      {stars.map(s => (
        <div
          key={`star-${s.id}`}
          className="absolute pointer-events-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: '#fef3c7',
            animation: `starTwinkle ${2 + Math.random() * 2}s ease-in-out ${s.delay}s infinite`,
            boxShadow: `0 0 ${s.size * 3}px rgba(254, 243, 199, 0.6)`,
          }}
        />
      ))}

      {/* Decorative corner ornaments */}
      <svg className="absolute top-8 left-8 w-20 h-20 text-amber-500/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 0 Q50 20 100 0" />
        <path d="M0 0 Q20 50 0 100" />
        <circle cx="15" cy="15" r="8" strokeDasharray="3,3" />
        <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.3" />
      </svg>
      <svg className="absolute top-8 right-8 w-20 h-20 text-amber-500/20 scale-x-[-1]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 0 Q50 20 100 0" />
        <path d="M0 0 Q20 50 0 100" />
        <circle cx="15" cy="15" r="8" strokeDasharray="3,3" />
        <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.3" />
      </svg>
      <svg className="absolute bottom-8 left-8 w-20 h-20 text-amber-500/20 scale-y-[-1]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 0 Q50 20 100 0" />
        <path d="M0 0 Q20 50 0 100" />
        <circle cx="15" cy="15" r="8" strokeDasharray="3,3" />
        <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.3" />
      </svg>
      <svg className="absolute bottom-8 right-8 w-20 h-20 text-amber-500/20 scale-[-1]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 0 Q50 20 100 0" />
        <path d="M0 0 Q20 50 0 100" />
        <circle cx="15" cy="15" r="8" strokeDasharray="3,3" />
        <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 max-w-2xl text-center">
        {/* Decorative line */}
        <div
          className="flex items-center gap-3 transition-all duration-700"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        {/* Main thank you text */}
        <h1
          className="text-5xl md:text-7xl font-title tracking-wider leading-tight transition-all duration-700 delay-200"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            background: 'linear-gradient(135deg, #fef3c7, #f59e0b, #fef3c7, #d97706)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: showContent ? 'shimmerText 4s ease-in-out infinite' : 'none',
          }}
        >
          Cảm ơn cô
        </h1>

        <h2
          className="text-4xl md:text-6xl font-title tracking-wider leading-tight transition-all duration-700 delay-500"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            background: 'linear-gradient(135deg, #fef3c7, #f59e0b, #fef3c7, #d97706)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: showContent ? 'shimmerText 4s ease-in-out 0.5s infinite' : 'none',
          }}
        >
          và các bạn
        </h2>

        <h2
          className="text-4xl md:text-6xl font-title tracking-wider leading-tight transition-all duration-700 delay-700"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            background: 'linear-gradient(135deg, #fef3c7, #f59e0b, #fef3c7, #d97706)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: showContent ? 'shimmerText 4s ease-in-out 1s infinite' : 'none',
          }}
        >
          đã lắng nghe
        </h2>

        {/* Decorative separator */}
        <div
          className="flex items-center gap-4 transition-all duration-700 delay-1000"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'scaleX(1)' : 'scaleX(0)',
          }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          <svg className="w-6 h-6 text-amber-400/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        </div>

        {/* Group name */}
        <div
          className="transition-all duration-700 delay-[1200ms]"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-amber-300 text-lg font-heading font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Nhóm 2
          </p>
          <p className="text-amber-100/80 text-sm mt-1 font-heading">
            HCM202 — Tư tưởng Hồ Chí Minh
          </p>
        </div>

        {/* Members grid */}
        <div
          className="grid grid-cols-2 gap-x-8 gap-y-2 transition-all duration-700 delay-[1500ms] bg-black/15 p-5 rounded-xl border border-amber-500/10 backdrop-blur-sm"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {members.map((name, i) => (
            <p
              key={i}
              className={`text-sm font-heading tracking-wide ${
                i === 0 ? 'text-amber-400 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : 'text-amber-100/90'
              }`}
            >
              {name}
            </p>
          ))}
        </div>

        {/* Dev credit */}
        <p
          className="text-amber-300/80 text-xs font-heading mt-2 transition-all duration-700 delay-[1800ms]"
          style={{
            opacity: showContent ? 1 : 0,
          }}
        >
          Dev by: Nguyễn Xuân Đức — HE186870
        </p>
      </div>

      {/* Bottom hint */}
      <p
        className="absolute bottom-8 text-amber-200/70 text-sm font-heading transition-all duration-700 delay-[2000ms] animate-pulse"
        style={{
          opacity: showContent ? 1 : 0,
        }}
      >
        Bấm phím bất kì để đóng
      </p>
    </div>
  )
}


import { useEffect, useState, useRef, useCallback } from "react"
import { TextMask } from "./TextMask"

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false)
  const sequenceRef = useRef<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [transition, setTransition] = useState(false)

  const toggleEasterEgg = useCallback(async (activate: boolean) => {
    if (!containerRef.current) return

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


  return (
    <div
      ref={containerRef}
      style={{
        clipPath: !transition && !isActive ? 'circle(0px at 50% 50%)' : undefined,
        opacity: !transition && !isActive ? 0 : undefined,
      }}
      className={`
        fixed inset-0 z-200 flex flex-col justify-center items-center
        bg-black size-full
        transition-opacity duration-300
        ${!isActive && !transition ? 'pointer-events-none' : ''}
      `}
    >
        <TextMask
          videoSrc="/vids/rickroll.mp4"
          text="Cảm ơn cô\nvà các bạn\nđã lắng nghe"
          fontSize={12}
          fontWeight={700}
          className="h-[90vh]"
        />
        <p className="text-white/50 text-lg mt-4">Bấm phím bất kì để tắt</p>
    </div>
  )
}

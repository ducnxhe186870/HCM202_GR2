import { useEffect, useState, useRef } from "react"
import { cn } from "../../utils/cn"

interface TextMaskProps {
  /**
   * The video source URL
   */
  videoSrc: string
  /**
   * Text content with optional \n for line breaks
   */
  text: string
  /**
   * Additional className for the container
   */
  className?: string
  /**
   * Font size in viewport width units
   * @default 8
   */
  fontSize?: number
  /**
   * Font family
   * @default "system-ui"
   */
  fontFamily?: string
  /**
   * Font weight
   * @default 700
   */
  fontWeight?: number | string
}

export function TextMask({
  videoSrc,
  text,
  className,
  fontSize = 8,
  fontFamily = "system-ui",
  fontWeight = 700,
}: TextMaskProps) {
  const [svgMask, setSvgMask] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMask = () => {
      const lines = text.split("\\n")
      const lineHeight = 28 // x% of the viewport height
      
      // Create SVG text elements for each line
      const textElements = lines.map((line, index) => {
        const yPos = 20 + (index * lineHeight) // Start at x% from top
        return `<text
          x="50%"
          y="${yPos}%"
          font-size="${fontSize}vw"
          font-weight="${fontWeight}"
          font-family="${fontFamily}"
          text-anchor="middle"
          dominant-baseline="middle"
        >${line.trim()}</text>`
      }).join("")

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        ${textElements}
      </svg>`

      setSvgMask(svg)
    }

    updateMask()
    window.addEventListener("resize", updateMask)
    return () => window.removeEventListener("resize", updateMask)
  }, [text, fontSize, fontFamily, fontWeight])

  const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      <div
        className="absolute inset-0"
        style={{
          maskImage: maskUrl,
          WebkitMaskImage: maskUrl,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <span className="sr-only">{text}</span>
    </div>
  )
}

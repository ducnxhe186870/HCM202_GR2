import { useState, useEffect, useRef } from "react";

// Types
export type CarouselItem = {
  id: string;
  index: number;
  title: string;
  teaser: string;
  heroImage: string;
  badge: string;
  highlight: boolean;
  contentHtml: string;
  color: string;
  // Audio content
  audio?: {
    src: string;
    transcript: string;
    duration?: number;
  };
  // Detailed content for modal
  subtitle?: string;
  quote?: {
    text: string;
    source: string;
  };
  mainPoints?: string[];
  media?: {
    type: "image" | "video";
    src: string;
    alt: string;
    caption?: string;
  };
  examples?: Array<{
    title: string;
    desc: string;
    link?: string | null;
    external?: boolean;
  }>;
  references?: (string | { title: string; url: string })[];
  footerNote?: string;
};

// Audio Player Component
export function AudioPlayer({
  item,
  isActive,
  onPlay,
  onPause,
}: {
  item: CarouselItem;
  isActive: boolean;
  onPlay: (id: string) => void;
  onPause: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Load audio metadata
  useEffect(() => {
    if (!item.audio || !audioRef.current) return;

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [item.audio]);

  // Handle play/pause
  const togglePlayPause = async () => {
    if (!audioRef.current || !item.audio) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPause();
      } else {
        // Pause other audio players
        onPlay(item.id);

        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;

    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle download
  const handleDownload = () => {
    if (!item.audio) return;

    const link = document.createElement("a");
    link.href = item.audio.src;
    link.download = `${item.id}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  // Handle playback rate change
  const handleRateChange = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  if (!item.audio) return null;

  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 border transition-all duration-300 ${
        isActive
          ? "border-red-500 bg-red-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={item.audio.src}
        preload="metadata"
        onError={(e) => console.error("Audio load error:", e)}
      />

      {/* Header with title and status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isActive && isPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
        </div>

        {/* Playback rate selector */}
        <select
          value={playbackRate}
          onChange={(e) => handleRateChange(parseFloat(e.target.value))}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Tốc độ phát"
        >
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
        </select>
      </div>

      {/* Transcript */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {item.audio.transcript}
      </p>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-2 hover:bg-gray-300 transition-colors"
        onClick={handleProgressClick}
        role="progressbar"
        aria-label="Thanh tiến trình âm thanh"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-100"
          style={{
            width: duration ? `${(currentTime / duration) * 100}%` : "0%",
          }}
        />
      </div>

      {/* Time display */}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlayPause}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Tải xuống file âm thanh"
        >
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Tải xuống
        </button>
      </div>
    </div>
  );
}

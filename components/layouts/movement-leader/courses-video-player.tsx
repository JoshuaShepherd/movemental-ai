"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
} from "lucide-react";

/** Sample video for demo (Big Buck Bunny, Blender Foundation). */
const DEFAULT_VIDEO_SAMPLE =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

interface CoursesVideoPlayerProps {
  className?: string;
  /** Video URL; defaults to a sample for demo. Set to empty string for placeholder-only. */
  videoSrc?: string;
  /** Optional poster image URL. */
  posterSrc?: string;
}

const chapters = [
  {
    title: "Welcome to Sending",
    lessons: [
      { type: "Video", title: "Welcome to the Sending Church Course", duration: "5:21", completed: true },
      { type: "Reading", title: "Begin the Sending Church Certificate", duration: "10 min", completed: true },
    ],
  },
  {
    title: "Foundations of Multiplication",
    lessons: [
      { type: "Video", title: "What Is a Sending Church?", duration: "12:03", completed: false },
      { type: "Video", title: "Introduction to Multiplication Metrics", duration: "8:45", completed: false },
      { type: "Reading", title: "Exponential Network Overview", duration: "15 min", completed: false },
    ],
  },
  {
    title: "Building Your Pipeline",
    lessons: [
      { type: "Video", title: "Identifying Future Leaders", duration: "10:30", completed: false },
      { type: "Reading", title: "Leader Assessment Framework", duration: "12 min", completed: false },
    ],
  },
];

const tabs = ["Overview", "Notes", "Downloads"];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CoursesVideoPlayer({
  className,
  videoSrc = DEFAULT_VIDEO_SAMPLE,
  posterSrc,
}: CoursesVideoPlayerProps) {
  const [activeLesson, setActiveLesson] = useState("Welcome to the Sending Church Course");
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    try {
      if (!document.fullscreenElement) {
        container.requestFullscreen().then(() => setIsFullscreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    } catch {
      setIsFullscreen((f) => !f);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video) setCurrentTime(video.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
      setIsLoaded(true);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const value = parseFloat(e.target.value);
    if (video && Number.isFinite(value)) {
      video.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    const video = videoRef.current;
    if (video) video.volume = v;
    setIsMuted(v === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.volume = volume || 1;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && isFullscreen) setShowControls(false);
      controlsTimeoutRef.current = null;
    }, 3000);
  }, [isPlaying, isFullscreen]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const skip = useCallback((delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + delta));
  }, []);

  const hasSource = Boolean(videoSrc?.trim());

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light flex", className)}>
      {/* Sidebar */}
      <aside className="w-72 border-r border-r-mvmt-border-light bg-mvmt-surface-light overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-b-mvmt-border-light">
          <p className="text-xs font-bold uppercase tracking-wider text-mvmt-text-muted">Start the program</p>
        </div>
        {chapters.map((ch) => (
          <div key={ch.title}>
            <div className="px-4 py-3 border-b border-b-mvmt-border-light">
              <p className="text-xs font-bold text-mvmt-text-primary">{ch.title}</p>
              <p className="text-xs text-mvmt-text-muted">{ch.lessons.length} Lessons</p>
            </div>
            {ch.lessons.map((lesson) => (
              <button
                key={lesson.title}
                onClick={() => setActiveLesson(lesson.title)}
                className={cn(
                  "w-full text-left px-4 py-3 flex items-start gap-3 border-b border-b-mvmt-border-light transition-colors",
                  activeLesson === lesson.title ? "bg-mvmt-surface-light-muted" : "hover:bg-mvmt-surface-light-muted/50"
                )}
              >
                <span className={cn("mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0", lesson.completed ? "bg-mvmt-accent border-mvmt-accent" : "border-mvmt-border-light")} />
                <div>
                  <p className="text-xs text-mvmt-text-muted">{lesson.type}</p>
                  <p className="text-sm font-medium text-mvmt-text-primary">{lesson.title}</p>
                  <p className="text-xs text-mvmt-text-muted">{lesson.duration}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Video player container - can go fullscreen */}
        <div
          ref={containerRef}
          className={cn(
            "relative w-full bg-mvmt-surface-dark overflow-hidden rounded-none",
            "lg:mx-0 lg:rounded-xl lg:shadow-mvmt-lg",
            isFullscreen && "fixed inset-0 z-[9999] !rounded-none bg-black flex flex-col items-center justify-center"
          )}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => !isFullscreen && setShowControls(true)}
        >
          <div
            className={cn(
              "relative w-full flex items-center justify-center",
              !isFullscreen && "aspect-video",
              isFullscreen && "flex-1 min-h-0 w-full"
            )}
          >
            {/* Video element */}
            <video
              ref={videoRef}
              className={cn(
                "w-full h-full object-contain bg-black",
                !hasSource && "opacity-0 absolute inset-0 pointer-events-none"
              )}
              src={videoSrc}
              poster={posterSrc}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
            />

            {/* Placeholder when no source */}
            {!hasSource && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-mvmt-surface-dark via-mvmt-surface-dark-elevated/80 to-mvmt-surface-dark">
                <div className="w-24 h-24 rounded-full bg-mvmt-on-dark-subtle/20 flex items-center justify-center border border-mvmt-border-on-dark/50 backdrop-blur-sm">
                  <Play className="w-10 h-10 text-mvmt-on-dark-primary ml-1" fill="currentColor" />
                </div>
                <p className="text-sm text-mvmt-on-dark-muted">Add a video URL to play</p>
              </div>
            )}

            {/* Center play overlay (when has source and paused) */}
            {hasSource && (!isPlaying || !isLoaded) && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center z-10 transition-opacity hover:opacity-100 opacity-90"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <span className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center border border-white/20 shadow-xl backdrop-blur-sm transition-transform hover:scale-105">
                  <Play className="w-9 h-9 text-white ml-1" fill="currentColor" />
                </span>
              </button>
            )}

            {/* Gradient overlay for controls */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10 transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
              )}
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}
            />

            {/* Controls bar */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-20 px-3 pb-2 pt-8 transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
              )}
            >
              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-2 group/progress">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1.5 rounded-full appearance-none bg-white/20 cursor-pointer accent-mvmt-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-mvmt-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  aria-label="Seek"
                />
              </div>

              <div className="flex items-center justify-between gap-2 text-mvmt-on-dark-primary">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => skip(-10)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Back 10 seconds"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => skip(10)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Forward 10 seconds"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <span className="text-xs tabular-nums text-mvmt-on-dark-muted min-w-[4rem]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 rounded-full appearance-none bg-white/20 cursor-pointer accent-mvmt-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                    aria-label="Volume"
                  />
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Below video */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-mvmt-text-primary mb-1">{activeLesson}</h1>
          <p className="text-sm text-mvmt-text-muted mb-4">Brad Brisco · Sending Church Foundations</p>

          <div className="flex gap-6 border-b border-b-mvmt-border-light mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab
                    ? "border-b-mvmt-accent text-mvmt-accent"
                    : "border-b-transparent text-mvmt-text-muted hover:text-mvmt-text-primary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-mvmt-text-secondary">
            In this lesson, Brad Brisco introduces the Sending Church framework — a model for developing and deploying
            leaders who will multiply the mission across communities and networks. You&apos;ll learn the core principles that
            distinguish a sending culture from a gathering culture.
          </p>
        </div>
      </div>
    </section>
  );
}

CoursesVideoPlayer.displayName = "CoursesVideoPlayer";

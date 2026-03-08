'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  Settings
} from 'lucide-react'

interface VideoPlayerProps {
  /** Video source URL */
  src: string
  /** Poster/thumbnail image */
  poster?: string
  /** Video title */
  title?: string
  /** Autoplay on load */
  autoplay?: boolean
  /** Loop video */
  loop?: boolean
  /** Show controls */
  showControls?: boolean
  /** Gradient background color */
  gradientBg?: 'pink' | 'blue' | 'purple' | 'none'
  /** Custom class name */
  className?: string
}

export function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
  loop = false,
  showControls = true,
  gradientBg = 'pink',
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControlsOverlay, setShowControlsOverlay] = useState(false)

  const gradientClasses = {
    pink: 'bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200',
    blue: 'bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200',
    purple: 'bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200',
    none: 'bg-slate-900',
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden p-4',
        gradientClasses[gradientBg],
        className
      )}
    >
      <div
        className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden"
        onMouseEnter={() => setShowControlsOverlay(true)}
        onMouseLeave={() => setShowControlsOverlay(false)}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play button overlay (when paused) */}
        {!isPlaying && !showControls && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-8 w-8 text-slate-900 ml-1" />
            </div>
          </button>
        )}

        {/* Controls overlay */}
        {showControls && (
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity',
              showControlsOverlay || !isPlaying ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Center play button */}
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-slate-900" />
                ) : (
                  <Play className="h-6 w-6 text-slate-900 ml-0.5" />
                )}
              </div>
            </button>

            {/* Bottom controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress bar */}
              <div
                className="h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                  <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
                    <SkipForward className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      {title && (
        <p className="text-sm font-medium mt-3 text-center text-foreground/80">
          {title}
        </p>
      )}
    </div>
  )
}

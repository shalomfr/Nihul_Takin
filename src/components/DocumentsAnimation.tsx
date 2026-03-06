"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface Props {
  onComplete?: () => void;
}

export default function DocumentsAnimation({ onComplete }: Props) {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  const startFadeOut = useCallback(() => {
    if (fading) return;
    window.scrollTo(0, 0);
    setFading(true);
    handleComplete();
    setTimeout(() => {
      document.body.style.overflow = "";
      setHidden(true);
    }, 2000);
  }, [fading, handleComplete]);

  // Lock scroll while video is playing
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Start fading before video ends, then fully hide after
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      // Start fading 2 seconds before the end
      if (timeLeft <= 2 && !fading) {
        startFadeOut();
      }
    };

    const onEnded = () => {
      if (!fading) startFadeOut();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [startFadeOut, fading]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white transition-opacity duration-[2000ms] ease-in-out"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/intro-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* Skip button */}
      <button
        className="absolute top-5 left-5 z-40 text-white/40 hover:text-white/80 text-xs sm:text-sm transition-colors"
        style={{ opacity: fading ? 0 : 1 }}
        onClick={startFadeOut}
      >
        דלג &larr;
      </button>
    </div>
  );
}

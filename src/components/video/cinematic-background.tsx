"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CinematicBackgroundProps = {
  posterAlt: string;
  posterSrc: string;
  videoSrc: string;
};

export function CinematicBackground({
  posterAlt,
  posterSrc,
  videoSrc,
}: CinematicBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleLoaded = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cinematic-background">
      {!isVideoLoaded && (
        <Image
          alt={posterAlt}
          className="cinematic-background__poster"
          fill
          priority
          sizes="100vw"
          src={posterSrc}
        />
      )}

      <video
        ref={videoRef}
        autoPlay
        className="cinematic-background__video"
        loop
        muted
        playsInline
        poster={posterSrc}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="cinematic-background__overlay" />
      <div className="cinematic-background__grain" />
      <div className="cinematic-background__vignette" />
    </div>
  );
}

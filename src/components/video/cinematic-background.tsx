import Image from "next/image";

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
  return (
    <div className="cinematic-background" aria-hidden="true">
      <Image
        alt={posterAlt}
        className="cinematic-background__poster"
        fill
        priority
        sizes="100vw"
        src={posterSrc}
      />
      <video
        aria-label={posterAlt}
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
    </div>
  );
}

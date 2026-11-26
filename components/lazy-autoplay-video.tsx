"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  label: string;
};

/**
 * A muted, looping video that only downloads and plays once it scrolls
 * near the screen, and pauses again when it leaves. Keeps the first
 * screen of the page light. Visitors who prefer reduced motion get the
 * poster and the controls, without autoplay.
 */
export function LazyAutoplayVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      video.src = src;
      video.load();
    };

    if (!("IntersectionObserver" in window)) {
      load();
      if (!still) video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          if (!still) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video ref={ref} muted loop playsInline controls preload="none" poster={poster} aria-label={label} />
  );
}

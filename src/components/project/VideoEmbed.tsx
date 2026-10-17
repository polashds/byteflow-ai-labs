"use client";

import Image from "next/image";
import { useState } from "react";
import { videoUi } from "@/config/videos";

/**
 * Click-to-load YouTube player. Shows a poster (or a styled placeholder) and a
 * play button; the iframe (youtube-nocookie) is only created after the click,
 * so nothing loads, plays or sets cookies before the visitor asks for it.
 * Captions are requested with cc_load_policy=1. Fixed 16:9 box: no layout shift.
 */
export default function VideoEmbed({
  youtubeId,
  title,
  poster,
}: {
  youtubeId: string;
  title: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&cc_load_policy=1&rel=0`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-primary/20 bg-brand-surface">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex size-full flex-col items-center justify-center gap-3"
          aria-label={`${videoUi.play}: ${title}`}
        >
          {poster ? (
            <Image src={poster} alt="" fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover opacity-70" />
          ) : (
            <span aria-hidden="true" className="grid-dots absolute inset-0 opacity-60" />
          )}
          <span
            aria-hidden="true"
            className="relative flex size-16 items-center justify-center rounded-full text-white shadow-glow transition-transform duration-200 group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="relative font-body text-xs text-brand-text">{videoUi.consent}</span>
        </button>
      )}
    </div>
  );
}

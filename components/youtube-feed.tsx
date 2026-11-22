"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube-feed";
import { CHANNEL_URL } from "@/lib/youtube-feed";
import "./youtube-feed.css";

const CHANNEL_HANDLE = "@author.rajeshkoul";
const SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function isNew(value: string) {
  if (!value) return false;
  return Date.now() - new Date(value).getTime() < 14 * 24 * 60 * 60 * 1000;
}

function YouTubeMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" /></svg>;
}

/*
 * YouTube channel section — laid out the way YouTube presents a channel:
 * a channel strip with a Subscribe button, then thumbnails with titles underneath.
 * Videos play right here when clicked.
 */
export function YouTubeFeed({ videos }: { videos: YouTubeVideo[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!videos.length) return null;

  return <section className="ytc" aria-labelledby="ytc-title">
    <div className="ytc-inner">
      <h2 id="ytc-title" className="ytc-title">Ideas in motion. Systems in practice.</h2>

      <div className="ytc-channel">
        <a className="ytc-identity" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          <span className="ytc-avatar"><img src="/art/rajesh-avatar.webp" alt="" loading="lazy" decoding="async" /></span>
          <span className="ytc-name">
            <strong>Rajesh Koul</strong>
            <small>{CHANNEL_HANDLE}</small>
          </span>
        </a>
        <p className="ytc-about">Short films on transformation, leadership and the Lean Nervous System.</p>
        <div className="ytc-actions">
          <a className="ytc-view" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">View channel <ArrowUpRight aria-hidden="true" /></a>
          <a className="ytc-subscribe" href={SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer"><YouTubeMark /> Subscribe</a>
        </div>
      </div>

      <ul className="ytc-grid">
        {videos.map(video => {
          const playing = playingId === video.id;
          return <li className="ytc-video" key={video.id}>
            <div className="ytc-thumb">
              {playing ? <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              /> : <button type="button" onClick={() => setPlayingId(video.id)} aria-label={`Play ${video.title}`}>
                <img
                  src={video.thumbnail}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <span className="ytc-play" aria-hidden="true"><Play /></span>
              </button>}
            </div>
            <div className="ytc-meta">
              <h3><a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a></h3>
              <p>
                {video.publishedAt ? <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time> : null}
                {isNew(video.publishedAt) ? <span className="ytc-new">New</span> : null}
              </p>
            </div>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}

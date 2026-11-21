export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

const CHANNEL_ID = "UCUpjTR5ERfxafYgs2bC4JKQ";
const CHANNEL_URL = "https://www.youtube.com/@author.rajeshkoul";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let feedCache: { expiresAt: number; videos: YouTubeVideo[] } | undefined;

const fallbackVideos: YouTubeVideo[] = [
  {
    id: "aZdy_pkpOeY",
    title: "The Lean Nervous System Transformation Story",
    publishedAt: "2026-11-19T18:04:05Z",
    thumbnail: "https://i.ytimg.com/vi/aZdy_pkpOeY/maxresdefault.jpg",
    url: "https://www.youtube.com/shorts/aZdy_pkpOeY",
  },
  {
    id: "-h0UAHKyBr8",
    title: "The Lean Nervous System: Two Companies, One Morning",
    publishedAt: "2026-11-19T17:58:21Z",
    thumbnail: "https://i.ytimg.com/vi/-h0UAHKyBr8/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=-h0UAHKyBr8",
  },
  {
    id: "iVJztHT-G_E",
    title: "The Lean Nervous System: Alpha Components Featured Film",
    publishedAt: "2026-11-19T17:51:21Z",
    thumbnail: "https://i.ytimg.com/vi/iVJztHT-G_E/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=iVJztHT-G_E",
  },
];

type PlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: { high?: { url?: string }; medium?: { url?: string } };
    resourceId?: { videoId?: string };
  };
  contentDetails?: { videoId?: string; videoPublishedAt?: string };
};

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getTag(entry: string, tag: string) {
  return entry.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))?.[1]?.trim();
}

async function fetchFromApi(apiKey: string): Promise<YouTubeVideo[]> {
  const channelResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${encodeURIComponent(apiKey)}`,
    { cache: "no-store" },
  );
  if (!channelResponse.ok) throw new Error(`YouTube channel request failed: ${channelResponse.status}`);
  const channelData = await channelResponse.json() as { items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }> };
  const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) throw new Error("YouTube uploads playlist was not returned.");

  const playlistResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=3&playlistId=${uploadsId}&key=${encodeURIComponent(apiKey)}`,
    { cache: "no-store" },
  );
  if (!playlistResponse.ok) throw new Error(`YouTube playlist request failed: ${playlistResponse.status}`);
  const playlistData = await playlistResponse.json() as { items?: PlaylistItem[] };

  return (playlistData.items ?? []).flatMap((item) => {
    const id = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
    const title = item.snippet?.title;
    if (!id || !title) return [];
    return [{
      id,
      title,
      publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? "",
      thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    }];
  });
}

async function fetchFromRss(): Promise<YouTubeVideo[]> {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`YouTube RSS request failed: ${response.status}`);
  const xml = await response.text();

  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 3).flatMap(([, entry]) => {
    const id = getTag(entry, "yt:videoId");
    const title = getTag(entry, "title");
    const publishedAt = getTag(entry, "published");
    const url = entry.match(/<link rel="alternate" href="([^"]+)"\s*\/>/)?.[1];
    if (!id || !title) return [];
    return [{
      id,
      title: decodeXml(title),
      publishedAt: publishedAt ?? "",
      thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      url: url ? decodeXml(url) : `https://www.youtube.com/watch?v=${id}`,
    }];
  });
}

export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  if (feedCache && feedCache.expiresAt > Date.now()) return feedCache.videos;

  try {
    const apiKey = process.env.YOUTUBE_API_KEY?.trim();
    const videos = apiKey ? await fetchFromApi(apiKey) : await fetchFromRss();
    if (videos.length) {
      feedCache = { expiresAt: Date.now() + CACHE_TTL_MS, videos };
      return videos;
    }
  } catch (error) {
    console.warn("YouTube feed refresh failed; using the last known videos.", error);
  }

  feedCache = { expiresAt: Date.now() + CACHE_TTL_MS, videos: fallbackVideos };
  return fallbackVideos;
}

export { CHANNEL_URL };

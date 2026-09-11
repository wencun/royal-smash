import { levelVideoIds } from "./video-ids";

export const royalSmashPlaylist = "PLRUqLxqZJLf0";

export function videoIdForLevel(level: number) {
  return levelVideoIds[level - 1] ?? null;
}

export function videoEmbedUrl(level: number) {
  const videoId = videoIdForLevel(level);
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
}

export function videoPreviewUrl(level: number) {
  const embedUrl = videoEmbedUrl(level);
  return embedUrl ? `${embedUrl}&controls=0&disablekb=1&fs=0` : null;
}

export function videoWatchUrl(level: number) {
  const videoId = videoIdForLevel(level);
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=${videoId}&list=${royalSmashPlaylist}`;
}

export function videoCoverageLabel(level: number) {
  return `Level ${level}`;
}

export function videoSourceCoverage(level: number) {
  if (level <= 300) return null;
  const start = Math.floor((level - 301) / 10) * 10 + 301;
  const end = Math.min(start + 9, 370);
  return `Levels ${start}–${end}`;
}

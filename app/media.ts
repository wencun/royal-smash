export const royalSmashPlaylist = "PLRUqLxqZJLf0";

/**
 * The supplied playlist begins with Level 1. The YouTube playlist player uses
 * a zero-based item offset, so Level 1 is item 0, Level 2 is item 1, and so on.
 */
export function videoIndex(level: number) {
  return Math.max(0, level - 1);
}

export function videoEmbedUrl(level: number) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${royalSmashPlaylist}&index=${videoIndex(level)}&rel=0&modestbranding=1`;
}

export function videoPreviewUrl(level: number) {
  return `${videoEmbedUrl(level)}&controls=0&disablekb=1&playsinline=1`;
}

export function videoWatchUrl(level: number) {
  return `https://www.youtube.com/playlist?list=${royalSmashPlaylist}&index=${level}`;
}

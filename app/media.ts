export const royalSmashPlaylist = "PLRUqLxqZJLf0";
export const royalSmashFirstVideo = "hr_HTH0wYYM";

/** The supplied playlist starts at Level 1, so its one-based index matches the level number. */
export function videoIndex(level: number) {
  return level;
}

export function videoEmbedUrl(level: number) {
  return `https://www.youtube-nocookie.com/embed/${royalSmashFirstVideo}?list=${royalSmashPlaylist}&index=${videoIndex(level)}&rel=0`;
}

export function videoPreviewUrl(level: number) {
  return `${videoEmbedUrl(level)}&controls=0&disablekb=1&playsinline=1`;
}

export function videoWatchUrl(level: number) {
  return `https://www.youtube.com/watch?v=${royalSmashFirstVideo}&list=${royalSmashPlaylist}&index=${videoIndex(level)}`;
}

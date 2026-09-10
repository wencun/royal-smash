export const royalSmashPlaylist = "PLRUqLxqZJLf0";
export const royalSmashFirstVideo = "hr_HTH0wYYM";

export function videoIndex(level: number) {
  return level - 50;
}

export function videoEmbedUrl(level: number) {
  return `https://www.youtube-nocookie.com/embed/${royalSmashFirstVideo}?list=${royalSmashPlaylist}&index=${videoIndex(level)}&rel=0`;
}

export function videoWatchUrl(level: number) {
  return `https://www.youtube.com/watch?v=${royalSmashFirstVideo}&list=${royalSmashPlaylist}&index=${videoIndex(level)}`;
}

export const levelCoverUrl = `https://i.ytimg.com/vi/${royalSmashFirstVideo}/hqdefault.jpg`;

export const royalSmashPlaylist = "PLRUqLxqZJLf0";

/** YouTube playlist positions are zero-based: Level 1 is item 0. */
export function videoIndex(level: number) {
  return Math.max(0, level - 1);
}

/**
 * Use YouTube's playlist player with an explicit initial index. The old
 * /embed/videoseries URL rendered the playlist's first poster for every card.
 */
function playlistPlayerUrl(level: number) {
  const params = new URLSearchParams({
    listType: "playlist",
    list: royalSmashPlaylist,
    index: String(videoIndex(level)),
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed?${params.toString()}`;
}

export function videoEmbedUrl(level: number) {
  return playlistPlayerUrl(level);
}

export function videoPreviewUrl(level: number) {
  const params = new URLSearchParams({
    controls: "0",
    disablekb: "1",
    fs: "0",
  });
  return `${playlistPlayerUrl(level)}&${params.toString()}`;
}

export function videoWatchUrl(level: number) {
  const params = new URLSearchParams({
    list: royalSmashPlaylist,
    index: String(level),
  });
  return `https://www.youtube.com/playlist?${params.toString()}`;
}

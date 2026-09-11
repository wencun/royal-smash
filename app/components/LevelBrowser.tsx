"use client";

import Link from "next/link";
import { useState } from "react";
import { guides, MAX_LEVEL } from "../levels";
import { videoPreviewUrl } from "../media";

const RANGE_SIZE = 50;
const ranges = Array.from({ length: Math.ceil(MAX_LEVEL / RANGE_SIZE) }, (_, index) => {
  const start = index * RANGE_SIZE + 1;
  const end = Math.min(start + RANGE_SIZE - 1, MAX_LEVEL);
  return { id: `${start}-${end}`, label: `Levels ${start}–${end}`, start, end };
});
function LevelCard({ level, featured = false, rangeStart }: { level: number; featured?: boolean; rangeStart?: number }) {
  const guide = guides[level - 1];
  const previewUrl = videoPreviewUrl(level);
  return <Link href={`/level/${level}`} className={featured ? "featured-level-card" : "level-cover-card"}>
    <span className="cover-wrap">
      {previewUrl ? <iframe className="level-cover-video" src={previewUrl} title={`Royal Smash level ${level} opening video`} loading="lazy" tabIndex={-1} /> : <span className="video-unavailable">Video unavailable</span>}
      {!featured && <i>LEVEL {level}</i>}
    </span>
    {featured && <span className="featured-range">LEVELS {rangeStart}–{level}</span>}
    <h3>Royal Smash level {level}</h3>
    {!featured && <><small>{guide.difficulty} · {guide.mechanic}</small><b>View guide →</b></>}
  </Link>;
}

export default function LevelBrowser() {
  const [selected, setSelected] = useState("featured");
  const tabs = [{ id: "featured", label: "Featured" }, ...ranges];
  const selectedRange = ranges.find(({ id }) => id === selected);

  return <div className="level-browser">
    <div className="range-tabs" role="tablist" aria-label="Browse Royal Smash levels by range">
      {tabs.map((tab) => <button key={tab.id} id={`tab-${tab.id}`} role="tab" aria-selected={selected === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={selected === tab.id ? 0 : -1} onClick={() => setSelected(tab.id)}>{tab.label}</button>)}
    </div>

    {selected === "featured" ? <section id="panel-featured" className="level-panel featured-grid" role="tabpanel" aria-labelledby="tab-featured">
      {ranges.map((range) => <LevelCard level={range.end} rangeStart={range.start} featured key={range.id} />)}
    </section> : selectedRange ? <section id={`panel-${selectedRange.id}`} className="level-panel reference-guide-grid" role="tabpanel" aria-labelledby={`tab-${selectedRange.id}`}>
      {guides.slice(selectedRange.start - 1, selectedRange.end).map((guide) => <LevelCard level={guide.level} key={guide.level} />)}
    </section> : null}
  </div>;
}

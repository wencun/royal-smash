"use client";

import Link from "next/link";
import { useState } from "react";
import { guides } from "../levels";
import { videoPreviewUrl } from "../media";

const ranges = Array.from({ length: 8 }, (_, index) => {
  const start = index * 10 + 1;
  return { id: `${start}-${start + 9}`, label: `Levels ${start}–${start + 9}`, start, end: start + 9 };
});
const featuredLevels = ranges.map(({ end }) => end);

function LevelCard({ level, featured = false }: { level: number; featured?: boolean }) {
  const guide = guides[level - 1];
  return <Link href={`/level/${level}`} className={featured ? "featured-level-card" : "level-cover-card"}>
    <span className="cover-wrap">
      <iframe className="level-cover-video" src={videoPreviewUrl(level)} title={`Royal Smash level ${level} opening video`} loading="lazy" tabIndex={-1} />
      {!featured && <i>LEVEL {level}</i>}
    </span>
    {featured && <span className="featured-range">LEVEL {level - 9}–{level}</span>}
    <h3>Royal Smash level {level}</h3>
    {!featured && <><small>{guide.difficulty} · {guide.mechanic}</small><b>View guide →</b></>}
  </Link>;
}

export default function LevelBrowser() {
  const [selected, setSelected] = useState("featured");
  const tabs = [{ id: "featured", label: "Featured" }, ...ranges];

  return <div className="level-browser">
    <div className="range-tabs" role="tablist" aria-label="Browse Royal Smash levels by range">
      {tabs.map((tab) => <button key={tab.id} id={`tab-${tab.id}`} role="tab" aria-selected={selected === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={selected === tab.id ? 0 : -1} onClick={() => setSelected(tab.id)}>{tab.label}</button>)}
    </div>

    <section id="panel-featured" className="level-panel featured-grid" role="tabpanel" aria-labelledby="tab-featured" hidden={selected !== "featured"}>
      {featuredLevels.map((level) => <LevelCard level={level} featured key={level} />)}
    </section>

    {ranges.map((range) => <section id={`panel-${range.id}`} className="level-panel reference-guide-grid" role="tabpanel" aria-labelledby={`tab-${range.id}`} hidden={selected !== range.id} key={range.id}>
      {guides.filter((guide) => guide.level >= range.start && guide.level <= range.end).map((guide) => <LevelCard level={guide.level} key={guide.level} />)}
    </section>)}
  </div>;
}

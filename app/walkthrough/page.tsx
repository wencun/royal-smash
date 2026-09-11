import type { Metadata } from "next";
import Link from "next/link";
import { guides, MAX_LEVEL } from "../levels";

const chapterNames = ["Getting started", "Building your aim", "Chain-reaction practice", "Precision puzzles", "Stronger structures", "Timing challenges", "Advanced collapses", "Expert puzzles"];

export const metadata: Metadata = {
  title: `Royal Smash Walkthrough – All Levels 1–${MAX_LEVEL}`,
  description: `Complete Royal Smash walkthrough index for Levels 1 to ${MAX_LEVEL}. Open the exact solution you need.`,
  alternates: { canonical: "/walkthrough" },
};

export default function Walkthrough() {
  const starts = Array.from({ length: Math.ceil(MAX_LEVEL / 10) }, (_, index) => index * 10 + 1);
  return <main className="page"><p className="eyebrow">WALKTHROUGH INDEX</p><h1>Royal Smash Levels <em>1–{MAX_LEVEL}</em></h1><p className="dek">Pick your level for a short solution, its opening video, and recovery advice when the physics do not fall as expected.</p>{starts.map((start, index) => { const end = Math.min(start + 9, MAX_LEVEL); return <section className="range" key={start}><div><span>{start}–{end}</span><h2>{chapterNames[index % chapterNames.length]}</h2></div><div className="range-links">{guides.slice(start - 1, end).map((guide) => <Link href={`/level/${guide.level}`} key={guide.level}><b>Level {guide.level}</b><small>{guide.difficulty} · {guide.mechanic}</small><span>→</span></Link>)}</div></section>; })}</main>;
}

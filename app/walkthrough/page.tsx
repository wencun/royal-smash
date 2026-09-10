import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "../levels";

const chapters = [
  "Getting started",
  "Building your aim",
  "Chain-reaction practice",
  "Precision puzzles",
  "Stronger structures",
  "The challenge begins",
  "Precision & timing",
  "Advanced collapses",
];

export const metadata: Metadata = {
  title: "Royal Smash Walkthrough – All Levels 1–80",
  description: "Complete Royal Smash walkthrough index for Levels 1 to 80. Open the exact solution you need.",
  alternates: { canonical: "/walkthrough" },
};

export default function Walkthrough() {
  return <main className="page"><p className="eyebrow">WALKTHROUGH INDEX</p><h1>Royal Smash Levels <em>1–80</em></h1><p className="dek">Pick your level for a short solution, its opening video, and recovery advice when the physics do not fall as expected.</p>{Array.from({ length: 8 }, (_, index) => index * 10 + 1).map((start, index) => <section className="range" key={start}><div><span>{start}–{start + 9}</span><h2>{chapters[index]}</h2></div><div className="range-links">{guides.filter((guide) => guide.level >= start && guide.level <= start + 9).map((guide) => <Link href={`/level/${guide.level}`} key={guide.level}><b>Level {guide.level}</b><small>{guide.difficulty} · {guide.mechanic}</small><span>→</span></Link>)}</div></section>)}</main>;
}
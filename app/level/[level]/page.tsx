import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "../../levels";
import { videoEmbedUrl, videoWatchUrl } from "../../media";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map((guide) => ({ level: String(guide.level) })); }
export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params; const guide = getGuide(Number(level)); if (!guide) return {};
  return { title: `Royal Smash Level ${guide.level} Walkthrough & Solution`, description: `Royal Smash Level ${guide.level} video and ${guide.steps.length}-step solution for this ${guide.difficulty.toLowerCase()} ${guide.mechanic} puzzle.`, alternates: { canonical: `/level/${guide.level}` }, openGraph: { title: `Royal Smash Level ${guide.level} Solution`, description: `Clear Level ${guide.level} with a video and step-by-step walkthrough.`, url: `/level/${guide.level}` } };
}
export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params; const guide = getGuide(Number(level)); if (!guide) notFound();
  const groupStart = Math.floor((guide.level - 1) / 10) * 10 + 1;
  const related = guides.filter((item) => item.level >= groupStart && item.level <= groupStart + 9);
  const schema = { "@context": "https://schema.org", "@type": "HowTo", name: `How to beat Royal Smash Level ${guide.level}`, step: guide.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })) };
  return <main className="guide">
    <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/walkthrough">Level Guides</Link><span>/</span>Level {guide.level}</nav>
    <header><div><p className="eyebrow">LEVEL {groupStart}–{groupStart + 9} · {guide.difficulty.toUpperCase()}</p><h1>Royal Smash<br /><em>Level {guide.level}</em></h1><p>Watch the level from its opening screen, then follow the written solution below.</p></div><div className="level-badge"><span>LEVEL</span><b>{guide.level}</b><small>{guide.difficulty}</small></div></header>
    <section className="level-video"><div className="video-frame"><iframe src={videoEmbedUrl(guide.level)} title={`Royal Smash Level ${guide.level} video walkthrough`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><p className="eyebrow">VIDEO WALKTHROUGH</p><h2>Level {guide.level} solution video</h2><p>The player is set to the matching position in the supplied Royal Smash walkthrough playlist.</p><a href={videoWatchUrl(guide.level)} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div></section>
    <aside className="answer"><span>QUICK ANSWER</span><p>Start at <b>{guide.focus}</b>, wait for the first shift, then use the exposed support to complete the collapse.</p></aside>
    <section><p className="eyebrow">STEP-BY-STEP SOLUTION</p><h2>How to beat Royal Smash Level {guide.level}</h2><ol className="steps">{guide.steps.map((step, index) => <li key={step}><b>0{index + 1}</b><div><h3>{index === 0 ? "Find the weak point" : index === 1 ? "Wait for the shift" : "Finish the collapse"}</h3><p>{step}</p></div></li>)}</ol></section>
    <section className="trouble"><div><p className="eyebrow">COMMON MISTAKE</p><h2>If the solution does not work</h2><p>{guide.mistake}</p></div><div><h3>Try this next</h3><p>{guide.fallback}</p></div></section>
    <section className="related-levels"><p className="eyebrow">THIS CHAPTER</p><h2>Levels {groupStart}–{groupStart + 9}</h2><div>{related.map((item) => <Link className={item.level === guide.level ? "active" : ""} href={`/level/${item.level}`} key={item.level}>{item.level}</Link>)}</div></section>
    <nav className="prev-next">{guide.level > 1 ? <Link href={`/level/${guide.level - 1}`}><small>← PREVIOUS</small><b>Level {guide.level - 1}</b></Link> : <span />}{guide.level < 80 ? <Link href={`/level/${guide.level + 1}`}><small>NEXT →</small><b>Level {guide.level + 1}</b></Link> : <Link href="/walkthrough"><small>ALL GUIDES →</small><b>Walkthrough index</b></Link>}</nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}

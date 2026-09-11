import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "../../levels";
import { videoCoverageLabel, videoEmbedUrl, videoSourceCoverage, videoWatchUrl } from "../../media";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ level: String(guide.level) }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const guide = getGuide(Number(level));
  if (!guide) return {};

  const title = "Royal Smash! - Physics Puzzle Level " + guide.level + " Walkthrough";
  const description = guide.summary + " Watch the matching video and follow the " + guide.steps.length + "-step solution.";

  return {
    title,
    description,
    alternates: { canonical: "/level/" + guide.level },
    openGraph: { title, description, url: "/level/" + guide.level },
  };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const guide = getGuide(Number(level));
  if (!guide) notFound();

  const groupStart = Math.floor((guide.level - 1) / 10) * 10 + 1;
  const embedUrl = videoEmbedUrl(guide.level);
  const videoLabel = videoCoverageLabel(guide.level);
  const sourceCoverage = videoSourceCoverage(guide.level);
  const watchUrl = videoWatchUrl(guide.level);
  const related = guides.filter((item) => item.level >= groupStart && item.level <= groupStart + 9);
  const previous = guide.level > 1 ? getGuide(guide.level - 1) : undefined;
  const next = guide.level < guides.length ? getGuide(guide.level + 1) : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to beat Royal Smash! - Physics Puzzle Level " + guide.level,
    step: guide.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: guide.stepTitles[index],
      text,
    })),
  };

  return (
    <main className="guide">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/walkthrough">Level Guides</Link><span>/</span>Level {guide.level}
      </nav>

      <header>
        <div>
          <p className="eyebrow">LEVEL {groupStart}–{groupStart + 9} · {guide.difficulty.toUpperCase()}</p>
          <h1><span>Royal Smash! - Physics Puzzle</span><em>Level {guide.level} Walkthrough</em></h1>
          <p>{guide.summary}</p>
        </div>
        <div className="level-badge"><span>LEVEL</span><b>{guide.level}</b><small>{guide.difficulty}</small></div>
      </header>

      <section className="level-video">
        <div className="video-frame">
          {embedUrl ? <iframe
            src={embedUrl}
            title={"Royal Smash! - Physics Puzzle Level " + guide.level + " video walkthrough"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          /> : <div className="video-missing"><b>Video unavailable</b><span>The supplied playlist does not contain a video for this level.</span></div>}
        </div>
        <aside className="level-video-aside">
          <div>
            <p className="eyebrow">VIDEO WALKTHROUGH</p>
            <h2>{videoLabel} solution video</h2>
            <p>{sourceCoverage ? `The verified ${sourceCoverage} YouTube compilation contains the Level ${guide.level} solution.` : `This verified YouTube video is the dedicated solution for Level ${guide.level}.`}</p>
            {watchUrl && <a href={watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>}
          </div>
          <nav className="level-neighbors" aria-label="Adjacent level guides">
            {previous ? (
              <Link href={"/level/" + previous.level} className="previous-level">
                <small>← PREVIOUS LEVEL</small><b>Level {previous.level}</b>
              </Link>
            ) : (
              <span className="level-neighbor-disabled"><small>← PREVIOUS LEVEL</small><b>Start of guide</b></span>
            )}
            {next ? (
              <Link href={"/level/" + next.level} className="next-level">
                <small>NEXT LEVEL →</small><b>Level {next.level}</b>
              </Link>
            ) : (
              <Link href="/walkthrough" className="next-level"><small>ALL LEVELS →</small><b>Guide index</b></Link>
            )}
          </nav>
        </aside>
      </section>

      <aside className="answer">
        <span>QUICK ANSWER</span>
        <p>Start at <b>{guide.focus}</b>, then follow the opening movement before making the final clean-up hit.</p>
      </aside>

      <section>
        <p className="eyebrow">STEP-BY-STEP SOLUTION</p>
        <h2>How to beat Royal Smash! - Physics Puzzle Level {guide.level}</h2>
        <ol className="steps">
          {guide.steps.map((step, index) => (
            <li key={step}>
              <b>0{index + 1}</b>
              <div><h3>{guide.stepTitles[index]}</h3><p>{step}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="trouble">
        <div><p className="eyebrow">COMMON MISTAKE</p><h2>If the solution does not work</h2><p>{guide.mistake}</p></div>
        <div><h3>Try this next</h3><p>{guide.fallback}</p></div>
      </section>

      <section className="related-levels">
        <p className="eyebrow">THIS CHAPTER</p>
        <h2>Levels {groupStart}–{groupStart + 9}</h2>
        <div>{related.map((item) => <Link className={item.level === guide.level ? "active" : ""} href={"/level/" + item.level} key={item.level}>{item.level}</Link>)}</div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}

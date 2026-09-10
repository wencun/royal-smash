import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guides } from "./levels";
import { levelCoverUrl } from "./media";

const logoUrl =
  "https://play-lh.googleusercontent.com/VqJWXEzCPnmd4pCVdTBOvzYzbRs9u_BEcKVWUuL07RhKCtUmun3J5qC2p9_1C0A27Fpg8EaGUaE8AmDmF1pBfA=w480-h960-rw";

const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.cyphergames.royalsmash";
const appStoreUrl = "https://apps.apple.com/us/app/royal-smash-physics-puzzle/id6780891673";
const guideGroups = [51, 61, 71].map((start) => ({ start, end: start + 9, guides: guides.filter((guide) => guide.level >= start && guide.level <= start + 9) }));

export const metadata: Metadata = {
  title: { absolute: "Royal Smash Walkthrough – All Level Solutions" },
  description:
    "Royal Smash walkthroughs, tips, and direct solutions for levels 51–80.",
  alternates: { canonical: "/" },
};

const features = [
  ["⌂", "Physics-based puzzles", "Study every tower, find its weak point, and enjoy the perfect collapse."],
  ["✦", "Clear solutions", "Short, practical steps help you finish difficult levels without a long video."],
  ["↗", "Fast level search", "Jump directly to the Royal Smash level you need and get back to playing."],
];

const tips = [
  ["01", "Watch the supports", "Start with the blocks carrying the most weight."],
  ["02", "Wait for movement", "Let every piece settle before making your next move."],
  ["03", "Tap with precision", "Small changes in position can completely change the result."],
];

const faqs = [
  ["What is Royal Smash?", "Royal Smash is a mobile physics puzzle game where you remove or strike key blocks to bring down each structure."],
  ["Which levels are covered?", "Our current walkthrough library includes a dedicated solution for every level from 51 through 80."],
  ["Why can a move behave differently?", "Physics may vary slightly with tap position and timing. Pause between steps and use the recovery note in each guide."],
  ["Is this an official website?", "No. Royal Smash Guide is an independent fan-made walkthrough resource."],
];

export default function Home() {
  return (
    <main>
      <section className="reference-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-pill">THE COMPLETE PUZZLE GUIDE</span>
            <h1>Royal Smash<br /><strong>Walkthrough</strong></h1>
            <p>Master every physics puzzle with simple step-by-step solutions, helpful tips, and direct answers for Levels 51–80.</p>
            <div className="hero-buttons">
              <Link className="primary-button" href="#guides">View game guides</Link>
              <Link className="secondary-button" href="#about">About the game</Link>
            </div>
          </div>
          <div className="hero-phone" aria-label="Royal Smash game preview">
            <div className="phone-shell"><Image src={logoUrl} alt="Royal Smash game artwork" width={480} height={960} priority unoptimized /></div>
            <span className="float-card card-level"><b>30</b> levels ready</span>
            <span className="float-card card-free">✓ Free guides</span>
          </div>
        </div>
      </section>

      <section id="features" className="reference-section features-section">
        <div className="section-heading"><span>✦</span><h2>Game Features</h2><p>Everything you need for a smoother Royal Smash experience.</p></div>
        <div className="feature-items">
          {features.map(([icon, title, description]) => <article className="feature-item" key={title}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section id="featured" className="reference-section featured-levels">
        <div className="section-heading"><span>★</span><h2>Featured Levels</h2><p>The final challenge from each ten-level chapter.</p></div>
        <div className="featured-grid">{[60, 70, 80].map((level) => <Link href={`/level/${level}`} key={level}><Image src={levelCoverUrl} alt={`Royal Smash Level ${level} opening screen`} width={480} height={270} unoptimized /><span>LEVEL {level - 9}–{level}</span><h3>Level {level} walkthrough</h3><p>Watch the solution and open the complete step-by-step guide.</p><b>View featured guide →</b></Link>)}</div>
      </section>

      <section id="guides" className="reference-section guides-section">
        <div className="section-heading"><span>▣</span><h2>Royal Smash Level Guides</h2><p>Choose a chapter, then open the exact level you need.</p></div>
        {guideGroups.map((group) => <div className="guide-chapter" key={group.start}><div className="guide-toolbar"><div><b>Levels {group.start}–{group.end}</b><small>10 walkthroughs with video solutions</small></div><Link href="/walkthrough">Complete guide index →</Link></div><div className="reference-guide-grid">{group.guides.map((guide) => <Link href={`/level/${guide.level}`} key={guide.level} className="level-cover-card"><span className="cover-wrap"><Image src={levelCoverUrl} alt={`Royal Smash Level ${guide.level} opening screen`} width={480} height={270} unoptimized /><i>LEVEL {guide.level}</i></span><strong>Level {guide.level}</strong><small>{guide.difficulty} · {guide.mechanic}</small><b>View guide →</b></Link>)}</div></div>)}
      </section>

      <section id="download" className="download-section">
        <div className="download-copy"><span className="section-icon">↓</span><h2>Download Royal Smash</h2><p>Play the official Android game, then return here whenever a physics puzzle has you stuck.</p><div className="download-stats"><div><b>30</b><span>Guides</span></div><div><b>3</b><span>Steps each</span></div><div><b>100%</b><span>Free</span></div></div><div className="download-actions"><a className="store-button" href={googlePlayUrl} target="_blank" rel="noopener noreferrer"><span className="play-mark">▶</span><span><small>GET IT ON</small><b>Google Play</b></span></a><a className="store-button apple-store" href={appStoreUrl} target="_blank" rel="noopener noreferrer"><span className="apple-mark" aria-hidden="true"></span><span><small>DOWNLOAD ON THE</small><b>App Store</b></span></a><Link className="download-button" href="/walkthrough">Level guides <span>→</span></Link></div><small className="store-note">Google Play and App Store open the official game listings</small></div>
        <div className="download-art"><div className="download-phone"><Image src={logoUrl} alt="Royal Smash app icon" width={480} height={960} unoptimized /></div></div>
      </section>

      <section id="about" className="reference-section about-section">
        <div className="about-art"><div className="tower-scene"><i/><i/><i/><i/><i/><span>✦</span></div></div>
        <div className="about-copy"><span className="section-icon">ⓘ</span><h2>About Royal Smash</h2><h3>Every tower is a new challenge</h3><p>Royal Smash turns simple blocks into clever physics puzzles. Each stage asks you to read the structure, choose the right support, and make every move count.</p><p>Our guides keep the answer visible and concise, so you spend less time searching and more time enjoying the game.</p><ul><li>Physics-driven puzzle gameplay</li><li>Short step-by-step solutions</li><li>Useful recovery tips</li></ul></div>
      </section>

      <section id="tips" className="reference-section tips-section">
        <div className="section-heading"><span>★</span><h2>Tips &amp; Tricks</h2><p>Three habits that make every tower easier.</p></div>
        <div className="tips-grid">{tips.map(([number, title, description]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <section id="faq" className="reference-section faq-section">
        <div className="section-heading"><span>?</span><h2>Frequently Asked Questions</h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>
    </main>
  );
}

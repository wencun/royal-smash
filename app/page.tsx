import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LevelBrowser from "./components/LevelBrowser";

const logoUrl =
  "https://play-lh.googleusercontent.com/VqJWXEzCPnmd4pCVdTBOvzYzbRs9u_BEcKVWUuL07RhKCtUmun3J5qC2p9_1C0A27Fpg8EaGUaE8AmDmF1pBfA=w480-h960-rw";

const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.cyphergames.royalsmash";
const appStoreUrl = "https://apps.apple.com/us/app/royal-smash-physics-puzzle/id6780891673";

export const metadata: Metadata = {
  title: { absolute: "Royal Smash! - Physics Puzzle Walkthroughs – All Level Solutions" },
  description:
    "Royal Smash! - Physics Puzzle walkthroughs, tips, video previews, and direct solutions for Levels 1–80.",
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
  ["What is Royal Smash! - Physics Puzzle?", "Royal Smash! - Physics Puzzle is a mobile physics puzzle game where you remove or strike key blocks to bring down each structure."],
  ["Which levels are covered?", "The walkthrough library includes a dedicated video preview and written solution for every Level 1 through Level 80."],
  ["Why can a move behave differently?", "Physics may vary slightly with tap position and timing. Pause between steps and use the recovery note in each guide."],
  ["Is this an official website?", "No. Royal Smash! - Physics Puzzle Guide is an independent fan-made walkthrough resource."],
];

export default function Home() {
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Royal Smash! - Physics Puzzle",
    url: "https://royal-smash.cc/",
    gamePlatform: ["Android", "iOS"],
    applicationCategory: "Puzzle Game",
    sameAs: [googlePlayUrl, appStoreUrl],
  };
  return (
    <main>
      <section className="reference-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-pill">THE COMPLETE PUZZLE GUIDE</span>
            <h1><span>Royal Smash! - Physics Puzzle</span><strong>Walkthrough</strong></h1>
            <p>Master Royal Smash! - Physics Puzzle with level-specific video previews, step-by-step solutions, helpful tips, and direct answers for Levels 1–80.</p>
            <div className="hero-buttons">
              <Link className="primary-button" href="#guides">View game guides</Link>
              <Link className="secondary-button" href="#about">About the game</Link>
            </div>
          </div>
          <div className="hero-phone" aria-label="Royal Smash game preview">
            <div className="phone-shell"><Image src={logoUrl} alt="Royal Smash game artwork" width={480} height={960} priority unoptimized /></div>
            <span className="float-card card-level"><b>80</b> levels ready</span>
            <span className="float-card card-free">✓ Free guides</span>
          </div>
        </div>
      </section>

      <section id="features" className="reference-section features-section">
        <div className="section-heading"><span>✦</span><h2>Game Features</h2><p>Everything you need for a smoother Royal Smash! - Physics Puzzle experience.</p></div>
        <div className="feature-items">
          {features.map(([icon, title, description]) => <article className="feature-item" key={title}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section id="guides" className="reference-section guides-section level-browser-section">
        <div className="section-heading"><span>▣</span><h2>Browse Royal Smash Levels</h2><p>Pick a ten-level range, then choose the exact Royal Smash level you need.</p></div>
        <LevelBrowser />
      </section>

      <section id="download" className="download-section">
        <div className="download-copy"><span className="section-icon">↓</span><h2>Download Royal Smash! - Physics Puzzle</h2><p>Download Royal Smash! - Physics Puzzle from the official Android or iPhone store listing, then return here whenever a level has you stuck.</p><div className="download-stats"><div><b>80</b><span>Guides</span></div><div><b>3</b><span>Steps each</span></div><div><b>100%</b><span>Free</span></div></div><div className="download-actions"><a className="store-button" href={googlePlayUrl} target="_blank" rel="noopener noreferrer"><span className="play-mark">▶</span><span><small>GET IT ON</small><b>Google Play</b></span></a><a className="store-button apple-store" href={appStoreUrl} target="_blank" rel="noopener noreferrer"><span className="apple-mark" aria-hidden="true"></span><span><small>DOWNLOAD ON THE</small><b>App Store</b></span></a><Link className="download-button" href="/walkthrough">Level guides <span>→</span></Link></div><small className="store-note">Google Play and App Store open the official game listings</small></div>
        <div className="download-art"><div className="download-phone"><Image src={logoUrl} alt="Royal Smash app icon" width={480} height={960} unoptimized /></div></div>
      </section>

      <section id="about" className="reference-section about-section">
        <div className="about-art"><div className="tower-scene"><i/><i/><i/><i/><i/><span>✦</span></div></div>
        <div className="about-copy"><span className="section-icon">ⓘ</span><h2>About Royal Smash! - Physics Puzzle</h2><h3>Every tower is a new challenge</h3><p>Royal Smash! - Physics Puzzle turns simple blocks into clever physics puzzles. Each stage asks you to read the structure, choose the right support, and make every move count.</p><p>Our guides keep the answer visible and concise, so you spend less time searching and more time enjoying the game.</p><ul><li>Physics-driven puzzle gameplay</li><li>Short step-by-step solutions</li><li>Useful recovery tips</li></ul></div>
      </section>

      <section id="tips" className="reference-section tips-section">
        <div className="section-heading"><span>★</span><h2>Tips &amp; Tricks</h2><p>Three habits that make every tower easier.</p></div>
        <div className="tips-grid">{tips.map(([number, title, description]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />

      <section id="faq" className="reference-section faq-section">
        <div className="section-heading"><span>?</span><h2>Frequently Asked Questions</h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>
    </main>
  );
}

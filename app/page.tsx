import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guides } from "./levels";

const logoUrl = "https://play-lh.googleusercontent.com/VqJWXEzCPnmd4pCVdTBOvzYzbRs9u_BEcKVWUuL07RhKCtUmun3J5qC2p9_1C0A27Fpg8EaGUaE8AmDmF1pBfA=w480-h960-rw";

export const metadata: Metadata = {
  title: { absolute: "Royal Smash Walkthrough – All Level Solutions" },
  description: "Royal Smash walkthroughs, tips, and direct solutions for levels 51–80. Find your level and get back to smashing.",
  alternates: { canonical: "/" },
};

const featured = [51, 60, 70, 80]
  .map((level) => guides.find((guide) => guide.level === level))
  .filter((guide) => guide !== undefined);

const faqs = [
  ["What is Royal Smash?", "Royal Smash is a physics puzzle game where every move changes the balance of a block tower. The goal is to identify the key support and bring the structure down efficiently."],
  ["How do I find the guide I need?", "Use the level finder below or open the complete walkthrough. Our current guide library covers Levels 51–80, with a dedicated page for every puzzle."],
  ["Why does a solution sometimes behave differently?", "Physics can vary slightly depending on where you tap and how long you wait. Each guide includes a recovery tip; let all pieces stop moving before making the next move."],
  ["Is this the official Royal Smash website?", "No. This is an independent, fan-made walkthrough resource and is not affiliated with the game publisher."],
];

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-art">
          <span className="spark spark-one">✦</span><span className="spark spark-two">✦</span>
          <div className="app-icon-wrap"><Image src={logoUrl} alt="Royal Smash mobile game artwork" width={480} height={960} priority unoptimized/></div>
          <div className="hero-note"><span>30</span><small>LEVEL GUIDES<br/>READY TO EXPLORE</small></div>
        </div>
        <div className="hero-copy">
          <p className="kicker">YOUR POCKET PUZZLE COMPANION</p>
          <h1>Royal Smash<br/><em>Walkthrough</em></h1>
          <p className="hero-lede">Stuck on a stubborn tower? Find clear, bite-sized solutions and turn every tricky level into a satisfying smash.</p>
          <div className="actions">
            <Link className="button" href="/walkthrough">Explore all levels <span>→</span></Link>
            <Link className="soft-link" href="#how-to-play">How to play</Link>
          </div>
        </div>
        <a className="scroll-cue" href="#welcome">SCROLL TO DISCOVER <span>↓</span></a>
      </section>

      <section className="welcome" id="welcome">
        <div className="section-heading"><p className="kicker">WELCOME, SMASHER!</p><h2>A calmer way through<br/><em>every tricky tower.</em></h2></div>
        <div className="welcome-copy"><p>Royal Smash looks simple until the towers start fighting back. We turn each puzzle into a short route you can follow at a glance—no long videos, no buried answers.</p><p>Start with the exact level you need, follow one move at a time, and let the game&apos;s physics do the rest.</p><Link className="arrow-link" href="/about">About this guide <span>→</span></Link></div>
      </section>

      <section className="game-strip" aria-label="Royal Smash guide highlights"><div><strong>51–80</strong><span>Levels covered</span></div><i/><div><strong>3 steps</strong><span>Per solution</span></div><i/><div><strong>Direct</strong><span>Answers first</span></div></section>

      <section className="featured-section">
        <div className="section-heading centered"><p className="kicker">START HERE</p><h2>Popular <em>walkthroughs</em></h2><p>Four milestones from our growing Royal Smash guide library.</p></div>
        <div className="feature-grid">
          {featured.map((guide, index) => <Link href={`/level/${guide.level}`} className={`level-card card-${index + 1}`} key={guide.level}><div className="mini-tower" aria-hidden="true"><i/><i/><i/></div><span className="card-tag">{guide.difficulty}</span><h3>Level {guide.level}</h3><p>{guide.mechanic}</p><b>View solution <span>→</span></b></Link>)}
        </div>
      </section>

      <section className="level-finder">
        <div><p className="kicker">QUICK LEVEL FINDER</p><h2>Pick your level</h2><p>Go straight to the puzzle that has you stuck.</p></div>
        <div className="finder-grid">{guides.map((guide) => <Link href={`/level/${guide.level}`} key={guide.level} aria-label={`Royal Smash Level ${guide.level} solution`}>{guide.level}</Link>)}</div>
        <Link className="button dark-button" href="/walkthrough">See complete walkthrough <span>→</span></Link>
      </section>

      <section className="play-section" id="how-to-play">
        <div className="play-art" aria-hidden="true"><div className="target-ring"><span>✦</span></div><i className="piece piece-a"/><i className="piece piece-b"/><i className="piece piece-c"/></div>
        <div className="play-copy"><p className="kicker">HOW TO PLAY</p><h2>Look closely.<br/><em>Smash wisely.</em></h2><p>Every tower tells you how it wants to fall. Slow down, locate the load-bearing piece, and make each move count.</p><ol><li><b>01</b><span><strong>Study the structure</strong>Find the block supporting the most weight.</span></li><li><b>02</b><span><strong>Make one clean move</strong>Aim carefully and avoid disturbing safe pieces.</span></li><li><b>03</b><span><strong>Wait for the fall</strong>Let the tower settle before you act again.</span></li></ol></div>
      </section>

      <section className="faq-section">
        <div className="section-heading centered"><p className="kicker">GOOD TO KNOW</p><h2>Frequently asked <em>questions</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="closing-cta"><span className="tiny-crown">♛</span><p className="kicker">READY FOR THE NEXT LEVEL?</p><h2>Let&apos;s make it <em>fall.</em></h2><p>Thirty focused guides. One clear move at a time.</p><Link className="button" href="/walkthrough">Find my level <span>→</span></Link></section>
    </main>
  );
}

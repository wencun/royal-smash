import Link from "next/link";
import { guides } from "./content";

const sources = [
  { label: "EA support and patch notes", href: "https://help.ea.com/en/games/ea-sports-college-football/college-football-mobile/" },
  { label: "App Store version history", href: "https://apps.apple.com/us/app/ea-college-football-mobile-27/id6759412341" },
];

export default function HomePage() {
  const siteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "College Football Mobile 27 Guide", description: "Independent, source-checked guides for EA SPORTS College Football Mobile 27." };
  return <main>
    <nav className="nav" aria-label="Main navigation"><Link href="/" className="brand">CFB <span>MOBILE 27</span></Link><a href="#quick-guides">Quick guides</a><a href="#standards">Editorial standard</a></nav>
    <section className="hero"><p className="kicker">INDEPENDENT • VERSION-AWARE • SOURCE-LED</p><h1>Answers for the part <em>after</em> game day.</h1><p>College Football Mobile 27 changes quickly. This guide separates official facts, community reports, and open questions so you can act without treating a rumor as a patch note.</p><div className="hero-actions"><a href="#quick-guides">Open quick guides</a><a className="secondary" href="#standards">How we verify</a></div><div className="signal-grid" aria-label="Coverage status"><div><b>3</b><span>launch guides</span></div><div><b>1.3.0</b><span>current update tracked</span></div><div><b>0</b><span>invented tactics</span></div></div></section>
    <section className="guide-grid" id="quick-guides" aria-label="Quick guides"><div className="section-heading"><p className="kicker">FAST ANSWERS</p><h2>Start with the evidence.</h2><p>Two source-checked quick guides are live. Unlimited Arena is tracked separately until public strategy data is sufficient.</p></div>{guides.map((guide, index) => <article className="guide-card" key={guide.slug}><p className="card-number">0{index + 1}</p><p className={`status ${guide.status.toLowerCase().replace(" ", "-")}`}>{guide.status}</p><h3><Link href={`/${guide.slug}`}>{guide.label}</Link></h3><p>{guide.description}</p><Link className="read-link" href={`/${guide.slug}`}>Read the guide <span>→</span></Link></article>)}</section>
    <section className="standards" id="standards"><div><p className="kicker">EDITORIAL STANDARD</p><h2>Useful before it is long.</h2></div><div className="standard-list"><p><b>Official first.</b> Patch notes, store records, and support pages anchor every factual claim.</p><p><b>Community reports stay labeled.</b> Player reports are useful leads, not universal fixes.</p><p><b>Version always matters.</b> Each page records when it was checked and what would make it stale.</p></div></section>
    <section className="workflow"><p className="kicker">RAPID-RESPONSE PLAYBOOK</p><h2>New mode, update, or issue? Publish the smallest answer that is actually true.</h2><ol><li><b>Verify</b><span>Capture the version, source, and the exact unanswered branch.</span></li><li><b>Publish</b><span>Write a 300–500 word quick answer with limits clearly stated.</span></li><li><b>Expand</b><span>Add device differences, statistics, and updated evidence within 24 hours.</span></li></ol></section>
    <footer><p>Independent fan guide. Not affiliated with Electronic Arts.</p><p>{sources.map((source, index) => <span key={source.href}>{index > 0 && " · "}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
  </main>;
}

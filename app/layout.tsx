import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "./site-navigation";
import "./globals.css";

const logoUrl = "https://play-lh.googleusercontent.com/VqJWXEzCPnmd4pCVdTBOvzYzbRs9u_BEcKVWUuL07RhKCtUmun3J5qC2p9_1C0A27Fpg8EaGUaE8AmDmF1pBfA=w480-h960-rw";

export const metadata: Metadata = {
  metadataBase: new URL("https://royal-smash.cc"),
  applicationName: "Royal Smash! - Physics Puzzle Guide",
  title: { default: "Royal Smash! - Physics Puzzle Walkthroughs & Level Solutions", template: "%s | Royal Smash! - Physics Puzzle Guide" },
  description: "Clear Royal Smash! - Physics Puzzle Levels 1–80 with matching video previews, distinct step-by-step solutions, and fast level navigation.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Royal Smash! - Physics Puzzle Guide", title: "Royal Smash! - Physics Puzzle Walkthroughs & Level Solutions", description: "Fast, focused help for Royal Smash! - Physics Puzzle Levels 1–80.", url: "https://royal-smash.cc" },
  robots: { index: true, follow: true },
  keywords: ["Royal Smash! - Physics Puzzle", "Royal Smash walkthrough", "Royal Smash level guide", "Royal Smash solutions"],
  icons: { icon: logoUrl, apple: logoUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "Royal Smash! - Physics Puzzle Guide", alternateName: "Royal Smash Guide", url: "https://royal-smash.cc/", description: "Independent Royal Smash! - Physics Puzzle walkthroughs and level solutions." };
  return <html lang="en"><body>
    <header className="reference-header"><div className="header-inner">
      <Link className="reference-logo" href="/"><Image src={logoUrl} alt="Royal Smash logo" width={42} height={42} unoptimized/><span><b>Royal Smash!</b><small>- Physics Puzzle Guide</small></span></Link>
      <SiteNavigation />
      <details className="mobile-menu"><summary aria-label="Open navigation">☰</summary><div><Link href="/">Home</Link><Link href="/#guides">Level Guides</Link><Link href="/#download">Download Game</Link><Link href="/#about">About</Link><Link href="/#faq">FAQ</Link></div></details>
    </div></header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}
    <footer className="reference-footer"><div><Link className="reference-logo" href="/"><Image src={logoUrl} alt="" width={42} height={42} unoptimized/><span><b>Royal Smash!</b><small>- Physics Puzzle Guide</small></span></Link><p>Your friendly companion for Royal Smash! - Physics Puzzle solutions.</p></div><div><h3>Quick links</h3><Link href="/#guides">Level guides</Link><Link href="/#download">Download game</Link><Link href="/#tips">Tips &amp; tricks</Link><Link href="/about">About us</Link></div><div><h3>Information</h3><Link href="/privacy">Privacy policy</Link><Link href="/contact">Contact &amp; corrections</Link></div><small>© 2026 Royal Smash! - Physics Puzzle Guide. Independent fan-made resource.</small></footer>
  </body></html>;
}

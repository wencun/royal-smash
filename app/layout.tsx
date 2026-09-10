import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LevelSearch from "./components/LevelSearch";
import "./globals.css";

const logoUrl = "https://play-lh.googleusercontent.com/VqJWXEzCPnmd4pCVdTBOvzYzbRs9u_BEcKVWUuL07RhKCtUmun3J5qC2p9_1C0A27Fpg8EaGUaE8AmDmF1pBfA=w480-h960-rw";

export const metadata: Metadata = {
  metadataBase: new URL("https://royal-smash.cc"),
  title: { default: "Royal Smash Walkthroughs & Level Solutions", template: "%s | Royal Smash Guide" },
  description: "Clear Royal Smash levels 51–80 with short step-by-step solutions, mistake fixes, and fast level navigation.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Royal Smash Guide", title: "Royal Smash Walkthroughs & Level Solutions", description: "Fast, focused help for Royal Smash levels 51–80.", url: "https://royal-smash.cc" },
  robots: { index: true, follow: true },
  icons: { icon: logoUrl, apple: logoUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "Royal Smash Guide", url: "https://royal-smash.cc/", description: "Independent Royal Smash walkthroughs." };
  return <html lang="en"><body>
    <header className="reference-header"><div className="header-inner">
      <Link className="reference-logo" href="/"><Image src={logoUrl} alt="Royal Smash logo" width={42} height={42} unoptimized/><b>Royal Smash</b></Link>
      <nav aria-label="Main navigation"><Link href="/">⌂ <span>Home</span></Link><Link href="/#guides">▣ <span>Level Guides</span></Link><Link href="/#download">↓ <span>Download</span></Link><Link href="/#about">ⓘ <span>About</span></Link><Link href="/#faq">? <span>FAQ</span></Link></nav>
      <LevelSearch />
      <details className="mobile-menu"><summary aria-label="Open navigation">☰</summary><div><Link href="/">Home</Link><Link href="/#guides">Level Guides</Link><Link href="/#download">Download Game</Link><Link href="/#about">About</Link><Link href="/#faq">FAQ</Link></div></details>
    </div></header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}
    <footer className="reference-footer"><div><Link className="reference-logo" href="/"><Image src={logoUrl} alt="" width={42} height={42} unoptimized/><b>Royal Smash</b></Link><p>Your friendly companion for Royal Smash puzzle solutions.</p></div><div><h3>Quick links</h3><Link href="/#guides">Level guides</Link><Link href="/#download">Download game</Link><Link href="/#tips">Tips &amp; tricks</Link><Link href="/about">About us</Link></div><div><h3>Information</h3><Link href="/privacy">Privacy policy</Link><Link href="/contact">Contact &amp; corrections</Link></div><small>© 2026 Royal Smash Guide. Independent fan-made resource.</small></footer>
  </body></html>;
}

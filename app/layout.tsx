import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <nav aria-label="Main navigation"><Link href="/">⌂ <span>Home</span></Link><Link href="/walkthrough">▣ <span>Guides</span></Link><Link href="/#tips">★ <span>Tips</span></Link><Link href="/#about">ⓘ <span>About</span></Link></nav>
      <form className="level-search" action="/walkthrough"><span>⌕</span><input aria-label="Search level" name="level" type="number" min="51" max="80" placeholder="Search level" /></form>
      <Link className="mobile-guide-link" href="/walkthrough">☰</Link>
    </div></header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}
    <footer className="reference-footer"><div><Link className="reference-logo" href="/"><Image src={logoUrl} alt="" width={42} height={42} unoptimized/><b>Royal Smash</b></Link><p>Your friendly companion for Royal Smash puzzle solutions.</p></div><div><h3>Quick links</h3><Link href="/walkthrough">Game guides</Link><Link href="/#tips">Tips &amp; tricks</Link><Link href="/about">About us</Link></div><div><h3>Information</h3><Link href="/privacy">Privacy policy</Link><Link href="/contact">Contact &amp; corrections</Link></div><small>© 2026 Royal Smash Guide. Independent fan-made resource.</small></footer>
  </body></html>;
}

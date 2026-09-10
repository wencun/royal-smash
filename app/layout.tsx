import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const logoUrl = "https://play-lh.googleusercontent.com/VqJWXEzCPnmd4pCVdTBOvzYzbRs9u_BEcKVWUuL07RhKCtUmun3J5qC2p9_1C0A27Fpg8EaGUaE8AmDmF1pBfA=w480-h960-rw";

export const metadata: Metadata = {
  metadataBase: new URL("https://royal-smash.cc"),
  title: { default: "Royal Smash Walkthroughs & Level Solutions", template: "%s | Royal Smash Guide" },
  description: "Clear Royal Smash: Physics Puzzle levels 51–80 with short step-by-step solutions, mistake fixes, and fast level navigation.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Royal Smash Guide", title: "Royal Smash Walkthroughs & Level Solutions", description: "Fast, focused help for Royal Smash levels 51–80.", url: "https://royal-smash.cc" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: logoUrl, apple: logoUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "Royal Smash Guide", url: "https://royal-smash.cc/", description: "Independent Royal Smash: Physics Puzzle walkthroughs." };
  return <html lang="en"><body>
    <header className="site-header"><Link className="logo" href="/"><Image className="brand-icon" src={logoUrl} alt="Royal Smash game logo" width={48} height={48} unoptimized/><span><b>Royal Smash</b><small>WALKTHROUGH</small></span></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/walkthrough">Walkthrough</Link><Link href="/#how-to-play">How to play</Link><Link href="/about">About</Link></nav><Link className="header-cta" href="/walkthrough">Find a level <span>→</span></Link></header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}
    <footer><div className="footer-brand"><Link className="logo" href="/"><Image className="brand-icon" src={logoUrl} alt="" width={48} height={48} unoptimized/><span><b>Royal Smash</b><small>WALKTHROUGH</small></span></Link><p>A cozy corner for clear, direct Royal Smash puzzle solutions.</p></div><div><h3>Explore</h3><nav><Link href="/">Home</Link><Link href="/walkthrough">All levels</Link><Link href="/about">About</Link></nav></div><div><h3>Information</h3><nav><Link href="/privacy">Privacy</Link><Link href="/contact">Corrections</Link></nav></div><small>© 2026 Royal Smash Guide · Independent fan-made resource.</small></footer>
  </body></html>;
}

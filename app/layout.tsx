import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://royal-smash.cc"),
  title: { default: "Royal Smash Walkthroughs & Level Solutions", template: "%s | Royal Smash Guide" },
  description: "Clear Royal Smash: Physics Puzzle levels 51–80 with short step-by-step solutions, mistake fixes, and fast level navigation.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Royal Smash Guide", title: "Royal Smash Walkthroughs & Level Solutions", description: "Fast, focused help for Royal Smash levels 51–80.", url: "https://royal-smash.cc" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "Royal Smash Guide", url: "https://royal-smash.cc/", description: "Independent Royal Smash: Physics Puzzle walkthroughs." };
  return <html lang="en"><body><header className="nav"><Link className="logo" href="/"><span>♛</span> ROYAL <b>SMASH</b><small>PHYSICS PUZZLE GUIDE</small></Link><nav aria-label="Main navigation"><Link href="/walkthrough">All levels</Link><Link href="/about">About</Link></nav></header><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}<footer><div><Link className="logo" href="/"><span>♛</span> ROYAL <b>SMASH</b></Link><p>Independent walkthrough site. Not affiliated with the game publisher.</p></div><nav><Link href="/walkthrough">Levels 51–80</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Corrections</Link></nav><small>© 2026 Royal Smash Guide</small></footer></body></html>;
}

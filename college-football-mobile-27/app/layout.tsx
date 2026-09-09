import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "College Football Mobile 27 Guide", template: "%s | College Football Mobile 27 Guide" },
  description: "Independent, source-checked guides for EA SPORTS College Football Mobile 27 updates, device support, modes, and known issues.",
  robots: { index: true, follow: true },
  openGraph: { type: "website", title: "College Football Mobile 27 Guide", description: "Source-checked updates, device support, and known issues." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

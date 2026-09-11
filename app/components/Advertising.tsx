import Script from "next/script";

const containerId = "container-33161588d61c6f43df69cae3b48e4b22";

export default function Advertising() {
  return <aside className="top-advertisement" aria-label="Advertisement">
    <Script
      id="google-adsense"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4539826019899948"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
    />
    <div id={containerId} />
    <Script
      id="top-ad-container-script"
      src="https://pl31268833.profitableratecpmnetwork.com/33161588d61c6f43df69cae3b48e4b22/invoke.js"
      strategy="afterInteractive"
      async
      data-cfasync="false"
    />
    <Script
      id="site-ad-script-c0c5d1"
      src="https://pl31268835.profitableratecpmnetwork.com/c0/c5/d1/c0c5d1dd791b56db3fa550a47b823a4f.js"
      strategy="afterInteractive"
    />
    <Script
      id="site-ad-script-f0ba4d"
      src="https://pl31268834.profitableratecpmnetwork.com/f0/ba/4d/f0ba4da71c487450ed2b117c7c8180f9.js"
      strategy="afterInteractive"
    />
  </aside>;
}

import Script from "next/script";

const measurementId = "G-TEJWJ3VLSW";

export default function GoogleAnalytics() {
  return <>
    <Script
      id="google-analytics-loader"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
      async
    />
    <Script id="google-analytics-config" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `}
    </Script>
  </>;
}

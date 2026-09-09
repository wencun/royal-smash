import type { ReactNode } from "react";

export type Source = { label: string; href: string };
export type Guide = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  checked: string;
  status: "Verified" | "Community report" | "Monitoring";
  quickAnswer: ReactNode;
  sections: { title: string; body: ReactNode }[];
  sources: Source[];
  next: string[];
};

const appStore = "https://apps.apple.com/us/app/ea-college-football-mobile-27/id6759412341";
const playStore = "https://play.google.com/store/apps/details?hl=en-US&id=com.ea.gp.collegefbmobile";
const eaHelp = "https://help.ea.com/en/games/ea-sports-college-football/college-football-mobile/";

export const guides: Guide[] = [
  {
    slug: "device-compatibility",
    label: "Device compatibility",
    eyebrow: "VERSION 1.3.0 · QUICK CHECK",
    title: "College Football Mobile 27 device compatibility: what the current update confirms",
    description: "A source-checked device support guide for EA SPORTS College Football Mobile 27, including the latest iPhone compatibility update.",
    checked: "September 7, 2026",
    status: "Verified",
    quickAnswer: <p><strong>Quick answer:</strong> EA&apos;s current App Store listing names iPhone 13 Pro, iPhone 13 Pro Max, and iPhone 14 through iPhone 17 models among the devices the game is best enjoyed on. The latest listed update expands support for iPhone 13 Pro and iPhone 14 models. Update before treating an older compatibility report as current.</p>,
    sections: [
      {
        title: "Start with the version, not an old device list",
        body: <><p>College Football Mobile 27 has changed device support through post-launch updates. The App Store version history describes Version 1.3.0 as a compatibility and performance update, while the current listing gives a practical baseline for supported iPhone and iPad hardware. That matters because launch-week reports can describe a narrower set of devices than the version available today.</p><p>Before troubleshooting, open the game&apos;s store page and confirm that the installed build is current. If your phone is listed in the current compatibility note but the game still will not finish setup, treat that as a separate install or network issue rather than proof that the device is unsupported.</p></>,
      },
      {
        title: "What is officially confirmed",
        body: <><ul><li>The App Store listing identifies iPhone 13 Pro, iPhone 13 Pro Max, and all iPhone 14–17 models as recommended hardware.</li><li>Version 1.3.0 says that compatibility was expanded to include iPhone 13 Pro and iPhone 14 models.</li><li>EA&apos;s support hub also lists a September patch focused on device compatibility and gameplay improvements.</li></ul><p>These points confirm that support has expanded; they do not guarantee identical frame rate, storage use, or battery behavior on every model. Avoid using a single social post as a compatibility list when the store record has changed.</p></>,
      },
      {
        title: "When this guide does not answer the problem",
        body: <p>This page cannot confirm compatibility for every Android handset, tablet, emulator, or future iOS release. If your exact device is not named by EA, do not describe it as supported based on another player&apos;s report. Check the current Google Play eligibility message and EA&apos;s support notices, then use the install troubleshooting guide if the app stalls after it is offered to your device.</p>,
      },
    ],
    sources: [
      { label: "EA College Football Mobile 27 on the App Store — current device note and version history", href: appStore },
      { label: "EA College Football Mobile 27 official support — patches and support articles", href: eaHelp },
      { label: "EA College Football Mobile 27 on Google Play", href: playStore },
    ],
    next: ["installing-stuck-at-69", "unlimited-arena"],
  },
  {
    slug: "installing-stuck-at-69",
    label: "Install stalled at 69%",
    eyebrow: "KNOWN ISSUE · SOURCE-CHECKED",
    title: "College Football Mobile 27 stuck at 69%: verified checks and community-reported steps",
    description: "What is confirmed about College Football Mobile 27 installations that stall at 69%, plus clearly labeled community reports.",
    checked: "September 7, 2026",
    status: "Community report",
    quickAnswer: <p><strong>Quick answer:</strong> A 69% install stall is reported in App Store reviews, not named by EA as a dedicated error code. First update to the latest store version and confirm the device is currently supported. Reinstalling and allowing the in-app content download to finish are player-reported steps, not an EA-published fix.</p>,
    sections: [
      {
        title: "What EA has confirmed",
        body: <><p>EA&apos;s recent store updates mention expanded device compatibility, reduced app size, stability work, and fixes for launch problems. The official support hub also lists recent patches and standard mobile troubleshooting. Neither source currently identifies “69%” as a specific error code with a guaranteed repair path.</p><p>That distinction is important: the safest first action is to install the newest available update. A guide should not promise that clearing a cache, switching networks, or reinstalling will solve every stalled download when EA has not published that claim.</p></>,
      },
      {
        title: "Community-reported steps, labeled as reports",
        body: <><ol><li>Check that the device can install the newest available store version.</li><li>Allow the post-install content download to complete without repeatedly closing the app.</li><li>If the download remains stalled, some App Store reviewers report reinstalling and then waiting for the content download again.</li></ol><p>These are reports from players, not verified universal fixes. Record your device model, operating system, game version, storage state, and whether the stall repeats before contacting EA support; those details make a report more useful than “it is stuck.”</p></>,
      },
      {
        title: "When to stop troubleshooting locally",
        body: <p>Do not repeatedly reinstall if the current store page says the game is unavailable for the device, if storage is insufficient, or if an EA support notice identifies an active service problem. In those cases, wait for an official compatibility or service update. This guide will be revised only when EA publishes a dedicated fix or a source-backed reproduction provides a clearer condition.</p>,
      },
    ],
    sources: [
      { label: "EA official support hub — current patch and mobile help links", href: eaHelp },
      { label: "App Store listing and player reviews — reports of 69% installation stalls", href: appStore },
      { label: "Google Play listing — current Android build information", href: playStore },
    ],
    next: ["device-compatibility", "unlimited-arena"],
  },
  {
    slug: "unlimited-arena",
    label: "Unlimited Arena",
    eyebrow: "MODE UPDATE · MONITORING",
    title: "College Football Mobile 27 Unlimited Arena: confirmed mode details and what is still unknown",
    description: "A source-led tracker for the Unlimited Arena update in EA SPORTS College Football Mobile 27.",
    checked: "September 7, 2026",
    status: "Monitoring",
    quickAnswer: <p><strong>Quick answer:</strong> EA has announced Unlimited Arena as a competitive player-versus-player mode and introduced it alongside College Kickoff content. Official pages confirm the mode exists, but do not publish enough verifiable match data for a trustworthy “best strategy” claim yet.</p>,
    sections: [
      {
        title: "What the update confirms",
        body: <p>EA&apos;s College Football Mobile support hub identifies Unlimited Arena as a new competitive mode and the App Store version history places it alongside College Kickoff content. That supports a factual mode overview, current event tracking, and update chronology. It does not establish a universal optimal lineup, reward route, or entry timing.</p>,
      },
      {
        title: "How this guide will handle strategy claims",
        body: <p>Strategy recommendations need disclosed evidence: official rules, public rankings, event reward tables, or a repeatable sample with its version and date. Until those exist, this page will distinguish confirmed rules from community observations. “Best strategy” pages without a visible data source are excluded from this site&apos;s editorial standard.</p>,
      },
      {
        title: "Next evidence to collect",
        body: <ul><li>Official reward and matchmaking rules.</li><li>Version-specific changes to the mode.</li><li>Publicly attributable samples large enough to compare lineups without presenting anecdote as fact.</li></ul>,
      },
    ],
    sources: [
      { label: "EA official support hub — Unlimited Arena announcement and current updates", href: eaHelp },
      { label: "App Store version history — Unlimited Arena and College Kickoff update", href: appStore },
    ],
    next: ["device-compatibility", "installing-stuck-at-69"],
  },
];

export const guideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("publishes all 370 level guides", async () => {
  const source = await read("app/levels.ts");
  assert.match(source, /length: MAX_LEVEL/);
  assert.match(source, /index \+ 1/);
  assert.match(source, /difficulty/);
  assert.match(source, /steps/);
});

test("level pages are static, canonical, structured, and internally linked", async () => {
  const source = await read("app/level/[level]/page.tsx");
  assert.match(source, /dynamicParams = false/);
  assert.match(source, /generateStaticParams/);
  assert.match(source, /alternates:\s*\{\s*canonical:/);
  assert.match(source, /"@type":\s*"HowTo"/);
  assert.match(source, /guide\.level > 1/);
  assert.match(source, /NEXT/);
});

test("publishes crawler discovery routes", async () => {
  const [robots, sitemap] = await Promise.all([read("app/robots.ts"), read("app/sitemap.ts")]);
  assert.match(robots, /royal-smash\.cc\/sitemap\.xml/);
  assert.match(sitemap, /guides\.map/);
  assert.match(sitemap, /\/level\/\$\{g\.level\}/);
});

test("navigation supports every published level", async () => {
  const [layout, homepage, search] = await Promise.all([read("app/layout.tsx"), read("app/page.tsx"), read("app/components/LevelSearch.tsx")]);
  assert.match(layout, /href="\/#guides"/);
  assert.match(homepage, /apps\.apple\.com\/us\/app\/royal-smash-physics-puzzle\/id6780891673/);
  assert.match(search, /selected < 1 \|\| selected > MAX_LEVEL/);
});

test("groups guides by ten and uses per-level video covers", async () => {
  const [homepage, levelPage, media] = await Promise.all([read("app/page.tsx"), read("app/level/[level]/page.tsx"), read("app/media.ts")]);
  assert.match(homepage, /<LevelBrowser \/>/);
  assert.match(media, /videoPreviewUrl/);
  assert.match(levelPage, /Levels \{groupStart\}–\{groupStart \+ 9\}/);
  assert.match(media, /PLRUqLxqZJLf0/);
  assert.match(media, /videoIdForLevel/);
  assert.match(media, /videoPreviewUrl/);
});

test("publishes the exact official game name as visible text and structured data", async () => {
  const [layout, homepage] = await Promise.all([read("app/layout.tsx"), read("app/page.tsx")]);
  assert.match(layout, /applicationName: "Royal Smash! - Physics Puzzle Guide"/);
  assert.match(layout, /<small>- Physics Puzzle Guide<\/small>/);
  assert.match(homepage, /<span>Royal Smash! - Physics Puzzle<\/span>/);
  assert.match(homepage, /"@type": "VideoGame"/);
  assert.match(homepage, /sameAs: \[googlePlayUrl, appStoreUrl\]/);
});


test("uses verified per-level YouTube video IDs", async () => {
  const [media, videoIds, levelPage] = await Promise.all([read("app/media.ts"), read("app/video-ids.ts"), read("app/level/[level]/page.tsx")]);
  assert.match(media, /levelVideoIds\[level - 1\]/);
  assert.match(media, /youtube-nocookie\.com\/embed\/\$\{videoId\}/);
  assert.match(videoIds, /"JjGpUlrBqAs", \/\/ Level 352/);
  assert.match(videoIds, /null, \/\/ Level 98/);
  assert.match(videoIds, /null, \/\/ Level 142/);
  assert.match(levelPage, /videoCoverageLabel/);
});

test("header navigation follows the active home section", async () => {
  const [layout, navigation, styles] = await Promise.all([
    read("app/layout.tsx"), read("app/site-navigation.tsx"), read("app/globals.css"),
  ]);
  assert.match(layout, /<SiteNavigation \/>/);
  assert.match(navigation, /window\.addEventListener\("scroll"/);
  assert.match(navigation, /section\.offsetTop <= marker/);
  assert.match(navigation, /className=\{active \? "active"/);
  assert.match(navigation, /aria-current=\{active \? "page"/);
  assert.match(styles, /nav a\.active/);
  assert.doesNotMatch(styles, /nav a:first-child/);
});


test("level picker uses accessible fifty-level range tabs and concise SEO titles", async () => {
  const [homepage, browser] = await Promise.all([read("app/page.tsx"), read("app/components/LevelBrowser.tsx")]);
  assert.match(homepage, /Browse Royal Smash Levels/);
  assert.match(browser, /role="tablist"/);
  assert.match(browser, /aria-selected=\{selected === tab.id\}/);
  assert.match(browser, /Math\.ceil\(MAX_LEVEL \/ RANGE_SIZE\)/);
  assert.match(browser, /Royal Smash level \{level\}/);
  assert.doesNotMatch(browser, /Watch the solution and open the complete step-by-step guide/);
  assert.doesNotMatch(browser, /View featured guide/);
});

test("loads the supplied advertising scripts at the top of every page", async () => {
  const [layout, advertising] = await Promise.all([
    read("app/layout.tsx"), read("app/components/Advertising.tsx"),
  ]);
  assert.match(layout, /<Advertising \/>/);
  assert.ok(layout.indexOf("<Advertising />") < layout.indexOf("{children}"));
  assert.match(advertising, /container-33161588d61c6f43df69cae3b48e4b22/);
  assert.match(advertising, /pl31268833\.profitableratecpmnetwork\.com\/33161588d61c6f43df69cae3b48e4b22\/invoke\.js/);
  assert.match(advertising, /pl31268835\.profitableratecpmnetwork\.com\/c0\/c5\/d1\/c0c5d1dd791b56db3fa550a47b823a4f\.js/);
  assert.match(advertising, /pl31268834\.profitableratecpmnetwork\.com\/f0\/ba\/4d\/f0ba4da71c487450ed2b117c7c8180f9\.js/);
  assert.match(advertising, /data-cfasync="false"/);
  assert.match(advertising, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-4539826019899948/);
  assert.match(advertising, /id="google-adsense"/);
  assert.match(advertising, /crossOrigin="anonymous"/);
});


test("loads and configures Google Analytics on every page", async () => {
  const [layout, analytics] = await Promise.all([
    read("app/layout.tsx"), read("app/components/GoogleAnalytics.tsx"),
  ]);
  assert.match(layout, /<GoogleAnalytics \/>/);
  assert.match(analytics, /G-TEJWJ3VLSW/);
  assert.match(analytics, /www\.googletagmanager\.com\/gtag\/js\?id=/);
  assert.match(analytics, /window\.dataLayer = window\.dataLayer \|\| \[\]/);
  assert.match(analytics, /gtag\('js', new Date\(\)\)/);
  assert.match(analytics, /gtag\('config', '\$\{measurementId\}'\)/);
});


test("expands the video-backed guide library through Level 370", async () => {
  const [levels, browser, search, walkthrough] = await Promise.all([read("app/levels.ts"), read("app/components/LevelBrowser.tsx"), read("app/components/LevelSearch.tsx"), read("app/walkthrough/page.tsx")]);
  assert.match(levels, /MAX_LEVEL = 370/);
  assert.match(levels, /length: MAX_LEVEL/);
  assert.match(browser, /RANGE_SIZE = 50/);
  assert.match(browser, /Math\.min\(start \+ RANGE_SIZE - 1, MAX_LEVEL\)/);
  assert.match(search, /selected > MAX_LEVEL/);
  assert.match(walkthrough, /Math\.ceil\(MAX_LEVEL \/ 10\)/);
});

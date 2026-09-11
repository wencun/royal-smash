import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("publishes all 80 level guides", async () => {
  const source = await read("app/levels.ts");
  assert.match(source, /length: 80/);
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
  assert.match(search, /selected < 1 \|\| selected > 80/);
});

test("groups guides by ten and uses per-level video covers", async () => {
  const [homepage, levelPage, media] = await Promise.all([read("app/page.tsx"), read("app/level/[level]/page.tsx"), read("app/media.ts")]);
  assert.match(homepage, /Array\.from\(\{ length: 8 \}/);
  assert.match(homepage, /level-cover-video/);
  assert.match(levelPage, /Levels \{groupStart\}–\{groupStart \+ 9\}/);
  assert.match(media, /PLRUqLxqZJLf0/);
  assert.match(media, /Math\.max\(1, level\)/);
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


test("uses the one-based YouTube playlist position for every level thumbnail", async () => {
  const media = await read("app/media.ts");
  assert.match(media, /index: String\(videoIndex\(level\)\)/);
  assert.match(media, /listType: "playlist"/);
  assert.match(media, /return Math\.max\(1, level\)/);
  assert.match(media, /youtube-nocookie\.com\/embed\?\$\{params/);
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

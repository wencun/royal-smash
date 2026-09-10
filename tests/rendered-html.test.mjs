import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("publishes 30 focused level guides from 51 through 80", async () => {
  const source = await read("app/levels.ts");
  assert.match(source, /length: 30/);
  assert.match(source, /index \+ 51/);
  assert.match(source, /difficulty/);
  assert.match(source, /steps/);
});

test("level pages are static, canonical, structured, and internally linked", async () => {
  const source = await read("app/level/[level]/page.tsx");
  assert.match(source, /dynamicParams = false/);
  assert.match(source, /generateStaticParams/);
  assert.match(source, /alternates:\{canonical:/);
  assert.match(source, /"@type":"HowTo"/);
  assert.match(source, /PREVIOUS/);
  assert.match(source, /NEXT/);
});

test("publishes crawler discovery routes", async () => {
  const [robots, sitemap] = await Promise.all([read("app/robots.ts"), read("app/sitemap.ts")]);
  assert.match(robots, /royal-smash\.cc\/sitemap\.xml/);
  assert.match(sitemap, /guides\.map/);
  assert.match(sitemap, /\/level\/\$\{g\.level\}/);
});

test("navigation exposes working level, download, and mobile destinations", async () => {
  const [layout, homepage, search] = await Promise.all([
    read("app/layout.tsx"),
    read("app/page.tsx"),
    read("app/components/LevelSearch.tsx"),
  ]);
  assert.match(layout, /href="\/#guides"/);
  assert.match(layout, /href="\/#download"/);
  assert.match(layout, /className="mobile-menu"/);
  assert.match(homepage, /play\.google\.com\/store\/apps\/details\?id=com\.cyphergames\.royalsmash/);
  assert.match(search, /router\.push\(`\/level\/\$\{selected\}`\)/);
  assert.match(search, /selected < 51 \|\| selected > 80/);
});

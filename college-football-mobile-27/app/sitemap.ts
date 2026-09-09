import type { MetadataRoute } from "next";
import { guides } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return [{ url: baseUrl, lastModified: new Date("2026-09-07") }, ...guides.map((guide) => ({ url: `${baseUrl}/${guide.slug}`, lastModified: new Date("2026-09-07") }))];
}

import type { MetadataRoute } from "next";
import { guides } from "./levels";
import { CONTENT_UPDATED_AT, SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: CONTENT_UPDATED_AT, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/walkthrough`, lastModified: CONTENT_UPDATED_AT, changeFrequency: "weekly", priority: 0.9 },
    ...guides.map((guide) => ({
      url: `${SITE_URL}/level/${guide.level}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["about", "privacy", "contact"].map((page) => ({
      url: `${SITE_URL}/${page}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

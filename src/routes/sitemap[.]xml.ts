import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchCarListings } from "@/data/cars.functions";

const BASE_URL = "https://bangla.autos";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/cars", changefreq: "daily", priority: "0.9" },
          { path: "/reconditioned", changefreq: "weekly", priority: "0.8" },
          { path: "/sell", changefreq: "monthly", priority: "0.8" },
          { path: "/compare", changefreq: "weekly", priority: "0.7" },
          { path: "/valuation", changefreq: "monthly", priority: "0.7" },
          { path: "/dealers", changefreq: "weekly", priority: "0.7" },
          { path: "/reviews", changefreq: "weekly", priority: "0.6" },
          { path: "/guides", changefreq: "weekly", priority: "0.6" },
          { path: "/news", changefreq: "daily", priority: "0.6" },
          { path: "/pricing", changefreq: "monthly", priority: "0.5" },
        ];

        let dynamicEntries: SitemapEntry[] = [];
        try {
          const listings = await fetchCarListings();
          dynamicEntries = listings.map((l) => ({
            path: `/cars/${l.slug}`,
            changefreq: "weekly" as const,
            priority: "0.6",
          }));
        } catch (e) {
          console.error("sitemap: failed to load car listings", e);
        }

        const entries = [...staticEntries, ...dynamicEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

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
        const today = new Date().toISOString().split("T")[0];
        const staticEntries: SitemapEntry[] = [
          // Core pages
          { path: "/", changefreq: "daily", priority: "1.0", lastmod: today },
          { path: "/cars", changefreq: "daily", priority: "0.9", lastmod: today },
          { path: "/reconditioned", changefreq: "daily", priority: "0.9", lastmod: today },
          { path: "/sell", changefreq: "monthly", priority: "0.8" },
          { path: "/compare", changefreq: "weekly", priority: "0.7" },
          { path: "/valuation", changefreq: "monthly", priority: "0.7" },
          { path: "/dealers", changefreq: "weekly", priority: "0.7" },
          { path: "/reviews", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/guides", changefreq: "weekly", priority: "0.7" },
          { path: "/news", changefreq: "daily", priority: "0.7", lastmod: today },
          { path: "/pricing", changefreq: "monthly", priority: "0.5" },
          // Brand pages
          { path: "/cars/toyota", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/honda", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/suzuki", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/nissan", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/mitsubishi", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/hyundai", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/bmw", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/mercedes", changefreq: "weekly", priority: "0.7" },
          // Top model pages
          { path: "/cars/toyota/axio", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/toyota/allion", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/toyota/prius", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/toyota/aqua", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/toyota/premio", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/toyota/harrier", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/honda/vezel", changefreq: "weekly", priority: "0.8" },
          { path: "/cars/honda/fit", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/honda/grace", changefreq: "weekly", priority: "0.7" },
          // District pages
          { path: "/cars/dhaka", changefreq: "daily", priority: "0.8", lastmod: today },
          { path: "/cars/chittagong", changefreq: "daily", priority: "0.8", lastmod: today },
          { path: "/cars/sylhet", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/rajshahi", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/mymensingh", changefreq: "weekly", priority: "0.7" },
          { path: "/cars/khulna", changefreq: "weekly", priority: "0.7" },
          // Guide pages
          { path: "/guides/reconditioned-car-buying-guide", changefreq: "monthly", priority: "0.7" },
          { path: "/guides/car-loan-bangladesh", changefreq: "monthly", priority: "0.7" },
          { path: "/guides/brta-registration", changefreq: "monthly", priority: "0.6" },
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

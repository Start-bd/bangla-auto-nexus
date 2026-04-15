import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { Database } from "@/integrations/supabase/types";
import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const BASE_URL = "https://bangla-auto-nexus.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    GET: async () => {
      const { data: listings } = await getServerSupabase()
        .from("car_listings")
        .select("slug, updated_at")
        .eq("is_sold", false)
        .order("updated_at", { ascending: false })
        .limit(1000);

      const staticPages = [
        { loc: "/", priority: "1.0", changefreq: "daily" },
        { loc: "/cars", priority: "0.9", changefreq: "daily" },
        { loc: "/reconditioned", priority: "0.8", changefreq: "weekly" },
        { loc: "/sell", priority: "0.8", changefreq: "monthly" },
        { loc: "/compare", priority: "0.7", changefreq: "weekly" },
        { loc: "/valuation", priority: "0.7", changefreq: "monthly" },
        { loc: "/dealers", priority: "0.7", changefreq: "weekly" },
        { loc: "/reviews", priority: "0.6", changefreq: "weekly" },
        { loc: "/guides", priority: "0.6", changefreq: "weekly" },
        { loc: "/news", priority: "0.6", changefreq: "daily" },
        { loc: "/pricing", priority: "0.5", changefreq: "monthly" },
      ];

      const staticUrls = staticPages
        .map(
          (p) =>
            `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
        )
        .join("\n");

      const listingUrls = (listings || [])
        .map(
          (l) =>
            `  <url>
    <loc>${BASE_URL}/cars/${l.slug}</loc>
    <lastmod>${new Date(l.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
        )
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${listingUrls}
</urlset>`;

      return new Response(sitemap, {
        headers: { "Content-Type": "application/xml" },
      });
    },
  },
});

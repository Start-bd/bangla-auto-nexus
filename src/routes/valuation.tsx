import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/valuation")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.valuation.title },
      { name: "description", content: PAGE_SEO.valuation.description },
      { name: "keywords", content: PAGE_SEO.valuation.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.valuation.title },
      { property: "og:description", content: PAGE_SEO.valuation.description },
      { property: "og:url", content: PAGE_SEO.valuation.canonical },
      { property: "og:image", content: "https://bangla.autos/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_SEO.valuation.title },
      { name: "twitter:description", content: PAGE_SEO.valuation.description },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.valuation.canonical }],
  }),
  component: ValuationPage,
});

function ValuationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">AI গাড়ির মূল্য</h1>
      <p className="mt-2 text-muted-foreground font-bengali">AI ভ্যালুয়েশন — শীঘ্রই আসছে</p>
    </div>
  );
}

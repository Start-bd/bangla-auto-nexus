import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.reviews.title },
      { name: "description", content: PAGE_SEO.reviews.description },
      { name: "keywords", content: PAGE_SEO.reviews.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.reviews.title },
      { property: "og:description", content: PAGE_SEO.reviews.description },
      { property: "og:url", content: PAGE_SEO.reviews.canonical },
      { property: "og:image", content: "https://bangla.autos/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_SEO.reviews.title },
      { name: "twitter:description", content: PAGE_SEO.reviews.description },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.reviews.canonical }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ির রিভিউ</h1>
      <p className="mt-2 text-muted-foreground font-bengali">বাংলায় রিভিউ — শীঘ্রই আসছে</p>
    </div>
  );
}

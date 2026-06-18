import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/reconditioned")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.reconditioned.title },
      { name: "description", content: PAGE_SEO.reconditioned.description },
      { name: "keywords", content: PAGE_SEO.reconditioned.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.reconditioned.title },
      { property: "og:description", content: PAGE_SEO.reconditioned.description },
      { property: "og:url", content: PAGE_SEO.reconditioned.canonical },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.reconditioned.canonical }],
  }),
  component: ReconditionedPage,
});

function ReconditionedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">রিকন্ডিশন্ড গাড়ি</h1>
      <p className="mt-2 text-muted-foreground font-bengali">সম্পূর্ণ গাইড — শীঘ্রই আসছে</p>
    </div>
  );
}

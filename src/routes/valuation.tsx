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
      <h1 className="font-bengali text-3xl font-bold text-foreground">
        গাড়ির মূল্য নির্ধারণ (AI ভ্যালুয়েশন)
      </h1>
      <p className="mt-4 max-w-3xl text-muted-foreground font-bengali">
        ব্র্যান্ড, মডেল, সাল, ইঞ্জিন সিসি, মাইলেজ ও কন্ডিশনের ভিত্তিতে আপনার গাড়ির
        আনুমানিক বাজারমূল্য নির্ণয় করা হয়। বিক্রির আগে দাম ঠিক করতে বা কেনার আগে
        চাওয়া দাম যাচাই করতে এটি ব্যবহার করুন।
      </p>
      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground font-bengali">
        <li>চলতি বাজারের লিস্টিং দামের সাথে তুলনা</li>
        <li>মাইলেজ ও বয়স অনুযায়ী মূল্য হ্রাসের হিসাব</li>
        <li>রিকন্ডিশন্ড বনাম ব্যবহৃত গাড়ির দামের পার্থক্য</li>
      </ul>
    </div>
  );
}

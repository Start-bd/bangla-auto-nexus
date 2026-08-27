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
      <p className="mt-4 max-w-3xl text-muted-foreground font-bengali">
        বাংলাদেশের রাস্তা ও আবহাওয়ার প্রেক্ষিতে গাড়ির বাস্তব অভিজ্ঞতাভিত্তিক রিভিউ —
        মাইলেজ, যন্ত্রাংশের প্রাপ্যতা, সার্ভিসিং খরচ, রিসেল ভ্যালু এবং ঢাকার জ্যামে
        চালানোর অভিজ্ঞতা নিয়ে বিশ্লেষণ।
      </p>
      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground font-bengali">
        <li>জ্বালানি খরচ ও হাইব্রিড ব্যাটারির বাস্তব পারফরম্যান্স</li>
        <li>স্পেয়ার পার্টস ও ওয়ার্কশপ সহজলভ্যতা</li>
        <li>পরিবার ও রাইড শেয়ারিং ব্যবহারের উপযোগিতা</li>
        <li>একই দামের অন্য মডেলের সাথে তুলনা</li>
      </ul>
    </div>
  );
}

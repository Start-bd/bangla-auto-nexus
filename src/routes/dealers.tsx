import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.dealers.title },
      { name: "description", content: PAGE_SEO.dealers.description },
      { name: "keywords", content: PAGE_SEO.dealers.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.dealers.title },
      { property: "og:description", content: PAGE_SEO.dealers.description },
      { property: "og:url", content: PAGE_SEO.dealers.canonical },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.dealers.canonical }],
  }),
  component: DealersPage,
});

function DealersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">যাচাইকৃত ডিলার</h1>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        Bangla Autos-এ তালিকাভুক্ত প্রতিটি ডিলার ট্রেড লাইসেন্স, BRTA রেজিস্ট্রেশন এবং শোরুম যাচাইয়ের পর অনুমোদিত হয়। ঢাকা, চট্টগ্রাম, সিলেট, খুলনা ও দেশের অন্যান্য বিভাগে রিকন্ডিশন্ড ও নতুন গাড়ির বিশ্বস্ত শোরুম খুঁজে পেতে আমাদের ডিরেক্টরি ব্যবহার করুন।
      </p>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        প্রতিটি ডিলার প্রোফাইলে যোগাযোগ, ইনভেন্টরি, ক্রেতাদের রিভিউ ও রেটিং দেখতে পাবেন। সম্পূর্ণ ডিলার ডিরেক্টরি শীঘ্রই চালু হচ্ছে।
      </p>
    </div>
  );
}

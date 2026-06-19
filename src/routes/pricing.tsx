import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.pricing.title },
      { name: "description", content: PAGE_SEO.pricing.description },
      { name: "keywords", content: PAGE_SEO.pricing.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.pricing.title },
      { property: "og:description", content: PAGE_SEO.pricing.description },
      { property: "og:url", content: PAGE_SEO.pricing.canonical },
      { property: "og:image", content: "https://bangla.autos/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_SEO.pricing.title },
      { name: "twitter:description", content: PAGE_SEO.pricing.description },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.pricing.canonical }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">মূল্য তালিকা</h1>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        ব্যক্তিগত বিক্রেতাদের জন্য Bangla Autos-এ গাড়ির বিজ্ঞাপন দেওয়া সম্পূর্ণ ফ্রি। ডিলারদের জন্য রয়েছে মাসিক সাবস্ক্রিপশন প্ল্যান যেখানে আপনি একসাথে অনেক গাড়ি তালিকাভুক্ত করতে পারবেন, ফিচার্ড স্পট পাবেন এবং বিস্তারিত পারফরম্যান্স অ্যানালিটিক্স দেখতে পারবেন।
      </p>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        ফিচার্ড লিস্টিং প্যাকেজ আপনার বিজ্ঞাপনকে সার্চ ফলাফলের শীর্ষে রাখে এবং হোমপেজে প্রদর্শিত হয়। সম্পূর্ণ প্ল্যান ও মূল্যের বিস্তারিত তালিকা শীঘ্রই প্রকাশিত হচ্ছে।
      </p>
    </div>
  );
}

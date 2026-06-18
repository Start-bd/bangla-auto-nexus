import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.news.title },
      { name: "description", content: PAGE_SEO.news.description },
      { name: "keywords", content: PAGE_SEO.news.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.news.title },
      { property: "og:description", content: PAGE_SEO.news.description },
      { property: "og:url", content: PAGE_SEO.news.canonical },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.news.canonical }],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">অটো নিউজ</h1>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        বাংলাদেশের গাড়ির বাজারের সর্বশেষ খবর এক জায়গায়। নতুন মডেল লঞ্চ, আমদানি ও শুল্ক নীতির পরিবর্তন, জ্বালানি ও CNG-এর দাম, BRTA নোটিশ এবং রিকন্ডিশন্ড গাড়ির বাজারের সাপ্তাহিক ট্রেন্ড — সব আপডেট সম্পূর্ণ বাংলায়।
      </p>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        বিশেষজ্ঞ মতামত, ইন্ডাস্ট্রি বিশ্লেষণ এবং গ্লোবাল অটো শিল্পের যেসব ঘটনা বাংলাদেশের ক্রেতাদের প্রভাবিত করতে পারে — সবকিছুর কভারেজ এখানেই। সম্পূর্ণ নিউজরুম শীঘ্রই চালু হচ্ছে।
      </p>
    </div>
  );
}

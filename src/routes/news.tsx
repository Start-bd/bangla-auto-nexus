import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "অটো নিউজ — Bangla Autos" },
      { name: "description", content: "বাংলাদেশের সর্বশেষ অটোমোটিভ খবর — নতুন গাড়ি লঞ্চ, আমদানি ও শুল্ক নীতি, জ্বালানির দাম, BRTA নোটিশ এবং রিকন্ডিশন্ড বাজারের আপডেট।" },
      { property: "og:title", content: "অটো নিউজ — Bangla Autos" },
      { property: "og:description", content: "বাংলাদেশের সর্বশেষ অটোমোটিভ খবর, আমদানি নীতি, জ্বালানির দাম ও বাজার আপডেট।" },
      { property: "og:url", content: "https://bangla.autos/news" },
    ],
    links: [{ rel: "canonical", href: "https://bangla.autos/news" }],
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

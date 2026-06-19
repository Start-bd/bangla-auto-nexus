import { createFileRoute } from "@tanstack/react-router";
import { PAGE_SEO } from "@/lib/pageSeo";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: PAGE_SEO.guides.title },
      { name: "description", content: PAGE_SEO.guides.description },
      { name: "keywords", content: PAGE_SEO.guides.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.guides.title },
      { property: "og:description", content: PAGE_SEO.guides.description },
      { property: "og:url", content: PAGE_SEO.guides.canonical },
      { property: "og:image", content: "https://bangla.autos/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_SEO.guides.title },
      { name: "twitter:description", content: PAGE_SEO.guides.description },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.guides.canonical }],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ি কেনার গাইড</h1>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        গাড়ি কেনা বাংলাদেশের প্রায় প্রতিটি পরিবারের জন্য একটি বড় সিদ্ধান্ত। আমাদের গাইডে আপনি পাবেন রিকন্ডিশন্ড জাপানি গাড়ির অকশন গ্রেডিং বোঝার নিয়ম, BRTA রেজিস্ট্রেশন প্রক্রিয়া, আমদানি শুল্ক ও কর হিসাব, এবং ব্যাংক অটো লোনের তুলনা।
      </p>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        এছাড়াও রয়েছে প্রি-পারচেজ ইন্সপেকশন চেকলিস্ট, ব্যবহৃত গাড়ির দরদাম কৌশল এবং রক্ষণাবেক্ষণ টিপস — সবকিছু সম্পূর্ণ বাংলায়। বিস্তারিত গাইড আর্টিকেল শীঘ্রই প্রকাশিত হবে।
      </p>
    </div>
  );
}

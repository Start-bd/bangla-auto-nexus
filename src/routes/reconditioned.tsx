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
      { property: "og:image", content: "https://bangla.autos/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_SEO.reconditioned.title },
      { name: "twitter:description", content: PAGE_SEO.reconditioned.description },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.reconditioned.canonical }],
  }),
  component: ReconditionedPage,
});

function ReconditionedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">
        রিকন্ডিশন্ড গাড়ির দাম ও গাইড
      </h1>
      <p className="mt-4 max-w-3xl text-muted-foreground font-bengali">
        বাংলাদেশে আমদানি করা জাপানি রিকন্ডিশন্ড গাড়ির হালনাগাদ বাজারদর, জনপ্রিয় মডেল
        (Toyota Axio, Allion, Premio, Prius, Aqua, Honda Vezel, Grace) এবং কেনার আগে
        যাচাই করার বিষয়গুলো এখানে পাবেন।
      </p>
      <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground font-bengali">
        <li>গ্রেড, অকশন শিট ও মাইলেজ কীভাবে যাচাই করবেন</li>
        <li>শুল্ক, রেজিস্ট্রেশন ও BRTA খরচের ধারণা</li>
        <li>ইঞ্জিন সিসি অনুযায়ী দামের পার্থক্য</li>
        <li>যাচাইকৃত ডিলার ও ব্যক্তিগত বিক্রেতার তুলনা</li>
      </ul>
      <p className="mt-6 max-w-3xl text-muted-foreground font-bengali">
        বর্তমানে বাজারে থাকা রিকন্ডিশন্ড গাড়ির তালিকা দেখতে মার্কেটপ্লেস পেজে যান।
      </p>
    </div>
  );
}

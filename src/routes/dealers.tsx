import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: "যাচাইকৃত ডিলার ডিরেক্টরি — Bangla Autos" },
      { name: "description", content: "বাংলাদেশের যাচাইকৃত গাড়ির ডিলার খুঁজুন — ঢাকা, চট্টগ্রাম, সিলেটসহ সব বিভাগে রিকন্ডিশন্ড ও নতুন গাড়ির বিশ্বস্ত শোরুম, যোগাযোগ এবং রিভিউ এক জায়গায়।" },
      { property: "og:title", content: "যাচাইকৃত ডিলার ডিরেক্টরি — Bangla Autos" },
      { property: "og:description", content: "বাংলাদেশের যাচাইকৃত রিকন্ডিশন্ড ও নতুন গাড়ির ডিলার, তাদের ইনভেন্টরি এবং রিভিউ এক জায়গায়।" },
      { property: "og:url", content: "https://bangla.autos/dealers" },
    ],
    links: [{ rel: "canonical", href: "https://bangla.autos/dealers" }],
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

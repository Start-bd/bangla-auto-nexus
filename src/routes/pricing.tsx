import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "মূল্য তালিকা — Bangla Autos | ডিলার সাবস্ক্রিপশন" },
      { name: "description", content: "Bangla Autos-এ বিজ্ঞাপন দেওয়ার মূল্য তালিকা — ব্যক্তিগত বিক্রেতাদের জন্য ফ্রি লিস্টিং, ডিলারদের জন্য মাসিক সাবস্ক্রিপশন এবং ফিচার্ড লিস্টিং প্যাকেজের বিস্তারিত দাম।" },
      { property: "og:title", content: "মূল্য তালিকা — Bangla Autos" },
      { property: "og:description", content: "ফ্রি ব্যক্তিগত লিস্টিং, ডিলার সাবস্ক্রিপশন এবং ফিচার্ড লিস্টিং প্যাকেজের সম্পূর্ণ মূল্য তালিকা।" },
      { property: "og:url", content: "https://bangla.autos/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://bangla.autos/pricing" }],
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

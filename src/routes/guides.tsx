import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "গাড়ি কেনার গাইড — Bangla Autos" },
      { name: "description", content: "বাংলাদেশে গাড়ি কেনার আগে যা জানা দরকার — রিকন্ডিশন্ড জাপানি গাড়ির গ্রেডিং, BRTA রেজিস্ট্রেশন, আমদানি শুল্ক, ব্যাংক ফাইন্যান্সিং ও প্রি-পারচেজ চেকলিস্ট, সম্পূর্ণ বাংলায়।" },
      { property: "og:title", content: "গাড়ি কেনার গাইড — Bangla Autos" },
      { property: "og:description", content: "রিকন্ডিশন্ড গ্রেডিং, BRTA রেজিস্ট্রেশন, ফাইন্যান্সিং এবং প্রি-পারচেজ চেকলিস্ট — সম্পূর্ণ বাংলায় গাইড।" },
      { property: "og:url", content: "https://bangla.autos/guides" },
    ],
    links: [{ rel: "canonical", href: "https://bangla.autos/guides" }],
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

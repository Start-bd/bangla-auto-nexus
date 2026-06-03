import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "গাড়ি তুলনা — Bangla Autos" },
      { name: "description", content: "যেকোনো দুটি বা তিনটি গাড়ি পাশাপাশি তুলনা করুন — দাম, ইঞ্জিন, মাইলেজ, ফিচার ও রক্ষণাবেক্ষণ খরচসহ বিস্তারিত স্পেসিফিকেশন এক জায়গায়।" },
      { property: "og:title", content: "গাড়ি তুলনা — Bangla Autos" },
      { property: "og:description", content: "বাংলাদেশের গাড়ির বাজারের যেকোনো দুটি বা তিনটি মডেল পাশাপাশি তুলনা করে সঠিক সিদ্ধান্ত নিন।" },
      { property: "og:url", content: "https://bangla.autos/compare" },
    ],
    links: [{ rel: "canonical", href: "https://bangla.autos/compare" }],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ি তুলনা</h1>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        Bangla Autos-এর তুলনা টুল ব্যবহার করে আপনি যেকোনো দুটি বা তিনটি গাড়ি পাশাপাশি দেখে নিতে পারবেন। দাম, ইঞ্জিন সিসি, জ্বালানি দক্ষতা, ট্রান্সমিশন, নিরাপত্তা ফিচার এবং রক্ষণাবেক্ষণ খরচসহ গুরুত্বপূর্ণ সব তথ্য এক স্ক্রিনে।
      </p>
      <p className="mt-3 max-w-2xl text-foreground font-bengali">
        রিকন্ডিশন্ড টয়োটা অ্যাকুয়া বনাম হোন্ডা ভেজেল, কিংবা নতুন সুজুকি সুইফট বনাম নিসান নোট — যেকোনো মডেল মিলিয়ে দেখুন এবং বাংলাদেশের বাজারে আপনার বাজেট ও প্রয়োজনের জন্য সবচেয়ে উপযুক্ত গাড়িটি বেছে নিন। তুলনা টুলের সম্পূর্ণ সংস্করণ শীঘ্রই আসছে।
      </p>
    </div>
  );
}

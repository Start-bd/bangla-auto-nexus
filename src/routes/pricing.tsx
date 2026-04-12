import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "মূল্য তালিকা — Bangla Autos | ডিলার সাবস্ক্রিপশন" },
      { name: "description", content: "Bangla Autos ডিলার সাবস্ক্রিপশন প্ল্যান দেখুন।" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">মূল্য তালিকা</h1>
      <p className="mt-2 text-muted-foreground font-bengali">ডিলার প্ল্যান — শীঘ্রই আসছে</p>
    </div>
  );
}

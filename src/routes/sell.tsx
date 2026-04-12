import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "গাড়ি বিক্রি করুন — Bangla Autos" },
      { name: "description", content: "বিনামূল্যে গাড়ির বিজ্ঞাপন দিন। ১০ লক্ষ+ ক্রেতার কাছে পৌঁছান।" },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ি বিক্রি করুন</h1>
      <p className="mt-2 text-muted-foreground font-bengali">বিজ্ঞাপন ফর্ম — শীঘ্রই আসছে</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "গাড়ির রিভিউ — Bangla Autos" },
      { name: "description", content: "বাংলায় গাড়ির রিভিউ পড়ুন। Toyota, Honda, Suzuki সব ব্র্যান্ডের বিস্তারিত রিভিউ।" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ির রিভিউ</h1>
      <p className="mt-2 text-muted-foreground font-bengali">বাংলায় রিভিউ — শীঘ্রই আসছে</p>
    </div>
  );
}

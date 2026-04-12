import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: "যাচাইকৃত ডিলার — Bangla Autos" },
      { name: "description", content: "বাংলাদেশের যাচাইকৃত গাড়ির ডিলার খুঁজুন।" },
    ],
  }),
  component: DealersPage,
});

function DealersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">যাচাইকৃত ডিলার</h1>
      <p className="mt-2 text-muted-foreground font-bengali">ডিলার ডিরেক্টরি — শীঘ্রই আসছে</p>
    </div>
  );
}

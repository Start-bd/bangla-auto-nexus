import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "গাড়ি কেনার গাইড — Bangla Autos" },
      { name: "description", content: "গাড়ি কেনার আগে জানুন — সম্পূর্ণ বাংলায় গাইড।" },
    ],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ি কেনার গাইড</h1>
      <p className="mt-2 text-muted-foreground font-bengali">গাইড সমূহ — শীঘ্রই আসছে</p>
    </div>
  );
}

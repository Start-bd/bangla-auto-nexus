import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reconditioned")({
  head: () => ({
    meta: [
      { title: "রিকন্ডিশন্ড গাড়ি — Bangla Autos | গ্রেড গাইড" },
      { name: "description", content: "রিকন্ডিশন্ড গাড়ি কেনার সম্পূর্ণ গাইড। গ্রেড ৪, ৪.৫, ৫ পার্থক্য জানুন।" },
    ],
  }),
  component: ReconditionedPage,
});

function ReconditionedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">রিকন্ডিশন্ড গাড়ি</h1>
      <p className="mt-2 text-muted-foreground font-bengali">সম্পূর্ণ গাইড — শীঘ্রই আসছে</p>
    </div>
  );
}

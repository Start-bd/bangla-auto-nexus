import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "গাড়ির বাজার — Bangla Autos | গাড়ি কিনুন" },
      { name: "description", content: "বাংলাদেশে রিকন্ডিশন্ড, নতুন এবং ব্যবহৃত গাড়ি কিনুন। সেরা দামে গাড়ি খুঁজুন।" },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ির বাজার</h1>
      <p className="mt-2 text-muted-foreground font-bengali">সব গাড়ির তালিকা — শীঘ্রই আসছে</p>
    </div>
  );
}

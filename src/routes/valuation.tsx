import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/valuation")({
  head: () => ({
    meta: [
      { title: "AI গাড়ির মূল্য — Bangla Autos | গাড়ির দাম কত?" },
      { name: "description", content: "AI দিয়ে আপনার গাড়ির উপযুক্ত বাজারমূল্য জানুন। বিনামূল্যে।" },
    ],
  }),
  component: ValuationPage,
});

function ValuationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">AI গাড়ির মূল্য</h1>
      <p className="mt-2 text-muted-foreground font-bengali">AI ভ্যালুয়েশন — শীঘ্রই আসছে</p>
    </div>
  );
}

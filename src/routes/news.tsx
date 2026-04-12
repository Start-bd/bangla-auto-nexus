import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "অটো নিউজ — Bangla Autos | বাংলাদেশ গাড়ির খবর" },
      { name: "description", content: "বাংলাদেশের সর্বশেষ অটোমোটিভ খবর। নতুন মডেল, আমদানি নীতি, জ্বালানির দাম।" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">অটো নিউজ</h1>
      <p className="mt-2 text-muted-foreground font-bengali">খবর — শীঘ্রই আসছে</p>
    </div>
  );
}

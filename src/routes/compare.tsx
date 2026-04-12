import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "গাড়ি তুলনা — Bangla Autos" },
      { name: "description", content: "যেকোনো দুটি গাড়ি পাশাপাশি তুলনা করুন।" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ি তুলনা</h1>
      <p className="mt-2 text-muted-foreground font-bengali">তুলনা টুল — শীঘ্রই আসছে</p>
    </div>
  );
}

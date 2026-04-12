import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export function SellCTA() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-xl border border-border bg-card p-8 text-center md:p-12">
          <h2 className="font-bengali text-2xl font-bold text-foreground md:text-3xl">
            আপনার গাড়ি বিক্রি করতে চান?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-bengali text-muted-foreground">
            বিনামূল্যে বিজ্ঞাপন দিন — ১০ লক্ষ+ ক্রেতার কাছে পৌঁছান
          </p>
          <Link to="/sell">
            <Button variant="hero" size="xl" className="mt-6">
              এখনই বিজ্ঞাপন দিন →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

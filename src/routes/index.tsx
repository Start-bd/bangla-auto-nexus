import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { StatsCounter } from "@/components/StatsCounter";
import { CarListingCard } from "@/components/CarListingCard";
import { BrandDirectory } from "@/components/BrandDirectory";
import { PriceRangeBrowse } from "@/components/PriceRangeBrowse";
import { ReconditionedPromo } from "@/components/ReconditionedPromo";
import { SellCTA } from "@/components/SellCTA";
import { fetchCarListings } from "@/data/cars.functions";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => fetchCarListings(),
  head: () => ({
    meta: [
      { title: "Bangla Autos — বাংলাদেশের সেরা গাড়ির বাজার | গাড়ি কিনুন ও বেচুন" },
      { name: "description", content: "বাংলাদেশে গাড়ি কিনুন বা বেচুন। রিকন্ডিশন্ড, নতুন এবং ব্যবহৃত গাড়ির বিজ্ঞাপন। AI মূল্য নির্ধারণ, গাইড এবং রিভিউ — সম্পূর্ণ বাংলায়।" },
      { property: "og:title", content: "Bangla Autos — বাংলাদেশের সেরা গাড়ির বাজার" },
      { property: "og:description", content: "বাংলাদেশে গাড়ি কিনুন বা বেচুন। রিকন্ডিশন্ড, নতুন ও ব্যবহৃত গাড়ি — সম্পূর্ণ বাংলায়।" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const allListings = Route.useLoaderData();
  const featured = allListings.filter((l) => l.listingTier === "featured");
  const recent = allListings.filter((l) => l.listingTier !== "featured").slice(0, 6);

  return (
    <>
      <HeroSection />
      <StatsCounter />

      {/* Featured Listings */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bengali text-2xl font-bold text-foreground">
                ⭐ বিশেষ বিজ্ঞাপন
              </h2>
              <p className="mt-1 text-sm text-muted-foreground font-body">Featured Listings</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <CarListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <BrandDirectory />
      <ReconditionedPromo />

      {/* Recently Added */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bengali text-2xl font-bold text-foreground">
                সদ্য যোগ হওয়া গাড়ি
              </h2>
              <p className="mt-1 text-sm text-muted-foreground font-body">Recently Added</p>
            </div>
            <Link to="/cars">
              <Button variant="ghost-light" size="sm">আরও দেখুন →</Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((listing) => (
              <CarListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <PriceRangeBrowse />
      <SellCTA />
    </>
  );
}

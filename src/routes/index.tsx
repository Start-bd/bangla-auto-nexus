import { createFileRoute } from "@tanstack/react-router";
import type { CarListing } from "@/data/mock-data";
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
import { PAGE_SEO } from "@/lib/pageSeo";
import { websiteSchema, organizationSchema, homepageFaqs } from "@/lib/schemas";

export const Route = createFileRoute("/")({
  loader: () => fetchCarListings(),
  head: () => ({
    meta: [
      { title: PAGE_SEO.home.title },
      { name: "description", content: PAGE_SEO.home.description },
      { name: "keywords", content: PAGE_SEO.home.keywords },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: PAGE_SEO.home.title },
      { property: "og:description", content: PAGE_SEO.home.description },
      { property: "og:url", content: PAGE_SEO.home.canonical },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://bangla.autos/og-default.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_SEO.home.title },
      { name: "twitter:description", content: PAGE_SEO.home.description },
    ],
    links: [{ rel: "canonical", href: PAGE_SEO.home.canonical }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
      { type: "application/ld+json", children: JSON.stringify(homepageFaqs) },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const allListings = Route.useLoaderData();
  const featured = allListings.filter((l: CarListing) => l.listingTier === "featured");
  const recent = allListings.filter((l: CarListing) => l.listingTier !== "featured").slice(0, 6);

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
            {featured.map((listing: CarListing) => (
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
            {recent.map((listing: CarListing) => (
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

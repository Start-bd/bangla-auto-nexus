import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { formatPriceRaw, getConditionLabel } from "@/data/mock-data";
import type { CarListing } from "@/data/mock-data";
import { fetchCarBySlug, fetchSimilarCars } from "@/data/cars.functions";
import { CarListingCard } from "@/components/CarListingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Phone,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Fuel,
  Gauge,
  Palette,
  Calendar,
  Settings,
  Shield,
  Star,
  MapPin,
  Clock,
  Eye,
  Calculator,
  X,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/cars/$slug")({
  loader: async ({ params }) => {
    const listing = await fetchCarBySlug({ data: { slug: params.slug } });
    if (!listing) throw notFound();
    const similarCars = await fetchSimilarCars({ data: { brand: listing.brand, priceBdt: listing.priceBdt, excludeId: listing.id } });
    return { listing, similarCars };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.listing;
    const title = l
      ? `${l.brand} ${l.model} ${l.year} — ৳${l.priceBdt.toLocaleString("en-IN")} | Bangla Autos`
      : "গাড়ি — Bangla Autos";
    const desc = l
      ? `${l.brand} ${l.model} ${l.year} ${l.condition === "reconditioned" ? "রিকন্ডিশন্ড" : ""} গাড়ি কিনুন। মূল্য ${formatPriceRaw(l.priceBdt)}। ${l.district}।`
      : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: CarDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <AlertTriangle size={48} className="mb-4 text-muted-foreground/40" />
      <h1 className="font-display text-2xl font-bold text-foreground">
        গাড়িটি পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-muted-foreground font-bengali">
        এই বিজ্ঞাপনটি মুছে ফেলা হয়েছে বা মেয়াদ শেষ হয়ে গেছে।
      </p>
      <Link to="/cars">
        <Button variant="racing" className="mt-6 font-bengali">
          গাড়ির বাজারে ফিরে যান
        </Button>
      </Link>
    </div>
  ),
});

function CarDetailPage() {
  const { listing, similarCars } = Route.useLoaderData();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [showEmi, setShowEmi] = useState(false);
  const [saved, setSaved] = useState(false);

  const condition = getConditionLabel(listing.condition);
  const conditionVariant =
    listing.condition === "reconditioned"
      ? "reconditioned"
      : listing.condition === "new"
        ? "brandNew"
        : "used";

  const sellerOtherCars = useMemo(() => {
    if (listing.sellerType !== "dealer" || !listing.dealerName) return [] as CarListing[];
    return similarCars.filter(
      (c: CarListing) => c.dealerName === listing.dealerName
    ).slice(0, 4);
  }, [listing, similarCars]);

  const nextPhoto = () =>
    setCurrentPhoto((p) => (p + 1) % listing.photos.length);
  const prevPhoto = () =>
    setCurrentPhoto(
      (p) => (p - 1 + listing.photos.length) % listing.photos.length
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground font-bengali">
        <Link to="/" className="hover:text-foreground transition-colors">
          হোম
        </Link>
        <span>/</span>
        <Link to="/cars" className="hover:text-foreground transition-colors">
          গাড়ির বাজার
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {listing.brand} {listing.model} {listing.year}
        </span>
      </nav>

      {/* Main layout: gallery + sidebar */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column: gallery + specs */}
        <div className="flex-1 space-y-6">
          {/* Photo Gallery */}
          <PhotoGallery
            photos={listing.photos}
            alt={`${listing.brand} ${listing.model} ${listing.year}`}
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
            nextPhoto={nextPhoto}
            prevPhoto={prevPhoto}
          />

          {/* Mobile-only quick action bar */}
          <div className="flex items-center gap-3 rounded-lg border border-surface-border bg-card p-3 lg:hidden">
            <p className="font-price text-xl font-bold text-racing-red">
              {formatPriceRaw(listing.priceBdt)}
            </p>
            <div className="ml-auto flex gap-2">
              <Button variant="racing" size="sm" className="text-xs">
                <Phone size={14} /> কল
              </Button>
              <Button variant="whatsapp" size="sm" className="text-xs">
                <MessageCircle size={14} /> WhatsApp
              </Button>
            </div>
          </div>

          {/* Car overview section */}
          <div className="rounded-lg border border-surface-border bg-card p-5">
            <div className="flex flex-wrap items-start gap-3">
              <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {listing.brand} {listing.model} {listing.year}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant={conditionVariant}>{condition.label}</Badge>
                {listing.grade && (
                  <Badge
                    variant="outline"
                    className="border-gold/50 text-gold font-bold"
                  >
                    গ্রেড {listing.grade}
                  </Badge>
                )}
                {listing.isVerified && (
                  <Badge variant="verified">✓ যাচাইকৃত ডিলার</Badge>
                )}
              </div>
            </div>

            <p className="mt-1 text-xs text-muted-foreground font-bengali">
              বিজ্ঞাপন #{listing.id.padStart(5, "0")} ·{" "}
              {listing.daysAgo === 0
                ? "আজকে"
                : `${listing.daysAgo} দিন আগে`}{" "}
              যোগ হয়েছে
            </p>

            {/* Key specs grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <SpecBadge
                icon={<Zap size={16} />}
                label="ইঞ্জিন"
                value={`${listing.engineCc} সিসি`}
              />
              <SpecBadge
                icon={<Fuel size={16} />}
                label="জ্বালানি"
                value={listing.fuelType}
              />
              <SpecBadge
                icon={<Gauge size={16} />}
                label="কিলোমিটার"
                value={`${listing.odometerKm.toLocaleString()}`}
              />
              <SpecBadge
                icon={<Settings size={16} />}
                label="ট্রান্সমিশন"
                value={listing.transmission}
              />
              <SpecBadge
                icon={<Palette size={16} />}
                label="রঙ"
                value={listing.color_bn}
              />
              <SpecBadge
                icon={<Calendar size={16} />}
                label="মডেল বছর"
                value={`${listing.year}`}
              />
              <SpecBadge
                icon={<MapPin size={16} />}
                label="অবস্থান"
                value={listing.district}
              />
              {listing.grade && (
                <SpecBadge
                  icon={<Star size={16} />}
                  label="গ্রেড"
                  value={listing.grade}
                />
              )}
            </div>
          </div>

          {/* Full Specifications Accordion */}
          <SpecificationsAccordion listing={listing} />

          {/* Features */}
          {listing.features.length > 0 && (
            <div className="rounded-lg border border-surface-border bg-card p-5">
              <h2 className="mb-4 font-display text-lg font-bold text-foreground">
                ফিচার ও সুবিধা
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {listing.features.map((f: string) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2 text-sm font-bengali text-foreground"
                  >
                    <Check size={14} className="text-bd-green shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reconditioned info */}
          {listing.condition === "reconditioned" && listing.grade && (
            <div className="rounded-lg border border-gold/20 bg-gold/5 p-5">
              <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-gold">
                <Info size={18} /> রিকন্ডিশন্ড গাড়ির তথ্য
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground font-bengali">
                <p>
                  <span className="font-semibold text-foreground">
                    গ্রেড {listing.grade}
                  </span>{" "}
                  —{" "}
                  {listing.grade === "5"
                    ? "চমৎকার অবস্থা। প্রায় নতুনের মতো।"
                    : listing.grade === "4.5"
                      ? "খুব ভালো অবস্থা। সামান্য ব্যবহারের চিহ্ন থাকতে পারে।"
                      : "ভালো অবস্থা। সাধারণ ব্যবহারজনিত চিহ্ন থাকতে পারে।"}
                </p>
                <p>
                  জাপানি নিলামের গ্রেডিং সিস্টেম অনুযায়ী এই গাড়িটি মূল্যায়ন
                  করা হয়েছে।
                </p>
                <Link
                  to="/reconditioned"
                  className="inline-flex items-center text-racing-red hover:underline"
                >
                  গ্রেড সম্পর্কে বিস্তারিত জানুন →
                </Link>
              </div>
            </div>
          )}

          {/* Seller's other listings */}
          {sellerOtherCars.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-lg font-bold text-foreground">
                {listing.dealerName}-এর আরও গাড়ি
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sellerOtherCars.map((car: CarListing) => (
                  <CarListingCard key={car.id} listing={car} />
                ))}
              </div>
            </div>
          )}

          {/* Similar cars */}
          {similarCars.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-lg font-bold text-foreground">
                একই বাজেটে অন্য গাড়ি
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {similarCars.map((car: CarListing) => (
                  <CarListingCard key={car.id} listing={car} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar (desktop) */}
        <aside className="hidden w-80 shrink-0 space-y-4 lg:block">
          <div className="sticky top-20 space-y-4">
            {/* Price card */}
            <div className="rounded-lg border border-surface-border bg-card p-5">
              <p className="font-price text-3xl font-bold text-racing-red">
                {formatPriceRaw(listing.priceBdt)}
              </p>
              {listing.priceNegotiable && (
                <span className="mt-1 inline-block rounded-full bg-racing-red/10 px-2.5 py-0.5 text-xs text-racing-red font-bengali">
                  দরদাম করা যাবে
                </span>
              )}

              {/* EMI toggle */}
              <button
                onClick={() => setShowEmi(!showEmi)}
                className="mt-3 flex w-full items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-bengali transition-colors"
              >
                <Calculator size={14} />
                {showEmi ? "EMI ক্যালকুলেটর বন্ধ করুন" : "মাসিক কিস্তি জানুন"}
                {showEmi ? (
                  <ChevronUp size={14} className="ml-auto" />
                ) : (
                  <ChevronDown size={14} className="ml-auto" />
                )}
              </button>

              {showEmi && <EmiCalculator price={listing.priceBdt} />}
            </div>

            {/* Contact seller card */}
            <ContactSellerCard
              listing={listing}
              phoneRevealed={phoneRevealed}
              setPhoneRevealed={setPhoneRevealed}
            />

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant={saved ? "racing" : "ghost-light"}
                size="sm"
                className="flex-1 text-xs font-bengali"
                onClick={() => setSaved(!saved)}
              >
                <Heart size={14} className={saved ? "fill-current" : ""} />
                {saved ? "সেভ করা হয়েছে" : "সেভ করুন"}
              </Button>
              <Button
                variant="ghost-light"
                size="sm"
                className="flex-1 text-xs font-bengali"
              >
                <Share2 size={14} /> শেয়ার করুন
              </Button>
            </div>

            {/* Report */}
            <button className="w-full text-center text-xs text-muted-foreground hover:text-racing-red font-bengali transition-colors">
              ⚠ এই বিজ্ঞাপন রিপোর্ট করুন
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-border bg-card p-3 lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <Button variant="racing" className="flex-1 font-bengali">
            <Phone size={16} /> কল করুন
          </Button>
          <Button variant="whatsapp" className="flex-1 font-bengali">
            <MessageCircle size={16} /> WhatsApp
          </Button>
          <Button
            variant="ghost-light"
            size="icon"
            className="h-10 w-10"
            onClick={() => setSaved(!saved)}
          >
            <Heart
              size={18}
              className={saved ? "fill-racing-red text-racing-red" : ""}
            />
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile fixed bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}

/* ---------- Photo Gallery ---------- */

function PhotoGallery({
  photos,
  alt,
  currentPhoto,
  setCurrentPhoto,
  nextPhoto,
  prevPhoto,
}: {
  photos: string[];
  alt: string;
  currentPhoto: number;
  setCurrentPhoto: (i: number) => void;
  nextPhoto: () => void;
  prevPhoto: () => void;
}) {
  return (
    <div className="space-y-2">
      {/* Main photo */}
      <div className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-secondary">
        <img
          src={photos[currentPhoto]}
          alt={`${alt} - ছবি ${currentPhoto + 1}`}
          className="h-full w-full object-cover"
        />
        {/* Nav arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        {/* Photo counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-background/70 px-3 py-1 text-xs text-foreground backdrop-blur-sm">
          {currentPhoto + 1}/{photos.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setCurrentPhoto(i)}
            className={`shrink-0 overflow-hidden rounded-md transition-all ${
              i === currentPhoto
                ? "ring-2 ring-racing-red ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={photo}
              alt={`${alt} - থাম্বনেইল ${i + 1}`}
              className="h-16 w-24 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Spec Badge ---------- */

function SpecBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-surface-border bg-secondary/30 px-3 py-2.5">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground font-bengali">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ---------- Specifications Accordion ---------- */

function SpecificationsAccordion({ listing }: { listing: CarListing }) {
  const sections = [
    {
      title: "মৌলিক তথ্য",
      rows: [
        { label: "ব্র্যান্ড", value: listing.brand },
        { label: "মডেল", value: listing.model },
        { label: "বছর", value: `${listing.year}` },
        { label: "অবস্থা", value: getConditionLabel(listing.condition).label },
        { label: "রঙ", value: `${listing.color_bn} (${listing.color_en})` },
        { label: "অবস্থান", value: listing.district },
      ],
    },
    {
      title: "ইঞ্জিন ও পারফর্ম্যান্স",
      rows: [
        { label: "ইঞ্জিন সিসি", value: `${listing.engineCc} সিসি` },
        { label: "জ্বালানি", value: listing.fuelType },
        { label: "ট্রান্সমিশন", value: listing.transmission },
        { label: "কিলোমিটার", value: `${listing.odometerKm.toLocaleString()} কিমি` },
      ],
    },
  ];

  if (listing.condition === "reconditioned") {
    sections.push({
      title: "রিকন্ডিশন তথ্য",
      rows: [
        { label: "গ্রেড", value: listing.grade || "—" },
        { label: "আমদানি", value: "জাপান" },
        { label: "নিলাম শীট", value: "ডিলারের কাছে জানুন" },
      ],
    });
  }

  return (
    <div className="rounded-lg border border-surface-border bg-card overflow-hidden">
      <h2 className="border-b border-surface-border px-5 py-4 font-display text-lg font-bold text-foreground">
        বিস্তারিত স্পেসিফিকেশন
      </h2>
      {sections.map((section) => (
        <AccordionSection
          key={section.title}
          title={section.title}
          rows={section.rows}
        />
      ))}
    </div>
  );
}

function AccordionSection({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-surface-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold text-foreground font-bengali hover:bg-secondary/30 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="px-5 pb-4">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-surface-border/50 py-2.5 last:border-b-0"
            >
              <span className="text-sm text-muted-foreground font-bengali">
                {row.label}
              </span>
              <span className="text-sm font-semibold text-foreground font-bengali">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- EMI Calculator ---------- */

function EmiCalculator({ price }: { price: number }) {
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.3));
  const [tenureMonths, setTenureMonths] = useState(48);
  const rate = 12; // annual interest rate %

  const principal = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const emi =
    principal > 0 && tenureMonths > 0
      ? Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
            (Math.pow(1 + monthlyRate, tenureMonths) - 1)
        )
      : 0;

  return (
    <div className="mt-3 space-y-3 border-t border-surface-border pt-3">
      <div>
        <label className="mb-1 block text-xs text-muted-foreground font-bengali">
          ডাউন পেমেন্ট (৳)
        </label>
        <Input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="h-8 bg-secondary border-surface-border text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted-foreground font-bengali">
          মেয়াদ (মাস)
        </label>
        <div className="flex gap-2">
          {[24, 36, 48, 60].map((m) => (
            <button
              key={m}
              onClick={() => setTenureMonths(m)}
              className={`flex-1 rounded-md border py-1.5 text-xs font-bold transition-colors ${
                tenureMonths === m
                  ? "border-racing-red bg-racing-red/10 text-racing-red"
                  : "border-surface-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-md bg-secondary/50 p-3 text-center">
        <p className="text-xs text-muted-foreground font-bengali">
          আনুমানিক মাসিক কিস্তি
        </p>
        <p className="font-price text-xl font-bold text-racing-red">
          {formatPriceRaw(emi)}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground font-bengali">
          *{rate}% সুদের হারে, সম্পূর্ণ আনুমানিক
        </p>
      </div>
    </div>
  );
}

/* ---------- Contact Seller Card ---------- */

function ContactSellerCard({
  listing,
  phoneRevealed,
  setPhoneRevealed,
}: {
  listing: CarListing;
  phoneRevealed: boolean;
  setPhoneRevealed: (v: boolean) => void;
}) {
  const mockPhone = "01XXXXXXXXX";

  return (
    <div className="rounded-lg border border-surface-border bg-card p-5">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-foreground">
        বিক্রেতার তথ্য
      </h3>

      {/* Seller info */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-racing-red/10 text-lg font-bold text-racing-red">
          {listing.sellerType === "dealer" && listing.dealerName
            ? listing.dealerName[0]
            : "ব"}
        </div>
        <div>
          <p className="font-semibold text-foreground font-bengali">
            {listing.sellerType === "dealer"
              ? listing.dealerName
              : "ব্যক্তিগত বিক্রেতা"}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground font-bengali">
            <MapPin size={10} /> {listing.district}
          </p>
          {listing.isVerified && (
            <p className="flex items-center gap-1 text-xs text-bd-green font-bengali">
              <Shield size={10} /> যাচাইকৃত ডিলার
            </p>
          )}
        </div>
      </div>

      <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground font-bengali">
        <Clock size={10} /> সাধারণত ২ ঘন্টায় রিপ্লাই দেন
      </p>

      {/* Contact buttons */}
      <div className="mt-4 space-y-2">
        <Button
          variant="racing"
          className="w-full font-bengali"
          onClick={() => setPhoneRevealed(true)}
        >
          <Phone size={16} />
          {phoneRevealed ? mockPhone : "ফোন নম্বর দেখুন"}
        </Button>
        <Button variant="whatsapp" className="w-full font-bengali">
          <MessageCircle size={16} /> WhatsApp এ মেসেজ করুন
        </Button>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CarListingCard } from "@/components/CarListingCard";
import {
  CAR_BRANDS,
  BD_DISTRICTS,
  PRICE_RANGES,
} from "@/data/mock-data";
import { fetchCarListings } from "@/data/cars.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  LayoutGrid,
  List,
  Car,
} from "lucide-react";

const carsSearchSchema = z.object({
  brand: fallback(z.string(), "").default(""),
  condition: fallback(z.string(), "").default(""),
  district: fallback(z.string(), "").default(""),
  fuel: fallback(z.string(), "").default(""),
  grade: fallback(z.string(), "").default(""),
  priceMin: fallback(z.number(), 0).default(0),
  priceMax: fallback(z.number(), 0).default(0),
  sort: fallback(z.string(), "newest").default("newest"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/cars/")({
  validateSearch: zodValidator(carsSearchSchema),
  loader: () => fetchCarListings(),
  head: () => ({
    meta: [
      { title: "গাড়ির বাজার — Bangla Autos | গাড়ি কিনুন" },
      {
        name: "description",
        content:
          "বাংলাদেশে রিকন্ডিশন্ড, নতুন এবং ব্যবহৃত গাড়ি কিনুন। সেরা দামে গাড়ি খুঁজুন।",
      },
    ],
  }),
  component: CarsPage,
});

const CONDITIONS = [
  { value: "reconditioned", label: "রিকন্ডিশন্ড" },
  { value: "new", label: "ব্র্যান্ড নিউ" },
  { value: "used-local", label: "ব্যবহৃত" },
];

const FUEL_TYPES = ["পেট্রোল", "হাইব্রিড", "ডিজেল", "ইলেকট্রিক", "CNG"];
const GRADES = ["5", "4.5", "4", "3.5"];

const SORT_OPTIONS = [
  { value: "newest", label: "নতুন আগে" },
  { value: "price-low", label: "কম দাম আগে" },
  { value: "price-high", label: "বেশি দাম আগে" },
  { value: "km-low", label: "কম কিমি আগে" },
];

function CarsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/cars/" });
  const [mobileFilters, setMobileFilters] = useState(false);

  const updateSearch = (updates: Partial<z.infer<typeof carsSearchSchema>>) => {
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...updates }) });
  };

  const activeFilterCount = [
    search.brand,
    search.condition,
    search.district,
    search.fuel,
    search.grade,
    search.priceMin,
    search.priceMax,
  ].filter(Boolean).length;

  const clearFilters = () => {
    navigate({
      search: {
        brand: "",
        condition: "",
        district: "",
        fuel: "",
        grade: "",
        priceMin: 0,
        priceMax: 0,
        sort: search.sort,
        q: search.q,
      },
    });
  };

  const filtered = useMemo(() => {
    let results = [...MOCK_LISTINGS];

    if (search.q) {
      const q = search.q.toLowerCase();
      results = results.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.district.includes(q)
      );
    }
    if (search.brand) results = results.filter((c) => c.brand === search.brand);
    if (search.condition)
      results = results.filter((c) => c.condition === search.condition);
    if (search.district)
      results = results.filter((c) => c.district === search.district);
    if (search.fuel)
      results = results.filter((c) => c.fuelType === search.fuel);
    if (search.grade)
      results = results.filter((c) => c.grade === search.grade);
    if (search.priceMin)
      results = results.filter((c) => c.priceBdt >= search.priceMin);
    if (search.priceMax)
      results = results.filter((c) => c.priceBdt <= search.priceMax);

    switch (search.sort) {
      case "price-low":
        results.sort((a, b) => a.priceBdt - b.priceBdt);
        break;
      case "price-high":
        results.sort((a, b) => b.priceBdt - a.priceBdt);
        break;
      case "km-low":
        results.sort((a, b) => a.odometerKm - b.odometerKm);
        break;
      default:
        results.sort((a, b) => a.daysAgo - b.daysAgo);
    }

    return results;
  }, [search]);

  const filterSidebar = (
    <div className="space-y-6">
      {/* Brand */}
      <FilterSection title="ব্র্যান্ড">
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {CAR_BRANDS.map((b) => (
            <label
              key={b.name}
              className={`flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                search.brand === b.name
                  ? "bg-racing-red/10 text-racing-red"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
              onClick={() =>
                updateSearch({ brand: search.brand === b.name ? "" : b.name })
              }
            >
              <span className="font-bengali">
                {b.flag} {b.name_bn}
              </span>
              <span className="text-xs opacity-60">{b.count}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="অবস্থা">
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <Badge
              key={c.value}
              variant={search.condition === c.value ? "default" : "outline"}
              className={`cursor-pointer font-bengali transition-colors ${
                search.condition === c.value
                  ? "bg-racing-red text-racing-red-foreground"
                  : "hover:bg-secondary"
              }`}
              onClick={() =>
                updateSearch({
                  condition: search.condition === c.value ? "" : c.value,
                })
              }
            >
              {c.label}
            </Badge>
          ))}
        </div>
      </FilterSection>

      {/* Price range */}
      <FilterSection title="মূল্য সীমা">
        <div className="grid grid-cols-2 gap-2">
          {PRICE_RANGES.map((p) => (
            <button
              key={p.label_bn}
              onClick={() =>
                updateSearch(
                  search.priceMin === p.min && search.priceMax === p.max
                    ? { priceMin: 0, priceMax: 0 }
                    : { priceMin: p.min, priceMax: p.max }
                )
              }
              className={`rounded-md border px-2 py-1.5 text-xs font-bengali transition-colors ${
                search.priceMin === p.min && search.priceMax === p.max
                  ? "border-racing-red bg-racing-red/10 text-racing-red"
                  : "border-surface-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {p.label_bn}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Fuel */}
      <FilterSection title="জ্বালানি">
        <div className="flex flex-wrap gap-2">
          {FUEL_TYPES.map((f) => (
            <Badge
              key={f}
              variant={search.fuel === f ? "default" : "outline"}
              className={`cursor-pointer font-bengali transition-colors ${
                search.fuel === f
                  ? "bg-racing-red text-racing-red-foreground"
                  : "hover:bg-secondary"
              }`}
              onClick={() =>
                updateSearch({ fuel: search.fuel === f ? "" : f })
              }
            >
              {f}
            </Badge>
          ))}
        </div>
      </FilterSection>

      {/* Grade */}
      <FilterSection title="গ্রেড (রিকন্ডিশন্ড)">
        <div className="flex gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() =>
                updateSearch({ grade: search.grade === g ? "" : g })
              }
              className={`flex h-9 w-12 items-center justify-center rounded-md border text-sm font-bold transition-colors ${
                search.grade === g
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-surface-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* District */}
      <FilterSection title="জেলা">
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {BD_DISTRICTS.map((d) => (
            <label
              key={d}
              className={`flex cursor-pointer items-center rounded-md px-2.5 py-1.5 text-sm font-bengali transition-colors ${
                search.district === d
                  ? "bg-racing-red/10 text-racing-red"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
              onClick={() =>
                updateSearch({ district: search.district === d ? "" : d })
              }
            >
              {d}
            </label>
          ))}
        </div>
      </FilterSection>

      {activeFilterCount > 0 && (
        <Button
          variant="ghost-light"
          className="w-full font-bengali"
          onClick={clearFilters}
        >
          <X size={14} /> সব ফিল্টার মুছুন
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          গাড়ির বাজার
        </h1>
        <p className="mt-1 text-sm text-muted-foreground font-bengali">
          {filtered.length}টি গাড়ি পাওয়া গেছে
        </p>
      </div>

      {/* Search + sort bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="ব্র্যান্ড, মডেল বা জেলা খুঁজুন..."
            className="pl-9 font-bengali bg-card border-surface-border"
            value={search.q}
            onChange={(e) => updateSearch({ q: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden font-bengali border-surface-border"
            onClick={() => setMobileFilters(!mobileFilters)}
          >
            <SlidersHorizontal size={14} />
            ফিল্টার
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 text-[10px] bg-racing-red text-racing-red-foreground">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {/* Sort */}
          <select
            value={search.sort}
            onChange={(e) => updateSearch({ sort: e.target.value })}
            className="h-8 rounded-md border border-surface-border bg-card px-3 text-xs text-foreground font-bengali focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {search.brand && (
            <FilterChip
              label={search.brand}
              onRemove={() => updateSearch({ brand: "" })}
            />
          )}
          {search.condition && (
            <FilterChip
              label={
                CONDITIONS.find((c) => c.value === search.condition)?.label ||
                search.condition
              }
              onRemove={() => updateSearch({ condition: "" })}
            />
          )}
          {search.district && (
            <FilterChip
              label={search.district}
              onRemove={() => updateSearch({ district: "" })}
            />
          )}
          {search.fuel && (
            <FilterChip
              label={search.fuel}
              onRemove={() => updateSearch({ fuel: "" })}
            />
          )}
          {search.grade && (
            <FilterChip
              label={`গ্রেড ${search.grade}`}
              onRemove={() => updateSearch({ grade: "" })}
            />
          )}
          {(search.priceMin > 0 || search.priceMax > 0) && (
            <FilterChip
              label={
                PRICE_RANGES.find(
                  (p) =>
                    p.min === search.priceMin && p.max === search.priceMax
                )?.label_bn || "মূল্য সীমা"
              }
              onRemove={() => updateSearch({ priceMin: 0, priceMax: 0 })}
            />
          )}
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground font-bengali transition-colors"
          >
            সব মুছুন
          </button>
        </div>
      )}

      {/* Mobile filter panel */}
      {mobileFilters && (
        <div className="mb-6 rounded-lg border border-surface-border bg-card p-4 lg:hidden">
          {filterSidebar}
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 rounded-lg border border-surface-border bg-card p-4">
            <h2 className="mb-4 font-display text-sm font-bold text-foreground uppercase tracking-wider">
              ফিল্টার
            </h2>
            {filterSidebar}
          </div>
        </aside>

        {/* Listings grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-surface-border bg-card py-20 text-center">
              <Car size={48} className="mb-4 text-muted-foreground/30" />
              <p className="text-lg font-bengali font-semibold text-foreground">
                কোনো গাড়ি পাওয়া যায়নি
              </p>
              <p className="mt-1 text-sm text-muted-foreground font-bengali">
                ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
              </p>
              <Button
                variant="racing"
                size="sm"
                className="mt-4 font-bengali"
                onClick={clearFilters}
              >
                ফিল্টার মুছুন
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((listing) => (
                <CarListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between pb-2 text-sm font-semibold text-foreground font-bengali"
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-racing-red/30 bg-racing-red/10 px-2.5 py-1 text-xs font-bengali text-racing-red">
      {label}
      <button onClick={onRemove} className="hover:text-foreground">
        <X size={12} />
      </button>
    </span>
  );
}

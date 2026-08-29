import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { CAR_BRANDS, BD_DISTRICTS, POPULAR_SEARCHES } from "@/data/mock-data";

const TABS = [
  { id: "buy", icon: "🔍", label: "গাড়ি কিনুন" },
  { id: "sell", icon: "📝", label: "গাড়ি বিক্রি করুন" },
  { id: "valuation", icon: "💰", label: "মূল্য জানুন" },
] as const;

type Option = { value: string; label: string };

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: (string | Option)[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  const normalized: Option[] = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  return (
    <select
      aria-label={label.replace(/[▾\s]+$/, "").trim()}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-11 w-full rounded-md border border-border bg-input px-3 text-sm text-foreground font-bengali focus:border-racing-red focus:outline-none focus:ring-1 focus:ring-racing-red"
    >
      <option value="">{label}</option>
      {normalized.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

const CONDITION_OPTIONS: Option[] = [
  { value: "reconditioned", label: "রিকন্ডিশন্ড" },
  { value: "new", label: "ব্র্যান্ড নিউ" },
  { value: "used", label: "ব্যবহৃত" },
];

const BRAND_OPTIONS: Option[] = CAR_BRANDS.map((b) => ({
  value: b.name,
  label: b.name_bn,
}));

const BUDGET_FROM: Option[] = [
  { value: "500000", label: "৳ ৫ লাখ" },
  { value: "1000000", label: "৳ ১০ লাখ" },
  { value: "1500000", label: "৳ ১৫ লাখ" },
  { value: "2000000", label: "৳ ২০ লাখ" },
];

const BUDGET_TO: Option[] = [
  { value: "1500000", label: "৳ ১৫ লাখ" },
  { value: "2000000", label: "৳ ২০ লাখ" },
  { value: "3000000", label: "৳ ৩০ লাখ" },
  { value: "5000000", label: "৳ ৫০ লাখ" },
];


export function HeroSection() {
  const [activeTab, setActiveTab] = useState<string>("buy");
  const navigate = useNavigate();
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [district, setDistrict] = useState("");

  const handleSearch = () => {
    navigate({
      to: "/cars",
      search: {
        brand,
        condition,
        district,
        fuel: "",
        grade: "",
        priceMin: priceMin ? Number(priceMin) : 0,
        priceMax: priceMax ? Number(priceMax) : 0,
        sort: "newest",
        q: model,
      },
    });
  };


  return (
    <section className="carbon-fiber relative overflow-hidden bg-background pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-racing-red/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-racing-red/20 bg-racing-red/5 px-4 py-1.5 text-sm text-racing-red">
          🇧🇩 বাংলাদেশের নম্বর ১ গাড়ির প্ল্যাটফর্ম
        </div>

        {/* Headline */}
        <h1 className="font-bengali text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
          আপনার স্বপ্নের গাড়ি
          <br />
          <span className="text-gradient-red">এখানেই পাবেন।</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground font-body md:text-lg">
          Bangladesh's most trusted car marketplace — buy, sell, and research in Bengali.
        </p>

        {/* Search box */}
        <div className="mx-auto mt-10 max-w-3xl">
          {/* Tabs */}
          <div className="flex overflow-x-auto rounded-t-lg border border-b-0 border-border bg-secondary">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 whitespace-nowrap px-4 py-3 text-sm font-medium font-bengali transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-racing-red bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Search form */}
          <div className="rounded-b-lg border border-border bg-card p-4 md:p-6">
            {activeTab === "buy" && (
              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-3">
                  <SelectField
                    label="গাড়ির ধরন ▾"
                    options={CONDITION_OPTIONS}
                    value={condition}
                    onChange={setCondition}
                  />
                  <SelectField
                    label="ব্র্যান্ড ▾"
                    options={BRAND_OPTIONS}
                    value={brand}
                    onChange={setBrand}
                  />
                  <SelectField
                    label="মডেল ▾"
                    options={["Aqua", "Vezel", "Swift", "Axio", "Fit", "Note", "Prius"]}
                    value={model}
                    onChange={setModel}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <SelectField
                    label="বাজেট থেকে ▾"
                    options={BUDGET_FROM}
                    value={priceMin}
                    onChange={setPriceMin}
                  />
                  <SelectField
                    label="বাজেট পর্যন্ত ▾"
                    options={BUDGET_TO}
                    value={priceMax}
                    onChange={setPriceMax}
                  />
                  <SelectField
                    label="জেলা ▾"
                    options={BD_DISTRICTS}
                    value={district}
                    onChange={setDistrict}
                  />
                </div>
                <Button type="button" variant="hero" size="xl" className="w-full" onClick={handleSearch}>
                  <Search size={18} /> গাড়ি খুঁজুন
                </Button>
              </div>
            )}


            {activeTab === "sell" && (
              <div className="space-y-3 text-center">
                <p className="font-bengali text-muted-foreground">
                  আপনার গাড়ির ব্র্যান্ড ও মডেল লিখুন — বিনামূল্যে বিজ্ঞাপন দিন
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <SelectField label="ব্র্যান্ড ▾" options={CAR_BRANDS.map((b) => b.name_bn)} />
                  <SelectField label="মডেল ▾" options={["Aqua", "Vezel", "Swift", "Axio"]} />
                </div>
                <Button variant="hero" size="xl" className="w-full">
                  দাম জানুন ও বিজ্ঞাপন দিন
                </Button>
              </div>
            )}

            {activeTab === "valuation" && (
              <div className="space-y-3 text-center">
                <p className="font-bengali text-muted-foreground">
                  AI দিয়ে আপনার গাড়ির উপযুক্ত বাজারমূল্য জানুন
                </p>
                <div className="grid gap-3 md:grid-cols-4">
                  <SelectField label="ব্র্যান্ড ▾" options={CAR_BRANDS.map((b) => b.name_bn)} />
                  <SelectField label="মডেল ▾" options={["Aqua", "Vezel", "Swift"]} />
                  <SelectField label="সাল ▾" options={["২০২৪", "২০২৩", "২০২২", "২০২১", "২০২০", "২০১৯"]} />
                  <SelectField label="অবস্থা ▾" options={["রিকন্ডিশন্ড", "ব্যবহৃত"]} />
                </div>
                <Button variant="hero" size="xl" className="w-full">
                  🔍 AI মূল্য জানুন
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Popular searches */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {POPULAR_SEARCHES.map((s) => (
            <span
              key={s}
              className="cursor-pointer rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-racing-red/30 hover:text-foreground font-body"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { PRICE_RANGES } from "@/data/mock-data";

export function PriceRangeBrowse() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-bengali text-2xl font-bold text-foreground">
          বাজেট অনুযায়ী খুঁজুন
        </h2>
        <p className="mt-1 text-sm text-muted-foreground font-body">Browse by Budget</p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label_bn}
              className="group rounded-lg border border-border bg-card p-4 text-center transition-all hover:border-racing-red/30 hover:shadow-lg hover:shadow-racing-red/5"
            >
              {/* Simple car silhouette */}
              <div className="mx-auto mb-3 flex h-10 w-16 items-end justify-center">
                <svg viewBox="0 0 64 32" className="h-8 w-16 text-muted-foreground/30 transition-colors group-hover:text-racing-red/30">
                  <path d="M8 24 L12 16 L20 12 L44 12 L52 16 L56 24 Z" fill="currentColor" />
                  <rect x="4" y="24" width="56" height="4" rx="2" fill="currentColor" />
                  <circle cx="16" cy="28" r="4" fill="oklch(0.15 0.005 285)" stroke="currentColor" strokeWidth="2" />
                  <circle cx="48" cy="28" r="4" fill="oklch(0.15 0.005 285)" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-price text-sm font-bold text-foreground">{range.label_bn}</span>
              <p className="mt-1 text-xs text-muted-foreground">{range.count} গাড়ি</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

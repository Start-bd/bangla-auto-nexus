import { CAR_BRANDS } from "@/data/mock-data";

export function BrandDirectory() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-bengali text-2xl font-bold text-foreground">
          ব্র্যান্ড অনুযায়ী খুঁজুন
        </h2>
        <p className="mt-1 text-sm text-muted-foreground font-body">Browse by Brand</p>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {CAR_BRANDS.map((brand) => (
            <button
              key={brand.name}
              className="flex flex-shrink-0 flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:border-racing-red/30 hover:shadow-lg hover:shadow-racing-red/5"
              style={{ minWidth: 100 }}
            >
              <span className="text-2xl">{brand.flag}</span>
              <span className="text-xs font-medium text-foreground font-bengali">{brand.name_bn}</span>
              <span className="text-xs text-muted-foreground font-body">{brand.name}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                {brand.count} গাড়ি
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

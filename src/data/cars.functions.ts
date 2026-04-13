import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function getServerSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase environment variables on the server.");
  }
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
import type { CarListing } from "@/data/mock-data";

function mapDbToCarListing(row: Record<string, unknown>): CarListing {
  const createdAt = new Date(row.created_at as string);
  const now = new Date();
  const daysAgo = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

  return {
    id: row.id as string,
    slug: row.slug as string,
    brand: row.brand as string,
    model: row.model as string,
    year: row.year as number,
    condition: row.condition as CarListing["condition"],
    grade: (row.grade as string) || undefined,
    priceBdt: row.price_bdt as number,
    fuelType: (row.fuel_type as string) || "",
    transmission: (row.transmission as string) || "অটো",
    engineCc: (row.engine_cc as number) || 0,
    odometerKm: (row.odometer_km as number) || 0,
    color_bn: (row.color_bn as string) || "",
    color_en: (row.color as string) || "",
    district: row.district as string,
    photos: (row.photos as string[]) || [],
    sellerType: (row.seller_type as string) === "dealer" ? "dealer" : "private",
    dealerName: (row as Record<string, unknown>).dealer_name_bn as string | undefined,
    isVerified: row.is_verified as boolean,
    listingTier: row.listing_tier as CarListing["listingTier"],
    daysAgo,
    features: (row.features as string[]) || [],
    priceNegotiable: row.price_negotiable as boolean,
  };
}

export const fetchCarListings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("car_listings")
    .select("*, dealers(name_bn)")
    .eq("is_sold", false)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching listings:", error);
    return [] as CarListing[];
  }

  return (data || []).map((row: Record<string, unknown>) => {
    const dealers = row.dealers as Record<string, unknown> | null;
    const mapped = { ...row, dealer_name_bn: dealers?.name_bn };
    return mapDbToCarListing(mapped);
  });
});

export const fetchCarBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data: { slug } }) => {
    const { data, error } = await supabaseAdmin
      .from("car_listings")
      .select("*, dealers(name_bn)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return null;
    }

    const dealers = (data as Record<string, unknown>).dealers as Record<string, unknown> | null;
    const mapped = { ...(data as Record<string, unknown>), dealer_name_bn: dealers?.name_bn };
    return mapDbToCarListing(mapped);
  });

export const fetchSimilarCars = createServerFn({ method: "GET" })
  .inputValidator((input: { brand: string; priceBdt: number; excludeId: string }) => input)
  .handler(async ({ data: { brand, priceBdt, excludeId } }) => {
    const { data, error } = await supabaseAdmin
      .from("car_listings")
      .select("*, dealers(name_bn)")
      .eq("is_sold", false)
      .neq("id", excludeId)
      .or(`brand.eq.${brand},and(price_bdt.gte.${priceBdt - 500000},price_bdt.lte.${priceBdt + 500000})`)
      .limit(6);

    if (error || !data) return [] as CarListing[];

    return (data || []).map((row: Record<string, unknown>) => {
      const dealers = row.dealers as Record<string, unknown> | null;
      const mapped = { ...row, dealer_name_bn: dealers?.name_bn };
      return mapDbToCarListing(mapped);
    });
  });

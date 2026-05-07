import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const createListingSchema = z.object({
  brand: z.string().min(1).max(100),
  model: z.string().min(1).max(100),
  year: z.number().min(1990).max(2030),
  condition: z.enum(["new", "used", "reconditioned"]),
  grade: z.string().max(10).optional(),
  priceBdt: z.number().min(10000).max(100000000),
  priceNegotiable: z.boolean(),
  engineCc: z.number().min(100).max(10000).optional(),
  fuelType: z.string().max(50).optional(),
  transmission: z.string().max(50).optional(),
  odometerKm: z.number().min(0).max(1000000).optional(),
  color: z.string().max(50).optional(),
  colorBn: z.string().max(50).optional(),
  district: z.string().min(1).max(100),
  description: z.string().max(2000).optional(),
  descriptionBn: z.string().max(2000).optional(),
  features: z.array(z.string().max(100)).max(20).optional(),
  photos: z.array(z.string().url().max(500)).min(1).max(10),
  sellerPhone: z.string().min(10).max(20).optional(),
  originCountry: z.string().max(50).optional(),
}).superRefine((val, ctx) => {
  const projectId = process.env.SUPABASE_PROJECT_ID || process.env.VITE_SUPABASE_PROJECT_ID || "zgslkpvwaztjanknhcig";
  const allowedPrefix = `https://${projectId}.supabase.co/storage/v1/object/public/car-photos/`;
  val.photos.forEach((url, i) => {
    if (!url.startsWith(allowedPrefix)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["photos", i],
        message: "Photo URL must be uploaded to this site's storage.",
      });
    }
  });
});

export const createCarListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createListingSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const slug = `${data.brand}-${data.model}-${data.year}-${data.district}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      + `-${Date.now().toString(36)}`;

    const { data: listing, error } = await supabase
      .from("car_listings")
      .insert({
        seller_user_id: userId,
        brand: data.brand,
        model: data.model,
        year: data.year,
        slug,
        condition: data.condition,
        grade: data.grade || null,
        price_bdt: data.priceBdt,
        price_negotiable: data.priceNegotiable,
        engine_cc: data.engineCc || null,
        fuel_type: data.fuelType || null,
        transmission: data.transmission || "অটো",
        odometer_km: data.odometerKm || 0,
        color: data.color || null,
        color_bn: data.colorBn || null,
        district: data.district,
        description: data.description || null,
        description_bn: data.descriptionBn || null,
        features: data.features || [],
        photos: data.photos,
        seller_phone: data.sellerPhone || null,
        seller_type: "individual",
        origin_country: data.originCountry || null,
      })
      .select("slug")
      .single();

    if (error) {
      console.error("Error creating listing:", error);
      throw new Error("বিজ্ঞাপন তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }

    return { slug: listing.slug };
  });

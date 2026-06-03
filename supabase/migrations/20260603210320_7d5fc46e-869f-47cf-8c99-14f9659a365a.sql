-- Hide sensitive contact columns from normal public listing/dealer reads.
-- PostgreSQL table-level SELECT grants make every column readable, so remove them
-- and re-grant SELECT only on the non-sensitive columns used by the public UI.

REVOKE SELECT ON TABLE public.car_listings FROM anon, authenticated;

GRANT SELECT (
  listing_tier,
  id,
  seller_user_id,
  dealer_id,
  brand,
  model,
  year,
  slug,
  condition,
  price_bdt,
  price_negotiable,
  engine_cc,
  fuel_type,
  transmission,
  odometer_km,
  color,
  color_bn,
  grade,
  origin_country,
  auction_sheet_url,
  features,
  photos,
  district,
  description,
  description_bn,
  is_verified,
  is_sold,
  views_count,
  seller_type,
  expires_at,
  created_at,
  updated_at
) ON public.car_listings TO anon, authenticated;

REVOKE SELECT ON TABLE public.dealers FROM anon;

GRANT SELECT (
  district,
  updated_at,
  created_at,
  listing_limit,
  subscription_tier,
  is_verified,
  description_bn,
  description,
  website,
  email,
  id,
  owner_user_id,
  name,
  name_bn,
  slug,
  logo_url,
  address
) ON public.dealers TO anon;

-- Authenticated users can read dealer contact details, but anonymous visitors cannot.
GRANT SELECT ON TABLE public.dealers TO authenticated;

-- Ensure dealer owners cannot transfer ownership during an update.
DROP POLICY IF EXISTS "Dealer owner can update" ON public.dealers;
CREATE POLICY "Dealer owner can update"
ON public.dealers
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

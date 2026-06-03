
-- Fix car_listings: revoke column SELECT on seller_phone from anon/authenticated
REVOKE SELECT (seller_phone) ON public.car_listings FROM anon, authenticated;

-- Add WITH CHECK to UPDATE policy on car_listings to prevent ownership hijacking
DROP POLICY IF EXISTS "Users can update own listings" ON public.car_listings;
CREATE POLICY "Users can update own listings" ON public.car_listings
  FOR UPDATE TO authenticated
  USING (auth.uid() = seller_user_id)
  WITH CHECK (auth.uid() = seller_user_id);

-- Fix dealers: revoke column SELECT on phone, whatsapp, email from anon
REVOKE SELECT (phone, whatsapp, email) ON public.dealers FROM anon;

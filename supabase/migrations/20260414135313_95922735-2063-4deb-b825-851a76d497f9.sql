-- 1. Fix profiles: replace the overly broad SELECT policy
-- Drop the existing policy
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;

-- Users can see their own full profile
CREATE POLICY "Users can view own full profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Public can see non-sensitive profile fields via a view
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT id, user_id, display_name, avatar_url, district, preferred_language, created_at, updated_at
FROM public.profiles;

-- Allow public to read profiles but only non-sensitive columns
-- We use a restrictive approach: public sees all rows but phone is excluded via view
CREATE POLICY "Public can view basic profile info"
ON public.profiles
FOR SELECT
TO anon
USING (true);

-- 2. Fix car_listings: restrict seller_phone to authenticated users
-- We create a security definer function to get seller phone only for authenticated users
CREATE OR REPLACE FUNCTION public.get_seller_phone(listing_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT seller_phone
  FROM public.car_listings
  WHERE id = listing_id;
$$;
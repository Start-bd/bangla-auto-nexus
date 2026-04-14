-- Remove anon full-table access to profiles (leaks phone)
DROP POLICY IF EXISTS "Public can view basic profile info" ON public.profiles;

-- Grant SELECT on the public_profiles view to anon and authenticated
GRANT SELECT ON public.public_profiles TO anon;
GRANT SELECT ON public.public_profiles TO authenticated;
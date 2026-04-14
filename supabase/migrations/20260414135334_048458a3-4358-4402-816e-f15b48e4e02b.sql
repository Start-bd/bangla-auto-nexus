-- Fix: recreate view with SECURITY INVOKER (the safe default)
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles
WITH (security_invoker = true)
AS
SELECT id, user_id, display_name, avatar_url, district, preferred_language, created_at, updated_at
FROM public.profiles;
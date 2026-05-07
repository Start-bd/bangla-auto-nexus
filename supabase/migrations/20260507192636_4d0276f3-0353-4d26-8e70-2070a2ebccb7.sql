
-- 1. Hide seller_phone from public reads on car_listings (column-level)
REVOKE SELECT (seller_phone) ON public.car_listings FROM anon, authenticated;

-- 2. Hide dealer phone/whatsapp from anonymous users
REVOKE SELECT (phone, whatsapp) ON public.dealers FROM anon;
GRANT SELECT (phone, whatsapp) ON public.dealers TO authenticated;

-- 3. Lock down get_seller_phone: require auth + restrict EXECUTE
CREATE OR REPLACE FUNCTION public.get_seller_phone(listing_id uuid)
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN (SELECT seller_phone FROM public.car_listings WHERE id = listing_id);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_seller_phone(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_phone(uuid) TO authenticated;

-- has_role: restrict to authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- 4. Restrict public_profiles view to authenticated only
REVOKE SELECT ON public.public_profiles FROM anon;
GRANT SELECT ON public.public_profiles TO authenticated;

-- 5. Prevent self-escalation of listing tier / verification / views / seller_type / dealer_id
CREATE OR REPLACE FUNCTION public.prevent_listing_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Allow admins to bypass
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.listing_tier IS DISTINCT FROM OLD.listing_tier THEN
    NEW.listing_tier := OLD.listing_tier;
  END IF;
  IF NEW.is_verified IS DISTINCT FROM OLD.is_verified THEN
    NEW.is_verified := OLD.is_verified;
  END IF;
  IF NEW.views_count IS DISTINCT FROM OLD.views_count THEN
    NEW.views_count := OLD.views_count;
  END IF;
  IF NEW.seller_type IS DISTINCT FROM OLD.seller_type THEN
    NEW.seller_type := OLD.seller_type;
  END IF;
  IF NEW.dealer_id IS DISTINCT FROM OLD.dealer_id THEN
    NEW.dealer_id := OLD.dealer_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_listing_privilege_escalation_trg ON public.car_listings;
CREATE TRIGGER prevent_listing_privilege_escalation_trg
BEFORE UPDATE ON public.car_listings
FOR EACH ROW
EXECUTE FUNCTION public.prevent_listing_privilege_escalation();

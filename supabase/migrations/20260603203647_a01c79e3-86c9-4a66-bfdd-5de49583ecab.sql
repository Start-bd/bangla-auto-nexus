-- 1. Fix profiles UPDATE policy: add WITH CHECK
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Dealer privilege escalation trigger
CREATE OR REPLACE FUNCTION public.prevent_dealer_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  NEW.subscription_tier := OLD.subscription_tier;
  NEW.is_verified       := OLD.is_verified;
  NEW.listing_limit     := OLD.listing_limit;
  NEW.owner_user_id     := OLD.owner_user_id;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.prevent_dealer_privilege_escalation() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS prevent_dealer_privilege_escalation_trg ON public.dealers;
CREATE TRIGGER prevent_dealer_privilege_escalation_trg
BEFORE UPDATE ON public.dealers
FOR EACH ROW EXECUTE FUNCTION public.prevent_dealer_privilege_escalation();
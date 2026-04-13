
-- Enums
CREATE TYPE public.listing_condition AS ENUM ('new', 'used', 'reconditioned');
CREATE TYPE public.listing_tier AS ENUM ('free', 'premium', 'featured');
CREATE TYPE public.dealer_subscription AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  district TEXT,
  preferred_language TEXT DEFAULT 'bn',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Dealers table
CREATE TABLE public.dealers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  name_bn TEXT,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  address TEXT,
  district TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  description_bn TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  subscription_tier public.dealer_subscription NOT NULL DEFAULT 'free',
  listing_limit INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Dealers viewable by everyone" ON public.dealers FOR SELECT USING (true);
CREATE POLICY "Dealer owner can update" ON public.dealers FOR UPDATE USING (auth.uid() = owner_user_id);
CREATE TRIGGER update_dealers_updated_at BEFORE UPDATE ON public.dealers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_dealers_district ON public.dealers(district);
CREATE INDEX idx_dealers_slug ON public.dealers(slug);

-- Car listings table
CREATE TABLE public.car_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES public.dealers(id) ON DELETE SET NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  condition public.listing_condition NOT NULL DEFAULT 'used',
  price_bdt BIGINT NOT NULL,
  price_negotiable BOOLEAN NOT NULL DEFAULT false,
  engine_cc INTEGER,
  fuel_type TEXT,
  transmission TEXT DEFAULT 'অটো',
  odometer_km INTEGER DEFAULT 0,
  color TEXT,
  color_bn TEXT,
  grade TEXT,
  origin_country TEXT,
  auction_sheet_url TEXT,
  features TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  district TEXT NOT NULL,
  description TEXT,
  description_bn TEXT,
  listing_tier public.listing_tier NOT NULL DEFAULT 'free',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_sold BOOLEAN NOT NULL DEFAULT false,
  views_count INTEGER NOT NULL DEFAULT 0,
  seller_type TEXT NOT NULL DEFAULT 'individual' CHECK (seller_type IN ('individual', 'dealer')),
  seller_phone TEXT,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.car_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Listings viewable by everyone" ON public.car_listings FOR SELECT USING (true);
CREATE POLICY "Users can create own listings" ON public.car_listings FOR INSERT WITH CHECK (auth.uid() = seller_user_id);
CREATE POLICY "Users can update own listings" ON public.car_listings FOR UPDATE USING (auth.uid() = seller_user_id);
CREATE POLICY "Users can delete own listings" ON public.car_listings FOR DELETE USING (auth.uid() = seller_user_id);
CREATE TRIGGER update_car_listings_updated_at BEFORE UPDATE ON public.car_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_listings_brand ON public.car_listings(brand);
CREATE INDEX idx_listings_condition ON public.car_listings(condition);
CREATE INDEX idx_listings_district ON public.car_listings(district);
CREATE INDEX idx_listings_price ON public.car_listings(price_bdt);
CREATE INDEX idx_listings_slug ON public.car_listings(slug);
CREATE INDEX idx_listings_seller ON public.car_listings(seller_user_id);
CREATE INDEX idx_listings_dealer ON public.car_listings(dealer_id);
CREATE INDEX idx_listings_created ON public.car_listings(created_at DESC);

-- Favorites table
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.car_listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, listing_id)
);
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Security definer function for role checks (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('car-photos', 'car-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('dealer-logos', 'dealer-logos', true);

-- Storage policies: car-photos
CREATE POLICY "Car photos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'car-photos');
CREATE POLICY "Authenticated users can upload car photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'car-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own car photos" ON storage.objects FOR UPDATE USING (bucket_id = 'car-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own car photos" ON storage.objects FOR DELETE USING (bucket_id = 'car-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: dealer-logos
CREATE POLICY "Dealer logos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'dealer-logos');
CREATE POLICY "Authenticated users can upload dealer logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'dealer-logos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own dealer logos" ON storage.objects FOR UPDATE USING (bucket_id = 'dealer-logos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own dealer logos" ON storage.objects FOR DELETE USING (bucket_id = 'dealer-logos' AND auth.uid()::text = (storage.foldername(name))[1]);

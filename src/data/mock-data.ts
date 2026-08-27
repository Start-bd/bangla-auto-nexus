export interface CarListing {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  condition: "reconditioned" | "new" | "used-local";
  grade?: string;
  priceBdt: number;
  fuelType: string;
  transmission: string;
  engineCc: number;
  odometerKm: number;
  color_bn: string;
  color_en: string;
  district: string;
  photos: string[];
  sellerType: "dealer" | "private";
  dealerName?: string;
  isVerified: boolean;
  listingTier: "free" | "premium" | "featured";
  daysAgo: number;
  features: string[];
  priceNegotiable: boolean;
}

export interface Dealer {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  district: string;
  ratingAvg: number;
  ratingCount: number;
  activeListingCount: number;
  isVerified: boolean;
  specialties: string[];
  yearsInBusiness: number;
}

export const CAR_BRANDS = [
  { name: "Toyota", name_bn: "টয়োটা", flag: "🇯🇵", count: 845 },
  { name: "Honda", name_bn: "হন্ডা", flag: "🇯🇵", count: 623 },
  { name: "Suzuki", name_bn: "সুজুকি", flag: "🇯🇵", count: 412 },
  { name: "Nissan", name_bn: "নিসান", flag: "🇯🇵", count: 298 },
  { name: "Mitsubishi", name_bn: "মিতসুবিশি", flag: "🇯🇵", count: 187 },
  { name: "Hyundai", name_bn: "হুন্দাই", flag: "🇰🇷", count: 156 },
  { name: "Kia", name_bn: "কিয়া", flag: "🇰🇷", count: 98 },
  { name: "BMW", name_bn: "বিএমডব্লিউ", flag: "🇩🇪", count: 67 },
  { name: "Mercedes", name_bn: "মার্সিডিজ", flag: "🇩🇪", count: 54 },
  { name: "Audi", name_bn: "আউডি", flag: "🇩🇪", count: 34 },
  { name: "Volkswagen", name_bn: "ফক্সওয়াগন", flag: "🇩🇪", count: 23 },
];

export const POPULAR_SEARCHES = [
  "Toyota Aqua", "Honda Vezel", "Suzuki Swift", "Toyota Axio",
  "Honda Fit", "Nissan Note", "Toyota Prius", "Mitsubishi Outlander",
];

export const PRICE_RANGES = [
  { label_bn: "৳৫-১০ লাখ", min: 500000, max: 1000000, count: 342 },
  { label_bn: "৳১০-১৫ লাখ", min: 1000000, max: 1500000, count: 567 },
  { label_bn: "৳১৫-২০ লাখ", min: 1500000, max: 2000000, count: 423 },
  { label_bn: "৳২০-৩০ লাখ", min: 2000000, max: 3000000, count: 298 },
  { label_bn: "৳৩০-৫০ লাখ", min: 3000000, max: 5000000, count: 156 },
  { label_bn: "৳৫০ লাখ+", min: 5000000, max: 99999999, count: 45 },
];

export const BD_DISTRICTS = [
  "ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা",
  "বরিশাল", "রংপুর", "ময়মনসিংহ", "গাজীপুর", "নারায়ণগঞ্জ",
  "কুমিল্লা", "কক্সবাজার",
];

const STORAGE_BASE = "https://zgslkpvwaztjanknhcig.supabase.co/storage/v1/object/public/car-photos";

const carPhotos: Record<string, string[]> = {
  "toyota-aqua": [`${STORAGE_BASE}/toyota-aqua-white.jpg`],
  "honda-vezel": [`${STORAGE_BASE}/honda-vezel-black.jpg`],
  "suzuki-swift": [`${STORAGE_BASE}/suzuki-swift-red.jpg`],
  "toyota-axio": [`${STORAGE_BASE}/toyota-axio-silver.jpg`],
  "honda-fit": [`${STORAGE_BASE}/honda-fit-blue.jpg`],
  "nissan-note": [`${STORAGE_BASE}/nissan-note-white.jpg`],
  "toyota-prius": [`${STORAGE_BASE}/toyota-prius-white.jpg`],
  "bmw-3series": [`${STORAGE_BASE}/bmw-3series-black.jpg`],
  "honda-grace": [`${STORAGE_BASE}/honda-grace-white.jpg`],
  "mitsubishi-outlander": [`${STORAGE_BASE}/mitsubishi-outlander-white.jpg`],
};

const defaultPhotos = [`${STORAGE_BASE}/toyota-aqua-white.jpg`];

export const MOCK_LISTINGS: CarListing[] = [
  {
    id: "1", slug: "toyota-aqua-2022-dhaka",
    brand: "Toyota", model: "Aqua", year: 2022, condition: "reconditioned",
    grade: "4.5", priceBdt: 2250000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 1500, odometerKm: 23000, color_bn: "সাদা", color_en: "White",
    district: "ঢাকা", photos: carPhotos["toyota-aqua"], sellerType: "dealer",
    dealerName: "ট্রাস্টেড মোটরস", isVerified: true, listingTier: "featured",
    daysAgo: 1, features: ["AC", "ABS", "Airbags", "Push Start", "Reverse Camera"],
    priceNegotiable: true,
  },
  {
    id: "2", slug: "honda-vezel-2021-chittagong",
    brand: "Honda", model: "Vezel", year: 2021, condition: "reconditioned",
    grade: "5", priceBdt: 3200000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 1500, odometerKm: 18000, color_bn: "কালো", color_en: "Black",
    district: "চট্টগ্রাম", photos: carPhotos["honda-vezel"], sellerType: "dealer",
    dealerName: "প্রিমিয়াম কার জোন", isVerified: true, listingTier: "featured",
    daysAgo: 2, features: ["AC", "ABS", "Airbags", "Sunroof", "Leather Seats"],
    priceNegotiable: false,
  },
  {
    id: "3", slug: "suzuki-swift-2020-dhaka",
    brand: "Suzuki", model: "Swift", year: 2020, condition: "reconditioned",
    grade: "4", priceBdt: 1350000, fuelType: "পেট্রোল", transmission: "অটো",
    engineCc: 1200, odometerKm: 35000, color_bn: "লাল", color_en: "Red",
    district: "ঢাকা", photos: carPhotos["suzuki-swift"], sellerType: "private",
    isVerified: false, listingTier: "premium",
    daysAgo: 3, features: ["AC", "ABS", "Push Start"],
    priceNegotiable: true,
  },
  {
    id: "4", slug: "toyota-axio-2019-sylhet",
    brand: "Toyota", model: "Axio", year: 2019, condition: "reconditioned",
    grade: "4.5", priceBdt: 1650000, fuelType: "পেট্রোল", transmission: "অটো",
    engineCc: 1500, odometerKm: 42000, color_bn: "সিলভার", color_en: "Silver",
    district: "সিলেট", photos: carPhotos["toyota-axio"], sellerType: "dealer",
    dealerName: "সিলেট অটো হাউজ", isVerified: true, listingTier: "featured",
    daysAgo: 1, features: ["AC", "ABS", "Airbags", "Alloy Wheels"],
    priceNegotiable: true,
  },
  {
    id: "5", slug: "honda-fit-2020-dhaka",
    brand: "Honda", model: "Fit", year: 2020, condition: "reconditioned",
    grade: "4.5", priceBdt: 1550000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 1500, odometerKm: 28000, color_bn: "নীল", color_en: "Blue",
    district: "ঢাকা", photos: carPhotos["honda-fit"], sellerType: "dealer",
    dealerName: "ট্রাস্টেড মোটরস", isVerified: true, listingTier: "premium",
    daysAgo: 4, features: ["AC", "ABS", "Airbags", "Reverse Camera"],
    priceNegotiable: false,
  },
  {
    id: "6", slug: "nissan-note-2019-gazipur",
    brand: "Nissan", model: "Note", year: 2019, condition: "reconditioned",
    grade: "4", priceBdt: 1250000, fuelType: "পেট্রোল", transmission: "অটো",
    engineCc: 1200, odometerKm: 45000, color_bn: "সাদা", color_en: "White",
    district: "গাজীপুর", photos: carPhotos["nissan-note"], sellerType: "private",
    isVerified: false, listingTier: "free",
    daysAgo: 5, features: ["AC", "ABS"],
    priceNegotiable: true,
  },
  {
    id: "7", slug: "toyota-prius-2018-dhaka",
    brand: "Toyota", model: "Prius", year: 2018, condition: "reconditioned",
    grade: "4.5", priceBdt: 2500000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 1800, odometerKm: 50000, color_bn: "সাদা", color_en: "White",
    district: "ঢাকা", photos: carPhotos["toyota-prius"], sellerType: "dealer",
    dealerName: "ঢাকা অটো ওয়ার্ল্ড", isVerified: true, listingTier: "featured",
    daysAgo: 2, features: ["AC", "ABS", "Airbags", "Push Start", "Sunroof"],
    priceNegotiable: true,
  },
  {
    id: "8", slug: "bmw-3-series-2017-dhaka",
    brand: "BMW", model: "3 Series", year: 2017, condition: "reconditioned",
    grade: "4", priceBdt: 5500000, fuelType: "পেট্রোল", transmission: "অটো",
    engineCc: 2000, odometerKm: 55000, color_bn: "কালো", color_en: "Black",
    district: "ঢাকা", photos: carPhotos["bmw-3series"], sellerType: "dealer",
    dealerName: "লাক্সারি কারস বিডি", isVerified: true, listingTier: "featured",
    daysAgo: 3, features: ["AC", "ABS", "Airbags", "Sunroof", "Leather Seats", "Navigation"],
    priceNegotiable: true,
  },
  {
    id: "9", slug: "toyota-aqua-2019-chittagong",
    brand: "Toyota", model: "Aqua", year: 2019, condition: "reconditioned",
    grade: "4", priceBdt: 1800000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 1500, odometerKm: 40000, color_bn: "সাদা", color_en: "White",
    district: "চট্টগ্রাম", photos: carPhotos["toyota-aqua"], sellerType: "private",
    isVerified: false, listingTier: "free",
    daysAgo: 6, features: ["AC", "ABS", "Airbags"],
    priceNegotiable: true,
  },
  {
    id: "10", slug: "honda-grace-2019-dhaka",
    brand: "Honda", model: "Grace", year: 2019, condition: "reconditioned",
    grade: "4.5", priceBdt: 1900000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 1500, odometerKm: 32000, color_bn: "সাদা", color_en: "White",
    district: "ঢাকা", photos: carPhotos["honda-grace"], sellerType: "dealer",
    dealerName: "ট্রাস্টেড মোটরস", isVerified: true, listingTier: "premium",
    daysAgo: 2, features: ["AC", "ABS", "Airbags", "Push Start", "Alloy Wheels"],
    priceNegotiable: false,
  },
  {
    id: "11", slug: "mitsubishi-outlander-2020-dhaka",
    brand: "Mitsubishi", model: "Outlander", year: 2020, condition: "reconditioned",
    grade: "4.5", priceBdt: 3800000, fuelType: "হাইব্রিড", transmission: "অটো",
    engineCc: 2400, odometerKm: 25000, color_bn: "সাদা", color_en: "White",
    district: "ঢাকা", photos: carPhotos["mitsubishi-outlander"], sellerType: "dealer",
    dealerName: "ঢাকা অটো ওয়ার্ল্ড", isVerified: true, listingTier: "featured",
    daysAgo: 1, features: ["AC", "ABS", "Airbags", "4WD", "Sunroof", "7-Seater"],
    priceNegotiable: true,
  },
  {
    id: "12", slug: "suzuki-swift-2021-rajshahi",
    brand: "Suzuki", model: "Swift", year: 2021, condition: "reconditioned",
    grade: "5", priceBdt: 1500000, fuelType: "পেট্রোল", transmission: "অটো",
    engineCc: 1200, odometerKm: 15000, color_bn: "লাল", color_en: "Red",
    district: "রাজশাহী", photos: carPhotos["suzuki-swift"], sellerType: "private",
    isVerified: false, listingTier: "free",
    daysAgo: 7, features: ["AC", "ABS", "Push Start"],
    priceNegotiable: true,
  },
];

export const MOCK_DEALERS: Dealer[] = [
  {
    id: "d1", slug: "trusted-motors", name_bn: "ট্রাস্টেড মোটরস", name_en: "Trusted Motors",
    district: "ঢাকা", ratingAvg: 4.8, ratingCount: 234, activeListingCount: 45,
    isVerified: true, specialties: ["Toyota", "Honda"], yearsInBusiness: 12,
  },
  {
    id: "d2", slug: "premium-car-zone", name_bn: "প্রিমিয়াম কার জোন", name_en: "Premium Car Zone",
    district: "চট্টগ্রাম", ratingAvg: 4.6, ratingCount: 167, activeListingCount: 32,
    isVerified: true, specialties: ["Honda", "Suzuki"], yearsInBusiness: 8,
  },
  {
    id: "d3", slug: "sylhet-auto-house", name_bn: "সিলেট অটো হাউজ", name_en: "Sylhet Auto House",
    district: "সিলেট", ratingAvg: 4.5, ratingCount: 89, activeListingCount: 18,
    isVerified: true, specialties: ["Toyota", "Nissan"], yearsInBusiness: 6,
  },
  {
    id: "d4", slug: "dhaka-auto-world", name_bn: "ঢাকা অটো ওয়ার্ল্ড", name_en: "Dhaka Auto World",
    district: "ঢাকা", ratingAvg: 4.7, ratingCount: 312, activeListingCount: 67,
    isVerified: true, specialties: ["Multi-brand", "Luxury"], yearsInBusiness: 15,
  },
  {
    id: "d5", slug: "luxury-cars-bd", name_bn: "লাক্সারি কারস বিডি", name_en: "Luxury Cars BD",
    district: "ঢাকা", ratingAvg: 4.9, ratingCount: 78, activeListingCount: 12,
    isVerified: true, specialties: ["BMW", "Mercedes", "Audi"], yearsInBusiness: 5,
  },
];

export function formatPriceBDT(price: number): string {
  if (price >= 10000000) {
    return `৳ ${(price / 10000000).toFixed(2)} কোটি`;
  }
  if (price >= 100000) {
    return `৳ ${(price / 100000).toFixed(2)} লাখ`;
  }
  return `৳ ${price.toLocaleString("bn-BD")}`;
}

export function formatPriceRaw(price: number): string {
  return `৳ ${price.toLocaleString("en-IN")}`;
}

export function getConditionLabel(condition: string): { label: string; color: string } {
  switch (condition) {
    case "reconditioned": return { label: "রিকন্ডিশন্ড", color: "racing-red" };
    case "new": return { label: "ব্র্যান্ড নিউ", color: "bd-green" };
    case "used":
    case "used-local": return { label: "ব্যবহৃত", color: "gold" };
    default: return { label: condition, color: "muted" };
  }
}

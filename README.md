# Bangla Auto Hub

Build Bangladesh's most premium automotive platform called Bangla Autos — the definitive Bengali-language destination for car listings, reviews, buying guides, price comparisons, and automotive news. Production-ready web app using React, Tailwind CSS, Supabase, and Stripe. Fully bilingual: Bengali primary, English secondary. Four revenue streams: (1) car listing fees from dealers and private sellers, (2) premium dealer subscriptions, (3) featured listing placements, (4) affiliate commissions from car insurance and finance. Target users: Bangladeshi car buyers, sellers, dealers, and enthusiasts.

— THE BANGLADESH CAR MARKET OPPORTUNITY —

Bangladesh imports 40,000+ reconditioned Japanese cars annually (Toyota, Honda, Nissan, Suzuki are dominant). The used/reconditioned car market is worth $2B+ yearly. Every car buyer currently uses:
- Facebook groups (unorganized, unsafe, no price transparency)
- Bikroy.com (general classifieds — not automotive-specific)
- Old English sites (inaccessible to most Bangladeshi buyers)

Bangla Autos fills this gap with:
- Professional Bengali-language car listings with detailed specs
- AI-powered car valuation tool
- Trusted dealer verification system
- Reconditioned car import guide (unique to BD market)
- Car insurance and finance affiliate integrations

Bangladesh-specific context critical for this platform:
- Reconditioned (রিকন্ডিশন্ড) Japanese cars dominate the market (not new)
- "Grade" system (4, 4.5, 5) matters enormously to BD buyers
- CC (engine displacement) determines import tax and registration cost
- Dhaka, Chittagong, Sylhet are primary car markets
- bKash/Nagad payment is essential for BD transactions
- CNG (compressed natural gas) conversion is very common
- Brand-new car prices are extremely high due to import taxes

— BRAND & DESIGN —

Name: Bangla Autos / বাংলা অটোস
Domain: bangla.autos
Tagline: "বাংলাদেশের সেরা গাড়ির বাজার।"
English tagline: "Bangladesh's Premier Car Marketplace."
Sub-tagline: "গাড়ি কিনুন, বেচুন, রিভিউ পড়ুন — সম্পূর্ণ বাংলায়।"
(Buy, sell, read reviews — completely in Bengali.)

Aesthetic: Bold, trustworthy, high-energy automotive. This is where serious money changes hands — a Toyota Aqua costs ৳18–25 lakh in Bangladesh. The design must inspire trust while matching the energy of a premium car showroom. Background: deep charcoal black (#0F0F12). Primary accent: racing red (#DC2626) — automotive energy, speed, Bangladesh flag echo. Secondary: Bangladesh green (#16A34A) — trust, verified, national identity. Surface cards: #181820. Borders: #2A2A35. Text: clean white (#F8FAFC). Gold highlights: (#F59E0B) for premium/featured content.

Think: AutoTrader meets CarDekho — professional marketplace energy with South Asian warmth. NOT a dark-mode tech startup. This is a car showroom gone digital.

HERO BACKGROUND TREATMENT:
Very subtle carbon fiber texture CSS pattern (repeating diagonal lines at 3% opacity) — the material of premium car interiors. Creates automotive atmosphere without images.

Typography:
- Display: "Barlow Condensed" for hero headings, car specs, price displays — bold, condensed, speed-forward (Google Fonts: 600, 700, 800)
- Bengali: "Hind Siliguri" for all Bengali text (Google Fonts: 400, 500, 600, 700)
- Body: "Nunito Sans" for English body, UI labels, metadata (Google Fonts: 400, 500, 600)
- Numbers/Price: "Barlow" for all prices, specs, odometer readings — clean and readable

Logo: Stylized speedometer arc (CSS — simple semicircle with needle) in red + "বাংলা" in Hind Siliguri 700 white + "AUTOS" in Barlow Condensed 800 red + ".autos" in Nunito Sans muted. The speedometer icon is the brand signature.

Color coding by car category:
🔴 রিকন্ডিশন্ড (Reconditioned) — red
🟢 ব্র্যান্ড নিউ (Brand New) — green
🟡 ব্যবহৃত (Used Local) — amber
🔵 ইলেকট্রিক (Electric/Hybrid) — blue

Motion: Car listing cards — photo slides left on hover (next photo preview). Price display — count-up animation on hero stats. Search results — slide in from left with 80ms stagger. Featured badge — subtle shine sweep animation. Filter pills — smooth color fill transition. Image gallery — smooth swipe with momentum. Map view — pins drop in with bounce.

— PLATFORM ARCHITECTURE — 5 PILLARS —

PILLAR 1 — গাড়ির বাজার (Car Marketplace)
Buy and sell cars — listings from dealers and private sellers

PILLAR 2 — AI গাড়ির মূল্য (AI Car Valuation)
Enter any car's details → AI estimates fair market price in Bangladesh

PILLAR 3 — গাড়ির রিভিউ (Car Reviews)
Bengali car reviews — reconditioned cars, brand new models, road tests

PILLAR 4 — গাড়ি কেনার গাইড (Buying Guides)
How to buy reconditioned cars, import process, tax guide, inspection tips

PILLAR 5 — অটো নিউজ (Auto News)
Bangladesh automotive news — new models, import regulations, fuel prices

— PAGES & ROUTES —

Public:
1. / — Homepage
2. /cars — Full listings marketplace
3. /cars/:slug — Individual car listing detail
4. /new-cars — Brand new car showroom
5. /new-cars/:brand/:model — New car model page
6. /reconditioned — Reconditioned car guide + listings
7. /reconditioned/grade-guide — The Grade 4/4.5/5 explanation guide
8. /dealers — Verified dealer directory
9. /dealers/:slug — Individual dealer profile
10. /reviews — Car reviews index
11. /reviews/:slug — Individual review
12. /compare — Car comparison tool
13. /compare/:car1-vs-:car2 — Side-by-side comparison
14. /valuation — AI car valuation tool
15. /guides — Buying guide index
16. /guides/:slug — Individual guide
17. /news — Automotive news
18. /news/:slug — Article
19. /insurance — Car insurance comparison (affiliate)
20. /finance — Car loan comparison (affiliate)
21. /sell — Sell your car (listing submission)
22. /pricing — Dealer subscription plans
23. /auth/login + /auth/signup

Seller/Dealer dashboard (auth):
24. /dashboard — My listings + analytics
25. /dashboard/listings — Manage my car listings
26. /dashboard/listings/new — Post new listing
27. /dashboard/listings/:id/edit — Edit listing
28. /settings/billing — Subscription management

Admin:
29. /admin — Listing moderation, dealer verification, analytics

— HOMEPAGE (/) —

Full-width dark hero with carbon fiber texture:

NAVBAR (dark, sticky):
Left: Bangla Autos logo (speedometer + wordmark)
Center (desktop): গাড়ির বাজার · নতুন গাড়ি · রিকন্ডিশন্ড · রিভিউ · গাইড · খবর
Right: Language [বাং | EN] + [গাড়ি বিক্রি করুন] red CTA + [লগইন]
Thin red bottom border on navbar
Mobile: hamburger → full-screen dark overlay

HERO (full viewport):
Top badge: "🇧🇩 বাংলাদেশের নম্বর ১ গাড়ির প্ল্যাটফর্ম"
Headline: "আপনার স্বপ্নের গাড়ি" (Hind Siliguri 800, 56px, white)
Line 2: "এখানেই পাবেন।" (same size, red gradient)
English sub: "Bangladesh's most trusted car marketplace — buy, sell, and research in Bengali."

HERO SEARCH (the conversion engine — most prominent element):

Tab selector: 🔍 গাড়ি কিনুন (Buy) · 📝 গাড়ি বিক্রি করুন (Sell) · 💰 মূল্য জানুন (Valuation)

BUY tab (default):
Row 1: [গাড়ির ধরন ▾] (Car Type) · [ব্র্যান্ড ▾] (Brand) · [মডেল ▾] (Model)
Row 2: [বাজেট থেকে ▾] (Budget from) · [বাজেট পর্যন্ত ▾] (Budget to) · [জেলা ▾] (District)
[গাড়ি খুঁজুন 🔍] red button, full-width on mobile

SELL tab:
Quick estimate: "আপনার গাড়ির ব্র্যান্ড ও মডেল লিখুন" → [দাম জানুন] → routes to /valuation

VALUATION tab:
Brand + Model + Year + Condition → [AI মূল্য জানুন]

LIVE MARKET STATS (below search, 4 cards count-up):
"[X,XXX]+ গাড়ি" · "[X]+ যাচাইকৃত ডিলার" · "[X]+ জেলা" · "আজকেই [X]টি নতুন গাড়ি"

POPULAR SEARCHES (chip pills below stats):
Toyota Aqua · Honda Vezel · Suzuki Swift · Toyota Axio · Honda Fit · Nissan Note · Toyota Prius · Mitsubishi Outlander

FEATURED LISTINGS (the main homepage content):
Section: "বিশেষ বিজ্ঞাপন" / "Featured Listings" — amber border cards (paid placement)
6 car cards in 3-col grid (desktop) / 2-col (tablet) / 1-col (mobile) — gold shimmer border

STANDARD LISTINGS GRID (below featured):
"সদ্য যোগ হওয়া গাড়ি" / "Recently Added"
12 car cards, 3-col / 2-col / 1-col
[আরও দেখুন →] / [View All →] button

BRAND DIRECTORY (horizontal scroll, clickable logos):
"ব্র্যান্ড অনুযায়ী খুঁজুন" / "Browse by Brand"
Toyota 🇯🇵 · Honda · Suzuki · Nissan · Mitsubishi · Hyundai · Kia · BMW · Mercedes · Audi · Volkswagen
Each: brand name in Bengali + car count badge
Click → /cars?brand=[name]

RECONDITIONED GUIDE PROMO (full-width, red background):
"রিকন্ডিশন্ড গাড়ি কিনছেন? প্রথমে এটা পড়ুন।"
"গ্রেড ৪ বনাম গ্রেড ৫: পার্থক্য কী? ঠকবেন না।"
[গাইড পড়ুন →] white CTA button

PRICE RANGE BROWSE (6 budget cards):
৳৫-১০ লাখ · ৳১০-১৫ লাখ · ৳১৫-২০ লাখ · ৳২০-৩০ লাখ · ৳৩০-৫০ লাখ · ৳৫০ লাখ+
Each: car silhouette CSS illustration + price range + listing count

LATEST REVIEWS (3 cards, editorial):
Bengali car review cards — photo + car name + Bengali headline + star rating + [পড়ুন →]

SELL YOUR CAR CTA (full-width, dark surface, red accent):
"আপনার গাড়ি বিক্রি করতে চান?"
"বিনামূল্যে বিজ্ঞাপন দিন — ১০ লক্ষ+ ক্রেতার কাছে পৌঁছান"
[এখনই বিজ্ঞাপন দিন →] red CTA

— CAR LISTING CARD (the core UI component) —

Every car listing displays as a card:

CARD ANATOMY:
Top: photo carousel (3 photos visible, swipeable) + photo count badge + condition badge (রিকন্ডিশন্ড/নতুন/ব্যবহৃত — colored)
"FEATURED" amber banner (if paid placement)
"যাচাইকৃত ডিলার ✓" (Verified Dealer) green badge on dealer listings

CAR DETAILS:
Brand + Model (Barlow Condensed 700, 18px, white): "Toyota Aqua"
Year + Grade (for reconditioned): "২০১৯ · গ্রেড ৪.৫"
Price: (Barlow 700, 22px, red): "৳ ১৮,৫০,০০০"
Price/month (if financing available): "বা মাসিক ৳ ২২,০০০ থেকে"

KEY SPECS ROW (icons + values):
⚡ CC: ১৫০০ সিসি · ⛽ জ্বালানি: পেট্রোল/হাইব্রিড · 📏 কিলোমিটার: ৪৫,০০০ · 🎨 রঙ: সাদা

SELLER INFO:
Dealer name (if dealer) OR "ব্যক্তিগত বিক্রেতা" (Private Seller) + district + member since
Rating: ★ [X.X] + review count (for verified dealers)

BOTTOM ROW:
[📞 কল করুন] red button · [💬 WhatsApp] green button · [♥ সেভ করুন] ghost
"X দিন আগে যোগ হয়েছে" — time posted, muted

HOVER: first photo slides to second photo (CSS transition) + cards lifts 3px

— CAR LISTING DETAIL PAGE (/cars/:slug) —

Full-page car detail — where buyers decide:

PHOTO GALLERY:
Large main photo (left, 60%) with thumbnail strip below
Navigation arrows + photo count "৫/১২"
Fullscreen lightbox on click
"🔍 বিস্তারিত ছবি দেখুন" below gallery

QUICK ACTION BAR (sticky top on mobile):
"৳ ১৮,৫০,০০০" (large, red) + [📞 কল করুন] + [💬 WhatsApp] + [♥]

CAR OVERVIEW (right sidebar desktop / below gallery mobile):
Car title (large, Bengali): "টয়োটা অ্যাকোয়া ২০১৯ রিকন্ডিশন্ড"
Listing ID: #BD-12345 (for reference)
Condition badge + Grade badge (if reconditioned) + Verified badge

PRICE SECTION:
Main price (red, large): ৳ ১৮,৫০,০০০
"দরদাম করা যাবে" (Negotiable) tag if applicable
[EMI Calculator] toggle → shows monthly payment estimator (client-side math)

CONTACT SELLER CARD:
Seller avatar (initial) + name + district + response rate + "সাধারণত ২ ঘন্টায় রিপ্লাই দেন"
[📞 ফোন নম্বর দেখুন] — reveal on click (prevents scraping)
[💬 WhatsApp এ মেসেজ করুন] — opens WhatsApp with pre-filled message
[📧 ইমেইল করুন] — for dealers
[🚗 টেস্ট ড্রাইভ বুক করুন] — (future feature — placeholder for MVP)

FULL SPECIFICATIONS (accordion sections):
Basic Info: ব্র্যান্ড · মডেল · বছর · রঙ · জেলা
Engine: সিসি · জ্বালানির ধরন · ট্রান্সমিশন · ড্রাইভ ধরন
Condition: কিলোমিটার · রিকন্ডিশন গ্রেড · আমদানির বছর · চেসিস নম্বর (optional)
Features: AC · ABS · Airbags · Reverse Camera · Sunroof · Push Start (checkbox display)
Documentation: Registration · Tax Token · Fitness · Insurance validity

RECONDITIONED CAR SECTION (if applicable):
Grade explanation: "গ্রেড ৪.৫ মানে কি?" with brief tooltip
Auction sheet info (if provided)
Import year + chassis verification note

SELLER'S OTHER LISTINGS:
"এই ডিলারের আরও গাড়ি দেখুন" — 4 compact listing cards

SIMILAR CARS:
"একই বাজেটে অন্য গাড়ি" — 6 cards, same price range

REPORT LISTING:
Small "এই বিজ্ঞাপন রিপোর্ট করুন" link at bottom

— SELL YOUR CAR (/sell) —

Multi-step listing wizard (4 steps):

Step 1 — Car Details:
Car type: রিকন্ডিশন্ড · নতুন · ব্যবহৃত লোকাল
Brand (dropdown: Toyota, Honda, Suzuki, Nissan, Mitsubishi, Hyundai, Kia, BMW, Mercedes, Other) *
Model (dynamic based on brand) *
Year * (1990–2026)
Variant/Trim (text)
Color *
For Reconditioned: Grade (4/4.5/5) · Import year · Chassis number

Step 2 — Condition & Specs:
Odometer reading (KM) *
Fuel type: Petrol / Diesel / Hybrid / Electric / CNG-converted
Transmission: Auto / Manual
Drive: 2WD / 4WD / AWD
Engine CC *
Features checklist (30 features: AC, ABS, Airbags, Sunroof, etc.)
Accident history: Yes / No
Flood damage: No (required declaration)
Modification: CNG converted? Yes / No

Step 3 — Price & Location:
Asking price (BDT) *
Price negotiable toggle
EMI available toggle (dealer only)
District * (64 districts dropdown)
City/Area
Available for test drive: Yes / No
Best time to contact: Morning / Afternoon / Evening

Step 4 — Photos & Contact:
Upload up to 20 photos (Supabase Storage)
Required: exterior front + exterior rear + interior + odometer
Description in Bengali (textarea, max 500 chars)
Seller type: ব্যক্তিগত (Private) / ডিলার (Dealer)
Phone number (BD format: 01X-XXXXXXXX) *
WhatsApp same as phone? (toggle)

Listing package selection:
FREE: 30-day listing, 5 photos, standard placement
PREMIUM — ৳299: 60-day listing, 20 photos, featured badge, top of search results
FEATURED — ৳599: 90-day listing, homepage featured section, WhatsApp button highlighted

Payment: Stripe + TODO comment for bKash/Nagad
Success: "আপনার গাড়ির বিজ্ঞাপন প্রকাশিত হয়েছে! 🎉 আমরা ২৪ ঘন্টার মধ্যে যাচাই করব।"
Insert to Supabase listings table with status='pending'

— AI CAR VALUATION (/valuation) —

The most powerful free tool — drives massive organic traffic:

Step 1 — Enter Car Details:
Brand + Model + Year + Condition (reconditioned/used/new)
Grade (if reconditioned): 4 / 4.5 / 5
Odometer reading (KM)
District (affects local market price)
Color (some colors sell for more in BD)
Key features present (checkboxes)

[AI দিয়ে মূল্য জানুন 🔍] red button, large

Claude API via Supabase Edge Function "car-valuation":
System prompt: "You are an expert Bangladesh automotive market analyst. Given the following car details, estimate the fair market value in Bangladesh Taka (BDT). Consider: (1) Current Bangladesh reconditioned car import market, (2) Local used car market conditions, (3) The grade system for reconditioned Japanese cars (Grade 4 = good, 4.5 = very good, 5 = excellent), (4) District/location premium (Dhaka commands 5-10% premium), (5) Color premium/discount (white/silver most popular in BD, unusual colors discounted), (6) Mileage depreciation for BD market, (7) Annual depreciation rates by brand in Bangladesh. Return JSON: {estimated_price_min, estimated_price_max, fair_price, confidence_level (high/medium/low), price_factors [{factor, impact_bdt, explanation_bn}], market_notes_bn, tips_for_seller_bn, tips_for_buyer_bn}"

Valuation Result Display:
Price range: "৳ ১৬,০০,০০০ — ৳ ১৯,৫০,০০০" (Barlow 700, 32px, red)
Fair price: "উপযুক্ত মূল্য: ৳ ১৭,৫০,০০০" (green)
Confidence: "উচ্চ আস্থা" / "মাঝারি আস্থা" badge

Price Factors (breakdown cards):
Each factor: name + impact amount (+ or -) + Bengali explanation
"গ্রেড ৪.৫: +৳৮০,০০০ (উন্নত মান)"
"৪৫,০০০ কিমি মাইলেজ: -৳৩০,০০০ (গড় ব্যবহার)"
"ঢাকায় অবস্থান: +৳৫০,০০০ (বাজারে চাহিদা বেশি)"

Market notes in Bengali (AI-generated)
Tips for seller + tips for buyer (Bengali)

CTA below result:
[এই গাড়ি বিক্রি করুন →] + [একই মূল্যের গাড়ি দেখুন →]

Limit: 5 free valuations per day per IP (localStorage + server-side check)
"আরও মূল্য জানতে লগইন করুন" after 5 uses

— CAR COMPARISON (/compare/:car1-vs-:car2) —

SEO powerhouse:

Side-by-side comparison of any two car models:
Example: /compare/toyota-aqua-vs-honda-fit

Two columns: Car 1 vs Car 2
Rows: Price range · Engine CC · Fuel type · Transmission · Dimensions · Boot space · Fuel efficiency · Safety rating · Maintenance cost estimate · BD market availability

Color coding: green cell = better, red = worse, gray = equal
"কোনটি কিনবেন?" (Which to buy?) — AI summary section (Claude API)

Pre-built popular comparisons:
Toyota Aqua vs Honda Fit
Toyota Axio vs Honda Grace
Suzuki Swift vs Toyota Vitz
Toyota Prius vs Honda Vezel
Toyota Aqua vs Nissan Note

Each comparison page = standalone SEO page targeting "Toyota Aqua vs Honda Fit Bangladesh" searches

— RECONDITIONED CAR GUIDE (/reconditioned) —

The most unique content on the platform — nothing like this exists in Bengali:

HERO:
"রিকন্ডিশন্ড গাড়ি কেনার সম্পূর্ণ গাইড"
"বাংলাদেশে ৭০%+ গাড়ি রিকন্ডিশন্ড। কীভাবে ঠকবেন না?"

GRADE GUIDE (/reconditioned/grade-guide) — Most important page:
Complete explanation of Japanese auction grade system in Bengali:
Grade 3: গ্রহণযোগ্য · Grade 4: ভালো · Grade 4.5: খুব ভালো · Grade 5: চমৎকার · Grade R: দুর্ঘটনাগ্রস্ত মেরামত · Grade RA: দুর্ঘটনায় মেরামত (বড়)
Visual grade cards with color coding
"কোন গ্রেড কেনা উচিত?" recommendation section

Import Process Guide:
10 steps from Japan auction to BD roads — in Bengali
Cost breakdown: CIF + Duty + Registration

Auction Sheet Reading Guide:
How to read a Japanese auction sheet — Bengali explanation
Common terms decoded

Inspection Checklist:
What to check before buying a reconditioned car (downloadable PDF)

— DEALER DIRECTORY (/dealers) —

Verified dealer profiles:

Dealer card:
Dealer name (Bengali + English) + district + years in business
Verified badge (green ✓) + rating + review count
Specialties: Toyota specialist / Multi-brand / Luxury cars
Stock count: "[X] টি গাড়ি আছে"
[ডিলার প্রোফাইল দেখুন →]

DEALER PROFILE PAGE (/dealers/:slug):
Cover photo + logo + name + verification badge
About: Bengali description
Contact: address + phone + WhatsApp + Facebook page
Working hours
Specialties + brands carried
Rating breakdown
All active listings from this dealer
Customer reviews

DEALER SUBSCRIPTION (the primary B2B revenue):
Basic — ৳2,000/month:
Up to 20 listings
Basic profile page
Standard search placement

Professional — ৳5,000/month:
Unlimited listings
Enhanced profile with cover photo
Priority search placement
"যাচাইকৃত ডিলার" verified badge
Analytics dashboard
WhatsApp button on all listings

Elite — ৳10,000/month:
Everything in Pro
Homepage featured rotation (1 week/month)
Dedicated account manager call
Marketing support (social media post template)
Custom vanity URL: bangla.autos/dealers/[dealer-name]

— INSURANCE & FINANCE AFFILIATE (/insurance, /finance) —

Pure affiliate revenue — zero operational overhead:

INSURANCE PAGE:
"গাড়ির বীমা তুলনা" — compare Pragati Insurance, Reliance Insurance, Green Delta, etc.
Simple form: car value + type → shows premium estimates
Affiliate links to insurance companies' BD portals
Commission: 5-15% of first year premium

FINANCE/LOAN PAGE:
"গাড়ি কেনার ঋণ" — car loan comparison
Partner banks: BRAC Bank, Dutch-Bangla, City Bank, Islami Bank
Loan calculator (client-side): amount + term → monthly payment
Affiliate commission: flat fee per qualified lead

— SUPABASE SCHEMA —

Table: car_listings
- id (uuid, pk)
- slug (text, unique)
- seller_id (uuid, references profiles.id)
- seller_type (text: private/dealer)
- dealer_id (uuid, nullable, references dealers.id)
- condition (text: reconditioned/new/used-local)
- brand (text)
- model (text)
- variant (text, nullable)
- year (integer)
- color_bn, color_en (text)
- price_bdt (bigint) — in taka
- price_negotiable (boolean, default false)
- fuel_type (text: petrol/diesel/hybrid/electric/cng)
- transmission (text: auto/manual)
- drive_type (text: 2wd/4wd/awd)
- engine_cc (integer)
- odometer_km (integer)
- grade (text, nullable) — for reconditioned: '4'/'4.5'/'5'
- import_year (integer, nullable)
- chassis_number (text, nullable)
- features (text array)
- description_bn (text, nullable)
- photos (text array) — Supabase Storage URLs
- district (text)
- city (text, nullable)
- phone (text)
- whatsapp (text, nullable)
- listing_tier (text: free/premium/featured, default free)
- is_verified (boolean, default false)
- views (integer, default 0)
- saves (integer, default 0)
- status (text: active/pending/sold/expired/rejected, default pending)
- expires_at (timestamptz)
- stripe_payment_intent_id (text, nullable)
- created_at, updated_at (timestamptz)

Table: dealers
- id (uuid, pk)
- owner_id (uuid, references profiles.id)
- slug (text, unique)
- name_bn, name_en (text)
- description_bn (text, nullable)
- district, address (text)
- phone, whatsapp, email (text, nullable)
- facebook_url (text, nullable)
- logo_url, cover_url (text, nullable)
- specialties (text array)
- brands_carried (text array)
- years_in_business (integer, nullable)
- plan (text: basic/professional/elite, default basic)
- plan_expires_at (timestamptz, nullable)
- stripe_customer_id (text, nullable)
- is_verified (boolean, default false)
- rating_avg (numeric, default 0)
- rating_count (integer, default 0)
- active_listing_count (integer, default 0)
- created_at (timestamptz)

Table: profiles
- id (uuid, references auth.users)
- full_name, full_name_bn (text)
- phone (text, nullable)
- district (text, nullable)
- preferred_language (text: bn/en, default bn)
- is_dealer (boolean, default false)
- dealer_id (uuid, nullable)
- saved_listings (uuid array)
- stripe_customer_id (text, nullable)
- created_at (timestamptz)

Table: car_reviews
- id (uuid, pk)
- slug (text, unique)
- car_brand, car_model (text)
- car_year_range (text) — e.g. "২০১৮-২০২০"
- title_bn (text)
- body_bn (text) — full Bengali review markdown
- cover_image_url (text, nullable)
- rating_overall (numeric, 1-5)
- rating_comfort, rating_fuel_efficiency, rating_reliability, rating_value (numeric)
- pros_bn (text array)
- cons_bn (text array)
- verdict_bn (text)
- author (text)
- published_at (timestamptz)
- views (integer, default 0)
- is_published (boolean, default false)

Table: guides
- id (uuid, pk)
- slug, title_bn, title_en, body_bn (text)
- category (text: buying/selling/reconditioned/maintenance/legal/finance)
- cover_image_url (text, nullable)
- read_time_minutes (integer)
- is_featured (boolean, default false)
- published_at (timestamptz)

Table: saved_listings
- id (uuid, pk)
- user_id (uuid, references profiles.id)
- listing_id (uuid, references car_listings.id)
- created_at (timestamptz)
- UNIQUE(user_id, listing_id)

Table: news_posts
- id, slug, title_bn, title_en, body_bn, category, author (text)
- cover_image_url (text, nullable)
- published_at (timestamptz)
- is_published (boolean)
- views (integer, default 0)

RLS: Listings: public read active. Seller read/write own. Dealers: public read active. Owner manage. Reviews/Guides/News: public read published. Admin full access.

— STRIPE INTEGRATION —

Listing fees (one-time):
Free: ৳0 (standard 30-day listing)
Premium listing: ৳299 (60-day, featured badge)
Featured listing: ৳599 (90-day, homepage featured)

Dealer subscriptions (monthly):
Basic: ৳2,000/month
Professional: ৳5,000/month
Elite: ৳10,000/month

USD equivalents for international Bangladeshi diaspora selling BD cars:
Premium: $2.70 · Featured: $5.40
Basic dealer: $18 · Pro: $45 · Elite: $90

Webhook: activate listing on payment success + set expires_at
Dealer webhook: update plan + plan_expires_at

TODO comment: "Add bKash/Nagad payment via SSLCommerz — critical for BD sellers. Most car dealers prefer mobile banking for business transactions."

— SELLER DASHBOARD (/dashboard) —

Simple, clean, information-dense:

My Listings table:
Car name + photo thumbnail + price + status badge + views + saves + days remaining + [Edit] [Renew] [Mark as Sold] [Delete]
Status badges: সক্রিয় (Active-green) / অপেক্ষমান (Pending-amber) / বিক্রিত (Sold-gray) / মেয়াদ শেষ (Expired-red)

Performance stats (for Premium+ listings):
Views this week · WhatsApp clicks · Phone reveals · Saves
Simple line chart (Recharts)

[নতুন গাড়ি যোগ করুন] red CTA button

— AUTO NEWS (/news) —

Bangladesh automotive news in Bengali:
New model launches in BD · Import regulation changes · Fuel price updates · Traffic/transport news · Electric vehicle BD · Recall notices

Seed 10 news articles:
"টয়োটা ২০২৪ সালের নতুন মডেল বাংলাদেশে আসছে"
"রিকন্ডিশন্ড গাড়ির ট্যাক্স ২০২৬: কী পরিবর্তন হলো"
"বাংলাদেশে ইলেকট্রিক গাড়ি: কতটা সম্ভব?"
"জাপানি নিলামে গ্রেড ৫ পাওয়া কঠিন হচ্ছে কেন?"
"ঢাকায় গাড়ি রেজিস্ট্রেশন: সম্পূর্ণ প্রক্রিয়া ২০২৬"

— SEO ARCHITECTURE —

bangla.autos has an enormous organic search opportunity:

Title: "Bangla Autos — বাংলাদেশের সেরা গাড়ির বাজার | গাড়ি কিনুন ও বেচুন"
Description: "বাংলাদেশে গাড়ি কিনুন বা বেচুন। রিকন্ডিশন্ড, নতুন এবং ব্যবহৃত গাড়ির বিজ্ঞাপন। AI মূল্য নির্ধারণ, গাইড এবং রিভিউ — সম্পূর্ণ বাংলায়।"

HIGHEST PRIORITY SEO PAGES:
/ → "গাড়ি বাংলাদেশ" / "car bangladesh" — millions of searches
/reconditioned/grade-guide → "রিকন্ডিশন্ড গাড়ির গ্রেড" — huge BD search
/valuation → "গাড়ির দাম কত" / "car price bangladesh" — enormous search
/compare/toyota-aqua-vs-honda-fit → "toyota aqua vs honda fit bangladesh" — high intent
/cars?brand=toyota → "toyota car price bangladesh" — very high volume
/guides → "গাড়ি কেনার গাইড বাংলাদেশ"

Per-listing SEO:
"[Brand] [Model] [Year] বাংলাদেশ [District]" — every listing = a local SEO landing page

JSON-LD: Vehicle schema on every listing (Google rich results for cars)
AutoDealer schema on dealer profiles
FAQPage schema on guide pages

Sitemap: all active listings + reviews + guides + news + comparison pages

— MOBILE FIRST — CRITICAL —

95% of BD car buyers browse on mobile:

Search: full-width, single column, large touch targets
Car listing card: full-width, photo swipe with touch, contact buttons full-width 52px height
Gallery: native swipe with momentum, pinch to zoom
Comparison: horizontal scroll table (sticky left column = feature name)
Sell form: full-screen wizard, camera button for photo upload (mobile camera)
Bottom nav (mobile app): 🔍 খুঁজুন · 📱 বিক্রি · 💰 মূল্য · 🔖 সেভ · 👤 আমার

PHONE REVEAL MECHANIC:
"ফোন নম্বর দেখুন" tap → reveals number + logs contact event
WhatsApp button: opens app directly (mobile deep link: wa.me/[number])
This is how BD transactions happen — WhatsApp is the dealmaking platform

— FOOTER —

Dark (#0F0F12) footer:
Logo + "বাংলাদেশের সেরা গাড়ির বাজার"
4 cols: গাড়ি কিনুন (Buy) · গাড়ি বেচুন (Sell) · তথ্য (Info: guides, reviews, news) · কোম্পানি (Company)
"Part of the StartBD ecosystem — BanglaHQ.com · BdAiHub.com"
"গাড়ি বিজ্ঞাপনের জন্য: ads@bangla.autos"
"© ২০২৬ Bangla Autos · bangla.autos · সর্বস্বত্ব সংরক্ষিত"

— SEED DATA —

20 car listings covering popular BD models:
5 Toyota Aqua (2018-2022, Grade 4-5, ৳16-24L)
4 Honda Fit/Grace (2018-2020, ৳14-20L)
3 Toyota Axio (2015-2019, ৳12-18L)
3 Suzuki Swift (2018-2021, ৳12-16L)
2 Honda Vezel (2019-2021, ৳25-35L)
2 BMW 3-series (2017-2019, ৳45-65L)
1 Toyota Prius (2018, Hybrid, ৳22-28L)

5 verified dealer profiles (Dhaka, Chittagong, Sylhet)
10 guide articles (reconditioned guide, buying tips, registration process)
5 car reviews (Aqua, Fit, Swift, Vezel, Axio)
5 news articles (market updates, new models)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bangla-auto-nexus.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7faa30ae-5e75-4cfb-b256-eb6c44e26c41).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

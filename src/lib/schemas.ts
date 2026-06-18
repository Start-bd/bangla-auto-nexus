const BASE_URL = "https://bangla.autos";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bangla Autos",
  alternateName: "বাংলা অটোস",
  url: BASE_URL,
  description:
    "বাংলাদেশের নম্বর ১ গাড়ির মার্কেটপ্লেস — রিকন্ডিশন্ড, নতুন ও ব্যবহৃত গাড়ি কিনুন বা বেচুন।",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/cars?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["bn", "en"],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bangla Autos",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.png`,
  sameAs: [
    "https://facebook.com/bangla.autos",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Bengali", "English"],
  },
  areaServed: "BD",
};

export function carListingSchema({
  name,
  brand,
  model,
  price,
  currency = "BDT",
  condition,
  mileage,
  color,
  url,
  image,
  description,
  year,
}: {
  name: string;
  brand: string;
  model: string;
  price: number;
  currency?: string;
  condition: "NewCondition" | "UsedCondition" | "RefurbishedCondition";
  mileage?: number;
  color?: string;
  url: string;
  image?: string;
  description?: string;
  year?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    brand: { "@type": "Brand", name: brand },
    model,
    description,
    url: `${BASE_URL}${url}`,
    image: image ? (image.startsWith("http") ? image : `${BASE_URL}${image}`) : undefined,
    color,
    vehicleModelDate: year?.toString(),
    mileageFromOdometer: mileage
      ? { "@type": "QuantitativeValue", value: mileage, unitText: "km" }
      : undefined,
    itemCondition: `https://schema.org/${condition}`,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Bangla Autos",
        url: BASE_URL,
      },
    },
  };
}

export function brandPageSchema(brandName: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brandName} গাড়ির দাম বাংলাদেশ ২০২৬`,
    description: `বাংলাদেশে ${brandName} গাড়ির সর্বশেষ দাম, রিকন্ডিশন্ড ও নতুন ${brandName} গাড়ির তালিকা।`,
    url: `${BASE_URL}/cars/${slug}`,
    inLanguage: "bn",
    about: { "@type": "Brand", name: brandName },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export const homepageFaqs = faqSchema([
  {
    question: "বাংলাদেশে রিকন্ডিশন্ড গাড়ির দাম কত?",
    answer:
      "বাংলাদেশে রিকন্ডিশন্ড গাড়ির দাম ৳১০ লাখ থেকে শুরু হয়। Toyota Axio ৳১৮-৩২ লাখ, Toyota Allion ৳২৪-৩৬ লাখ এবং Honda Vezel ৳৩০-৪৫ লাখ পর্যন্ত পাওয়া যায়।",
  },
  {
    question: "বাংলাদেশে কোন গাড়ির ব্র্যান্ড সবচেয়ে ভালো?",
    answer:
      "বাংলাদেশে Toyota সবচেয়ে জনপ্রিয় ব্র্যান্ড — বেশিরভাগ রিকন্ডিশন্ড গাড়ির বিজ্ঞাপনই Toyota। কম রক্ষণাবেক্ষণ খরচ, ভালো মাইলেজ এবং উচ্চ রিসেল মূল্যের কারণে এটি সেরা পছন্দ।",
  },
  {
    question: "গাড়ি কেনার আগে কী কী যাচাই করতে হবে?",
    answer:
      "গাড়ির BRTA কাগজপত্র, ইঞ্জিন কন্ডিশন, মাইলেজ, অ্যাকসিডেন্ট হিস্ট্রি, জাপানি অকশন গ্রেড (৩.৫+ হলে ভালো), ট্যাক্স টোকেন ও ফিটনেস সার্টিফিকেট যাচাই করুন।",
  },
  {
    question: "বাংলাদেশে গাড়িতে কীভাবে লোন পাওয়া যায়?",
    answer:
      "বাংলাদেশের অনেক ব্যাংক গাড়ি লোন দেয়। সাধারণত ৫-৭ বছরের মেয়াদে ৫-৮% সুদে লোন পাওয়া যায়। EV/হাইব্রিড গাড়ির জন্য ৳৮০ লাখ পর্যন্ত লোন পাওয়া সম্ভব।",
  },
]);

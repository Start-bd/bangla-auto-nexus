import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 font-bengali text-xl font-semibold text-foreground">
          পেজটি পাওয়া যায়নি
        </h2>
        <p className="mt-2 text-sm text-muted-foreground font-bengali">
          আপনি যে পেজটি খুঁজছেন তা পাওয়া যাচ্ছে না।
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-racing-red px-4 py-2 text-sm font-medium text-racing-red-foreground transition-colors hover:bg-racing-red/90"
          >
            হোমে ফিরুন
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bangla Autos — বাংলাদেশের সেরা গাড়ির বাজার" },
      { name: "description", content: "বাংলাদেশে গাড়ি কিনুন বা বেচুন। রিকন্ডিশন্ড, নতুন এবং ব্যবহৃত গাড়ি — সম্পূর্ণ বাংলায়।" },
      { name: "author", content: "Bangla Autos" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Bangla Autos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-TKEST8RCE3",
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-TKEST8RCE3');",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Bangla Autos",
          url: "https://bangla.autos",
          logo: "https://bangla.autos/favicon.ico",
          description:
            "Bangladesh's leading Bengali-language automotive marketplace for buying, selling, and valuing cars.",
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

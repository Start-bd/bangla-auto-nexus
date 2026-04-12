import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BanglaAutosLogo } from "./BanglaAutosLogo";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { to: "/cars" as const, label_bn: "গাড়ির বাজার", label_en: "Cars" },
  { to: "/reconditioned" as const, label_bn: "রিকন্ডিশন্ড", label_en: "Reconditioned" },
  { to: "/reviews" as const, label_bn: "রিভিউ", label_en: "Reviews" },
  { to: "/guides" as const, label_bn: "গাইড", label_en: "Guides" },
  { to: "/news" as const, label_bn: "খবর", label_en: "News" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const mobileMenu = mobileOpen && typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto md:hidden"
          style={{ backgroundColor: '#0F0F12', zIndex: 9999 }}
        >
          <div className="flex flex-col gap-2 p-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-accent font-bengali"
                onClick={() => setMobileOpen(false)}
              >
                {lang === "bn" ? link.label_bn : link.label_en}
              </Link>
            ))}
            <div className="my-4 border-t border-border" />
            <Link to="/sell" onClick={() => setMobileOpen(false)}>
              <Button variant="racing" className="w-full" size="lg">
                গাড়ি বিক্রি করুন
              </Button>
            </Link>
            <Button variant="outline" className="w-full" size="lg">
              লগইন
            </Button>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-racing-red/30 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <BanglaAutosLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground font-bengali"
                activeProps={{ className: "text-foreground bg-accent" }}
              >
                {lang === "bn" ? link.label_bn : link.label_en}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {lang === "bn" ? "EN" : "বাং"}
            </button>

            <Link to="/sell" className="hidden sm:block">
              <Button variant="racing" size="sm">
                {lang === "bn" ? "গাড়ি বিক্রি করুন" : "Sell Your Car"}
              </Button>
            </Link>

            <Link to="/" className="hidden sm:block">
              <Button variant="ghost-light" size="sm">
                {lang === "bn" ? "লগইন" : "Login"}
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="relative ml-2 text-foreground md:hidden"
              style={{ zIndex: 10000 }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {mobileMenu}
    </>
  );
}

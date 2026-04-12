import { Link } from "@tanstack/react-router";
import { BanglaAutosLogo } from "./BanglaAutosLogo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <BanglaAutosLogo />
            <p className="mt-3 text-sm text-muted-foreground font-bengali">
              বাংলাদেশের সেরা গাড়ির বাজার
            </p>
          </div>

          {/* Buy */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground font-bengali">গাড়ি কিনুন</h4>
            <div className="flex flex-col gap-2">
              <Link to="/cars" className="text-sm text-muted-foreground hover:text-foreground font-bengali">সব গাড়ি</Link>
              <Link to="/reconditioned" className="text-sm text-muted-foreground hover:text-foreground font-bengali">রিকন্ডিশন্ড</Link>
              <Link to="/compare" className="text-sm text-muted-foreground hover:text-foreground font-bengali">তুলনা করুন</Link>
              <Link to="/valuation" className="text-sm text-muted-foreground hover:text-foreground font-bengali">মূল্য জানুন</Link>
            </div>
          </div>

          {/* Sell */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground font-bengali">গাড়ি বেচুন</h4>
            <div className="flex flex-col gap-2">
              <Link to="/sell" className="text-sm text-muted-foreground hover:text-foreground font-bengali">বিজ্ঞাপন দিন</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground font-bengali">মূল্য তালিকা</Link>
              <Link to="/dealers" className="text-sm text-muted-foreground hover:text-foreground font-bengali">ডিলার ডিরেক্টরি</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground font-bengali">তথ্য</h4>
            <div className="flex flex-col gap-2">
              <Link to="/reviews" className="text-sm text-muted-foreground hover:text-foreground font-bengali">রিভিউ</Link>
              <Link to="/guides" className="text-sm text-muted-foreground hover:text-foreground font-bengali">গাইড</Link>
              <Link to="/news" className="text-sm text-muted-foreground hover:text-foreground font-bengali">অটো নিউজ</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground font-bengali">কোম্পানি</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">ads@bangla.autos</span>
              <span className="text-sm text-muted-foreground font-body">Part of the StartBD ecosystem</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground font-bengali">
            © ২০২৬ Bangla Autos · bangla.autos · সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
}

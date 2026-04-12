import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export function ReconditionedPromo() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-xl bg-gradient-to-r from-racing-red to-racing-red/80 p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="font-bengali text-2xl font-bold text-racing-red-foreground md:text-3xl">
              রিকন্ডিশন্ড গাড়ি কিনছেন?
            </h2>
            <h3 className="mt-1 font-bengali text-lg text-racing-red-foreground/80 md:text-xl">
              প্রথমে এটা পড়ুন।
            </h3>
            <p className="mt-3 font-bengali text-sm text-racing-red-foreground/70 md:text-base">
              গ্রেড ৪ বনাম গ্রেড ৫: পার্থক্য কী? ঠকবেন না — সম্পূর্ণ বাংলায় জানুন।
            </p>
            <Link to="/reconditioned">
              <Button
                variant="outline"
                size="lg"
                className="mt-6 border-racing-red-foreground/30 bg-racing-red-foreground/10 text-racing-red-foreground hover:bg-racing-red-foreground/20"
              >
                গাইড পড়ুন →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

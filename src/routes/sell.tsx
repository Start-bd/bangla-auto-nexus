import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SellCarForm } from "@/components/SellCarForm";
import { Button } from "@/components/ui/button";
import { Car, LogIn } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "গাড়ি বিক্রি করুন — Bangla Autos" },
      { name: "description", content: "বিনামূল্যে গাড়ির বিজ্ঞাপন দিন। ১০ লক্ষ+ ক্রেতার কাছে পৌঁছান।" },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-racing-red border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-racing-red/10">
          <Car size={40} className="text-racing-red" />
        </div>
        <h1 className="font-bengali text-2xl font-bold text-foreground">
          গাড়ি বিক্রি করুন
        </h1>
        <p className="mt-3 text-muted-foreground font-bengali">
          বিজ্ঞাপন দিতে প্রথমে লগইন করুন। আপনার অ্যাকাউন্ট না থাকলে নিচে সাইন আপ করুন।
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button variant="racing" size="lg" className="font-bengali w-full max-w-xs" asChild>
            <Link to="/">
              <LogIn size={18} /> লগইন / সাইন আপ করুন
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-bengali text-3xl font-bold text-foreground">গাড়ি বিক্রি করুন</h1>
        <p className="mt-2 text-muted-foreground font-bengali">
          নিচের ফর্মটি পূরণ করে আপনার গাড়ির বিজ্ঞাপন দিন
        </p>
      </div>
      <SellCarForm />
    </div>
  );
}

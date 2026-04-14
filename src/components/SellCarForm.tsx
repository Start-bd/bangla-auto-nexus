import { useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { createCarListing } from "@/data/sell.functions";
import { CAR_BRANDS, BD_DISTRICTS } from "@/data/mock-data";
import { Camera, X, ChevronLeft, ChevronRight, Check, Loader2, Upload } from "lucide-react";

const STEPS = [
  { id: 1, label: "গাড়ির তথ্য", labelEn: "Car Info" },
  { id: 2, label: "বিবরণ", labelEn: "Details" },
  { id: 3, label: "ছবি", labelEn: "Photos" },
  { id: 4, label: "মূল্য ও যোগাযোগ", labelEn: "Price & Contact" },
];

const FUEL_TYPES = ["পেট্রোল", "ডিজেল", "হাইব্রিড", "সিএনজি", "অকটেন", "ইলেকট্রিক"];
const TRANSMISSIONS = ["অটো", "ম্যানুয়াল"];
const CONDITIONS = [
  { value: "reconditioned", label: "রিকন্ডিশন্ড" },
  { value: "used", label: "ব্যবহৃত" },
  { value: "new", label: "নতুন" },
] as const;
const COLORS_BN = ["সাদা", "কালো", "রূপালি", "লাল", "নীল", "ধূসর", "সবুজ", "বেইজ", "মেরুন", "সোনালি"];
const FEATURES_LIST = ["AC", "ABS", "Airbags", "Push Start", "Reverse Camera", "Sunroof", "Alloy Wheels", "Leather Seats", "Navigation", "Bluetooth"];

type FormData = {
  brand: string;
  model: string;
  year: string;
  condition: "new" | "used" | "reconditioned";
  grade: string;
  engineCc: string;
  fuelType: string;
  transmission: string;
  odometerKm: string;
  colorBn: string;
  color: string;
  district: string;
  originCountry: string;
  descriptionBn: string;
  features: string[];
  priceBdt: string;
  priceNegotiable: boolean;
  sellerPhone: string;
  photos: string[];
};

export function SellCarForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    condition: "reconditioned",
    grade: "",
    engineCc: "",
    fuelType: "পেট্রোল",
    transmission: "অটো",
    odometerKm: "",
    colorBn: "",
    color: "",
    district: "ঢাকা",
    originCountry: "",
    descriptionBn: "",
    features: [],
    priceBdt: "",
    priceNegotiable: false,
    sellerPhone: "",
    photos: [],
  });

  const update = useCallback((key: keyof FormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleFeature = useCallback((f: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));
  }, []);

  const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    setError("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("ছবি আপলোড করতে লগইন করুন।");
        setUploadingPhotos(false);
        return;
      }

      const userId = session.user.id;
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          setError("প্রতিটি ছবি ৫MB এর কম হতে হবে।");
          continue;
        }
        if (!file.type.startsWith("image/")) continue;

        const ext = file.name.split(".").pop() || "jpg";
        const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from("car-photos")
          .upload(path, file, { cacheControl: "3600", upsert: false });

        if (uploadErr) {
          console.error("Upload error:", uploadErr);
          continue;
        }

        const { data: urlData } = supabase.storage.from("car-photos").getPublicUrl(path);
        uploaded.push(urlData.publicUrl);
      }

      if (uploaded.length > 0) {
        setForm((prev) => ({
          ...prev,
          photos: [...prev.photos, ...uploaded].slice(0, 10),
        }));
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
      setError("ছবি আপলোড করতে সমস্যা হয়েছে।");
    } finally {
      setUploadingPhotos(false);
      e.target.value = "";
    }
  }, []);

  const removePhoto = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }, []);

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return !!(form.brand && form.model && form.year && form.condition && form.district);
      case 2: return true;
      case 3: return form.photos.length >= 1;
      case 4: return !!form.priceBdt;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("বিজ্ঞাপন দিতে লগইন করুন।");
        setIsSubmitting(false);
        return;
      }

      const result = await createCarListing({
        data: {
          brand: form.brand,
          model: form.model,
          year: parseInt(form.year),
          condition: form.condition,
          grade: form.grade || undefined,
          priceBdt: parseInt(form.priceBdt),
          priceNegotiable: form.priceNegotiable,
          engineCc: form.engineCc ? parseInt(form.engineCc) : undefined,
          fuelType: form.fuelType || undefined,
          transmission: form.transmission || undefined,
          odometerKm: form.odometerKm ? parseInt(form.odometerKm) : undefined,
          color: form.color || undefined,
          colorBn: form.colorBn || undefined,
          district: form.district,
          descriptionBn: form.descriptionBn || undefined,
          features: form.features.length > 0 ? form.features : undefined,
          photos: form.photos,
          sellerPhone: form.sellerPhone || undefined,
          originCountry: form.originCountry || undefined,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      navigate({ to: "/cars/$slug", params: { slug: result.slug } });
    } catch (err) {
      console.error("Submit error:", err);
      setError(err instanceof Error ? err.message : "সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
              step > s.id ? "bg-bd-green text-bd-green-foreground"
                : step === s.id ? "bg-racing-red text-racing-red-foreground"
                : "bg-secondary text-muted-foreground"
            }`}>
              {step > s.id ? <Check size={18} /> : s.id}
            </div>
            <span className={`ml-2 hidden font-bengali text-sm sm:inline ${
              step === s.id ? "text-foreground font-semibold" : "text-muted-foreground"
            }`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`mx-3 h-0.5 w-8 sm:w-12 ${
                step > s.id ? "bg-bd-green" : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Car Info */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="font-bengali text-xl font-bold text-foreground">গাড়ির মৌলিক তথ্য</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bengali">ব্র্যান্ড *</Label>
              <Select value={form.brand} onValueChange={(v) => update("brand", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="ব্র্যান্ড বাছাই করুন" /></SelectTrigger>
                <SelectContent>
                  {CAR_BRANDS.map((b) => (
                    <SelectItem key={b.name} value={b.name}>{b.flag} {b.name} ({b.name_bn})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-bengali">মডেল *</Label>
              <Input className="mt-1" value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="যেমন: Aqua, Vezel, Swift" />
            </div>

            <div>
              <Label className="font-bengali">সন *</Label>
              <Input className="mt-1" type="number" min="1990" max="2030" value={form.year} onChange={(e) => update("year", e.target.value)} />
            </div>

            <div>
              <Label className="font-bengali">অবস্থা *</Label>
              <Select value={form.condition} onValueChange={(v) => update("condition", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-bengali">জেলা *</Label>
              <Select value={form.district} onValueChange={(v) => update("district", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {BD_DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {form.condition === "reconditioned" && (
              <div>
                <Label className="font-bengali">গ্রেড</Label>
                <Input className="mt-1" value={form.grade} onChange={(e) => update("grade", e.target.value)} placeholder="যেমন: 4, 4.5, 5" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="font-bengali text-xl font-bold text-foreground">গাড়ির বিবরণ</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bengali">ইঞ্জিন সিসি</Label>
              <Input className="mt-1" type="number" value={form.engineCc} onChange={(e) => update("engineCc", e.target.value)} placeholder="যেমন: 1500" />
            </div>

            <div>
              <Label className="font-bengali">জ্বালানি</Label>
              <Select value={form.fuelType} onValueChange={(v) => update("fuelType", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FUEL_TYPES.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-bengali">ট্রান্সমিশন</Label>
              <Select value={form.transmission} onValueChange={(v) => update("transmission", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TRANSMISSIONS.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-bengali">কিলোমিটার</Label>
              <Input className="mt-1" type="number" value={form.odometerKm} onChange={(e) => update("odometerKm", e.target.value)} placeholder="যেমন: 25000" />
            </div>

            <div>
              <Label className="font-bengali">রঙ (বাংলা)</Label>
              <Select value={form.colorBn} onValueChange={(v) => update("colorBn", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="রঙ বাছাই করুন" /></SelectTrigger>
                <SelectContent>
                  {COLORS_BN.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-bengali">Color (English)</Label>
              <Input className="mt-1" value={form.color} onChange={(e) => update("color", e.target.value)} placeholder="e.g. White, Black" />
            </div>
          </div>

          <div>
            <Label className="font-bengali">বিবরণ (ঐচ্ছিক)</Label>
            <Textarea className="mt-1" rows={3} value={form.descriptionBn} onChange={(e) => update("descriptionBn", e.target.value)} placeholder="গাড়ি সম্পর্কে বিস্তারিত লিখুন..." />
          </div>

          <div>
            <Label className="font-bengali mb-2 block">ফিচার ও সুবিধা</Label>
            <div className="flex flex-wrap gap-2">
              {FEATURES_LIST.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(f)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    form.features.includes(f)
                      ? "border-racing-red bg-racing-red/10 text-racing-red"
                      : "border-border bg-secondary text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {form.features.includes(f) && "✓ "}{f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Photos */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="font-bengali text-xl font-bold text-foreground">গাড়ির ছবি</h2>
          <p className="text-sm text-muted-foreground font-bengali">কমপক্ষে ১টি এবং সর্বোচ্চ ১০টি ছবি আপলোড করুন। প্রতিটি ছবি ৫MB এর কম হতে হবে।</p>

          {/* Upload area */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-8 transition-colors hover:border-racing-red/50 hover:bg-secondary">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
              disabled={uploadingPhotos || form.photos.length >= 10}
            />
            {uploadingPhotos ? (
              <>
                <Loader2 size={40} className="animate-spin text-racing-red" />
                <span className="mt-3 font-bengali text-sm text-muted-foreground">আপলোড হচ্ছে...</span>
              </>
            ) : (
              <>
                <Upload size={40} className="text-muted-foreground" />
                <span className="mt-3 font-bengali text-sm text-muted-foreground">
                  ছবি বাছাই করুন বা এখানে টানুন
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {form.photos.length}/10 ছবি আপলোড হয়েছে
                </span>
              </>
            )}
          </label>

          {/* Preview grid */}
          {form.photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {form.photos.map((url, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                  <img src={url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-racing-red px-2 py-0.5 text-xs font-bold text-racing-red-foreground">
                      প্রধান ছবি
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Price & Contact */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 className="font-bengali text-xl font-bold text-foreground">মূল্য ও যোগাযোগ</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bengali">মূল্য (৳) *</Label>
              <Input className="mt-1 font-price text-lg" type="number" value={form.priceBdt} onChange={(e) => update("priceBdt", e.target.value)} placeholder="যেমন: 2250000" />
              {form.priceBdt && (
                <p className="mt-1 text-xs text-muted-foreground font-bengali">
                  ৳ {parseInt(form.priceBdt).toLocaleString("bn-BD")}
                </p>
              )}
            </div>

            <div>
              <Label className="font-bengali">ফোন নম্বর</Label>
              <Input className="mt-1" type="tel" value={form.sellerPhone} onChange={(e) => update("sellerPhone", e.target.value)} placeholder="01XXXXXXXXX" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="negotiable"
              checked={form.priceNegotiable}
              onCheckedChange={(v) => update("priceNegotiable", !!v)}
            />
            <Label htmlFor="negotiable" className="font-bengali cursor-pointer">দরদাম করা যাবে</Label>
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-bengali text-sm font-semibold text-foreground mb-3">বিজ্ঞাপনের সারসংক্ষেপ</h3>
            <div className="space-y-1 text-sm text-muted-foreground font-bengali">
              <p><span className="text-foreground font-medium">{form.brand} {form.model}</span> · {form.year}</p>
              <p>{CONDITIONS.find((c) => c.value === form.condition)?.label} · {form.district}</p>
              {form.engineCc && <p>{form.engineCc} সিসি · {form.fuelType} · {form.transmission}</p>}
              <p>{form.photos.length}টি ছবি · {form.features.length}টি ফিচার</p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive font-bengali">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost-light"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
          className="font-bengali"
        >
          <ChevronLeft size={18} /> পেছনে
        </Button>

        {step < 4 ? (
          <Button
            variant="racing"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="font-bengali"
          >
            পরবর্তী <ChevronRight size={18} />
          </Button>
        ) : (
          <Button
            variant="racing"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting || !canProceed()}
            className="font-bengali"
          >
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> প্রকাশ হচ্ছে...</>
            ) : (
              <>বিজ্ঞাপন প্রকাশ করুন <Check size={18} /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, Phone, MessageCircle, Fuel, Gauge, Palette, Zap } from "lucide-react";
import type { CarListing } from "@/data/mock-data";
import { formatPriceRaw, getConditionLabel } from "@/data/mock-data";

export function CarListingCard({ listing }: { listing: CarListing }) {
  const condition = getConditionLabel(listing.condition);
  const conditionVariant = listing.condition === "reconditioned" ? "reconditioned"
    : listing.condition === "new" ? "brandNew" : "used";

  return (
    <div className={`group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-racing-red/5 ${
      listing.listingTier === "featured" ? "border-gold/40" : "border-surface-border"
    }`}>
      {/* Featured banner */}
      {listing.listingTier === "featured" && (
        <div className="shine-badge absolute top-0 left-0 z-10 px-3 py-1 text-xs font-bold text-gold-foreground">
          ⭐ বিশেষ বিজ্ঞাপন
        </div>
      )}

      {/* Photo */}
      <Link to="/cars/$slug" params={{ slug: listing.slug }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={listing.photos[0]}
            alt={`${listing.brand} ${listing.model} ${listing.year}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Photo count */}
          <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-0.5 text-xs text-foreground backdrop-blur-sm">
            📷 {listing.photos.length}
          </div>
          {/* Condition badge */}
          <Badge variant={conditionVariant} className="absolute top-2 right-2">
            {condition.label}
          </Badge>
          {/* Verified */}
          {listing.isVerified && (
            <Badge variant="verified" className="absolute top-2 left-2">
              ✓ যাচাইকৃত
            </Badge>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="p-4">
        {/* Title */}
        <Link to="/cars/$slug" params={{ slug: listing.slug }} className="hover:text-racing-red transition-colors">
          <h3 className="font-display text-lg font-bold text-foreground">
            {listing.brand} {listing.model}
          </h3>
        </Link>
        <p className="mt-0.5 text-sm text-muted-foreground font-bengali">
          {listing.year}
          {listing.grade && ` · গ্রেড ${listing.grade}`}
        </p>

        {/* Price */}
        <p className="mt-2 font-price text-xl font-bold text-racing-red">
          {formatPriceRaw(listing.priceBdt)}
        </p>
        {listing.priceNegotiable && (
          <span className="text-xs text-muted-foreground font-bengali">দরদাম করা যাবে</span>
        )}

        {/* Specs row */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap size={12} /> {listing.engineCc} সিসি
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={12} /> {listing.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Gauge size={12} /> {listing.odometerKm.toLocaleString()} কিমি
          </span>
          <span className="flex items-center gap-1">
            <Palette size={12} /> {listing.color_bn}
          </span>
        </div>

        {/* Seller info */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="text-xs text-muted-foreground font-bengali">
            {listing.sellerType === "dealer" ? listing.dealerName : "ব্যক্তিগত বিক্রেতা"}
            {" · "}{listing.district}
          </div>
          <span className="text-xs text-muted-foreground">{listing.daysAgo} দিন আগে</span>
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <Button variant="racing" size="sm" className="flex-1 text-xs">
            <Phone size={14} /> কল করুন
          </Button>
          <Button variant="whatsapp" size="sm" className="flex-1 text-xs">
            <MessageCircle size={14} /> WhatsApp
          </Button>
          <Button variant="ghost-light" size="icon" className="h-8 w-8">
            <Heart size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { BatteryCharging, Shield, Check, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onInspect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onInspect, onAddToCart }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(product.priceNGN);

  const formattedOriginalPrice = product.originalPriceNGN
    ? new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0,
      }).format(product.originalPriceNGN)
    : null;

  return (
    <article className="group relative flex flex-col rounded-2xl bg-white border border-black/[0.06] p-4 apple-card-hover transition-all duration-300">
      {/* Top Badges (rounded-md, no pill shape) */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
            product.condition === 'brand_new'
              ? 'bg-[#FAF5F1] text-[#6B3E26] border border-[#EED8CA]'
              : 'bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          {product.conditionLabel}
        </span>

        {product.batteryHealth && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#6B3E26] bg-[#F7EEE7] px-2 py-0.5 rounded-md">
            <BatteryCharging className="w-3 h-3 text-[#8C5333]" />
            {product.batteryHealth}% Battery
          </span>
        )}
      </div>

      {/* Product Image with Descriptive Alt Tag */}
      <div
        onClick={() => onInspect(product)}
        className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-[#FAF5F1] cursor-pointer mb-4"
      >
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name} (${product.storage}, ${product.conditionLabel}) - Baba Tee Global`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Quick Inspect overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 text-neutral-900 text-xs font-medium shadow-md backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5 text-[#8C5333]" /> Quick Inspect
          </span>
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-medium mb-1">
          <span>{product.brand}</span>
          <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-semibold">
            {product.storage}
          </span>
        </div>

        <h3
          onClick={() => onInspect(product)}
          className="font-semibold text-neutral-900 text-base sm:text-lg tracking-tight group-hover:text-[#6B3E26] transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
          {product.tagline}
        </p>

        {/* Specs Checklist */}
        <div className="mt-3 py-2 border-t border-b border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-[#8C5333]" /> Verified Clean
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#8C5333]" /> Warranty
          </span>
        </div>

        {/* Color Indicators */}
        {product.colorHexes && product.colorHexes.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            {product.colorHexes.map((hex, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                style={{ backgroundColor: hex }}
                title={product.colors[idx]}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">
              {product.colors.join(' / ')}
            </span>
          </div>
        )}

        {/* Price & Action Row (rounded-lg buttons, no pill shape) */}
        <div className="mt-4 pt-2 flex items-center justify-between gap-2">
          <div>
            <div className="font-bold text-lg sm:text-xl text-neutral-900 tracking-tight">
              {formattedPrice}
            </div>
            {formattedOriginalPrice && (
              <div className="text-xs text-neutral-400 line-through">
                {formattedOriginalPrice}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onAddToCart(product)}
              className="p-2.5 rounded-lg bg-[#FAF5F1] text-[#6B3E26] hover:bg-[#F7EEE7] border border-[#EED8CA] transition-colors cursor-pointer"
              title="Add to Cart"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => onInspect(product)}
              className="px-3.5 py-2 rounded-lg bg-[#2C1810] text-white hover:bg-[#4A2A1A] text-xs font-medium transition-colors cursor-pointer"
            >
              Inspect
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { Product, STORE_INFO } from '@/lib/types';
import { X, BatteryCharging, ShieldCheck, CheckCircle2, MessageCircle, ShoppingBag, Truck, MapPin } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

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

  const whatsappMessage = encodeURIComponent(
    `Hello Baba Tee Global, I am interested in purchasing the ${product.name} (${product.conditionLabel}, ${product.storage}) priced at ${formattedPrice}. Is it currently in stock at UnderG store for pickup / nationwide delivery?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-black/[0.08] p-6 sm:p-8">
        
        {/* Close Button (rounded-lg) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left: Product Visual & Trust Badges */}
          <div className="space-y-4">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#FAF5F1] border border-black/[0.05]">
              <Image
                src={product.imageUrl}
                alt={`${product.brand} ${product.name} (${product.storage})`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center"
              />
            </div>

            {/* Hardware Inspection Checklist */}
            <div className="p-4 rounded-2xl bg-[#FAF5F1] border border-[#EED8CA] space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B3E26] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8C5333]" />
                Baba Tee 40-Point Inspection Passed
              </h4>
              <ul className="text-xs text-neutral-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5333] shrink-0" />
                  <span>FaceID / Fingerprint Scanner 100% Functional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5333] shrink-0" />
                  <span>Original Display with Active TrueTone</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5333] shrink-0" />
                  <span>Factory Unlocked for All Nigerian Networks (MTN, Airtel, Glo)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5333] shrink-0" />
                  <span>Clean iCloud / Google Account • Ready for Setup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Device Specs & Actions */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-[#F7EEE7] text-[#6B3E26] border border-[#EED8CA]">
                  {product.conditionLabel}
                </span>
                {product.batteryHealth && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#6B3E26] bg-[#F7EEE7] px-2.5 py-1 rounded-md">
                    <BatteryCharging className="w-3.5 h-3.5 text-[#8C5333]" />
                    {product.batteryHealth}% Battery Health
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Storage</span>
                <span className="font-semibold text-neutral-800">{product.storage}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Warranty</span>
                <span className="font-semibold text-neutral-800">{product.warranty}</span>
              </div>
              {product.specs.display && (
                <div className="col-span-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Display</span>
                  <span className="font-semibold text-neutral-800">{product.specs.display}</span>
                </div>
              )}
              {product.specs.camera && (
                <div className="col-span-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Camera System</span>
                  <span className="font-semibold text-neutral-800">{product.specs.camera}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Store & Dispatch Details */}
            <div className="space-y-1.5 pt-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C5333]" />
                <span>Pickup available at <strong>{STORE_INFO.address}, {STORE_INFO.city}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8C5333]" />
                <span>{STORE_INFO.dispatch}</span>
              </div>
            </div>

            {/* CTA Buttons: rounded-xl (no pill shape) */}
            <div className="space-y-2.5 pt-3">
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Order via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3 px-5 rounded-xl bg-[#2C1810] hover:bg-[#4A2A1A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

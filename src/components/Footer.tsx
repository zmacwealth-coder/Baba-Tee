'use client';

import React from 'react';
import Link from 'next/link';
import { STORE_INFO } from '@/lib/types';
import { MapPin, Phone, MessageCircle, Mail, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#FAF5F1] text-neutral-600 border-t border-black/[0.06] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2C1810] text-[#FAF5F1] flex items-center justify-center font-bold text-xs">
                BT
              </div>
              <span className="font-semibold text-base tracking-tight text-neutral-900">
                BABA TEE <span className="text-[#8C5333] font-light">GLOBAL</span>
              </span>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Nigeria&apos;s trusted hub for factory-certified Brand New and Grade A+ UK Used iPhones, Samsung Galaxy, Google Pixels, MacBooks, and high-performance Windows laptops. Hand-tested with 100% genuine parts.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#6B3E26] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#8C5333]" />
              <span>Registered Reseller • Physical UnderG Storefront</span>
            </div>
          </div>

          {/* Quick Internal Links for SEO Crawlers */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
              Explore Gadgets
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li>
                <a href="#catalog" className="hover:text-[#6B3E26] transition-colors">
                  All Certified Inventory
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B3E26] transition-colors">
                  iPhones (Xr to 18 Pro Max)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B3E26] transition-colors">
                  Samsung Galaxy (S9 to S26 Ultra)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B3E26] transition-colors">
                  Google Pixel (8 to 11 Pro XL)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B3E26] transition-colors">
                  Apple MacBooks (M1 to M4 Max)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B3E26] transition-colors">
                  Dell XPS (2024 to 2026 OLED)
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Head Store Location */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
              Head Store Location
            </h4>
            <div className="space-y-2 text-xs text-neutral-500">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8C5333] shrink-0 mt-0.5" />
                <span>
                  <strong>UnderG Area</strong>,<br />
                  Adjacent LAUTECH Campus,<br />
                  Ogbomoso, Oyo State, Nigeria
                </span>
              </p>
              <p className="text-[11px] text-neutral-400">
                Insured nationwide dispatch across all 36 Nigerian states.
              </p>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
              Store Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-500">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex items-center gap-2 hover:text-[#6B3E26] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8C5333]" />
                <span>{STORE_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#6B3E26] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="flex items-center gap-2 hover:text-[#6B3E26] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8C5333]" />
                <span>{STORE_INFO.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Trademark notice: No Em dashes */}
        <div className="mt-12 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} BABA TEE GLOBAL. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Apple, iPhone, MacBook are trademarks of Apple Inc. Samsung is a trademark of Samsung Electronics.
          </p>
        </div>
      </div>
    </footer>
  );
}

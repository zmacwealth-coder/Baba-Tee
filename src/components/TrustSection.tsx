'use client';

import React from 'react';
import { STORE_INFO } from '@/lib/types';
import { MapPin, Truck, ShieldCheck, CheckCircle, Clock, Phone, Award } from 'lucide-react';

export function TrustSection() {
  return (
    <section id="trust-engine" className="py-20 bg-[#FAF5F1] border-t border-b border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Strict h2 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5333]">
            Integrity • Authenticity • Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mt-2">
            Why Gadget Enthusiasts Choose Baba Tee Global
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            In an industry filled with refurbished knockoffs and swapped batteries, we guarantee 100% factory original motherboards, screens, and cameras.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Physical Store at UnderG */}
          <div id="store-location" className="rounded-2xl bg-white p-8 border border-black/[0.06] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#F7EEE7] text-[#6B3E26] flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5333]">
                Physical Storefront
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                UnderG, Ogbomoso, Oyo State
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Visit our showroom at <strong>{STORE_INFO.address}</strong>. Test FaceID, TrueTone, battery health, and run benchmark tests hands-on before paying.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
              <Clock className="w-4 h-4 text-[#8C5333]" />
              <span>Open Mon - Sat: 8:30 AM - 7:30 PM</span>
            </div>
          </div>

          {/* Pillar 2: Nationwide Delivery */}
          <div className="rounded-2xl bg-white p-8 border border-black/[0.06] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#F7EEE7] text-[#6B3E26] flex items-center justify-center mb-6">
              <Truck className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5333]">
                Nationwide Transit
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                Doorstep &amp; Waybill Dispatch
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Prompt insured dispatch across Nigeria:
                <br />• Lagos &amp; Oyo State: Same-day / 24-hr express
                <br />• Abuja, Port Harcourt, Enugu: 24-48 hrs
                <br />• Insured bubble packaging with live tracking.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
              <CheckCircle className="w-4 h-4 text-[#8C5333]" />
              <span>Full Transit Insurance on Every Package</span>
            </div>
          </div>

          {/* Pillar 3: 40-Point Hardware Audit */}
          <div className="rounded-2xl bg-white p-8 border border-black/[0.06] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#F7EEE7] text-[#6B3E26] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5333]">
                Strict Quality Control
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                40-Point Hardware Audit
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every UK used iPhone and MacBook goes through battery health diagnostics, motherboard thermal checks, TrueTone validation, and screen calibration.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
              <Award className="w-4 h-4 text-[#8C5333]" />
              <span>30-Day Instant Replacement Guarantee</span>
            </div>
          </div>

        </div>

        {/* Contact Banner Bar (rounded-2xl, rounded-lg buttons) */}
        <div className="mt-12 rounded-2xl bg-[#2C1810] text-[#FAF5F1] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-semibold tracking-tight">
              Have Questions or Want Custom Specs?
            </h4>
            <p className="text-xs text-neutral-300">
              Speak directly with Baba Tee on WhatsApp or visit our UnderG showroom.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C68B65]" />
              <span>Call Us</span>
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Baba%20Tee%20Global,%20I%20have%20an%20inquiry%20regarding%20gadgets`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#8C5333] hover:bg-[#A8653F] text-white transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>WhatsApp Store</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

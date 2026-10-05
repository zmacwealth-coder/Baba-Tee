'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Center-aligned Typography matching Apple Website Reference */}
        <div className="flex flex-col items-center text-center">
          
          {/* Only 1 h1 tag on the page */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-neutral-900 leading-[1.06]">
            Quality.<br />
            <span className="font-medium text-neutral-800">
              Affordable<span className="text-[#8C5333]">.</span>
            </span>
          </h1>

          {/* Subtitle: No Em dashes */}
          <p className="mt-3 sm:mt-4 text-base sm:text-xl lg:text-2xl text-neutral-600 font-normal max-w-xl leading-relaxed">
            Meet the certified iPhone 18 lineup.
          </p>

          {/* Sleek rounded rectangular button (No pill shape) */}
          <div className="mt-5 sm:mt-6">
            <button
              onClick={onExploreClick}
              className="px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#2C1810] text-[#FAF5F1] hover:bg-[#4A2A1A] transition-all shadow-sm cursor-pointer active:scale-98"
            >
              Get Device
            </button>
          </div>

        </div>

        {/* User-Uploaded iPhone 18 Lineup Showcase */}
        <div className="relative mt-8 sm:mt-12 w-full flex items-center justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square">
            <Image
              src="/images/iphone-18-lineup-transparent.png"
              alt="Apple iPhone 18 Lineup: Space Black, White, Sky Blue, and Deep Bronze Titanium available at Baba Tee Global"
              fill
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 550px"
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

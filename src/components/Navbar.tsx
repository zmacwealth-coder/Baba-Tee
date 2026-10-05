'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { STORE_INFO } from '@/lib/types';
import { ShoppingBag, MapPin, MessageCircle, Menu, X, ChevronDown, Smartphone, Laptop, Tablet, Watch, Headphones } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onFilterSelect: (category: string, search?: string) => void;
}

interface NavDropdownItem {
  name: string;
  category: string;
  search?: string;
  badge?: string;
  icon: React.ElementType;
}

interface NavSection {
  id: string;
  name: string;
  category: string;
  items: NavDropdownItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'apple',
    name: 'Apple',
    category: 'apple',
    items: [
      { name: 'iPhones (Xr to 18 Pro Max)', category: 'iphones', badge: 'Flagship', icon: Smartphone },
      { name: 'iPad (Pro and Air)', category: 'ipad', badge: 'M2/M4', icon: Tablet },
      { name: 'MacBook (M1 to M4 Max)', category: 'macbooks', badge: 'Pro & Air', icon: Laptop },
      { name: 'AirPods & AirPods Max', category: 'airpods', icon: Headphones },
      { name: 'Apple Watch (Ultra 2 & S10)', category: 'iwatch', badge: 'Titanium', icon: Watch },
    ],
  },
  {
    id: 'samsung',
    name: 'Samsung',
    category: 'samsung',
    items: [
      { name: 'Galaxy Phones (S9 to S26 Ultra)', category: 'samsung', badge: 'AI Power', icon: Smartphone },
      { name: 'Galaxy Tab (S10 Ultra)', category: 'galaxy-tab', badge: '14.6" OLED', icon: Tablet },
      { name: 'Galaxy Watch (Ultra Titanium)', category: 'galaxy-watch', badge: '10ATM', icon: Watch },
    ],
  },
  {
    id: 'pixel',
    name: 'Pixel',
    category: 'pixel',
    items: [
      { name: 'Pixel Phones (8 to 11 Pro XL)', category: 'pixel', badge: 'Tensor G6', icon: Smartphone },
      { name: 'Pixel Tablet (with Speaker Dock)', category: 'pixel-tablet', icon: Tablet },
      { name: 'Pixel Watch 3 & Buds Pro 2', category: 'pixel-watch', badge: 'Fitbit', icon: Watch },
    ],
  },
  {
    id: 'laptops',
    name: 'Laptops',
    category: 'laptops',
    items: [
      { name: 'Apple MacBooks (M-Series)', category: 'macbooks', badge: 'Liquid XDR', icon: Laptop },
      { name: 'Dell XPS (2024 to 2026 OLED)', category: 'laptops', search: 'Dell', badge: 'Core Ultra', icon: Laptop },
      { name: 'Windows Workstations (ThinkPad)', category: 'laptops', search: 'ThinkPad', badge: 'Pro Grade', icon: Laptop },
    ],
  },
];

export function Navbar({ cartCount, onOpenCart, onFilterSelect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (category: string, search?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onFilterSelect(category, search);
    
    // Smooth scroll to catalog
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-2xs transition-all duration-200">
      {/* Top announcement banner: No Em dashes */}
      <div className="bg-[#2C1810] text-[#F7EEE7] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#A8653F] animate-pulse"></span>
        <span>Nationwide Insured Delivery</span>
        <span className="text-[#C68B65]">•</span>
        <span>Physical Store at UnderG, Ogbomoso</span>
        <span className="text-[#C68B65]">•</span>
        <span className="hidden sm:inline">Certified UK Used &amp; Brand New</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#2C1810] text-[#FAF5F1] flex items-center justify-center font-bold text-sm tracking-tighter group-hover:scale-105 transition-transform">
            BT
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 leading-none">
              BABA TEE <span className="text-[#8C5333] font-light">GLOBAL</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-medium mt-0.5">
              UnderG • Ogbomoso
            </span>
          </div>
        </Link>

        {/* Desktop Direct Nav Buttons with Dropdowns */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs uppercase tracking-wider font-semibold text-neutral-700">
          {NAV_SECTIONS.map((section) => {
            const isOpen = activeDropdown === section.id;

            return (
              <div
                key={section.id}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(section.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Main Brand Button: rounded-lg (no pill shape) */}
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isOpen ? null : section.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    isOpen
                      ? 'bg-[#FAF5F1] text-[#6B3E26]'
                      : 'hover:text-[#6B3E26] hover:bg-neutral-100'
                  }`}
                >
                  <span>{section.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180 text-[#8C5333]' : 'text-neutral-400'}`} />
                </button>

                {/* Floating Dropdown Card */}
                {isOpen && (
                  <div
                    className="absolute top-full left-0 mt-0.5 w-72 rounded-2xl bg-white shadow-xl border border-black/[0.08] p-2.5 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
                  >
                    {/* Header: All Brand Link */}
                    <div className="px-3 py-1.5 mb-1 border-b border-neutral-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#8C5333]">
                        {section.name} Catalog
                      </span>
                      <button
                        onClick={() => handleItemClick(section.category)}
                        className="text-[10px] text-neutral-500 hover:text-[#6B3E26] font-medium lowercase hover:underline"
                      >
                        view all
                      </button>
                    </div>

                    {/* Sub-items */}
                    <div className="space-y-1">
                      {section.items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleItemClick(item.category, item.search)}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FAF5F1] transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-neutral-100 group-hover:bg-[#F7EEE7] text-neutral-700 group-hover:text-[#6B3E26] flex items-center justify-center shrink-0 transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-medium normal-case tracking-normal text-neutral-800 group-hover:text-[#6B3E26] truncate">
                                {item.name}
                              </span>
                            </div>

                            {item.badge && (
                              <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-neutral-100 group-hover:bg-[#F7EEE7] text-neutral-600 group-hover:text-[#8C5333] shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <a
            href="#store-location"
            className="px-3 py-2 rounded-lg hover:text-[#6B3E26] hover:bg-neutral-100 transition-colors flex items-center gap-1 text-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-[#8C5333]" />
            <span>UnderG Store</span>
          </a>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Concierge: rounded-lg (no pill shape) */}
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Baba%20Tee%20Global,%20I%20want%20to%20inquire%20about%20gadget%20availability`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-[#FAF5F1] text-[#6B3E26] border border-[#EED8CA] hover:bg-[#F7EEE7] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Chat Baba Tee</span>
          </a>

          {/* Cart Icon: rounded-lg (no pill shape) */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 hover:bg-[#F7EEE7] hover:text-[#6B3E26] text-neutral-800 transition-colors"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8C5333] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 text-neutral-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Brand Accordions */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-200 px-6 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Categories &amp; Brands
          </div>

          {NAV_SECTIONS.map((section) => {
            const isExpanded = mobileExpandedSection === section.id;

            return (
              <div key={section.id} className="border-b border-neutral-100 pb-2">
                <button
                  onClick={() => setMobileExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between py-2 text-sm font-semibold text-neutral-900"
                >
                  <span className="flex items-center gap-2">
                    <span>{section.name}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#8C5333]' : 'text-neutral-400'}`} />
                </button>

                {isExpanded && (
                  <div className="pl-3 pr-1 py-1 space-y-1.5 bg-[#FAF5F1]/50 rounded-xl">
                    <button
                      onClick={() => handleItemClick(section.category)}
                      className="w-full text-left py-1 text-xs font-bold text-[#8C5333] hover:underline"
                    >
                      View All {section.name} Gadgets
                    </button>
                    {section.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleItemClick(item.category, item.search)}
                        className="w-full text-left py-1.5 text-xs text-neutral-700 hover:text-[#6B3E26] flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] bg-neutral-200/80 px-1.5 py-0.5 rounded text-neutral-600">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 space-y-2">
            <a
              href="#store-location"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-[#6B3E26] py-1"
            >
              <MapPin className="w-4 h-4 text-[#8C5333]" />
              UnderG Physical Store (Ogbomoso)
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#2C1810] text-[#FAF5F1] text-xs font-semibold mt-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              WhatsApp Store Concierge
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import { CATEGORIES_CONFIG, STORAGE_OPTIONS, CONDITION_OPTIONS } from '@/lib/mock-data';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  onInspectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  activeSearchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function CatalogSection({
  products,
  onInspectProduct,
  onAddToCart,
  activeCategory,
  onSelectCategory,
  activeSearchQuery,
  onSearchChange,
}: CatalogSectionProps) {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const selectedCategory = activeCategory ?? internalCategory;
  const setSelectedCategory = onSelectCategory ?? setInternalCategory;

  const searchQuery = activeSearchQuery ?? internalSearch;
  const setSearchQuery = onSearchChange ?? setInternalSearch;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase();
        if (cat === 'apple' && product.brand !== 'Apple') return false;
        if (cat === 'samsung' && product.brand !== 'Samsung') return false;
        if (cat === 'pixel' && product.brand !== 'Google') return false;
        if (cat === 'laptops' && product.category !== 'laptops' && product.category !== 'macbooks' && product.productType !== 'laptops') return false;
        if (cat !== 'apple' && cat !== 'samsung' && cat !== 'pixel' && cat !== 'laptops') {
          if (product.category !== cat && product.productType !== cat) {
            return false;
          }
        }
      }

      // Condition match
      if (selectedCondition !== 'all' && product.condition !== selectedCondition) {
        return false;
      }

      // Storage match
      if (selectedStorage !== 'all' && product.storage.toLowerCase() !== selectedStorage.toLowerCase()) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesStorage = product.storage.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesStorage && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceNGN - b.priceNGN;
      if (sortBy === 'price-high') return b.priceNGN - a.priceNGN;
      if (sortBy === 'battery') return (b.batteryHealth ?? 0) - (a.batteryHealth ?? 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedCondition, selectedStorage, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedStorage('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header: Strict h2 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5333]">
            Curated Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mt-1">
            Certified Flagships &amp; Workstations
          </h2>
          <p className="text-sm text-neutral-500 mt-1.5">
            Strictly tested UK imports and brand new sealed units with genuine parts warranty.
          </p>
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search iPhone, MacBook, S24..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white border border-black/[0.08] focus:border-[#8C5333] focus:outline-none shadow-xs transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs: rounded-lg (No pill shape) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES_CONFIG.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#2C1810] text-[#FAF5F1] shadow-xs'
                : 'bg-white border border-black/[0.06] text-neutral-600 hover:text-neutral-900 hover:border-black/20'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Secondary Filter Bar: Condition + Storage + Sort (rounded-xl) */}
      <div className="p-4 rounded-xl bg-white/70 border border-black/[0.05] shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Conditions & Storage (rounded-md, no pill shape) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Condition Selectors */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mr-1">
              Condition:
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {CONDITION_OPTIONS.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedCondition === cond.id
                      ? 'bg-[#FAF5F1] text-[#6B3E26] border border-[#EED8CA]'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block h-4 w-px bg-neutral-200" />

          {/* Storage Range: 64GB - 2TB */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mr-1">
              Storage:
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setSelectedStorage('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer ${
                  selectedStorage === 'all'
                    ? 'bg-[#2C1810] text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All
              </button>
              {STORAGE_OPTIONS.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStorage(st)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedStorage === st
                      ? 'bg-[#FAF5F1] text-[#6B3E26] border border-[#EED8CA]'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-transparent border-0 text-neutral-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="battery">Battery Health %</option>
            </select>
          </div>

          {(selectedCategory !== 'all' ||
            selectedCondition !== 'all' ||
            selectedStorage !== 'all' ||
            searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#8C5333] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Product Count Indicator */}
      <div className="mb-6 flex items-center justify-between text-xs text-neutral-400">
        <span>
          Showing <strong className="text-neutral-800">{filteredProducts.length}</strong> verified devices
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onInspect={onInspectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-black/[0.05] p-8">
          <p className="text-neutral-500 text-sm">No gadgets matched your specific filter criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#2C1810] text-white hover:bg-[#4A2A1A] cursor-pointer"
          >
            Clear Filters &amp; View All Gadgets
          </button>
        </div>
      )}
    </section>
  );
}

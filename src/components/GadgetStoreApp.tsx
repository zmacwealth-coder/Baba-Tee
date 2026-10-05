'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { CatalogSection } from './CatalogSection';
import { TrustSection } from './TrustSection';
import { Footer } from './Footer';
import { ProductModal } from './ProductModal';
import { CartDrawer, CartItem } from './CartDrawer';

interface GadgetStoreAppProps {
  initialProducts: Product[];
}

export function GadgetStoreApp({ initialProducts }: GadgetStoreAppProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFilterSelect = (category: string, search?: string) => {
    setActiveCategory(category);
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFD] selection:bg-[#EED8CA] selection:text-[#2C1810]">
      {/* Navigation with Direct Brand Dropdowns */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onFilterSelect={handleFilterSelect}
      />

      {/* Hero with Reference UI Vibe */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Main Catalog with Filters */}
      <CatalogSection
        products={initialProducts}
        onInspectProduct={(prod) => setSelectedProduct(prod)}
        onAddToCart={handleAddToCart}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        activeSearchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Physical Store & Nationwide Delivery Trust Engine */}
      <TrustSection />

      {/* Footer */}
      <Footer />

      {/* Inspect Specs Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

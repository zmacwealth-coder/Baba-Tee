'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, STORE_INFO } from '@/lib/types';
import { X, Trash2, MessageCircle, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

const NIGERIAN_STATES = [
  'Oyo State (Pickup at UnderG / Express)',
  'Lagos State',
  'Abuja (FCT)',
  'Ogun State',
  'Osun State',
  'Rivers State (Port Harcourt)',
  'Kano State',
  'Kaduna State',
  'Enugu State',
  'Delta State',
  'Edo State',
  'Other State (Nationwide Dispatch)'
];

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [selectedState, setSelectedState] = useState<string>(NIGERIAN_STATES[0]);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.priceNGN * item.quantity,
    0
  );

  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(totalAmount);

  const handleWhatsAppOrder = () => {
    const itemList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.product.name} (${i.product.conditionLabel}, ${i.product.storage}) - ₦${(i.product.priceNGN * i.quantity).toLocaleString()}`
      )
      .join('%0A');

    const message = `Hello Baba Tee Global!%0A%0AI want to place an order:%0A${itemList}%0A%0ATotal: ${formattedTotal}%0ADelivery Destination: ${encodeURIComponent(
      selectedState
    )}%0ACustomer Name: ${encodeURIComponent(
      customerName || 'Customer'
    )}%0APhone: ${encodeURIComponent(
      customerPhone || 'N/A'
    )}%0A%0APlease confirm availability and payment instructions.`;

    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const handleDirectCheckout = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
      setOrderSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                Review Your Gadget Bag
              </h2>
              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#FAF5F1] text-[#6B3E26]">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {orderSuccess ? (
              <div className="py-16 text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-neutral-900">Order Initiated!</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Baba Tee Global has received your order request. A confirmation and waybill update will be communicated.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-neutral-400 text-sm">Your bag is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#2C1810] text-white hover:bg-[#4A2A1A] cursor-pointer"
                >
                  Start Exploring Gadgets
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 items-center"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-black/5">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-neutral-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500">
                          {product.conditionLabel} • {product.storage}
                        </p>
                        <div className="font-semibold text-xs text-neutral-900 mt-1">
                          ₦{(product.priceNGN * quantity).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-md px-2 py-0.5 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                            className="text-neutral-500 hover:text-black font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-medium text-neutral-800">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="text-neutral-500 hover:text-black font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Destination Selector */}
                <div className="space-y-3 pt-3 border-t border-neutral-100">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Select Delivery Destination
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#8C5333]"
                  >
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="text-xs p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#8C5333]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (e.g. 08123...)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="text-xs p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#8C5333]"
                    />
                  </div>
                </div>

                {/* Trust guarantee banner */}
                <div className="p-3 rounded-xl bg-[#FAF5F1] border border-[#EED8CA] flex items-center gap-2.5 text-xs text-[#6B3E26]">
                  <ShieldCheck className="w-5 h-5 text-[#8C5333] shrink-0" />
                  <span>Insured transit with 30-day instant replacement guarantee.</span>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions (rounded-xl, no pill shape) */}
          {items.length > 0 && !orderSuccess && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/70 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-500 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-neutral-900 tracking-tight">
                  {formattedTotal}
                </span>
              </div>

              {/* Instant WhatsApp Order (High Conversion) */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp (Fastest)</span>
              </button>

              {/* Direct Checkout */}
              <button
                onClick={handleDirectCheckout}
                className="w-full py-3 px-4 rounded-xl bg-[#2C1810] hover:bg-[#4A2A1A] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Confirm Store Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { PageRoute, Product } from '../types';
import { PRODUCTS, MONKEY_CHEF_AVATAR } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  setCurrentPage: (page: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  setCurrentPage,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedPack, setSelectedPack] = useState<'200g Pouch' | 'Pack of 2' | 'Pack of 3'>('200g Pouch');
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string>('about');

  // Pack prices calculation
  const packPrices = {
    '200g Pouch': product.price,
    'Pack of 2': Math.round(product.price * 2 * 0.9), // 10% discount
    'Pack of 3': Math.round(product.price * 3 * 0.85), // 15% discount
  };

  const packMrps = {
    '200g Pouch': product.mrp,
    'Pack of 2': product.mrp * 2,
    'Pack of 3': product.mrp * 3,
  };

  const currentUnitPrice = packPrices[selectedPack];
  const totalPrice = currentUnitPrice * quantity;

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.imageUrl];

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Subtle Notification Strip */}
      <div className="w-full bg-[#fffdf8]/90 border-b border-[#ffeade] py-2 px-gutter">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body-sm text-body-sm text-[#815432]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#2e8b57] filled">
              verified
            </span>
            <span>Lab-tested certified purity • Zero added sugars • Gentle on tiny digestive systems</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#5b3f46] font-label-sm text-label-sm font-bold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              Free Shipping &gt; ₹499
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              Pediatric Nutrition Support
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-gutter md:px-margin pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#5b3f46] font-label-md text-label-md">
          <button
            onClick={() => setCurrentPage('home')}
            className="hover:text-[#e80074] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="material-symbols-outlined text-[16px] text-[#8f6f76]">chevron_right</span>
          <button
            onClick={() => setCurrentPage('shop')}
            className="hover:text-[#e80074] transition-colors cursor-pointer"
          >
            Shop
          </button>
          <span className="material-symbols-outlined text-[16px] text-[#8f6f76]">chevron_right</span>
          <span className="text-[#815432]">{product.category}</span>
          <span className="material-symbols-outlined text-[16px] text-[#8f6f76]">chevron_right</span>
          <span aria-current="page" className="text-[#e80074] font-bold">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Primary Product Showcase Section */}
      <section className="w-full max-w-7xl mx-auto px-gutter md:px-margin py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Product Visuals */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Big Feature Frame */}
            <div className="relative w-full aspect-square rounded-3xl bg-[#e8f8ee]/70 flex items-center justify-center p-8 overflow-hidden shadow-[0_10px_30px_-4px_rgba(82,49,24,0.08)] border border-[#d6f5e3]">
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#d6f5e3]/70 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[#ffc299]/30 blur-3xl pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fffdf8]/95 text-[#2e8b57] font-label-sm text-label-sm shadow-[0_4px_12px_rgba(82,49,24,0.08)] backdrop-blur-md font-bold">
                  <span className="material-symbols-outlined text-[16px] filled">eco</span>
                  100% Organic Certified
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffe3d2]/90 text-[#7a4e2d] font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">block</span>
                  Zero Added Sugar
                </span>
              </div>

              {/* Main Image */}
              <img
                alt={product.name}
                className="relative z-10 object-contain w-full h-full max-h-[460px] drop-shadow-[0_20px_25px_rgba(82,49,24,0.18)] transition-all duration-300 hover:scale-105"
                src={images[activeImageIndex] || product.imageUrl}
              />

              {/* Whimsical sticker badge */}
              <div className="absolute bottom-4 right-4 z-10 bg-[#fffdf8] rounded-full p-2.5 shadow-[0_4px_14px_rgba(82,49,24,0.12)] flex items-center gap-2 border border-[#ffeade]">
                <span className="material-symbols-outlined text-[24px] text-[#b2622e] filled">
                  nutrition
                </span>
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">Sun-ripened</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-2xl bg-[#fffdf8] p-2 shadow-sm flex items-center justify-center transition-all cursor-pointer border ${
                    activeImageIndex === idx
                      ? 'ring-2 ring-[#e80074] opacity-100 border-transparent shadow-md'
                      : 'opacity-70 hover:opacity-100 border-[#ffeade]'
                  }`}
                >
                  <img
                    alt={`View angle ${idx + 1}`}
                    className="h-full w-full object-cover rounded-xl"
                    src={img}
                  />
                </button>
              ))}
            </div>

            {/* Trust Badges Under Image */}
            <div className="mt-2 grid grid-cols-3 gap-2 bg-[#faf7ee] p-4 rounded-2xl text-center border border-[#ffeade]">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[24px] text-[#2e8b57] mb-1">
                  health_and_safety
                </span>
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">100% Tested</span>
                <span className="font-body-sm text-body-sm text-[#815432] text-xs">Pesticide Free</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[24px] text-[#934a17] mb-1">
                  cloud_download
                </span>
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">3-Min Quick Prep</span>
                <span className="font-body-sm text-body-sm text-[#815432] text-xs">No Clumping</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[24px] text-[#e80074] mb-1">
                  save_as
                </span>
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">Easy Digestion</span>
                <span className="font-body-sm text-body-sm text-[#815432] text-xs">Gut-Friendly</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Purchase Options & Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-[#e80074] tracking-wider uppercase bg-[#ffd9e1]/50 px-3 py-0.5 rounded-full font-bold">
                  Nibbles Pure First Foods
                </span>
                <span className="font-label-sm text-label-sm text-[#815432] font-semibold">
                  {product.stage} First Taste
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-[#2f1401] tracking-tight leading-tight font-extrabold">
                {product.name}
              </h1>
              <p className="font-body-lg text-body-lg text-[#815432]">
                {product.desc}
              </p>
            </div>

            {/* Key Pills Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-md text-label-md font-bold">
                <span className="w-2 h-2 rounded-full bg-[#2e8b57]" />
                {product.age}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe3d2] text-[#934a17] font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[16px] filled">check_circle</span>
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f8ee] text-[#2f1401] font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#2e8b57]">shield_locked</span>
                100% Organic Certified
              </span>
            </div>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-3 bg-[#fffdf8] p-3 rounded-full w-fit shadow-[0_4px_12px_rgba(82,49,24,0.04)] border border-[#ffeade]">
              <div className="flex items-center text-[#e80074]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[20px] filled">
                    star
                  </span>
                ))}
              </div>
              <span className="font-label-md text-label-md text-[#2f1401] font-bold">
                {product.rating} / 5.0
              </span>
              <span className="text-[#8f6f76] text-xs">•</span>
              <span className="font-body-sm text-body-sm text-[#815432]">
                {product.reviewsCount} verified parent reviews
              </span>
            </div>

            {/* Pricing Card */}
            <div className="bg-[#fffdf8] p-5 rounded-2xl shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col gap-2 border border-[#ffeade]">
              <div className="flex items-baseline gap-3">
                <span className="font-display-lg text-display-lg text-[#2f1401] leading-none tracking-tight font-extrabold">
                  ₹{currentUnitPrice}
                </span>
                <span className="font-body-lg text-body-lg text-[#8f6f76] line-through">
                  ₹{packMrps[selectedPack]}
                </span>
                <span className="font-label-md text-label-md bg-[#d6f5e3] text-[#2e8b57] px-2.5 py-0.5 rounded-full font-bold">
                  {selectedPack === '200g Pouch' ? '14% OFF' : selectedPack === 'Pack of 2' ? 'SAVE 10%' : 'SAVE 15%'}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-[#815432]">
                Inclusive of all taxes • Free standard delivery on orders over ₹499
              </p>
            </div>

            {/* Pack Size / Quantity Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-[#2f1401] font-bold">Choose Pack Size:</label>
                <span className="font-label-sm text-label-sm text-[#e80074] font-bold">Freshness Guaranteed</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Pack 1 */}
                <button
                  type="button"
                  onClick={() => setSelectedPack('200g Pouch')}
                  className={`relative p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                    selectedPack === '200g Pouch'
                      ? 'bg-[#fffdf8] ring-2 ring-[#e80074] shadow-md border-transparent'
                      : 'bg-[#fffdf8] hover:bg-[#ffe3d2]/50 border-[#ffeade]'
                  }`}
                >
                  <div className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">200g Pouch</div>
                  <div className="font-body-sm text-body-sm text-[#815432]">Standard Pack</div>
                  <div className="font-label-md text-label-md text-[#e80074] mt-1 font-bold">
                    ₹{packPrices['200g Pouch']}
                  </div>
                </button>

                {/* Pack 2 */}
                <button
                  type="button"
                  onClick={() => setSelectedPack('Pack of 2')}
                  className={`relative p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                    selectedPack === 'Pack of 2'
                      ? 'bg-[#fffdf8] ring-2 ring-[#e80074] shadow-md border-transparent'
                      : 'bg-[#fffdf8] hover:bg-[#ffe3d2]/50 border-[#ffeade]'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-[#2e8b57] text-white font-label-sm text-[10px] font-bold">
                    SAVE 10%
                  </span>
                  <div className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">Pack of 2</div>
                  <div className="font-body-sm text-body-sm text-[#815432]">400g Total</div>
                  <div className="font-label-md text-label-md text-[#e80074] mt-1 font-bold">
                    ₹{packPrices['Pack of 2']}
                  </div>
                </button>

                {/* Pack 3 */}
                <button
                  type="button"
                  onClick={() => setSelectedPack('Pack of 3')}
                  className={`relative p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                    selectedPack === 'Pack of 3'
                      ? 'bg-[#fffdf8] ring-2 ring-[#e80074] shadow-md border-transparent'
                      : 'bg-[#fffdf8] hover:bg-[#ffe3d2]/50 border-[#ffeade]'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-[#e80074] text-white font-label-sm text-[10px] font-bold">
                    SAVE 15%
                  </span>
                  <div className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">Pack of 3</div>
                  <div className="font-body-sm text-body-sm text-[#815432]">600g Total</div>
                  <div className="font-label-md text-label-md text-[#e80074] mt-1 font-bold">
                    ₹{packPrices['Pack of 3']}
                  </div>
                </button>
              </div>
            </div>

            {/* Quantity & Add to Cart Action */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              {/* Stepper */}
              <div className="flex items-center justify-between w-full sm:w-auto bg-[#faf7ee] rounded-full px-2 py-1 shadow-[inset_0_2px_4px_rgba(82,49,24,0.05)] border border-[#ffeade]">
                <button
                  aria-label="Decrease quantity"
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#2f1401] hover:bg-[#ffe3d2] transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="px-5 font-headline-sm text-headline-sm text-[#2f1401] select-none font-bold">
                  {quantity}
                </span>
                <button
                  aria-label="Increase quantity"
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#2f1401] hover:bg-[#ffe3d2] transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => addToCart(product, quantity, selectedPack, currentUnitPrice)}
                className="flex-1 w-full flex items-center justify-center gap-2 bg-[#e80074] text-white py-4 px-8 rounded-full font-headline-sm text-headline-sm shadow-[0_8px_20px_rgba(232,0,116,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span>Add to Cart • ₹{totalPrice}</span>
              </button>

              {/* Buy Now CTA */}
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity, selectedPack, currentUnitPrice);
                  setCurrentPage('checkout');
                }}
                className="w-full sm:w-auto bg-[#ffe3d2] text-[#2f1401] py-4 px-6 rounded-full font-headline-sm text-headline-sm hover:bg-[#ffdcc6] transition-colors cursor-pointer font-bold"
              >
                Buy Now
              </button>
            </div>

            {/* Reassurances Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-[#815432]">
                <span className="material-symbols-outlined text-[18px] text-[#2e8b57] filled">check</span>
                Easy 7-day hassle-free replacement
              </span>
              <span className="text-[#8f6f76] text-xs">•</span>
              <span className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-[#815432]">
                <span className="material-symbols-outlined text-[18px] text-[#2e8b57] filled">check</span>
                Clean room milled in certified kitchen
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feeding & Nutrition Story Bento */}
      <section className="w-full bg-[#e8f8ee]/50 py-12 my-6 border-y border-[#d6f5e3]">
        <div className="max-w-7xl mx-auto px-gutter md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wider font-bold">
                Tummy Love &amp; Simplicity
              </span>
              <h2 className="font-headline-xl text-headline-xl text-[#2f1401] mt-1 font-bold">
                Why Doctors &amp; Parents Choose {product.name}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#815432] max-w-md">
              Carefully dried at mild temperatures to lock in soluble fibers, minerals, and natural sweetness without caramelized heaviness.
            </p>
          </div>

          {/* Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#fffdf8] rounded-3xl p-6 shadow-[0_4px_16px_rgba(82,49,24,0.05)] flex flex-col justify-between border border-[#ffeade]">
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-full bg-[#d6f5e3] text-[#2e8b57] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px] filled">verified</span>
                </span>
                <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2.5 py-1 rounded-full font-bold">
                  Zero Additives
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-[#2f1401] mb-2 font-bold">
                  100% Raw Dried Nutrition
                </h3>
                <p className="font-body-md text-body-md text-[#815432]">
                  Nothing added, nothing stripped away. We peel, dehydrate gently at low heat, and mill down to an ultra-fine, silky baby-grade powder.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ffeade] flex items-center gap-2 text-[#2e8b57] font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>0% Maltodextrin or Starch Fillers</span>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-3xl p-6 shadow-[0_4px_16px_rgba(82,49,24,0.05)] flex flex-col justify-between border border-[#ffeade]">
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-full bg-[#ffe3d2] text-[#934a17] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">timer</span>
                </span>
                <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2.5 py-1 rounded-full font-bold">
                  Quick Routine
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-[#2f1401] mb-2 font-bold">
                  Ready in 3 Minutes
                </h3>
                <p className="font-body-md text-body-md text-[#815432]">
                  Whether you are at home or traveling, whisk 2 spoons into warm milk or water for a comforting, lump-free wholesome puree in seconds.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ffeade] flex items-center gap-2 text-[#934a17] font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[18px]">microwave</span>
                <span>Stove-top or Warm-Water Mixable</span>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-3xl p-6 shadow-[0_4px_16px_rgba(82,49,24,0.05)] flex flex-col justify-between border border-[#ffeade]">
              <div className="flex items-center justify-between mb-4">
                <span className="w-12 h-12 rounded-full bg-[#ffd9e1] text-[#ba005c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px] filled">favorite</span>
                </span>
                <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2.5 py-1 rounded-full font-bold">
                  First Tastes
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-[#2f1401] mb-2 font-bold">
                  Mild on Little Tum-Tums
                </h3>
                <p className="font-body-md text-body-md text-[#815432]">
                  Naturally rich in dietary fiber and essential minerals, gentle on developing intestines, aiding regular and comfortable digestion.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ffeade] flex items-center gap-2 text-[#ba005c] font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[18px]">spa</span>
                <span>Pediatrician-Approved Formula</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tabbed & Accordion Information Section */}
      <section className="w-full max-w-7xl mx-auto px-gutter md:px-margin py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Mascot / Emotional Note */}
          <div className="lg:col-span-4 bg-[#fffdf8] rounded-3xl p-6 shadow-[0_8px_24px_rgba(82,49,24,0.06)] flex flex-col items-center text-center border border-[#ffeade]">
            <div className="w-36 h-36 rounded-full bg-[#d6f5e3]/80 flex items-center justify-center mb-4 p-2 shadow-inner border-2 border-white">
              <img
                src={MONKEY_CHEF_AVATAR}
                alt="Chef Barnaby Monkey"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="font-label-sm text-label-sm text-[#2e8b57] bg-[#d6f5e3] px-3 py-1 rounded-full mb-2 font-bold">
              Chef Nibbles Promise
            </span>
            <h3 className="font-headline-md text-headline-md text-[#2f1401] mb-2 font-bold">
              Clean Food, Calm Hearts
            </h3>
            <p className="font-body-md text-body-md text-[#815432] mb-6">
              We source every single ingredient from certified organic smallholder farms. No shortcuts, no hidden syrups, just pure honest harvest.
            </p>

            {/* Nutrition Facts Quick Box */}
            <div className="w-full bg-[#faf7ee] rounded-2xl p-4 text-left border border-[#ffeade]">
              <h4 className="font-label-md text-label-md text-[#2f1401] mb-2 border-b border-[#ffeade] pb-1 font-bold">
                Typical Values (Per 100g)
              </h4>
              <div className="flex justify-between py-1 font-body-sm text-body-sm text-[#815432]">
                <span>Energy</span>
                <span className="font-bold text-[#2f1401]">{product.nutritionValues.energy}</span>
              </div>
              <div className="flex justify-between py-1 font-body-sm text-body-sm text-[#815432]">
                <span>Carbohydrates</span>
                <span className="font-bold text-[#2f1401]">{product.nutritionValues.carbs}</span>
              </div>
              <div className="flex justify-between py-1 font-body-sm text-body-sm text-[#815432]">
                <span>Natural Sugars</span>
                <span className="font-bold text-[#2f1401]">{product.nutritionValues.naturalSugars}</span>
              </div>
              <div className="flex justify-between py-1 font-body-sm text-body-sm text-[#815432]">
                <span>Dietary Fiber</span>
                <span className="font-bold text-[#2f1401]">{product.nutritionValues.fiber}</span>
              </div>
              <div className="flex justify-between py-1 font-body-sm text-body-sm text-[#815432]">
                <span>Protein</span>
                <span className="font-bold text-[#2f1401]">{product.nutritionValues.protein}</span>
              </div>
              <div className="flex justify-between py-1 font-body-sm text-body-sm text-[#815432]">
                <span>Key Micronutrient</span>
                <span className="font-bold text-[#2f1401]">{product.nutritionValues.keyMineral}</span>
              </div>
            </div>
          </div>

          {/* Right: Expandable Accordions */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <h2 className="font-headline-lg text-headline-lg text-[#2f1401] mb-2 font-bold">
              Product Information &amp; Guidelines
            </h2>

            {/* Accordion 1: About */}
            <div className="rounded-2xl bg-[#fffdf8] shadow-[0_4px_14px_rgba(82,49,24,0.04)] overflow-hidden border border-[#ffeade]">
              <button
                type="button"
                onClick={() => toggleAccordion('about')}
                className="w-full flex items-center justify-between p-5 text-left font-headline-sm text-headline-sm text-[#2f1401] hover:text-[#e80074] transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e80074]">info</span>
                  <span>About this Nibble</span>
                </span>
                <span className="material-symbols-outlined transition-transform duration-200">
                  {openAccordion === 'about' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'about' && (
                <div className="px-5 pb-5 font-body-md text-body-md text-[#815432]">
                  <p>
                    Smoothly milled from sun-ripened, naturally dried traditional ingredients. Created to offer a gentle, familiar sweet introduction for complementary feeding. It is non-acidic, hypoallergenic, and formulated to blend effortlessly without forming stubborn clumps.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Ingredients */}
            <div className="rounded-2xl bg-[#fffdf8] shadow-[0_4px_14px_rgba(82,49,24,0.04)] overflow-hidden border border-[#ffeade]">
              <button
                type="button"
                onClick={() => toggleAccordion('ingredients')}
                className="w-full flex items-center justify-between p-5 text-left font-headline-sm text-headline-sm text-[#2f1401] hover:text-[#e80074] transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#2e8b57]">nutrition</span>
                  <span>Ingredients (100% Transparency)</span>
                </span>
                <span className="material-symbols-outlined transition-transform duration-200">
                  {openAccordion === 'ingredients' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'ingredients' && (
                <div className="px-5 pb-5 font-body-md text-body-md text-[#815432]">
                  <div className="p-3 bg-[#d6f5e3]/50 rounded-xl mb-2">
                    <strong className="text-[#2f1401]">{product.ingredients}</strong>
                  </div>
                  <p>
                    Free from: Salt, Added Refined Cane Sugars, Preservatives, Hydrogenated Fats, Artificial Flavours, Milk Solids, and Bleaches. Cleanly dried at safe temperatures.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: How to Prepare */}
            <div className="rounded-2xl bg-[#fffdf8] shadow-[0_4px_14px_rgba(82,49,24,0.04)] overflow-hidden border border-[#ffeade]">
              <button
                type="button"
                onClick={() => toggleAccordion('prep')}
                className="w-full flex items-center justify-between p-5 text-left font-headline-sm text-headline-sm text-[#2f1401] hover:text-[#e80074] transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#934a17]">soup_kitchen</span>
                  <span>How to Prepare (Easy 3 Steps)</span>
                </span>
                <span className="material-symbols-outlined transition-transform duration-200">
                  {openAccordion === 'prep' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'prep' && (
                <div className="px-5 pb-5 font-body-md text-body-md text-[#815432]">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                    {product.preparationSteps.map((step, sIdx) => (
                      <div key={sIdx} className="bg-[#faf7ee] p-3 rounded-xl border border-[#ffeade]">
                        <span className="font-label-sm text-label-sm text-[#e80074] block mb-1 font-bold">
                          Step {sIdx + 1}
                        </span>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Suitable For */}
            <div className="rounded-2xl bg-[#fffdf8] shadow-[0_4px_14px_rgba(82,49,24,0.04)] overflow-hidden border border-[#ffeade]">
              <button
                type="button"
                onClick={() => toggleAccordion('suitable')}
                className="w-full flex items-center justify-between p-5 text-left font-headline-sm text-headline-sm text-[#2f1401] hover:text-[#e80074] transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#815432]">child_friendly</span>
                  <span>Suitable For</span>
                </span>
                <span className="material-symbols-outlined transition-transform duration-200">
                  {openAccordion === 'suitable' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'suitable' && (
                <div className="px-5 pb-5 font-body-md text-body-md text-[#815432]">
                  <p>
                    Recommended for babies <strong>{product.age}</strong> as complementary food alongside breastfeeding or formula feeding. Can also be blended into smoothies, pancake batters, or warm oatmeal bowls for toddlers.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 5: Storage Guidelines */}
            <div className="rounded-2xl bg-[#fffdf8] shadow-[0_4px_14px_rgba(82,49,24,0.04)] overflow-hidden border border-[#ffeade]">
              <button
                type="button"
                onClick={() => toggleAccordion('storage')}
                className="w-full flex items-center justify-between p-5 text-left font-headline-sm text-headline-sm text-[#2f1401] hover:text-[#e80074] transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#934a17]">inventory_2</span>
                  <span>Storage Guidelines</span>
                </span>
                <span className="material-symbols-outlined transition-transform duration-200">
                  {openAccordion === 'storage' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'storage' && (
                <div className="px-5 pb-5 font-body-md text-body-md text-[#815432]">
                  <p>
                    Store in a cool, dry place away from direct sunlight. Once opened, seal the zip-lock securely or transfer to an airtight glass container. Consume within 30 days for maximum nutrient vitality and aroma. Always use a dry spoon.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 6: Product Standards */}
            <div className="rounded-2xl bg-[#fffdf8] shadow-[0_4px_14px_rgba(82,49,24,0.04)] overflow-hidden border border-[#ffeade]">
              <button
                type="button"
                onClick={() => toggleAccordion('standards')}
                className="w-full flex items-center justify-between p-5 text-left font-headline-sm text-headline-sm text-[#2f1401] hover:text-[#e80074] transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#2e8b57]">fact_check</span>
                  <span>Product Information &amp; Standards</span>
                </span>
                <span className="material-symbols-outlined transition-transform duration-200">
                  {openAccordion === 'standards' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'standards' && (
                <div className="px-5 pb-5 font-body-md text-body-md text-[#815432]">
                  <ul className="flex flex-col gap-1.5 text-sm">
                    <li><strong>Net Quantity:</strong> {product.weight}</li>
                    <li><strong>Shelf Life:</strong> 6 Months from manufacture date</li>
                    <li><strong>Country of Origin:</strong> Proudly Made in India</li>
                    <li><strong>Manufacturing:</strong> FSSAI Certified Infant Safe Facility</li>
                    <li><strong>Allergen Caution:</strong> Processed in a dedicated facility free from peanuts and soy.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products / Pairs Well With */}
      <section className="w-full max-w-7xl mx-auto px-gutter md:px-margin py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wider font-bold">
              Expand Baby's Palette
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] mt-1 font-bold">
              Pairs Well With
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="font-label-md text-label-md text-[#e80074] hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <span>View All Blends</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="group bg-[#fffdf8] rounded-3xl p-5 shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] hover:shadow-lg transition-all flex flex-col justify-between border border-[#ffeade]"
            >
              <div>
                <div
                  className="relative w-full aspect-square rounded-2xl bg-[#e8f8ee]/60 flex items-center justify-center p-6 mb-4 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(rel)}
                >
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-[11px] font-bold">
                    {rel.age}
                  </span>
                  <img
                    alt={rel.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    src={rel.imageUrl}
                  />
                </div>
                <span className="font-label-sm text-label-sm text-[#934a17] font-bold">
                  {rel.badge || rel.category}
                </span>
                <h3
                  className="font-headline-sm text-headline-sm text-[#2f1401] mt-0.5 font-bold hover:text-[#e80074] cursor-pointer"
                  onClick={() => onSelectProduct(rel)}
                >
                  {rel.name}
                </h3>
                <p className="font-body-sm text-body-sm text-[#815432] mt-1 line-clamp-2">
                  {rel.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#ffeade] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md text-[#2f1401] font-bold">
                    ₹{rel.price}
                  </span>
                  <span className="font-body-sm text-body-sm text-[#8f6f76] line-through text-xs">
                    ₹{rel.mrp}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(rel, 1)}
                  className="px-4 py-2 rounded-full bg-[#faf7ee] hover:bg-[#e80074] hover:text-white text-[#2f1401] font-label-md text-label-md transition-all flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Purchase Bar (Mobile only) */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffdf8]/95 backdrop-blur-md p-3 border-t border-[#ffeade] shadow-[0_-4px_20px_rgba(82,49,24,0.12)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-[#2f1401] leading-tight font-bold">
              {product.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-headline-md text-[#e80074] font-extrabold leading-none">
                ₹{totalPrice}
              </span>
              <span className="font-body-sm text-body-sm text-[#815432] text-xs">
                {selectedPack}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product, quantity, selectedPack, currentUnitPrice)}
            className="flex-1 max-w-[200px] flex items-center justify-center gap-1 bg-[#e80074] text-white py-3 px-4 rounded-full font-headline-sm text-headline-sm shadow-md active:scale-95 transition-transform font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Add to Cart</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

import React, { useRef } from 'react';
import { Product } from '../types';
import { PRODUCTS, MONKEY_MASCOT_TASTING, HEALTH_MIX_IMAGE } from '../data/products';
import { useCart } from '../context/CartContext';

interface ShopByAgePageProps {
  onSelectProduct: (product: Product) => void;
  onOpenQuiz: () => void;
}

export const ShopByAgePage: React.FC<ShopByAgePageProps> = ({
  onSelectProduct,
  onOpenQuiz,
}) => {
  const { addToCart } = useCart();
  const stage6Ref = useRef<HTMLDivElement>(null);
  const stage8Ref = useRef<HTMLDivElement>(null);
  const stage12Ref = useRef<HTMLDivElement>(null);

  const scrollToStage = (stage: '6m' | '8m' | '12m') => {
    if (stage === '6m' && stage6Ref.current) {
      stage6Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (stage === '8m' && stage8Ref.current) {
      stage8Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (stage === '12m' && stage12Ref.current) {
      stage12Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter products by stages
  const stage1Products = PRODUCTS.filter((p) => p.age === '6+ Months');
  const stage2HealthMix = PRODUCTS.find((p) => p.id === 2)!;
  const stage3Kadle = PRODUCTS.find((p) => p.id === 6)!;
  const stage3Nuts = PRODUCTS.find((p) => p.id === 7)!;

  return (
    <div className="flex flex-col w-full">
      {/* Interactive Stage Fast-Nav Sticky Anchor Bar */}
      <div className="sticky top-20 z-40 bg-[#fffdf8]/90 backdrop-blur-md py-space-sm px-gutter shadow-[0_8px_24px_-4px_rgba(82,49,24,0.05)] border-b border-[#ffeade]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[#e80074] text-[20px]">explore</span>
            <span className="font-label-md text-label-md text-[#2f1401] font-bold">
              Jump to Developmental Stage:
            </span>
          </div>

          <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => scrollToStage('6m')}
              className="px-space-md py-space-xs rounded-full font-label-md text-label-md bg-[#d6f5e3] text-[#2e8b57] hover:bg-[#e8f8ee] transition-all flex items-center gap-space-xs whitespace-nowrap shadow-sm font-bold cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2e8b57] inline-block" />
              <span>Stage 1 · 6+ Months</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToStage('8m')}
              className="px-space-md py-space-xs rounded-full font-label-md text-label-md bg-[#ffeade] text-[#7a4e2d] hover:bg-[#ffe3d2] transition-all flex items-center gap-space-xs whitespace-nowrap shadow-sm font-bold cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#b2622e] inline-block" />
              <span>Stage 2 · 8+ Months</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToStage('12m')}
              className="px-space-md py-space-xs rounded-full font-label-md text-label-md bg-[#ffdcc6] text-[#934a17] hover:bg-[#ffd1b3] transition-all flex items-center gap-space-xs whitespace-nowrap shadow-sm font-bold cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#934a17] inline-block" />
              <span>Stage 3 · 12+ Months</span>
            </button>
          </div>
        </div>
      </div>

      {/* Header Discovery Showcase */}
      <section className="relative px-gutter md:px-margin max-w-7xl mx-auto w-full pt-space-lg pb-space-xl">
        <div className="relative bg-gradient-to-br from-[#e8f8ee] via-[#fffdf8] to-[#fff1ea] rounded-3xl p-space-lg md:p-space-xl overflow-hidden shadow-[0_16px_40px_-8px_rgba(82,49,24,0.06)] border border-[#ffeade]">
          {/* Playful Organic Blob Accents */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#d6f5e3]/50 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-48 h-48 rounded-full bg-[#ffeade]/60 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-[#fffdf8] w-fit shadow-sm border border-[#ffeade]">
                <span className="material-symbols-outlined text-[#e80074] text-[18px] filled">verified</span>
                <span className="font-label-sm text-label-sm text-[#2f1401] uppercase tracking-wider font-bold">
                  Pediatric Nutritionist Curated
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg text-[#2f1401] tracking-tight font-extrabold">
                Find their <span className="text-[#e80074] relative">
                  Nibble
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-[#ffc299] -z-10"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 12"
                  >
                    <path d="M0,7 Q50,0 100,7" fill="none" stroke="currentColor" strokeWidth="6" />
                  </svg>
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-[#815432] max-w-2xl">
                Choose their stage and discover products made to fit their food journey. From first gentle cereal sips to textured grain spoonfuls and toddler table crunchers.
              </p>

              {/* Milestone Tracker Bar */}
              <div className="mt-space-md pt-space-md grid grid-cols-3 gap-space-sm max-w-xl">
                <div
                  onClick={() => scrollToStage('6m')}
                  className="bg-[#fffdf8]/90 p-space-sm rounded-2xl flex items-center gap-space-xs border border-[#ffeade] shadow-sm cursor-pointer hover:bg-white transition-all"
                >
                  <span className="w-8 h-8 rounded-full bg-[#d6f5e3] flex items-center justify-center text-[#2e8b57] font-headline-sm text-headline-sm font-bold">
                    1
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm text-[#2f1401] leading-tight font-bold">6+ Mo</p>
                    <p className="font-body-sm text-body-sm text-[#815432] leading-none text-xs">First Tastes</p>
                  </div>
                </div>

                <div
                  onClick={() => scrollToStage('8m')}
                  className="bg-[#fffdf8]/90 p-space-sm rounded-2xl flex items-center gap-space-xs border border-[#ffeade] shadow-sm cursor-pointer hover:bg-white transition-all"
                >
                  <span className="w-8 h-8 rounded-full bg-[#ffc299]/50 flex items-center justify-center text-[#934a17] font-headline-sm text-headline-sm font-bold">
                    2
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm text-[#2f1401] leading-tight font-bold">8+ Mo</p>
                    <p className="font-body-sm text-body-sm text-[#815432] leading-none text-xs">Exploring Mash</p>
                  </div>
                </div>

                <div
                  onClick={() => scrollToStage('12m')}
                  className="bg-[#fffdf8]/90 p-space-sm rounded-2xl flex items-center gap-space-xs border border-[#ffeade] shadow-sm cursor-pointer hover:bg-white transition-all"
                >
                  <span className="w-8 h-8 rounded-full bg-[#ffdcc6] flex items-center justify-center text-[#b2622e] font-headline-sm text-headline-sm font-bold">
                    3
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm text-[#2f1401] leading-tight font-bold">12+ Mo</p>
                    <p className="font-body-sm text-body-sm text-[#815432] leading-none text-xs">Table Finger-Bites</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mascot Visual */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#e8f8ee]/80 animate-pulse" />
                <div className="relative z-10 w-56 h-56 rounded-full overflow-hidden shadow-[0_12px_36px_-6px_rgba(82,49,24,0.15)] bg-[#fffdf8] flex items-center justify-center p-space-sm border-4 border-white">
                  <img
                    alt="Cheerful Nibbles Baby Monkey tasting baby food"
                    className="w-full h-full object-contain"
                    src={MONKEY_MASCOT_TASTING}
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-[#e80074] text-white font-label-sm text-label-sm px-space-sm py-space-xs rounded-full shadow-lg font-bold">
                  Yum tested! 🍌
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 1: 6+ MONTHS (FIRST NIBBLES)
      =========================================== */}
      <section
        ref={stage6Ref}
        className="scroll-mt-36 px-gutter md:px-margin max-w-7xl mx-auto w-full mb-space-xl"
        id="stage-6m"
      >
        <div className="bg-[#e8f8ee] rounded-3xl p-space-lg md:p-space-xl relative shadow-[0_12px_36px_-8px_rgba(46,139,87,0.08)] border border-[#d6f5e3]">
          {/* Stage Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg pb-space-md border-b border-[#d6f5e3]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-space-sm mb-space-xs">
                <span className="px-space-md py-0.5 rounded-full bg-[#2e8b57] text-white font-label-md text-label-md shadow-sm font-bold">
                  Stage 1 · 6+ Months
                </span>
                <span className="font-label-sm text-label-sm text-[#2e8b57] font-bold">
                  Gentle Single &amp; Dual Introductions
                </span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
                First Nibbles: Smooth &amp; Tender
              </h2>
              <p className="font-body-md text-body-md text-[#815432] mt-space-xs">
                For babies beginning their complementary food journey. Single-grain smooth porridges and gentle fruit &amp; grain introductions designed for tiny developing tummies.
              </p>
            </div>

            <div className="flex items-center gap-space-xs bg-[#fffdf8]/90 px-space-md py-space-sm rounded-2xl shadow-sm border border-[#d6f5e3]">
              <span className="material-symbols-outlined text-[#2e8b57] filled">check_circle</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">
                  Doctor Approved Texture
                </span>
                <span className="font-body-sm text-body-sm text-[#815432]">
                  Ultra-fine silk sieve grind
                </span>
              </div>
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-lg">
            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#d6f5e3]">
              <div className="w-12 h-12 rounded-full bg-[#d6f5e3] flex items-center justify-center text-[#2e8b57] shrink-0">
                <span className="material-symbols-outlined">waves</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Silky Smooth Textures
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Zero lumps to ensure seamless swallow reflex training.
                </p>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#d6f5e3]">
              <div className="w-12 h-12 rounded-full bg-[#d6f5e3] flex items-center justify-center text-[#2e8b57] shrink-0">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Single Allergen Intro
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Easy symptom tracking with pure unadulterated base grains.
                </p>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#d6f5e3]">
              <div className="w-12 h-12 rounded-full bg-[#d6f5e3] flex items-center justify-center text-[#2e8b57] shrink-0">
                <span className="material-symbols-outlined filled">favorite</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Gentle Digestion
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Sprouted whole millets and tubers gentle on immature gut.
                </p>
              </div>
            </div>
          </div>

          {/* Stage 1 Curated Product Grid (10 Products) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-space-md">
            {stage1Products.map((p) => (
              <div
                key={p.id}
                className="bg-[#fffdf8] rounded-2xl p-space-sm flex flex-col justify-between shadow-[0_8px_20px_-4px_rgba(82,49,24,0.06)] hover:-translate-y-1 transition-transform group border border-[#d6f5e3]"
              >
                <div
                  className="relative w-full aspect-square rounded-xl bg-[#fff1ea] overflow-hidden flex items-center justify-center p-2 mb-space-sm cursor-pointer"
                  onClick={() => onSelectProduct(p)}
                >
                  <img
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    src={p.imageUrl}
                  />
                  <span className="absolute top-2 left-2 bg-[#fffdf8]/90 text-[#2e8b57] font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                    6m+
                  </span>
                </div>

                <div
                  className="flex flex-col flex-1 cursor-pointer"
                  onClick={() => onSelectProduct(p)}
                >
                  <div className="flex items-center gap-1 text-[#b2622e] mb-1">
                    <span className="material-symbols-outlined text-[15px] filled">star</span>
                    <span className="font-label-sm text-label-sm font-bold">{p.rating}</span>
                    <span className="text-[#815432] font-body-sm text-[12px]">({p.reviewsCount})</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-[#2f1401] leading-tight font-bold group-hover:text-[#e80074] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#815432] mt-0.5 line-clamp-1">
                    {p.desc}
                  </p>
                  <span className="font-label-sm text-label-sm text-[#815432] mt-1">
                    {p.weight} Pouch
                  </span>
                </div>

                <div className="mt-space-sm pt-space-xs flex items-center justify-between border-t border-[#ffeade]/60">
                  <span className="font-headline-md text-headline-md text-[#2f1401] font-bold">
                    ₹{p.price}
                  </span>
                  <button
                    aria-label={`Add ${p.name} to cart`}
                    type="button"
                    onClick={() => addToCart(p, 1)}
                    className="w-9 h-9 rounded-full bg-[#e80074] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stage Bottom Action Bar */}
          <div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-[#d6f5e3]">
            <p className="font-body-sm text-body-sm text-[#815432]">
              Showing {stage1Products.length} single &amp; gentle dual recipes created for 6–8 month beginnings.
            </p>
            <button
              type="button"
              onClick={() => scrollToStage('6m')}
              className="px-space-lg py-space-sm rounded-full bg-[#2e8b57] text-white font-label-md text-label-md hover:opacity-95 shadow-md flex items-center gap-space-xs transition-all font-bold cursor-pointer"
            >
              <span>Shop All 6+ Months</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: 8+ MONTHS (TINY EXPLORERS)
      =========================================== */}
      <section
        ref={stage8Ref}
        className="scroll-mt-36 px-gutter md:px-margin max-w-7xl mx-auto w-full mb-space-xl"
        id="stage-8m"
      >
        <div className="bg-[#fff1ea] rounded-3xl p-space-lg md:p-space-xl relative shadow-[0_12px_36px_-8px_rgba(122,78,45,0.08)] border border-[#ffeade]">
          {/* Stage Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg pb-space-md border-b border-[#ffeade]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-space-sm mb-space-xs">
                <span className="px-space-md py-0.5 rounded-full bg-[#b2622e] text-white font-label-md text-label-md shadow-sm font-bold">
                  Stage 2 · 8+ Months
                </span>
                <span className="font-label-sm text-label-sm text-[#934a17] font-bold">
                  Multi-Grain Mash &amp; Chewing Milestones
                </span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
                Tiny Explorers: Composite Blends
              </h2>
              <p className="font-body-md text-body-md text-[#815432] mt-space-xs">
                For little ones exploring more variety and composite grains. Heartier textures supporting gradual chewing development and longer energy release during active crawl times.
              </p>
            </div>

            <div className="flex items-center gap-space-xs bg-[#fffdf8]/90 px-space-md py-space-sm rounded-2xl shadow-sm border border-[#ffeade]">
              <span className="material-symbols-outlined text-[#934a17]">dinner_dining</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">
                  Hearty Porridge
                </span>
                <span className="font-body-sm text-body-sm text-[#815432]">
                  Slow-burning macro nutrients
                </span>
              </div>
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-lg">
            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#ffeade]">
              <div className="w-12 h-12 rounded-full bg-[#ffeade] flex items-center justify-center text-[#934a17] shrink-0">
                <span className="material-symbols-outlined">grain</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Thicker Mash Consistency
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Prepares baby for soft family meal textures.
                </p>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#ffeade]">
              <div className="w-12 h-12 rounded-full bg-[#ffeade] flex items-center justify-center text-[#934a17] shrink-0">
                <span className="material-symbols-outlined">interests</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Multi-Grain Richness
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Sprouted millets, pulses, and traditional energy boosters.
                </p>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#ffeade]">
              <div className="w-12 h-12 rounded-full bg-[#ffeade] flex items-center justify-center text-[#934a17] shrink-0">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Energy Dense Meals
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Sustains high activity, sitting, and creeping explorers.
                </p>
              </div>
            </div>
          </div>

          {/* Stage 2 Bento Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            {/* Spotlight Card */}
            <div className="lg:col-span-6 bg-[#fffdf8] rounded-3xl p-space-md md:p-space-lg shadow-[0_10px_30px_-4px_rgba(82,49,24,0.08)] flex flex-col md:flex-row gap-space-md items-center border border-[#ffeade]">
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 bg-[#fff1ea] rounded-2xl p-2 flex items-center justify-center cursor-pointer"
                onClick={() => onSelectProduct(stage2HealthMix)}
              >
                <img
                  alt={stage2HealthMix.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                  src={HEALTH_MIX_IMAGE}
                />
                <span className="absolute top-2 left-2 bg-[#b2622e] text-white font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                  Flagship
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 text-[#b2622e] mb-1">
                  <span className="material-symbols-outlined text-[16px] filled">star</span>
                  <span className="font-label-sm text-label-sm font-bold">4.9</span>
                  <span className="text-[#815432] font-body-sm text-[12px]">(320+ reviews)</span>
                </div>
                <h3
                  className="font-headline-md text-headline-md text-[#2f1401] leading-snug font-bold hover:text-[#e80074] cursor-pointer transition-colors"
                  onClick={() => onSelectProduct(stage2HealthMix)}
                >
                  Health Mix Powder
                </h3>
                <p className="font-body-md text-body-md text-[#815432] mt-1">
                  Multi-grain wholesome powerhouse crafted with 14 sprouted seeds, grains, and toasted pulses.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-label-sm font-bold">
                    No Preservatives
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffeade] text-[#934a17] font-label-sm text-label-sm font-bold">
                    Sprouted
                  </span>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-[#ffeade]">
                  <div>
                    <span className="font-label-sm text-label-sm text-[#815432] block">400g Family Pack</span>
                    <span className="font-headline-xl text-headline-xl text-[#2f1401] leading-none font-extrabold">
                      ₹{stage2HealthMix.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(stage2HealthMix, 1)}
                    className="px-space-md py-space-xs rounded-full bg-[#e80074] text-white font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recipe & Meal Feature Card */}
            <div className="lg:col-span-6 bg-[#fffdf8]/80 rounded-3xl p-space-md md:p-space-lg flex flex-col justify-between h-full border border-[#ffeade]">
              <div>
                <div className="flex items-center gap-space-xs text-[#934a17] mb-space-xs">
                  <span className="material-symbols-outlined">menu_book</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    Kitchen Inspiration
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-[#2f1401] mb-space-xs font-bold">
                  How to Prepare 8+ Month Porridge
                </h4>
                <p className="font-body-md text-body-md text-[#815432] mb-space-md">
                  Whisk 2 heaped tablespoons of Health Mix with 150ml of lukewarm water or breastmilk. Simmer on low heat for 5 minutes until it achieves a soft velvet ribbon consistency.
                </p>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="bg-[#fff1ea] p-space-sm rounded-xl">
                    <p className="font-label-sm text-label-sm text-[#2f1401] font-bold">Prep Time</p>
                    <p className="font-body-sm text-body-sm text-[#815432]">5 Mins Gentle Simmer</p>
                  </div>
                  <div className="bg-[#fff1ea] p-space-sm rounded-xl">
                    <p className="font-label-sm text-label-sm text-[#2f1401] font-bold">Serving Size</p>
                    <p className="font-body-sm text-body-sm text-[#815432]">1/2 Cup Warm Mash</p>
                  </div>
                </div>
              </div>

              <div className="mt-space-md pt-space-sm flex justify-end">
                <button
                  type="button"
                  onClick={() => addToCart(stage2HealthMix, 1)}
                  className="px-space-lg py-space-sm rounded-full bg-[#b2622e] text-white font-label-md text-label-md hover:opacity-95 shadow-md flex items-center gap-space-xs transition-all font-bold cursor-pointer"
                >
                  <span>Shop 8+ Months</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: 12+ MONTHS (GROWING NIBBLES)
      =========================================== */}
      <section
        ref={stage12Ref}
        className="scroll-mt-36 px-gutter md:px-margin max-w-7xl mx-auto w-full mb-space-xl"
        id="stage-12m"
      >
        <div className="bg-[#ffeade] rounded-3xl p-space-lg md:p-space-xl relative shadow-[0_12px_36px_-8px_rgba(147,74,23,0.08)] border border-[#ffc299]">
          {/* Stage Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg pb-space-md border-b border-[#ffc299]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-space-sm mb-space-xs">
                <span className="px-space-md py-0.5 rounded-full bg-[#934a17] text-white font-label-md text-label-md shadow-sm font-bold">
                  Stage 3 · 12+ Months
                </span>
                <span className="font-label-sm text-label-sm text-[#934a17] font-bold">
                  Toddler Finger Skills &amp; Nutrient Boosters
                </span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
                Growing Nibbles: Textures &amp; Crunch
              </h2>
              <p className="font-body-md text-body-md text-[#815432] mt-space-xs">
                For toddlers ready for additional food options, self-feeding chew practice, savory finger snacks, and wholesome dense nutrient boosters for daily porridge or smoothies.
              </p>
            </div>

            <div className="flex items-center gap-space-xs bg-[#fffdf8]/90 px-space-md py-space-sm rounded-2xl shadow-sm border border-[#ffc299]">
              <span className="material-symbols-outlined text-[#934a17]">bakery_dining</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#2f1401] font-bold">
                  Pincer Grasp Ready
                </span>
                <span className="font-body-sm text-body-sm text-[#815432]">
                  Encourages independent bites
                </span>
              </div>
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#ffc299]">
              <div className="w-12 h-12 rounded-full bg-[#ffc299]/40 flex items-center justify-center text-[#934a17] shrink-0">
                <span className="material-symbols-outlined">pan_tool_alt</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Finger-Food Fine Motor Mastery
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Snacks crafted with melt-in-mouth dissolve properties that prevent choking hazards.
                </p>
              </div>
            </div>

            <div className="bg-[#fffdf8] rounded-2xl p-space-md flex items-center gap-space-sm shadow-sm border border-[#ffc299]">
              <div className="w-12 h-12 rounded-full bg-[#ffc299]/40 flex items-center justify-center text-[#934a17] shrink-0">
                <span className="material-symbols-outlined">vital_signs</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Nutritious Porridge &amp; Milk Additions
                </h4>
                <p className="font-body-sm text-body-sm text-[#815432]">
                  Micro-milled nuts and seeds loaded with plant omega-3 and brain-supporting fats.
                </p>
              </div>
            </div>
          </div>

          {/* Stage 3 Curated Products Grid (2 Products) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Product: Kadle */}
            <div className="bg-[#fffdf8] rounded-3xl p-space-md shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col sm:flex-row gap-space-md items-center group border border-[#ffc299]">
              <div
                className="relative w-44 h-44 shrink-0 bg-[#fff1ea] rounded-2xl p-2 flex items-center justify-center cursor-pointer"
                onClick={() => onSelectProduct(stage3Kadle)}
              >
                <img
                  alt={stage3Kadle.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  src={stage3Kadle.imageUrl}
                />
                <span className="absolute top-2 left-2 bg-[#934a17] text-white font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                  12m+
                </span>
              </div>

              <div className="flex flex-col flex-1 w-full">
                <div className="flex items-center gap-1 text-[#b2622e] mb-1">
                  <span className="material-symbols-outlined text-[15px] filled">star</span>
                  <span className="font-label-sm text-label-sm font-bold">4.8</span>
                  <span className="text-[#815432] font-body-sm text-[12px]">(94 reviews)</span>
                </div>
                <h3
                  className="font-headline-md text-headline-md text-[#2f1401] font-bold hover:text-[#e80074] cursor-pointer transition-colors"
                  onClick={() => onSelectProduct(stage3Kadle)}
                >
                  Kadle Snack Bites
                </h3>
                <p className="font-body-md text-body-md text-[#815432] mt-0.5">
                  Baby-friendly wholesome roasted crunchy snack. Gently stone-ground roasted split Bengal gram, mild and crisp.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffeade] text-[#5b3f46] font-label-sm text-label-sm font-bold">
                    High Fiber
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffeade] text-[#5b3f46] font-label-sm text-label-sm font-bold">
                    Zero Salt
                  </span>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-[#ffeade]">
                  <div>
                    <span className="font-label-sm text-label-sm text-[#815432] block">150g Pouch</span>
                    <span className="font-headline-lg text-headline-lg text-[#2f1401] leading-none font-bold">
                      ₹{stage3Kadle.price}
                    </span>
                  </div>
                  <button
                    aria-label="Add Kadle to cart"
                    type="button"
                    onClick={() => addToCart(stage3Kadle, 1)}
                    className="px-space-md py-space-xs rounded-full bg-[#e80074] text-white font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product: Nuts Crushed */}
            <div className="bg-[#fffdf8] rounded-3xl p-space-md shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col sm:flex-row gap-space-md items-center group border border-[#ffc299]">
              <div
                className="relative w-44 h-44 shrink-0 bg-[#fff1ea] rounded-2xl p-2 flex items-center justify-center cursor-pointer"
                onClick={() => onSelectProduct(stage3Nuts)}
              >
                <img
                  alt={stage3Nuts.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  src={stage3Nuts.imageUrl}
                />
                <span className="absolute top-2 left-2 bg-[#934a17] text-white font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                  12m+
                </span>
              </div>

              <div className="flex flex-col flex-1 w-full">
                <div className="flex items-center gap-1 text-[#b2622e] mb-1">
                  <span className="material-symbols-outlined text-[15px] filled">star</span>
                  <span className="font-label-sm text-label-sm font-bold">5.0</span>
                  <span className="text-[#815432] font-body-sm text-[12px]">(240 reviews)</span>
                </div>
                <h3
                  className="font-headline-md text-headline-md text-[#2f1401] font-bold hover:text-[#e80074] cursor-pointer transition-colors"
                  onClick={() => onSelectProduct(stage3Nuts)}
                >
                  Nuts Crushed
                </h3>
                <p className="font-body-md text-body-md text-[#815432] mt-0.5">
                  Finely milled booster for toddler porridge, pancakes, and smoothies. Blend of California almonds, pistachios, and walnuts.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffeade] text-[#5b3f46] font-label-sm text-label-sm font-bold">
                    Brain Healthy
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffeade] text-[#5b3f46] font-label-sm text-label-sm font-bold">
                    Micro-Fine
                  </span>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-[#ffeade]">
                  <div>
                    <span className="font-label-sm text-label-sm text-[#815432] block">150g Jar</span>
                    <span className="font-headline-lg text-headline-lg text-[#2f1401] leading-none font-bold">
                      ₹{stage3Nuts.price}
                    </span>
                  </div>
                  <button
                    aria-label="Add Nuts Crushed to cart"
                    type="button"
                    onClick={() => addToCart(stage3Nuts, 1)}
                    className="px-space-md py-space-xs rounded-full bg-[#e80074] text-white font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Bottom Action Bar */}
          <div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-[#ffc299]">
            <p className="font-body-sm text-body-sm text-[#815432]">
              Ready to graduate to toddler table foods? These wholesome boosters ensure daily nutrition goals.
            </p>
            <button
              type="button"
              onClick={() => scrollToStage('12m')}
              className="px-space-lg py-space-sm rounded-full bg-[#934a17] text-white font-label-md text-label-md hover:opacity-95 shadow-md flex items-center gap-space-xs transition-all font-bold cursor-pointer"
            >
              <span>Shop 12+ Months</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Stage Consultation Banner */}
      <section className="px-gutter md:px-margin max-w-7xl mx-auto w-full mb-space-xl">
        <div className="bg-gradient-to-r from-[#faf7ee] to-[#d6f5e3] rounded-3xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm border border-[#ffeade]">
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#e80074] shrink-0 shadow-sm border border-[#ffeade]">
              <span className="material-symbols-outlined text-[28px]">contact_support</span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-[#2f1401] font-bold">
                Unsure which stage fits your little one?
              </h4>
              <p className="font-body-sm text-body-sm text-[#815432]">
                Take our 60-second gentle weaning assessment or connect with a certified infant pediatric nutritionist.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-space-md py-space-xs rounded-full bg-[#fffdf8] text-[#2f1401] font-label-md text-label-md hover:bg-[#ffeade] transition-colors shadow-sm font-bold cursor-pointer border border-[#ffeade]"
            >
              Take 60s Quiz
            </button>
            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-space-md py-space-xs rounded-full bg-[#e80074] text-white font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-md font-bold cursor-pointer"
            >
              Chat With Dietitian
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

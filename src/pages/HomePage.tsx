import React, { useState } from 'react';
import { PageRoute, Product } from '../types';
import { PRODUCTS, MONKEY_MASCOT_EATING, BANANA_POUCH_IMAGE, MONKEY_MASCOT_BARNABY } from '../data/products';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  setCurrentPage: (page: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
  onSelectStage: (stage: '6m' | '8m' | '12m') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onSelectProduct,
  onSelectStage,
}) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const featuredProducts = PRODUCTS.slice(0, 4);

  const filteredCatalog = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (selectedCategory === 'single') return p.category === 'Single Ingredient';
        if (selectedCategory === 'fruit-grain') return p.category === 'Fruit & Grain';
        if (selectedCategory === 'multigrain') return p.category === 'Grain & Multigrain';
        if (selectedCategory === 'boosters') return p.category === 'Nutrition Boosters';
        if (selectedCategory === 'snacks') return p.category === 'Baby Snacks';
        return true;
      });

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#e8f8ee] px-gutter md:px-margin py-space-xl">
        {/* Ambient Organic Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#d6f5e3]/80 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-[#ffe3d2]/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
            {/* Floating Pill Badge */}
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-[#fffdf8] shadow-[0_6px_20px_-2px_rgba(82,49,24,0.08)]">
              <span className="text-[18px]">🌱</span>
              <span className="font-label-md text-label-md text-[#2e8b57] font-bold">
                100% Organic &amp; Wholesome
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2e8b57]" />
              <span className="font-label-sm text-label-sm text-[#815432]">
                Baby-Safe Certified
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg text-[#2f1401] tracking-tight">
              Little Nibbles.<br />
              <span className="text-[#e80074]">Big Growing Moments.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-[#815432] max-w-xl">
              Wholesome food mixes made for tiny tummies and growing adventures. Gentle single grains, natural fruit purees, and traditional nourishing blends.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                type="button"
                onClick={() => setCurrentPage('shop')}
                className="inline-flex items-center justify-center gap-space-xs px-8 py-3.5 rounded-full bg-[#e80074] text-white font-label-lg text-label-lg shadow-[0_8px_20px_rgba(232,0,116,0.32)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
              >
                <span>Shop Nibbles</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage('shop-by-age')}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#fffdf8] text-[#815432] font-label-lg text-label-lg shadow-[0_4px_16px_rgba(82,49,24,0.06)] hover:bg-[#faf7ee] hover:text-[#2f1401] transition-colors cursor-pointer font-bold"
              >
                Shop by Age
              </button>
            </div>

            {/* Trust Badges Under Hero */}
            <div className="flex flex-wrap items-center gap-space-md sm:gap-space-lg pt-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[#2e8b57] text-[20px] filled">check</span>
                <span className="font-label-sm text-label-sm text-[#815432]">Zero Added Sugar</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[#2e8b57] text-[20px] filled">check</span>
                <span className="font-label-sm text-label-sm text-[#815432]">Gentle Digestion</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[#2e8b57] text-[20px] filled">check</span>
                <span className="font-label-sm text-label-sm text-[#815432]">Sun-Dried Organics</span>
              </div>
            </div>
          </div>

          {/* Right Mascot + Product Visual Montage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Circular Soft Backdrop Card */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-[3rem] bg-[#fffdf8]/95 shadow-[0_20px_50px_-10px_rgba(82,49,24,0.12)] p-space-md flex flex-col justify-between overflow-hidden border border-[#ffeade]/60">
              {/* Top Deco Tag */}
              <div className="flex items-center justify-between z-20">
                <span className="px-space-sm py-space-xs bg-[#d6f5e3] text-[#2e8b57] rounded-full font-label-sm text-label-sm font-bold">
                  🍌 Stage 1 Gentle Mix
                </span>
                <span className="material-symbols-outlined text-[#e80074] text-[24px] filled">
                  favorite
                </span>
              </div>

              {/* Product Pouch + Mascot Duo Overlap */}
              <div className="relative flex items-center justify-center my-auto">
                {/* Baby pouch image */}
                <img
                  alt="Nibbles Organic Baby Food Blend Packaging"
                  className="w-48 sm:w-56 h-auto drop-shadow-2xl z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-300 cursor-pointer"
                  src={BANANA_POUCH_IMAGE}
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                />

                {/* Cute Monkey Mascot Overlay */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 w-32 sm:w-36 h-32 sm:h-36 rounded-full bg-[#faf7ee] p-1 shadow-[0_8px_24px_rgba(82,49,24,0.15)] z-20 border-2 border-white">
                  <img
                    alt="Happy Nibbles Baby Monkey mascot eating porridge with spoon"
                    className="w-full h-full rounded-full object-cover"
                    src={MONKEY_MASCOT_EATING}
                  />
                </div>

                {/* Floating Sticker */}
                <div className="absolute -top-3 -left-2 bg-[#ffc299] text-[#7a4e2d] px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-md flex items-center gap-1 z-30 font-bold">
                  <span>🌾</span>
                  <span>100% Sprouted</span>
                </div>
              </div>

              {/* Card Base Note */}
              <div className="z-20 bg-[#faf7ee]/90 backdrop-blur rounded-2xl p-space-sm flex items-center justify-between border border-[#ffeade]">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-[#2f1401] font-bold">Banana &amp; Oat Blend</span>
                  <span className="font-body-sm text-body-sm text-[#815432]">Ready in 2 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-[#e80074] font-bold">₹249</span>
                  <button
                    onClick={() => addToCart(PRODUCTS[0], 1)}
                    className="w-8 h-8 rounded-full bg-[#e80074] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    title="Quick Add"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY AGE SECTION */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#fff8f5]" id="shop-by-age">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wider font-bold">
              Milestone Milestones
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
              Find the right Nibble for their age
            </h2>
            <p className="font-body-md text-body-md text-[#815432]">
              Nutritional stage-appropriate blends crafted for developmental milestones and tiny emerging teeth.
            </p>
          </div>

          {/* 3 Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Stage 1: 6+ Months */}
            <div className="group bg-[#fffdf8] rounded-2xl p-space-lg shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col justify-between hover:translate-y-[-4px] transition-transform border border-[#ffeade]">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-md py-space-xs rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-md text-label-md font-bold">
                    6+ MONTHS
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#faf7ee] flex items-center justify-center text-[#e80074]">
                    <span className="material-symbols-outlined text-[20px]">soup_kitchen</span>
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-[#2f1401] font-bold">
                  First Nibbles
                </h3>
                <p className="font-body-md text-body-md text-[#815432]">
                  Ultra-smooth, gentle single-ingredient purees for babies beginning their complementary food journey.
                </p>
                <div className="flex flex-wrap gap-space-xs pt-space-xs">
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Banana Powder
                  </span>
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Ragi Powder
                  </span>
                </div>
              </div>
              <div className="pt-space-md mt-space-md">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('shop-by-age');
                    onSelectStage('6m');
                  }}
                  className="w-full py-3 rounded-full bg-[#faf7ee] hover:bg-[#e80074] hover:text-white text-[#815432] font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs font-bold cursor-pointer"
                >
                  <span>Explore First Nibbles</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Stage 2: 8+ Months */}
            <div className="group bg-[#fffdf8] rounded-2xl p-space-lg shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col justify-between hover:translate-y-[-4px] transition-transform border border-[#ffeade]">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-md py-space-xs rounded-full bg-[#ffc299] text-[#7a4e2d] font-label-md text-label-md font-bold">
                    8+ MONTHS
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#faf7ee] flex items-center justify-center text-[#e80074]">
                    <span className="material-symbols-outlined text-[20px]">explore</span>
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-[#2f1401] font-bold">
                  Tiny Explorers
                </h3>
                <p className="font-body-md text-body-md text-[#815432]">
                  Varied textures, rich multigrains, and gentle fruit combos to develop palate curiosity and tongue motion.
                </p>
                <div className="flex flex-wrap gap-space-xs pt-space-xs">
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Health Mix
                  </span>
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Apple &amp; Ragi
                  </span>
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Carrot &amp; Rice
                  </span>
                </div>
              </div>
              <div className="pt-space-md mt-space-md">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('shop-by-age');
                    onSelectStage('8m');
                  }}
                  className="w-full py-3 rounded-full bg-[#faf7ee] hover:bg-[#e80074] hover:text-white text-[#815432] font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs font-bold cursor-pointer"
                >
                  <span>Explore Explorers</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Stage 3: 12+ Months */}
            <div className="group bg-[#fffdf8] rounded-2xl p-space-lg shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col justify-between hover:translate-y-[-4px] transition-transform border border-[#ffeade]">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-md py-space-xs rounded-full bg-[#ffd9e1] text-[#3f001b] font-label-md text-label-md font-bold">
                    12+ MONTHS
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#faf7ee] flex items-center justify-center text-[#e80074]">
                    <span className="material-symbols-outlined text-[20px]">child_care</span>
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-[#2f1401] font-bold">
                  Growing Nibbles
                </h3>
                <p className="font-body-md text-body-md text-[#815432]">
                  Wholesome finger snacks, nutty power mixes, and hearty daily meal additions for active energetic toddlers.
                </p>
                <div className="flex flex-wrap gap-space-xs pt-space-xs">
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Kadle Snacks
                  </span>
                  <span className="font-label-sm text-label-sm px-3 py-1 bg-[#faf7ee] text-[#815432] rounded-full">
                    Nuts Crushed
                  </span>
                </div>
              </div>
              <div className="pt-space-md mt-space-md">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('shop-by-age');
                    onSelectStage('12m');
                  }}
                  className="w-full py-3 rounded-full bg-[#faf7ee] hover:bg-[#e80074] hover:text-white text-[#815432] font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs font-bold cursor-pointer"
                >
                  <span>Explore Toddler Bites</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP OUR NIBBLES (FEATURED PRODUCTS) */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#faf7ee]" id="featured-products">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wide font-bold">
                Pouch Pantry
              </span>
              <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
                Pick their next favourite Nibble
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-space-xs text-[#e80074] hover:text-[#ba005c] font-label-lg text-label-lg transition-colors cursor-pointer font-bold"
            >
              <span>View All 13 Nibbles</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>

          {/* 4 Core Featured Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-[#fffdf8] rounded-2xl p-space-md shadow-[0_8px_24px_rgba(82,49,24,0.06)] flex flex-col justify-between group border border-[#ffeade]"
              >
                <div
                  className="flex flex-col gap-space-sm cursor-pointer"
                  onClick={() => onSelectProduct(p)}
                >
                  <div className="relative w-full aspect-square rounded-2xl bg-[#fff1ea] flex items-center justify-center overflow-hidden p-space-sm">
                    <span className="absolute top-2 left-2 px-space-sm py-0.5 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-label-sm font-bold z-10">
                      {p.age}
                    </span>
                    <img
                      alt={p.name}
                      className="w-36 h-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-sm"
                      src={p.imageUrl}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-[#815432]">{p.category}</span>
                    <h3 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold group-hover:text-[#e80074] transition-colors">
                      {p.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#815432] line-clamp-2 mt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-space-md flex items-center justify-between border-t border-[#ffeade] mt-space-sm">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-[#815432]">Price</span>
                    <span className="font-headline-md text-headline-md text-[#2f1401] font-bold">
                      ₹{p.price}
                    </span>
                  </div>
                  <button
                    aria-label={`Add ${p.name} to cart`}
                    className="w-11 h-11 rounded-full bg-[#e80074] text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-transform shadow-[0_4px_12px_rgba(232,0,116,0.3)] cursor-pointer"
                    onClick={() => addToCart(p, 1)}
                  >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES (13 PRODUCTS TAXONOMY) */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#fff8f5]" id="categories-section">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wide font-bold">
              Purity in Every Spoon
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
              Something wholesome for every little tummy
            </h2>
            <p className="font-body-md text-body-md text-[#815432]">
              Explore all 13 pure organic meal mixes organized cleanly by your child's dietary phase.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-space-xs pb-space-sm">
            {[
              { id: 'all', label: 'All 13 Nibbles' },
              { id: 'single', label: 'Single Ingredient' },
              { id: 'fruit-grain', label: 'Fruit & Grain' },
              { id: 'multigrain', label: 'Grain & Multigrain' },
              { id: 'boosters', label: 'Nutrition Boosters' },
              { id: 'snacks', label: 'Baby Snacks' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all cursor-pointer font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-[#e80074] text-white shadow-md'
                    : 'bg-[#fffdf8] text-[#815432] hover:text-[#2f1401] shadow-sm hover:bg-[#ffeade]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dynamic 13 Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md">
            {filteredCatalog.map((item) => (
              <div
                key={item.id}
                className="bg-[#fffdf8] rounded-2xl p-space-sm shadow-sm flex flex-col justify-between border border-[#ffeade] hover:shadow-md transition-shadow group"
              >
                <div
                  className="flex items-center gap-space-sm cursor-pointer"
                  onClick={() => onSelectProduct(item)}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#fff1ea] flex items-center justify-center shrink-0 overflow-hidden p-1">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-[#2e8b57] font-bold block">
                      {item.stage} ({item.age})
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-[#2f1401] leading-tight font-bold group-hover:text-[#e80074] transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#815432] line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-space-sm pt-space-xs flex items-center justify-between border-t border-[#ffeade]/60">
                  <span className="font-label-md text-label-md text-[#2f1401] font-bold">
                    ₹{item.price}
                  </span>
                  <button
                    className="text-[#e80074] hover:text-[#ba005c] font-label-md text-label-md font-bold cursor-pointer"
                    onClick={() => addToCart(item, 1)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY NIBBLES (TRUST SECTION) */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#d6f5e3]/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-[#2e8b57] uppercase tracking-wide font-bold">
              Purity First
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
              Why parents choose Nibbles
            </h2>
            <p className="font-body-md text-body-md text-[#815432]">
              Crafted thoughtfully with honesty, kitchen tradition, and genuine respect for infant digestion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Trust 1 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col items-center text-center gap-space-sm hover:scale-[1.02] transition-transform border border-[#ffeade]">
              <div className="w-16 h-16 rounded-full bg-[#d6f5e3] text-[#2e8b57] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[30px] filled">spa</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                Simple Ingredients
              </h3>
              <p className="font-body-sm text-body-sm text-[#815432]">
                Nothing artificial, no preservatives, no added salt or processed sugar. Only honest, real food.
              </p>
            </div>

            {/* Trust 2 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col items-center text-center gap-space-sm hover:scale-[1.02] transition-transform border border-[#ffeade]">
              <div className="w-16 h-16 rounded-full bg-[#ffeade] text-[#934a17] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[30px] filled">favorite</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                Made for Little Tummies
              </h3>
              <p className="font-body-sm text-body-sm text-[#815432]">
                Sprouted grains and fine milling support easy, gentle digestion and comfortable happy bellies.
              </p>
            </div>

            {/* Trust 3 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col items-center text-center gap-space-sm hover:scale-[1.02] transition-transform border border-[#ffeade]">
              <div className="w-16 h-16 rounded-full bg-[#d6f5e3] text-[#2e8b57] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[30px]">timer</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                Wholesome Everyday Food
              </h3>
              <p className="font-body-sm text-body-sm text-[#815432]">
                Prepares warm nutritious baby cereal or breakfast porridge in under three hassle-free minutes.
              </p>
            </div>

            {/* Trust 4 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col items-center text-center gap-space-sm hover:scale-[1.02] transition-transform border border-[#ffeade]">
              <div className="w-16 h-16 rounded-full bg-[#ffd9e1] text-[#e80074] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[30px] filled">verified</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                Made with Care
              </h3>
              <p className="font-body-sm text-body-sm text-[#815432]">
                Prepared according to age-old culinary care and rigorous small-batch kitchen hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE NIBBLES WAY (BARNABY MONKEY SPOTLIGHT) */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#fff8f5]">
        <div className="max-w-7xl mx-auto bg-[#fffdf8] rounded-3xl p-space-lg md:p-space-xl shadow-[0_12px_40px_-6px_rgba(82,49,24,0.08)] grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center border border-[#ffeade]">
          {/* Mascot Character Spotlight */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#e8f8ee] p-4 shadow-inner flex items-center justify-center border-4 border-white">
              <img
                alt="Cheerful Nibbles monkey enjoying a wholesome spoon of fresh puree"
                className="w-full h-full object-contain rounded-full drop-shadow-md"
                src={MONKEY_MASCOT_BARNABY}
              />
              <div className="absolute -bottom-2 bg-[#fffdf8] px-4 py-1.5 rounded-full shadow-md text-center border border-[#ffeade]">
                <span className="font-label-sm text-label-sm text-[#e80074] font-bold">
                  Meet Barnaby Monkey 🐒
                </span>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="md:col-span-7 flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wider font-bold">
              The Nibbles Way
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
              Tiny ingredients. Big care.
            </h2>
            <p className="font-body-lg text-body-lg text-[#815432]">
              At Nibbles, we believe feeding little ones should feel simple, wholesome, and joyful. Our food mixes are made to make everyday meals a little easier for parents and a little more exciting for tiny taste buds.
            </p>
            <p className="font-body-md text-body-md text-[#815432]">
              From sourcing tender grains from generational farmers to sun-curing seasonal fruits, we treat each pouch as if it were prepared right on our own kitchen table for our very own children.
            </p>
            <div className="pt-space-xs flex items-center gap-space-md">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-[#2f1401] font-extrabold">100%</span>
                <span className="font-label-sm text-label-sm text-[#815432]">Farm Traceable</span>
              </div>
              <div className="w-px h-8 bg-[#ffeade]" />
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-[#2f1401] font-extrabold">Zero</span>
                <span className="font-label-sm text-label-sm text-[#815432]">Refined Starches</span>
              </div>
              <div className="w-px h-8 bg-[#ffeade]" />
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-[#2f1401] font-extrabold">3 mins</span>
                <span className="font-label-sm text-label-sm text-[#815432]">Ready to Eat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PARENT REVIEWS / TESTIMONIALS */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#faf7ee]">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-[#e80074] uppercase tracking-wider font-bold">
              Happy Spoons
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
              Loved by parents &amp; babies alike
            </h2>
            <p className="font-body-md text-body-md text-[#815432]">
              Real stories from the high chairs of growing little foodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Review 1 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md border border-[#ffeade]">
              <div className="flex flex-col gap-space-xs">
                <div className="flex text-[#e80074]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] filled">
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-body-lg text-[#2f1401] font-semibold pt-1">
                  “My little one absolutely loved the banana powder!”
                </p>
                <p className="font-body-md text-body-md text-[#815432]">
                  It mixes smoothly with warm water without any clumps. Such a relief for quick morning feeds before daycare.
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <div className="w-10 h-10 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-md text-label-md flex items-center justify-center font-bold">
                  SM
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-[#2f1401] font-bold">Sneha M.</span>
                  <span className="font-label-sm text-label-sm text-[#815432]">Mom of 8 mo</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md border border-[#ffeade]">
              <div className="flex flex-col gap-space-xs">
                <div className="flex text-[#e80074]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] filled">
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-body-lg text-[#2f1401] font-semibold pt-1">
                  “Made breakfast so much easier for us.”
                </p>
                <p className="font-body-md text-body-md text-[#815432]">
                  The Health Mix Powder has turned into our go-to family porridge. Knowing there is no refined sugar gives us total peace of mind.
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <div className="w-10 h-10 rounded-full bg-[#ffc299] text-[#7a4e2d] font-label-md text-label-md flex items-center justify-center font-bold">
                  RP
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-[#2f1401] font-bold">Rahul &amp; Priya</span>
                  <span className="font-label-sm text-label-sm text-[#815432]">Parents of 1 yr</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#fffdf8] rounded-2xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md border border-[#ffeade]">
              <div className="flex flex-col gap-space-xs">
                <div className="flex text-[#e80074]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] filled">
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-body-lg text-[#2f1401] font-semibold pt-1">
                  “Simple, convenient and my baby enjoyed the taste.”
                </p>
                <p className="font-body-md text-body-md text-[#815432]">
                  We started with the Arrowroot and Ragi blends. Her tummy took to it immediately without any colic or fuss!
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e1] text-[#3f001b] font-label-md text-label-md flex items-center justify-center font-bold">
                  AK
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-[#2f1401] font-bold">Ananya K.</span>
                  <span className="font-label-sm text-label-sm text-[#815432]">Mom of 7 mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="w-full px-gutter md:px-margin py-space-xl bg-[#fff8f5]">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#e8f8ee] via-[#d6f5e3] to-[#ffdcc5]/40 p-space-lg md:p-space-xl shadow-[0_12px_36px_rgba(82,49,24,0.06)] flex flex-col md:flex-row items-center justify-between gap-space-lg border border-[#ffeade]">
          <div className="flex flex-col gap-space-xs text-center md:text-left">
            <span className="font-label-md text-label-md text-[#2e8b57] font-bold">
              Start Your Baby's Wholesome Journey
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#2f1401] font-bold">
              Ready for their next Nibble?
            </h2>
            <p className="font-body-md text-body-md text-[#815432] max-w-lg">
              Explore wholesome little foods made for growing little ones. Gentle recipes packed with love, grains, and smiles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-sm shrink-0">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-8 py-3.5 rounded-full bg-[#e80074] text-white font-label-lg text-label-lg shadow-[0_8px_24px_rgba(232,0,116,0.3)] hover:scale-105 active:scale-95 transition-all text-center w-full sm:w-auto font-bold cursor-pointer"
            >
              Shop All Nibbles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

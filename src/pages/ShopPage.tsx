import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onQuickView,
}) => {
  const { items, addToCart, updateQty } = useCart();

  // Filters State
  const [category, setCategory] = useState<string>('all');
  const [age, setAge] = useState<string>('all');
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Helper map for active quantity per product in cart
  const cartQtyMap = useMemo(() => {
    const map: Record<number, number> = {};
    items.forEach((item) => {
      map[item.product.id] = (map[item.product.id] || 0) + item.quantity;
    });
    return map;
  }, [items]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Age
    if (age !== 'all') {
      result = result.filter((p) => p.age === age);
    }

    // Price ranges
    if (priceRanges.length > 0) {
      result = result.filter((p) => {
        return priceRanges.some((range) => {
          if (range === 'under250') return p.price < 250;
          if (range === '250-350') return p.price >= 250 && p.price <= 350;
          if (range === '350plus') return p.price > 350;
          return false;
        });
      });
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      result.sort((a, b) => a.featuredOrder - b.featuredOrder);
    }

    return result;
  }, [searchQuery, category, age, priceRanges, sortBy]);

  const handlePriceToggle = (val: string) => {
    setPriceRanges((prev) =>
      prev.includes(val) ? prev.filter((r) => r !== val) : [...prev, val]
    );
  };

  const handleResetFilters = () => {
    setCategory('all');
    setAge('all');
    setPriceRanges([]);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (age !== 'all' ? 1 : 0) +
    priceRanges.length +
    (searchQuery.trim() ? 1 : 0);

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Single Ingredient':
        return 'bg-[#d6f5e3] text-[#2e8b57]';
      case 'Fruit & Grain':
        return 'bg-[#ffc299] text-[#7a4e2d]';
      case 'Grain & Multigrain':
        return 'bg-[#ffdbc9] text-[#934a17]';
      case 'Nutrition Boosters':
        return 'bg-[#ffd9e1] text-[#ba005c]';
      case 'Baby Snacks':
        return 'bg-[#ffdcc6] text-[#815432]';
      default:
        return 'bg-[#d6f5e3] text-[#2e8b57]';
    }
  };

  const getAgeBadgeClass = (ageVal: string) => {
    if (ageVal.includes('6+')) return 'bg-[#ffe3d2] text-[#5b3f46]';
    if (ageVal.includes('8+')) return 'bg-[#e8f8ee] text-[#2e8b57]';
    if (ageVal.includes('12+')) return 'bg-[#ffd9e1] text-[#8f0045]';
    return 'bg-[#ffeade] text-[#815432]';
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Category Hero Banner */}
      <section className="w-full bg-[#fffdf8] py-space-lg px-gutter md:px-margin border-b border-[#ffeade]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-label-sm font-bold">
                <span className="material-symbols-outlined text-[15px] filled">eco</span>
                100% Certified Organic Kitchen
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#e3bdc5]" />
              <span className="hidden sm:inline-block font-label-sm text-label-sm text-[#815432]">
                Stone-Ground Wholesome Care
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg text-[#2f1401] tracking-tight font-extrabold">
              All Nibbles
            </h1>
            <p className="font-body-lg text-body-lg text-[#815432] max-w-xl">
              Explore our range of wholesome food mixes for little ones. Gently sun-dried and finely milled for delicate baby tummies.
            </p>
          </div>

          <div className="flex items-center gap-space-md self-start md:self-auto bg-[#fff1ea] px-space-md py-space-sm rounded-2xl shadow-sm border border-[#ffeade]">
            <div className="w-12 h-12 rounded-full bg-[#e8f8ee] flex items-center justify-center text-[#2e8b57]">
              <span className="material-symbols-outlined text-[26px]">spa</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-[#2f1401] font-bold leading-none">
                {filteredProducts.length}
              </span>
              <span className="font-label-sm text-label-sm text-[#815432]">
                Wholesome blends available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Layout Area */}
      <section className="w-full px-gutter md:px-margin py-space-lg max-w-7xl mx-auto">
        {/* Mobile Filter Trigger & Quick Search Bar */}
        <div className="md:hidden flex flex-col gap-space-sm mb-space-md">
          <div className="relative w-full">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wholesome blends..."
              className="w-full h-12 pl-11 pr-4 bg-[#fffdf8] rounded-full text-[#2f1401] placeholder:text-[#8f6f76] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#e80074] shadow-sm border border-[#ffeade]"
            />
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#815432] text-[22px]">
              search
            </span>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 h-12 px-space-md bg-[#fffdf8] text-[#2f1401] rounded-full font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm border border-[#ffeade] font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span>Filter Products ({activeFilterCount})</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-space-md pr-9 bg-[#fffdf8] text-[#2f1401] rounded-full font-label-md text-label-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#e80074] border border-[#ffeade] font-bold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3 text-[#815432] text-[20px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-space-lg items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:flex flex-col w-72 shrink-0 gap-space-lg sticky top-28">
            <div className="bg-[#fffdf8] p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md border border-[#ffeade]">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-[#2f1401] flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-[#e80074] text-[20px]">
                    filter_list
                  </span>
                  <span>Filters</span>
                </h2>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-label-sm text-label-sm text-[#e80074] hover:text-[#ba005c] transition-colors font-bold cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter Group */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-[#2f1401] mb-1 font-bold">
                  Category
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', label: 'All', count: 13 },
                    { id: 'Single Ingredient', label: 'Single Ingredient', count: 3 },
                    { id: 'Fruit & Grain', label: 'Fruit & Grain', count: 5 },
                    { id: 'Grain & Multigrain', label: 'Grain & Multigrain', count: 3 },
                    { id: 'Nutrition Boosters', label: 'Nutrition Boosters', count: 1 },
                    { id: 'Baby Snacks', label: 'Baby Snacks', count: 1 },
                  ].map((catItem) => (
                    <label
                      key={catItem.id}
                      className="flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg hover:bg-[#fff1ea] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          value={catItem.id}
                          checked={category === catItem.id}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-4 h-4 accent-[#e80074] cursor-pointer"
                        />
                        <span className="font-body-sm text-body-sm text-[#2f1401]">
                          {catItem.label}
                        </span>
                      </span>
                      <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2 py-0.5 rounded-full font-bold">
                        {catItem.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Milestone Filter */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-[#2f1401] mb-1 font-bold">
                  Age Milestone
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', label: 'All Ages', count: 13 },
                    { id: '6+ Months', label: '6+ Months', count: 10 },
                    { id: '8+ Months', label: '8+ Months', count: 1 },
                    { id: '12+ Months', label: '12+ Months', count: 2 },
                  ].map((ageItem) => (
                    <label
                      key={ageItem.id}
                      className="flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg hover:bg-[#fff1ea] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="age"
                          value={ageItem.id}
                          checked={age === ageItem.id}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-4 h-4 accent-[#e80074] cursor-pointer"
                        />
                        <span className="font-body-sm text-body-sm text-[#2f1401]">
                          {ageItem.label}
                        </span>
                      </span>
                      <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2 py-0.5 rounded-full font-bold">
                        {ageItem.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-[#2f1401] mb-1 font-bold">
                  Price Range
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'under250', label: 'Under ₹250' },
                    { id: '250-350', label: '₹250 - ₹350' },
                    { id: '350plus', label: '₹350 & Above' },
                  ].map((pItem) => (
                    <label
                      key={pItem.id}
                      className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-[#fff1ea] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={priceRanges.includes(pItem.id)}
                        onChange={() => handlePriceToggle(pItem.id)}
                        className="w-4 h-4 accent-[#e80074] rounded cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-[#2f1401]">
                        {pItem.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Mini-Card */}
            <div className="bg-[#e8f8ee] p-space-md rounded-2xl flex flex-col gap-space-xs border border-[#d6f5e3]">
              <div className="flex items-center gap-2 text-[#2e8b57] font-headline-sm text-headline-sm font-bold">
                <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
                <span>Pure Baby Oath</span>
              </div>
              <p className="font-body-sm text-body-sm text-[#2f1401]">
                Zero added refined sugars, zero artificial colors, and strictly preservative-free.
              </p>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="flex-1 flex flex-col w-full gap-space-md">
            {/* Desktop Sort and Search Bar */}
            <div className="hidden md:flex items-center justify-between bg-[#fffdf8] p-space-sm px-space-md rounded-2xl shadow-sm border border-[#ffeade]">
              <div className="relative w-80">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wholesome blends..."
                  className="w-full h-11 pl-10 pr-4 bg-[#fff1ea] rounded-full text-[#2f1401] placeholder:text-[#8f6f76] font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-[#e80074]"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#815432] text-[20px]">
                  search
                </span>
              </div>

              <div className="flex items-center gap-space-md">
                <span className="font-body-sm text-body-sm text-[#815432]">
                  Showing <span className="font-bold text-[#2f1401]">{filteredProducts.length}</span> recipes
                </span>
                <div className="flex items-center gap-2">
                  <label className="font-label-sm text-label-sm text-[#815432]" htmlFor="desktopSortSelect">
                    Sort by:
                  </label>
                  <div className="relative">
                    <select
                      id="desktopSortSelect"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-10 pl-3 pr-8 bg-[#fff1ea] text-[#2f1401] rounded-full font-label-sm text-label-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#e80074] cursor-pointer font-bold"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#815432] text-[18px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Tags Display Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-space-xs">
                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe3d2] text-[#2f1401] rounded-full font-label-sm text-label-sm font-bold">
                    <span>Category: {category}</span>
                    <button
                      onClick={() => setCategory('all')}
                      className="hover:text-[#e80074] leading-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span>
                    </button>
                  </span>
                )}

                {age !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe3d2] text-[#2f1401] rounded-full font-label-sm text-label-sm font-bold">
                    <span>Age: {age}</span>
                    <button
                      onClick={() => setAge('all')}
                      className="hover:text-[#e80074] leading-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span>
                    </button>
                  </span>
                )}

                {priceRanges.map((pr) => {
                  const label =
                    pr === 'under250'
                      ? 'Price: Under ₹250'
                      : pr === '250-350'
                      ? 'Price: ₹250 - ₹350'
                      : 'Price: ₹350+';
                  return (
                    <span
                      key={pr}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe3d2] text-[#2f1401] rounded-full font-label-sm text-label-sm font-bold"
                    >
                      <span>{label}</span>
                      <button
                        onClick={() => handlePriceToggle(pr)}
                        className="hover:text-[#e80074] leading-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">close</span>
                      </button>
                    </span>
                  );
                })}

                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe3d2] text-[#2f1401] rounded-full font-label-sm text-label-sm font-bold">
                    <span>"{searchQuery}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-[#e80074] leading-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span>
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="font-label-sm text-label-sm text-[#e80074] underline hover:text-[#ba005c] ml-2 cursor-pointer font-bold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-space-xl bg-[#fffdf8] rounded-3xl text-center my-space-md border border-[#ffeade]">
                <div className="w-20 h-20 rounded-full bg-[#ffe3d2] flex items-center justify-center text-[#815432] mb-space-sm">
                  <span className="material-symbols-outlined text-[36px]">soup_kitchen</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#2f1401] font-bold mb-space-xs">
                  No wholesome bites match your filters
                </h3>
                <p className="font-body-md text-body-md text-[#815432] max-w-sm mb-space-md">
                  Try adjusting your age milestones, category filters, or search keywords to explore our kitchen blends.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-space-md py-space-xs bg-[#e80074] text-white rounded-full font-label-md text-label-md hover:scale-105 transition-transform shadow-md font-bold cursor-pointer"
                >
                  Show All 13 Blends
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                {filteredProducts.map((p) => {
                  const qtyInCart = cartQtyMap[p.id] || 0;
                  const catClass = getCategoryBadgeClass(p.category);
                  const ageClass = getAgeBadgeClass(p.age);

                  return (
                    <div
                      key={p.id}
                      className="bg-[#fffdf8] rounded-2xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group relative border border-[#ffeade]"
                    >
                      {p.isNew && (
                        <span className="absolute top-4 left-4 z-10 font-label-sm text-label-sm bg-[#e80074] text-white px-2.5 py-0.5 rounded-full shadow-sm font-bold">
                          New
                        </span>
                      )}

                      {/* Image & Packaging Thumbnail */}
                      <div
                        className="relative w-full aspect-square bg-[#e8f8ee] rounded-xl flex items-center justify-center p-space-md mb-space-sm overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                        onClick={() => onSelectProduct(p)}
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(p);
                          }}
                          className="quick-view-btn absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#fffdf8]/90 text-[#2f1401] font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm backdrop-blur-sm font-bold cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span>Quick View</span>
                        </button>
                      </div>

                      {/* Badges & Labels */}
                      <div
                        className="flex flex-col flex-1 cursor-pointer"
                        onClick={() => onSelectProduct(p)}
                      >
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${catClass}`}
                          >
                            {p.category}
                          </span>
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${ageClass}`}
                          >
                            {p.age}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-headline-sm text-headline-sm text-[#2f1401] leading-snug line-clamp-1 mb-1 font-bold group-hover:text-[#e80074] transition-colors"
                          title={p.name}
                        >
                          {p.name}
                        </h3>

                        {/* Description */}
                        <p className="font-body-sm text-body-sm text-[#815432] line-clamp-2 mb-space-sm flex-1">
                          {p.desc}
                        </p>

                        {/* Price & Weight Row */}
                        <div className="flex items-baseline justify-between pt-space-xs mb-space-md">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-headline-md text-headline-md text-[#e80074] font-extrabold">
                              ₹{p.price}
                            </span>
                            <span className="font-body-sm text-body-sm text-[#8f6f76] line-through">
                              ₹{p.mrp}
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-[#815432] bg-[#fff1ea] px-2 py-0.5 rounded-full font-bold">
                            {p.weight}
                          </span>
                        </div>
                      </div>

                      {/* Action / Add to Cart Counter */}
                      <div className="w-full pt-1">
                        {qtyInCart === 0 ? (
                          <button
                            type="button"
                            onClick={() => addToCart(p, 1)}
                            className="w-full h-11 rounded-full bg-[#e80074] hover:bg-[#fa198b] text-white font-label-md text-label-md flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(232,0,116,0.25)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer font-bold"
                          >
                            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                            <span>Add to Cart</span>
                          </button>
                        ) : (
                          <div className="flex items-center justify-between h-11 w-full bg-[#ffd9e1]/40 rounded-full px-2 border border-[#ffd9e1]">
                            <button
                              type="button"
                              onClick={() => updateQty(p.id, -1)}
                              className="w-8 h-8 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#e80074] font-bold shadow-sm cursor-pointer hover:bg-white"
                            >
                              <span className="material-symbols-outlined text-[16px]">remove</span>
                            </button>
                            <span className="font-label-md text-label-md text-[#e80074] font-bold">
                              {qtyInCart}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(p.id, 1)}
                              className="w-8 h-8 rounded-full bg-[#e80074] flex items-center justify-center text-white font-bold shadow-sm cursor-pointer hover:bg-[#fa198b]"
                            >
                              <span className="material-symbols-outlined text-[16px]">add</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-[#fffdf8] h-full flex flex-col justify-between p-space-md overflow-y-auto">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs border-b border-[#ffeade]">
                <h3 className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                  Filter Recipes
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#ffeade] flex items-center justify-center text-[#2f1401]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-[#2f1401] font-bold">
                  Category
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', label: 'All', count: 13 },
                    { id: 'Single Ingredient', label: 'Single Ingredient', count: 3 },
                    { id: 'Fruit & Grain', label: 'Fruit & Grain', count: 5 },
                    { id: 'Grain & Multigrain', label: 'Grain & Multigrain', count: 3 },
                    { id: 'Nutrition Boosters', label: 'Nutrition Boosters', count: 1 },
                    { id: 'Baby Snacks', label: 'Baby Snacks', count: 1 },
                  ].map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between cursor-pointer py-1"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileCategory"
                          value={cat.id}
                          checked={category === cat.id}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-4 h-4 accent-[#e80074]"
                        />
                        <span className="font-body-sm text-body-sm text-[#2f1401]">
                          {cat.label}
                        </span>
                      </span>
                      <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2 py-0.5 rounded-full font-bold">
                        {cat.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Age */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-[#2f1401] font-bold">
                  Age Milestone
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', label: 'All Ages', count: 13 },
                    { id: '6+ Months', label: '6+ Months', count: 10 },
                    { id: '8+ Months', label: '8+ Months', count: 1 },
                    { id: '12+ Months', label: '12+ Months', count: 2 },
                  ].map((ageItem) => (
                    <label
                      key={ageItem.id}
                      className="flex items-center justify-between cursor-pointer py-1"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileAge"
                          value={ageItem.id}
                          checked={age === ageItem.id}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-4 h-4 accent-[#e80074]"
                        />
                        <span className="font-body-sm text-body-sm text-[#2f1401]">
                          {ageItem.label}
                        </span>
                      </span>
                      <span className="font-label-sm text-label-sm text-[#815432] bg-[#ffeade] px-2 py-0.5 rounded-full font-bold">
                        {ageItem.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <label className="font-label-md text-label-md text-[#2f1401] font-bold">
                  Price Range
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'under250', label: 'Under ₹250' },
                    { id: '250-350', label: '₹250 - ₹350' },
                    { id: '350plus', label: '₹350 & Above' },
                  ].map((pItem) => (
                    <label key={pItem.id} className="flex items-center gap-2 cursor-pointer py-1">
                      <input
                        type="checkbox"
                        checked={priceRanges.includes(pItem.id)}
                        onChange={() => handlePriceToggle(pItem.id)}
                        className="w-4 h-4 accent-[#e80074] rounded"
                      />
                      <span className="font-body-sm text-body-sm text-[#2f1401]">
                        {pItem.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-space-md flex items-center gap-space-sm">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-space-xs bg-[#e80074] text-white rounded-full font-label-md text-label-md font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.age.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.ingredients.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 p-gutter animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#fffdf8] rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative flex flex-col gap-4 max-h-[80vh] border border-[#ffeade]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative w-full">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search banana, ragi, health mix, stage 1..."
            className="w-full h-14 pl-12 pr-12 rounded-full bg-[#faf7ee] text-[#2f1401] placeholder:text-[#8f6f76] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#e80074] shadow-inner"
          />
          <span className="material-symbols-outlined absolute left-4 top-4 text-[#815432] text-[24px]">
            search
          </span>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-4 text-[#8f6f76] hover:text-[#2f1401]"
            >
              <span className="material-symbols-outlined text-[20px]">cancel</span>
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#815432] font-semibold">Popular:</span>
          {['Banana Powder', 'Health Mix', 'Ragi', '6+ Months', 'Snacks'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm hover:bg-[#e8f8ee] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto no-scrollbar flex flex-col gap-2 divide-y divide-[#ffeade] pt-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[#815432]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#e80074]">
                sentiment_dissatisfied
              </span>
              <p className="font-headline-sm text-headline-sm">No recipes found for "{query}"</p>
              <p className="text-body-sm mt-1">Try searching by ingredient, like "banana" or "ragi"</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="pt-2 pb-2 flex items-center justify-between gap-3 hover:bg-[#faf7ee] p-2 rounded-xl transition-colors cursor-pointer group"
                onClick={() => {
                  onClose();
                  onSelectProduct(product);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#e8f8ee] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#2e8b57] bg-[#d6f5e3] px-2 py-0.2 rounded-full">
                        {product.age}
                      </span>
                      <span className="text-[11px] text-[#815432]">{product.category}</span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-[#2f1401] group-hover:text-[#e80074] transition-colors leading-tight">
                      {product.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-[#e80074] font-bold">
                    ₹{product.price}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="w-8 h-8 rounded-full bg-[#e80074] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
                    title="Add to basket"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

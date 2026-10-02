import React from 'react';
import { PageRoute } from '../types';
import { NIBBLES_LOGO_PEEK } from '../data/products';

interface FooterProps {
  setCurrentPage: (page: PageRoute) => void;
  onOpenStage?: (stage: '6m' | '8m' | '12m') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenStage }) => {
  return (
    <footer className="w-full bg-[#faf7ee] text-[#2f1401] mt-space-xl border-t border-[#ffeade]">
      <div className="w-full max-w-7xl mx-auto px-gutter md:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-xl">
          {/* Brand Intro Column */}
          <div className="md:col-span-2 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img
                alt="Nibbles Logo"
                className="w-10 h-10 rounded-full object-cover shadow-sm bg-[#ffd9e1]"
                src={NIBBLES_LOGO_PEEK}
              />
              <span className="font-headline-lg text-headline-lg text-[#e80074] tracking-tight font-bold">
                Nibbles
              </span>
            </div>
            <p className="font-body-md text-body-md text-[#815432] max-w-md">
              Wholesome little foods for growing little ones. Certified organic ingredients gently blended for tiny tummies and curious palates.
            </p>
            <div className="flex flex-wrap items-center gap-space-xs mt-space-sm">
              <span className="inline-flex items-center px-space-sm py-space-xs rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-label-sm font-bold">
                100% Organic Certified
              </span>
              <span className="inline-flex items-center px-space-sm py-space-xs rounded-full bg-[#ffeade] text-[#934a17] font-label-sm text-label-sm font-bold">
                No Added Sugar
              </span>
              <span className="inline-flex items-center px-space-sm py-space-xs rounded-full bg-[#ffd9e1] text-[#ba005c] font-label-sm text-label-sm font-bold">
                Small-Batch Milled
              </span>
            </div>
          </div>

          {/* Explore Menu Column */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-[#2f1401] mb-space-sm font-bold">
              Explore Menu
            </h3>
            <ul className="flex flex-col gap-space-xs">
              <li className="list-none">
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  All Organic Bites (13 Blends)
                </button>
              </li>
              <li className="list-none">
                <button
                  onClick={() => {
                    setCurrentPage('shop-by-age');
                    onOpenStage?.('6m');
                  }}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Stage 1: First Tastes (6m+)
                </button>
              </li>
              <li className="list-none">
                <button
                  onClick={() => {
                    setCurrentPage('shop-by-age');
                    onOpenStage?.('8m');
                  }}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Stage 2: Textures &amp; Mash (8m+)
                </button>
              </li>
              <li className="list-none">
                <button
                  onClick={() => {
                    setCurrentPage('shop-by-age');
                    onOpenStage?.('12m');
                  }}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Stage 3: Little Chewers (12m+)
                </button>
              </li>
            </ul>
          </div>

          {/* Parent Care Column */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-[#2f1401] mb-space-sm font-bold">
              Parent Care
            </h3>
            <ul className="flex flex-col gap-space-xs">
              <li className="list-none">
                <button
                  onClick={() => setCurrentPage('our-story')}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Our Quality Promise &amp; Story
                </button>
              </li>
              <li className="list-none">
                <button
                  onClick={() => setCurrentPage('our-story')}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Pediatric Nutrition FAQ
                </button>
              </li>
              <li className="list-none">
                <button
                  onClick={() => setCurrentPage('cart')}
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Pouch Pantry &amp; Cart
                </button>
              </li>
              <li className="list-none">
                <a
                  href="mailto:care@nibblesbaby.com"
                  className="font-body-sm text-body-sm text-[#815432] hover:text-[#e80074] transition-colors text-left"
                >
                  Say Hello: 1800-NIBBLES
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights & Badges */}
        <div className="pt-space-md border-t border-[#ffeade] flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
          <p className="font-body-sm text-body-sm text-[#815432]">
            © 2024 Nibbles Baby Foods Inc. Wholesome spoonfuls crafted with care.
          </p>
          <div className="flex items-center gap-space-md">
            <span
              title="Certified Eco-friendly"
              className="w-9 h-9 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#815432] shadow-[0_4px_12px_-2px_rgba(82,49,24,0.06)]"
            >
              <span className="material-symbols-outlined text-[18px]">eco</span>
            </span>
            <span
              title="With Baby Love"
              className="w-9 h-9 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#e80074] shadow-[0_4px_12px_-2px_rgba(82,49,24,0.06)]"
            >
              <span className="material-symbols-outlined text-[18px] filled">favorite</span>
            </span>
            <span
              title="Nutrient-dense Nutrition"
              className="w-9 h-9 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#2e8b57] shadow-[0_4px_12px_-2px_rgba(82,49,24,0.06)]"
            >
              <span className="material-symbols-outlined text-[18px]">nutrition</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

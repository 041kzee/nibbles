import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { NIBBLES_LOGO_PEEK, MONKEY_CHEF_AVATAR } from '../data/products';

interface HeaderProps {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onOpenSearch,
}) => {
  const { totalUnits } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'shop-by-age', label: 'Shop by Age' },
    { id: 'our-story', label: 'Our Story' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffdf8]/95 backdrop-blur-xl shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)]">
      {/* Top Wholesome Announcement Strip */}
      <div className="w-full bg-[#d6f5e3] px-gutter py-space-xs text-center">
        <p className="font-label-sm text-label-sm text-[#2f1401] tracking-wide flex items-center justify-center gap-space-xs">
          <span className="material-symbols-outlined text-[#2e8b57] text-[16px] filled">spa</span>
          <span>Wholesome little bites for growing little ones 💚</span>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 w-full px-gutter md:px-margin max-w-7xl mx-auto flex items-center justify-between gap-space-md">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-space-sm group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-[0_4px_12px_-2px_rgba(82,49,24,0.12)] group-hover:scale-105 transition-transform bg-[#ffd9e1] flex items-center justify-center">
              <img
                src={NIBBLES_LOGO_PEEK}
                alt="Nibbles"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-[#e80074] leading-none tracking-tight font-bold">
                Nibbles
              </span>
              <span className="font-label-sm text-label-sm text-[#815432] leading-tight mt-0.5">
                Organic Baby Kitchen
              </span>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Pill Menu */}
        <nav className="hidden md:flex items-center gap-space-xs bg-[#faf7ee] px-space-xs py-space-xs rounded-full shadow-[inset_0_2px_4px_rgba(82,49,24,0.04)]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#e80074] text-white font-bold shadow-[0_4px_14px_rgba(232,0,116,0.3)]'
                    : 'text-[#5b3f46] hover:text-[#2f1401] hover:bg-[#fffdf8]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Cart, Profile, Mobile Hamburger */}
        <div className="flex items-center gap-space-sm">
          {/* Quick Search Button */}
          <button
            aria-label="Search foods"
            type="button"
            onClick={onOpenSearch}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffe3d2] hover:text-[#ba005c] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Cart with Live Counter */}
          <button
            aria-label="View shopping cart"
            type="button"
            onClick={() => setCurrentPage('cart')}
            className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-colors cursor-pointer ${
              currentPage === 'cart' || currentPage === 'checkout'
                ? 'bg-[#e80074] text-white shadow-[0_4px_14px_rgba(232,0,116,0.3)]'
                : 'bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffe3d2]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {totalUnits > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#e80074] text-white font-label-sm text-[11px] leading-tight flex items-center justify-center shadow-[0_2px_8px_rgba(232,0,116,0.35)] animate-in zoom-in font-bold">
                {totalUnits}
              </span>
            )}
          </button>

          {/* Profile Avatar / Mascot Icon */}
          <div className="hidden sm:block pl-space-xs">
            <button
              onClick={() => setCurrentPage('our-story')}
              title="Meet Chef Barnaby Monkey"
              className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#e80074]/30 hover:ring-[#e80074] transition-all cursor-pointer"
            >
              <img
                src={MONKEY_CHEF_AVATAR}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffe3d2] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fffdf8] border-t border-[#ffeade] px-gutter py-space-md shadow-xl flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`py-3 px-4 rounded-xl text-left font-label-lg text-label-lg transition-colors flex items-center justify-between ${
                currentPage === link.id
                  ? 'bg-[#e80074] text-white font-bold'
                  : 'text-[#2f1401] hover:bg-[#faf7ee]'
              }`}
            >
              <span>{link.label}</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          ))}
          <div className="pt-2 border-t border-[#ffeade] flex items-center justify-between text-body-sm text-[#815432]">
            <span>100% Certified Organic Kitchen</span>
            <span className="text-[#e80074] font-bold">Zero Added Sugar</span>
          </div>
        </div>
      )}
    </header>
  );
};

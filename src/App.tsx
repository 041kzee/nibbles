import React, { useState, useEffect } from 'react';
import { PageRoute, Product } from './types';
import { PRODUCTS } from './data/products';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { QuizModal } from './components/QuizModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ShopByAgePage } from './pages/ShopByAgePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OurStoryPage } from './pages/OurStoryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  // Scroll to top whenever page route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleSelectStage = (_stage: '6m' | '8m' | '12m') => {
    setCurrentPage('shop-by-age');
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#fffcfb] text-[#2f1401] font-sans antialiased selection:bg-[#ba005c]/10 selection:text-[#ba005c]">
        {/* Universal Top Header */}
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Top spacer for fixed header */}
        <div className="h-28" />

        {/* Page Content View Router */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              setCurrentPage={setCurrentPage}
              onSelectProduct={handleSelectProduct}
              onSelectStage={handleSelectStage}
            />
          )}

          {currentPage === 'shop' && (
            <ShopPage
              onSelectProduct={handleSelectProduct}
              onQuickView={(product) => setQuickViewProduct(product)}
            />
          )}

          {currentPage === 'shop-by-age' && (
            <ShopByAgePage
              onSelectProduct={handleSelectProduct}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}

          {currentPage === 'product-detail' && (
            <ProductDetailPage
              product={selectedProduct}
              setCurrentPage={setCurrentPage}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentPage === 'cart' && (
            <CartPage setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'checkout' && (
            <CheckoutPage setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'our-story' && (
            <OurStoryPage
              setCurrentPage={setCurrentPage}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}
        </main>

        {/* Universal Footer */}
        <Footer
          setCurrentPage={setCurrentPage}
          onOpenStage={handleSelectStage}
        />

        {/* Modals & Overlays */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onViewDetails={handleSelectProduct}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={handleSelectProduct}
        />

        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onSelectStage={handleSelectStage}
          onSelectProduct={handleSelectProduct}
        />

        {/* Floating Toast Notification */}
        <Toast />
      </div>
    </CartProvider>
  );
}

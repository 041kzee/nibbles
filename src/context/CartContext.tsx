import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, packSize?: '200g Pouch' | 'Pack of 2' | 'Pack of 3', customPrice?: number) => void;
  updateQty: (productId: number, delta: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  resetDemoCart: () => void;
  totalUnits: number;
  subtotal: number;
  discount: number;
  shipping: number;
  grandTotal: number;
  promoCode: string;
  promoApplied: boolean;
  promoDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the 3 screenshot demo items (Banana x2, Health Mix x1, Ragi & Apple x1 = 4 total units)
  const [items, setItems] = useState<CartItem[]>(() => {
    const banana = PRODUCTS.find((p) => p.id === 1);
    const health = PRODUCTS.find((p) => p.id === 2);
    const ragiApple = PRODUCTS.find((p) => p.id === 4);

    const initial: CartItem[] = [];
    if (banana) initial.push({ product: banana, quantity: 2, packSize: '200g Pouch', unitPrice: 299 });
    if (health) initial.push({ product: health, quantity: 1, packSize: '200g Pouch', unitPrice: 349 });
    if (ragiApple) initial.push({ product: ragiApple, quantity: 1, packSize: '200g Pouch', unitPrice: 289 });
    return initial;
  });

  const [promoCode, setPromoCode] = useState<string>('NIBBLEFIRST');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0.10); // 10% welcome discount
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    packSize: '200g Pouch' | 'Pack of 2' | 'Pack of 3' = '200g Pouch',
    customPrice?: number
  ) => {
    const finalPrice = customPrice !== undefined ? customPrice : product.price;

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.packSize === packSize
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, packSize, unitPrice: finalPrice }];
      }
    });

    showToast(`Added ${quantity} × ${product.name} to basket! 🥣`);
  };

  const updateQty = (productId: number, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from basket');
  };

  const clearCart = () => {
    setItems([]);
  };

  const resetDemoCart = () => {
    const banana = PRODUCTS.find((p) => p.id === 1);
    const health = PRODUCTS.find((p) => p.id === 2);
    const ragiApple = PRODUCTS.find((p) => p.id === 4);

    const initial: CartItem[] = [];
    if (banana) initial.push({ product: banana, quantity: 2, packSize: '200g Pouch', unitPrice: 299 });
    if (health) initial.push({ product: health, quantity: 1, packSize: '200g Pouch', unitPrice: 349 });
    if (ragiApple) initial.push({ product: ragiApple, quantity: 1, packSize: '200g Pouch', unitPrice: 289 });

    setItems(initial);
    setPromoCode('NIBBLEFIRST');
    setPromoApplied(true);
    setPromoDiscountPercent(0.10);
    showToast('Demo basket restored with 4 items');
  };

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'NIBBLEFIRST') {
      setPromoCode('NIBBLEFIRST');
      setPromoApplied(true);
      setPromoDiscountPercent(0.10);
      return { success: true, message: 'Code NIBBLEFIRST gives 10% Welcome Discount!' };
    } else if (cleaned === 'TINYBABY' || cleaned === 'YUMMY10') {
      setPromoCode(cleaned);
      setPromoApplied(true);
      setPromoDiscountPercent(0.15);
      return { success: true, message: `Code ${cleaned} applied for 15% VIP discount!` };
    } else {
      setPromoApplied(false);
      setPromoDiscountPercent(0);
      return { success: false, message: 'Invalid promo code. Try NIBBLEFIRST.' };
    }
  };

  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * promoDiscountPercent) : 0;
  const shipping = subtotal >= 1500 || totalUnits === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        resetDemoCart,
        totalUnits,
        subtotal,
        discount,
        shipping,
        grandTotal,
        promoCode,
        promoApplied,
        promoDiscountPercent,
        applyPromoCode,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

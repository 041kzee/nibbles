import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      id="nibbles-toast"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-[#fffdf8] text-[#2f1401] px-space-md py-space-sm rounded-full shadow-[0_12px_36px_-6px_rgba(82,49,24,0.18)] border border-[#ffeade] animate-in slide-in-from-bottom-5 duration-300"
    >
      <span className="w-8 h-8 rounded-full bg-[#d6f5e3] text-[#2e8b57] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[18px] filled">check_circle</span>
      </span>
      <span className="font-label-md text-label-md text-[#2f1401] font-bold">
        {toastMessage}
      </span>
    </div>
  );
};

import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewDetails,
}) => {
  const { addToCart } = useCart();
  const [selectedPack, setSelectedPack] = React.useState<'200g Pouch' | 'Pack of 2' | 'Pack of 3'>('200g Pouch');

  if (!product) return null;

  const packPrices = {
    '200g Pouch': product.price,
    'Pack of 2': Math.round(product.price * 2 * 0.9),
    'Pack of 3': Math.round(product.price * 3 * 0.85),
  };

  const currentPrice = packPrices[selectedPack];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-gutter animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#fffdf8] rounded-2xl max-w-xl w-full p-space-lg shadow-2xl relative flex flex-col gap-space-md border border-[#ffeade]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#ffeade] flex items-center justify-center text-[#2f1401] hover:bg-[#ffdcc6] transition-colors cursor-pointer"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-space-md items-center">
          {/* Product Image Frame */}
          <div className="w-44 h-44 rounded-2xl bg-[#e8f8ee] flex items-center justify-center overflow-hidden shrink-0 p-3 shadow-inner">
            <img
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-md"
              src={product.imageUrl}
            />
          </div>

          {/* Core Info */}
          <div className="flex flex-col gap-space-xs w-full">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#d6f5e3] text-[#2e8b57] font-bold">
                {product.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#ffc299] text-[#7a4e2d] font-bold">
                {product.age}
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-[#2f1401] font-bold leading-tight">
              {product.name}
            </h2>
            <p className="font-body-sm text-body-sm text-[#815432] line-clamp-2">
              {product.desc}
            </p>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-headline-lg text-headline-lg text-[#e80074] font-extrabold">
                ₹{currentPrice}
              </span>
              <span className="font-body-sm text-body-sm text-[#8f6f76] line-through">
                ₹{product.mrp}
              </span>
              <span className="font-label-sm text-label-sm text-[#2e8b57] bg-[#d6f5e3] px-2 py-0.5 rounded-full font-bold">
                Net Wt. {product.weight}
              </span>
            </div>
          </div>
        </div>

        {/* Pack Selector */}
        <div className="flex flex-col gap-1.5 pt-1">
          <label className="font-label-sm text-label-sm text-[#815432]">Choose Pack Size:</label>
          <div className="grid grid-cols-3 gap-2">
            {(['200g Pouch', 'Pack of 2', 'Pack of 3'] as const).map((pack) => (
              <button
                key={pack}
                type="button"
                onClick={() => setSelectedPack(pack)}
                className={`py-2 px-2 rounded-xl text-center font-label-sm text-label-sm transition-all cursor-pointer ${
                  selectedPack === pack
                    ? 'bg-[#e80074] text-white font-bold shadow-md'
                    : 'bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffeade]'
                }`}
              >
                <div>{pack}</div>
                <div className="text-[11px] opacity-80">₹{packPrices[pack]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hygiene & Purity Notice */}
        <div className="bg-[#fff1ea] p-space-sm rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#815432] font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[18px] text-[#2e8b57] filled">
              check_circle
            </span>
            <span>Steam Sterilized • Zero Sugar • 100% Organic</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-space-sm pt-1">
          <button
            type="button"
            onClick={() => {
              addToCart(product, 1, selectedPack, currentPrice);
              onClose();
            }}
            className="flex-1 py-3 bg-[#e80074] hover:bg-[#fa198b] text-white rounded-full font-label-md text-label-md font-bold shadow-[0_4px_14px_rgba(232,0,116,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Add to Cart (₹{currentPrice})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onViewDetails(product);
            }}
            className="px-5 py-3 rounded-full bg-[#faf7ee] hover:bg-[#ffeade] text-[#2f1401] font-label-md text-label-md transition-colors cursor-pointer"
          >
            Full Details
          </button>
        </div>
      </div>
    </div>
  );
};

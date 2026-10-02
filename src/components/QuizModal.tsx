import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage: (stage: '6m' | '8m' | '12m') => void;
  onSelectProduct: (product: Product) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onSelectStage,
  onSelectProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [babyAge, setBabyAge] = useState<string>('6-8m');
  const [milestone, setMilestone] = useState<string>('sitting');
  const [textureGoal, setTextureGoal] = useState<string>('smooth');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleFinish = () => {
    setStep(2);
  };

  const getRecommendedStage = () => {
    if (babyAge === '6-8m' || textureGoal === 'smooth') return '6m';
    if (babyAge === '8-12m' || textureGoal === 'mash') return '8m';
    return '12m';
  };

  const recommendedStage = getRecommendedStage();
  const recommendedProducts = PRODUCTS.filter((p) => {
    if (recommendedStage === '6m') return p.age === '6+ Months';
    if (recommendedStage === '8m') return p.age === '8+ Months';
    return p.age === '12+ Months';
  }).slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-gutter animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#fffdf8] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col gap-4 border border-[#ffeade]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#ffeade] flex items-center justify-center text-[#2f1401] hover:bg-[#ffdcc6] transition-colors"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {step === 1 ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-label-sm mb-2">
              <span className="material-symbols-outlined text-[16px] filled">spa</span>
              <span>60-Second Weaning Assessment</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-[#2f1401] mb-1 font-bold">
              Find Your Baby's Starting Nibble
            </h3>
            <p className="font-body-sm text-body-sm text-[#815432] mb-5">
              Answer 3 gentle questions to determine optimal texture, grain complexity, and nutritional density.
            </p>

            {/* Question 1 */}
            <div className="mb-4">
              <label className="font-label-md text-label-md text-[#2f1401] block mb-2">
                1. How old is your little one?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '6-8m', label: '6 - 8 Months' },
                  { id: '8-12m', label: '8 - 12 Months' },
                  { id: '12m+', label: '12+ Months' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBabyAge(opt.id)}
                    className={`py-2.5 px-3 rounded-xl font-label-sm text-label-sm text-center transition-all ${
                      babyAge === opt.id
                        ? 'bg-[#e80074] text-white font-bold shadow-md'
                        : 'bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffeade]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="mb-4">
              <label className="font-label-md text-label-md text-[#2f1401] block mb-2">
                2. What feeding milestone are they demonstrating?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sitting', label: 'Sitting with support, eager eyes' },
                  { id: 'tongue', label: 'Tongue-up mash & crawl explorer' },
                  { id: 'pincer', label: 'Pincer grasp & table bite ready' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMilestone(opt.id)}
                    className={`py-2 px-2 rounded-xl text-left text-xs transition-all ${
                      milestone === opt.id
                        ? 'bg-[#ba005c] text-white font-bold shadow-md'
                        : 'bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffeade]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="mb-6">
              <label className="font-label-md text-label-md text-[#2f1401] block mb-2">
                3. What consistency are you looking for right now?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'smooth', label: 'Ultra-Smooth Puree' },
                  { id: 'mash', label: 'Hearty Grain Mash' },
                  { id: 'chew', label: 'Finger Crunch & Boosters' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTextureGoal(opt.id)}
                    className={`py-2.5 px-3 rounded-xl font-label-sm text-label-sm text-center transition-all ${
                      textureGoal === opt.id
                        ? 'bg-[#2e8b57] text-white font-bold shadow-md'
                        : 'bg-[#faf7ee] text-[#2f1401] hover:bg-[#ffeade]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 bg-[#e80074] hover:bg-[#fa198b] text-white rounded-full font-label-lg text-label-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>See Recommended Stage &amp; Blends</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <span className="w-14 h-14 rounded-full bg-[#d6f5e3] text-[#2e8b57] inline-flex items-center justify-center mb-2 shadow-sm">
                <span className="material-symbols-outlined text-[30px] filled">check_circle</span>
              </span>
              <h3 className="font-headline-lg text-headline-lg text-[#2f1401] font-bold">
                {recommendedStage === '6m' && 'Stage 1 (6+ Months): First Nibbles'}
                {recommendedStage === '8m' && 'Stage 2 (8+ Months): Tiny Explorers'}
                {recommendedStage === '12m' && 'Stage 3 (12+ Months): Growing Nibbles'}
              </h3>
              <p className="font-body-sm text-body-sm text-[#815432] max-w-sm mx-auto mt-1">
                Based on your child's age ({babyAge}) and feeding readiness, these gentle, nutritionist-approved blends match their developing tummy.
              </p>
            </div>

            {/* Recommended Products */}
            <div className="space-y-2 mb-6">
              {recommendedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-[#faf7ee] rounded-2xl flex items-center justify-between gap-3 border border-[#ffeade]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-12 h-12 object-contain bg-[#e8f8ee] rounded-xl p-1"
                    />
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-[#2f1401] leading-tight">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-[#815432]">{prod.desc.slice(0, 50)}...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-[#e80074] font-bold">₹{prod.price}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(prod, 1)}
                      className="px-3 py-1.5 rounded-full bg-[#e80074] text-white font-label-sm text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectStage(recommendedStage);
                }}
                className="flex-1 py-3 bg-[#2e8b57] text-white rounded-full font-label-md text-label-md font-bold shadow-md hover:opacity-95 transition-all"
              >
                Explore Full Stage Menu
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 bg-[#faf7ee] text-[#2f1401] rounded-full font-label-md text-label-md hover:bg-[#ffeade] transition-colors"
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

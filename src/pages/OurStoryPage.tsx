import React from 'react';
import { PageRoute } from '../types';
import { MONKEY_MASCOT_BARNABY, BANANA_POUCH_IMAGE, HEALTH_MIX_IMAGE } from '../data/products';

interface OurStoryPageProps {
  setCurrentPage: (page: PageRoute) => void;
  onOpenQuiz: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ setCurrentPage, onOpenQuiz }) => {
  return (
    <div className="min-h-screen bg-[#fffcfb] pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#fff3e7] via-[#fff8f2] to-white py-16 px-4 sm:px-8 border-b border-secondary-container/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">favorite</span>
            Crafted by Doctors, Loved by Little Tummies
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-on-surface mb-6 tracking-tight leading-tight">
            We Believe Tiny Tummies Deserve <br />
            <span className="text-primary italic">Real, Honest Food.</span>
          </h1>

          <p className="text-on-surface-variant text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            No synthetic concentrates, no hidden cane sugars, and no shelf-stabilizing chemicals. Just whole, sun-ripened organic fruits and sprouted grains slow-cooked for baby bliss.
          </p>
        </div>

        {/* Playful Floating Mascots / Fruits */}
        <div className="absolute -left-10 bottom-4 w-32 h-32 opacity-20 pointer-events-none">
          <img src={MONKEY_MASCOT_BARNABY} alt="" className="w-full h-full object-contain" />
        </div>
      </section>

      {/* Origin Story Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#ffd9b3] to-[#ffe9cf] p-8 flex items-center justify-center relative shadow-lg">
              <img
                src={BANANA_POUCH_IMAGE}
                alt="Nibbles Banana Puree Pouch"
                className="w-3/4 h-3/4 object-contain drop-shadow-2xl z-10 animate-pulse hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-secondary flex items-center gap-3">
                <img
                  src={MONKEY_MASCOT_BARNABY}
                  alt="Barnaby"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="font-heading font-black text-xs text-on-surface">Meet Barnaby! 🐵</div>
                  <div className="text-[11px] text-outline font-semibold">Chief Taster & Quality Monkey</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Journey</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-on-surface leading-tight">
              Started in a Home Kitchen When We Couldn't Find What We Needed.
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              When our daughter started solids at six months, we turned every commercial baby food jar around in disbelief. Why was there added sugar in fruit purees? Why were rice starches used as fillers? Why were pouches shelf-stable for two years?
            </p>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              We took matters into our own hands: partnering with certified organic farmer cooperatives across Karnataka and Tamil Nadu, pioneering traditional sprouting methods for ragi, and steaming gently to preserve vitamins and natural vibrancy.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30 text-center">
              <div>
                <div className="font-heading font-black text-2xl text-primary">100%</div>
                <div className="text-xs text-outline font-semibold">Certified Organic</div>
              </div>
              <div>
                <div className="font-heading font-black text-2xl text-secondary">0g</div>
                <div className="text-xs text-outline font-semibold">Added Cane Sugars</div>
              </div>
              <div>
                <div className="font-heading font-black text-2xl text-on-surface">15,000+</div>
                <div className="text-xs text-outline font-semibold">Happy Tummies Fed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Sacred Promises Bento */}
      <section className="bg-[#faf5ef] py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-3xl text-on-surface mb-3">
              The Chef Barnaby Quality Pledge
            </h2>
            <p className="text-on-surface-variant text-sm">
              Every pouch of Nibbles must pass these four ironclad standards before it ever reaches your baby's spoon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-secondary-container/40 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">spa</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-on-surface">Sprouted For Gentle Bellies</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                We sprout our ragi and grains for 48 hours to activate digestion enzymes, reducing anti-nutrients and gas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-secondary-container/40 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">no_drinks</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-on-surface">Zero Added Sweeteners</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Sweetness comes purely from sun-kissed Robusta bananas and organic apples. Never cane sugar, honey, or artificial syrups.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-secondary-container/40 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">science</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-on-surface">Heavy Metal Tested</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Every single harvest is certified by independent third-party laboratories for lead, arsenic, and pesticide safety.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-secondary-container/40 shadow-sm flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-on-surface">100% BPA-Free Pouches</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Non-toxic, safe rounded choke-proof caps, and recyclable packaging that protects against light and air degradation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-16 text-center">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="font-heading font-black text-3xl sm:text-4xl">
              Ready to Start Your Baby's Weaning Adventure?
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              Explore our stage-by-stage organic blends or take our 60-second pediatrician weaning quiz to find the perfect starting pouch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-3.5 bg-white text-primary rounded-full font-bold text-sm shadow-md hover:bg-white/90 transition-all"
              >
                Shop All 13 Blends
              </button>
              <button
                onClick={onOpenQuiz}
                className="px-8 py-3.5 bg-primary-container text-white rounded-full font-bold text-sm border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">quiz</span>
                Take 60s Stage Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

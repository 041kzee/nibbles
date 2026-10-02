import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { MONKEY_IN_BASKET, MONKEY_HELPER } from '../data/products';

interface CartPageProps {
  setCurrentPage: (page: PageRoute) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ setCurrentPage }) => {
  const {
    items,
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
    applyPromoCode,
  } = useCart();

  const [couponInput, setCouponInput] = useState<string>(promoCode);
  const [couponMessage, setCouponMessage] = useState<string>(
    promoApplied ? 'Code NIBBLEFIRST gives 10% Welcome Discount!' : ''
  );

  const FREE_SHIPPING_GOAL = 1500;
  const shippingRemainder = Math.max(0, FREE_SHIPPING_GOAL - subtotal);
  const progressPercent = Math.min(100, Math.max(10, (subtotal / FREE_SHIPPING_GOAL) * 100));

  const handleApplyCoupon = () => {
    const res = applyPromoCode(couponInput);
    setCouponMessage(res.message);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter md:px-margin pb-space-xl">
        {/* Top Progress Steps & Header */}
        <div className="pt-space-md pb-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-[#d6f5e3] text-[#2e8b57] mb-space-xs font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[15px] filled">eco</span>
              <span>100% Certified Organic &amp; Toddler Safe</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-[#2f1401] tracking-tight font-extrabold">
              Your Nibble Basket
            </h1>
            <p className="font-body-md text-body-md text-[#815432] mt-1 max-w-xl">
              Wholesome food mixes for your little one's happy meals.
            </p>
          </div>

          {/* Checkout Flow Progress Stepper */}
          <div className="bg-[#fffdf8] rounded-full px-space-md py-space-xs shadow-[0_10px_25px_-5px_rgba(82,49,24,0.06)] flex items-center gap-space-sm border border-[#ffeade]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#e80074] text-white font-label-sm text-label-sm flex items-center justify-center shadow-[0_2px_8px_rgba(232,0,116,0.35)] font-bold">
                1
              </span>
              <span className="font-label-md text-label-md text-[#e80074] font-bold">Cart</span>
            </div>
            <span className="w-6 h-0.5 bg-[#e3bdc5]/60 rounded-full" />
            <button
              onClick={() => totalUnits > 0 && setCurrentPage('checkout')}
              className={`flex items-center gap-2 transition-opacity cursor-pointer ${
                totalUnits === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-75 hover:opacity-100'
              }`}
            >
              <span className="w-7 h-7 rounded-full bg-[#faf7ee] text-[#5b3f46] font-label-sm text-label-sm flex items-center justify-center font-bold">
                2
              </span>
              <span className="font-label-md text-label-md text-[#5b3f46] hidden sm:inline font-semibold">
                Address
              </span>
            </button>
            <span className="w-6 h-0.5 bg-[#e3bdc5]/60 rounded-full" />
            <div className="flex items-center gap-2 opacity-50">
              <span className="w-7 h-7 rounded-full bg-[#faf7ee] text-[#5b3f46] font-label-sm text-label-sm flex items-center justify-center font-bold">
                3
              </span>
              <span className="font-label-md text-label-md text-[#5b3f46] hidden sm:inline font-semibold">
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* Condition: If Cart has items */}
        {totalUnits > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Left Column: Cart Items & Thresholds */}
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              {/* Free Shipping Progress Tracker */}
              <div className="bg-[#e8f8ee] p-space-md rounded-3xl shadow-[0_10px_30px_-6px_rgba(82,49,24,0.05)] relative overflow-hidden border border-[#d6f5e3]">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e8b57] text-[22px]">
                      local_shipping
                    </span>
                    <p className="font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                      {subtotal >= FREE_SHIPPING_GOAL ? (
                        <span className="text-[#2e8b57]">🎉 Hooray! You unlocked FREE Express Shipping!</span>
                      ) : (
                        <>
                          Add <span className="text-[#e80074]">₹{shippingRemainder}</span> more for{' '}
                          <span className="text-[#2e8b57]">FREE Express Shipping!</span>
                        </>
                      )}
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-bold">
                    Goal: ₹1,500
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-[#815432] mb-3">
                  Orders over ₹1,500 enjoy free priority temperature-controlled delivery.
                </p>
                <div className="w-full h-3 rounded-full bg-[#fffdf8] overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d6f5e3] via-[#2e8b57] to-[#e80074] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List Card */}
              <div className="bg-[#fffdf8] rounded-3xl p-space-md md:p-space-lg shadow-[0_10px_30px_-4px_rgba(82,49,24,0.06)] flex flex-col gap-space-md border border-[#ffeade]">
                <div className="flex items-center justify-between pb-space-xs border-b border-[#ffeade]">
                  <h2 className="font-headline-lg text-headline-lg text-[#2f1401] font-bold">
                    Selected Nourishment ({totalUnits})
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="font-label-sm text-label-sm text-[#815432] hover:text-[#e80074] transition-colors flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove_shopping_cart</span>
                    <span>Empty Basket</span>
                  </button>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-space-md">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="group p-space-sm md:p-space-md rounded-2xl bg-[#faf7ee] transition-all duration-300 hover:shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-[#ffeade]"
                    >
                      <div className="flex items-center gap-space-md w-full sm:w-auto">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#fffdf8] flex items-center justify-center p-2 shrink-0 shadow-sm overflow-hidden border border-[#ffeade]">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-[10px] uppercase font-bold">
                            {item.product.badge || 'Organic'}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-xs mb-1">
                            <span className="px-space-xs py-0.5 rounded-full bg-[#ffc299]/40 text-[#7a4e2d] font-label-sm text-[11px] font-bold">
                              {item.product.age}
                            </span>
                            <span className="text-[#815432] text-[12px] font-body-sm">
                              • {item.product.stage}
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-[#2f1401] leading-tight font-bold">
                            {item.product.name}
                          </h3>
                          <p className="font-body-sm text-body-sm text-[#815432] mt-0.5">
                            {item.packSize} • {item.product.desc.slice(0, 38)}...
                          </p>
                          <span className="font-label-md text-label-md text-[#934a17] mt-1 sm:hidden font-bold">
                            ₹{item.unitPrice} each
                          </span>
                        </div>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-space-lg w-full sm:w-auto">
                        <div className="hidden sm:block text-right">
                          <span className="block font-label-sm text-label-sm text-[#815432]">Price</span>
                          <span className="font-label-md text-label-md text-[#2f1401] font-bold">
                            ₹{item.unitPrice}
                          </span>
                        </div>

                        {/* Quantity Bubble Selector */}
                        <div className="flex items-center bg-[#fffdf8] rounded-full p-1 shadow-sm border border-[#ffeade]">
                          <button
                            aria-label="Decrease quantity"
                            type="button"
                            onClick={() => updateQty(item.product.id, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#815432] hover:bg-[#ffeade] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="w-9 text-center font-headline-sm text-headline-sm text-[#2f1401] font-bold">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            type="button"
                            onClick={() => updateQty(item.product.id, 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e80074] hover:bg-[#ffeade] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>

                        <div className="text-right min-w-[75px]">
                          <span className="block font-label-sm text-label-sm text-[#815432] sm:hidden">
                            Subtotal
                          </span>
                          <span className="font-headline-md text-headline-md text-[#e80074] font-extrabold">
                            ₹{item.unitPrice * item.quantity}
                          </span>
                        </div>

                        <button
                          aria-label={`Remove ${item.product.name}`}
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="w-9 h-9 rounded-full bg-[#fffdf8] flex items-center justify-center text-[#815432] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors border border-[#ffeade] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[19px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Input & Fresh Milled Notice */}
                <div className="pt-space-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md border-t border-[#ffeade]">
                  <div className="flex-1 max-w-md">
                    <label className="block font-label-sm text-label-sm text-[#815432] mb-1 font-bold">
                      Have a promo or doctor code?
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Try NIBBLEFIRST"
                        className="w-full h-12 pl-space-md pr-28 rounded-full bg-[#faf7ee] font-label-md text-label-md text-[#2f1401] uppercase focus:outline-none focus:ring-2 focus:ring-[#e80074] transition-all border border-[#ffeade]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="absolute right-1 px-space-md h-10 rounded-full bg-[#e80074] hover:bg-[#fa198b] text-white font-label-md text-label-md font-bold transition-all shadow-md cursor-pointer"
                      >
                        {promoApplied && couponInput.toUpperCase() === promoCode ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {couponMessage && (
                      <p
                        className={`font-body-sm text-[12px] font-bold mt-1.5 flex items-center gap-1 ${
                          promoApplied ? 'text-[#2e8b57]' : 'text-[#ba1a1a]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px] filled">
                          {promoApplied ? 'check_circle' : 'error'}
                        </span>
                        <span>{couponMessage}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-space-xs p-space-sm rounded-2xl bg-[#fff1ea] max-w-xs border border-[#ffeade]">
                    <span className="material-symbols-outlined text-[#934a17] text-[26px]">
                      child_friendly
                    </span>
                    <p className="font-body-sm text-body-sm text-[#815432] leading-snug">
                      Every pouch is freshly milled to order in hypoallergenic baby kitchen standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Little Tummy Promise Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                <div className="bg-[#fffdf8] p-space-md rounded-2xl flex items-center gap-space-sm shadow-sm border border-[#ffeade]">
                  <div className="w-10 h-10 rounded-full bg-[#d6f5e3] text-[#2e8b57] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px] filled">verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-[15px] text-[#2f1401] font-bold">100% Safe</h4>
                    <p className="font-body-sm text-[12px] text-[#815432]">Zero heavy metals tested</p>
                  </div>
                </div>

                <div className="bg-[#fffdf8] p-space-md rounded-2xl flex items-center gap-space-sm shadow-sm border border-[#ffeade]">
                  <div className="w-10 h-10 rounded-full bg-[#ffc299]/50 text-[#934a17] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">no_meals</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-[15px] text-[#2f1401] font-bold">No Sugar / Salt</h4>
                    <p className="font-body-sm text-[12px] text-[#815432]">Natural goodness only</p>
                  </div>
                </div>

                <div className="bg-[#fffdf8] p-space-md rounded-2xl flex items-center gap-space-sm shadow-sm border border-[#ffeade]">
                  <div className="w-10 h-10 rounded-full bg-[#ffd9e1] text-[#e80074] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">all_inclusive</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-[15px] text-[#2f1401] font-bold">Free Return</h4>
                    <p className="font-body-sm text-[12px] text-[#815432]">Tummy-happy guarantee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card (Sticky) */}
            <div className="lg:col-span-4 sticky top-28 flex flex-col gap-space-md">
              <div className="bg-[#fffdf8] rounded-3xl p-space-lg shadow-[0_12px_36px_-6px_rgba(82,49,24,0.08)] flex flex-col gap-space-md border border-[#ffeade]">
                <div className="flex items-center justify-between pb-2 border-b border-[#ffeade]">
                  <h2 className="font-headline-lg text-headline-lg text-[#2f1401] font-bold">
                    Order Summary
                  </h2>
                  <span className="px-space-xs py-0.5 rounded-full bg-[#d6f5e3] text-[#2e8b57] font-label-sm text-label-sm font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#2e8b57] animate-pulse" />
                    Verified
                  </span>
                </div>

                {/* Cost Breakdown List */}
                <div className="flex flex-col gap-space-sm text-body-md text-[#2f1401]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#815432]">Items Subtotal</span>
                    <span className="font-label-lg text-label-lg font-bold">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-[#2e8b57]">
                      <span className="flex items-center gap-1">
                        <span>Promotional Discount (10%)</span>
                      </span>
                      <span className="font-label-lg text-label-lg font-bold">
                        -₹{discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[#815432] flex items-center gap-1">
                      Estimated Delivery
                      <span className="material-symbols-outlined text-[16px] text-[#8f6f76]">info</span>
                    </span>
                    <span className="font-label-lg text-label-lg text-[#934a17] font-bold">
                      {shipping === 0 ? <span className="text-[#2e8b57]">FREE</span> : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#815432]">Estimated GST &amp; FSSAI Care</span>
                    <span className="text-[#815432] font-label-sm text-label-sm">Included in price</span>
                  </div>

                  <div className="w-full h-px bg-[#e3bdc5]/40 my-1" />

                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <span className="block font-headline-md text-headline-md text-[#2f1401] font-bold">
                        Total Payable
                      </span>
                      <span className="text-[12px] text-[#815432]">All taxes &amp; packaging included</span>
                    </div>
                    <span className="font-display-lg text-[34px] leading-tight text-[#e80074] font-extrabold">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout CTA */}
                <button
                  type="button"
                  onClick={() => setCurrentPage('checkout')}
                  className="w-full py-space-md px-space-lg rounded-full bg-[#e80074] hover:bg-[#fa198b] text-white font-headline-sm text-headline-sm text-center font-bold shadow-[0_8px_24px_rgba(232,0,116,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                {/* Return to Shop Link */}
                <button
                  type="button"
                  onClick={() => setCurrentPage('shop')}
                  className="text-center font-label-md text-label-md text-[#815432] hover:text-[#e80074] transition-colors py-1 flex items-center justify-center gap-1 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Continue Shopping for Nibbles</span>
                </button>

                {/* Trust Badges Under Summary */}
                <div className="pt-space-xs flex flex-col gap-2 bg-[#faf7ee]/70 p-space-sm rounded-2xl border border-[#ffeade]">
                  <div className="flex items-center gap-space-xs text-[#815432] font-body-sm text-[13px]">
                    <span className="material-symbols-outlined text-[#2e8b57] text-[18px]">lock</span>
                    <span>100% Safe &amp; 256-Bit Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-[#815432] font-body-sm text-[13px]">
                    <span className="material-symbols-outlined text-[#2e8b57] text-[18px]">verified</span>
                    <span>Fresh Batch Guaranteed (Mfg. this week)</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-[#815432] font-body-sm text-[13px]">
                    <span className="material-symbols-outlined text-[#2e8b57] text-[18px]">spa</span>
                    <span>100% Chemical &amp; Preservative Free</span>
                  </div>
                </div>
              </div>

              {/* Mascot Helper Bubble */}
              <div className="bg-[#e8f8ee]/90 p-space-md rounded-3xl flex items-center gap-space-md shadow-sm border border-[#d6f5e3]">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={MONKEY_HELPER}
                    alt="Nibbles Nutrition Helper"
                  />
                </div>
                <div>
                  <h4 className="font-headline-sm text-[15px] text-[#2f1401] font-bold">
                    Nibbles Nutrition Tip
                  </h4>
                  <p className="font-body-sm text-[12px] text-[#815432] leading-relaxed">
                    Start with 1 tablespoon mixed with lukewarm water or breastmilk for first spoon-feeders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Basket State View */
          <div className="flex flex-col items-center justify-center text-center py-space-xl px-gutter max-w-2xl mx-auto">
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-space-md rounded-full bg-[#e8f8ee] flex items-center justify-center p-space-md shadow-[0_12px_40px_-8px_rgba(82,49,24,0.08)] border-4 border-white">
              <img
                className="w-40 h-40 md:w-48 md:h-48 object-contain"
                src={MONKEY_IN_BASKET}
                alt="Empty Basket Mascot"
              />
              <span className="absolute -bottom-2 px-space-md py-1 rounded-full bg-[#fffdf8] shadow-md font-label-md text-label-md text-[#e80074] font-bold flex items-center gap-1 border border-[#ffeade]">
                <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                <span>Tummy Waiting!</span>
              </span>
            </div>

            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-[#2f1401] tracking-tight mb-2 font-extrabold">
              Your Nibble Basket is empty
            </h2>
            <p className="font-body-lg text-body-lg text-[#815432] mb-space-lg max-w-md">
              Your Nibble Basket is waiting for some tiny favourites 💚 Explore our doctor-approved fresh blends for curious little palates.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full justify-center">
              <button
                type="button"
                onClick={() => setCurrentPage('shop')}
                className="w-full sm:w-auto px-space-xl py-space-md rounded-full bg-[#e80074] hover:bg-[#fa198b] text-white font-headline-sm text-headline-sm font-bold shadow-[0_6px_20px_rgba(232,0,116,0.35)] transition-all cursor-pointer"
              >
                Explore Nibbles Shop
              </button>
              <button
                type="button"
                onClick={resetDemoCart}
                className="w-full sm:w-auto px-space-lg py-space-md rounded-full bg-[#fffdf8] hover:bg-[#faf7ee] text-[#815432] font-label-lg text-label-lg font-bold shadow-sm transition-all border border-[#ffeade] cursor-pointer"
              >
                Reset Demo Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

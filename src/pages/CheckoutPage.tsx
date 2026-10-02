import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';
import { MONKEY_CHEF_AVATAR, MONKEY_MASCOT_BARNABY } from '../data/products';

interface CheckoutPageProps {
  setCurrentPage: (page: PageRoute) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ setCurrentPage }) => {
  const {
    items,
    subtotal,
    discount,
    shipping,
    grandTotal,
    promoCode,
    promoApplied,
    applyPromoCode,
    clearCart,
    showToast,
  } = useCart();

  const [emailOrPhone, setEmailOrPhone] = useState('kanzee3011@gmail.com');
  const [newsOptIn, setNewsOptIn] = useState(true);
  const [firstName, setFirstName] = useState('Ananya');
  const [lastName, setLastName] = useState('Sharma');
  const [address, setAddress] = useState('Flat 402, Sunshine Orchards, Green Glen Layout');
  const [apartment, setApartment] = useState('Tower 3, Bellandur');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pinCode, setPinCode] = useState('560103');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [saveAddress, setSaveAddress] = useState(true);

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [cardName, setCardName] = useState('ANANYA SHARMA');

  const [promoInput, setPromoInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = shippingMethod === 'express' ? 99 : shipping;
  const finalPayable = subtotal - discount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    showToast(res.message);
    setPromoInput('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !city || !pinCode) {
      showToast('Please fill in your delivery address details');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = `NIB-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(randomOrderId);
      setOrderConfirmed(true);
      showToast('🎉 Order placed successfully! Thank you for trusting Nibbles!');
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#fff9f6] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-secondary-container/40 text-center relative overflow-hidden">
          {/* Confetti / celebration decor */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

          <div className="w-24 h-24 mx-auto mb-6 bg-secondary-container/50 rounded-full flex items-center justify-center p-3 relative shadow-inner">
            <img
              src={MONKEY_MASCOT_BARNABY}
              alt="Barnaby Chef Nibbles"
              className="w-full h-full object-contain drop-shadow"
            />
            <span className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1.5 shadow">
              <span className="material-symbols-outlined text-base leading-none">done</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-sm">verified</span>
            Order Confirmed & Safely Queued
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl text-on-surface mb-3">
            Hooray! Baby's Pure Nibbles Are on the Way! 🍌
          </h1>

          <p className="text-on-surface-variant text-base sm:text-lg mb-6 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-on-surface">{firstName}</strong>! Your baby-safe meal pouches are being freshly small-batch prepared in our certified sterile kitchen.
          </p>

          <div className="bg-[#faf3ee] rounded-2xl p-5 mb-8 text-left border border-outline-variant/30 space-y-3">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Order Reference</span>
              <span className="font-mono font-bold text-primary text-base">{orderId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Estimated Delivery</span>
              <span className="font-bold text-on-surface text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-base">local_shipping</span>
                2 - 3 Days (Cold Insulated Pack)
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Delivery To</span>
              <span className="font-semibold text-on-surface text-sm text-right max-w-xs truncate">
                {address}, {city} - {pinCode}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Total Paid</span>
              <span className="font-black text-lg text-primary">₹{finalPayable.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="px-8 py-3.5 bg-primary text-white rounded-full font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              Back to Home
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-8 py-3.5 bg-secondary-container text-on-secondary-container rounded-full font-bold hover:bg-secondary/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">storefront</span>
              Explore More Blends
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20 text-xs text-outline flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-green-600">health_and_safety</span>
              100% Baby-Safe Guarantee
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">mail</span>
              Confirmation sent to {emailOrPhone}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfb] pb-24">
      {/* Top Banner / Breadcrumb Header */}
      <div className="bg-white border-b border-outline-variant/20 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('cart')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Return to Cart
            </button>
            <span className="text-outline-variant">|</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <span className="text-outline">Cart</span>
              <span className="text-outline-variant">›</span>
              <span className="text-primary font-black">Shipping & Payment</span>
              <span className="text-outline-variant">›</span>
              <span className="text-outline">Confirmation</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
            <span className="material-symbols-outlined text-sm">lock</span>
            256-Bit Encrypted Baby-Safe Checkout
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Express Checkout */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-outline mb-3 text-center">
                Express Baby Checkout
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('upi');
                    showToast('Express Google Pay selected');
                  }}
                  className="py-3 px-4 rounded-2xl border-2 border-outline-variant/30 hover:border-primary flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-on-surface hover:bg-primary/5 transition-all shadow-sm"
                >
                  <span className="font-extrabold text-[#4285F4]">G</span>
                  <span className="font-bold">Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('upi');
                    showToast('Express PhonePe selected');
                  }}
                  className="py-3 px-4 rounded-2xl border-2 border-outline-variant/30 hover:border-secondary flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-on-surface hover:bg-secondary/5 transition-all shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-[#5f259f] text-white text-[10px] font-black flex items-center justify-center">पे</span>
                  <span>PhonePe</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('upi');
                    showToast('Express Paytm selected');
                  }}
                  className="py-3 px-4 rounded-2xl border-2 border-outline-variant/30 hover:border-blue-500 col-span-2 sm:col-span-1 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-on-surface hover:bg-blue-50 transition-all shadow-sm"
                >
                  <span className="text-[#002e6e] font-black tracking-tight">Paytm</span>
                </button>
              </div>

              <div className="relative my-6 text-center">
                <hr className="border-outline-variant/30" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-outline">
                  OR ENTER DETAILS BELOW
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-lg text-on-surface flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                    Parent & Contact Details
                  </h3>
                  <span className="text-xs text-outline">For live SMS/WhatsApp order updates</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">
                    Email Address or Mobile Number *
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                    placeholder="e.g., mommy@example.com or +91 98765 43210"
                    className="w-full px-4 py-3 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={newsOptIn}
                    onChange={(e) => setNewsOptIn(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="text-xs text-on-surface-variant font-medium">
                    Email & WhatsApp me baby weaning milestone guides and early small-batch drops
                  </span>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
              <h3 className="font-heading font-black text-lg text-on-surface flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                Safe Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Address (House / Flat / Street) *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g. Flat 402, Sunshine Orchards"
                  className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Apartment, Suite, Landmark (Optional)</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="e.g. Near Motherhood Hospital, Bellandur"
                  className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">PIN Code *</label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Phone Number for Delivery Agent *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary text-sm font-semibold"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="w-4 h-4 rounded text-primary accent-primary"
                />
                <span className="text-xs text-on-surface-variant font-medium">
                  Save this address for fast 1-click reorders next month
                </span>
              </label>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
              <h3 className="font-heading font-black text-lg text-on-surface flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
                Temperature-Protected Shipping
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant/30 hover:border-outline-variant'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <div>
                      <div className="font-bold text-sm text-on-surface flex items-center gap-2">
                        Standard Safe Baby-Pack Shipping (2-3 Days)
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Recommended
                        </span>
                      </div>
                      <div className="text-xs text-outline mt-0.5">
                        Double-sealed insulated pouches with food-grade moisture barrier
                      </div>
                    </div>
                  </div>
                  <span className="font-black text-sm text-primary">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant/30 hover:border-outline-variant'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <div>
                      <div className="font-bold text-sm text-on-surface flex items-center gap-2">
                        Express Priority Air Delivery (Next Day Baby Arrival)
                        <span className="material-symbols-outlined text-amber-500 text-sm">bolt</span>
                      </div>
                      <div className="text-xs text-outline mt-0.5">
                        Priority dispatch within 3 hours from our certified kitchen
                      </div>
                    </div>
                  </div>
                  <span className="font-black text-sm text-on-surface">₹99</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
              <h3 className="font-heading font-black text-lg text-on-surface flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
                Secure Payment
              </h3>

              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  className={`rounded-2xl border-2 transition-all p-4 ${
                    paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-outline-variant/30'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="font-bold text-sm text-on-surface">
                        UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-xl">qr_code_scanner</span>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-primary/20 space-y-2">
                      <label className="block text-xs font-bold text-on-surface-variant">Enter Virtual Payment Address (UPI ID)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@okhdfcbank"
                          className="flex-1 px-4 py-2 rounded-xl border border-outline-variant/40 bg-white text-sm font-semibold focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => showToast('UPI ID Verified ✓')}
                          className="px-4 py-2 bg-secondary-container text-on-secondary-container font-bold text-xs rounded-xl hover:bg-secondary/20"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[11px] text-outline">You will receive an instant payment request on your UPI app upon ordering.</p>
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div
                  className={`rounded-2xl border-2 transition-all p-4 ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-outline-variant/30'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="font-bold text-sm text-on-surface">Credit / Debit Card (Visa, RuPay, Mastercard)</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-xl">credit_card</span>
                  </label>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-primary/20 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-outline-variant/40 bg-white text-sm font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-on-surface-variant mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 rounded-xl border border-outline-variant/40 bg-white text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-on-surface-variant mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={4}
                            placeholder="•••"
                            className="w-full px-4 py-2 rounded-xl border border-outline-variant/40 bg-white text-sm font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Name on Card</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-outline-variant/40 bg-white text-sm font-semibold"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div
                  className={`rounded-2xl border-2 transition-all p-4 ${
                    paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-outline-variant/30'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="font-bold text-sm text-on-surface">Cash on Delivery (COD)</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-xl">payments</span>
                  </label>

                  {paymentMethod === 'cod' && (
                    <div className="mt-3 pt-2 text-xs text-outline leading-relaxed border-t border-primary/20">
                      Safe, contactless doorstep delivery. Please keep exact cash or pay the delivery executive via QR code on arrival.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chef Nibbles Taste Guarantee Callout */}
            <div className="bg-[#fff4eb] border border-[#ffddc2] rounded-3xl p-5 sm:p-6 flex items-start gap-4">
              <img
                src={MONKEY_CHEF_AVATAR}
                alt="Chef Barnaby"
                className="w-14 h-14 rounded-full bg-white p-1 border border-secondary shadow-sm flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="font-heading font-black text-on-surface text-base">
                  Chef Barnaby's Tummy-Happiness Guarantee
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We are 100% confident your little one will delight in the natural flavor of Nibbles. If for any reason your baby refuses their first pouch, we'll cheerfully refund your order in full. No complicated returns!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-lg sticky top-6 space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                <h3 className="font-heading font-black text-xl text-on-surface">Order Summary</h3>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {items.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <div className="text-center py-6 text-outline text-sm">
                    Your basket is currently empty.
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.packSize}`}
                      className="flex items-center gap-3.5 pb-3 border-b border-outline-variant/10 last:border-0"
                    >
                      <div className="relative w-14 h-14 bg-surface rounded-xl p-1 border border-outline-variant/20 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-on-surface truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-outline flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.2 bg-secondary-container/40 rounded text-on-secondary-container font-semibold">
                            {item.product.stage}
                          </span>
                          <span>•</span>
                          <span>{item.packSize}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-sm text-on-surface">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. NIBBLEFIRST)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs font-bold uppercase focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-on-surface text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200">
                    <span className="flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-sm">sell</span>
                      Code {promoCode} Applied (-10%)
                    </span>
                    <span className="font-black">-₹{discount.toFixed(0)}</span>
                  </div>
                )}
              </form>

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-sm pt-2 border-t border-outline-variant/20">
                <div className="flex justify-between text-on-surface-variant text-xs">
                  <span>Subtotal</span>
                  <span className="font-bold text-on-surface">₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-xs text-green-700">
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant text-xs">
                  <span>Safe Baby-Pack Shipping</span>
                  <span className="font-bold text-on-surface">
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-black">FREE</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-outline">
                  <span>GST & Kitchen Safe Handling</span>
                  <span>Included</span>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-baseline">
                  <div>
                    <span className="font-heading font-black text-lg text-on-surface">Total Payable</span>
                    <div className="text-[11px] text-outline">Includes all taxes and sterile packaging</div>
                  </div>
                  <span className="font-heading font-black text-2xl text-primary">
                    ₹{finalPayable.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Submit CTA */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing || items.length === 0}
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Baby-Safe Order...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                    <span>Complete Baby-Safe Order • ₹{finalPayable.toFixed(0)}</span>
                  </>
                )}
              </button>

              {/* Safety Badges Under Button */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-outline font-semibold">
                <div className="p-2 rounded-xl bg-[#faf6f2] flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-green-600 text-base">eco</span>
                  <span>100% Certified Organic</span>
                </div>
                <div className="p-2 rounded-xl bg-[#faf6f2] flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Pediatrician Approved</span>
                </div>
                <div className="p-2 rounded-xl bg-[#faf6f2] flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-base">verified</span>
                  <span>Clean Label Project</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

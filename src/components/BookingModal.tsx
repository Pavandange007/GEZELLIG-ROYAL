import React, { useState } from 'react';
import { Experience, ExtraOption, PackageTier } from '../data/experiences';
import { useAdmin } from '../context/AdminContext';
import { X, Calendar, Check, Sparkles, Plus, Hotel, Utensils, Compass, Car, Printer } from 'lucide-react';

interface BookingModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ experience, onClose }) => {
  const { createBooking, experiences } = useAdmin();

  if (!experience) return null;

  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>(experience.availableDates[0] || '2026-10-25');
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>(
    experience.packages[0] || { id: 'pkg-default', name: 'ROYAL ESSENTIAL', price: experience.priceFrom, description: 'Standard luxury package', inclusions: [] }
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [selectedBundledExperiences, setSelectedBundledExperiences] = useState<Experience[]>([]);
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientMessage, setRecipientMessage] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('iDEAL');
  
  // Completed Booking State
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Other available experiences to bundle (e.g. 5-Star Hotel Stay, Fine Desserts, Romance, etc.)
  const availableBundles = experiences.filter(exp => exp.id !== experience.id);

  // Calculated Pricing
  const basePrice = selectedPackage.price;
  const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const bundlesTotal = selectedBundledExperiences.reduce((sum, item) => sum + item.priceFrom, 0);
  const totalPrice = basePrice + extrasTotal + bundlesTotal;

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const toggleBundledExperience = (bundleExp: Experience) => {
    if (selectedBundledExperiences.some(e => e.id === bundleExp.id)) {
      setSelectedBundledExperiences(selectedBundledExperiences.filter(e => e.id !== bundleExp.id));
    } else {
      setSelectedBundledExperiences([...selectedBundledExperiences, bundleExp]);
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createBooking({
      experienceId: experience.id,
      experienceTitle: experience.title,
      selectedDate,
      packageName: selectedPackage.name,
      priceTotal: totalPrice,
      extras: selectedExtras.map(e => e.name),
      bundledExperiences: selectedBundledExperiences.map(e => e.title),
      recipientName: recipientName || 'Honored Recipient',
      recipientMessage: recipientMessage || 'A royal experience gifted to you.',
      customerName: customerName || 'Valued Guest',
      customerEmail: customerEmail || 'guest@example.nl',
      customerPhone: customerPhone || '+31 6 12345678',
      paymentMethod
    });
    setConfirmedBooking(created);
    setStep(7);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0B0A09]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121110] border border-[#C8A96B]/30 shadow-2xl my-8 text-[#F5F1E8] animate-fade-in overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C8A96B]/20 bg-[#0B0A09]">
          <div className="flex items-center gap-3">
            <img src="/images/logo-white.png" alt="Gezellig Royal" className="h-9 w-auto object-contain" />
            <div>
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-[0.2em] block font-sans">
                {experience.categoryLabel}
              </span>
              <h3 className="font-serif text-xl text-[#F5F1E8] font-light">
                {experience.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#6D675E] hover:text-[#C8A96B] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Multi-step Navigation Indicator */}
        {step < 7 && (
          <div className="px-6 py-3 bg-[#0B0A09]/50 border-b border-[#C8A96B]/10 flex items-center justify-between text-[11px] text-[#6D675E] uppercase tracking-wider font-sans overflow-x-auto">
            <span className={step >= 1 ? 'text-[#C8A96B] font-medium' : ''}>1. Date</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#C8A96B] font-medium' : ''}>2. Package</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#C8A96B] font-medium' : ''}>3. Add Experiences & Extras</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#C8A96B] font-medium' : ''}>4. Recipient</span>
            <span>→</span>
            <span className={step >= 5 ? 'text-[#C8A96B] font-medium' : ''}>5. Details</span>
            <span>→</span>
            <span className={step >= 6 ? 'text-[#C8A96B] font-medium' : ''}>6. Quote Preference</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: SELECT DATE */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 01
                </span>
                <h2 className="font-serif text-3xl font-light">Select Your Preferred Date</h2>
                <p className="text-xs text-[#6D675E]">
                  Choose an available date for this experience. Date transfers are flexible up to 7 days prior.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {experience.availableDates.map(dateStr => (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-4 border text-left transition-all ${
                      selectedDate === dateStr
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F5F1E8]'
                        : 'border-[#C8A96B]/20 bg-[#0B0A09] text-[#6D675E] hover:border-[#C8A96B]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-[#C8A96B]" />
                      <span className="text-xs font-serif text-[#C8A96B]">Available</span>
                    </div>
                    <span className="text-sm font-medium block text-[#F5F1E8]">
                      {new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="btn-royal-primary text-xs"
                >
                  NEXT: CHOOSE PACKAGE →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PACKAGE */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 02
                </span>
                <h2 className="font-serif text-3xl font-light">Select Package Tier</h2>
                <p className="text-xs text-[#6D675E]">
                  Select the degree of inclusion and luxury treatment tailored for your recipient.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {experience.packages.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-6 border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPackage.id === pkg.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 ring-1 ring-[#C8A96B]'
                        : 'border-[#C8A96B]/20 bg-[#0B0A09] hover:border-[#C8A96B]/50'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-serif text-lg tracking-wider text-[#C8A96B]">
                          {pkg.name}
                        </span>
                        {selectedPackage.id === pkg.id && (
                          <Check className="w-5 h-5 text-[#C8A96B]" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#C8A96B] uppercase tracking-wider font-sans border border-[#C8A96B]/30 px-2 py-0.5 inline-block my-1">
                        Full Quote on Request
                      </span>
                      <p className="text-xs text-[#6D675E] leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <ul className="mt-4 pt-4 border-t border-[#C8A96B]/15 space-y-2 text-[11px] text-[#F5F1E8]/80">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#C8A96B]" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="btn-royal-secondary text-xs"
                >
                  ← BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-royal-primary text-xs"
                >
                  NEXT: ADD EXPERIENCES & EXTRAS →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ADD OTHER EXPERIENCES (HOTEL, DESSERTS, ETC.) & PERSONAL EXTRAS */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 03 — COMPLETE THE ROYAL ITINERARY
                </span>
                <h2 className="font-serif text-3xl font-light">Bundle Other Luxury Experiences & Extras</h2>
                <p className="text-xs text-[#6D675E]">
                  Combine this booking with other handpicked experiences (such as a 5-Star Hotel Stay or Fine Desserts Tasting) plus personal extras for the ultimate royal gift.
                </p>
              </div>

              {/* 1. BUNDLE OTHER EXPERIENCES (Luxury Hotels, Dining, Desserts, Stays) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#C8A96B]/20 pb-2">
                  <Hotel className="w-4 h-4 text-[#C8A96B]" />
                  <h3 className="font-serif text-lg text-[#C8A96B] tracking-wide">
                    Bundle Other Luxury Experiences (Hotels, Dining & Stays)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableBundles.map(bundleExp => {
                    const isBundled = selectedBundledExperiences.some(e => e.id === bundleExp.id);
                    return (
                      <div
                        key={bundleExp.id}
                        onClick={() => toggleBundledExperience(bundleExp)}
                        className={`p-4 border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                          isBundled
                            ? 'border-[#C8A96B] bg-[#C8A96B]/15 ring-1 ring-[#C8A96B]'
                            : 'border-[#C8A96B]/20 bg-[#0B0A09] hover:border-[#C8A96B]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={bundleExp.image}
                            alt={bundleExp.title}
                            className="w-16 h-16 object-cover shrink-0 border border-[#C8A96B]/30"
                          />
                          <div className="space-y-1">
                            <span className="text-[9px] text-[#C8A96B] uppercase tracking-wider block font-sans font-medium">
                              {bundleExp.categoryLabel}
                            </span>
                            <h4 className="font-serif text-sm text-[#F5F1E8] font-medium leading-tight truncate">
                              {bundleExp.title}
                            </h4>
                            <span className="text-[10px] text-[#6D675E] block">
                              {bundleExp.location.split(',')[0]} • {bundleExp.duration}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-[#C8A96B] uppercase font-sans font-medium block">
                            Bundle to Quote
                          </span>
                          <div className={`w-5 h-5 rounded border border-[#C8A96B] flex items-center justify-center mt-1 ml-auto ${isBundled ? 'bg-[#C8A96B]' : ''}`}>
                            {isBundled ? <Check className="w-3.5 h-3.5 text-[#0B0A09]" /> : <Plus className="w-3 h-3 text-[#6D675E]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. PERSONAL TOUCHES & BESPOKE EXTRAS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-[#C8A96B]/20 pb-2">
                  <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                  <h3 className="font-serif text-lg text-[#C8A96B] tracking-wide">
                    Personal Extras & Celebration Touches
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.optionalExtras.map(extra => {
                    const isSelected = selectedExtras.some(e => e.id === extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra)}
                        className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#C8A96B] bg-[#C8A96B]/10 ring-1 ring-[#C8A96B]'
                            : 'border-[#C8A96B]/20 bg-[#0B0A09] hover:border-[#C8A96B]/40'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                            <span className="font-medium text-xs text-[#F5F1E8]">
                              {extra.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6D675E]">
                            {extra.description}
                          </p>
                        </div>

                        <div className="text-right shrink-0 ml-4">
                          <span className="text-[10px] text-[#C8A96B] uppercase font-sans block">
                            Bespoke Touch
                          </span>
                          <div className={`w-5 h-5 rounded border border-[#C8A96B] flex items-center justify-center mt-1 ml-auto ${isSelected ? 'bg-[#C8A96B]' : ''}`}>
                            {isSelected ? <Check className="w-3.5 h-3.5 text-[#0B0A09]" /> : <Plus className="w-3 h-3 text-[#6D675E]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Live Subtotal Banner */}
              <div className="p-4 border border-[#C8A96B]/30 bg-[#0B0A09] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#6D675E]">
                  <span>Quote Scope: </span>
                  <span className="text-[#F5F1E8] font-medium">{experience.title}</span>
                  {selectedBundledExperiences.length > 0 && (
                    <span className="text-[#C8A96B]"> + {selectedBundledExperiences.length} Additional Experience{selectedBundledExperiences.length > 1 ? 's' : ''}</span>
                  )}
                  {selectedExtras.length > 0 && (
                    <span className="text-[#F5F1E8]/70"> + {selectedExtras.length} Extra{selectedExtras.length > 1 ? 's' : ''}</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#6D675E] uppercase">Quotation:</span>
                  <span className="font-serif text-lg md:text-xl text-[#C8A96B]">Contact for Full Quote</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="btn-royal-secondary text-xs"
                >
                  ← BACK
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-royal-primary text-xs"
                >
                  NEXT: RECIPIENT DETAILS →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECIPIENT DETAILS */}
          {step === 4 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-2 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 04
                </span>
                <h2 className="font-serif text-3xl font-light">Recipient Information</h2>
                <p className="text-xs text-[#6D675E]">
                  Who is this royal gift for? Add a personal message that will appear on their royal voucher.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C8A96B] mb-2">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Willem-Alexander van Dijk"
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C8A96B] mb-2">
                    Personal Message / Note for Recipient
                  </label>
                  <textarea
                    rows={4}
                    value={recipientMessage}
                    onChange={(e) => setRecipientMessage(e.target.value)}
                    placeholder="Write a warm personal message..."
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn-royal-secondary text-xs"
                >
                  ← BACK
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="btn-royal-primary text-xs"
                >
                  NEXT: YOUR DETAILS →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CUSTOMER DETAILS */}
          {step === 5 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-2 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 05
                </span>
                <h2 className="font-serif text-3xl font-light">Your Contact Information</h2>
                <p className="text-xs text-[#6D675E]">
                  We will send the booking confirmation, voucher pass, and concierge contact to your email.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C8A96B] mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sophie van Dijk"
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C8A96B] mb-2">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="sophie@example.nl"
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C8A96B] mb-2">
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+31 6 12345678"
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="btn-royal-secondary text-xs"
                >
                  ← BACK
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="btn-royal-primary text-xs"
                >
                  NEXT: QUOTE PREFERENCE →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: QUOTATION & PAYMENT PREFERENCE */}
          {step === 6 && (
            <form onSubmit={handleCompleteBooking} className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 06 — BESPOKE QUOTATION PREFERENCE
                </span>
                <h2 className="font-serif text-3xl font-light">Request Your Full Royal Quote</h2>
                <p className="text-xs text-[#6D675E]">
                  Our concierge will prepare a tailored proposal based on your selected date, package tier, and bundled additions. Select your preferred settlement method for the final quote:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Summary Box */}
                <div className="md:col-span-1 p-5 border border-[#C8A96B]/30 bg-[#0B0A09] space-y-4">
                  <h4 className="font-serif text-lg text-[#C8A96B]">Quote Scope</h4>
                  <div className="space-y-2 text-xs text-[#6D675E] border-b border-[#C8A96B]/15 pb-3">
                    <div className="flex justify-between">
                      <span className="text-[#F5F1E8]">Primary:</span>
                      <span className="text-[#F5F1E8] font-medium truncate max-w-[130px]">{experience.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#F5F1E8]">Package:</span>
                      <span className="text-[#C8A96B]">{selectedPackage.name}</span>
                    </div>

                    {/* Bundled Experiences in Summary */}
                    {selectedBundledExperiences.map(bundle => (
                      <div key={bundle.id} className="flex justify-between text-[#C8A96B]">
                        <span className="truncate max-w-[130px]">+ {bundle.title}:</span>
                        <span>Bundled</span>
                      </div>
                    ))}

                    {/* Extras in Summary */}
                    {selectedExtras.map(ext => (
                      <div key={ext.id} className="flex justify-between text-[#F5F1E8]/70">
                        <span className="truncate max-w-[130px]">+ {ext.name}:</span>
                        <span>Included</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Total Quotation:</span>
                    <span className="font-serif text-xl text-[#C8A96B] block">Contact for Full Quote</span>
                    <span className="text-[10px] text-[#6D675E] block mt-0.5">Formal tailored proposal via Concierge</span>
                  </div>
                </div>

                {/* Settlement Method Preference */}
                <div className="md:col-span-2 space-y-3">
                  {[
                    { id: 'iDEAL', name: 'iDEAL (All Dutch Banks)', desc: 'Direct bank invoice upon quote confirmation' },
                    { id: 'Klarna', name: 'Klarna Flexible Invoicing (Split into 3)', desc: 'Flexible monthly split payments' },
                    { id: 'CreditCard', name: 'Credit Card (Visa, Mastercard, AMEX)', desc: 'Secure card authorization' },
                    { id: 'ApplePay', name: 'Direct Concierge Invoice / Bank Wire', desc: 'Private bank transfer & concierge invoicing' }
                  ].map(method => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.name)}
                      className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                        paymentMethod === method.name
                          ? 'border-[#C8A96B] bg-[#C8A96B]/10'
                          : 'border-[#C8A96B]/20 bg-[#0B0A09] hover:border-[#C8A96B]/40'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-medium text-[#F5F1E8] block">{method.name}</span>
                        <span className="text-[10px] text-[#6D675E]">{method.desc}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border border-[#C8A96B] flex items-center justify-center ${paymentMethod === method.name ? 'bg-[#C8A96B]' : ''}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="btn-royal-secondary text-xs"
                >
                  ← BACK
                </button>
                <button
                  type="submit"
                  className="btn-royal-maroon text-xs"
                >
                  REQUEST FULL ROYAL QUOTE →
                </button>
              </div>
            </form>
          )}

          {/* STEP 7: CONFIRMATION PASS */}
          {step === 7 && confirmedBooking && (
            <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
              <div className="w-16 h-16 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-[#C8A96B]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] block">
                  GEZELLIG ROYAL
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-[#F5F1E8]">
                  Your Royal Quote Request Is Confirmed
                </h2>
                <p className="text-xs text-[#6D675E]">
                  A detailed quotation request has been sent to our concierge for <span className="text-[#C8A96B]">{confirmedBooking.customerEmail}</span>.
                </p>
              </div>

              {/* Royal Gift Pass Printable Card */}
              <div className="p-8 border border-[#C8A96B]/40 bg-[#0B0A09] text-left space-y-6 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start border-b border-[#C8A96B]/20 pb-4">
                  <div className="flex items-center gap-3">
                    <img src="/images/logo-white.png" alt="Gezellig Royal" className="h-10 w-auto object-contain" />
                    <div>
                      <span className="font-serif text-[#C8A96B] text-sm tracking-widest block">GEZELLIG ROYAL</span>
                      <span className="text-[10px] text-[#6D675E] uppercase tracking-wider">QUOTE REFERENCE</span>
                    </div>
                  </div>
                  <span className="font-serif text-xl text-[#C8A96B] font-medium tracking-wider">
                    {confirmedBooking.referenceCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Primary Experience</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.experienceTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Preferred Date</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Recipient</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.recipientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Selected Tier</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.packageName}</span>
                  </div>
                </div>

                {/* Show Bundled Experiences if added */}
                {confirmedBooking.bundledExperiences && confirmedBooking.bundledExperiences.length > 0 && (
                  <div className="pt-2 border-t border-[#C8A96B]/20">
                    <span className="text-[10px] text-[#C8A96B] uppercase tracking-wider block mb-1.5 font-medium">
                      Bundled Luxury Experiences Included in Quote
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {confirmedBooking.bundledExperiences.map((bundle: string, i: number) => (
                        <span key={i} className="text-xs bg-[#4A171D] text-[#F5F1E8] border border-[#C8A96B]/50 px-3 py-1 flex items-center gap-1.5 font-serif">
                          <Hotel className="w-3.5 h-3.5 text-[#C8A96B]" />
                          <span>{bundle}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show Personal Extras if added */}
                {confirmedBooking.extras && confirmedBooking.extras.length > 0 && (
                  <div className="pt-2 border-t border-[#C8A96B]/15">
                    <span className="text-[10px] text-[#6D675E] uppercase block mb-1">Personal Extras Included</span>
                    <div className="flex flex-wrap gap-2">
                      {confirmedBooking.extras.map((extra: string, i: number) => (
                        <span key={i} className="text-[10px] bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30 px-2 py-0.5">
                          {extra}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-[#C8A96B]/15 flex justify-between items-center text-xs">
                  <span className="text-[#6D675E]">Pricing Status:</span>
                  <span className="font-serif text-[#C8A96B] text-base">Contact for Full Quote</span>
                </div>

                <div className="pt-2 text-center text-[10px] text-[#6D675E] italic">
                  «Once in a Royal Experience — Gezellig Royal»
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    const text = `Hello Gezellig Royal Concierge, I requested a quote for ${confirmedBooking.experienceTitle} (Reference: ${confirmedBooking.referenceCode}). Please provide the full quote.`;
                    window.open(`https://wa.me/31612345678?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="btn-royal-maroon text-xs flex items-center gap-2"
                >
                  CHAT ON WHATSAPP FOR QUOTE →
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-royal-primary text-xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  PRINT QUOTE SUMMARY
                </button>
                <button
                  onClick={onClose}
                  className="btn-royal-secondary text-xs"
                >
                  RETURN TO HOME
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

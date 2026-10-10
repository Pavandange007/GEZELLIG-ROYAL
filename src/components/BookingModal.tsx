import React, { useState } from 'react';
import { Experience, ExtraOption, PackageTier } from '../data/experiences';
import { useAdmin } from '../context/AdminContext';
import { X, Calendar, Check, ShieldCheck, Sparkles, Gift, CreditCard, Download, Printer, Share2 } from 'lucide-react';

interface BookingModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ experience, onClose }) => {
  const { createBooking } = useAdmin();

  if (!experience) return null;

  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>(experience.availableDates[0] || '2026-10-25');
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>(
    experience.packages[0] || { id: 'pkg-default', name: 'ROYAL ESSENTIAL', price: experience.priceFrom, description: 'Standard luxury package', inclusions: [] }
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientMessage, setRecipientMessage] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('iDEAL');
  
  // Completed Booking State
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Calculated Pricing
  const basePrice = selectedPackage.price;
  const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + extrasTotal;

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
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
            <div className="w-7 h-7 rounded-full border border-[#C8A96B] flex items-center justify-center">
              <span className="font-serif text-[#C8A96B] text-[10px]">GR</span>
            </div>
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
            <span className={step >= 3 ? 'text-[#C8A96B] font-medium' : ''}>3. Extras</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#C8A96B] font-medium' : ''}>4. Recipient</span>
            <span>→</span>
            <span className={step >= 5 ? 'text-[#C8A96B] font-medium' : ''}>5. Details</span>
            <span>→</span>
            <span className={step >= 6 ? 'text-[#C8A96B] font-medium' : ''}>6. Payment</span>
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
                      <span className="font-serif text-2xl text-[#F5F1E8] block">
                        €{pkg.price}
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
                  NEXT: PERSONAL EXTRAS →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL EXTRAS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 03
                </span>
                <h2 className="font-serif text-3xl font-light">Make It Personal</h2>
                <p className="text-xs text-[#6D675E]">
                  Add bespoke personal touches to ensure the experience is unforgettable upon arrival.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {experience.optionalExtras.map(extra => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={`p-5 border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#C8A96B] bg-[#C8A96B]/10'
                          : 'border-[#C8A96B]/20 bg-[#0B0A09] hover:border-[#C8A96B]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                          <span className="font-medium text-xs text-[#F5F1E8]">
                            {extra.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6D675E]">
                          {extra.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <span className="font-serif text-sm text-[#C8A96B] block">
                          +€{extra.price}
                        </span>
                        <div className={`w-5 h-5 rounded border border-[#C8A96B] flex items-center justify-center mt-1 ${isSelected ? 'bg-[#C8A96B]' : ''}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0B0A09]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between">
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
                  NEXT: PAYMENT →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: PAYMENT */}
          {step === 6 && (
            <form onSubmit={handleCompleteBooking} className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
                  STEP 06
                </span>
                <h2 className="font-serif text-3xl font-light">Flexible Payment Options</h2>
                <p className="text-xs text-[#6D675E]">
                  A Royal Experience should be easy to give. Choose your preferred secure Dutch & international payment method.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Summary Box */}
                <div className="md:col-span-1 p-5 border border-[#C8A96B]/30 bg-[#0B0A09] space-y-4">
                  <h4 className="font-serif text-lg text-[#C8A96B]">Order Summary</h4>
                  <div className="space-y-2 text-xs text-[#6D675E] border-b border-[#C8A96B]/15 pb-3">
                    <div className="flex justify-between">
                      <span>Package ({selectedPackage.name}):</span>
                      <span className="text-[#F5F1E8]">€{basePrice}</span>
                    </div>
                    {selectedExtras.map(ext => (
                      <div key={ext.id} className="flex justify-between">
                        <span>{ext.name}:</span>
                        <span className="text-[#F5F1E8]">€{ext.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-serif text-[#C8A96B]">Total Due:</span>
                    <span className="font-serif text-2xl text-[#F5F1E8]">€{totalPrice}</span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="md:col-span-2 space-y-3">
                  {[
                    { id: 'iDEAL', name: 'iDEAL (All Dutch Banks)', desc: 'Instant bank transfer via ABN AMRO, ING, Rabobank, SNS' },
                    { id: 'Klarna', name: 'Klarna Flexible Payments (3 Parts)', desc: 'Pay in 3 interest-free installments of €' + (totalPrice / 3).toFixed(2) },
                    { id: 'CreditCard', name: 'Credit Card (Visa, Mastercard, AMEX)', desc: 'Secure encrypted card processing' },
                    { id: 'ApplePay', name: 'Apple Pay / Google Pay', desc: 'One-touch checkout' }
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
                  CONFIRM & BOOK EXPERIENCE (€{totalPrice}) →
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
                  GEZELLIG ROYAL NETHERLANDS
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-[#F5F1E8]">
                  Your Royal Experience Is Confirmed
                </h2>
                <p className="text-xs text-[#6D675E]">
                  A confirmation voucher email has been sent to <span className="text-[#C8A96B]">{confirmedBooking.customerEmail}</span>.
                </p>
              </div>

              {/* Royal Gift Pass Printable Card */}
              <div className="p-8 border border-[#C8A96B]/40 bg-[#0B0A09] text-left space-y-6 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start border-b border-[#C8A96B]/20 pb-4">
                  <div>
                    <span className="font-serif text-[#C8A96B] text-sm tracking-widest block">GEZELLIG ROYAL</span>
                    <span className="text-[10px] text-[#6D675E] uppercase tracking-wider">BOOKING REFERENCE</span>
                  </div>
                  <span className="font-serif text-xl text-[#C8A96B] font-medium tracking-wider">
                    {confirmedBooking.referenceCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Experience</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.experienceTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Date</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Recipient</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.recipientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Package</span>
                    <span className="font-medium text-[#F5F1E8]">{confirmedBooking.packageName}</span>
                  </div>
                </div>

                {confirmedBooking.extras.length > 0 && (
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

                <div className="pt-2 text-center text-[10px] text-[#6D675E] italic">
                  «Once in a Royal Experience — Gezellig Royal Netherlands»
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="btn-royal-primary text-xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  PRINT ROYAL VOUCHER
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

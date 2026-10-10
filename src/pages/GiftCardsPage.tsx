import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Gift, Check, Sparkles, CreditCard, Send, Printer } from 'lucide-react';

export const GiftCardsPage: React.FC = () => {
  const { createGiftCard } = useAdmin();

  const [amount, setAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const [purchasedCard, setPurchasedCard] = useState<any | null>(null);

  const finalAmount = customAmount ? parseFloat(customAmount) || 100 : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createGiftCard({
      amount: finalAmount,
      recipientName: recipientName || 'Honored Recipient',
      recipientEmail: recipientEmail || 'recipient@example.nl',
      senderName: senderName || 'Valued Giver',
      message: message || 'A Gezellig Royal voucher presented to you with warm regards.'
    });
    setPurchasedCard(created);
  };

  return (
    <div className="pt-28 pb-24 space-y-16 max-w-6xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          GEZELLIG ROYAL GIFT CARD
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light">
          Give Them The Choice
        </h1>
        <div className="gold-line-short mx-auto" />
        <p className="text-xs sm:text-sm text-[#6D675E] font-sans font-light">
          An elegant digital voucher presented as a luxury invitation, redeemable across all Gezellig Royal experiences.
        </p>
      </div>

      {!purchasedCard ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-8 border border-[#C8A96B]/20 bg-[#121110]">
            <h3 className="font-serif text-2xl text-[#C8A96B]">Configure Gift Card</h3>

            {/* Select Amount Tiers */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-[#6D675E]">
                Select Voucher Value (€)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[150, 250, 500, 1000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => { setAmount(val); setCustomAmount(''); }}
                    className={`py-3 text-xs font-serif transition-all border ${
                      amount === val && !customAmount
                        ? 'border-[#C8A96B] bg-[#C8A96B]/20 text-[#C8A96B] font-bold'
                        : 'border-[#C8A96B]/20 bg-[#0B0A09] text-[#F5F1E8] hover:border-[#C8A96B]/40'
                    }`}
                  >
                    €{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
                Or Custom Amount (€)
              </label>
              <input
                type="number"
                min="50"
                max="5000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter custom amount (e.g. 750)"
                className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
              />
            </div>

            {/* Recipient Details */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Lotte de Jong"
                  className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
                  Recipient Email *
                </label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="lotte@example.nl"
                  className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
                  Sender Name *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Jasper de Jong"
                  className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
                  Personal Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a personal note for the recipient..."
                  className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-royal-maroon w-full py-4 text-xs tracking-widest"
            >
              PURCHASE GIFT CARD (€{finalAmount}) →
            </button>
          </form>

          {/* Right Live Preview Card */}
          <div className="space-y-4 sticky top-28">
            <span className="text-xs uppercase tracking-widest text-[#C8A96B] block">
              LIVE DIGITAL VOUCHER PREVIEW
            </span>

            {/* Obsidian & Champagne Gold Gift Card Pass */}
            <div className="relative p-8 border-2 border-[#C8A96B]/50 bg-gradient-to-br from-[#0B0A09] via-[#121110] to-[#2B0D12] text-[#F5F1E8] space-y-6 shadow-2xl overflow-hidden rounded-none">
              
              {/* Top Watermark */}
              <div className="flex justify-between items-start border-b border-[#C8A96B]/30 pb-4">
                <div className="flex items-center gap-3">
                  <img src="/images/logo-white.png" alt="Gezellig Royal" className="h-9 w-auto object-contain" />
                </div>
                <span className="font-serif text-3xl text-[#C8A96B] font-light">€{finalAmount}</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest block">PRESENTED TO</span>
                <p className="font-serif text-2xl text-[#F5F1E8]">
                  {recipientName || 'Recipient Name'}
                </p>
              </div>

              {message && (
                <div className="p-4 border border-[#C8A96B]/20 bg-[#0B0A09]/60 italic text-xs text-[#F5F1E8]/90 font-serif leading-relaxed">
                  "{message}"
                </div>
              )}

              <div className="flex justify-between items-end pt-4 border-t border-[#C8A96B]/20 text-[10px] text-[#6D675E]">
                <div>
                  <span className="block uppercase text-[#C8A96B]">GIFTED BY</span>
                  <span className="text-[#F5F1E8] font-medium">{senderName || 'Sender Name'}</span>
                </div>
                <div className="text-right">
                  <span className="block uppercase text-[#C8A96B]">GIFT CODE</span>
                  <span className="font-mono text-[#F5F1E8] text-xs">ROYAL-7749-PREVIEW</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Confirmation Screen for Purchased Gift Card */
        <div className="max-w-xl mx-auto p-8 border border-[#C8A96B] bg-[#121110] text-center space-y-6">
          <div className="w-16 h-16 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-[#C8A96B]" />
          </div>

          <h2 className="font-serif text-3xl text-[#F5F1E8]">Gift Card Generated Successfully</h2>
          <p className="text-xs text-[#6D675E]">
            A luxury digital voucher pass with code <span className="text-[#C8A96B] font-mono">{purchasedCard.code}</span> has been dispatched to {purchasedCard.recipientEmail}.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="btn-royal-primary text-xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              PRINT VOUCHER PASS
            </button>
            <button
              onClick={() => setPurchasedCard(null)}
              className="btn-royal-secondary text-xs"
            >
              PURCHASE ANOTHER
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs = [
    {
      q: 'What is Gezellig Royal?',
      a: 'Gezellig Royal offers curated premium experiences that can be gifted to someone special in the Netherlands and Europe—from luxury drives and Michelin-star fine dining to haute dessert tastings and 5-star hotel escapes.'
    },
    {
      q: 'How does gifting work?',
      a: 'Choose an experience, select your preferred package tier, add personal extras (such as flowers, champagne, or private transfer), and request your bespoke quote. Our royal concierge team will furnish your tailored proposal and provide your personalized royal voucher pass.'
    },
    {
      q: 'Can I choose a date?',
      a: 'Yes. You may either select a specific date during checkout or gift an open-dated voucher allowing the recipient to pick their date later based on availability.'
    },
    {
      q: 'Can I personalise an experience?',
      a: 'Where available, yes! Personal extras (Dutch velvet roses, Dom Pérignon champagne, suite setups, photographer, custom sugar art monograms) are configurable on each experience.'
    },
    {
      q: 'Can I buy an experience as a gift card?',
      a: 'Yes. We offer fixed and custom-amount digital gift vouchers that can be redeemed across any experience in our collection.'
    },
    {
      q: 'Can I pay in instalments?',
      a: 'Where supported, flexible payment options like Klarna 3-part flexible payments and iDEAL are supported upon quote approval.'
    },
    {
      q: 'Can I change my date after booking?',
      a: 'Yes! Date changes are permitted up to 7 days prior to the scheduled date, subject to venue availability.'
    },
    {
      q: 'Where are the experiences located?',
      a: 'Experiences are available at selected luxury locations across the Netherlands (Amsterdam, Veluwe, Utrecht, The Hague, Rotterdam, Limburg).'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 pb-24 space-y-12 max-w-4xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light">
          Everything You Need To Know
        </h1>
        <div className="gold-line-short mx-auto" />
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-[#C8A96B] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQ questions..."
          className="w-full bg-[#121110] border border-[#C8A96B]/30 pl-11 pr-4 py-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none placeholder-[#6D675E]"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-[#C8A96B]/20 bg-[#121110] transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-serif text-lg text-[#F5F1E8] font-light">
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#C8A96B] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs text-[#6D675E] leading-relaxed border-t border-[#C8A96B]/15 pt-4 font-sans animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

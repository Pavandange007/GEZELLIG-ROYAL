import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksPageProps {
  setActiveTab: (tab: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-5xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          CONCIERGE WALKTHROUGH
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light">
          {t.howItWorks.title}
        </h1>
        <div className="gold-line-short mx-auto" />
        <p className="text-xs sm:text-sm text-[#6D675E] font-sans font-light leading-relaxed">
          {t.howItWorks.subtitle}
        </p>
      </div>

      <div className="space-y-12">
        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <span className="font-serif text-6xl text-[#C8A96B] font-light md:col-span-1">01</span>
          <div className="space-y-2 md:col-span-3">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">CHOOSE THE EXPERIENCE</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              Browse carefully curated experiences across luxury driving, Michelin-star fine dining, 5-star hotel stays, and fine pâtisserie dessert tastings.
            </p>
          </div>
        </div>

        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <span className="font-serif text-6xl text-[#C8A96B] font-light md:col-span-1">02</span>
          <div className="space-y-2 md:col-span-3">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">PERSONALISE YOUR TOUCH</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              Add personal extras—from Dutch velvet roses, Dom Pérignon vintage champagne, private chauffeur transfers, to custom sugar art monograms.
            </p>
          </div>
        </div>

        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <span className="font-serif text-6xl text-[#C8A96B] font-light md:col-span-1">03</span>
          <div className="space-y-2 md:col-span-3">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">SELECT THE DATE</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              Choose a specific date or gift an open-dated royal voucher. Dates remain flexible and changeable with 7 days advance notice.
            </p>
          </div>
        </div>

        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <span className="font-serif text-6xl text-[#C8A96B] font-light md:col-span-1">04</span>
          <div className="space-y-2 md:col-span-3">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">ENJOY THE MOMENT</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              Our hospitality team handles every detail behind the scenes. Your recipient simply arrives and enjoys a royal moment worth remembering.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <button
          onClick={() => setActiveTab('experiences')}
          className="btn-royal-primary text-xs py-4 px-10"
        >
          EXPLORE THE COLLECTION →
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-5xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      
      {/* Editorial Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          GEZELLIG ROYAL HERITAGE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
          The Art of Giving an Experience
        </h1>
        <div className="gold-line-short mx-auto" />
      </div>

      {/* Main Philosophy Body */}
      <div className="space-y-8 text-sm sm:text-base text-[#F5F1E8]/90 leading-relaxed font-sans font-light max-w-3xl mx-auto">
        <p className="first-letter:font-serif first-letter:text-5xl first-letter:text-[#C8A96B] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          Gezellig Royal was created around a simple idea: that giving someone an unforgettable experience can mean far more than giving them another physical gift.
        </p>

        <p>
          We believe true luxury is not simply about price. Luxury is about attention. It is about how something feels. It is about anticipation, detail, and the memory that remains long after the day has passed.
        </p>

        <blockquote className="my-8 p-8 border-l-2 border-[#C8A96B] bg-[#121110] font-serif text-xl sm:text-2xl text-[#C8A96B] italic">
          «Luxury whispers. We do not convince through loud promises—we prove it through the perfection of every detail.»
        </blockquote>

        <p>
          From beautiful Dutch destinations and exceptional hospitality partners to hand-selected supercar routes and master pastry chef tastings, Gezellig Royal brings everything together to create moments that feel genuinely special.
        </p>

        <div className="pt-6 border-t border-[#C8A96B]/20 flex items-center justify-between text-xs text-[#6D675E]">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C8A96B]" />
            Based in the Netherlands & Serving Europe
          </span>
          <span className="font-serif text-[#C8A96B] text-sm">Gezellig Royal Concierge</span>
        </div>
      </div>

    </div>
  );
};

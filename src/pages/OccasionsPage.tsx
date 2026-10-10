import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Gift, Heart, Sparkles, Award } from 'lucide-react';

interface OccasionsPageProps {
  setActiveTab: (tab: string) => void;
}

export const OccasionsPage: React.FC<OccasionsPageProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  const occasions = [
    { title: t.occasions.birthday, desc: t.occasions.birthdayDesc, img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80' },
    { title: t.occasions.anniversary, desc: t.occasions.anniversaryDesc, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80' },
    { title: t.occasions.romanticSurprise, desc: t.occasions.romanticSurpriseDesc, img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80' },
    { title: t.occasions.valentines, desc: t.occasions.valentinesDesc, img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80' },
    { title: t.occasions.celebration, desc: t.occasions.celebrationDesc, img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80' },
    { title: t.occasions.justBecause, desc: t.occasions.justBecauseDesc, img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="pt-28 pb-24 space-y-16 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          CELEBRATE LIFE'S MILESTONES
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light">
          {t.occasions.title}
        </h1>
        <div className="gold-line-short mx-auto" />
        <p className="text-xs sm:text-sm text-[#6D675E] font-sans font-light">
          {t.occasions.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {occasions.map((occ, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab('experiences')}
            className="group luxury-card relative h-96 overflow-hidden cursor-pointer flex flex-col justify-end p-8 border border-[#C8A96B]/20 bg-[#121110]"
          >
            <img
              src={occ.img}
              alt={occ.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest font-sans">
                OCCASION 0{idx + 1}
              </span>
              <h3 className="font-serif text-3xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors font-light">
                {occ.title}
              </h3>
              <p className="text-xs text-[#6D675E] font-sans">
                {occ.desc}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B]">
                <span>FIND OCCASION EXPERIENCE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

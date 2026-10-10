import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Experience } from '../data/experiences';
import { ExperienceCard } from '../components/ExperienceCard';
import { Sparkles, Star, Award, Clock, MapPin, Check, Heart, Shield } from 'lucide-react';

interface DessertsPageProps {
  onSelectExperience: (exp: Experience) => void;
  onOpenBooking: (exp: Experience) => void;
}

export const DessertsPage: React.FC<DessertsPageProps> = ({ onSelectExperience, onOpenBooking }) => {
  const { t } = useLanguage();
  const { experiences } = useAdmin();

  // Filter experiences for Fine Desserts category
  const dessertExperiences = experiences.filter(exp => exp.category === 'Fine Desserts');

  // Fallback to dessert experience if found
  const primaryDessert = dessertExperiences[0] || experiences[1];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in">
      
      {/* Editorial Hero Header */}
      <div className="relative border border-[#C8A96B]/30 bg-[#121110] p-8 md:p-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#C8A96B]/50 px-3 py-1 bg-[#0B0A09]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
                {t.dessertsPage.tag}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F1E8] font-light leading-tight">
              {t.dessertsPage.title}
            </h1>

            <div className="gold-line-short" />

            <p className="text-sm md:text-base text-[#6D675E] leading-relaxed font-sans font-light">
              {t.dessertsPage.intro}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking(primaryDessert)}
                className="btn-royal-maroon text-xs py-4 px-8"
              >
                {t.dessertsPage.bookBtn} →
              </button>
            </div>
          </div>

          {/* Large Editorial Image */}
          <div className="relative h-80 md:h-[450px] w-full overflow-hidden border border-[#C8A96B]/40 group">
            <img
              src="/images/dessert.jpg"
              alt="Haute Pâtisserie Dessert Plating"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-6 left-6 right-6 bg-[#0B0A09]/90 border border-[#C8A96B]/30 p-4 backdrop-blur-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif text-[#C8A96B] text-base">Michelin Pastry Pairing</span>
                <span className="text-[#F5F1E8]">From €245</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gourmet Details & Inclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <Award className="w-6 h-6 text-[#C8A96B]" />
          <h3 className="font-serif text-xl text-[#F5F1E8]">Master Pastry Chefs</h3>
          <p className="text-xs text-[#6D675E] leading-relaxed">
            Crafted exclusively by renowned pastry masters specializing in single-origin chocolates and rare botanical infusions.
          </p>
        </div>

        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <Sparkles className="w-6 h-6 text-[#C8A96B]" />
          <h3 className="font-serif text-xl text-[#F5F1E8]">Custom Sugar Art Monograms</h3>
          <p className="text-xs text-[#6D675E] leading-relaxed">
            Personalize the final dessert plating with edible gold leaf monograms or anniversary messages handcrafted at your table.
          </p>
        </div>

        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <Star className="w-6 h-6 text-[#C8A96B]" />
          <h3 className="font-serif text-xl text-[#F5F1E8]">Vintage Champagne Pairings</h3>
          <p className="text-xs text-[#6D675E] leading-relaxed">
            Each pastry course is served alongside curated vintage Champagnes, dessert wines, or rare white teas.
          </p>
        </div>
      </div>

      {/* Fine Desserts Catalogue Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C8A96B]/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans">
              AVAILABLE EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F1E8] font-light">
              Haute Pâtisserie Collection
            </h2>
          </div>
          <span className="text-xs text-[#6D675E]">Showing {dessertExperiences.length} Curated Experiences</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dessertExperiences.map(exp => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onSelect={onSelectExperience}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Experience } from '../data/experiences';
import { MapPin, Clock, Star, Calendar, Check, ShieldCheck, Sparkles, ChevronLeft } from 'lucide-react';

interface ExperienceDetailPageProps {
  experience: Experience | null;
  onBack: () => void;
  onOpenBooking: (exp: Experience) => void;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({ experience, onBack, onOpenBooking }) => {
  if (!experience) return null;

  const [activeImage, setActiveImage] = useState<string>(experience.image);

  return (
    <div className="pt-28 pb-24 space-y-16 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-[#C8A96B] hover:text-[#F5F1E8] transition-colors uppercase tracking-widest"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>BACK TO CATALOGUE</span>
      </button>

      {/* Main Image Gallery */}
      <div className="space-y-4">
        <div className="relative h-[400px] md:h-[550px] w-full border border-[#C8A96B]/30 overflow-hidden bg-[#0B0A09]">
          <img
            src={activeImage}
            alt={experience.title}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute top-6 left-6">
            <span className="bg-[#0B0A09]/90 text-[#C8A96B] border border-[#C8A96B]/40 px-3.5 py-1 text-xs uppercase tracking-[0.2em] font-sans">
              {experience.categoryLabel}
            </span>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {experience.gallery.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {experience.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative w-28 h-20 border shrink-0 overflow-hidden transition-all ${
                  activeImage === img ? 'border-[#C8A96B] ring-1 ring-[#C8A96B]' : 'border-[#C8A96B]/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Gallery thumbnail ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Header Info & Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Main Content Details */}
        <div className="lg:col-span-2 space-y-12">
          
          <div className="space-y-4 border-b border-[#C8A96B]/20 pb-8">
            <div className="flex items-center gap-4 text-xs text-[#6D675E]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C8A96B]" />
                {experience.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C8A96B]" />
                {experience.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#F5F1E8]">
                <Star className="w-3.5 h-3.5 text-[#C8A96B] fill-[#C8A96B]" />
                {experience.rating.toFixed(2)} ({experience.reviewsCount} reviews)
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl text-[#F5F1E8] font-light leading-tight">
              {experience.title}
            </h1>

            <p className="text-base text-[#6D675E] leading-relaxed font-sans font-light">
              {experience.shortDescription}
            </p>
          </div>

          {/* THE EXPERIENCE Story */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
              THE EXPERIENCE
            </h3>
            <p className="text-sm md:text-base text-[#F5F1E8]/90 font-sans leading-relaxed font-light whitespace-pre-line">
              {experience.fullDescription}
            </p>
          </div>

          {/* WHAT'S INCLUDED */}
          <div className="space-y-4 p-8 border border-[#C8A96B]/20 bg-[#121110]">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
              WHAT'S INCLUDED
            </h3>
            <ul className="space-y-3 text-xs md:text-sm text-[#F5F1E8]">
              {experience.includedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PACKAGE TIERS */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
              AVAILABLE ROYAL PACKAGES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experience.packages.map(pkg => (
                <div key={pkg.id} className="p-6 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
                  <span className="font-serif text-lg text-[#C8A96B]">{pkg.name}</span>
                  <span className="font-serif text-2xl text-[#F5F1E8] block">€{pkg.price}</span>
                  <p className="text-xs text-[#6D675E]">{pkg.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TERMS & CANCELLATION */}
          <div className="space-y-4 pt-6 border-t border-[#C8A96B]/20 text-xs text-[#6D675E]">
            <h4 className="text-[#C8A96B] uppercase tracking-wider font-sans font-medium">
              Important Information & Policies
            </h4>
            <p><strong className="text-[#F5F1E8]">Minimum Age:</strong> {experience.minimumAge ? `${experience.minimumAge} Years` : '18 Years'}</p>
            <p><strong className="text-[#F5F1E8]">Cancellation Policy:</strong> {experience.cancellationPolicy}</p>
            <p><strong className="text-[#F5F1E8]">Terms:</strong> {experience.terms}</p>
          </div>
        </div>

        {/* Right Sticky Booking Box */}
        <div className="lg:col-span-1 sticky top-28 space-y-6 p-8 border border-[#C8A96B]/30 bg-[#121110] shadow-2xl">
          <div className="border-b border-[#C8A96B]/20 pb-4 space-y-1">
            <span className="text-[10px] text-[#6D675E] uppercase tracking-widest">STARTING FROM</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl text-[#F5F1E8]">€{experience.priceFrom}</span>
              <span className="text-xs text-[#6D675E]">per experience</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#F5F1E8]/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
              <span>Flexible Netherlands Date Transfers</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C8A96B]" />
              <span>Personal Extra Customization</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C8A96B]" />
              <span>{experience.availableDates.length} Dates Available</span>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking(experience)}
            className="btn-royal-maroon w-full py-4 text-xs tracking-widest"
          >
            BOOK THIS EXPERIENCE →
          </button>

          <p className="text-[10px] text-[#6D675E] text-center italic">
            iDEAL & Flexible Payment Plans Supported
          </p>
        </div>

      </div>
    </div>
  );
};

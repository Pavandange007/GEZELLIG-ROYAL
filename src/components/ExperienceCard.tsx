import React from 'react';
import { Experience } from '../data/experiences';
import { useAdmin } from '../context/AdminContext';
import { ArrowRight, Star, MapPin, Clock, MessageCircle } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  onSelect: (exp: Experience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onSelect }) => {
  const { settings } = useAdmin();
  const whatsappNumber = settings?.whatsappNumber || '31614662672';
  return (
    <div
      onClick={() => onSelect(experience)}
      className="group luxury-card relative flex flex-col justify-between overflow-hidden cursor-pointer rounded-none border border-[#C8A96B]/20 bg-[#121110] transition-all duration-700 hover:border-[#C8A96B]/60"
    >
      {/* Image Container with Slow Zoom */}
      <div className="relative h-72 md:h-80 w-full overflow-hidden bg-[#0B0A09]">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover object-center transition-transform duration-1000 cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-black/30" />

        {/* Category Gold Label */}
        <div className="absolute top-5 left-5 z-10">
          <span className="bg-[#0B0A09]/90 text-[#C8A96B] border border-[#C8A96B]/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-sans font-medium backdrop-blur-md">
            {experience.categoryLabel}
          </span>
        </div>

        {/* Rating Badge if available */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-1 bg-[#0B0A09]/80 text-[#F5F1E8] border border-[#C8A96B]/20 px-2.5 py-1 text-[10px] font-sans">
          <Star className="w-3 h-3 text-[#C8A96B] fill-[#C8A96B]" />
          <span>{experience.rating.toFixed(2)}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-3">
          {/* Location & Duration metadata */}
          <div className="flex items-center gap-4 text-[11px] text-[#6D675E] font-sans">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C8A96B]/70" />
              {experience.location.split(',')[0]}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C8A96B]/70" />
              {experience.duration}
            </span>
          </div>

          {/* Large Serif Title */}
          <h3 className="font-serif text-2xl md:text-3xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors duration-300 font-light leading-tight">
            {experience.title}
          </h3>

          {/* Short Emotional Description */}
          <p className="text-xs text-[#6D675E] font-sans leading-relaxed line-clamp-2">
            {experience.shortDescription}
          </p>
        </div>

        {/* Animated Gold Divider Line */}
        <div className="w-0 group-hover:w-full h-[1px] bg-[#C8A96B]/40 transition-all duration-700 my-2" />

        {/* Bottom Actions: Check Availability Button & Discover */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const text = `Hello Gezellig Royal Concierge, I would like to check availability for "${experience.title}".`;
              window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
            }}
            className="btn-royal-maroon text-[11px] py-2.5 px-3.5 tracking-wider flex items-center gap-1.5 font-sans font-medium z-10 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Check Availability</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-[#C8A96B] uppercase tracking-widest font-sans font-medium group-hover:translate-x-1 transition-transform duration-300">
            <span>DETAILS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A96B]" />
          </div>
        </div>
      </div>
    </div>
  );
};

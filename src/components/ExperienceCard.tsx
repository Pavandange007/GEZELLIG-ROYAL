import React from 'react';
import { Experience } from '../data/experiences';
import { ArrowRight, Star, MapPin, Clock } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  onSelect: (exp: Experience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onSelect }) => {
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

        {/* Bottom Price & CTA */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#6D675E] uppercase tracking-widest block font-sans">
              FROM
            </span>
            <span className="font-serif text-xl md:text-2xl text-[#F5F1E8]">
              €{experience.priceFrom}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#C8A96B] uppercase tracking-widest font-sans font-medium group-hover:translate-x-1 transition-transform duration-300">
            <span>DISCOVER</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96B] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Experience } from '../data/experiences';
import { ExperienceCard } from '../components/ExperienceCard';
import { Search, Filter, Sparkles } from 'lucide-react';

interface ExperiencesPageProps {
  onSelectExperience: (exp: Experience) => void;
  onOpenBooking: (exp: Experience) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onSelectExperience, onOpenBooking }) => {
  const { t } = useLanguage();
  const { experiences } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Luxury Drives',
    'Fine Dining',
    '5-Star Stays',
    'Fine Desserts',
    'Romance',
    'Celebrations',
    'Personalised Experiences'
  ];

  const filteredExperiences = experiences.filter(exp => {
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 space-y-16 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          GEZELLIG ROYAL COLLECTION
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F1E8] font-light">
          Curated Luxury Experiences
        </h1>
        <div className="gold-line-short mx-auto" />
        <p className="text-xs sm:text-sm text-[#6D675E] font-sans font-light leading-relaxed">
          Explore our handpicked collection of extraordinary moments in the Netherlands and European destinations.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-6">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#C8A96B]/15">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#C8A96B] font-medium'
                  : 'border-transparent text-[#6D675E] hover:text-[#F5F1E8]'
              }`}
            >
              {cat === 'Fine Desserts' ? '✨ Fine Desserts' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#C8A96B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drives, dining, stays, location..."
            className="w-full bg-[#121110] border border-[#C8A96B]/30 pl-11 pr-4 py-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none placeholder-[#6D675E]"
          />
        </div>
      </div>

      {/* Grid Display */}
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map(exp => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onSelect={onSelectExperience}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-[#C8A96B]/20 bg-[#121110] space-y-4">
          <p className="font-serif text-2xl text-[#C8A96B]">No experiences found</p>
          <p className="text-xs text-[#6D675E]">Try selecting another category or clear your search query.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="btn-royal-secondary text-xs"
          >
            RESET FILTERS
          </button>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { ExperienceCard } from '../components/ExperienceCard';
import { Experience } from '../data/experiences';
import { ArrowRight, Sparkles, Shield, Gift, Calendar, CheckCircle2, Star, CreditCard, ChevronRight, Heart } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectExperience: (exp: Experience) => void;
  onOpenBooking: (exp: Experience) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onSelectExperience, onOpenBooking }) => {
  const { t } = useLanguage();
  const { experiences } = useAdmin();

  const featuredExperiences = experiences.filter(exp => exp.featured);

  return (
    <div className="space-y-28 md:space-y-36 pb-20">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0A09]">
        {/* Cinematic Background Image with Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Gezellig Royal Luxury Driving & Hospitality Experience"
            className="w-full h-full object-cover object-center filter brightness-75 scale-105 animate-pulse duration-[12000ms]"
          />
          {/* Subtle Dark Luxury Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/60 to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B0A09]/40 to-[#0B0A09]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 animate-fade-in pt-16">
          
          {/* Brand Logo Label */}
          <div className="inline-flex items-center gap-2 border border-[#C8A96B]/40 px-4 py-2 bg-[#0B0A09]/80 backdrop-blur-md">
            <img src="/images/logo-white.png" alt="Gezellig Royal" className="h-7 w-auto object-contain" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F1E8] tracking-tight font-light leading-[1.08] max-w-4xl mx-auto">
            {t.hero.headline}
          </h1>

          {/* Small Decorative Gold Line */}
          <div className="gold-line-short mx-auto" />

          {/* Supporting Copy */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#F5F1E8]/85 max-w-2xl mx-auto font-light leading-relaxed">
            {t.hero.subheading}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('experiences')}
              className="btn-royal-primary w-full sm:w-auto text-xs py-4 px-8"
            >
              {t.hero.ctaPrimary} →
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className="btn-royal-secondary w-full sm:w-auto text-xs py-4 px-8"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] text-[#C8A96B] tracking-[0.2em] uppercase font-sans font-light opacity-80 animate-bounce">
          <span>EXPLORE</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#C8A96B] to-transparent" />
        </div>
      </section>

      {/* 2. HERO SECONDARY MESSAGE */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          {t.secondaryMessage.label}
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F1E8] font-light leading-snug">
          {t.secondaryMessage.title}
        </h2>

        <div className="gold-line-short mx-auto" />

        <p className="text-sm md:text-base text-[#6D675E] leading-relaxed font-sans max-w-2xl mx-auto">
          {t.secondaryMessage.body}
        </p>
      </section>

      {/* 3. EXPERIENCE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F1E8] font-light">
            {t.categories.title}
          </h2>
          <p className="text-xs md:text-sm text-[#6D675E] font-sans">
            {t.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Category Card 1: Luxury Drives */}
          <div
            onClick={() => setActiveTab('experiences')}
            className="group relative h-80 overflow-hidden border border-[#C8A96B]/20 bg-[#121110] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Drives"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent p-6 flex flex-col justify-between">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest">01</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
                  {t.categories.luxuryDrives}
                </h3>
                <p className="text-xs text-[#F5F1E8]/70 font-sans line-clamp-2">
                  {t.categories.luxuryDrivesDesc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B]">
                  <span>{t.categories.explore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Card 2: Fine Dining */}
          <div
            onClick={() => setActiveTab('experiences')}
            className="group relative h-80 overflow-hidden border border-[#C8A96B]/20 bg-[#121110] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Fine Dining"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent p-6 flex flex-col justify-between">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest">02</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
                  {t.categories.fineDining}
                </h3>
                <p className="text-xs text-[#F5F1E8]/70 font-sans line-clamp-2">
                  {t.categories.fineDiningDesc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B]">
                  <span>{t.categories.explore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Card 3: 5-Star Stays */}
          <div
            onClick={() => setActiveTab('experiences')}
            className="group relative h-80 overflow-hidden border border-[#C8A96B]/20 bg-[#121110] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="5-Star Stays"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent p-6 flex flex-col justify-between">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest">03</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
                  {t.categories.fiveStarStays}
                </h3>
                <p className="text-xs text-[#F5F1E8]/70 font-sans line-clamp-2">
                  {t.categories.fiveStarStaysDesc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B]">
                  <span>{t.categories.explore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Card 4: Fine Desserts & High Tea (FEATURED DEDICATED PAGE LINK) */}
          <div
            onClick={() => setActiveTab('desserts')}
            className="group relative h-80 overflow-hidden border border-[#C8A96B] bg-[#121110] cursor-pointer shadow-xl"
          >
            <img
              src="/images/dessert.jpg"
              alt="Fine Desserts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
            />
            <div className="absolute top-4 right-4 bg-[#4A171D] border border-[#C8A96B] px-3 py-1 text-[9px] text-[#F5F1E8] uppercase tracking-widest flex items-center gap-1 z-10">
              <Sparkles className="w-3 h-3 text-[#C8A96B]" />
              <span>SINGLE PAGE FEATURE</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/50 to-transparent p-6 flex flex-col justify-between">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest">04</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#C8A96B] font-medium">
                  {t.categories.fineDesserts}
                </h3>
                <p className="text-xs text-[#F5F1E8]/80 font-sans line-clamp-2">
                  {t.categories.fineDessertsDesc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B] font-medium">
                  <span>DISCOVER HAUTE DESSERTS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Card 5: Romance */}
          <div
            onClick={() => setActiveTab('experiences')}
            className="group relative h-80 overflow-hidden border border-[#C8A96B]/20 bg-[#121110] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80"
              alt="Romance"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent p-6 flex flex-col justify-between">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest">05</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
                  {t.categories.romance}
                </h3>
                <p className="text-xs text-[#F5F1E8]/70 font-sans line-clamp-2">
                  {t.categories.romanceDesc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B]">
                  <span>{t.categories.explore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Card 6: Personalised Experiences */}
          <div
            onClick={() => setActiveTab('experiences')}
            className="group relative h-80 overflow-hidden border border-[#C8A96B]/20 bg-[#121110] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
              alt="Personalised Experiences"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent p-6 flex flex-col justify-between">
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-widest">06</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
                  {t.categories.personalised}
                </h3>
                <p className="text-xs text-[#F5F1E8]/70 font-sans line-clamp-2">
                  {t.categories.personalisedDesc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#C8A96B]">
                  <span>{t.categories.discover}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED EXPERIENCES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96B]/20 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
              SIGNATURE SELECTIONS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#F5F1E8] font-light">
              Featured Royal Experiences
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('experiences')}
            className="btn-royal-secondary text-xs self-start md:self-auto"
          >
            VIEW ALL EXPERIENCES →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExperiences.map(exp => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onSelect={onSelectExperience}
            />
          ))}
        </div>
      </section>

      {/* 5. "THE ROYAL EXPERIENCE" DISTINCTIVE DARK SECTION */}
      <section className="relative bg-[#0B0A09] border-y border-[#C8A96B]/25 py-24 md:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-sans font-medium">
            {t.royalExperience.subtitle}
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F1E8] font-light leading-tight">
            {t.royalExperience.title}
          </h2>

          <div className="gold-line-short mx-auto" />

          <p className="text-sm md:text-base text-[#F5F1E8]/80 leading-relaxed font-sans max-w-3xl mx-auto font-light">
            {t.royalExperience.body}
          </p>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            <div className="p-6 border border-[#C8A96B]/20 bg-[#121110]">
              <span className="font-serif text-xl text-[#C8A96B] block mb-1">A moment</span>
              <span className="text-xs text-[#6D675E] font-sans">to look forward to</span>
            </div>
            <div className="p-6 border border-[#C8A96B]/20 bg-[#121110]">
              <span className="font-serif text-xl text-[#C8A96B] block mb-1">A story</span>
              <span className="text-xs text-[#6D675E] font-sans">to tell for years</span>
            </div>
            <div className="p-6 border border-[#C8A96B]/20 bg-[#121110]">
              <span className="font-serif text-xl text-[#C8A96B] block mb-1">A memory</span>
              <span className="text-xs text-[#6D675E] font-sans">to keep forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS EDITORIAL TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
            CONCIERGE PROCESS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F1E8] font-light">
            {t.howItWorks.title}
          </h2>
          <p className="text-xs md:text-sm text-[#6D675E] font-sans">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 relative">
            <span className="font-serif text-5xl md:text-6xl text-[#C8A96B] font-light block">
              01
            </span>
            <h3 className="font-serif text-xl text-[#F5F1E8] tracking-wider">CHOOSE</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              {t.howItWorks.step1Desc}
            </p>
          </div>

          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 relative">
            <span className="font-serif text-5xl md:text-6xl text-[#C8A96B] font-light block">
              02
            </span>
            <h3 className="font-serif text-xl text-[#F5F1E8] tracking-wider">PERSONALISE</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              {t.howItWorks.step2Desc}
            </p>
          </div>

          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 relative">
            <span className="font-serif text-5xl md:text-6xl text-[#C8A96B] font-light block">
              03
            </span>
            <h3 className="font-serif text-xl text-[#F5F1E8] tracking-wider">SELECT DATE</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              {t.howItWorks.step3Desc}
            </p>
          </div>

          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 relative">
            <span className="font-serif text-5xl md:text-6xl text-[#C8A96B] font-light block">
              04
            </span>
            <h3 className="font-serif text-xl text-[#F5F1E8] tracking-wider">EXPERIENCE</h3>
            <p className="text-xs text-[#6D675E] leading-relaxed">
              {t.howItWorks.step4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 7. OCCASIONS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
            TAILORED CELEBRATIONS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F1E8] font-light">
            {t.occasions.title}
          </h2>
          <p className="text-xs md:text-sm text-[#6D675E] font-sans">
            {t.occasions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: t.occasions.birthday, desc: t.occasions.birthdayDesc, img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80' },
            { title: t.occasions.anniversary, desc: t.occasions.anniversaryDesc, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80' },
            { title: t.occasions.romanticSurprise, desc: t.occasions.romanticSurpriseDesc, img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=80' },
            { title: t.occasions.valentines, desc: t.occasions.valentinesDesc, img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80' },
            { title: t.occasions.celebration, desc: t.occasions.celebrationDesc, img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80' },
            { title: t.occasions.justBecause, desc: t.occasions.justBecauseDesc, img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80' }
          ].map((occ, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab('occasions')}
              className="group relative h-64 border border-[#C8A96B]/20 bg-[#121110] overflow-hidden cursor-pointer"
            >
              <img
                src={occ.img}
                alt={occ.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent p-6 flex flex-col justify-end space-y-1">
                <h3 className="font-serif text-2xl text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
                  {occ.title}
                </h3>
                <p className="text-xs text-[#6D675E] group-hover:text-[#F5F1E8]/80 transition-colors">
                  {occ.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. GIFTING EMOTIONAL BENEFIT */}
      <section className="bg-[#4A171D] text-[#F5F1E8] py-20 px-6 border-y border-[#C8A96B]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] block font-sans">
            THE GEZELLIG PHILOSOPHY
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl font-light">
            {t.gifting.title}
          </h2>

          <p className="text-sm md:text-base leading-relaxed text-[#F5F1E8]/90 font-sans max-w-2xl mx-auto">
            {t.gifting.body}
          </p>

          <div className="pt-4">
            <button
              onClick={() => setActiveTab('experiences')}
              className="btn-royal-primary border-[#C8A96B] text-xs py-4 px-8"
            >
              {t.gifting.cta} →
            </button>
          </div>
        </div>
      </section>

      {/* 9. FLEXIBLE PAYMENT SECTION */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-8">
        <div className="w-12 h-12 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center mx-auto">
          <CreditCard className="w-6 h-6 text-[#C8A96B]" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block">
            CONVENIENT CONCIERGE GIFTING
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light">
            {t.flexiblePayment.title}
          </h2>
          <p className="text-xs md:text-sm text-[#6D675E] max-w-2xl mx-auto font-sans leading-relaxed">
            {t.flexiblePayment.body}
          </p>
        </div>

        {/* Payment Methods Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#F5F1E8]/70">
          <span className="px-4 py-2 border border-[#C8A96B]/20 bg-[#121110]">iDEAL</span>
          <span className="px-4 py-2 border border-[#C8A96B]/20 bg-[#121110]">Klarna Flexible Pay</span>
          <span className="px-4 py-2 border border-[#C8A96B]/20 bg-[#121110]">Credit Card (Visa / Mastercard)</span>
          <span className="px-4 py-2 border border-[#C8A96B]/20 bg-[#121110]">Apple Pay</span>
        </div>
      </section>

      {/* 10. TRUST & CREDIBILITY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <Shield className="w-6 h-6 text-[#C8A96B]" />
          <h4 className="font-serif text-xl text-[#F5F1E8]">{t.trust.item1Title}</h4>
          <p className="text-xs text-[#6D675E]">{t.trust.item1Desc}</p>
        </div>
        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <Sparkles className="w-6 h-6 text-[#C8A96B]" />
          <h4 className="font-serif text-xl text-[#F5F1E8]">{t.trust.item2Title}</h4>
          <p className="text-xs text-[#6D675E]">{t.trust.item2Desc}</p>
        </div>
        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <CheckCircle2 className="w-6 h-6 text-[#C8A96B]" />
          <h4 className="font-serif text-xl text-[#F5F1E8]">{t.trust.item3Title}</h4>
          <p className="text-xs text-[#6D675E]">{t.trust.item3Desc}</p>
        </div>
        <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-3">
          <Calendar className="w-6 h-6 text-[#C8A96B]" />
          <h4 className="font-serif text-xl text-[#F5F1E8]">{t.trust.item4Title}</h4>
          <p className="text-xs text-[#6D675E]">{t.trust.item4Desc}</p>
        </div>
      </section>

      {/* 11. LUXURY EDITORIAL TESTIMONIALS */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] block font-sans">
            {t.testimonials.title}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#F5F1E8]">
            {t.testimonials.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 text-left">
            <div className="flex text-[#C8A96B] gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96B]" />)}
            </div>
            <p className="text-xs text-[#F5F1E8]/90 italic leading-relaxed font-serif">
              "Absolutely beautiful from beginning to end. The driving experience and castle lunch felt incredibly personal and luxurious."
            </p>
            <span className="text-[10px] text-[#6D675E] uppercase tracking-wider block font-sans">
              — Verified Guest, Amsterdam
            </span>
          </div>

          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 text-left">
            <div className="flex text-[#C8A96B] gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96B]" />)}
            </div>
            <p className="text-xs text-[#F5F1E8]/90 italic leading-relaxed font-serif">
              "Gifted the Haute Pâtisserie tasting for our anniversary. The dessert plating and private canal salon exceeded every expectation."
            </p>
            <span className="text-[10px] text-[#6D675E] uppercase tracking-wider block font-sans">
              — Verified Guest, Utrecht
            </span>
          </div>

          <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-4 text-left">
            <div className="flex text-[#C8A96B] gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96B]" />)}
            </div>
            <p className="text-xs text-[#F5F1E8]/90 italic leading-relaxed font-serif">
              "The 5-star hotel stay voucher was executed flawlessly. The personal butler and champagne arrival made my partner feel like royalty."
            </p>
            <span className="text-[10px] text-[#6D675E] uppercase tracking-wider block font-sans">
              — Verified Guest, Rotterdam
            </span>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-12">
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F1E8]">
          READY TO MAKE SOMEONE'S DAY EXTRAORDINARY?
        </h2>
        <div className="gold-line-short mx-auto" />
        <button
          onClick={() => setActiveTab('experiences')}
          className="btn-royal-primary text-xs py-4 px-10"
        >
          DISCOVER GEZELLIG ROYAL →
        </button>
      </section>

    </div>
  );
};

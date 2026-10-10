import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { ChevronDown, Menu, X, Sparkles, Shield, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking?: (expId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenBooking }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experiencesDropdownOpen, setExperiencesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setExperiencesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0A09]/95 backdrop-blur-md border-b border-[#C8A96B]/20 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0A09]/90 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left flex items-center gap-3 focus:outline-none"
          >
            {/* Minimalist Royal Monogram Emblem */}
            <div className="w-9 h-9 rounded-full border border-[#C8A96B]/50 flex items-center justify-center bg-[#0B0A09] group-hover:border-[#C8A96B] transition-colors">
              <span className="font-serif text-[#C8A96B] font-light text-xs tracking-widest">GR</span>
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl text-[#F5F1E8] tracking-[0.25em] font-light uppercase block group-hover:text-[#C8A96B] transition-colors">
                GEZELLIG ROYAL
              </span>
              <span className="text-[9px] text-[#C8A96B] tracking-[0.3em] uppercase block font-sans -mt-1 font-light opacity-90">
                NETHERLANDS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-[#F5F1E8]/90 font-sans font-light">
            
            {/* Experiences Dropdown with Fine Desserts */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setExperiencesDropdownOpen(true)}
              onMouseLeave={() => setExperiencesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('experiences')}
                className={`flex items-center gap-1.5 hover:text-[#C8A96B] transition-colors ${
                  activeTab === 'experiences' ? 'text-[#C8A96B]' : ''
                }`}
              >
                {t.nav.experiences}
                <ChevronDown className="w-3 h-3 text-[#C8A96B]/70 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown Menu */}
              {experiencesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#0B0A09]/95 border border-[#C8A96B]/20 backdrop-blur-xl p-4 shadow-2xl space-y-3 animate-fade-in text-[11px] uppercase tracking-wider">
                  <button
                    onClick={() => handleNavClick('experiences')}
                    className="block w-full text-left py-2 px-3 hover:bg-[#C8A96B]/10 text-[#F5F1E8] hover:text-[#C8A96B] transition-colors"
                  >
                    All Luxury Experiences
                  </button>
                  <div className="h-[1px] bg-[#C8A96B]/15 my-1" />
                  
                  {/* Dedicated Desserts Page Entry */}
                  <button
                    onClick={() => handleNavClick('desserts')}
                    className="block w-full text-left py-2 px-3 hover:bg-[#C8A96B]/15 text-[#C8A96B] font-medium flex items-center justify-between transition-colors group/item"
                  >
                    <span>{t.nav.desserts}</span>
                    <Sparkles className="w-3 h-3 text-[#C8A96B] group-hover/item:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleNavClick('experiences')}
                    className="block w-full text-left py-2 px-3 hover:bg-[#C8A96B]/10 text-[#F5F1E8]/80 hover:text-[#C8A96B] transition-colors"
                  >
                    Luxury Drives
                  </button>
                  <button
                    onClick={() => handleNavClick('experiences')}
                    className="block w-full text-left py-2 px-3 hover:bg-[#C8A96B]/10 text-[#F5F1E8]/80 hover:text-[#C8A96B] transition-colors"
                  >
                    5-Star Hotel Stays
                  </button>
                  <button
                    onClick={() => handleNavClick('experiences')}
                    className="block w-full text-left py-2 px-3 hover:bg-[#C8A96B]/10 text-[#F5F1E8]/80 hover:text-[#C8A96B] transition-colors"
                  >
                    Romantic Escapes
                  </button>
                </div>
              )}
            </div>

            {/* Direct Link to Fine Desserts explicitly available in Menu */}
            <button
              onClick={() => handleNavClick('desserts')}
              className={`hover:text-[#C8A96B] transition-colors ${
                activeTab === 'desserts' ? 'text-[#C8A96B]' : ''
              }`}
            >
              {t.nav.desserts}
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`hover:text-[#C8A96B] transition-colors ${
                activeTab === 'how-it-works' ? 'text-[#C8A96B]' : ''
              }`}
            >
              {t.nav.howItWorks}
            </button>

            <button
              onClick={() => handleNavClick('occasions')}
              className={`hover:text-[#C8A96B] transition-colors ${
                activeTab === 'occasions' ? 'text-[#C8A96B]' : ''
              }`}
            >
              {t.nav.occasions}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#C8A96B] transition-colors ${
                activeTab === 'about' ? 'text-[#C8A96B]' : ''
              }`}
            >
              {t.nav.about}
            </button>

            <button
              onClick={() => handleNavClick('gift-cards')}
              className={`hover:text-[#C8A96B] transition-colors ${
                activeTab === 'gift-cards' ? 'text-[#C8A96B]' : ''
              }`}
            >
              {t.nav.giftCards}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#C8A96B] transition-colors ${
                activeTab === 'contact' ? 'text-[#C8A96B]' : ''
              }`}
            >
              {t.nav.contact}
            </button>

            {/* Admin Portal Quick Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className="text-[#6D675E] hover:text-[#C8A96B] transition-colors text-[10px]"
              title="Concierge CMS Management"
            >
              CMS
            </button>

            {/* Language Selector NL | EN */}
            <div className="flex items-center gap-1 text-[11px] border border-[#C8A96B]/30 rounded-full px-2.5 py-1 bg-[#0B0A09]">
              <button
                onClick={() => setLanguage('NL')}
                className={`transition-colors font-medium ${
                  language === 'NL' ? 'text-[#C8A96B]' : 'text-[#6D675E] hover:text-[#F5F1E8]'
                }`}
              >
                NL
              </button>
              <span className="text-[#C8A96B]/40">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`transition-colors font-medium ${
                  language === 'EN' ? 'text-[#C8A96B]' : 'text-[#6D675E] hover:text-[#F5F1E8]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Primary CTA */}
            <button
              onClick={() => handleNavClick('experiences')}
              className="btn-royal-primary text-[11px] py-2 px-5"
            >
              {t.nav.discoverCTA}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Language Selector Mobile */}
            <div className="flex items-center gap-1 text-[10px] border border-[#C8A96B]/30 rounded-full px-2 py-0.5 bg-[#0B0A09]">
              <button
                onClick={() => setLanguage('NL')}
                className={language === 'NL' ? 'text-[#C8A96B]' : 'text-[#6D675E]'}
              >
                NL
              </button>
              <span className="text-[#C8A96B]/40">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={language === 'EN' ? 'text-[#C8A96B]' : 'text-[#6D675E]'}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F1E8] hover:text-[#C8A96B] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0A09] flex flex-col justify-between p-8 pt-28 animate-fade-in lg:hidden border-t border-[#C8A96B]/20">
          <div className="space-y-6 text-center">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('experiences')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              {t.nav.experiences}
            </button>
            
            {/* Mobile Desserts Highlight */}
            <button
              onClick={() => handleNavClick('desserts')}
              className="block w-full font-serif text-2xl text-[#C8A96B] hover:text-[#F5F1E8] transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C8A96B]" />
              {t.nav.desserts}
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('occasions')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              {t.nav.occasions}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('gift-cards')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              {t.nav.giftCards}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full font-serif text-2xl text-[#F5F1E8] hover:text-[#C8A96B] transition-colors uppercase tracking-widest"
            >
              {t.nav.contact}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="block w-full text-xs text-[#6D675E] hover:text-[#C8A96B] transition-colors uppercase tracking-widest pt-2"
            >
              CMS Admin Portal
            </button>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#C8A96B]/15 text-center">
            <button
              onClick={() => handleNavClick('experiences')}
              className="btn-royal-primary w-full py-3 text-xs"
            >
              {t.nav.discoverCTA}
            </button>
            <p className="text-[10px] text-[#6D675E] tracking-widest uppercase">
              GEZELLIG ROYAL NETHERLANDS — ONCE IN A ROYAL EXPERIENCE
            </p>
          </div>
        </div>
      )}
    </>
  );
};

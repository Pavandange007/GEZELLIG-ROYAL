import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Shield, Sparkles, MessageCircle, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const { settings } = useAdmin();

  return (
    <footer className="bg-[#0B0A09] text-[#F5F1E8] border-t border-[#C8A96B]/20 pt-20 pb-12 relative overflow-hidden">
      
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-[#C8A96B]/30 blur-sm" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-white.png"
              alt="Gezellig Royal Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <p className="text-xs text-[#6D675E] leading-relaxed max-w-sm font-sans">
            Gezellig Royal is a Netherlands-based luxury experience gifting brand. We elevate personal gifting into unforgettable moments—from luxury supercars and Michelin-starred dining to fine pastry tastings and 5-star hotel escapes.
          </p>

          <div className="pt-2">
            <span className="font-serif text-sm italic text-[#C8A96B] block">
              «Once in a Royal Experience»
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium mb-5">
            EXPERIENCES
          </h4>
          <ul className="space-y-3 text-xs text-[#F5F1E8]/70 font-sans">
            <li>
              <button onClick={() => setActiveTab('experiences')} className="hover:text-[#C8A96B] transition-colors">
                All Experiences
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('desserts')} className="hover:text-[#C8A96B] text-[#C8A96B]/90 font-medium transition-colors flex items-center gap-1.5">
                <span>Fine Desserts</span>
                <Sparkles className="w-3 h-3 text-[#C8A96B]" />
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('experiences')} className="hover:text-[#C8A96B] transition-colors">
                Luxury Drives
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('experiences')} className="hover:text-[#C8A96B] transition-colors">
                5-Star Hotel Stays
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('experiences')} className="hover:text-[#C8A96B] transition-colors">
                Romantic Experiences
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('occasions')} className="hover:text-[#C8A96B] transition-colors">
                Occasion Gifts
              </button>
            </li>
          </ul>
        </div>

        {/* Brand & Support Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium mb-5">
            THE CONCIERGE
          </h4>
          <ul className="space-y-3 text-xs text-[#F5F1E8]/70 font-sans">
            <li>
              <button onClick={() => setActiveTab('how-it-works')} className="hover:text-[#C8A96B] transition-colors">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-[#C8A96B] transition-colors">
                About Gezellig Royal
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('gift-cards')} className="hover:text-[#C8A96B] transition-colors">
                Digital Gift Cards
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-[#C8A96B] transition-colors">
                Concierge Contact
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('faq')} className="hover:text-[#C8A96B] transition-colors">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('legal')} className="hover:text-[#C8A96B] transition-colors">
                GDPR & Legal Terms
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium mb-5">
            LOCATION & CONTACT
          </h4>
          <div className="space-y-4 text-xs text-[#F5F1E8]/70 font-sans">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
              <span>{settings.addressSummary}</span>
            </div>
            
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hello Gezellig Royal, I'd love some help choosing an experience.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-[#C8A96B] transition-colors group"
            >
              <MessageCircle className="w-4 h-4 text-[#C8A96B] group-hover:scale-110 transition-transform" />
              <span>WhatsApp Concierge</span>
            </a>

            <a
              href={`mailto:${settings.businessEmail}`}
              className="flex items-center gap-2.5 hover:text-[#C8A96B] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#C8A96B]" />
              <span>{settings.businessEmail}</span>
            </a>

            <div className="pt-2 border-t border-[#C8A96B]/15">
              <span className="text-[10px] text-[#6D675E] uppercase tracking-wider block">
                Bilingual Concierge: EN | NL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#C8A96B]/15 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#6D675E] space-y-4 md:space-y-0">
        <div>
          {t.footer.rights}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setActiveTab('legal')} className="hover:text-[#C8A96B] transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => setActiveTab('legal')} className="hover:text-[#C8A96B] transition-colors">
            Terms & Conditions
          </button>
          <button onClick={() => setActiveTab('legal')} className="hover:text-[#C8A96B] transition-colors">
            Cookie Preferences
          </button>
        </div>
      </div>
    </footer>
  );
};

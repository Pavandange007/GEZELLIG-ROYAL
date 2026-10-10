import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { settings } = useAdmin();

  const handleWhatsAppClick = () => {
    const defaultText = "Hello Gezellig Royal, I'd love some help choosing an experience.";
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleWhatsAppClick}
        className="group relative flex items-center justify-center p-3.5 bg-[#0B0A09] text-[#F5F1E8] border border-[#C8A96B] rounded-full shadow-2xl hover:bg-[#C8A96B] hover:text-[#0B0A09] transition-all duration-500 hover:scale-105"
        aria-label="Chat on WhatsApp with Gezellig Royal Concierge"
        title="Chat on WhatsApp with Gezellig Royal"
      >
        {/* Subtle Pulse Halo */}
        <span className="absolute -inset-1 rounded-full bg-[#C8A96B]/20 animate-ping opacity-75 pointer-events-none" />

        <MessageCircle className="w-6 h-6 relative z-10" />

        {/* Tooltip on Hover */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-[#0B0A09]/95 text-[#F5F1E8] border border-[#C8A96B]/40 px-3 py-1.5 rounded text-[11px] font-sans tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { MessageCircle, Mail, MapPin, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useAdmin();

  const [formSent, setFormSent] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const handleWhatsApp = () => {
    const text = "Hello Gezellig Royal, I'd love some help choosing an experience.";
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 space-y-16 max-w-6xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          GEZELLIG ROYAL CONCIERGE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light">
          Let's Create Something Special.
        </h1>
        <div className="gold-line-short mx-auto" />
        <p className="text-xs sm:text-sm text-[#6D675E] font-sans font-light leading-relaxed">
          Have a question, need help choosing an experience, or looking for something completely personalised? Our hospitality team would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Method 1: WhatsApp */}
        <div className="p-8 border border-[#C8A96B]/30 bg-[#121110] space-y-4 text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-[#C8A96B]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">WHATSAPP</h3>
            <p className="text-xs text-[#6D675E]">Chat directly with Gezellig Royal Concierge</p>
          </div>
          <button
            onClick={handleWhatsApp}
            className="btn-royal-primary text-xs w-full py-3"
          >
            CHAT ON WHATSAPP →
          </button>
        </div>

        {/* Contact Method 2: Email */}
        <div className="p-8 border border-[#C8A96B]/30 bg-[#121110] space-y-4 text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-[#C8A96B]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">EMAIL</h3>
            <p className="text-xs text-[#6D675E]">{settings.businessEmail}</p>
          </div>
          <a
            href={`mailto:${settings.businessEmail}`}
            className="btn-royal-secondary text-xs w-full py-3 text-center"
          >
            SEND AN EMAIL →
          </a>
        </div>

        {/* Contact Method 3: Location */}
        <div className="p-8 border border-[#C8A96B]/30 bg-[#121110] space-y-4 text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-[#C8A96B]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">LOCATION</h3>
            <p className="text-xs text-[#6D675E]">{settings.addressSummary}</p>
          </div>
          <span className="text-[10px] text-[#C8A96B] uppercase tracking-wider block py-2">
            DUTCH CONCIERGE HEADQUARTERS
          </span>
        </div>

      </div>

      {/* Direct Inquiry Form */}
      <div className="max-w-2xl mx-auto p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-6">
        <h3 className="font-serif text-2xl text-[#C8A96B] text-center">Bespoke Concierge Request</h3>

        {!formSent ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">Your Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.nl"
                className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">Your Inquiry or Bespoke Idea *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your special occasion or requirements..."
                className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8] focus:border-[#C8A96B] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-royal-primary w-full py-4 text-xs tracking-widest"
            >
              SUBMIT CONCIERGE INQUIRY →
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-8">
            <div className="w-12 h-12 rounded-full border border-[#C8A96B] bg-[#C8A96B]/10 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-[#C8A96B]" />
            </div>
            <h4 className="font-serif text-2xl text-[#F5F1E8]">Message Received</h4>
            <p className="text-xs text-[#6D675E]">
              Thank you, {name}. A Gezellig Royal concierge representative will reply to {email} within 24 hours.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

import React, { useState } from 'react';

export const LegalPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  return (
    <div className="pt-28 pb-24 space-y-12 max-w-4xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-sans font-medium">
          GDPR & LEGAL COMPLIANCE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light">
          Legal & Privacy Policies
        </h1>
        <div className="gold-line-short mx-auto" />
      </div>

      <div className="flex justify-center border-b border-[#C8A96B]/20 text-xs font-sans uppercase tracking-wider gap-6">
        <button
          onClick={() => setActiveSubTab('privacy')}
          className={`py-3 transition-colors border-b-2 ${activeSubTab === 'privacy' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'}`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveSubTab('terms')}
          className={`py-3 transition-colors border-b-2 ${activeSubTab === 'terms' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'}`}
        >
          Terms & Conditions
        </button>
        <button
          onClick={() => setActiveSubTab('cookies')}
          className={`py-3 transition-colors border-b-2 ${activeSubTab === 'cookies' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'}`}
        >
          Cookie Policy
        </button>
      </div>

      <div className="p-8 border border-[#C8A96B]/20 bg-[#121110] space-y-6 text-xs text-[#6D675E] leading-relaxed font-sans font-light">
        {activeSubTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">Privacy Policy (AVG / GDPR Compliance)</h3>
            <p>
              Gezellig Royal operates in the Netherlands and strictly complies with the General Data Protection Regulation (GDPR / AVG). Personal information collected during booking (name, email, telephone, recipient details) is stored securely and processed exclusively for experience fulfillment and customer service.
            </p>
            <p>
              We never sell or disclose customer data to unauthorized third parties. You maintain the right to inspect, update, or request erasure of your data at any time by contacting gezelligroyal@gmail.com.
            </p>
          </div>
        )}

        {activeSubTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">Terms & Conditions</h3>
            <p>
              1. <strong>Experience Redemptions:</strong> All Gezellig Royal vouchers and experience bookings remain valid for 12 months from issue date unless specified otherwise.
            </p>
            <p>
              2. <strong>Rescheduling & Weather:</strong> Date adjustments are permitted up to 7 days prior to scheduled experience dates. Helicopter & driving experiences subject to safety weather clearance.
            </p>
            <p>
              3. <strong>Age & Driving Requirements:</strong> Supercar drive experiences require a valid driver's license held for a minimum of 3 years.
            </p>
          </div>
        )}

        {activeSubTab === 'cookies' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">Cookie Policy</h3>
            <p>
              We utilize minimal essential functional cookies to store your language preferences (NL | EN), cookie consents, and local booking states. No invasive tracking cookies are set without explicit consent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(true);

  useEffect(() => {
    const consent = localStorage.getItem('gezellig_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gezellig_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#0B0A09]/95 backdrop-blur-xl border-t border-[#C8A96B]/30 shadow-2xl animate-fade-in text-[#F5F1E8]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-2xl">
          <Shield className="w-5 h-5 text-[#C8A96B] shrink-0 mt-1" />
          <p className="text-xs leading-relaxed text-[#F5F1E8]/80 font-sans">
            We use essential cookies and refined analytics to provide an extraordinary digital experience. By browsing Gezellig Royal, you agree to our privacy principles aligned with Dutch & EU GDPR guidelines.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleAccept}
            className="btn-royal-primary text-[10px] py-2 px-6 w-full md:w-auto"
          >
            ACCEPT & CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

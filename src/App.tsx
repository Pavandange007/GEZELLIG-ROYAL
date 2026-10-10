import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { CookieBanner } from './components/CookieBanner';
import { BookingModal } from './components/BookingModal';

import { HomePage } from './pages/HomePage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { DessertsPage } from './pages/DessertsPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { OccasionsPage } from './pages/OccasionsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { GiftCardsPage } from './pages/GiftCardsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';

import { Experience } from './data/experiences';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [bookingExperience, setBookingExperience] = useState<Experience | null>(null);

  const handleSelectExperience = (exp: Experience) => {
    setSelectedExperience(exp);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (exp: Experience) => {
    setBookingExperience(exp);
  };

  return (
    <LanguageProvider>
      <AdminProvider>
        <div className="min-h-screen bg-[#0B0A09] text-[#F5F1E8] flex flex-col justify-between selection:bg-[#C8A96B] selection:text-[#0B0A09]">
          
          {/* Main Navigation */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              if (tab !== 'detail') setSelectedExperience(null);
            }}
          />

          {/* Page Routing */}
          <main className="flex-grow">
            {activeTab === 'home' && (
              <HomePage
                setActiveTab={setActiveTab}
                onSelectExperience={handleSelectExperience}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {activeTab === 'experiences' && (
              <ExperiencesPage
                onSelectExperience={handleSelectExperience}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {/* Dedicated Desserts Page */}
            {activeTab === 'desserts' && (
              <DessertsPage
                onSelectExperience={handleSelectExperience}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {activeTab === 'detail' && (
              <ExperienceDetailPage
                experience={selectedExperience}
                onBack={() => setActiveTab('experiences')}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {activeTab === 'occasions' && (
              <OccasionsPage setActiveTab={setActiveTab} />
            )}

            {activeTab === 'how-it-works' && (
              <HowItWorksPage setActiveTab={setActiveTab} />
            )}

            {activeTab === 'about' && (
              <AboutPage />
            )}

            {activeTab === 'gift-cards' && (
              <GiftCardsPage />
            )}

            {activeTab === 'contact' && (
              <ContactPage />
            )}

            {activeTab === 'faq' && (
              <FAQPage />
            )}

            {activeTab === 'admin' && (
              <AdminPage />
            )}

            {activeTab === 'legal' && (
              <LegalPage />
            )}
          </main>

          {/* Footer & Floating Widgets */}
          <Footer setActiveTab={setActiveTab} />
          <WhatsAppFloating />
          <CookieBanner />

          {/* Booking Modal */}
          {bookingExperience && (
            <BookingModal
              experience={bookingExperience}
              onClose={() => setBookingExperience(null)}
            />
          )}

        </div>
      </AdminProvider>
    </LanguageProvider>
  );
}

export default App;

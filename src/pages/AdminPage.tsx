import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Experience } from '../data/experiences';
import { Plus, Edit2, Trash2, Save, RefreshCw, Settings, Gift, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    experiences,
    bookings,
    giftCards,
    settings,
    addExperience,
    updateExperience,
    deleteExperience,
    updateSettings,
    resetToDefaults
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'experiences' | 'bookings' | 'giftcards' | 'settings'>('experiences');
  
  // Experience Edit State
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editLocation, setEditLocation] = useState<string>('');
  const [editShortDesc, setEditShortDesc] = useState<string>('');

  // Settings State
  const [waNumber, setWaNumber] = useState<string>(settings.whatsappNumber);
  const [email, setEmail] = useState<string>(settings.businessEmail);

  // New Experience Form State
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<any>('Luxury Drives');
  const [newPrice, setNewPrice] = useState<number>(500);
  const [newLocation, setNewLocation] = useState<string>('Amsterdam, Netherlands');
  const [newDuration, setNewDuration] = useState<string>('4 Hours');
  const [newImage, setNewImage] = useState<string>('/images/hero.jpg');
  const [newShortDesc, setNewShortDesc] = useState<string>('');

  const startEdit = (exp: Experience) => {
    setEditingExpId(exp.id);
    setEditTitle(exp.title);
    setEditPrice(exp.priceFrom);
    setEditLocation(exp.location);
    setEditShortDesc(exp.shortDescription);
  };

  const saveEdit = (id: string) => {
    updateExperience(id, {
      title: editTitle,
      priceFrom: editPrice,
      location: editLocation,
      shortDescription: editShortDesc
    });
    setEditingExpId(null);
  };

  const handleCreateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    addExperience({
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      category: newCategory,
      categoryLabel: newCategory.toUpperCase(),
      shortDescription: newShortDesc || 'A bespoke luxury experience created by Gezellig Royal.',
      fullDescription: 'Full experience description managed via Gezellig Royal CMS.',
      priceFrom: Number(newPrice),
      currency: 'EUR',
      image: newImage,
      gallery: [newImage],
      location: newLocation,
      duration: newDuration,
      availableDates: ['2026-11-01', '2026-11-08'],
      includedItems: ['VIP Concierge Welcome', 'Luxury Experience Access'],
      optionalExtras: [
        { id: 'ext-champagne-new', name: 'Dom Pérignon Vintage Champagne', price: 290, description: 'Chilled bottle upon arrival' }
      ],
      packages: [
        { id: 'pkg-default-new', name: 'ROYAL ESSENTIAL', price: Number(newPrice), description: 'Standard experience package', inclusions: ['Full Experience Access'] }
      ],
      terms: 'Standard Gezellig Royal terms apply.',
      cancellationPolicy: 'Free cancellation up to 7 days prior.',
      featured: true,
      rating: 5.0,
      reviewsCount: 1
    });
    setShowAddForm(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      whatsappNumber: waNumber,
      businessEmail: email
    });
    alert('Settings updated successfully!');
  };

  return (
    <div className="pt-28 pb-24 space-y-12 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in text-[#F5F1E8]">
      
      {/* Top CMS Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C8A96B]/30 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-sans font-medium">
            GEZELLIG ROYAL CMS DASHBOARD
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-light">
            Store Owner Admin Portal
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="btn-royal-secondary text-[11px] py-2 px-4"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            RESET TO DEFAULTS
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-4 border-b border-[#C8A96B]/20 text-xs font-sans uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('experiences')}
          className={`py-3 px-4 transition-colors border-b-2 ${
            activeTab === 'experiences' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'
          }`}
        >
          Experiences ({experiences.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`py-3 px-4 transition-colors border-b-2 ${
            activeTab === 'bookings' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'
          }`}
        >
          Bookings ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('giftcards')}
          className={`py-3 px-4 transition-colors border-b-2 ${
            activeTab === 'giftcards' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'
          }`}
        >
          Gift Cards ({giftCards.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-4 transition-colors border-b-2 ${
            activeTab === 'settings' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-[#6D675E]'
          }`}
        >
          Store Settings
        </button>
      </div>

      {/* TAB 1: MANAGING EXPERIENCES */}
      {activeTab === 'experiences' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">Experience Catalogue Management</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-royal-primary text-xs py-2 px-4 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              CREATE NEW EXPERIENCE
            </button>
          </div>

          {/* Add New Experience Modal Form */}
          {showAddForm && (
            <form onSubmit={handleCreateExperience} className="p-8 border border-[#C8A96B] bg-[#121110] space-y-4 max-w-2xl animate-fade-in">
              <h4 className="font-serif text-xl text-[#C8A96B]">Add New Experience</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#6D675E] uppercase">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Experience Title"
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-2.5 text-xs text-[#F5F1E8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#6D675E] uppercase">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-2.5 text-xs text-[#F5F1E8]"
                  >
                    <option value="Luxury Drives">Luxury Drives</option>
                    <option value="Fine Dining">Fine Dining</option>
                    <option value="5-Star Stays">5-Star Stays</option>
                    <option value="Fine Desserts">Fine Desserts</option>
                    <option value="Romance">Romance</option>
                    <option value="Celebrations">Celebrations</option>
                    <option value="Personalised Experiences">Personalised Experiences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#6D675E] uppercase">Starting Price (€)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-2.5 text-xs text-[#F5F1E8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#6D675E] uppercase">Location</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-2.5 text-xs text-[#F5F1E8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#6D675E] uppercase">Image URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-2.5 text-xs text-[#F5F1E8]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#6D675E] uppercase">Short Description</label>
                <textarea
                  rows={2}
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-2.5 text-xs text-[#F5F1E8]"
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-royal-primary text-xs py-2 px-6">SAVE EXPERIENCE</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn-royal-secondary text-xs py-2 px-6">CANCEL</button>
              </div>
            </form>
          )}

          {/* List Table */}
          <div className="space-y-4">
            {experiences.map(exp => {
              const isEditing = editingExpId === exp.id;
              return (
                <div key={exp.id} className="p-6 border border-[#C8A96B]/20 bg-[#121110] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={exp.image} alt={exp.title} className="w-16 h-16 object-cover border border-[#C8A96B]/30" />
                    <div className="space-y-1">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="bg-[#0B0A09] border border-[#C8A96B] p-1 text-xs text-[#F5F1E8]" />
                          <input type="number" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} className="bg-[#0B0A09] border border-[#C8A96B] p-1 text-xs text-[#F5F1E8] w-28" />
                        </div>
                      ) : (
                        <>
                          <span className="text-[10px] text-[#C8A96B] uppercase tracking-wider block">{exp.category}</span>
                          <h4 className="font-serif text-lg text-[#F5F1E8]">{exp.title}</h4>
                          <span className="text-xs text-[#6D675E] font-serif">€{exp.priceFrom} • {exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <button onClick={() => saveEdit(exp.id)} className="btn-royal-primary text-xs py-1.5 px-4 flex items-center gap-1">
                        <Save className="w-3.5 h-3.5" /> SAVE
                      </button>
                    ) : (
                      <button onClick={() => startEdit(exp)} className="btn-royal-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                        <Edit2 className="w-3.5 h-3.5" /> EDIT
                      </button>
                    )}
                    <button onClick={() => deleteExperience(exp.id)} className="p-2 text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-[#F5F1E8]">Customer Bookings & Orders</h3>
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="p-6 border border-[#C8A96B]/30 bg-[#121110] space-y-3">
                <div className="flex justify-between items-start border-b border-[#C8A96B]/15 pb-2">
                  <div>
                    <span className="font-serif text-[#C8A96B] text-lg font-medium">{b.referenceCode}</span>
                    <span className="text-xs text-[#6D675E] block">Booked on: {new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-[#C8A96B]/20 text-[#C8A96B] border border-[#C8A96B]/40 px-3 py-1 text-[10px] uppercase font-sans">
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Experience</span>
                    <span className="text-[#F5F1E8]">{b.experienceTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Date</span>
                    <span className="text-[#F5F1E8]">{b.selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Customer</span>
                    <span className="text-[#F5F1E8]">{b.customerName} ({b.customerEmail})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D675E] uppercase block">Total</span>
                    <span className="font-serif text-[#C8A96B] text-sm">€{b.priceTotal} ({b.paymentMethod})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GIFT CARDS */}
      {activeTab === 'giftcards' && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-[#F5F1E8]">Gift Card Vouchers</h3>
          <div className="space-y-4">
            {giftCards.map(gc => (
              <div key={gc.id} className="p-6 border border-[#C8A96B]/30 bg-[#121110] flex justify-between items-center">
                <div>
                  <span className="font-mono text-[#C8A96B] text-sm font-medium block">{gc.code}</span>
                  <span className="text-xs text-[#F5F1E8]">Recipient: {gc.recipientName} ({gc.recipientEmail})</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl text-[#F5F1E8] block">€{gc.amount}</span>
                  <span className="text-[10px] text-[#6D675E] uppercase">{gc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STORE SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 max-w-xl p-8 border border-[#C8A96B]/30 bg-[#121110]">
          <h3 className="font-serif text-2xl text-[#C8A96B]">Store Concierge Settings</h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
              WhatsApp Concierge Number (Netherlands Country Code Format)
            </label>
            <input
              type="text"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              placeholder="31612345678"
              className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8]"
            />
            <span className="text-[10px] text-[#6D675E] block mt-1">This number receives all direct WhatsApp inquiry links across mobile and desktop.</span>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#6D675E] mb-1">
              Business Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="concierge@gezelligroyal.nl"
              className="w-full bg-[#0B0A09] border border-[#C8A96B]/30 p-3 text-xs text-[#F5F1E8]"
            />
          </div>

          <button type="submit" className="btn-royal-primary text-xs py-3 px-6">
            SAVE STORE SETTINGS →
          </button>
        </form>
      )}

    </div>
  );
};

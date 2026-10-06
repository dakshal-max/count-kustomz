import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, FileText, Sparkles, Sliders } from 'lucide-react';
import Instagram from './InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, MATERIALS } from '../data/furnitureData';

export default function BespokeInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    igHandle: '',
    projectType: 'Private Residence',
    selectedMaterials: ['Limed European Oak', 'Raw Travertine Stone'],
    budgetTier: '$1,500 - $2,000',
    timeline: 'Within 4-6 Weeks',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const toggleMaterial = (matName) => {
    if (formData.selectedMaterials.includes(matName)) {
      setFormData({
        ...formData,
        selectedMaterials: formData.selectedMaterials.filter((m) => m !== matName),
      });
    } else {
      setFormData({
        ...formData,
        selectedMaterials: [...formData.selectedMaterials, matName],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const text = `Hi Count Kustomzz! I'd like to discuss a custom furniture project.\nName: ${formData.name}\nContact/IG: ${formData.contact || formData.igHandle}\nProject: ${formData.projectType}\nMaterials: ${formData.selectedMaterials.join(', ')}\nBudget: ${formData.budgetTier}\nNotes: ${formData.notes}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="bespoke" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA] border-b border-[#E6DFD5]">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#D8CEBE] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#4A453E]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Commission Custom Architecture</span>
          </div>
          <h2 className="font-serif-lim text-4xl sm:text-5xl text-[#1C1B18] font-light tracking-tight">
            Bespoke Project Inquiry
          </h2>
          <p className="text-sm text-[#6E6659]">
            Have a custom floorplan or architectural piece in mind? Complete this brief inquiry or reach out directly via Instagram DM.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E0D7C9] shadow-xl text-left">
          
          {submitted ? (
            <div className="text-center py-12 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-[#1C1B18] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-serif-lim text-3xl font-semibold text-[#1C1B18]">
                  Bespoke Inquiry Received
                </h3>
                <p className="text-sm text-[#6E6659]">
                  Thank you, <strong>{formData.name}</strong>. Our lead master joiner will review your custom requirements and respond within 24 hours.
                </p>
              </div>

              {/* Direct Instant Contact Actions */}
              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1C1B18] text-[#FAF8F5] px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Direct DM to {INSTAGRAM_HANDLE}</span>
                </a>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 text-white px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-emerald-800 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Email or Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="julian@example.com or +1 555..."
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                  />
                </div>
              </div>

              {/* Instagram Handle & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={formData.igHandle}
                    onChange={(e) => setFormData({ ...formData, igHandle: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Project Space Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                  >
                    <option value="Private Residence">Private Residence</option>
                    <option value="Penthouse / Apartment">Penthouse / Apartment</option>
                    <option value="Boutique Hotel / Commercial">Boutique Hotel / Commercial</option>
                    <option value="Architectural Office">Architectural Office</option>
                    <option value="Other Custom Installation">Other Custom Installation</option>
                  </select>
                </div>
              </div>

              {/* Material Preferences Multi-Select Pills */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                  Select Desired Material Compositions
                </label>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((mat) => {
                    const isSelected = formData.selectedMaterials.includes(mat.name);
                    return (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => toggleMaterial(mat.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                          isSelected
                            ? 'bg-[#1C1B18] text-[#FAF8F5] border-[#1C1B18]'
                            : 'bg-[#FAF8F5] text-[#4A453E] border-[#E0D7C9] hover:bg-[#EAE4DA]'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mat.color }}></span>
                        <span>{mat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Tier & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Target Project Budget Range
                  </label>
                  <select
                    value={formData.budgetTier}
                    onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                  >
                    <option value="$1,000 - $1,500">$1,000 - $1,500</option>
                    <option value="$1,500 - $2,000">$1,500 - $2,000</option>
                    <option value="$2,000 - $3,500">$2,000 - $3,500</option>
                    <option value="$3,500+ Multi-Piece Sanctuary">$3,500+ Multi-Piece Sanctuary</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Desired Lead Time
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                  >
                    <option value="Flexible Timeline">Flexible Timeline</option>
                    <option value="Within 4-6 Weeks">Within 4-6 Weeks</option>
                    <option value="Express 2-3 Weeks">Express 2-3 Weeks (Rush Build)</option>
                  </select>
                </div>
              </div>

              {/* Custom Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                  Dimensions, Special Requirements & Architectural Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your desired dimensions, room layout, floorplan details, or specific customization preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C1B18] transition"
                ></textarea>
              </div>

              {/* Submit Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#1C1B18] text-[#FAF8F5] px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#38352F] transition-all flex items-center justify-center gap-3 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Submit Custom Build Request</span>
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1C1B18] hover:text-[#D4AF37] flex items-center gap-1.5 underline"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Prefer to chat on Instagram? @countkustomzz</span>
                </a>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

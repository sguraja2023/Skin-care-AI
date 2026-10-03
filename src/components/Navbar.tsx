import React, { useState } from 'react';
import { Shield, Sparkles, AlertCircle, Menu, X, BookOpen, Clock, HeartHandshake, UserCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  hasActiveResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, hasActiveResults }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze My Skin' },
    { id: 'routine', label: 'My Routine' },
    { id: 'ingredients', label: 'Ingredient Guide' },
    { id: 'progress', label: 'Progress' },
    { id: 'privacy', label: 'Privacy & Settings' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E4DF] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-3 text-left focus-visible:ring-2 focus-visible:ring-[#3F6152] rounded-lg p-1"
              aria-label="SkinGuide AI Homepage"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8EFEA] flex items-center justify-center text-[#2A4B3C] border border-[#CAD9D0]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-xl tracking-tight text-[#1E2623] block leading-none font-semibold">
                  SkinGuide AI
                </span>
                <span className="text-xs text-[#5E6862] tracking-wide block mt-1">
                  Evidence-Based Skincare Education
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-[#234235] font-semibold'
                        : 'text-[#58635D] hover:text-[#1E2623]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#3F6152] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Emergency / Clinician Alert Trigger */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#7A3E2D] bg-[#FBF0EC] border border-[#EED7CE] hover:bg-[#F7E5DE] rounded-md transition-colors font-medium"
                title="When to seek medical attention immediately"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#A24A32]" />
                <span>When to See a Doctor</span>
              </button>

              <button
                onClick={() => setCurrentTab('analyze')}
                className="px-4 py-2 text-sm font-medium text-white bg-[#335546] hover:bg-[#284337] rounded-md shadow-xs transition-all cursor-pointer"
              >
                Start Analysis
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="p-2 text-[#A24A32] bg-[#FBF0EC] rounded-md"
                aria-label="Doctor guidance"
              >
                <AlertCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#3D4742] hover:text-[#1E2623] focus-visible:ring-2 focus-visible:ring-[#3F6152] rounded-md"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E6E4DF] bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                  currentTab === item.id
                    ? 'bg-[#EBF2EE] text-[#234235] font-semibold'
                    : 'text-[#58635D] hover:bg-[#F2EFE9]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentTab('analyze');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-[#335546] rounded-md"
              >
                Start Analysis
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Emergency & Dermatologist Guidance Modal */}
      {showEmergencyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="bg-[#FAF9F6] border border-[#DDD9D2] rounded-xl max-w-xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E6E4DF] pb-3">
              <div className="flex items-center gap-2 text-[#9A3412]">
                <AlertCircle className="w-5 h-5" />
                <h2 className="text-lg font-semibold text-[#1E2623] font-serif">Clinical Care & Safety Guidance</h2>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-[#647069] hover:text-[#1E2623] p-1 rounded-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#3D4742] leading-relaxed">
              <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-md text-[#991B1B]">
                <h3 className="font-semibold text-sm">Emergency Warning Signs (Seek Urgent Care Immediately)</h3>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs text-[#7F1D1D]">
                  <li>Sudden facial, lip, or tongue swelling</li>
                  <li>Difficulty breathing, wheezing, or throat tightness</li>
                  <li>Rapidly spreading severe hives or dizziness</li>
                </ul>
                <p className="mt-2 text-xs font-medium">Call 911 (US) or your local emergency number immediately.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E2623] text-sm">When to Consult a Dermatologist</h3>
                <p className="text-xs text-[#58635D] mt-1">Cosmetic guidance cannot replace clinical dermatology evaluation for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                  <li>Any new, dark, changing, irregular, or bleeding skin spot (ABCDE criteria for melanoma)</li>
                  <li>Severe, painful, cystic, or scarring breakouts</li>
                  <li>Persistent burning, intense itching, or flaking that does not respond to basic moisturizer</li>
                  <li>Rashes near the eyes or eyelids</li>
                  <li>Suspected infections, oozing, or warm spreading redness</li>
                </ul>
              </div>

              <div className="p-3 bg-[#EAF2ED] border border-[#CADCD0] rounded-md text-[#234235] text-xs">
                <p className="font-semibold">Educational Nature of SkinGuide AI</p>
                <p className="mt-1 text-[#335546]">
                  This application does not provide medical diagnoses, skin cancer screenings, or prescription treatment. It provides cosmetic education on visible surface concerns and gentle barrier maintenance.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#E6E4DF]">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 text-xs font-medium text-[#234235] bg-[#E5EFE9] hover:bg-[#D9E7DF] rounded-md"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

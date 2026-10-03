import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, AlertCircle, ArrowRight, BookOpen, CheckCircle2, FileText } from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/demoProfiles';
import { AnalysisResult } from '../types/skincare';

interface HomeViewProps {
  onStartAnalysis: (mode?: 'photo' | 'questionnaire_only') => void;
  onLoadSample: (sampleResult: AnalysisResult) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartAnalysis, onLoadSample, onNavigateTab }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-[#EAE7E1]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#2F5342] tracking-wider uppercase mb-4">
            <span>Cosmetic Education for Adults 18+</span>
            <span aria-hidden="true">·</span>
            <span>Evidence-Based</span>
            <span aria-hidden="true">·</span>
            <span>Safety-First</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1A211D] tracking-tight leading-[1.15] mb-6 font-medium">
            Understand your visible skin concerns with calm clarity.
          </h1>

          <p className="text-base sm:text-lg text-[#525E57] max-w-2xl mx-auto leading-relaxed mb-8">
            Upload facial photos or complete our questionnaire to receive cautious, plain-English observations, a gentle AM/PM barrier routine, and clear guidance on when to consult a dermatologist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onStartAnalysis('photo')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-[#2E4F3E] hover:bg-[#233F31] rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Begin Skin Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStartAnalysis('questionnaire_only')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-[#2B3A33] bg-[#EFECE6] hover:bg-[#E4DFD7] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#4A6455]" />
              <span>Questionnaire Only (No Photos)</span>
            </button>
          </div>

          {/* Cautious Positioning Note */}
          <div className="mt-8 p-3.5 bg-[#F4F2EC] border border-[#E3DFC] rounded-lg max-w-xl mx-auto text-left text-xs text-[#505D56] leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#3E6150] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#232F28] font-medium block">Cosmetic education, not a medical diagnosis</strong>
              This application does not diagnose disease, prescribe medications, or replace an in-person dermatology examination. Photos cannot reliably evaluate underlying skin histology, medical conditions, or mole safety.
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles & Anti-Slop Educational Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A211D] mb-3">
            What makes our approach different
          </h2>
          <p className="text-sm text-[#5C6761]">
            Grounding skincare in physiology and dermatological caution, without marketing pressure or arbitrary beauty scores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FAF9F6] border border-[#E4E0D8] rounded-xl p-6 transition-shadow hover:shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#EAF0EC] flex items-center justify-center text-[#2A4B3C] mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#1F2723] mb-2 font-serif">
              01. Objective Observations
            </h3>
            <p className="text-sm text-[#535F58] leading-relaxed">
              We describe visible surface features in plain English: blemishes resembling acne, visible redness, dry flaking, or uneven tone. We never invent lesion counts or claim to diagnose internal health.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-[#E4E0D8] rounded-xl p-6 transition-shadow hover:shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#EAF0EC] flex items-center justify-center text-[#2A4B3C] mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#1F2723] mb-2 font-serif">
              02. Zero Shame & No Scores
            </h3>
            <p className="text-sm text-[#535F58] leading-relaxed">
              Real skin has texture, pores, and natural variation. You will never see &ldquo;attractiveness ratings,&rdquo; &ldquo;beauty scores,&rdquo; or fabricated percentage metrics here.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-[#E4E0D8] rounded-xl p-6 transition-shadow hover:shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#EAF0EC] flex items-center justify-center text-[#2A4B3C] mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#1F2723] mb-2 font-serif">
              03. Transparent Boundaries
            </h3>
            <p className="text-sm text-[#535F58] leading-relaxed">
              We clearly articulate what cannot be determined from photos, including true skin type, barrier integrity, or deeper pigment depth. We recommend at most one cautious active initially.
            </p>
          </div>
        </div>
      </section>

      {/* The 4-Step Journey */}
      <section className="bg-[#F5F3EC] py-14 border-y border-[#E4E0D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A211D] mb-2">How it works</h2>
            <p className="text-xs sm:text-sm text-[#5B6660]">A thoughtful sequence designed to prioritize user safety and privacy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF9F6] border border-[#DFDAD1] rounded-lg p-5">
              <span className="text-xs font-semibold text-[#3D604E] block mb-2">Step 01</span>
              <h4 className="font-medium text-[#1A211D] text-sm mb-1.5">Consent & Verification</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">
                Confirm age 18+, review explicit AI processing with Google Gemini, and understand our zero-storage ephemeral memory policy.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#DFDAD1] rounded-lg p-5">
              <span className="text-xs font-semibold text-[#3D604E] block mb-2">Step 02</span>
              <h4 className="font-medium text-[#1A211D] text-sm mb-1.5">Context Questionnaire</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">
                Share self-reported skin type, sensitivity history, current products, pregnancy status, and check for concerning symptoms.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#DFDAD1] rounded-lg p-5">
              <span className="text-xs font-semibold text-[#3D604E] block mb-2">Step 03</span>
              <h4 className="font-medium text-[#1A211D] text-sm mb-1.5">Photo & Quality Check</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">
                Optional front and profile photos taken in even natural light. We verify focal clarity, lighting, and absence of filters before analyzing.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#DFDAD1] rounded-lg p-5">
              <span className="text-xs font-semibold text-[#3D604E] block mb-2">Step 04</span>
              <h4 className="font-medium text-[#1A211D] text-sm mb-1.5">Cautious Routine</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">
                Receive manageable AM/PM routines, patch-test guidance, educational ingredient profiles, and dermatologist guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Demo Explorations */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border border-[#DEDAD1] rounded-xl bg-[#FAF9F6] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs text-[#3E5E4F] font-semibold tracking-wider uppercase block mb-1">Interactive Samples</span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1E2622]">Preview sample educational outputs</h3>
              <p className="text-xs sm:text-sm text-[#59655F] mt-1">
                Explore how the engine handles real-world scenarios without uploading your own photo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SAMPLE_PROFILES.map((sample) => (
              <div
                key={sample.id}
                className="border border-[#E2DED6] hover:border-[#CADCD1] rounded-lg p-4 bg-[#FDFCFA] transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-semibold text-[#202924] mb-1">{sample.label}</h4>
                  <p className="text-xs text-[#58645E] leading-relaxed mb-4">{sample.description}</p>
                </div>
                <button
                  onClick={() => onLoadSample(sample.result)}
                  className="w-full py-2 px-3 text-xs font-medium text-[#294B3C] bg-[#E8EFEA] hover:bg-[#D9E5DC] rounded-md transition-colors text-center cursor-pointer"
                >
                  View Sample Analysis & Routine &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Education Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block mb-2">Evidence-Based Library</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A211D] mb-4">
              Learn about active cosmetic ingredients safely.
            </h3>
            <p className="text-sm text-[#505D56] leading-relaxed mb-4">
              From barrier lipids like Ceramides and Hyaluronic Acid to targeted exfoliants like Salicylic Acid and Azelaic Acid, explore verified evidence limitations, irritation potentials, and clinical precautions.
            </p>
            <div className="space-y-2 text-xs text-[#424F47] mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355947]" />
                <span>Reviewed content grounded in AAD, NHS, and DermNet NZ publications.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355947]" />
                <span>Accurate pregnancy & nursing safety disclosures.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355947]" />
                <span>Zero commission or sponsored brand bias.</span>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('ingredients')}
              className="px-4 py-2.5 text-xs font-semibold text-[#213F31] bg-[#E5EFE8] hover:bg-[#D6E5DB] rounded-md transition-colors cursor-pointer"
            >
              Browse Evidence-Based Library
            </button>
          </div>

          <div className="bg-[#F4F1EA] border border-[#DDD8CD] rounded-xl p-6 space-y-4">
            <h4 className="font-serif text-base text-[#1E2622] font-semibold">Important Clinical Caveats</h4>
            <div className="space-y-3 text-xs text-[#4F5B54] leading-relaxed">
              <p>
                <strong>Skin Type vs. Oiliness:</strong> A shiny forehead in a digital photo does not reliably prove oily skin. Dehydrated skin or natural lighting reflections can produce surface sheen. We confirm your baseline via the questionnaire.
              </p>
              <p>
                <strong>Cautious Actives:</strong> We will never advise using multiple new serums, acids, or retinoids simultaneously. Stacking actives degrades the stratum corneum and increases irritation risk.
              </p>
              <p>
                <strong>Patch-Testing:</strong> Every new cosmetic product should be patch-tested for 3 days behind the ear or on the forearm, though patch testing does not eliminate all possibility of facial sensitivity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

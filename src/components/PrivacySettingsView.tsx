import React, { useState } from 'react';
import { ShieldCheck, Lock, Trash2, Download, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { RoutineStep } from '../types/skincare';

interface PrivacySettingsViewProps {
  currentRoutine?: {
    morning: RoutineStep[];
    evening: RoutineStep[];
  };
  onResetAllData: () => void;
}

export const PrivacySettingsView: React.FC<PrivacySettingsViewProps> = ({ currentRoutine, onResetAllData }) => {
  const [resetConfirmed, setResetConfirmed] = useState(false);

  const handleExport = () => {
    let summary = `SkinGuide AI - Educational Routine Summary\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
    summary += `NOTE: This is educational cosmetic guidance, not a medical prescription or diagnosis.\n\n`;

    if (currentRoutine) {
      summary += `--- MORNING ROUTINE (AM) ---\n`;
      currentRoutine.morning.forEach((step) => {
        summary += `Step ${step.step_number}: ${step.category} (${step.frequency_schedule})\nAction: ${step.suggested_action}\nPrecautions: ${step.precautions}\n\n`;
      });

      summary += `--- EVENING ROUTINE (PM) ---\n`;
      currentRoutine.evening.forEach((step) => {
        summary += `Step ${step.step_number}: ${step.category} (${step.frequency_schedule})\nAction: ${step.suggested_action}\nPrecautions: ${step.precautions}\n\n`;
      });
    } else {
      summary += `No saved routine found in current session.\n`;
    }

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkinGuide_Routine_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    onResetAllData();
    setResetConfirmed(true);
    setTimeout(() => setResetConfirmed(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-3">
        <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block">
          Transparency & Security
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1E2623] font-medium">
          Privacy Policy & Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6761] leading-relaxed">
          We treat personal health inquiries and facial images with strict minimization principles. Review exactly how data flows through this application.
        </p>
      </div>

      {/* Core Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#2B4F3D]">
            <Lock className="w-5 h-5" />
            <h3 className="font-serif text-base font-semibold text-[#1E2623]">
              Ephemeral Memory Architecture
            </h3>
          </div>
          <p className="text-xs text-[#526058] leading-relaxed">
            Uploaded facial photos are held strictly in temporary server memory during the single request required for Gemini model processing. They are deleted immediately upon response generation. We do not maintain a permanent database of user selfies.
          </p>
        </div>

        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#2B4F3D]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-base font-semibold text-[#1E2623]">
              Zero Biometric Recognition
            </h3>
          </div>
          <p className="text-xs text-[#526058] leading-relaxed">
            Our analysis examines visible cosmetic surface qualities (tone, blemishes, flaking, texture). We never perform facial identification, match faces across accounts, or infer demographic traits like ethnicity or gender.
          </p>
        </div>
      </div>

      {/* Disclosures & Regulatory Transparency */}
      <div className="bg-[#F7F5EE] border border-[#DDD8CD] rounded-xl p-6 space-y-4 text-xs text-[#4F5B54] leading-relaxed">
        <h3 className="font-serif text-base font-semibold text-[#1E2623]">
          Detailed Disclosure of Service Boundaries
        </h3>

        <div className="space-y-3">
          <p>
            <strong>AI Model Integration:</strong> SkinGuide AI utilizes the Google Gemini API (model <code>gemini-3.8-flash</code>) over secure HTTPS server communication. API keys are kept strictly on the backend and are never sent to the browser.
          </p>
          <p>
            <strong>No Health Insurance Portability and Accountability Act (HIPAA) Claim:</strong> This application is a cosmetic consumer educational tool. It is not a HIPAA-covered medical entity or medical device. Users should never submit official clinical medical records.
          </p>
          <p>
            <strong>No LocalStorage Health Caching:</strong> Sensitive health answers and questionnaires are kept only in application state and are not written to persistent browser <code>localStorage</code> caches.
          </p>
        </div>
      </div>

      {/* Data Controls & Actions */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
        <h3 className="font-serif text-base font-semibold text-[#1E2623]">
          Export & Data Deletion Controls
        </h3>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            onClick={handleExport}
            className="px-4 py-2.5 text-xs font-semibold text-[#204332] bg-[#E5EFE9] hover:bg-[#D6E5DC] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Routine to Text File</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 text-xs font-semibold text-[#9C4B3C] bg-[#FBF0EE] hover:bg-[#F6E3E0] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete All Session Data &amp; Reset App</span>
          </button>
        </div>

        {resetConfirmed && (
          <div className="p-3 bg-[#EDF7F1] border border-[#BCE1CC] rounded-md text-xs text-[#205137] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>All session memory, questionnaires, and routines have been completely wiped.</span>
          </div>
        )}
      </div>

      {/* Helpful Clinical Resources */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-3">
        <h3 className="font-serif text-base font-semibold text-[#1E2623]">
          Authoritative Medical Directory Links
        </h3>
        <p className="text-xs text-[#5C6761]">
          When clinical diagnosis or medical prescriptions are indicated:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <a
            href="https://www.aad.org/find-a-derm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F6F4ED] hover:bg-[#ECE8DF] border border-[#DFDACF] rounded-lg block font-medium text-[#224835] transition-colors"
          >
            Find a Dermatologist (AAD) &rarr;
          </a>
          <a
            href="https://www.nhs.uk/conditions/acne/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F6F4ED] hover:bg-[#ECE8DF] border border-[#DFDACF] rounded-lg block font-medium text-[#224835] transition-colors"
          >
            NHS Skin Health Guide &rarr;
          </a>
          <a
            href="https://dermnetnz.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F6F4ED] hover:bg-[#ECE8DF] border border-[#DFDACF] rounded-lg block font-medium text-[#224835] transition-colors"
          >
            DermNet NZ Visual Dermatology &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

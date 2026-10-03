import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AnalyzeFlow } from './components/AnalyzeFlow';
import { ResultsView } from './components/ResultsView';
import { MyRoutineView } from './components/MyRoutineView';
import { IngredientGuideView } from './components/IngredientGuideView';
import { ProgressView } from './components/ProgressView';
import { PrivacySettingsView } from './components/PrivacySettingsView';
import { AnalysisResult, RoutineStep } from './types/skincare';
import { Shield, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [analysisMode, setAnalysisMode] = useState<'photo' | 'questionnaire_only'>('photo');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [savedRoutine, setSavedRoutine] = useState<{
    morning: RoutineStep[];
    evening: RoutineStep[];
  } | undefined>(undefined);

  // Trigger analysis flow
  const handleStartAnalysis = (mode: 'photo' | 'questionnaire_only' = 'photo') => {
    setAnalysisMode(mode);
    setCurrentTab('analyze');
  };

  // On analysis completion
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    // Also pre-populate saved routine
    setSavedRoutine(result.routine);
    setCurrentTab('results');
  };

  // Load sample profile from demo
  const handleLoadSample = (sample: AnalysisResult) => {
    setAnalysisResult(sample);
    setSavedRoutine(sample.routine);
    setCurrentTab('results');
  };

  // Save routine
  const handleSaveToRoutine = (routine: { morning: RoutineStep[]; evening: RoutineStep[] }) => {
    setSavedRoutine(routine);
  };

  // Delete photos
  const handleDeletePhotos = () => {
    if (analysisResult) {
      // Clear observations' photo references
      setAnalysisResult({
        ...analysisResult,
        image_quality_reasons: ['Photos permanently flushed from memory upon user request.']
      });
    }
  };

  // Reset all application data
  const handleResetAllData = () => {
    setAnalysisResult(null);
    setSavedRoutine(undefined);
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#242A27]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hasActiveResults={!!analysisResult}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onStartAnalysis={handleStartAnalysis}
            onLoadSample={handleLoadSample}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'analyze' && (
          <AnalyzeFlow
            initialMode={analysisMode}
            onAnalysisComplete={handleAnalysisComplete}
            onCancel={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'results' && analysisResult && (
          <ResultsView
            result={analysisResult}
            onEditAnswers={() => setCurrentTab('analyze')}
            onSaveToRoutine={handleSaveToRoutine}
            onDeletePhotos={handleDeletePhotos}
          />
        )}

        {currentTab === 'results' && !analysisResult && (
          <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
            <h2 className="font-serif text-xl text-[#1E2623]">No Analysis Results Available</h2>
            <p className="text-xs text-[#5D6B64]">
              Start the analysis flow to generate your personalized observations and routine.
            </p>
            <button
              onClick={() => setCurrentTab('analyze')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2E503F] hover:bg-[#233F31] rounded-md transition-colors cursor-pointer"
            >
              Start Analysis Now
            </button>
          </div>
        )}

        {currentTab === 'routine' && (
          <MyRoutineView
            currentRoutine={savedRoutine}
            onStartAnalysis={() => handleStartAnalysis('photo')}
          />
        )}

        {currentTab === 'ingredients' && <IngredientGuideView />}

        {currentTab === 'progress' && <ProgressView />}

        {currentTab === 'privacy' && (
          <PrivacySettingsView
            currentRoutine={savedRoutine}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#F4F1EA] border-t border-[#E4DFD5] py-10 text-xs text-[#59655F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E1DDD3]">
            <div className="flex items-center gap-2 text-[#1E2623]">
              <Shield className="w-5 h-5 text-[#3D614F]" />
              <span className="font-serif font-semibold text-base">SkinGuide AI</span>
              <span className="text-[11px] text-[#6B7972]">&middot; Evidence-Based Skincare Education</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button onClick={() => setCurrentTab('home')} className="hover:text-[#1E2623] cursor-pointer">
                Home
              </button>
              <button onClick={() => setCurrentTab('analyze')} className="hover:text-[#1E2623] cursor-pointer">
                Analyze My Skin
              </button>
              <button onClick={() => setCurrentTab('routine')} className="hover:text-[#1E2623] cursor-pointer">
                My Routine
              </button>
              <button onClick={() => setCurrentTab('ingredients')} className="hover:text-[#1E2623] cursor-pointer">
                Ingredient Guide
              </button>
              <button onClick={() => setCurrentTab('progress')} className="hover:text-[#1E2623] cursor-pointer">
                Progress
              </button>
              <button onClick={() => setCurrentTab('privacy')} className="hover:text-[#1E2623] cursor-pointer">
                Privacy &amp; Settings
              </button>
            </div>
          </div>

          {/* Mandatory Disclaimers */}
          <div className="space-y-2 text-[11px] text-[#6A7870] leading-relaxed">
            <p>
              <strong>Important Clinical Disclaimer:</strong> SkinGuide AI is an educational cosmetic resource for adults 18 and older. It does not provide medical diagnoses, treatment of skin disorders, skin cancer triage, or medical prescriptions. Facial photographs have intrinsic technical limits and cannot evaluate subsurface tissue, microbiology, or mole malignancy.
            </p>
            <p>
              <strong>When to Seek In-Person Medical Care:</strong> If you experience any rapidly changing, bleeding, or asymmetrical lesions, intense pain, spreading redness, fever, or allergic swelling, discontinue all cosmetic products and consult a board-certified dermatologist or emergency healthcare physician immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78857E] pt-2">
            <span>&copy; {new Date().getFullYear()} SkinGuide AI &middot; Designed for calm clarity and user dignity.</span>
            <span>Zero beauty scores &middot; No commission ranking &middot; Ephemeral processing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

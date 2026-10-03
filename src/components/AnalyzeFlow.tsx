import React, { useState, useRef } from 'react';
import { ShieldCheck, Camera, Upload, AlertCircle, Trash2, ArrowRight, ArrowLeft, CheckCircle2, RefreshCw, X, FileText, AlertTriangle } from 'lucide-react';
import { QuestionnaireData, PhotoData, AnalysisResult } from '../types/skincare';

interface AnalyzeFlowProps {
  initialMode?: 'photo' | 'questionnaire_only';
  onAnalysisComplete: (result: AnalysisResult) => void;
  onCancel: () => void;
}

export const AnalyzeFlow: React.FC<AnalyzeFlowProps> = ({ initialMode = 'photo', onAnalysisComplete, onCancel }) => {
  const [step, setStep] = useState<number>(1); // 1: Consent & Age, 2: Questionnaire, 3: Photos (if opted-in), 4: Review & Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [isAdult, setIsAdult] = useState(false);
  const [hasConsentedToAI, setHasConsentedToAI] = useState(false);
  const [wantsPhotoAnalysis, setWantsPhotoAnalysis] = useState(initialMode !== 'questionnaire_only');

  const [questionnaire, setQuestionnaire] = useState<QuestionnaireData>({
    isAdult: false,
    mainConcerns: [],
    skinType: 'balanced',
    sensitivity: 'none',
    allergiesAndReactions: '',
    currentProducts: [
      { name: '', activeIngredients: '', frequency: 'daily' }
    ],
    prescriptionTreatments: '',
    diagnosedConditions: '',
    concernDuration: '1-6 months',
    symptoms: [],
    recentProcedures: '',
    pregnancyStatus: 'none',
    budget: 'any',
    country: 'US',
    wantsPhotoAnalysis: initialMode !== 'questionnaire_only'
  });

  const [photos, setPhotos] = useState<PhotoData>({
    front: undefined,
    left: undefined,
    right: undefined
  });

  const [photoValidationFeedback, setPhotoValidationFeedback] = useState<{
    front?: { acceptable: boolean; message: string };
    left?: { acceptable: boolean; message: string };
    right?: { acceptable: boolean; message: string };
  }>({});

  const fileInputRefFront = useRef<HTMLInputElement>(null);
  const fileInputRefLeft = useRef<HTMLInputElement>(null);
  const fileInputRefRight = useRef<HTMLInputElement>(null);

  // Handle concern toggles
  const toggleConcern = (concern: string) => {
    setQuestionnaire((prev) => {
      const exists = prev.mainConcerns.includes(concern);
      return {
        ...prev,
        mainConcerns: exists
          ? prev.mainConcerns.filter((c) => c !== concern)
          : [...prev.mainConcerns, concern]
      };
    });
  };

  // Handle symptom toggles
  const toggleSymptom = (sym: string) => {
    setQuestionnaire((prev) => {
      const exists = prev.symptoms.includes(sym);
      return {
        ...prev,
        symptoms: exists
          ? prev.symptoms.filter((s) => s !== sym)
          : [...prev.symptoms, sym]
      };
    });
  };

  // Add/remove current product lines
  const handleProductChange = (index: number, field: string, value: string) => {
    setQuestionnaire((prev) => {
      const updated = [...prev.currentProducts];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, currentProducts: updated };
    });
  };

  const addProductRow = () => {
    setQuestionnaire((prev) => ({
      ...prev,
      currentProducts: [...prev.currentProducts, { name: '', activeIngredients: '', frequency: 'daily' }]
    }));
  };

  const removeProductRow = (index: number) => {
    setQuestionnaire((prev) => ({
      ...prev,
      currentProducts: prev.currentProducts.filter((_, i) => i !== index)
    }));
  };

  // File Upload Handler with client validation
  const handleFileUpload = (angle: 'front' | 'left' | 'right', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setPhotoValidationFeedback((prev) => ({
        ...prev,
        [angle]: { acceptable: false, message: 'File exceeds 10MB limit. Please upload a smaller image.' }
      }));
      return;
    }

    // Validate format
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(file.type)) {
      setPhotoValidationFeedback((prev) => ({
        ...prev,
        [angle]: { acceptable: false, message: 'Only JPEG, PNG, or WebP formats are supported.' }
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPhotos((prev) => ({ ...prev, [angle]: base64 }));
      setPhotoValidationFeedback((prev) => ({
        ...prev,
        [angle]: { acceptable: true, message: 'Image loaded in memory. Ready for focal quality check.' }
      }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (angle: 'front' | 'left' | 'right') => {
    setPhotos((prev) => ({ ...prev, [angle]: undefined }));
    setPhotoValidationFeedback((prev) => ({
      ...prev,
      [angle]: undefined
    }));
  };

  // Immediate deletion of all photos
  const clearAllPhotos = () => {
    setPhotos({ front: undefined, left: undefined, right: undefined });
    setPhotoValidationFeedback({});
  };

  // Submit to backend
  const handleSubmitAnalysis = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        questionnaire: {
          ...questionnaire,
          isAdult,
          wantsPhotoAnalysis
        },
        photos: wantsPhotoAnalysis ? photos : undefined
      };

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      onAnalysisComplete(data);
    } catch (err: any) {
      console.error('Analysis submission failed:', err);
      setSubmitError(err?.message || 'Failed to connect to analysis server. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Warning check for emergency symptoms
  const hasEmergencySymptom = questionnaire.symptoms.includes('breathing_difficulty') || 
    (questionnaire.symptoms.includes('swelling') && questionnaire.allergiesAndReactions.toLowerCase().includes('swelling'));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-[#5C6761] mb-2">
          <span className={step >= 1 ? 'text-[#244535] font-semibold' : ''}>01. Consent & Age</span>
          <span aria-hidden="true">&rarr;</span>
          <span className={step >= 2 ? 'text-[#244535] font-semibold' : ''}>02. Questionnaire</span>
          {wantsPhotoAnalysis && (
            <>
              <span aria-hidden="true">&rarr;</span>
              <span className={step >= 3 ? 'text-[#244535] font-semibold' : ''}>03. Photos</span>
            </>
          )}
          <span aria-hidden="true">&rarr;</span>
          <span className={step === (wantsPhotoAnalysis ? 4 : 3) ? 'text-[#244535] font-semibold' : ''}>Review & Submit</span>
        </div>
        <div className="w-full bg-[#E8E5DD] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#385B4B] h-full transition-all duration-300 rounded-full"
            style={{
              width: `${(step / (wantsPhotoAnalysis ? 4 : 3)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* STEP 1: Consent & Age Verification */}
      {step === 1 && (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block mb-1">Step 01 of {wantsPhotoAnalysis ? '04' : '03'}</span>
            <h2 className="font-serif text-2xl text-[#1E2623] font-medium">Age Verification & AI Consent</h2>
            <p className="text-xs sm:text-sm text-[#5C6761] mt-1 leading-relaxed">
              SkinGuide AI provides cosmetic skincare education for adults. Please review how your information is handled.
            </p>
          </div>

          {/* Adult 18+ Confirmation */}
          <div className="p-4 bg-[#F5F2EA] border border-[#DDD8CD] rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAdult}
                onChange={(e) => {
                  setIsAdult(e.target.checked);
                  setQuestionnaire((q) => ({ ...q, isAdult: e.target.checked }));
                }}
                className="mt-1 w-4 h-4 text-[#355A48] rounded-sm focus:ring-[#355A48] cursor-pointer"
              />
              <div>
                <span className="text-sm font-semibold text-[#1E2623] block">
                  I confirm that I am 18 years of age or older.
                </span>
                <span className="text-xs text-[#5C6761] block mt-0.5">
                  This educational tool is strictly formulated for adult skin physiology and barrier maturity.
                </span>
              </div>
            </label>
          </div>

          {/* AI Processing and Privacy Disclosure */}
          <div className="p-4 bg-[#FAF9F6] border border-[#DFDAD0] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-[#244535]">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="text-sm font-semibold">AI Provider & Data Retention Disclosures</h3>
            </div>
            <div className="text-xs text-[#525E57] space-y-2 leading-relaxed">
              <p>
                <strong>AI Provider:</strong> SkinGuide AI utilizes Google Gemini multimodal models running on secure backend servers.
              </p>
              <p>
                <strong>Retention & Deletion:</strong> Any photos you choose to upload are processed ephemerally in server memory to generate observations and are deleted immediately after the response is produced. No photos are written to persistent disks or stored in browser localStorage.
              </p>
              <p>
                <strong>Biometric Boundaries:</strong> The AI does not perform facial recognition, match faces across users, or infer ethnicity, gender, or sensitive identity traits.
              </p>
              <p>
                <strong>Cosmetic Scope:</strong> SkinGuide AI provides educational skincare observations and gentle routine guidance. It does not diagnose skin conditions (such as melanoma, rosacea, or infections) or prescribe medications.
              </p>
            </div>

            <label className="flex items-start gap-3 pt-2 border-t border-[#E6E1D7] cursor-pointer">
              <input
                type="checkbox"
                checked={hasConsentedToAI}
                onChange={(e) => setHasConsentedToAI(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#355A48] rounded-sm focus:ring-[#355A48] cursor-pointer"
              />
              <span className="text-xs font-medium text-[#202924]">
                I consent to AI-powered cosmetic photo and questionnaire processing as described above.
              </span>
            </label>
          </div>

          {/* Photo vs Questionnaire-only Mode Selector */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-[#242E28] block mb-2">Choose your preferred experience:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setWantsPhotoAnalysis(true);
                  setQuestionnaire((q) => ({ ...q, wantsPhotoAnalysis: true }));
                }}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                  wantsPhotoAnalysis
                    ? 'border-[#3D6351] bg-[#EFF5F1]'
                    : 'border-[#DDD8CD] bg-[#FAF9F6] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="flex items-center gap-2 font-medium text-sm text-[#1A231F]">
                  <Camera className="w-4 h-4 text-[#3D6351]" />
                  <span>Photos + Questionnaire</span>
                </div>
                <p className="text-xs text-[#5A6660] mt-1">
                  Upload facial photos for visible surface observations alongside routine guidance.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setWantsPhotoAnalysis(false);
                  setQuestionnaire((q) => ({ ...q, wantsPhotoAnalysis: false }));
                  clearAllPhotos();
                }}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                  !wantsPhotoAnalysis
                    ? 'border-[#3D6351] bg-[#EFF5F1]'
                    : 'border-[#DDD8CD] bg-[#FAF9F6] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="flex items-center gap-2 font-medium text-sm text-[#1A231F]">
                  <FileText className="w-4 h-4 text-[#3D6351]" />
                  <span>Questionnaire Only</span>
                </div>
                <p className="text-xs text-[#5A6660] mt-1">
                  Skip photos entirely. Build your personalized routine using health answers only.
                </p>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#EAE6DD]">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium text-[#5B6760] hover:text-[#1F2723]"
            >
              Cancel
            </button>
            <button
              disabled={!isAdult || !hasConsentedToAI}
              onClick={() => setStep(2)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#305342] hover:bg-[#254234] disabled:bg-[#BAC6BF] rounded-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Continue to Questionnaire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Questionnaire */}
      {step === 2 && (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block mb-1">
              Step 02 of {wantsPhotoAnalysis ? '04' : '03'}
            </span>
            <h2 className="font-serif text-2xl text-[#1E2623] font-medium">Skin Health & History Questionnaire</h2>
            <p className="text-xs sm:text-sm text-[#5C6761] mt-1">
              We never assume skin type from photo shine or texture alone. Your answers establish critical baseline safety.
            </p>
          </div>

          {/* Emergency Alert Banner if Emergency symptoms flagged */}
          {hasEmergencySymptom && (
            <div className="p-4 bg-[#FDF2F2] border border-[#F87171] rounded-lg text-[#991B1B] text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                <span>Urgent Medical Symptom Notice</span>
              </div>
              <p>
                You indicated symptoms that may involve acute respiratory difficulty or sudden facial/oral swelling. Please seek emergency medical assistance immediately (call 911 in the US or your local emergency service). Do not initiate new skincare products.
              </p>
            </div>
          )}

          {/* Main Concerns */}
          <div>
            <label className="text-sm font-semibold text-[#1F2723] block mb-1">
              1. What are your main visible concerns and skincare goals?
            </label>
            <span className="text-xs text-[#5D6963] block mb-3">Select all that apply:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'blemishes_acne_like', label: 'Blemishes that may resemble acne' },
                { id: 'dark_spots', label: 'Visible dark spots & post-blemish marks' },
                { id: 'redness', label: 'Visible surface redness or flushing' },
                { id: 'dryness_flaking', label: 'Dryness or flaky areas' },
                { id: 'uneven_texture', label: 'Uneven surface texture or enlarged pores' },
                { id: 'dullness', label: 'Dullness or uneven tone' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleConcern(item.id)}
                  className={`p-3 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer ${
                    questionnaire.mainConcerns.includes(item.id)
                      ? 'border-[#3D6351] bg-[#EDF4F0] text-[#1E392C]'
                      : 'border-[#DDD8CD] bg-[#FAF9F6] text-[#47544E] hover:bg-[#F4F1EA]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${
                      questionnaire.mainConcerns.includes(item.id) ? 'bg-[#355A47] border-[#355A47] text-white' : 'border-[#9CA9A1]'
                    }`}>
                      {questionnaire.mainConcerns.includes(item.id) && '✓'}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Self-Reported Skin Type */}
          <div>
            <label className="text-sm font-semibold text-[#1F2723] block mb-1">
              2. Self-reported skin type
            </label>
            <p className="text-xs text-[#5D6963] mb-3">
              Visible shine does not always mean oily skin (dehydration can cause shine), so we confirm your baseline directly:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'dry', label: 'Dry', sub: 'Tight, flaky' },
                { id: 'oily', label: 'Oily', sub: 'Consistent shine' },
                { id: 'combination', label: 'Combination', sub: 'Oily T-zone' },
                { id: 'balanced', label: 'Balanced', sub: 'Comfortable' },
                { id: 'unsure', label: 'Unsure', sub: 'Start basic' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setQuestionnaire((q) => ({ ...q, skinType: t.id as any }))}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    questionnaire.skinType === t.id
                      ? 'border-[#3D6351] bg-[#EDF4F0] text-[#1E392C]'
                      : 'border-[#DDD8CD] bg-[#FAF9F6] text-[#47544E] hover:bg-[#F4F1EA]'
                  }`}
                >
                  <div className="text-xs font-semibold">{t.label}</div>
                  <div className="text-[10px] text-[#69766F] mt-0.5">{t.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sensitivity & Past Reactions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1F2723] block mb-1.5">
                3. Overall skin sensitivity level
              </label>
              <select
                value={questionnaire.sensitivity}
                onChange={(e) => setQuestionnaire((q) => ({ ...q, sensitivity: e.target.value as any }))}
                className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white focus:ring-1 focus:ring-[#3D6351]"
              >
                <option value="none">Resilient / Rarely reacts</option>
                <option value="mild">Mild (occasional stinging with fragrances)</option>
                <option value="moderate">Moderate (frequent redness with new products)</option>
                <option value="high">High (very reactive / easily compromised)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2723] block mb-1.5">
                4. Duration of this skin concern
              </label>
              <select
                value={questionnaire.concernDuration}
                onChange={(e) => setQuestionnaire((q) => ({ ...q, concernDuration: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white focus:ring-1 focus:ring-[#3D6351]"
              >
                <option value="< 1 month">Less than 1 month (recent onset)</option>
                <option value="1-6 months">1 to 6 months</option>
                <option value="6-12 months">6 to 12 months</option>
                <option value="> 1 year">More than 1 year (chronic)</option>
              </select>
            </div>
          </div>

          {/* Allergies / Past Reactions Free Text */}
          <div>
            <label className="text-xs font-semibold text-[#1F2723] block mb-1">
              5. Known allergies or previous adverse product reactions
            </label>
            <input
              type="text"
              value={questionnaire.allergiesAndReactions}
              onChange={(e) => setQuestionnaire((q) => ({ ...q, allergiesAndReactions: e.target.value }))}
              placeholder="e.g., Stings with benzoyl peroxide, allergic to fragrance/essential oils, reaction to retinol..."
              className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white focus:ring-1 focus:ring-[#3D6351]"
            />
          </div>

          {/* Current Skincare Products & Frequency */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#1F2723] block">
                6. Current products and active ingredients in use
              </label>
              <button
                type="button"
                onClick={addProductRow}
                className="text-xs font-medium text-[#2E5240] hover:underline"
              >
                + Add another product
              </button>
            </div>
            <span className="text-[11px] text-[#63706A] block mb-2">
              Sharing active ingredients prevents dangerous duplicate acid layering.
            </span>

            <div className="space-y-2">
              {questionnaire.currentProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prod.name}
                    onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                    placeholder="Product name or brand"
                    className="flex-1 text-xs p-2 rounded-md border border-[#D5D0C6] bg-white"
                  />
                  <input
                    type="text"
                    value={prod.activeIngredients}
                    onChange={(e) => handleProductChange(idx, 'activeIngredients', e.target.value)}
                    placeholder="Actives (e.g., Niacinamide, Salicylic, Vitamin C)"
                    className="flex-1 text-xs p-2 rounded-md border border-[#D5D0C6] bg-white"
                  />
                  <select
                    value={prod.frequency}
                    onChange={(e) => handleProductChange(idx, 'frequency', e.target.value)}
                    className="w-28 text-xs p-2 rounded-md border border-[#D5D0C6] bg-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="2-3x per week">2-3x/week</option>
                    <option value="weekly">Weekly</option>
                    <option value="occasional">Occasionally</option>
                  </select>
                  {questionnaire.currentProducts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProductRow(idx)}
                      className="p-1.5 text-[#9C4E3D] hover:bg-[#F8EAE7] rounded-md"
                      aria-label="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Voluntary Medical Context */}
          <div className="p-4 bg-[#F7F5EE] border border-[#DDD8CC] rounded-lg space-y-3">
            <span className="text-xs font-semibold text-[#27332D] block">
              7. Voluntary Medical Context (Optional)
            </span>
            <p className="text-[11px] text-[#5A6761] leading-relaxed">
              If currently under the care of a doctor, providing this ensures we do not recommend conflicting cosmetic ingredients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#3E4A44] block mb-1">
                  Current Prescription Skin Treatments:
                </label>
                <input
                  type="text"
                  value={questionnaire.prescriptionTreatments}
                  onChange={(e) => setQuestionnaire((q) => ({ ...q, prescriptionTreatments: e.target.value }))}
                  placeholder="e.g., Tretinoin 0.05%, Clindamycin, Spironolactone, None"
                  className="w-full text-xs p-2 rounded-md border border-[#D5D0C6] bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#3E4A44] block mb-1">
                  Clinician-Diagnosed Skin Conditions:
                </label>
                <input
                  type="text"
                  value={questionnaire.diagnosedConditions}
                  onChange={(e) => setQuestionnaire((q) => ({ ...q, diagnosedConditions: e.target.value }))}
                  placeholder="e.g., Eczema, Rosacea, Psoriasis, None"
                  className="w-full text-xs p-2 rounded-md border border-[#D5D0C6] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Critical Symptoms Checklist */}
          <div>
            <label className="text-sm font-semibold text-[#1F2723] block mb-1">
              8. Are you experiencing any of these specific symptoms?
            </label>
            <span className="text-xs text-[#5D6963] block mb-3">
              Certain symptoms signify conditions requiring prompt physician assessment:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'itching', label: 'Itching' },
                { id: 'burning', label: 'Active burning sensation' },
                { id: 'pain', label: 'Significant pain or tenderness' },
                { id: 'bleeding', label: 'Bleeding or oozing spots' },
                { id: 'rapid_change', label: 'Rapidly changing spot/lesion' },
                { id: 'swelling', label: 'Noticeable swelling' },
                { id: 'breathing_difficulty', label: 'Breathing difficulty (Emergency)' },
                { id: 'eye_involvement', label: 'Rash near eyes or eyelids' },
              ].map((sym) => (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => toggleSymptom(sym.id)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    questionnaire.symptoms.includes(sym.id)
                      ? sym.id === 'breathing_difficulty' || sym.id === 'bleeding'
                        ? 'border-[#DC2626] bg-[#FEF2F2] text-[#991B1B] font-semibold'
                        : 'border-[#3D6351] bg-[#EDF4F0] text-[#1E392C] font-semibold'
                      : 'border-[#DDD8CD] bg-[#FAF9F6] text-[#47544E] hover:bg-[#F4F1EA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                      questionnaire.symptoms.includes(sym.id) ? 'bg-[#355A47] border-[#355A47] text-white' : 'border-[#9CA9A1]'
                    }`}>
                      {questionnaire.symptoms.includes(sym.id) && '✓'}
                    </span>
                    <span className="truncate">{sym.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Procedures, Sunburn, or Chemical Peels */}
          <div>
            <label className="text-xs font-semibold text-[#1F2723] block mb-1">
              9. Recent procedures, sunburn, or clinical peels in the last 4 weeks
            </label>
            <input
              type="text"
              value={questionnaire.recentProcedures}
              onChange={(e) => setQuestionnaire((q) => ({ ...q, recentProcedures: e.target.value }))}
              placeholder="e.g., None, had a medium chemical peel 10 days ago, mild sunburn over the weekend..."
              className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white"
            />
          </div>

          {/* Pregnancy / Trying / Nursing Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1F2723] block mb-1">
                10. Pregnancy / Nursing status
              </label>
              <span className="text-[10px] text-[#626F68] block mb-1.5">
                Certain ingredients (e.g. retinoids) are strictly avoided.
              </span>
              <select
                value={questionnaire.pregnancyStatus}
                onChange={(e) => setQuestionnaire((q) => ({ ...q, pregnancyStatus: e.target.value as any }))}
                className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white"
              >
                <option value="none">Not applicable / Neither</option>
                <option value="pregnant">Currently pregnant</option>
                <option value="trying">Trying to conceive</option>
                <option value="breastfeeding">Currently breastfeeding</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2723] block mb-1">
                11. Budget preference
              </label>
              <span className="text-[10px] text-[#626F68] block mb-1.5">
                For optional verified product ideas.
              </span>
              <select
                value={questionnaire.budget}
                onChange={(e) => setQuestionnaire((q) => ({ ...q, budget: e.target.value as any }))}
                className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white"
              >
                <option value="any">Any / Category-focused</option>
                <option value="budget">Budget-conscious (&lt; $20)</option>
                <option value="mid">Mid-range ($20 - $45)</option>
                <option value="premium">Premium ($45+)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2723] block mb-1">
                12. Country / Region
              </label>
              <span className="text-[10px] text-[#626F68] block mb-1.5">
                For verified regional cosmetic availability.
              </span>
              <select
                value={questionnaire.country}
                onChange={(e) => setQuestionnaire((q) => ({ ...q, country: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-md border border-[#D5D0C6] bg-white"
              >
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="EU">European Union</option>
                <option value="Global">Other / Global</option>
              </select>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-[#EAE6DD]">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-medium text-[#58645E] hover:text-[#1E2623] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => {
                if (wantsPhotoAnalysis) {
                  setStep(3);
                } else {
                  setStep(3); // In questionnaire-only, step 3 is review & submit
                }
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#305342] hover:bg-[#254234] rounded-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{wantsPhotoAnalysis ? 'Next: Photo Upload' : 'Next: Review & Submit'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 (If Photo opted-in): Photo Capture & Upload */}
      {step === 3 && wantsPhotoAnalysis && (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block mb-1">
              Step 03 of 04
            </span>
            <h2 className="font-serif text-2xl text-[#1E2623] font-medium">Facial Photo Upload</h2>
            <p className="text-xs sm:text-sm text-[#5C6761] mt-1 leading-relaxed">
              One front-facing photo is sufficient to begin. Left and right profile angles help assess side blemish or pigment distribution.
            </p>
          </div>

          {/* Capture Guidelines Box */}
          <div className="p-4 bg-[#F4F1EA] border border-[#DDD8CD] rounded-lg">
            <h3 className="text-xs font-semibold text-[#202B25] uppercase tracking-wider mb-2">
              Photo Capture Guidelines
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#505D56]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6150] shrink-0 mt-0.5" />
                <span><strong>Even Natural Light:</strong> Face a window; avoid harsh backlighting or heavy flash.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6150] shrink-0 mt-0.5" />
                <span><strong>No Filters or Heavy Makeup:</strong> Digital smoothing obscures genuine surface texture.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6150] shrink-0 mt-0.5" />
                <span><strong>In Focus:</strong> Keep the camera still at eye level to prevent motion blur.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6150] shrink-0 mt-0.5" />
                <span><strong>Consistent Distance:</strong> Frame head and neck comfortably for reliable future checks.</span>
              </li>
            </ul>
          </div>

          {/* Photo Upload Slots: Front, Left, Right */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Front Photo */}
            <div className="border border-[#DED9CF] rounded-lg p-4 bg-[#FDFCFA] text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1F2723] block">Front View *</span>
                <span className="text-[10px] text-[#69766F] block mb-3">Primary analysis view</span>

                {photos.front ? (
                  <div className="relative aspect-4/5 rounded-md overflow-hidden bg-[#ECE8DF] border border-[#DDD8CE] mb-3">
                    <img src={photos.front} alt="Front face preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto('front')}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="Delete front photo"
                      aria-label="Delete front photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefFront.current?.click()}
                    className="aspect-4/5 rounded-md border-2 border-dashed border-[#D2CCBF] hover:border-[#3D6351] bg-[#FAF8F4] flex flex-col items-center justify-center p-4 cursor-pointer transition-colors mb-3"
                  >
                    <Upload className="w-6 h-6 text-[#6B7971] mb-2" />
                    <span className="text-xs font-medium text-[#294B3C]">Upload Front Photo</span>
                    <span className="text-[10px] text-[#7A8780] mt-1">JPEG, PNG, WebP &le; 10MB</span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRefFront}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileUpload('front', e)}
              />

              {photoValidationFeedback.front && (
                <div className={`text-[10px] p-1.5 rounded-sm ${photoValidationFeedback.front.acceptable ? 'bg-[#EDF5F0] text-[#28503E]' : 'bg-[#FDF2F2] text-[#991B1B]'}`}>
                  {photoValidationFeedback.front.message}
                </div>
              )}
            </div>

            {/* Left Profile */}
            <div className="border border-[#DED9CF] rounded-lg p-4 bg-[#FDFCFA] text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1F2723] block">Left Profile</span>
                <span className="text-[10px] text-[#69766F] block mb-3">Optional side angle</span>

                {photos.left ? (
                  <div className="relative aspect-4/5 rounded-md overflow-hidden bg-[#ECE8DF] border border-[#DDD8CE] mb-3">
                    <img src={photos.left} alt="Left face preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto('left')}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="Delete left photo"
                      aria-label="Delete left photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefLeft.current?.click()}
                    className="aspect-4/5 rounded-md border-2 border-dashed border-[#D2CCBF] hover:border-[#3D6351] bg-[#FAF8F4] flex flex-col items-center justify-center p-4 cursor-pointer transition-colors mb-3"
                  >
                    <Upload className="w-6 h-6 text-[#6B7971] mb-2" />
                    <span className="text-xs font-medium text-[#294B3C]">Upload Left Angle</span>
                    <span className="text-[10px] text-[#7A8780] mt-1">Optional</span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRefLeft}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileUpload('left', e)}
              />
            </div>

            {/* Right Profile */}
            <div className="border border-[#DED9CF] rounded-lg p-4 bg-[#FDFCFA] text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1F2723] block">Right Profile</span>
                <span className="text-[10px] text-[#69766F] block mb-3">Optional side angle</span>

                {photos.right ? (
                  <div className="relative aspect-4/5 rounded-md overflow-hidden bg-[#ECE8DF] border border-[#DDD8CE] mb-3">
                    <img src={photos.right} alt="Right face preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto('right')}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="Delete right photo"
                      aria-label="Delete right photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefRight.current?.click()}
                    className="aspect-4/5 rounded-md border-2 border-dashed border-[#D2CCBF] hover:border-[#3D6351] bg-[#FAF8F4] flex flex-col items-center justify-center p-4 cursor-pointer transition-colors mb-3"
                  >
                    <Upload className="w-6 h-6 text-[#6B7971] mb-2" />
                    <span className="text-xs font-medium text-[#294B3C]">Upload Right Angle</span>
                    <span className="text-[10px] text-[#7A8780] mt-1">Optional</span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRefRight}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileUpload('right', e)}
              />
            </div>
          </div>

          {/* Privacy & Photo Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#FAF8F3] border border-[#E3DFC] rounded-lg text-xs text-[#55635C]">
            <span>Photos are held in temporary memory and flushed once analysis finishes.</span>
            {(photos.front || photos.left || photos.right) && (
              <button
                type="button"
                onClick={clearAllPhotos}
                className="text-xs text-[#9C4E3D] hover:underline font-medium shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove All Photos</span>
              </button>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-[#EAE6DD]">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-medium text-[#58645E] hover:text-[#1E2623] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Questionnaire</span>
            </button>
            <button
              disabled={!photos.front}
              onClick={() => setStep(4)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#305342] hover:bg-[#254234] disabled:bg-[#BAC6BF] rounded-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 (or STEP 3 in Questionnaire-Only): Final Review & Submit */}
      {((step === 4 && wantsPhotoAnalysis) || (step === 3 && !wantsPhotoAnalysis)) && (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block mb-1">
              Final Step
            </span>
            <h2 className="font-serif text-2xl text-[#1E2623] font-medium">Review & Confirm Analysis</h2>
            <p className="text-xs sm:text-sm text-[#5C6761] mt-1">
              Confirm your details before our secure Gemini analysis engine evaluates your visible concerns.
            </p>
          </div>

          <div className="p-4 bg-[#F6F4ED] border border-[#DDD8CD] rounded-lg space-y-3 text-xs text-[#4A5750]">
            <div>
              <strong className="text-[#1E2623] block">Mode:</strong>
              <span>{wantsPhotoAnalysis ? 'Multimodal Facial Photo + Questionnaire Analysis' : 'Questionnaire-Only Skincare Analysis'}</span>
            </div>
            <div>
              <strong className="text-[#1E2623] block">Reported Concerns:</strong>
              <span>{questionnaire.mainConcerns.length > 0 ? questionnaire.mainConcerns.join(', ') : 'General skin barrier balance'}</span>
            </div>
            <div>
              <strong className="text-[#1E2623] block">Skin Type & Sensitivity:</strong>
              <span>{questionnaire.skinType} skin &middot; {questionnaire.sensitivity} sensitivity</span>
            </div>
            {questionnaire.prescriptionTreatments && (
              <div>
                <strong className="text-[#1E2623] block">Active Prescriptions:</strong>
                <span>{questionnaire.prescriptionTreatments}</span>
              </div>
            )}
            {wantsPhotoAnalysis && (
              <div>
                <strong className="text-[#1E2623] block">Photos attached:</strong>
                <span>
                  Front {photos.front ? '✓' : '✗'}, Left {photos.left ? '✓' : '✗'}, Right {photos.right ? '✓' : '✗'}
                </span>
              </div>
            )}
          </div>

          {submitError && (
            <div className="p-3 bg-[#FDF2F2] border border-[#FCA5A5] rounded-md text-xs text-[#991B1B]">
              <strong>Submission Error:</strong> {submitError}
            </div>
          )}

          <div className="p-3 bg-[#FAF8F3] border border-[#E3DFC] rounded-lg text-xs text-[#525F58]">
            <p>
              By proceeding, your inputs will be analyzed according to verified cosmetic skincare guidelines. Photos will be deleted immediately from server memory following completion.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-[#EAE6DD]">
            <button
              onClick={() => setStep(wantsPhotoAnalysis ? 3 : 2)}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-medium text-[#58645E] hover:text-[#1E2623] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={handleSubmitAnalysis}
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#2E4F3E] hover:bg-[#233F31] disabled:bg-[#A9B8AF] rounded-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Cautiously...</span>
                </>
              ) : (
                <>
                  <span>Generate My Skincare Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

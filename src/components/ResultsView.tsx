import React, { useState } from 'react';
import { AnalysisResult, RoutineStep } from '../types/skincare';
import { AlertCircle, ShieldAlert, CheckCircle2, Info, Sun, Moon, Sparkles, BookOpen, Trash2, ArrowLeft, BookmarkCheck, ExternalLink, Activity } from 'lucide-react';
import { CATEGORY_RECOMMENDATIONS, VERIFIED_PRODUCT_CATALOG } from '../data/productCatalog';

interface ResultsViewProps {
  result: AnalysisResult;
  onEditAnswers: () => void;
  onSaveToRoutine: (routine: { morning: RoutineStep[]; evening: RoutineStep[] }) => void;
  onDeletePhotos: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onEditAnswers,
  onSaveToRoutine,
  onDeletePhotos
}) => {
  const [photosDeleted, setPhotosDeleted] = useState(false);
  const [routineSaved, setRoutineSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'routine' | 'observations' | 'ingredients' | 'professional' | 'sources'>('routine');

  const handleDelete = () => {
    onDeletePhotos();
    setPhotosDeleted(true);
  };

  const handleSave = () => {
    onSaveToRoutine(result.routine);
    setRoutineSaved(true);
  };

  // Check for high-severity safety flags
  const emergencyFlags = result.safety_flags.filter((f) => f.severity === 'emergency');
  const clinicalFlags = result.safety_flags.filter((f) => f.severity === 'urgent_dermatology');
  const cautionFlags = result.safety_flags.filter((f) => f.severity === 'caution' || f.severity === 'adverse_reaction');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Emergency Interruption Banner */}
      {emergencyFlags.length > 0 && (
        <div className="p-5 bg-[#FDF2F2] border-2 border-[#DC2626] rounded-xl text-[#991B1B] space-y-2">
          <div className="flex items-center gap-2 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
            <span>URGENT MEDICAL EMERGENCY NOTICE</span>
          </div>
          {emergencyFlags.map((flag, idx) => (
            <p key={idx} className="text-xs sm:text-sm leading-relaxed font-medium">
              {flag.guidance}
            </p>
          ))}
          <p className="text-xs pt-1 border-t border-[#F87171] font-semibold">
            All cosmetic skincare routines are suspended. Call 911 or visit your nearest emergency care facility.
          </p>
        </div>
      )}

      {/* Urgent Dermatology Assessment Banner */}
      {clinicalFlags.length > 0 && (
        <div className="p-4 bg-[#FFFBEB] border border-[#F59E0B] rounded-xl text-[#92400E] space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-[#D97706]" />
            <span>In-Person Dermatology Consultation Strongly Recommended</span>
          </div>
          {clinicalFlags.map((flag, idx) => (
            <p key={idx} className="text-xs leading-relaxed text-[#78350F]">
              {flag.guidance}
            </p>
          ))}
        </div>
      )}

      {/* Demo Mode Notice */}
      {result.is_demo_mode && (
        <div className="p-3 bg-[#EBF3EF] border border-[#CBDED3] rounded-lg text-xs text-[#244737] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#355A48] shrink-0" />
            <span>
              <strong>Demo Mode:</strong> Displaying synthetic educational profile data. No real personal photos were retained or stored.
            </span>
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DD]">
          <div>
            <div className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider mb-1">
              Analysis Results & Education
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1E2623] font-medium">
              Personalized Skincare Guidance
            </h1>
            <p className="text-xs text-[#63706A] mt-1">
              Generated on {new Date(result.analyzed_at).toLocaleDateString()} &middot; Cosmetic Skincare Education
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEditAnswers}
              className="px-3.5 py-2 text-xs font-medium text-[#48554F] bg-[#EFECE5] hover:bg-[#E5E0D7] rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Answers</span>
            </button>

            <button
              onClick={handleDelete}
              disabled={photosDeleted}
              className="px-3.5 py-2 text-xs font-medium text-[#9C4B3C] bg-[#FBF0EE] hover:bg-[#F6E3E0] disabled:bg-[#F2ECEB] disabled:text-[#A89895] rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{photosDeleted ? 'Photos Flushed' : 'Delete Uploaded Photos'}</span>
            </button>
          </div>
        </div>

        {/* Photo Quality Status */}
        <div className="mt-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg">
            <span className="font-semibold text-[#202B25] block mb-1">Photo Assessment Quality</span>
            <div className="text-[#4E5C55] space-y-1">
              <div>
                Status: <strong className="text-[#202B25] capitalize">{result.image_quality.replace('_', ' ')}</strong>
              </div>
              {result.image_quality_reasons.map((r, i) => (
                <div key={i} className="text-[11px] text-[#637069]">&bull; {r}</div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg">
            <span className="font-semibold text-[#202B25] block mb-1">User-Reported Context</span>
            <p className="text-[11px] text-[#4E5C55] leading-relaxed">
              {result.user_reported_context}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#EBE7DF] rounded-lg overflow-x-auto">
        {[
          { id: 'routine', label: 'My Personalized Routine' },
          { id: 'observations', label: 'Visible Observations' },
          { id: 'ingredients', label: 'Ingredient Options' },
          { id: 'professional', label: 'Professional Care Options' },
          { id: 'sources', label: 'Dermatology Sources' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-[#1C2420] shadow-xs font-semibold'
                : 'text-[#56635D] hover:text-[#1C2420]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Personalized AM / PM Routine */}
      {activeTab === 'routine' && (
        <div className="space-y-6">
          {/* Routine Header & Save Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1E2623]">
                Manageable Morning & Evening Routine
              </h2>
              <p className="text-xs text-[#5C6761] mt-0.5">
                Prioritizes barrier support, sunscreen photoprotection, and at most one cautious active.
              </p>
            </div>
            <button
              onClick={handleSave}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                routineSaved
                  ? 'bg-[#E3EFE8] text-[#224836] border border-[#BED7C9]'
                  : 'bg-[#2E503F] text-white hover:bg-[#233F31]'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{routineSaved ? 'Saved to My Routine Tab' : 'Save Routine to Profile'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning Routine */}
            <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#ECE8E0]">
                <Sun className="w-5 h-5 text-[#B4782A]" />
                <h3 className="font-serif text-base font-semibold text-[#1E2623]">
                  Morning Routine (AM)
                </h3>
              </div>

              {result.routine.morning.length === 0 ? (
                <p className="text-xs text-[#63706A]">No morning active steps recommended during rest phase.</p>
              ) : (
                <div className="space-y-4">
                  {result.routine.morning.map((step) => (
                    <div key={step.step_number} className="p-3.5 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#202B25]">
                          Step {step.step_number}: {step.category}
                        </span>
                        <span className="text-[10px] text-[#55645D] bg-[#EBE7DF] px-2 py-0.5 rounded-xs">
                          {step.frequency_schedule}
                        </span>
                      </div>
                      <p className="text-xs text-[#404D46] leading-relaxed">
                        {step.suggested_action}
                      </p>
                      <div className="text-[11px] text-[#697770] pt-1 border-t border-[#E8E4DA] space-y-0.5">
                        <div><strong>Precautions:</strong> {step.precautions}</div>
                        <div><strong>When to stop:</strong> {step.when_to_stop}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Evening Routine */}
            <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#ECE8E0]">
                <Moon className="w-5 h-5 text-[#41536B]" />
                <h3 className="font-serif text-base font-semibold text-[#1E2623]">
                  Evening Routine (PM)
                </h3>
              </div>

              {result.routine.evening.length === 0 ? (
                <p className="text-xs text-[#63706A]">No evening steps during rest phase.</p>
              ) : (
                <div className="space-y-4">
                  {result.routine.evening.map((step) => (
                    <div key={step.step_number} className="p-3.5 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#202B25]">
                          Step {step.step_number}: {step.category}
                        </span>
                        <span className="text-[10px] text-[#55645D] bg-[#EBE7DF] px-2 py-0.5 rounded-xs">
                          {step.frequency_schedule}
                        </span>
                      </div>
                      <p className="text-xs text-[#404D46] leading-relaxed">
                        {step.suggested_action}
                      </p>
                      <div className="text-[11px] text-[#697770] pt-1 border-t border-[#E8E4DA] space-y-0.5">
                        <div><strong>Precautions:</strong> {step.precautions}</div>
                        <div><strong>When to stop:</strong> {step.when_to_stop}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Patch Testing Protocol Card */}
          <div className="bg-[#F3EFE7] border border-[#DDD7CB] rounded-xl p-5 space-y-2 text-xs text-[#47554E]">
            <h4 className="font-serif text-sm font-semibold text-[#1E2623] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#355A47]" />
              <span>Evidence-Based Patch Testing Protocol</span>
            </h4>
            <p className="leading-relaxed">
              {result.routine.patch_test_guidance}
            </p>
            <p className="text-[11px] text-[#66736C]">
              <em>Important caveat:</em> A negative patch test behind the ear or on the inner arm does not guarantee that facial skin will not experience irritation, as facial stratum corneum is thinner. Always introduce new actives slowly (1–2x weekly).
            </p>
          </div>

          {/* Routine Notes */}
          {result.routine.notes && (
            <div className="p-4 bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl text-xs text-[#525E58] leading-relaxed">
              <strong>Routine Notes:</strong> {result.routine.notes}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Observations & Limitations */}
      {activeTab === 'observations' && (
        <div className="space-y-6">
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1E2623]">
                Visible Surface Observations
              </h2>
              <p className="text-xs text-[#5C6761] mt-1">
                Cosmetic descriptions of visible surface features. These are not medical diagnoses.
              </p>
            </div>

            {result.observations.length === 0 ? (
              <p className="text-xs text-[#5C6761]">No specific focal concerns noted from questionnaire or photos.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.observations.map((obs, idx) => (
                  <div key={idx} className="p-4 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#202B25] text-sm font-serif">
                        {obs.plain_language_description}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-xs font-medium ${
                        obs.certainty === 'supported' ? 'bg-[#E3EFE7] text-[#224836]' : 'bg-[#EFE8DD] text-[#715738]'
                      }`}>
                        {obs.certainty === 'supported' ? 'Supported finding' : 'Uncertain finding'}
                      </span>
                    </div>

                    <div className="text-[#4E5C55]">
                      <strong>Approximate region:</strong> {obs.approximate_region}
                    </div>

                    <div className="text-[11px] text-[#697770] pt-1.5 border-t border-[#E8E4DA]">
                      <strong>Confounding factors:</strong> {obs.confounding_factors}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Limitations of Photo Observation */}
          <div className="bg-[#F8F6F1] border border-[#DFD9CD] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#244535]">
              <Info className="w-4 h-4" />
              <h3 className="font-serif text-base font-semibold text-[#1E2623]">
                What Cannot Reliably Be Determined from Photos
              </h3>
            </div>
            <p className="text-xs text-[#58645E]">
              Digital photos have inherent diagnostic limitations. The following aspects require in-person clinical evaluation:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-[#4F5B55]">
              {result.limitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>

          {/* Follow-up Considerations */}
          {result.follow_up_questions && result.follow_up_questions.length > 0 && (
            <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-3">
              <h3 className="font-serif text-base font-semibold text-[#1E2623]">
                Questions to Consider Over Time
              </h3>
              <ul className="space-y-1.5 text-xs text-[#505D57]">
                {result.follow_up_questions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#3A5D4C]">&bull;</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Ingredient Options */}
      {activeTab === 'ingredients' && (
        <div className="space-y-6">
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1E2623]">
                Educational Ingredient Options
              </h2>
              <p className="text-xs text-[#5C6761] mt-1">
                Ingredients with peer-reviewed literature for your concerns. These are educational candidates, not automatic combinations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.ingredient_options.map((ing, idx) => (
                <div key={idx} className="p-4 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-2 text-xs">
                  <h4 className="font-serif text-sm font-semibold text-[#202B25]">{ing.name}</h4>
                  <p className="text-[#4E5C55] leading-relaxed">
                    <strong>Common Cosmetic Purpose:</strong> {ing.purpose}
                  </p>
                  <p className="text-[11px] text-[#697770] pt-1.5 border-t border-[#E8E4DA]">
                    <strong>Cautious Introduction:</strong> {ing.cautious_notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Product Ideas (Category-first) */}
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <div>
              <h3 className="font-serif text-base font-semibold text-[#1E2623]">
                Verified Product Ideas (Non-Sponsored)
              </h3>
              <p className="text-xs text-[#5C6761] mt-1">
                Prioritizing ingredient categories over specific brands. Selected from verified independent retail formulations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VERIFIED_PRODUCT_CATALOG.slice(0, 6).map((prod) => (
                <div key={prod.id} className="p-3.5 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg flex flex-col justify-between text-xs space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#6B7971] mb-1">
                      <span>{prod.brand}</span>
                      <span>{prod.estimatedPrice} ({prod.currency})</span>
                    </div>
                    <h5 className="font-semibold text-[#1E2623] text-sm mb-1">{prod.name}</h5>
                    <p className="text-[11px] text-[#55635C]">
                      Actives: {prod.activeIngredients.join(', ')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6E2D8] text-[10px] text-[#7A8780]">
                    {prod.nonSponsoredDisclosure}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Professional Care Options */}
      {activeTab === 'professional' && (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#1E2623]">
              Educational In-Office Care Options
            </h2>
            <p className="text-xs text-[#5C6761] mt-1 leading-relaxed">
              Procedures performed by board-certified dermatologists or licensed medical professionals. An in-person consultation is mandatory before any clinical procedure.
            </p>
          </div>

          <div className="space-y-4">
            {result.professional_care_guidance.map((care, idx) => (
              <div key={idx} className="p-4 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-2 text-xs">
                <h4 className="font-serif text-sm font-semibold text-[#202B25]">{care.treatment}</h4>
                <div className="text-[#4E5C55]">
                  <strong>Purpose:</strong> {care.purpose}
                </div>
                <div className="text-[#4E5C55]">
                  <strong>Why an in-person assessment is needed:</strong> {care.in_person_reason}
                </div>
                <div className="text-[11px] text-[#844336] pt-1.5 border-t border-[#E8E4DA]">
                  <strong>Important Risks:</strong> {care.risks}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#FAF8F3] border border-[#E3DFC] rounded-lg text-xs text-[#58645E]">
            <p>
              <strong>Safety Warning:</strong> Never attempt DIY chemical peels, at-home microneedling rollers, or extraction tools. These carry serious risks of infection, permanent scarring, and post-inflammatory dark marks.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: Citations & Sources */}
      {activeTab === 'sources' && (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#1E2623]">
              Authoritative Dermatology Sources
            </h2>
            <p className="text-xs text-[#5C6761] mt-1">
              Grounded in published clinical guidelines and dermatology bodies.
            </p>
          </div>

          <div className="space-y-3">
            {result.sources.map((src, idx) => (
              <div key={idx} className="p-3 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-[#1E2623]">{src.title}</h4>
                  <span className="text-[11px] text-[#637069]">
                    {src.organization} &middot; Reviewed {src.year}
                  </span>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#2A4C3D] hover:underline flex items-center gap-1 font-medium shrink-0 ml-3"
                >
                  <span>Read guideline</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

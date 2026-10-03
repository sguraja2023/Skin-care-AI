import React, { useState } from 'react';
import { RoutineStep } from '../types/skincare';
import { Sun, Moon, CheckCircle2, AlertCircle, Info, RefreshCw, Calendar, ChevronRight } from 'lucide-react';
import { CATEGORY_RECOMMENDATIONS } from '../data/productCatalog';

interface MyRoutineViewProps {
  currentRoutine?: {
    morning: RoutineStep[];
    evening: RoutineStep[];
  };
  onStartAnalysis: () => void;
}

export const MyRoutineView: React.FC<MyRoutineViewProps> = ({ currentRoutine, onStartAnalysis }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [acclimationWeek, setAcclimationWeek] = useState<number>(1);
  const [patchTestDay, setPatchTestDay] = useState<number>(0);

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasRoutine = currentRoutine && (currentRoutine.morning.length > 0 || currentRoutine.evening.length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block mb-1">
            Daily Skincare Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1E2623] font-medium">
            My Daily Routine & Habit Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6761] mt-1">
            Focus on steady consistency. Skincare benefits compound over 6 to 12 weeks of gentle, unhurried care.
          </p>
        </div>

        {!hasRoutine && (
          <button
            onClick={onStartAnalysis}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#2E503F] hover:bg-[#233F31] rounded-md transition-colors shrink-0 cursor-pointer"
          >
            Generate Personalized Routine
          </button>
        )}
      </div>

      {/* Routine Checklists */}
      {hasRoutine ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Morning Routine */}
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E0]">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-[#B4782A]" />
                <h2 className="font-serif text-base font-semibold text-[#1E2623]">
                  Morning Routine
                </h2>
              </div>
              <span className="text-[11px] text-[#637069]">Daily protection</span>
            </div>

            <div className="space-y-3">
              {currentRoutine.morning.map((step) => {
                const stepKey = `am-${step.step_number}`;
                const isChecked = !!completedSteps[stepKey];
                return (
                  <div
                    key={stepKey}
                    onClick={() => toggleStep(stepKey)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#F2F7F4] border-[#CADDCF]'
                        : 'bg-[#F6F4ED] border-[#DFDACF] hover:border-[#CCD5CE]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2
                          className={`w-4 h-4 ${isChecked ? 'text-[#2D5B44]' : 'text-[#A2AFA8]'}`}
                        />
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${isChecked ? 'line-through text-[#697A71]' : 'text-[#1E2623]'}`}>
                            Step {step.step_number}: {step.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#55635C] leading-relaxed">
                          {step.suggested_action}
                        </p>
                        <div className="text-[10px] text-[#7A8881] pt-1">
                          <strong>Precaution:</strong> {step.precautions}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evening Routine */}
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E0]">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#41536B]" />
                <h2 className="font-serif text-base font-semibold text-[#1E2623]">
                  Evening Routine
                </h2>
              </div>
              <span className="text-[11px] text-[#637069]">Barrier recovery</span>
            </div>

            <div className="space-y-3">
              {currentRoutine.evening.map((step) => {
                const stepKey = `pm-${step.step_number}`;
                const isChecked = !!completedSteps[stepKey];
                return (
                  <div
                    key={stepKey}
                    onClick={() => toggleStep(stepKey)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#F2F7F4] border-[#CADDCF]'
                        : 'bg-[#F6F4ED] border-[#DFDACF] hover:border-[#CCD5CE]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2
                          className={`w-4 h-4 ${isChecked ? 'text-[#2D5B44]' : 'text-[#A2AFA8]'}`}
                        />
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${isChecked ? 'line-through text-[#697A71]' : 'text-[#1E2623]'}`}>
                            Step {step.step_number}: {step.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#55635C] leading-relaxed">
                          {step.suggested_action}
                        </p>
                        <div className="text-[10px] text-[#7A8881] pt-1">
                          <strong>Precaution:</strong> {step.precautions}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl text-center space-y-3 max-w-xl mx-auto">
          <Info className="w-8 h-8 text-[#4E705E] mx-auto" />
          <h3 className="font-serif text-lg text-[#1E2623]">No saved routine yet</h3>
          <p className="text-xs text-[#5D6B64] leading-relaxed">
            Complete the questionnaire or photo analysis to generate a personalized AM/PM routine tailored to your skin type and specific concerns.
          </p>
          <button
            onClick={onStartAnalysis}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2E503F] hover:bg-[#233F31] rounded-md transition-colors cursor-pointer"
          >
            Start Analysis Flow
          </button>
        </div>
      )}

      {/* Cautious Acclimation & Patch Test Helpers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Acclimation Tracker */}
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3D614F]" />
            <h3 className="font-serif text-base font-semibold text-[#1E2623]">
              Cautious Active Acclimation Schedule
            </h3>
          </div>
          <p className="text-xs text-[#56645D] leading-relaxed">
            When introducing any active ingredient (such as Salicylic Acid or Azelaic Acid), follow this graded exposure to avoid barrier irritation:
          </p>

          <div className="space-y-2 text-xs">
            {[
              { week: 1, freq: '1 evening per week', note: 'Evaluate skin 48 hours afterward for delayed flushing.' },
              { week: 2, freq: '1 to 2 evenings per week', note: 'Continue buffer moisturizer if tingling occurs.' },
              { week: 3, freq: '2 evenings per week', note: 'Only advance if skin remains calm with zero peeling.' },
              { week: 4, freq: 'Up to 3 evenings per week', note: 'Maintenance ceiling for most sensitive to combination skin.' },
            ].map((item) => (
              <button
                key={item.week}
                onClick={() => setAcclimationWeek(item.week)}
                className={`w-full p-2.5 rounded-lg border text-left flex items-start justify-between cursor-pointer transition-colors ${
                  acclimationWeek === item.week
                    ? 'border-[#3D614F] bg-[#EFF5F1]'
                    : 'border-[#E0DBCF] bg-[#F7F5EE] hover:bg-[#F0ECE2]'
                }`}
              >
                <div>
                  <span className="font-semibold text-[#1E2623]">Week {item.week}: {item.freq}</span>
                  <span className="text-[11px] text-[#63726A] block mt-0.5">{item.note}</span>
                </div>
                {acclimationWeek === item.week && (
                  <span className="text-[10px] text-[#2F5341] font-semibold">Active</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Patch Test Progress */}
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#3D614F]" />
            <h3 className="font-serif text-base font-semibold text-[#1E2623]">
              3-Day Patch Test Protocol
            </h3>
          </div>
          <p className="text-xs text-[#56645D] leading-relaxed">
            Apply a pea-sized amount to the inner forearm or behind the ear once daily for 3 consecutive days prior to applying to facial skin.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                onClick={() => setPatchTestDay(day)}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  patchTestDay >= day
                    ? 'border-[#3D614F] bg-[#EFF5F1] text-[#1D3B2D]'
                    : 'border-[#E0DBCF] bg-[#F7F5EE] text-[#55635C]'
                }`}
              >
                <span className="text-xs font-semibold block">Day 0{day}</span>
                <span className="text-[10px] mt-0.5 block">
                  {patchTestDay >= day ? 'Tested ✓' : 'Pending'}
                </span>
              </button>
            ))}
          </div>

          <div className="p-3 bg-[#F4F1E9] border border-[#DDD7CC] rounded-lg text-[11px] text-[#54625A] space-y-1">
            <strong>What to check:</strong> Inspect for redness, swelling, burning, or tiny hives. If any occur, rinse thoroughly and do not apply to the face.
          </div>
        </div>
      </div>

      {/* Category Guidelines Reference */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
        <h3 className="font-serif text-base font-semibold text-[#1E2623]">
          General Category Guidance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {Object.entries(CATEGORY_RECOMMENDATIONS).map(([key, cat]) => (
            <div key={key} className="p-3.5 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-2">
              <h4 className="font-serif font-semibold text-[#202B25] text-sm">{cat.categoryTitle}</h4>
              <p className="text-[11px] text-[#526058]">{cat.whyRecommended}</p>
              <div className="pt-2 border-t border-[#E6E1D6] text-[10px] space-y-1">
                <div><strong className="text-[#202B25]">Look for:</strong> {cat.whatToLookFor.join(', ')}</div>
                <div className="text-[#844336]"><strong>Avoid:</strong> {cat.whatToAvoid.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ProgressEntry } from '../types/skincare';
import { Camera, Calendar, CheckCircle2, ShieldCheck, AlertCircle, Plus, Trash2, Info } from 'lucide-react';

export const ProgressView: React.FC = () => {
  const [hasOptedIn, setHasOptedIn] = useState(false);
  const [entries, setEntries] = useState<ProgressEntry[]>([
    {
      id: 'initial',
      date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
      notes: 'Began baseline gentle barrier routine (hydrating cleanser + ceramide cream + SPF 30). Skin feels comfortable with zero stinging.',
      self_reported_comfort: 'comfortable',
      products_used: ['Gentle Cleanser', 'Barrier Moisturizer', 'Broad-Spectrum SPF 30']
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [newComfort, setNewComfort] = useState<'comfortable' | 'mild_tingling' | 'irritation_observed'>('comfortable');
  const [newProduct, setNewProduct] = useState('');

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const newEntry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      notes: newNote,
      self_reported_comfort: newComfort,
      products_used: newProduct ? [newProduct] : ['Standard Daily Routine']
    };

    setEntries([newEntry, ...entries]);
    setNewNote('');
    setNewProduct('');
  };

  const handleClearProgress = () => {
    setEntries([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-3">
        <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block">
          Longitudinal Observation
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1E2623] font-medium">
          Progress & Tolerance Tracking
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6761] leading-relaxed">
          Meaningful skincare evolution takes weeks to months. We focus on qualitative tolerance, comfort, and consistent habits.
        </p>

        {/* Ethical Anti-Hype Notice */}
        <div className="p-3.5 bg-[#F4F1E9] border border-[#DDD7CC] rounded-lg text-xs text-[#526058] space-y-1">
          <strong className="text-[#202B25] block">Commitment to Scientific Honesty:</strong>
          <p>
            We do NOT report arbitrary &ldquo;improvement percentages&rdquo; (e.g. &ldquo;skin texture improved 24%&rdquo;) or alter your uploaded photos with simulated filters. Lighting, camera distance, and humidity dramatically alter photo appearance.
          </p>
        </div>
      </div>

      {/* Explicit Consent Gate for Progress Storage */}
      {!hasOptedIn ? (
        <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-4 text-center max-w-xl mx-auto">
          <ShieldCheck className="w-8 h-8 text-[#355A47] mx-auto" />
          <h3 className="font-serif text-lg text-[#1E2623]">Separate Storage Consent Required</h3>
          <p className="text-xs text-[#59665F] leading-relaxed">
            Progress logging requires your explicit permission to retain your journal entries in browser session memory. We do not store health notes across third-party analytics.
          </p>
          <button
            onClick={() => setHasOptedIn(true)}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2E503F] hover:bg-[#233F31] rounded-md transition-colors cursor-pointer"
          >
            I Opt In to Session Progress Tracking
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Add Entry Form */}
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1E2623]">
              Log Routine Update or Tolerance Observation
            </h3>

            <form onSubmit={handleAddEntry} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#202B25] block mb-1">
                  How does your skin feel today? (Tolerance & Comfort)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'comfortable', label: 'Comfortable', desc: 'No stinging or tightness' },
                    { id: 'mild_tingling', label: 'Mild Tingling', desc: 'Transient sensation for <5 mins' },
                    { id: 'irritation_observed', label: 'Irritation / Redness', desc: 'Stinging, flushing, or peeling' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setNewComfort(c.id as any)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        newComfort === c.id
                          ? 'border-[#3D614F] bg-[#EFF5F1] text-[#1E3B2E]'
                          : 'border-[#DDD8CE] bg-white text-[#4A5750] hover:bg-[#F6F4ED]'
                      }`}
                    >
                      <div className="font-semibold">{c.label}</div>
                      <div className="text-[10px] text-[#697770]">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#202B25] block mb-1">
                  Product Introduced or Maintained
                </label>
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="e.g., Started Azelaic Acid 10% (1 night/week), or Continued CeraVe Cream"
                  className="w-full p-2.5 rounded-md border border-[#D5D0C6] bg-white text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#202B25] block mb-1">
                  Observation Notes
                </label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Note any visible changes, flaking zones, weather changes, or sun exposure..."
                  className="w-full p-2.5 rounded-md border border-[#D5D0C6] bg-white text-xs"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] text-[#68766F]">
                  Entries remain private to this current browser session.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2E503F] hover:bg-[#233F31] rounded-md transition-colors cursor-pointer"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>

          {/* Progress Timeline List */}
          <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E0]">
              <h3 className="font-serif text-base font-semibold text-[#1E2623]">
                Your Progress History
              </h3>
              {entries.length > 0 && (
                <button
                  onClick={handleClearProgress}
                  className="text-xs text-[#9B4838] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Entries</span>
                </button>
              )}
            </div>

            {entries.length === 0 ? (
              <p className="text-xs text-[#6B7972]">No entries logged yet. Add your first note above.</p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-[#F6F4ED] border border-[#DFDACF] rounded-lg space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#355A47]" />
                        <span className="font-semibold text-[#1E2623]">{entry.date}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-xs font-medium ${
                        entry.self_reported_comfort === 'comfortable' ? 'bg-[#E3EFE7] text-[#224836]' :
                        entry.self_reported_comfort === 'mild_tingling' ? 'bg-[#EFE8DD] text-[#715738]' : 'bg-[#FCECE8] text-[#8C3F2F]'
                      }`}>
                        {entry.self_reported_comfort.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-[#4E5C55] leading-relaxed">
                      {entry.notes}
                    </p>

                    {entry.products_used && entry.products_used.length > 0 && (
                      <div className="text-[11px] text-[#697770] pt-1 border-t border-[#E8E4DA]">
                        <strong>Products logged:</strong> {entry.products_used.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

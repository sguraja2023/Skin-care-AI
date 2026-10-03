import React, { useState } from 'react';
import { INGREDIENT_LIBRARY, IngredientEntry } from '../data/ingredientLibrary';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const IngredientGuideView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Ingredients' },
    { id: 'barrier', label: 'Barrier & Hydration' },
    { id: 'exfoliant', label: 'Chemical Exfoliants' },
    { id: 'soothing', label: 'Calming & Tone' },
    { id: 'antioxidant', label: 'Antioxidants' },
    { id: 'retinoid', label: 'Retinoids' },
    { id: 'sun_filter', label: 'Sunscreen Filters' },
  ];

  const filtered = INGREDIENT_LIBRARY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commonCosmeticUse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Disclaimers */}
      <div className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl p-6 sm:p-8 space-y-3">
        <span className="text-xs font-semibold text-[#3C614E] uppercase tracking-wider block">
          Educational Reference Catalog
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1E2623] font-medium">
          Evidence-Based Ingredient Library
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6761] leading-relaxed max-w-3xl">
          Skincare ingredients are not magic cures. Every active compound has physiological boundaries, evidence limitations, and irritation potential. Our catalog is grounded in published literature from dermatological societies and public health authorities.
        </p>

        <div className="pt-2 text-[11px] text-[#63706A] flex items-center gap-2">
          <span>Sources: AAD, British Association of Dermatologists, DermNet NZ, U.S. FDA Monograph</span>
          <span aria-hidden="true">&bull;</span>
          <span>Last reviewed: October 2026</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#85928B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ingredients by name or cosmetic goal..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8D3C8] bg-white focus:ring-1 focus:ring-[#3D614F]"
          />
        </div>

        {/* Category Segmented Filter */}
        <div className="flex items-center gap-1 p-1 bg-[#EBE7DF] rounded-lg overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-white text-[#1C2420] shadow-xs font-semibold'
                  : 'text-[#5A6861] hover:text-[#1C2420]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Cards Grid */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl overflow-hidden transition-shadow hover:shadow-xs"
            >
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-base font-semibold text-[#1E2623]">{item.name}</h3>
                    {item.requiresProfessionalAdvice && (
                      <span className="text-[10px] text-[#8C3F2F] bg-[#FCECE8] px-2 py-0.5 rounded-xs font-medium">
                        Professional Advice Advised
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#526058] leading-relaxed max-w-2xl">
                    {item.commonCosmeticUse}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-[#6F7D76] block">Irritation Potential</span>
                    <span className={`font-semibold text-xs ${
                      item.irritationPotential === 'Low' ? 'text-[#29563F]' :
                      item.irritationPotential === 'Moderate' ? 'text-[#8C6228]' : 'text-[#963728]'
                    }`}>
                      {item.irritationPotential}
                    </span>
                  </div>

                  <div className="p-1 rounded-md text-[#5E6D66]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detailed View */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[#EAE6DD] bg-[#F7F5EE] text-xs space-y-4">
                  <div>
                    <strong className="text-[#202B25] block mb-1">Evidence Limitations:</strong>
                    <p className="text-[#505F57] leading-relaxed">{item.evidenceLimitations}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-[#202B25] block mb-1">Recommended Introduction Cadence:</strong>
                      <p className="text-[#505F57] leading-relaxed">{item.recommendedIntroduction}</p>
                    </div>

                    <div>
                      <strong className="text-[#202B25] block mb-1">Pregnancy & Nursing Status:</strong>
                      <p className="text-[#505F57]">
                        {item.pregnancySafe === true && 'Generally considered safe for cosmetic topical use.'}
                        {item.pregnancySafe === false && 'CONTRAINDICATED: Do not use during pregnancy or while trying to conceive.'}
                        {item.pregnancySafe === 'consult_doctor' && 'Consult your obstetrician before introducing.'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <strong className="text-[#202B25] block mb-1">Important Precautions:</strong>
                    <ul className="list-disc list-inside space-y-1 text-[#505F57]">
                      {item.importantPrecautions.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  {item.professionalAdviceNote && (
                    <div className="p-2.5 bg-[#FAF0ED] border border-[#ECD1CA] rounded-md text-[#873C2C] text-[11px]">
                      <strong>Clinical Notice:</strong> {item.professionalAdviceNote}
                    </div>
                  )}

                  {/* Sources */}
                  <div className="pt-2 border-t border-[#E4DFD5]">
                    <span className="text-[10px] text-[#717E77] uppercase tracking-wider block mb-1">
                      Reviewed Dermatology References
                    </span>
                    <div className="space-y-1">
                      {item.references.map((ref, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-[#45544C]">
                            {ref.source} &mdash; <em>{ref.organization}</em>
                          </span>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2B523F] hover:underline flex items-center gap-1 font-medium ml-2"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

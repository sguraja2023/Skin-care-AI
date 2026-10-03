import { VerifiedProduct } from '../types/skincare';

export const VERIFIED_PRODUCT_CATALOG: VerifiedProduct[] = [
  // Gentle Cleansers
  {
    id: 'cerave-hydrating-cleanser',
    brand: 'CeraVe',
    name: 'Hydrating Facial Cleanser',
    category: 'cleanser',
    activeIngredients: ['Ceramides 1, 3, 6-II', 'Hyaluronic Acid', 'Glycerin'],
    keyAttributes: ['Non-foaming lotion', 'Barrier-supporting', 'Non-comedogenic', 'Gentle surfactant system'],
    fragranceFree: true,
    estimatedPrice: '$15.99',
    currency: 'USD',
    availableCountries: ['US', 'UK', 'CA', 'EU', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'vanicream-gentle-cleanser',
    brand: 'Vanicream',
    name: 'Gentle Facial Cleanser',
    category: 'cleanser',
    activeIngredients: ['Glycerin', 'Purified Water', 'Coco-Glucoside'],
    keyAttributes: ['Formulated for hypersensitive skin', 'Free of common chemical irritants', 'Mild foaming'],
    fragranceFree: true,
    estimatedPrice: '$9.99',
    currency: 'USD',
    availableCountries: ['US', 'CA', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'larocheposay-toleriane-dermo-cleanser',
    brand: 'La Roche-Posay',
    name: 'Toleriane Dermo-Cleanser',
    category: 'cleanser',
    activeIngredients: ['Thermal Spring Water', 'Glycerin', 'Ethylhexyl Palmitate'],
    keyAttributes: ['Rinse or wipe-off formula', 'Minimalist ingredients', 'Designed for reactive skin'],
    fragranceFree: true,
    estimatedPrice: '£14.50',
    currency: 'GBP',
    availableCountries: ['UK', 'EU', 'US', 'CA', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },

  // Barrier Moisturizers
  {
    id: 'cerave-moisturizing-cream',
    brand: 'CeraVe',
    name: 'Moisturizing Cream',
    category: 'moisturizer',
    activeIngredients: ['3 Essential Ceramides', 'Hyaluronic Acid', 'Petrolatum'],
    keyAttributes: ['MVE delivery technology', 'Rich emollient texture', 'National Eczema Association accepted'],
    fragranceFree: true,
    estimatedPrice: '$17.49',
    currency: 'USD',
    availableCountries: ['US', 'UK', 'CA', 'EU', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'aveeno-calm-restore-oat-gel',
    brand: 'Aveeno',
    name: 'Calm + Restore Oat Gel Moisturizer',
    category: 'moisturizer',
    activeIngredients: ['Colloidal Oatmeal', 'Feverfew Extract', 'Glycerin'],
    keyAttributes: ['Lightweight gel-cream', 'Instant soothing feel', 'Absorbs quickly without greasy residue'],
    fragranceFree: true,
    estimatedPrice: '$19.99',
    currency: 'USD',
    availableCountries: ['US', 'CA', 'UK'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'larocheposay-cicaplast-b5-plus',
    brand: 'La Roche-Posay',
    name: 'Cicaplast Balm B5+',
    category: 'moisturizer',
    activeIngredients: ['Madecassoside (Centella)', '5% Panthenol', 'Zinc Gluconate', 'Shea Butter'],
    keyAttributes: ['Intensive barrier recovery balm', 'Comforts chafed and dry areas', 'Antibacterial mineral complex'],
    fragranceFree: true,
    estimatedPrice: '€12.90',
    currency: 'EUR',
    availableCountries: ['EU', 'UK', 'US', 'CA', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },

  // Broad-Spectrum Sunscreens
  {
    id: 'eltamd-uv-clear-spf46',
    brand: 'EltaMD',
    name: 'UV Clear Broad-Spectrum SPF 46',
    category: 'sunscreen',
    activeIngredients: ['9.0% Transparent Zinc Oxide', '5% Niacinamide', 'Hyaluronic Acid'],
    keyAttributes: ['Formulated for blemish-prone and redness-prone skin', 'Lightweight finish', 'UVA/UVB protection'],
    fragranceFree: true,
    estimatedPrice: '$43.00',
    currency: 'USD',
    availableCountries: ['US', 'CA', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'larocheposay-anthelios-uvmune-400',
    brand: 'La Roche-Posay',
    name: 'Anthelios UVMune 400 Invisible Fluid SPF 50+',
    category: 'sunscreen',
    activeIngredients: ['Mexoryl 400', 'Broad-spectrum organic UV filters', 'Netlock technology'],
    keyAttributes: ['Ultra-high UVA protection (including ultra-long UVA up to 400nm)', 'Non-greasy, invisible fluid', 'Very water resistant'],
    fragranceFree: true,
    estimatedPrice: '£19.00',
    currency: 'GBP',
    availableCountries: ['UK', 'EU', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'supergoop-mineral-sheerscreen-spf30',
    brand: 'Supergoop!',
    name: 'Mineral Sheerscreen SPF 30',
    category: 'sunscreen',
    activeIngredients: ['17.5% Non-nano Zinc Oxide', 'Aloe Leaf Juice', 'Squalane'],
    keyAttributes: ['100% Mineral filter', 'Virtually invisible sheer finish', 'Smooth primer-like texture'],
    fragranceFree: true,
    estimatedPrice: '$40.00',
    currency: 'USD',
    availableCountries: ['US', 'CA', 'UK'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },

  // Cautious Optional Treatments (Serums)
  {
    id: 'paulas-choice-2-bha-liquid',
    brand: "Paula's Choice",
    name: 'Skin Perfecting 2% BHA Liquid Exfoliant',
    category: 'treatment',
    activeIngredients: ['2% Salicylic Acid', 'Green Tea Extract', 'Methylpropanediol'],
    keyAttributes: ['Oil-soluble exfoliant', 'Gentle liquid toner format', 'Start 1-2x/week only'],
    fragranceFree: true,
    estimatedPrice: '$35.00',
    currency: 'USD',
    availableCountries: ['US', 'UK', 'CA', 'EU', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  },
  {
    id: 'the-ordinary-azelaic-acid-suspension-10',
    brand: 'The Ordinary',
    name: 'Azelaic Acid Suspension 10%',
    category: 'treatment',
    activeIngredients: ['10% High-Purity Azelaic Acid', 'Isodecyl Neopentanoate'],
    keyAttributes: ['Gel-cream formula', 'Targets visible tone irregularities and post-blemish marks', 'Mild tingling possible'],
    fragranceFree: true,
    estimatedPrice: '$11.10',
    currency: 'USD',
    availableCountries: ['US', 'UK', 'CA', 'EU', 'Global'],
    lastCheckedDate: 'October 2026',
    nonSponsoredDisclosure: 'Independent cosmetic catalog entry. Not sponsored; zero affiliate commission received.'
  }
];

export const CATEGORY_RECOMMENDATIONS = {
  cleanser: {
    categoryTitle: 'Gentle, Non-Stripping Cleanser',
    whyRecommended: 'Essential for removing daily particulate matter, excess sebum, and sunscreen without compromising the skin moisture barrier.',
    whatToLookFor: ['pH-balanced (around 5.5)', 'Free of harsh sulfates (like SLS)', 'Fragrance-free if sensitive', 'Lotion or low-foaming gel texture'],
    whatToAvoid: ['Harsh bar soaps with high alkaline pH', 'Rough physical scrub granules (e.g. walnut shells)', 'Over-cleansing multiple times a day']
  },
  moisturizer: {
    categoryTitle: 'Barrier-Supporting Moisturizer',
    whyRecommended: 'Replenishes intercellular lipids, minimizes transepidermal water loss (TEWL), and soothes cosmetic dryness.',
    whatToLookFor: ['Ceramides (NP, AP, EOP)', 'Glycerin and Hyaluronic Acid', 'Cholesterol and fatty acids', 'Squalane or mild occlusives'],
    whatToAvoid: ['Essential oils and heavy fragrances on sensitized skin', 'Denatured alcohol high up in the ingredient list']
  },
  sunscreen: {
    categoryTitle: 'Broad-Spectrum Sunscreen (SPF 30+)',
    whyRecommended: 'Protects against ultraviolet radiation which exacerbates hyperpigmentation, collagen degradation, and barrier impairment.',
    whatToLookFor: ['Broad spectrum (UVA + UVB coverage)', 'SPF 30 or higher', 'Mineral (Zinc Oxide/Titanium Dioxide) or well-tolerated organic filters'],
    whatToAvoid: ['Applying too little (need approx 1/4 tsp for face/neck)', 'Relying solely on SPF inside makeup']
  },
  activeTreatment: {
    categoryTitle: 'Single Targeted Optional Active (When Appropriate)',
    whyRecommended: 'Introduced one at a time with a deliberate acclimation schedule to address a primary cosmetic concern without causing barrier breakdown.',
    whatToLookFor: ['Moderate concentration (e.g., 2% BHA or 10% Azelaic Acid)', 'Transparent ingredient labeling', 'Compatibility with existing routine'],
    whatToAvoid: ['Layering multiple exfoliants simultaneously', 'Daily use from day one without a patch test']
  }
};

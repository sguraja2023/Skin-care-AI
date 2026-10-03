export interface IngredientEntry {
  id: string;
  name: string;
  category: 'barrier' | 'exfoliant' | 'antioxidant' | 'retinoid' | 'soothing' | 'sun_filter';
  commonCosmeticUse: string;
  evidenceLimitations: string;
  irritationPotential: 'Low' | 'Moderate' | 'High' | 'Dose-dependent';
  importantPrecautions: string[];
  requiresProfessionalAdvice: boolean;
  professionalAdviceNote?: string;
  recommendedIntroduction: string;
  pregnancySafe: boolean | 'consult_doctor';
  reviewDate: string;
  references: {
    source: string;
    organization: string;
    url: string;
  }[];
}

export const INGREDIENT_LIBRARY: IngredientEntry[] = [
  {
    id: 'ceramides',
    name: 'Ceramides (NP, AP, EOP)',
    category: 'barrier',
    commonCosmeticUse: 'Strengthening the stratum corneum barrier, supporting moisture retention, and mitigating dry, flaky skin feel.',
    evidenceLimitations: 'Topical ceramides support surface barrier function and hydration; they do not cure chronic underlying barrier disorders like genetic atopic dermatitis.',
    irritationPotential: 'Low',
    importantPrecautions: [
      'Generally well tolerated by all skin types including reactive skin.',
      'Best formulated in physiological lipid ratios alongside cholesterol and fatty acids.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Can be used daily morning and evening without an acclimation period.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Role of Ceramides in Skin Barrier Function and Dermatologic Disease',
        organization: 'American Academy of Dermatology (AAD)',
        url: 'https://www.aad.org'
      },
      {
        source: 'Stratum Corneum Lipids & Barrier Repair',
        organization: 'DermNet NZ',
        url: 'https://dermnetnz.org'
      }
    ]
  },
  {
    id: 'hyaluronic-acid',
    name: 'Hyaluronic Acid (Sodium Hyaluronate)',
    category: 'barrier',
    commonCosmeticUse: 'Surface humectant that attracts and binds water to the upper skin layers, providing temporary visual plumping.',
    evidenceLimitations: 'Does not alter deep skin architecture when applied topically. In very dry climates without an occlusive moisturizer, may draw water from deeper epidermis.',
    irritationPotential: 'Low',
    importantPrecautions: [
      'Apply to damp skin and follow immediately with an emollient moisturizer to lock in hydration.',
      'Low molecular weight forms can occasionally cause mild transient stinging on compromised barriers.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Safe for daily use AM and PM.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Skin hydration and humectant mechanisms',
        organization: 'British Association of Dermatologists',
        url: 'https://www.bad.org.uk'
      }
    ]
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    category: 'barrier',
    commonCosmeticUse: 'Supports barrier integrity, calms visible surface redness, and helps balance surface oiliness appearance.',
    evidenceLimitations: 'Clinical trials demonstrate modest visible brightening and pore appearance improvements over 8–12 weeks; not a substitute for clinical acne treatments.',
    irritationPotential: 'Low',
    importantPrecautions: [
      'Concentrations between 2% and 5% are clinically supported; concentrations $\\ge 10\\%$ may trigger transient flushing or irritation in sensitive individuals.',
      'Can be paired with most other cosmetic ingredients without degradation.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Start once daily every other day; advance to daily as tolerated.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Niacinamide in Dermatology: Mechanisms of Action',
        organization: 'Dermatologic Surgery Journal',
        url: 'https://www.aad.org'
      }
    ]
  },
  {
    id: 'salicylic-acid',
    name: 'Salicylic Acid (Beta Hydroxy Acid / BHA)',
    category: 'exfoliant',
    commonCosmeticUse: 'Oil-soluble exfoliation within pore lining; helps loosen dead surface skin cells and reduce visible congestion and blackheads.',
    evidenceLimitations: 'Helps maintain pore clarity for mild cosmetic blemishes; does not treat hormonal cystic nodules or severe inflammatory acne.',
    irritationPotential: 'Moderate',
    importantPrecautions: [
      'Can cause dryness, peeling, and irritation if overused.',
      'Do not combine simultaneously in the same routine with prescription retinoids or strong glycolic acid.',
      'Always use daily broad-spectrum SPF as exfoliation increases sun sensitivity.',
      'Individuals with true aspirin (salicylate) allergy must avoid.'
    ],
    requiresProfessionalAdvice: false,
    professionalAdviceNote: 'If experiencing painful cystic acne or persistent inflammatory breakouts, consult a dermatologist.',
    recommendedIntroduction: 'Start 1–2 evenings per week. Only increase to 3 evenings per week after 3 weeks of zero irritation.',
    pregnancySafe: 'consult_doctor',
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Over-the-counter Acne Treatments: Topical Salicylic Acid',
        organization: 'U.S. FDA Drug Monograph & AAD',
        url: 'https://www.aad.org'
      }
    ]
  },
  {
    id: 'azelaic-acid',
    name: 'Azelaic Acid (Cosmetic 10%)',
    category: 'soothing',
    commonCosmeticUse: 'Helps gently fade the appearance of post-blemish marks (post-inflammatory hyperpigmentation) and visibly calms surface flushing.',
    evidenceLimitations: 'Over-the-counter 10% preparations are cosmetic. Prescription 15–20% gel/foam requires clinician diagnosis for rosacea or acne vulgaris.',
    irritationPotential: 'Moderate',
    importantPrecautions: [
      'May produce a temporary tingling sensation upon initial applications for 5–10 minutes.',
      'Apply over a light moisturizer (the "buffer" technique) if sensitive.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Start 2 evenings per week. Gradually increase to every other evening.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Azelaic Acid in Hyperpigmentation & Erythema',
        organization: 'British Journal of Dermatology',
        url: 'https://www.bad.org.uk'
      }
    ]
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (L-Ascorbic Acid & Esters)',
    category: 'antioxidant',
    commonCosmeticUse: 'Antioxidant protection against environmental oxidative stressors; helps improve the appearance of uneven skin tone.',
    evidenceLimitations: 'Pure L-Ascorbic Acid is chemically unstable and oxidizes rapidly upon air/light exposure. Derivatives (like Sodium Ascorbyl Phosphate) are more stable but slower-acting.',
    irritationPotential: 'Moderate',
    importantPrecautions: [
      'Low pH (below 3.5) formulations of pure L-ascorbic acid can irritate sensitive, eczema-prone, or rosacea-prone skin.',
      'Discontinue if product turns dark amber/brown, indicating oxidation.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Start 2–3 mornings per week under sunscreen; advance to daily morning application as tolerated.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Topical Vitamin C in Dermatology',
        organization: 'Indian Dermatology Online Journal / AAD',
        url: 'https://www.aad.org'
      }
    ]
  },
  {
    id: 'retinoids',
    name: 'Cosmetic Retinoids (Retinol & Retinaldehyde)',
    category: 'retinoid',
    commonCosmeticUse: 'Supports epidermal cell turnover, smooths visible texture, and softens appearance of fine surface lines over prolonged use (3–6 months).',
    evidenceLimitations: 'Cosmetic retinols require conversion in the skin to retinoic acid and are significantly gentler than prescription tretinoin. Results take months of consistent use.',
    irritationPotential: 'High',
    importantPrecautions: [
      'CONTRAINDICATED in pregnancy and while trying to conceive.',
      'Can cause the "retinoid reaction": redness, peeling, barrier dryness.',
      'Must only be applied in the EVENING on completely dry skin.',
      'Strict daily broad-spectrum sunscreen (SPF 30+) is non-negotiable.'
    ],
    requiresProfessionalAdvice: true,
    professionalAdviceNote: 'If you have eczema, active rosacea, are pregnant, or are using prescription topical treatments, consult your physician before initiating any retinoid.',
    recommendedIntroduction: 'Apply a pea-sized amount 1 night per week for 2 weeks, then 2 nights per week for 2 weeks. Never apply immediately after washing damp skin.',
    pregnancySafe: false,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Retinoids in the Treatment of Skin Aging & Acne: An Overview',
        organization: 'Clinical Interventions in Aging / DermNet',
        url: 'https://dermnetnz.org'
      }
    ]
  },
  {
    id: 'centella-asiatica',
    name: 'Centella Asiatica (Cica / Madecassoside)',
    category: 'soothing',
    commonCosmeticUse: 'Comforting stressed, irritated, or sensitized skin; supports barrier recovery after environmental exposure.',
    evidenceLimitations: 'Provides cosmetic soothing and hydration support; does not replace medical wound care or medical steroid therapy.',
    irritationPotential: 'Low',
    importantPrecautions: [
      'Very gentle and suitable for most skin types, including sensitive skin.',
      'Excellent as a calming buffer when introducing active ingredients.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Safe for daily use AM and PM as needed.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Centella Asiatica in Cosmetology',
        organization: 'Advances in Dermatology and Allergology',
        url: 'https://dermnetnz.org'
      }
    ]
  },
  {
    id: 'zinc-oxide',
    name: 'Zinc Oxide (Mineral Sunscreen Filter)',
    category: 'sun_filter',
    commonCosmeticUse: 'Broad-spectrum physical photoprotection (UVA + UVB) that sits on the surface of the skin to reflect and scatter radiation.',
    evidenceLimitations: 'Photoprotection is directly tied to adequate application quantity (approx. 1/4 teaspoon for face and neck). Inadequate quantity substantially reduces SPF factor.',
    irritationPotential: 'Low',
    importantPrecautions: [
      'Ideal for sensitive, reactive, or post-procedure skin due to inert nature.',
      'May leave a visible white cast on deeper Fitzpatrick skin tones unless tinted or micronized.'
    ],
    requiresProfessionalAdvice: false,
    recommendedIntroduction: 'Every single morning as the final step of skincare routine. Reapply every 2 hours during direct outdoor exposure.',
    pregnancySafe: true,
    reviewDate: 'October 2026',
    references: [
      {
        source: 'Sunscreen FAQs & Guidelines',
        organization: 'American Academy of Dermatology (AAD)',
        url: 'https://www.aad.org'
      },
      {
        source: 'Sunscreen & Photoprotection Monograph',
        organization: 'U.S. Food and Drug Administration (FDA)',
        url: 'https://www.fda.gov'
      }
    ]
  }
];

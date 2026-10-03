export interface ProfessionalTreatment {
  id: string;
  name: string;
  concernsAddressed: string[];
  description: string;
  whyInPersonAssessmentNeeded: string;
  importantRisks: string[];
  skinToneConsiderations: string;
  clinicalCaveat: string;
  reviewedDate: string;
  referenceUrl: string;
}

export const PROFESSIONAL_TREATMENTS: ProfessionalTreatment[] = [
  {
    id: 'superficial-chemical-peels',
    name: 'In-Clinic Superficial Chemical Peels',
    concernsAddressed: ['Uneven surface texture', 'Superficial hyperpigmentation', 'Mild visible congestion'],
    description: 'Controlled application of chemical exfoliating solutions (such as glycolic acid, salicylic acid, or Jessner’s solution) by a certified dermatologist or licensed medical esthetician to accelerate surface cellular turnover.',
    whyInPersonAssessmentNeeded: 'A photo cannot gauge skin thickness, barrier integrity, healing capacity, or prior medication history (such as recent isotretinoin use). Pre-peel skin prep and tailored acid selection require physical examination.',
    importantRisks: [
      'Transient or persistent erythema (redness) and peeling',
      'Chemical burns if neutralizer timing is miscalculated',
      'Post-inflammatory hyperpigmentation (PIH) or permanent hypopigmentation',
      'Herpes simplex virus (cold sore) flare reactivation'
    ],
    skinToneConsiderations: 'Patients with deeper skin tones (Fitzpatrick types IV–VI) require lower acid concentrations, careful pre-treatment conditioning, and gentle neutralizing protocols to prevent stubborn post-inflammatory dark marks.',
    clinicalCaveat: 'Never attempt medical-grade acid peels at home. DIY chemical peeling poses severe risks of permanent scarring and disfigurement.',
    reviewedDate: 'October 2026',
    referenceUrl: 'https://www.aad.org/public/cosmetic/younger-looking/chemical-peels-overview'
  },
  {
    id: 'clinical-microneedling',
    name: 'Medical / In-Office Microneedling',
    concernsAddressed: ['Atrophic post-acne scarring', 'Deeper texture irregularities', 'Loss of elasticity'],
    description: 'Use of sterile, motorized micro-fine needles to create microscopic puncture wounds in the dermis, stimulating natural wound healing and collagen remodeling under aseptic clinical conditions.',
    whyInPersonAssessmentNeeded: 'Requires assessing whether scarring is active or stable, ruling out active cystic infections or keloid tendencies, and determining exact needle depth based on anatomical facial zones.',
    importantRisks: [
      'Bacterial or fungal infection if sterile protocol is compromised',
      'Post-inflammatory hyperpigmentation (PIH)',
      'Aggravation of active inflammatory acne or rosacea',
      'Subepidermal scarring from excessive needle passes or improper mechanical technique'
    ],
    skinToneConsiderations: 'Generally considered color-blind friendly compared to ablative lasers because heat is not applied, but aggressive depth can still provoke hyperpigmentation in melanin-rich skin.',
    clinicalCaveat: 'At-home "dermarollers" often tear the skin at an angle, cannot be sterilized properly, and frequently cause micro-infections.',
    reviewedDate: 'October 2026',
    referenceUrl: 'https://www.aad.org/public/cosmetic/younger-looking/microneedling'
  },
  {
    id: 'vascular-and-pigment-lasers',
    name: 'In-Office Laser & Light Therapies (e.g., Pulsed Dye, Nd:YAG, IPL)',
    concernsAddressed: ['Persistent visible telangiectasia (broken vessels)', 'Stubborn dark spots', 'Vascular redness'],
    description: 'Targeted wavelengths of concentrated light energy absorbed specifically by hemoglobin (blood vessels) or melanin (pigment) to coagulate or break down unwanted targets without damaging surrounding tissue.',
    whyInPersonAssessmentNeeded: 'Laser physics require precise match between skin phototype, target chromophore depth, and laser pulse duration. Diagnostic evaluation must rule out dangerous pigmented lesions (melanoma) before any laser firing.',
    importantRisks: [
      'Severe blistering, thermal burns, and persistent pain',
      'Post-inflammatory hyperpigmentation or hypopigmentation (loss of skin color)',
      'Eye injury requiring specialized clinical corneal shields',
      'Paradoxical darkening of melasma or hair stimulation'
    ],
    skinToneConsiderations: 'Extremely critical: Wavelengths must bypass epidermal melanin in deeper skin tones (e.g., using 1064 nm Nd:YAG with longer pulse widths). Incorrect device settings can produce severe depigmentation.',
    clinicalCaveat: 'Selfies and phone cameras cannot replace laser patch testing by a board-certified dermatologist.',
    reviewedDate: 'October 2026',
    referenceUrl: 'https://www.aad.org/public/cosmetic/younger-looking/lasers-lights'
  },
  {
    id: 'professional-extractions',
    name: 'Dermatologic Comedone Extractions',
    concernsAddressed: ['Stubborn closed comedones (whiteheads)', 'Open comedones (blackheads)'],
    description: 'Manual or instrument-assisted clearance of impacted sebum and keratin plugs from pores using sterile comedone extractors after professional skin softening.',
    whyInPersonAssessmentNeeded: 'Distinguishing non-inflamed comedones from inflammatory papules, cysts, or milia requires tactile palpation. Attempting to extract inflamed lesions causes rupture into deep tissue.',
    importantRisks: [
      'Follicular rupture causing localized inflammatory cysts',
      'Permanent capillary breakage (telangiectasia)',
      'Scarring and enlarged pore appearance if forced'
    ],
    skinToneConsiderations: 'Traumatic extraction technique on darker skin readily triggers melanin overproduction and dark spot formation.',
    clinicalCaveat: 'Do not squeeze or pick blemishes at home. Avoid suction pore vacuums which can burst fragile facial capillaries.',
    reviewedDate: 'October 2026',
    referenceUrl: 'https://www.aad.org/public/diseases/acne/diy/remove'
  }
];

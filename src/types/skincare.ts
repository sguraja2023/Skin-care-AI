/**
 * Core type definitions for SkinGuide AI
 */

export type SkinType = 'dry' | 'oily' | 'combination' | 'balanced' | 'unsure';
export type SensitivityLevel = 'none' | 'mild' | 'moderate' | 'high';
export type PregnancyStatus = 'none' | 'pregnant' | 'trying' | 'breastfeeding' | 'prefer_not_to_say';
export type BudgetLevel = 'budget' | 'mid' | 'premium' | 'any';

export interface CurrentProduct {
  name: string;
  activeIngredients: string;
  frequency: string; // e.g., 'daily', '2-3x per week'
}

export interface QuestionnaireData {
  isAdult: boolean; // Must be true (18+)
  mainConcerns: string[]; // e.g. 'blemishes_acne_like', 'dark_spots', 'redness', 'dryness_flaking', 'uneven_texture', 'dullness'
  otherConcernDetail?: string;
  skinType: SkinType;
  sensitivity: SensitivityLevel;
  allergiesAndReactions: string;
  currentProducts: CurrentProduct[];
  prescriptionTreatments: string; // Optional/voluntary
  diagnosedConditions: string; // Optional/voluntary
  concernDuration: string; // e.g., '< 1 month', '1-6 months', '6-12 months', '> 1 year'
  symptoms: string[]; // 'itching', 'pain', 'burning', 'bleeding', 'rapid_change', 'swelling', 'breathing_difficulty'
  recentProcedures: string; // procedures, sunburn, chemical peel, etc.
  pregnancyStatus: PregnancyStatus;
  budget: BudgetLevel;
  country: string;
  wantsPhotoAnalysis: boolean;
}

export interface PhotoData {
  front?: string; // Base64 data URL
  left?: string;  // Base64 data URL
  right?: string; // Base64 data URL
}

export interface ObservationItem {
  plain_language_description: string;
  approximate_region: string; // e.g., 'Forehead', 'Left cheek', 'Nose bridge', 'Chin'
  certainty: 'supported' | 'uncertain';
  confounding_factors: string; // e.g., 'Natural lighting glare', 'Possible cosmetic foundation residue'
}

export interface SafetyFlag {
  flag: string;
  severity: 'emergency' | 'urgent_dermatology' | 'caution' | 'adverse_reaction';
  guidance: string;
}

export interface RoutineStep {
  step_number: number;
  time_of_day: 'morning' | 'evening';
  category: string; // e.g., 'Gentle Cleanser', 'Barrier Moisturizer', 'Broad-Spectrum Sunscreen', 'Optional Calming Serum'
  suggested_action: string;
  frequency_schedule: string; // e.g. 'Daily in the morning', 'Start 1-2 evenings per week'
  precautions: string;
  when_to_stop: string;
}

export interface IngredientOption {
  name: string;
  purpose: string;
  cautious_notes: string;
}

export interface ProfessionalCareGuidance {
  treatment: string;
  purpose: string;
  in_person_reason: string;
  risks: string;
}

export interface SourceReference {
  title: string;
  organization: string;
  url: string;
  year: string;
}

export interface AnalysisResult {
  image_quality: 'acceptable' | 'limited' | 'retake_required';
  image_quality_reasons: string[];
  observations: ObservationItem[];
  user_reported_context: string;
  limitations: string[];
  follow_up_questions: string[];
  safety_flags: SafetyFlag[];
  routine: {
    morning: RoutineStep[];
    evening: RoutineStep[];
    patch_test_guidance: string;
    notes: string;
  };
  ingredient_options: IngredientOption[];
  professional_care_guidance: ProfessionalCareGuidance[];
  sources: SourceReference[];
  is_demo_mode?: boolean;
  analyzed_at: string;
}

export interface ProgressEntry {
  id: string;
  date: string;
  notes: string;
  self_reported_comfort: 'comfortable' | 'mild_tingling' | 'irritation_observed';
  products_used: string[];
  photoThumbnail?: string; // Only stored in ephemeral memory with explicit consent
}

export interface VerifiedProduct {
  id: string;
  brand: string;
  name: string;
  category: 'cleanser' | 'moisturizer' | 'sunscreen' | 'treatment';
  activeIngredients: string[];
  keyAttributes: string[];
  fragranceFree: boolean;
  estimatedPrice: string;
  currency: string;
  availableCountries: string[];
  lastCheckedDate: string;
  nonSponsoredDisclosure: string;
}

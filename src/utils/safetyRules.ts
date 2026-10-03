import { QuestionnaireData, SafetyFlag, RoutineStep } from '../types/skincare';

export interface SafetyCheckResult {
  isEmergency: boolean;
  emergencyMessage?: string;
  safetyFlags: SafetyFlag[];
  allowNewActives: boolean;
  mustKeepRoutineBasic: boolean;
  reasonForBasicRoutine?: string;
}

export function evaluateUserSafety(data: QuestionnaireData): SafetyCheckResult {
  const flags: SafetyFlag[] = [];
  let isEmergency = false;
  let emergencyMessage = '';
  let allowNewActives = true;
  let mustKeepRoutineBasic = false;
  let reasonForBasicRoutine = '';

  // 1. Critical Emergency Check: Airway / Severe sudden swelling
  const hasBreathingDifficulty = data.symptoms.includes('breathing_difficulty');
  const hasSevereSwelling = data.symptoms.includes('severe_sudden_swelling') || 
    (data.symptoms.includes('swelling') && data.allergiesAndReactions.toLowerCase().includes('swelling'));

  if (hasBreathingDifficulty || hasSevereSwelling) {
    isEmergency = true;
    emergencyMessage = 'URGENT MEDICAL ALERT: You reported symptoms that may indicate a severe allergic reaction (anaphylaxis) or acute airway compromise. Please seek emergency medical care immediately (call 911 in the US or your local emergency emergency number, or visit the nearest emergency department). Do not apply any skincare products.';
    flags.push({
      flag: 'Potential Acute Allergic Reaction or Respiratory Compromise',
      severity: 'emergency',
      guidance: emergencyMessage
    });
    return {
      isEmergency: true,
      emergencyMessage,
      safetyFlags: flags,
      allowNewActives: false,
      mustKeepRoutineBasic: true,
      reasonForBasicRoutine: 'Emergency symptoms reported. All cosmetic routines suspended.'
    };
  }

  // 2. High-Severity Concerning Clinical Symptoms
  const hasBleeding = data.symptoms.includes('bleeding');
  const hasRapidChange = data.symptoms.includes('rapid_change');
  const hasSignificantPain = data.symptoms.includes('pain');
  const hasSpreadingRedness = data.symptoms.includes('spreading_redness');
  const hasEyeInvolvement = data.symptoms.includes('eye_involvement');

  if (hasBleeding || hasRapidChange) {
    flags.push({
      flag: 'Rapidly Changing or Bleeding Lesions Reported',
      severity: 'urgent_dermatology',
      guidance: 'You indicated lesions that bleed or change rapidly in size, color, or shape. Any new, rapidly changing, non-healing, or bleeding skin spot requires an in-person diagnostic evaluation by a dermatologist or medical doctor to rule out clinically significant lesions. Do not apply harsh cosmetic acids or scrubs.'
    });
    allowNewActives = false;
    mustKeepRoutineBasic = true;
    reasonForBasicRoutine = 'Visible spots that bleed or change rapidly require clinical in-person assessment before active ingredients can be considered.';
  }

  if (hasSignificantPain || hasSpreadingRedness || hasEyeInvolvement) {
    flags.push({
      flag: 'Significant Pain, Spreading Redness, or Eye Proximity',
      severity: 'urgent_dermatology',
      guidance: 'Skin discomfort involving significant pain, spreading redness, warmth, or irritation near the eyelids/eyes can be a sign of infection, cellulitis, or ocular involvement. Please schedule an evaluation with a qualified physician.'
    });
    allowNewActives = false;
    mustKeepRoutineBasic = true;
    reasonForBasicRoutine = 'Symptoms of pain, spreading redness, or eye involvement require clinical triage.';
  }

  // 3. Adverse Reaction History
  const hasRecentAdverseReaction = data.allergiesAndReactions.trim().length > 3 || 
    data.recentProcedures.toLowerCase().includes('burn') || 
    data.recentProcedures.toLowerCase().includes('severe irritation') ||
    data.symptoms.includes('burning');

  if (hasRecentAdverseReaction) {
    flags.push({
      flag: 'Reported Recent Adverse Reaction or Active Burning Sensation',
      severity: 'adverse_reaction',
      guidance: 'Because you reported a recent reaction, active burning, or barrier sensitization, new active ingredients are paused. Stop using any newly introduced skincare products, rinse gently with lukewarm water, and focus exclusively on gentle barrier hydration. If irritation persists, consult a healthcare provider.'
    });
    allowNewActives = false;
    mustKeepRoutineBasic = true;
    reasonForBasicRoutine = 'Active irritation or adverse reaction reported: prioritizing gentle barrier rest.';
  }

  // 4. Current Prescription Treatments
  if (data.prescriptionTreatments.trim().length > 1) {
    flags.push({
      flag: 'Current Prescription Skin Treatment Active',
      severity: 'caution',
      guidance: `You noted using prescription skin treatments (${data.prescriptionTreatments}). Prescription therapies (such as topical tretinoin, clindamycin, or oral medications) alter skin sensitivity. We will not recommend competing active exfoliants or retinoids. Always prioritize the instructions given by your prescribing clinician.`
    });
    allowNewActives = false;
  }

  // 5. Pregnancy, Trying to Conceive, or Breastfeeding
  if (data.pregnancyStatus === 'pregnant' || data.pregnancyStatus === 'trying' || data.pregnancyStatus === 'breastfeeding') {
    flags.push({
      flag: 'Pregnancy or Nursing Considerations',
      severity: 'caution',
      guidance: 'Certain cosmetic ingredients (particularly topical retinoids and high-strength chemical exfoliants) should be avoided during pregnancy and nursing. We have excluded all retinoid guidance. Always verify topical ingredients with your obstetrician or midwife.'
    });
    // Disallow retinoids and limit actives
  }

  // 6. Recent Cosmetic Procedures or Sunburn
  if (data.recentProcedures.trim().length > 1 && !data.recentProcedures.toLowerCase().includes('none')) {
    flags.push({
      flag: 'Recent Procedure, Sunburn, or Peel Disclosed',
      severity: 'caution',
      guidance: 'Skin undergoing recovery from a recent procedure, sunburn, or clinical peel has a compromised stratum corneum. All exfoliating acids and active serums must be withheld until the epidermal barrier has fully recovered.'
    });
    allowNewActives = false;
    mustKeepRoutineBasic = true;
  }

  // 7. Severe or Distressing Acne-Like Concerns
  if (data.mainConcerns.includes('blemishes_acne_like') && (data.symptoms.includes('pain') || data.concernDuration === '> 1 year')) {
    flags.push({
      flag: 'Chronic or Painful Blemish Presentation',
      severity: 'urgent_dermatology',
      guidance: 'For persistent, scarring, painful, or distressing blemishes, over-the-counter cosmetic products have limited effectiveness. A consultation with a board-certified dermatologist offers access to proven medical therapies that help prevent scarring.'
    });
  }

  // 8. Missing Critical Safety Information
  if (!data.skinType || data.skinType === 'unsure') {
    flags.push({
      flag: 'Unconfirmed Skin Tolerance Baseline',
      severity: 'caution',
      guidance: 'Your baseline skin tolerance is unconfirmed. When tolerance is unknown, starting with gentle, fragrance-free barrier staples minimizes the risk of unwanted reactivity.'
    });
  }

  return {
    isEmergency,
    emergencyMessage,
    safetyFlags: flags,
    allowNewActives,
    mustKeepRoutineBasic,
    reasonForBasicRoutine
  };
}

export function sanitizeRoutine(
  morningSteps: RoutineStep[],
  eveningSteps: RoutineStep[],
  safetyCheck: SafetyCheckResult
): { morning: RoutineStep[]; evening: RoutineStep[] } {
  // If emergency or must keep basic: restrict strictly to gentle cleanser, moisturizer, and sunscreen
  if (safetyCheck.mustKeepRoutineBasic || !safetyCheck.allowNewActives) {
    const safeMorning: RoutineStep[] = [
      {
        step_number: 1,
        time_of_day: 'morning',
        category: 'Gentle Cleanser',
        suggested_action: 'Splash with lukewarm water or use a gentle, fragrance-free non-foaming cleanser.',
        frequency_schedule: 'Daily morning',
        precautions: 'Avoid vigorous scrubbing, hot water, or washcloth friction.',
        when_to_stop: 'If stinging occurs, switch to lukewarm water only.'
      },
      {
        step_number: 2,
        time_of_day: 'morning',
        category: 'Barrier Moisturizer',
        suggested_action: 'Apply a soothing, fragrance-free moisturizer containing ceramides, glycerin, or colloidal oat.',
        frequency_schedule: 'Daily morning',
        precautions: 'Apply while skin is slightly damp to lock in surface hydration.',
        when_to_stop: 'Discontinue if localized flushing occurs.'
      },
      {
        step_number: 3,
        time_of_day: 'morning',
        category: 'Broad-Spectrum Sunscreen (SPF 30+)',
        suggested_action: 'Generously apply broad-spectrum mineral or gentle sunscreen as the final morning step.',
        frequency_schedule: 'Daily morning; reapply if outdoors',
        precautions: 'Use approximately 1/4 teaspoon for full face and neck coverage.',
        when_to_stop: 'If stinging or eye watering occurs, try a 100% mineral (zinc oxide) formula.'
      }
    ];

    const safeEvening: RoutineStep[] = [
      {
        step_number: 1,
        time_of_day: 'evening',
        category: 'Gentle Cleanser',
        suggested_action: 'Gently cleanse to remove surface dust, sebum, and sunscreen with lukewarm water.',
        frequency_schedule: 'Daily evening',
        precautions: 'Massage gently with fingertips for 30–60 seconds; do not use rough brushes.',
        when_to_stop: 'If skin feels tight or stripped, reduce washing duration.'
      },
      {
        step_number: 2,
        time_of_day: 'evening',
        category: 'Barrier Moisturizer',
        suggested_action: 'Apply an emollient barrier cream to support overnight stratum corneum recovery.',
        frequency_schedule: 'Daily evening',
        precautions: 'Focus on dry or flaky zones.',
        when_to_stop: 'If breakouts develop in previously clear zones, choose a lighter gel-cream formula.'
      }
    ];

    return { morning: safeMorning, evening: safeEvening };
  }

  // Ensure no more than ONE optional active total across the entire routine
  let activeCount = 0;
  const filteredMorning = morningSteps.filter((step) => {
    const isTreatment = step.category.toLowerCase().includes('serum') ||
      step.category.toLowerCase().includes('acid') ||
      step.category.toLowerCase().includes('exfoliant') ||
      step.category.toLowerCase().includes('retinoid') ||
      step.category.toLowerCase().includes('treatment');

    if (isTreatment) {
      if (activeCount >= 1) return false;
      activeCount++;
    }
    return true;
  });

  const filteredEvening = eveningSteps.filter((step) => {
    const isTreatment = step.category.toLowerCase().includes('serum') ||
      step.category.toLowerCase().includes('acid') ||
      step.category.toLowerCase().includes('exfoliant') ||
      step.category.toLowerCase().includes('retinoid') ||
      step.category.toLowerCase().includes('treatment');

    if (isTreatment) {
      if (activeCount >= 1) return false;
      activeCount++;
    }
    return true;
  });

  return { morning: filteredMorning, evening: filteredEvening };
}

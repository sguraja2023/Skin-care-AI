import { AnalysisResult } from '../types/skincare';

export const SAMPLE_PROFILES: { id: string; label: string; description: string; result: AnalysisResult }[] = [
  {
    id: 'blemishes-and-redness',
    label: 'Profile 1: Visible Blemishes & Mild Redness',
    description: 'Combination skin with occasional blemishes in the T-zone and mild surface redness on the cheeks.',
    result: {
      image_quality: 'acceptable',
      image_quality_reasons: ['Good ambient natural lighting', 'Neutral expression and clear focal alignment'],
      observations: [
        {
          plain_language_description: 'Scattered superficial blemishes that may resemble mild acne',
          approximate_region: 'Forehead and chin area',
          certainty: 'supported',
          confounding_factors: 'Slight glare from ambient light could highlight surface texture.'
        },
        {
          plain_language_description: 'Mild visible surface redness',
          approximate_region: 'Mid-cheek areas bilaterally',
          certainty: 'uncertain',
          confounding_factors: 'Temperature changes, post-wash flushing, or natural vasomotor tone can simulate surface redness in digital photos.'
        },
        {
          plain_language_description: 'Visible surface shine in the central facial zone',
          approximate_region: 'Forehead and nose bridge',
          certainty: 'uncertain',
          confounding_factors: 'Directional lighting or moisturizer residue can reflect light even on dry skin types.'
        }
      ],
      user_reported_context: 'User reported combination skin, occasional blemish breakouts for ~4 months, and mild reactivity to fragrances.',
      limitations: [
        'A photo cannot differentiate between inflammatory acne vulgaris, fungal folliculitis, or contact dermatitis.',
        'Visible shine in photos does not confirm hyperactive sebaceous glands; skin type is validated via the questionnaire.',
        'Subsurface follicular depth, bacterial balance, and stratum corneum hydration cannot be measured digitally.'
      ],
      follow_up_questions: [
        'Do the blemishes feel tender or deep under the skin, or are they primarily surface-level?',
        'Does the visible cheek redness flare after hot beverages, sun exposure, or stress?'
      ],
      safety_flags: [
        {
          flag: 'Mild Surface Flushing Observed',
          severity: 'caution',
          guidance: 'If facial flushing is persistent, stings with skincare products, or develops visible spider veins, an in-person assessment by a dermatologist can evaluate for conditions such as rosacea.'
        }
      ],
      routine: {
        morning: [
          {
            step_number: 1,
            time_of_day: 'morning',
            category: 'Gentle Cleanser',
            suggested_action: 'Wash face with a gentle, non-stripping foaming gel or lotion cleanser and lukewarm water.',
            frequency_schedule: 'Daily each morning',
            precautions: 'Do not use abrasive sponges or scrubbing motions.',
            when_to_stop: 'If face feels tight or dry after cleansing, switch to splashing with cool water only.'
          },
          {
            step_number: 2,
            time_of_day: 'morning',
            category: 'Lightweight Barrier Moisturizer',
            suggested_action: 'Apply an oil-free, fragrance-free gel-cream containing ceramides and glycerin.',
            frequency_schedule: 'Daily each morning',
            precautions: 'Smooth gently over damp skin.',
            when_to_stop: 'Discontinue if localized irritation occurs.'
          },
          {
            step_number: 3,
            time_of_day: 'morning',
            category: 'Broad-Spectrum Sunscreen (SPF 30+)',
            suggested_action: 'Apply broad-spectrum mineral or light fluid sunscreen to shield blemishes from post-inflammatory pigment darkening.',
            frequency_schedule: 'Daily morning; reapply if outside',
            precautions: 'Ensure full coverage across ears and neck.',
            when_to_stop: 'Try an all-mineral zinc oxide formula if eyes sting.'
          }
        ],
        evening: [
          {
            step_number: 1,
            time_of_day: 'evening',
            category: 'Gentle Cleanser',
            suggested_action: 'Cleanse thoroughly with gentle cleanser to remove sunscreen and daily debris.',
            frequency_schedule: 'Daily each evening',
            precautions: 'Rinse thoroughly with lukewarm water.',
            when_to_stop: 'Avoid hot water which exacerbates redness.'
          },
          {
            step_number: 2,
            time_of_day: 'evening',
            category: 'Optional Targeted Active: Salicylic Acid (BHA 1-2%)',
            suggested_action: 'Apply a thin layer of cosmetic BHA liquid or lotion to target congested pore areas.',
            frequency_schedule: 'Start 1–2 evenings per week only; never daily at first',
            precautions: 'Always patch test on your inner arm first. Do not apply near eyes or on broken skin.',
            when_to_stop: 'Discontinue immediately if peeling, stinging, or heightened sensitivity occurs.'
          },
          {
            step_number: 3,
            time_of_day: 'evening',
            category: 'Barrier Moisturizer',
            suggested_action: 'Seal in hydration with a soothing ceramide moisturizer.',
            frequency_schedule: 'Daily each evening',
            precautions: 'Wait 2 minutes after applying BHA before smoothing moisturizer over face.',
            when_to_stop: 'If skin feels dry, increase moisturizer amount.'
          }
        ],
        patch_test_guidance: 'Apply a pea-sized amount of any new active product to a small patch behind your ear or inner forearm once daily for 3 consecutive days. Check for redness, itching, or swelling before facial application. Note: patch testing does not guarantee zero facial tolerance issues.',
        notes: 'Noticeable cosmetic improvement typically takes 6 to 12 weeks of consistent gentle care. Avoid adding any other new active ingredients during this acclimation window.'
      },
      ingredient_options: [
        {
          name: 'Salicylic Acid (BHA 1–2%)',
          purpose: 'Helps gently exfoliate dead surface cells inside pore linings to manage mild blemishes.',
          cautious_notes: 'Introduce slowly (1–2x weekly). Discontinue if dryness or peeling develops.'
        },
        {
          name: 'Niacinamide (2–5%)',
          purpose: 'Helps calm the appearance of visible surface redness and support skin barrier lipids.',
          cautious_notes: 'High concentrations (10%+) may cause transient flushing in sensitive individuals.'
        }
      ],
      professional_care_guidance: [
        {
          treatment: 'Superficial Dermatologic Chemical Peel',
          purpose: 'May assist in clearing stubborn surface congestion under professional supervision.',
          in_person_reason: 'Requires in-person skin evaluation to determine appropriate acid concentration and monitor skin response.',
          risks: 'Mild redness, temporary flaking, and potential post-inflammatory pigment changes.'
        }
      ],
      sources: [
        {
          title: 'Acne: Overview and Over-the-counter Management',
          organization: 'American Academy of Dermatology (AAD)',
          url: 'https://www.aad.org',
          year: '2026'
        },
        {
          title: 'Facial Erythema and Sensitive Skin Management',
          organization: 'British Association of Dermatologists',
          url: 'https://www.bad.org.uk',
          year: '2025'
        }
      ],
      is_demo_mode: true,
      analyzed_at: new Date().toISOString()
    }
  },
  {
    id: 'dark-spots-uneven-tone',
    label: 'Profile 2: Visible Dark Spots & Uneven Tone',
    description: 'Post-blemish dark marks and uneven surface tone with otherwise balanced barrier.',
    result: {
      image_quality: 'acceptable',
      image_quality_reasons: ['Balanced focus and clear facial exposure'],
      observations: [
        {
          plain_language_description: 'Visible small localized dark spots (post-blemish pigment marks)',
          approximate_region: 'Lower cheeks and jawline',
          certainty: 'supported',
          confounding_factors: 'Shadowing along the lower jaw can accentuate perceived depth of pigment.'
        },
        {
          plain_language_description: 'Mild uneven tone across upper cheeks',
          approximate_region: 'Upper cheeks and bridge of nose',
          certainty: 'supported',
          confounding_factors: 'Incidental sun exposure or light reflections may mimic pigment unevenness.'
        }
      ],
      user_reported_context: 'User reported dry-to-balanced skin, concern with stubborn post-blemish spots following past breakouts.',
      limitations: [
        'A photo cannot differentiate between superficial post-inflammatory hyperpigmentation, melasma, lentigines, or atypical pigmented lesions.',
        'Any single spot that is irregularly shaped, multicoloured, or changing requires clinical dermoscopy by a physician.',
        'Depth of melanin deposits (epidermal vs. dermal) cannot be diagnosed through photography.'
      ],
      follow_up_questions: [
        'Have any of the dark spots changed in size, shape, or darkness over recent weeks?',
        'Do the marks become noticeably darker after sun exposure or heat?'
      ],
      safety_flags: [
        {
          flag: 'Pigmented Spots Requiring Routine Clinical Surveillance',
          severity: 'caution',
          guidance: 'While most post-breakout dark marks are cosmetic hyperpigmentation, any mole or dark lesion that exhibits asymmetry, irregular borders, or color variation must be evaluated by a dermatologist using dermoscopy.'
        }
      ],
      routine: {
        morning: [
          {
            step_number: 1,
            time_of_day: 'morning',
            category: 'Gentle Hydrating Cleanser',
            suggested_action: 'Cleanse with a non-foaming cream cleanser and rinse with lukewarm water.',
            frequency_schedule: 'Daily morning',
            precautions: 'Do not use scrubbing grains or harsh brushes.',
            when_to_stop: 'If feeling stripped, rinse with water only.'
          },
          {
            step_number: 2,
            time_of_day: 'morning',
            category: 'Moisturizer with Antioxidants / Niacinamide',
            suggested_action: 'Apply a soothing lotion containing ceramides and 2-4% niacinamide.',
            frequency_schedule: 'Daily morning',
            precautions: 'Spread evenly over face and neck.',
            when_to_stop: 'Discontinue if stinging occurs.'
          },
          {
            step_number: 3,
            time_of_day: 'morning',
            category: 'Broad-Spectrum High-SPF Sunscreen (SPF 50)',
            suggested_action: 'Generously apply broad-spectrum sunscreen. UV exposure directly stimulates melanin synthesis and darkens spots.',
            frequency_schedule: 'Daily morning; reapply if outdoors',
            precautions: 'Use adequate quantity (1/4 tsp for face).',
            when_to_stop: 'Switch brands if eye stinging occurs.'
          }
        ],
        evening: [
          {
            step_number: 1,
            time_of_day: 'evening',
            category: 'Gentle Cleanser',
            suggested_action: 'Wash face gently to lift away SPF and environmental impurities.',
            frequency_schedule: 'Daily evening',
            precautions: 'Pat dry gently with a clean towel; avoid friction.',
            when_to_stop: 'If dryness occurs, use lukewarm water.'
          },
          {
            step_number: 2,
            time_of_day: 'evening',
            category: 'Optional Targeted Active: Azelaic Acid 10%',
            suggested_action: 'Smooth a pea-sized amount of cosmetic 10% Azelaic Acid over areas of uneven tone.',
            frequency_schedule: 'Start 2 evenings per week; build to every other night as tolerated',
            precautions: 'Mild temporary tingling is common for 5 minutes. Apply over moisturizer if sensitive.',
            when_to_stop: 'Stop if prolonged redness, burning, or itchiness develops.'
          },
          {
            step_number: 3,
            time_of_day: 'evening',
            category: 'Barrier Repair Cream',
            suggested_action: 'Apply a rich ceramide cream to lock in stratum corneum hydration.',
            frequency_schedule: 'Daily evening',
            precautions: 'Apply evenly over face and neck.',
            when_to_stop: 'Reduce amount if feeling overly occlusive.'
          }
        ],
        patch_test_guidance: 'Apply a small dab of the azelaic acid to your forearm for 3 consecutive days prior to applying to facial skin. Discontinue if redness or hives appear.',
        notes: 'Post-blemish dark spots resolve slowly over 3–6 months. Diligent daily sun protection is the single most impactful factor in fading visible pigment.'
      },
      ingredient_options: [
        {
          name: 'Azelaic Acid 10%',
          purpose: 'Helps visibly even out post-blemish discoloration and calm surface skin.',
          cautious_notes: 'Introduce gradually. Can cause mild tingling on first few applications.'
        },
        {
          name: 'Niacinamide (Vitamin B3)',
          purpose: 'Supports barrier lipid synthesis and assists in uniform skin tone appearance.',
          cautious_notes: 'Pairs harmoniously with azelaic acid and sunscreen.'
        }
      ],
      professional_care_guidance: [
        {
          treatment: 'In-Clinic Superficial Chemical Peel',
          purpose: 'May help accelerate superficial epidermal exfoliation for stubborn post-inflammatory discoloration.',
          in_person_reason: 'Professional skin phototype evaluation is critical, particularly for melanin-rich skin to prevent paradoxical hyperpigmentation.',
          risks: 'Peeling, transient redness, risk of post-inflammatory marks if improperly neutralized.'
        }
      ],
      sources: [
        {
          title: 'Post-Inflammatory Hyperpigmentation: Clinical Assessment and Management',
          organization: 'DermNet NZ',
          url: 'https://dermnetnz.org',
          year: '2026'
        },
        {
          title: 'Photoprotection and Pigment Disorders',
          organization: 'American Academy of Dermatology (AAD)',
          url: 'https://www.aad.org',
          year: '2025'
        }
      ],
      is_demo_mode: true,
      analyzed_at: new Date().toISOString()
    }
  }
];

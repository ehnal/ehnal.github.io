  wells_criteria_for_pulmonary_embolism: {
  id: 'wells_criteria_for_pulmonary_embolism',
  name: 'Wells肺栓塞评分',
  description: '用于评估肺栓塞的可能性',
  sections: [
    {
      id: 'clinical_signs_and_symptoms_of_dvt',
      title: '深静脉血栓的临床症状和体征',
      name: 'clinical_signs_and_symptoms_of_dvt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'pe_is_1_diagnosis_or_equally_likely',
      title: '肺栓塞为首要诊断或同等可能',
      name: 'pe_is_1_diagnosis_or_equally_likely',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'heart_rate_gt_100',
      title: '心率 > 100',
      name: 'heart_rate_gt_100',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1.5', score: 1.5, label: '是', checked: false }
      ]
    },
    {
      id: 'immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks',
      title: '至少3天的制动或过去4周内手术',
      name: 'immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1.5', score: 1.5, label: '是', checked: false }
      ]
    },
    {
      id: 'previous_objectively_diagnosed_pe_or_dvt',
      title: '既往客观诊断的肺栓塞或深静脉血栓',
      name: 'previous_objectively_diagnosed_pe_or_dvt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1.5', score: 1.5, label: '是', checked: false }
      ]
    },
    {
      id: 'hemoptysis',
      title: '咯血',
      name: 'hemoptysis',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'malignancy_w_treatment_within_6_months_or_palliative',
      title: '恶性肿瘤且在6个月内接受治疗或姑息治疗',
      name: 'malignancy_w_treatment_within_6_months_or_palliative',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    }
  ],
  maxScore: 12.5,
  calculateScore: (values) => {
    const clinicalSigns = parseFloat(values.clinical_signs_and_symptoms_of_dvt) || 0;
    const peDiagnosis = parseFloat(values.pe_is_1_diagnosis_or_equally_likely) || 0;
    const heartRate = parseFloat(values.heart_rate_gt_100) || 0;
    const immobilization = parseFloat(values.immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks) || 0;
    const previousPE = parseFloat(values.previous_objectively_diagnosed_pe_or_dvt) || 0;
    const hemoptysis = parseFloat(values.hemoptysis) || 0;
    const malignancy = parseFloat(values.malignancy_w_treatment_within_6_months_or_palliative) || 0;

    return clinicalSigns + peDiagnosis + heartRate + immobilization + previousPE + hemoptysis + malignancy;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `深静脉血栓: ${values.clinical_signs_and_symptoms_of_dvt}, 肺栓塞诊断: ${values.pe_is_1_diagnosis_or_equally_likely}, 心率: ${values.heart_rate_gt_100}, 制动/手术: ${values.immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks}, 既往肺栓塞: ${values.previous_objectively_diagnosed_pe_or_dvt}, 咯血: ${values.hemoptysis}, 恶性肿瘤: ${values.malignancy_w_treatment_within_6_months_or_palliative}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 4,
      risk: '低风险',
      text: '肺栓塞可能性低，建议进一步排除其他诊断。'
    },
    {
      condition: (score) => score > 4 && score <= 6,
      risk: '中风险',
      text: '肺栓塞可能性中等，建议进行影像学检查以确认诊断。'
    },
    {
      condition: (score) => score > 6,
      risk: '高风险',
      text: '肺栓塞可能性高，建议立即进行影像学检查并启动治疗。'
    }
  ]
}
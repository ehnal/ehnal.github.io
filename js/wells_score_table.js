  wells: {
  id: 'wells',
  name: 'Wells肺栓塞评分',
  description: '用于评估肺栓塞的可能性',
  sections: [
    {
      id: 'history_pe_dvt',
      title: '既往肺栓塞或深静脉血栓',
      name: 'history_pe_dvt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'heart_rate',
      title: '心率>100次/分钟',
      name: 'heart_rate',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '心率大于100次/分钟', checked: false }
      ]
    },
    {
      id: 'recent_surgery',
      title: '过去4周内手术或制动',
      name: 'recent_surgery',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '过去4周内有手术或制动', checked: false }
      ]
    },
    {
      id: 'hemoptysis',
      title: '咯血',
      name: 'hemoptysis',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有咯血', checked: false }
      ]
    },
    {
      id: 'active_cancer',
      title: '活动性癌症',
      name: 'active_cancer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有活动性癌症', checked: false }
      ]
    },
    {
      id: 'dvt_signs',
      title: '深静脉血栓临床体征',
      name: 'dvt_signs',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '3', score: 3, label: '有深静脉血栓临床体征', checked: false }
      ]
    },
    {
      id: 'pe_more_likely',
      title: '其他诊断可能性小于肺栓塞',
      name: 'pe_more_likely',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '3', score: 3, label: '其他诊断可能性小于肺栓塞', checked: false }
      ]
    }
  ],
  maxScore: 12,
  calculateScore: (values) => {
    const history_pe_dvt = parseInt(values.history_pe_dvt) || 0;
    const heart_rate = parseInt(values.heart_rate) || 0;
    const recent_surgery = parseInt(values.recent_surgery) || 0;
    const hemoptysis = parseInt(values.hemoptysis) || 0;
    const active_cancer = parseInt(values.active_cancer) || 0;
    const dvt_signs = parseInt(values.dvt_signs) || 0;
    const pe_more_likely = parseInt(values.pe_more_likely) || 0;

    return history_pe_dvt + heart_rate + recent_surgery + hemoptysis + active_cancer + dvt_signs + pe_more_likely;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `既往肺栓塞/深静脉血栓: ${values.history_pe_dvt}, 心率: ${values.heart_rate}, 手术/制动: ${values.recent_surgery}, 咯血: ${values.hemoptysis}, 活动性癌症: ${values.active_cancer}, 深静脉血栓体征: ${values.dvt_signs}, 其他诊断可能性: ${values.pe_more_likely}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 4,
      risk: '肺栓塞不太可能',
      text: '原始版本：0–4分；简化版本：0–1分。建议进一步检查以排除肺栓塞。'
    },
    {
      condition: (score) => score >= 5,
      risk: '肺栓塞可能',
      text: '原始版本：≥5分；简化版本：≥2分。建议进一步检查以确诊肺栓塞。'
    }
  ]
}
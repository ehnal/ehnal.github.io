  heart_score: {
  id: 'heart_score',
  name: 'HEART评分',
  description: '用于评估胸痛患者的心血管事件风险',
  sections: [
    {
      id: 'history',
      title: '病史',
      name: 'history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '稍微可疑', checked: true },
        { value: '1', score: 1, label: '中等可疑', checked: false },
        { value: '2', score: 2, label: '高度可疑', checked: false }
      ]
    },
    {
      id: 'ekg',
      title: '心电图',
      name: 'ekg',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常', checked: true },
        { value: '1', score: 1, label: '非特异性复极化异常', checked: false },
        { value: '2', score: 2, label: '显著ST段偏移', checked: false }
      ]
    },
    {
      id: 'age',
      title: '年龄',
      name: 'age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<45', checked: true },
        { value: '1', score: 1, label: '45-64', checked: false },
        { value: '2', score: 2, label: '≥65', checked: false }
      ]
    },
    {
      id: 'risk_factors',
      title: '风险因素',
      name: 'risk_factors',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无已知风险因素', checked: true },
        { value: '1', score: 1, label: '1-2个风险因素', checked: false },
        { value: '2', score: 2, label: '≥3个风险因素或有动脉粥样硬化疾病史', checked: false }
      ]
    },
    {
      id: 'initial_troponin',
      title: '初始肌钙蛋白',
      name: 'initial_troponin',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≤正常限值', checked: true },
        { value: '1', score: 1, label: '1-3倍正常限值', checked: false },
        { value: '2', score: 2, label: '>3倍正常限值', checked: false }
      ]
    }
  ],
  maxScore: 10,
  calculateScore: (values) => {
    const history = parseInt(values.history) || 0;
    const ekg = parseInt(values.ekg) || 0;
    const age = parseInt(values.age) || 0;
    const riskFactors = parseInt(values.risk_factors) || 0;
    const initialTroponin = parseInt(values.initial_troponin) || 0;
    return history + ekg + age + riskFactors + initialTroponin;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `病史: ${values.history}, 心电图: ${values.ekg}, 年龄: ${values.age}, 风险因素: ${values.risk_factors}, 肌钙蛋白: ${values.initial_troponin}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 3,
      risk: '低风险',
      text: '建议门诊随访或观察。'
    },
    {
      condition: (score) => score >= 4 && score <= 6,
      risk: '中风险',
      text: '建议住院观察并进一步检查。'
    },
    {
      condition: (score) => score >= 7,
      risk: '高风险',
      text: '建议立即住院并启动积极治疗。'
    }
  ]
}
  cdss: {
  id: 'cdss',
  name: 'CDSS评分',
  description: '用于评估弥散性血管内凝血（DIC）的严重程度',
  sections: [
    {
      id: 'primary_disease',
      title: '存在导致 DIC 的原发病',
      name: 'primary_disease',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '2', score: 2, label: '有', checked: false }
      ]
    },
    {
      id: 'bleeding_tendency',
      title: '不能用原发病解释的严重或多发出血倾向',
      name: 'bleeding_tendency',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'microcirculation_disorder',
      title: '不能用原发病解释的微循环障碍或休克',
      name: 'microcirculation_disorder',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'organ_dysfunction',
      title: '广泛性皮肤、黏膜栓塞，灶性缺血性坏死、脱落及溃疡形成，不宁原因的肺、肾、脑等脏器功能障碍',
      name: 'organ_dysfunction',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'platelet_count_non_malignant',
      title: '血小板计数（非恶性血液病）',
      name: 'platelet_count_non_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≥100*10^9/L', checked: true },
        { value: '1', score: 1, label: '80-<100*10^9/L', checked: false },
        { value: '2', score: 2, label: '<80*10^9/L', checked: false }
      ]
    },
    {
      id: 'platelet_drop_non_malignant',
      title: '血小板计数（非恶性血液病）24h内下降',
      name: 'platelet_drop_non_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '未下降', checked: true },
        { value: '1', score: 1, label: '≥50%', checked: false }
      ]
    },
    {
      id: 'platelet_count_malignant',
      title: '血小板计数（恶性血液病）',
      name: 'platelet_count_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≥50*10^9/L', checked: true },
        { value: '1', score: 1, label: '<50*10^9/L', checked: false }
      ]
    },
    {
      id: 'platelet_drop_malignant',
      title: '血小板计数（恶性血液病）24h内下降',
      name: 'platelet_drop_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '未下降', checked: true },
        { value: '1', score: 1, label: '≥50%', checked: false }
      ]
    },
    {
      id: 'd_dimer',
      title: 'D-2聚体',
      name: 'd_dimer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<5mg/L', checked: true },
        { value: '2', score: 2, label: '5-<9mg/L', checked: false },
        { value: '3', score: 3, label: '≥9mg/L', checked: false }
      ]
    },
    {
      id: 'pt_aptt',
      title: 'PT及APTT延长',
      name: 'pt_aptt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: 'PT延长<3s且APTT延长<10s', checked: true },
        { value: '1', score: 1, label: 'PT延长≥3s且APTT延长≥10s', checked: false },
        { value: '2', score: 2, label: 'PT延长≥6s', checked: false }
      ]
    },
    {
      id: 'fibrinogen',
      title: '纤维蛋白原',
      name: 'fibrinogen',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≥1.0g/L', checked: true },
        { value: '1', score: 1, label: '<1.0g/L', checked: false }
      ]
    }
  ],
  maxScore: 20,
  calculateScore: (values) => {
    return Object.keys(values).reduce((total, key) => total + (parseInt(values[key]) || 0), 0);
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: Object.keys(values)
        .map((key) => `${key}: ${values[key]}`)
        .join(', ')
    };
  },
  interpretations: [
    {
      condition: (score) => score < 5,
      risk: '低风险',
      text: 'DIC风险较低，建议密切观察。'
    },
    {
      condition: (score) => score >= 5 && score <= 9,
      risk: '中风险',
      text: '存在DIC中度风险，建议进一步检查和治疗。'
    },
    {
      condition: (score) => score > 9,
      risk: '高风险',
      text: 'DIC高风险，需立即干预和治疗。'
    }
  ]
}
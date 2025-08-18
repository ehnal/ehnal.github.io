  child_pugh: {
  id: 'child_pugh',
  name: 'Child-Pugh评分',
  description: '用于评估慢性肝病患者的肝功能状态及预后',
  sections: [
    {
      id: 'bilirubin',
      title: '总胆红素',
      name: 'bilirubin',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '<2 mg/dL (<34.2 µmol/L)', checked: true },
        { value: '2', score: 2, label: '2-3 mg/dL (34.2-51.3 µmol/L)', checked: false },
        { value: '3', score: 3, label: '>3 mg/dL (>51.3 µmol/L)', checked: false }
      ]
    },
    {
      id: 'albumin',
      title: '白蛋白',
      name: 'albumin',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '>3.5 g/dL (>35 g/L)', checked: true },
        { value: '2', score: 2, label: '2.8-3.5 g/dL (28-35 g/L)', checked: false },
        { value: '3', score: 3, label: '<2.8 g/dL (<28 g/L)', checked: false }
      ]
    },
    {
      id: 'inr',
      title: '国际标准化比率',
      name: 'inr',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '<1.7', checked: true },
        { value: '2', score: 2, label: '1.7-2.3', checked: false },
        { value: '3', score: 3, label: '>2.3', checked: false }
      ]
    },
    {
      id: 'ascites',
      title: '腹水',
      name: 'ascites',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '没有', checked: true },
        { value: '2', score: 2, label: '轻度', checked: false },
        { value: '3', score: 3, label: '中度', checked: false }
      ]
    },
    {
      id: 'encephalopathy',
      title: '肝性脑病',
      name: 'encephalopathy',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '无脑病', checked: true },
        { value: '2', score: 2, label: '1-2级', checked: false },
        { value: '3', score: 3, label: '3-4级', checked: false }
      ]
    }
  ],
  maxScore: 15,
  calculateScore: (values) => {
    const bilirubin = parseInt(values.bilirubin) || 0;
    const albumin = parseInt(values.albumin) || 0;
    const inr = parseInt(values.inr) || 0;
    const ascites = parseInt(values.ascites) || 0;
    const encephalopathy = parseInt(values.encephalopathy) || 0;
    return bilirubin + albumin + inr + ascites + encephalopathy;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `总胆红素: ${values.bilirubin}, 白蛋白: ${values.albumin}, INR: ${values.inr}, 腹水: ${values.ascites}, 肝性脑病: ${values.encephalopathy}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 6,
      risk: 'A级',
      text: '肝功能良好，预后较好。'
    },
    {
      condition: (score) => score >= 7 && score <= 9,
      risk: 'B级',
      text: '肝功能中度受损，需密切监测。'
    },
    {
      condition: (score) => score >= 10,
      risk: 'C级',
      text: '肝功能严重受损，预后较差，需积极治疗。'
    }
  ]
}
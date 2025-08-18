  chadsvasc: {
  id: 'chadsvasc',
  name: 'CHA2DS2-VASc评分',
  description: '用于评估房颤患者的卒中风险',
  sections: [
    {
      id: 'age',
      title: '年龄',
      name: 'age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<65', checked: true },
        { value: '1', score: 1, label: '65-74', checked: false },
        { value: '2', score: 2, label: '≥75', checked: false }
      ]
    },
    {
      id: 'sex',
      title: '性别',
      name: 'sex',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '男性', checked: true },
        { value: '1', score: 1, label: '女性', checked: false }
      ]
    },
    {
      id: 'chf_history',
      title: '充血性心力衰竭病史',
      name: 'chf_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'hypertension_history',
      title: '高血压病史',
      name: 'hypertension_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'stroke_tia_thromboembolism_history',
      title: '中风/TIA/血栓栓塞病史',
      name: 'stroke_tia_thromboembolism_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '2', score: 2, label: '有', checked: false }
      ]
    },
    {
      id: 'vascular_disease_history',
      title: '血管疾病病史（既往心肌梗死、外周动脉疾病或主动脉斑块）',
      name: 'vascular_disease_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'diabetes_history',
      title: '糖尿病病史',
      name: 'diabetes_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    }
  ],
  maxScore: 9,
  calculateScore: (values) => {
    const age = parseInt(values.age) || 0;
    const sex = parseInt(values.sex) || 0;
    const chfHistory = parseInt(values.chf_history) || 0;
    const hypertensionHistory = parseInt(values.hypertension_history) || 0;
    const strokeTiaThromboembolismHistory = parseInt(values.stroke_tia_thromboembolism_history) || 0;
    const vascularDiseaseHistory = parseInt(values.vascular_disease_history) || 0;
    const diabetesHistory = parseInt(values.diabetes_history) || 0;

    return age + sex + chfHistory + hypertensionHistory + strokeTiaThromboembolismHistory + vascularDiseaseHistory + diabetesHistory;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `年龄: ${values.age}, 性别: ${values.sex}, CHF病史: ${values.chf_history}, 高血压病史: ${values.hypertension_history}, 中风/TIA/血栓病史: ${values.stroke_tia_thromboembolism_history}, 血管疾病病史: ${values.vascular_disease_history}, 糖尿病病史: ${values.diabetes_history}`
    };
  },
  interpretations: [
    {
      condition: (score) => score === 0,
      risk: '低风险',
      text: '卒中风险极低，无需抗凝治疗。'
    },
    {
      condition: (score) => score >= 1 && score <= 2,
      risk: '中风险',
      text: '建议根据患者具体情况考虑抗凝治疗。'
    },
    {
      condition: (score) => score > 2,
      risk: '高风险',
      text: '卒中风险高，强烈建议抗凝治疗。'
    }
  ]
}
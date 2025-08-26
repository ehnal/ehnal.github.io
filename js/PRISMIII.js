  prismiii: {
  id: 'prismiii',
  name: 'PRISM III评分',
  description: '用于评估儿童重症监护病房患者的病情严重程度',
  sections: [
    {
      id: 'systolic_blood_pressure',
      title: '收缩压（mmHg）',
      name: 'systolic_blood_pressure',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 40–55；婴儿 45–65；儿童 55–75；青少年 65–85', checked: false },
        { value: '7', score: 7, label: '新生儿 <40；婴儿 <45；儿童 <55；青少年 <65', checked: false }
      ]
    },
    {
      id: 'heart_rate',
      title: '心率（次/分）',
      name: 'heart_rate',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 215–225；婴儿 215–225；儿童 185–205；青少年 145–155', checked: false },
        { value: '7', score: 7, label: '新生儿 >225；婴儿 >225；儿童 >205；青少年 >155', checked: false }
      ]
    },
    {
      id: 'temperature',
      title: '体温',
      name: 'temperature',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '所有年龄 <33℃（91.4℉）或 >40℃（104.0℉）', checked: false }
      ]
    },
    {
      id: 'pupillary_reflexes',
      title: '瞳孔反射',
      name: 'pupillary_reflexes',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '7', score: 7, label: '所有年龄 一侧消失', checked: false },
        { value: '11', score: 11, label: '所有年龄 双侧消失', checked: false }
      ]
    },
    {
      id: 'mental_status',
      title: '神志状态',
      name: 'mental_status',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '5', score: 5, label: '所有年龄 昏迷（GCS <8）', checked: false }
      ]
    },
    {
      id: 'acidosis',
      title: '酸中毒 (总CO₂或pH)',
      name: 'acidosis',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 pH=7.0–7.28 或 TCO₂ 5–16.9 mmol/L', checked: false },
        { value: '6', score: 6, label: '所有年龄 pH<7.0 或 TCO₂ <5 mmol/L', checked: false }
      ]
    },
    {
      id: 'total_co2',
      title: 'CO₂总含量 (mmol/L)',
      name: 'total_co2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '4', score: 4, label: '所有年龄 >34 mmol/L', checked: false }
      ]
    },
    {
      id: 'ph',
      title: 'pH',
      name: 'ph',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 7.48–7.55', checked: false },
        { value: '3', score: 3, label: '所有年龄 >7.55', checked: false }
      ]
    },
    {
      id: 'pao2',
      title: '动脉氧分压 (PaO₂, mmHg)',
      name: 'pao2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '所有年龄 42–49.9', checked: false },
        { value: '6', score: 6, label: '所有年龄 <42.0', checked: false }
      ]
    },
    {
      id: 'pco2',
      title: '动脉二氧化碳分压 (PaCO₂, mmHg)',
      name: 'pco2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '1', score: 1, label: '所有年龄 50–75', checked: false },
        { value: '3', score: 3, label: '所有年龄 >75', checked: false }
      ]
    },
    {
      id: 'glucose',
      title: '血糖',
      name: 'glucose',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 >200 mg/dL 或 >11 mmol/L', checked: false }
      ]
    },
    {
      id: 'potassium',
      title: '血钾',
      name: 'potassium',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '所有年龄 >6.9 mmol/L', checked: false }
      ]
    },
    {
      id: 'creatinine',
      title: '肌酐',
      name: 'creatinine',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '新生儿 >0.85 mg/dL 或 >75 μmol/L；婴儿 >0.90 mg/dL 或 >80 μmol/L；儿童 >0.90 mg/dL 或 >80 μmol/L；青少年 >1.30 mg/dL 或 >115 μmol/L', checked: false }
      ]
    },
    {
      id: 'bun',
      title: '血尿素氮 (BUN)',
      name: 'bun',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 >11.9 mg/dL 或 >4.3 μmol/L；其他年龄 >14.9 mg/dL 或 >5.4 μmol/L', checked: false }
      ]
    },
    {
      id: 'wbc',
      title: '白细胞计数 (cells/mm³)',
      name: 'wbc',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '4', score: 4, label: '所有年龄 <3000', checked: false }
      ]
    },
    {
      id: 'platelet',
      title: '血小板计数 (cells/mm³)',
      name: 'platelet',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 100,000–200,000', checked: false },
        { value: '4', score: 4, label: '所有年龄 50,000–99,999', checked: false },
        { value: '5', score: 5, label: '所有年龄 <50,000', checked: false }
      ]
    },
    {
      id: 'pt_aptt',
      title: 'PT或APTT (s)',
      name: 'pt_aptt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 PT>22.0 或 PTT>85.0；其他年龄 PT>22.0 或 PTT>57.0', checked: false }
      ]
    }
  ],
  maxScore: 74,
  calculateScore: (values) => {
    return Object.values(values).reduce((total, value) => total + (parseInt(value) || 0), 0);
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `各项评分: ${JSON.stringify(values)}`
    };
  },
  interpretations: [
    {
      condition: (score) => score < 10,
      risk: '低风险',
      text: '病情较轻，建议密切观察。'
    },
    {
      condition: (score) => score >= 10 && score < 20,
      risk: '中风险',
      text: '病情中等，建议加强监护。'
    },
    {
      condition: (score) => score >= 20,
      risk: '高风险',
      text: '病情严重，建议立即采取积极治疗措施。'
    }
  ]
}
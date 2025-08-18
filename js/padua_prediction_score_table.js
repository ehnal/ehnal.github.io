  padua: {
  id: 'padua',
  name: 'Padua预测评分',
  description: '用于评估住院患者静脉血栓栓塞（VTE）风险的工具',
  sections: [
    {
      id: 'active_cancer',
      title: '活动性癌症',
      name: 'active_cancer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'previous_vte',
      title: '既往VTE（排除浅表静脉血栓）',
      name: 'previous_vte',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'reduced_mobility',
      title: '活动能力下降',
      name: 'reduced_mobility',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'thrombophilic_condition',
      title: '已知的血栓形成倾向条件',
      name: 'thrombophilic_condition',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'recent_trauma_surgery',
      title: '近期（≤1个月）创伤和/或手术',
      name: 'recent_trauma_surgery',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '2', score: 2, label: '是', checked: false }
      ]
    },
    {
      id: 'elderly_age',
      title: '高龄（≥70岁）',
      name: 'elderly_age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'heart_respiratory_failure',
      title: '心脏和/或呼吸衰竭',
      name: 'heart_respiratory_failure',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'acute_mi_stroke',
      title: '急性心肌梗死和/或缺血性中风',
      name: 'acute_mi_stroke',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'acute_infection_rheumatologic',
      title: '急性感染和/或风湿性疾病',
      name: 'acute_infection_rheumatologic',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'obesity',
      title: '肥胖（BMI≥30）',
      name: 'obesity',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'hormonal_treatment',
      title: '持续激素治疗',
      name: 'hormonal_treatment',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
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
      detail: Object.keys(values).map(key => `${key}: ${values[key]}`).join(', ')
    };
  },
  interpretations: [
    {
      condition: (score) => score < 4,
      risk: '低风险',
      text: '静脉血栓栓塞风险较低，无需预防性抗凝治疗。'
    },
    {
      condition: (score) => score >= 4,
      risk: '高风险',
      text: '静脉血栓栓塞风险较高，建议预防性抗凝治疗。'
    }
  ]
}
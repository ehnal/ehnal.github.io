  faril: {
  id: 'faril',
  name: 'FARIL评分',
  description: '用于评估老年人衰弱状态的工具',
  sections: [
    {
      id: 'fatigue',
      title: '疲乏',
      name: 'fatigue',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '过去4周内大部分时间或所有时间感到疲乏', checked: false }
      ]
    },
    {
      id: 'resistance',
      title: '阻力增加/耐力减退',
      name: 'resistance',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '在不用任何辅助工具及不用他人帮助的情况下，中途不休息爬1层楼梯有困难', checked: false }
      ]
    },
    {
      id: 'ambulation',
      title: '自由活动下降',
      name: 'ambulation',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '在不用任何辅助工具及不用他人帮助的情况下，走完1个街区（100m）较困难', checked: false }
      ]
    },
    {
      id: 'illness',
      title: '疾病情况',
      name: 'illness',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '医生曾告诉你存在5种以上如下疾病：高血压、糖尿病、急性心脏疾病发作、卒中、恶性肿瘤（皮肤癌除外）充血性心力衰竭、哮喘、关节炎、慢性肺病、肾脏疾病、心绞痛等', checked: false }
      ]
    },
    {
      id: 'weight_loss',
      title: '体重下降',
      name: 'weight_loss',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '1年或更短时间内出现体重下降≥5%', checked: false }
      ]
    }
  ],
  maxScore: 5,
  calculateScore: (values) => {
    const fatigue = parseInt(values.fatigue) || 0;
    const resistance = parseInt(values.resistance) || 0;
    const ambulation = parseInt(values.ambulation) || 0;
    const illness = parseInt(values.illness) || 0;
    const weightLoss = parseInt(values.weight_loss) || 0;
    return fatigue + resistance + ambulation + illness + weightLoss;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `疲乏: ${values.fatigue}, 阻力: ${values.resistance}, 自由活动: ${values.ambulation}, 疾病: ${values.illness}, 体重: ${values.weight_loss}`
    };
  },
  interpretations: [
    {
      condition: (score) => score === 0,
      risk: '无衰弱',
      text: '未发现衰弱状态，建议保持健康生活方式。'
    },
    {
      condition: (score) => score >= 1 && score <= 2,
      risk: '潜在衰弱',
      text: '存在轻度衰弱风险，建议加强锻炼和营养管理。'
    },
    {
      condition: (score) => score >= 3,
      risk: '衰弱',
      text: '存在明显衰弱状态，建议进行全面评估并制定干预计划。'
    }
  ]
}
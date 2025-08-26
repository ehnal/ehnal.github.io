  cornell_assessment_of_pediatric_delirium: {
  id: 'cornell_assessment_of_pediatric_delirium',
  name: 'Cornell儿童谵妄评估量表',
  description: '用于评估儿童谵妄的严重程度',
  sections: [
    {
      id: 'variable_1',
      title: '患儿是否与照护者有眼神接触？',
      name: 'variable_1',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '一直', checked: true },
        { value: '1', score: 1, label: '经常', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '极少', checked: false },
        { value: '4', score: 4, label: '从不', checked: false }
      ]
    },
    {
      id: 'variable_2',
      title: '患儿是否有目的性的动作？',
      name: 'variable_2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '一直', checked: true },
        { value: '1', score: 1, label: '经常', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '极少', checked: false },
        { value: '4', score: 4, label: '从不', checked: false }
      ]
    },
    {
      id: 'variable_3',
      title: '患儿是否能察觉周围环境的变化？',
      name: 'variable_3',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '一直', checked: true },
        { value: '1', score: 1, label: '经常', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '极少', checked: false },
        { value: '4', score: 4, label: '从不', checked: false }
      ]
    },
    {
      id: 'variable_4',
      title: '患儿是否能表达需求？',
      name: 'variable_4',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '一直', checked: true },
        { value: '1', score: 1, label: '经常', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '极少', checked: false },
        { value: '4', score: 4, label: '从不', checked: false }
      ]
    },
    {
      id: 'variable_5',
      title: '患儿是否烦躁不安？',
      name: 'variable_5',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '从不', checked: true },
        { value: '1', score: 1, label: '极少', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '经常', checked: false },
        { value: '4', score: 4, label: '一直', checked: false }
      ]
    },
    {
      id: 'variable_6',
      title: '患儿是否无法被安抚？',
      name: 'variable_6',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '从不', checked: true },
        { value: '1', score: 1, label: '极少', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '经常', checked: false },
        { value: '4', score: 4, label: '一直', checked: false }
      ]
    },
    {
      id: 'variable_7',
      title: '患儿是否活动过少——醒时几乎不动？',
      name: 'variable_7',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '从不', checked: true },
        { value: '1', score: 1, label: '极少', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '经常', checked: false },
        { value: '4', score: 4, label: '一直', checked: false }
      ]
    },
    {
      id: 'variable_8',
      title: '患儿是否对互动反应过慢？',
      name: 'variable_8',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '从不', checked: true },
        { value: '1', score: 1, label: '极少', checked: false },
        { value: '2', score: 2, label: '有时', checked: false },
        { value: '3', score: 3, label: '经常', checked: false },
        { value: '4', score: 4, label: '一直', checked: false }
      ]
    }
  ],
  maxScore: 32,
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
      condition: (score) => score < 9,
      risk: '低风险',
      text: '患儿谵妄风险较低，建议继续观察。'
    },
    {
      condition: (score) => score >= 9 && score <= 18,
      risk: '中风险',
      text: '患儿谵妄风险中等，建议进一步评估并采取干预措施。'
    },
    {
      condition: (score) => score > 18,
      risk: '高风险',
      text: '患儿谵妄风险较高，建议立即采取干预措施。'
    }
  ]
}
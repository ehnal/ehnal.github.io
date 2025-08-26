  wat1: {
  id: 'wat1',
  name: 'WAT-1评分',
  description: '用于评估儿童戒断综合征的严重程度',
  sections: [
    {
      id: 'watery_stool',
      title: '稀便/水样便',
      name: 'watery_stool',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'vomiting',
      title: '呕吐、恶心、干呕',
      name: 'vomiting',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'temperature',
      title: '体温 > 37.8℃（长时间）',
      name: 'temperature',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'state',
      title: '状态',
      name: 'state',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '睡眠/清醒/平静', checked: true },
        { value: '1', score: 1, label: '清醒/痛苦/躁动', checked: false }
      ]
    },
    {
      id: 'tremor',
      title: '震颤',
      name: 'tremor',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无/轻微、间歇性', checked: true },
        { value: '1', score: 1, label: '中等/严重', checked: false }
      ]
    },
    {
      id: 'sweating',
      title: '出汗',
      name: 'sweating',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'uncoordinated_movements',
      title: '不协调、重复运动（转头、甩腿或甩臂或弓身）',
      name: 'uncoordinated_movements',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无/轻微', checked: true },
        { value: '1', score: 1, label: '中等/严重', checked: false }
      ]
    },
    {
      id: 'yawning_sneezing',
      title: '打哈欠或打喷嚏',
      name: 'yawning_sneezing',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≤1次', checked: true },
        { value: '1', score: 1, label: '≥2次', checked: false }
      ]
    },
    {
      id: 'startle',
      title: '刺激惊跳',
      name: 'startle',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无/中等', checked: true },
        { value: '1', score: 1, label: '中等/严重', checked: false }
      ]
    },
    {
      id: 'muscle_tone',
      title: '肌张力',
      name: 'muscle_tone',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常', checked: true },
        { value: '1', score: 1, label: '提高', checked: false }
      ]
    },
    {
      id: 'calm_time',
      title: '恢复平静时间',
      name: 'calm_time',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<2分钟', checked: true },
        { value: '1', score: 1, label: '2-5分钟', checked: false },
        { value: '2', score: 2, label: '>5分钟', checked: false }
      ]
    }
  ],
  maxScore: 12,
  calculateScore: (values) => {
    const keys = [
      'watery_stool',
      'vomiting',
      'temperature',
      'state',
      'tremor',
      'sweating',
      'uncoordinated_movements',
      'yawning_sneezing',
      'startle',
      'muscle_tone',
      'calm_time'
    ];
    return keys.reduce((total, key) => total + (parseInt(values[key]) || 0), 0);
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `总分: ${totalScore}`
    };
  },
  interpretations: [
    {
      condition: (score) => score < 4,
      risk: '低风险',
      text: '症状轻微，无需特殊干预。'
    },
    {
      condition: (score) => score >= 4 && score <= 8,
      risk: '中风险',
      text: '症状中等，建议密切观察并适当干预。'
    },
    {
      condition: (score) => score > 8,
      risk: '高风险',
      text: '症状严重，需立即干预并进行进一步评估。'
    }
  ]
}
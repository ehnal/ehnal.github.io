  flacc: {
  id: 'flacc',
  name: 'FLACC疼痛评分',
  description: '用于评估儿童疼痛程度的工具，适用于无法用语言表达疼痛的患者。',
  sections: [
    {
      id: 'face',
      title: '脸',
      name: 'face',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '微笑或无特殊表情', checked: true },
        { value: '1', score: 1, label: '偶尔出现痛苦表情，皱眉，不愿交流', checked: false },
        { value: '2', score: 2, label: '经常或持续出现下颌颤抖或紧咬下唇', checked: false }
      ]
    },
    {
      id: 'leg',
      title: '腿',
      name: 'leg',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '放松或保持平常的姿势', checked: true },
        { value: '1', score: 1, label: '不安，紧张，维持于不舒服的姿势', checked: false },
        { value: '2', score: 2, label: '踢腿或腿部拖动', checked: false }
      ]
    },
    {
      id: 'activity',
      title: '活动度',
      name: 'activity',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '安静躺着，正常体位，或轻松活动', checked: true },
        { value: '1', score: 1, label: '扭动，翻来覆去，紧张', checked: false },
        { value: '2', score: 2, label: '身体痉挛，成弓形，僵硬', checked: false }
      ]
    },
    {
      id: 'cry',
      title: '哭闹',
      name: 'cry',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '不哭（清醒或睡眠中）', checked: true },
        { value: '1', score: 1, label: '呻吟，啜泣，偶尔诉痛', checked: false },
        { value: '2', score: 2, label: '一直哭泣，尖叫，经常诉痛', checked: false }
      ]
    },
    {
      id: 'consolability',
      title: '可安慰性',
      name: 'consolability',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '满足，放松', checked: true },
        { value: '1', score: 1, label: '偶尔抚摸拥抱和言语安慰后可以被安慰', checked: false },
        { value: '2', score: 2, label: '难于被安慰', checked: false }
      ]
    }
  ],
  maxScore: 10,
  calculateScore: (values) => {
    const face = parseInt(values.face) || 0;
    const leg = parseInt(values.leg) || 0;
    const activity = parseInt(values.activity) || 0;
    const cry = parseInt(values.cry) || 0;
    const consolability = parseInt(values.consolability) || 0;
    return face + leg + activity + cry + consolability;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `脸: ${values.face}, 腿: ${values.leg}, 活动度: ${values.activity}, 哭闹: ${values.cry}, 可安慰性: ${values.consolability}`
    };
  },
  interpretations: [
    {
      condition: (score) => score === 0,
      risk: '无疼痛',
      text: '患者无明显疼痛表现。'
    },
    {
      condition: (score) => score >= 1 && score <= 3,
      risk: '轻度疼痛',
      text: '患者可能存在轻度疼痛，建议观察并适当安抚。'
    },
    {
      condition: (score) => score >= 4 && score <= 6,
      risk: '中度疼痛',
      text: '患者可能存在中度疼痛，建议采取适当的镇痛措施。'
    },
    {
      condition: (score) => score >= 7,
      risk: '重度疼痛',
      text: '患者可能存在重度疼痛，建议立即采取有效的镇痛措施。'
    }
  ]
}
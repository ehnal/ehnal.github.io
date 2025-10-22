  basic_daily_living_ability_assessment_table: {
  id: 'basic_daily_living_ability_assessment_table',
  name: '基本日常生活能力评估表',
  description: '用于评估个体在日常生活活动中的独立性水平',
  sections: [
    {
      id: 'eating',
      title: '进食',
      name: 'eating',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '需极大帮助或完全依赖他人', checked: true },
        { value: '5', score: 5, label: '需部分帮助', checked: false },
        { value: '10', score: 10, label: '可独立进食', checked: false }
      ]
    },
    {
      id: 'bathing',
      title: '洗澡',
      name: 'bathing',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '在过程中需他人帮助', checked: true },
        { value: '5', score: 5, label: '准备好洗澡水后，可独立完成洗澡', checked: false }
      ]
    },
    {
      id: 'grooming',
      title: '修饰',
      name: 'grooming',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '需他人帮助', checked: true },
        { value: '5', score: 5, label: '可独立完成（洗脸、梳头、刷牙、剃须等）', checked: false }
      ]
    },
    {
      id: 'dressing',
      title: '穿衣',
      name: 'dressing',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '需极大帮助或完全依赖他人', checked: true },
        { value: '5', score: 5, label: '需部分帮助', checked: false },
        { value: '10', score: 10, label: '可独立完成（穿脱衣服、鞋袜、系扣子等）', checked: false }
      ]
    },
    {
      id: 'bowel_control',
      title: '控制大便',
      name: 'bowel_control',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '完全失控', checked: true },
        { value: '5', score: 5, label: '偶尔失控，或需要他人提示', checked: false },
        { value: '10', score: 10, label: '可控制大便', checked: false }
      ]
    },
    {
      id: 'urine_control',
      title: '控制小便',
      name: 'urine_control',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '完全失控', checked: true },
        { value: '5', score: 5, label: '偶尔失控，或需要他人提示', checked: false },
        { value: '10', score: 10, label: '可控制小便', checked: false }
      ]
    },
    {
      id: 'toileting',
      title: '如厕',
      name: 'toileting',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '需极大帮助或完全依赖他人', checked: true },
        { value: '5', score: 5, label: '需部分帮助', checked: false },
        { value: '10', score: 10, label: '可独立完成', checked: false }
      ]
    },
    {
      id: 'bed_chair_transfer',
      title: '床椅转移',
      name: 'bed_chair_transfer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '完全依赖他人', checked: true },
        { value: '5', score: 5, label: '需大量帮助（2人），能坐', checked: false },
        { value: '10', score: 10, label: '需部分帮助（1人）或指导', checked: false },
        { value: '15', score: 15, label: '可独立完成', checked: false }
      ]
    },
    {
      id: 'walking',
      title: '平地行走',
      name: 'walking',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '不能移动，或移动少于45米', checked: true },
        { value: '5', score: 5, label: '独自操纵轮椅移动超过45米，包括转弯', checked: false },
        { value: '10', score: 10, label: '需1人帮助步行超过45米（体力或言语指导）', checked: false },
        { value: '15', score: 15, label: '可独立步行超过45米（可用辅助器）', checked: false }
      ]
    },
    {
      id: 'stairs',
      title: '上下楼梯',
      name: 'stairs',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '需极大帮助或完全依赖他人', checked: true },
        { value: '5', score: 5, label: '需部分帮助（体力、言语指导、辅助器）', checked: false },
        { value: '10', score: 10, label: '可独立上下楼梯', checked: false }
      ]
    }
  ],
  maxScore: 100,
  calculateScore: (values) => {
    const eating = parseInt(values.eating) || 0;
    const bathing = parseInt(values.bathing) || 0;
    const grooming = parseInt(values.grooming) || 0;
    const dressing = parseInt(values.dressing) || 0;
    const bowelControl = parseInt(values.bowel_control) || 0;
    const urineControl = parseInt(values.urine_control) || 0;
    const toileting = parseInt(values.toileting) || 0;
    const bedChairTransfer = parseInt(values.bed_chair_transfer) || 0;
    const walking = parseInt(values.walking) || 0;
    const stairs = parseInt(values.stairs) || 0;

    return eating + bathing + grooming + dressing + bowelControl + urineControl + toileting + bedChairTransfer + walking + stairs;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `进食: ${values.eating}, 洗澡: ${values.bathing}, 修饰: ${values.grooming}, 穿衣: ${values.dressing}, 控制大便: ${values.bowel_control}, 控制小便: ${values.urine_control}, 如厕: ${values.toileting}, 床椅转移: ${values.bed_chair_transfer}, 平地行走: ${values.walking}, 上下楼梯: ${values.stairs}`
    };
  },
  interpretations: [
    {
      condition: (score) => score >= 80,
      risk: '独立',
      text: '患者在日常生活中表现出较高的独立性，无需额外帮助。'
    },
    {
      condition: (score) => score >= 50 && score < 80,
      risk: '部分依赖',
      text: '患者在日常生活中需要一定的帮助，但仍能完成部分活动。'
    },
    {
      condition: (score) => score < 50,
      risk: '完全依赖',
      text: '患者在日常生活中需要极大的帮助或完全依赖他人。'
    }
  ]
}
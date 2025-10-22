  muscle_wasting_screening_table: {
  id: 'muscle_wasting_screening_table',
  name: '肌肉减少症筛查表',
  description: '用于评估肌肉减少症风险的筛查工具',
  sections: [
    {
      id: 'age',
      title: '年龄',
      name: 'age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '＜70岁', checked: true },
        { value: '1', score: 1, label: '≥70岁', checked: false }
      ]
    },
    {
      id: 'weight_loss',
      title: '是否比上一年体重减轻',
      name: 'weight_loss',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无减轻或减轻≤2kg', checked: true },
        { value: '1', score: 1, label: '减轻＞2kg', checked: false }
      ]
    },
    {
      id: 'calf_circumference',
      title: '小腿围测量值',
      name: 'calf_circumference',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '男性≥24cm，女性≥33cm', checked: true },
        { value: '1', score: 1, label: '男性＜24cm，女性＜33cm', checked: false }
      ]
    },
    {
      id: 'grip_strength',
      title: '握力',
      name: 'grip_strength',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '男性≥28kg，女性≥18kg', checked: true },
        { value: '1', score: 1, label: '男性＜28kg，女性＜18kg', checked: false }
      ]
    },
    {
      id: 'carry_weight',
      title: '提起并搬运4.5公斤重物是否困难',
      name: 'carry_weight',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无困难', checked: true },
        { value: '1', score: 1, label: '有一些困难', checked: false },
        { value: '2', score: 2, label: '有很大困难或不能完成', checked: false }
      ]
    },
    {
      id: 'walk_room',
      title: '步行走过房间是否困难',
      name: 'walk_room',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无困难', checked: true },
        { value: '1', score: 1, label: '有一些困难', checked: false },
        { value: '2', score: 2, label: '有很大困难，需要辅助，或不能完成', checked: false }
      ]
    },
    {
      id: 'rise_bed_chair',
      title: '从床上或者椅子上起身是否困难',
      name: 'rise_bed_chair',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无困难', checked: true },
        { value: '1', score: 1, label: '有一些困难', checked: false },
        { value: '2', score: 2, label: '有很大困难，或没有他人帮助不能完成', checked: false }
      ]
    },
    {
      id: 'climb_stairs',
      title: '上10级台阶是否困难',
      name: 'climb_stairs',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无困难', checked: true },
        { value: '1', score: 1, label: '有一些困难', checked: false },
        { value: '2', score: 2, label: '有很大困难或不能完成', checked: false }
      ]
    },
    {
      id: 'fall_count',
      title: '近1年跌倒次数',
      name: 'fall_count',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '0次', checked: true },
        { value: '1', score: 1, label: '1-3次', checked: false },
        { value: '2', score: 2, label: '4次及以上', checked: false }
      ]
    },
    {
      id: 'daily_meat_dairy',
      title: '是否每日食用肉类和奶制品',
      name: 'daily_meat_dairy',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '是', checked: true },
        { value: '1', score: 1, label: '否', checked: false }
      ]
    }
  ],
  maxScore: 16,
  calculateScore: (values) => {
    const age = parseInt(values.age) || 0;
    const weight_loss = parseInt(values.weight_loss) || 0;
    const calf_circumference = parseInt(values.calf_circumference) || 0;
    const grip_strength = parseInt(values.grip_strength) || 0;
    const carry_weight = parseInt(values.carry_weight) || 0;
    const walk_room = parseInt(values.walk_room) || 0;
    const rise_bed_chair = parseInt(values.rise_bed_chair) || 0;
    const climb_stairs = parseInt(values.climb_stairs) || 0;
    const fall_count = parseInt(values.fall_count) || 0;
    const daily_meat_dairy = parseInt(values.daily_meat_dairy) || 0;

    return (
      age +
      weight_loss +
      calf_circumference +
      grip_strength +
      carry_weight +
      walk_room +
      rise_bed_chair +
      climb_stairs +
      fall_count +
      daily_meat_dairy
    );
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `年龄: ${values.age}, 体重减轻: ${values.weight_loss}, 小腿围: ${values.calf_circumference}, 握力: ${values.grip_strength}, 提重困难: ${values.carry_weight}, 步行困难: ${values.walk_room}, 起身困难: ${values.rise_bed_chair}, 上台阶困难: ${values.climb_stairs}, 跌倒次数: ${values.fall_count}, 肉类奶制品: ${values.daily_meat_dairy}`
    };
  },
  interpretations: [
    {
      condition: (score) => score < 4,
      risk: '低风险',
      text: '肌肉减少症风险较低，无需特别干预。'
    },
    {
      condition: (score) => score >= 4 && score <= 8,
      risk: '中风险',
      text: '存在一定肌肉减少症风险，建议进行进一步评估和干预。'
    },
    {
      condition: (score) => score > 8,
      risk: '高风险',
      text: '肌肉减少症风险较高，建议尽快进行专业治疗和干预。'
    }
  ]
}
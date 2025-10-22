  iadl: {
  id: 'iadl',
  name: '工具性日常生活活动能力评估（IADL）',
  description: '评估老年人日常生活中工具性活动能力的量表',
  sections: [
    {
      id: 'transportation',
      title: '使用交通工具',
      name: 'transportation',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '在他人帮助下坐公车', checked: true },
        { value: '0', score: 0, label: '仅在他人陪伴下打车或从不离开家', checked: false }
      ]
    },
    {
      id: 'cooking',
      title: '做饭',
      name: 'cooking',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '自理-包括自己准备原料', checked: true },
        { value: '0', score: 0, label: '需别人准备、做饭', checked: false }
      ]
    },
    {
      id: 'medication',
      title: '服药',
      name: 'medication',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '能在正确时间服用正确剂量', checked: true },
        { value: '0', score: 0, label: '不能自己服药', checked: false }
      ]
    },
    {
      id: 'laundry',
      title: '洗衣',
      name: 'laundry',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '能洗小的衣物：清洗短袜以及长筒袜等', checked: true },
        { value: '0', score: 0, label: '所有衣物必须由别人洗', checked: false }
      ]
    },
    {
      id: 'telephone',
      title: '打电话',
      name: 'telephone',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '能接能拨熟悉的电话号或能接不能打', checked: true },
        { value: '0', score: 0, label: '不能用电话', checked: false }
      ]
    },
    {
      id: 'finance',
      title: '理财',
      name: 'finance',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '能自己购物但在银行需有人帮助', checked: true },
        { value: '0', score: 0, label: '不能管钱', checked: false }
      ]
    },
    {
      id: 'shopping',
      title: '购物',
      name: 'shopping',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '能独立购买所有东西', checked: true },
        { value: '0', score: 0, label: '购物需陪人陪同或不能自己购物', checked: false }
      ]
    },
    {
      id: 'housework',
      title: '做家务',
      name: 'housework',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '能做轻的家务但做的不好或需要人帮助', checked: true },
        { value: '0', score: 0, label: '不能做家务', checked: false }
      ]
    }
  ],
  maxScore: 8,
  calculateScore: (values) => {
    const transportation = parseInt(values.transportation) || 0;
    const cooking = parseInt(values.cooking) || 0;
    const medication = parseInt(values.medication) || 0;
    const laundry = parseInt(values.laundry) || 0;
    const telephone = parseInt(values.telephone) || 0;
    const finance = parseInt(values.finance) || 0;
    const shopping = parseInt(values.shopping) || 0;
    const housework = parseInt(values.housework) || 0;

    return transportation + cooking + medication + laundry + telephone + finance + shopping + housework;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `交通工具: ${values.transportation}, 做饭: ${values.cooking}, 服药: ${values.medication}, 洗衣: ${values.laundry}, 打电话: ${values.telephone}, 理财: ${values.finance}, 购物: ${values.shopping}, 做家务: ${values.housework}`
    };
  },
  interpretations: [
    {
      condition: (score) => score === 8,
      risk: '完全独立',
      text: '患者在工具性日常生活活动中表现完全独立，无需帮助。'
    },
    {
      condition: (score) => score >= 4 && score < 8,
      risk: '部分依赖',
      text: '患者在工具性日常生活活动中表现部分依赖，需要一定帮助。'
    },
    {
      condition: (score) => score < 4,
      risk: '完全依赖',
      text: '患者在工具性日常生活活动中表现完全依赖，需要全面帮助。'
    }
  ]
}
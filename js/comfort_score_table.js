  comfort: {
  id: 'comfort',
  name: 'COMFORT行为评分',
  description: '用于评估儿童镇静和疼痛管理的工具',
  sections: [
    {
      id: 'alertness',
      title: '警觉程度',
      name: 'alertness',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '深睡眠（闭眼睛，对环境变化没有反应）', checked: true },
        { value: '2', score: 2, label: '浅睡眠（眼睛大多闭着，对环境变化偶有反应）', checked: false },
        { value: '3', score: 3, label: '嗜睡（经常闭着眼睛，对环境的反应较差）', checked: false },
        { value: '4', score: 4, label: '完全清醒和警觉（对环境变化有反应）', checked: false },
        { value: '5', score: 5, label: '高度警觉（对环境刺激反应过度）', checked: false }
      ]
    },
    {
      id: 'calmness',
      title: '平静或激动',
      name: 'calmness',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '平静', checked: true },
        { value: '2', score: 2, label: '轻度焦虑', checked: false },
        { value: '3', score: 3, label: '焦虑', checked: false },
        { value: '4', score: 4, label: '非常焦虑', checked: false },
        { value: '5', score: 5, label: '惊恐', checked: false }
      ]
    },
    {
      id: 'respiratory_response',
      title: '呼吸反应 (MV) /哭闹',
      name: 'respiratory_response',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '无咳嗽或无自主呼吸/安静呼吸，无哭声', checked: true },
        { value: '2', score: 2, label: '偶有自主呼吸，对机械通气无对抗/偶尔哭泣或呻吟', checked: false },
        { value: '3', score: 3, label: '偶有咳嗽或人机对抗/单声哭泣', checked: false },
        { value: '4', score: 4, label: '人机对抗活跃，频繁咳嗽/哭泣', checked: false },
        { value: '5', score: 5, label: '严重人机对抗，咳嗽或憋气/尖叫', checked: false }
      ]
    },
    {
      id: 'physical_activity',
      title: '身体活动',
      name: 'physical_activity',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '无自主活动', checked: true },
        { value: '2', score: 2, label: '偶有轻微活动', checked: false },
        { value: '3', score: 3, label: '频繁的轻微活动', checked: false },
        { value: '4', score: 4, label: '四肢有力活动', checked: false },
        { value: '5', score: 5, label: '躯干及头部有力活动', checked: false }
      ]
    },
    {
      id: 'muscle_tone',
      title: '肌张力',
      name: 'muscle_tone',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '肌肉完全放松，无张力', checked: true },
        { value: '2', score: 2, label: '肌张力减低', checked: false },
        { value: '3', score: 3, label: '肌张力正常', checked: false },
        { value: '4', score: 4, label: '肌张力增加，手指和脚趾弯曲', checked: false },
        { value: '5', score: 5, label: '肌肉极度僵硬，手指和脚趾弯曲', checked: false }
      ]
    },
    {
      id: 'facial_tension',
      title: '面部紧张程度',
      name: 'facial_tension',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '面部肌肉完全放松', checked: true },
        { value: '2', score: 2, label: '面部肌肉张力正常，无面部肌肉紧张', checked: false },
        { value: '3', score: 3, label: '面部部分肌肉张力增加', checked: false },
        { value: '4', score: 4, label: '面部全部肌肉张力增加', checked: false },
        { value: '5', score: 5, label: '面部扭曲，表情痛苦', checked: false }
      ]
    },
    {
      id: 'bp_map',
      title: 'BP MAP',
      name: 'bp_map',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '低于基础值', checked: true },
        { value: '2', score: 2, label: '始终在基础值', checked: false },
        { value: '3', score: 3, label: '偶尔升高>15%或更多（观察期间 1-3 次）', checked: false },
        { value: '4', score: 4, label: '频繁升高>15%或更多（>1-3 次）', checked: false },
        { value: '5', score: 5, label: '持续升高>15%', checked: false }
      ]
    },
    {
      id: 'heart_rate',
      title: '心率',
      name: 'heart_rate',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '低于基础值', checked: true },
        { value: '2', score: 2, label: '始终在基础值', checked: false },
        { value: '3', score: 3, label: '偶尔升高>15%或更多（观察期间 1-3 次）', checked: false },
        { value: '4', score: 4, label: '频繁升高>15%或更多（>1-3 次）', checked: false },
        { value: '5', score: 5, label: '持续升高>15%', checked: false }
      ]
    }
  ],
  maxScore: 40,
  calculateScore: (values) => {
    const alertness = parseInt(values.alertness) || 0;
    const calmness = parseInt(values.calmness) || 0;
    const respiratoryResponse = parseInt(values.respiratory_response) || 0;
    const physicalActivity = parseInt(values.physical_activity) || 0;
    const muscleTone = parseInt(values.muscle_tone) || 0;
    const facialTension = parseInt(values.facial_tension) || 0;
    const bpMap = parseInt(values.bp_map) || 0;
    const heartRate = parseInt(values.heart_rate) || 0;

    return alertness + calmness + respiratoryResponse + physicalActivity + muscleTone + facialTension + bpMap + heartRate;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `警觉: ${values.alertness}, 平静: ${values.calmness}, 呼吸反应: ${values.respiratory_response}, 活动: ${values.physical_activity}, 肌张力: ${values.muscle_tone}, 面部紧张: ${values.facial_tension}, BP MAP: ${values.bp_map}, 心率: ${values.heart_rate}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 16,
      risk: '低镇静水平',
      text: '患者镇静水平较低，可能需要调整镇静药物剂量。'
    },
    {
      condition: (score) => score > 16 && score <= 30,
      risk: '中等镇静水平',
      text: '患者镇静水平适中，建议继续观察。'
    },
    {
      condition: (score) => score > 30,
      risk: '高镇静水平',
      text: '患者镇静水平过高，可能需要减少镇静药物剂量。'
    }
  ]
}
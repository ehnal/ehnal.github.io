  glasgow_coma_scale: {
  id: 'glasgow_coma_scale',
  name: '格拉斯哥昏迷评分',
  description: '用于评估患者意识状态的工具',
  sections: [
    {
      id: 'best_eye_response',
      title: '最佳眼反应',
      name: 'best_eye_response',
      type: 'radio',
      options: [
        { value: '4', score: 4, label: '自发地', checked: false },
        { value: '3', score: 3, label: '对语言指令', checked: false },
        { value: '2', score: 2, label: '对疼痛', checked: false },
        { value: '1', score: 1, label: '无眼睁开', checked: false },
        { value: '0', score: 0, label: '不可测试', checked: true }
      ]
    },
    {
      id: 'best_verbal_response',
      title: '最佳言语反应',
      name: 'best_verbal_response',
      type: 'radio',
      options: [
        { value: '5', score: 5, label: '定向', checked: false },
        { value: '4', score: 4, label: '困惑', checked: false },
        { value: '3', score: 3, label: '不恰当的词语', checked: false },
        { value: '2', score: 2, label: '无法理解的声音', checked: false },
        { value: '1', score: 1, label: '无言语反应', checked: false },
        { value: '0', score: 0, label: '不可测试/插管', checked: true }
      ]
    },
    {
      id: 'best_motor_response',
      title: '最佳运动反应',
      name: 'best_motor_response',
      type: 'radio',
      options: [
        { value: '6', score: 6, label: '服从命令', checked: false },
        { value: '5', score: 5, label: '定位疼痛', checked: false },
        { value: '4', score: 4, label: '从疼痛中退缩', checked: false },
        { value: '3', score: 3, label: '对疼痛屈曲', checked: false },
        { value: '2', score: 2, label: '对疼痛伸展', checked: false },
        { value: '1', score: 1, label: '无运动反应', checked: false },
        { value: '0', score: 0, label: '不可测试', checked: true }
      ]
    }
  ],
  maxScore: 15,
  calculateScore: (values) => {
    const bestEyeResponse = parseInt(values.best_eye_response) || 0;
    const bestVerbalResponse = parseInt(values.best_verbal_response) || 0;
    const bestMotorResponse = parseInt(values.best_motor_response) || 0;
    return bestEyeResponse + bestVerbalResponse + bestMotorResponse;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `眼反应: ${values.best_eye_response}, 言语反应: ${values.best_verbal_response}, 运动反应: ${values.best_motor_response}`
    };
  },
  interpretations: [
    {
      condition: (score) => score >= 13,
      risk: '轻度意识障碍',
      text: '患者意识状态接近正常，但需继续观察。'
    },
    {
      condition: (score) => score >= 9 && score <= 12,
      risk: '中度意识障碍',
      text: '患者存在中度意识障碍，建议进一步评估和治疗。'
    },
    {
      condition: (score) => score < 9,
      risk: '重度意识障碍',
      text: '患者意识状态严重受损，需立即进行紧急处理。'
    }
  ]
}
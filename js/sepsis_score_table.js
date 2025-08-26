  sepsis_score: {
  id: 'sepsis_score',
  name: '脓毒症评分',
  description: '用于评估脓毒症患者的严重程度',
  sections: [
    {
      id: 'respiratory_system_function',
      title: '呼吸系统功能（最高3分）',
      name: 'respiratory_system_function',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: 'PaO₂/FiO₂≥400 mmHg 或 SpO₂/FiO₂≥292', checked: true },
        { value: '1', score: 1, label: 'FiO₂<400 mmHg 或任何呼吸支持下的 SpO₂/FiO₂<292', checked: false },
        { value: '2', score: 2, label: 'PaO₂/FiO₂ 100–200 mmHg 并且 IMV 或 SpO₂/FiO₂ 148–220 并且 IMV', checked: false },
        { value: '3', score: 3, label: 'PaO₂/FiO₂<100 mmHg 并且 IMV 或 SpO₂/FiO₂ <148 并且 IMV', checked: false }
      ]
    },
    {
      id: 'cardiovascular_system_function',
      title: '心血管系统功能（最高6分）',
      name: 'cardiovascular_system_function',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '未使用血管活性药物，乳酸<5 mmol/L', checked: true },
        { value: '1', score: 1, label: '使用1种血管活性药物，乳酸5~10.9 mmol/L（每项1分，至多3项）', checked: false },
        { value: '2', score: 2, label: '使用两种及以上的血管活性药物，乳酸≥11 mmol/L（每项2分，至多3项）', checked: false }
      ]
    },
    {
      id: 'mean_arterial_pressure',
      title: '平均动脉压(mmHg)（最高2分）',
      name: 'mean_arterial_pressure',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<1个月>30; 1-11个月>38; 1-<2岁>43; 2-<5岁>44; 5-<12岁>48; 12-<18岁>51', checked: true },
        { value: '1', score: 1, label: '17-30; 25-38; 31-43; 32-44; 36-48; 38-51', checked: false },
        { value: '2', score: 2, label: '<17; <25; <31; <32; <36; <38', checked: false }
      ]
    },
    {
      id: 'coagulation_function',
      title: '凝血功能（最高2分）',
      name: 'coagulation_function',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '血小板≥100×10^3/μL, 国际标准化比值≤1.3, D-二聚体≤2 mg/L FEU, 纤维蛋白原>100 mg/dL', checked: true },
        { value: '1', score: 1, label: '血小板<100×10^3/μL, 国际标准化比值>1.3, D-二聚体>2 mg/L FEU, 纤维蛋白原<100 mg/dL（每项1分，至多两项）', checked: false }
      ]
    },
    {
      id: 'nervous_system_function',
      title: '神经系统功能（最高2分）',
      name: 'nervous_system_function',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '格拉斯哥昏迷评分>10分，瞳孔对光反射存在', checked: true },
        { value: '1', score: 1, label: '格拉斯哥昏迷评分≤10分', checked: false },
        { value: '2', score: 2, label: '双侧瞳孔固定', checked: false }
      ]
    }
  ],
  maxScore: 15,
  calculateScore: (values) => {
    const respiratory = parseInt(values.respiratory_system_function) || 0;
    const cardiovascular = parseInt(values.cardiovascular_system_function) || 0;
    const map = parseInt(values.mean_arterial_pressure) || 0;
    const coagulation = parseInt(values.coagulation_function) || 0;
    const nervous = parseInt(values.nervous_system_function) || 0;
    return respiratory + cardiovascular + map + coagulation + nervous;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `呼吸: ${values.respiratory_system_function}, 心血管: ${values.cardiovascular_system_function}, 平均动脉压: ${values.mean_arterial_pressure}, 凝血: ${values.coagulation_function}, 神经: ${values.nervous_system_function}`
    };
  },
  interpretations: [
    {
      condition: (score) => score < 2,
      risk: '低风险',
      text: '患者风险较低，建议密切观察。'
    },
    {
      condition: (score) => score >= 2 && score <= 6,
      risk: '中风险',
      text: '患者存在中度风险，建议进一步评估和治疗。'
    },
    {
      condition: (score) => score > 6,
      risk: '高风险',
      text: '患者风险较高，建议立即启动脓毒症治疗流程。'
    }
  ]
}
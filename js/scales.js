/**
 * scales.js
 * 量表配置数据模块 - 存储所有量表的配置信息
 */

/**
 * 量表配置对象集合
 * 每个量表都具有统一的配置结构，方便系统处理
 */
const scales = {
/**
 * 评分计算函数
 *
 * 本函数接收 values 对象，该对象由 controller 统一生成，
 * 所有值均为字符串类型（即使 input 是数字、radio 是数值）。
 *
 * 为确保计算准确，开发者应根据实际字段用途进行显式类型转换：
 *
 * - 对于数字型字段（如打分项、年龄、Scr 等）：
 *     使用 parseInt(values.xxx) 或 parseFloat(values.xxx)
 *
 * - 对于枚举型/字符串型字段（如性别 male/female、危险等级 low/mid/high）：
 *     保留原始字符串，不进行转换
 *
 * - 可选添加 NaN 安全检查，以防用户未输入：
 *     if (isNaN(val)) return 0;
 *
 * 示例：
 *   const age = parseFloat(values.age);
 *   const scr = parseFloat(values.scr);
 *   const sex = values.sex; // 字符串类型，保留不变
 *
 * ⚠️ 不要假设 controller 会为你自动转换数据类型。
 *    所有数值计算请在本函数中手动完成类型转换。
 */





  /**
 * Phoenix脓毒症评分量表配置 - 修复后的版本
 */
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix脓毒症评分',
    description: '评估儿童脓毒症严重程度及感染性休克风险的工具，',
    sections: [
      {
        id: 'respiratory',
        title: '呼吸（最高3分）',
        name: 'respiratory',
        type: 'radio',
        options: [
          { value: '0', score: 0, label: 'PaO2/FiO2 ≥400 或 SpO2/FiO2 ≥292', checked: true },
          { value: '1', score: 1, label: '任何呼吸支持上的 PaO2/FiO2 <400 或 SpO2/FiO2 <292', checked: false },
          { value: '2', score: 2, label: 'PaO2/FiO2 100-200和IMV 或 SpO2/FiO2 148-220和IMV', checked: false },
          { value: '3', score: 3, label: 'PaO2/FiO2 <100和IMV 或 SpO2/FiO2 <148和IMV', checked: false }
        ]
      },
      {
        id: 'vasoactive',
        title: '心血管 - 血管活性药物（最高2分）',
        name: 'vasoactive',
        type: 'radio',
        options: [
          { value: '0', score: 0, label: '无血管活性药物使用', checked: true },
          { value: '1', score: 1, label: '使用1种血管活性药物', checked: false },
          { value: '2', score: 2, label: '使用≥2种血管活性药物', checked: false }
        ]
      },
      {
        id: 'lactate',
        title: '心血管 - 乳酸（最高2分）',
        name: 'lactate',
        type: 'radio',
        options: [
          { value: '0', score: 0, label: '<5 mmol/L', checked: true },
          { value: '1', score: 1, label: '5-10.9 mmol/L', checked: false },
          { value: '2', score: 2, label: '>10.9 mmol/L', checked: false }
        ]
      },
  {
  id: 'map',
  title: '心血管 - 平均动脉压(MAP)（最高2分）',
  name: 'map',
  type: 'radio',
  options: [
    {
      value: '0',
      score: 0,
     label: '正常范围（符合年龄的MAP正常值）<br>' +
         '<1个月: >30 mmHg<br>' +
         '1-11个月: >38 mmHg<br>' +
         '1-<2岁: >43 mmHg<br>' +
         '2-<5岁: >44 mmHg<br>' +
         '5-<12岁: >48 mmHg<br>' +
         '12-<18岁: >51 mmHg',
      checked: true
    },
    {
      value: '1',
      score: 1,
      label: '轻度低于正常（符合年龄的MAP轻度异常）',
      checked: false
    },
    {
      value: '2',
      score: 2,
      label: '显著低于正常（符合年龄的MAP显著异常）',
      checked: false
    }
  ]
}

,
      {
        id: 'coagulation',
        title: '凝血（最高2分）',
        name: 'coagulation',
        type: 'radio',
        options: [
          { value: '0', score: 0, label: '无凝血异常', checked: true },
          { value: '1', score: 1, label: '单项凝血异常（任一项异常）', checked: false },
          { value: '2', score: 2, label: '多项凝血异常（两项或更多异常）', checked: false }
        ]
      },
      {
        id: 'neurologic',
        title: '神经系统（最高2分）',
        name: 'neurologic',
        type: 'radio',
        options: [
          { value: '0', score: 0, label: 'GCS >10且瞳孔反应正常', checked: true },
          { value: '1', score: 1, label: 'GCS ≤10', checked: false },
          { value: '2', score: 2, label: '双侧固定瞳孔', checked: false }
        ]
      },
      // 添加隐藏的心血管状态标记，用于解释判断
      {
        id: 'cardiovascular_status',
        title: '心血管状态（不要修改此项）',
        name: 'cardiovascular_status',
        type: 'radio',
        options: [
          { value: '0', score: 0, label: '无心血管异常', checked: true },
          { value: '1', score: 0, label: '有心血管异常', checked: false }
        ]
      }
    ],
    maxScore: 13,
    calculateScore: (values) => {
     const respiratory = parseInt(values.respiratory) || 0;
  const vasoactive = parseInt(values.vasoactive) || 0;
  const lactate = parseInt(values.lactate) || 0;
  const map = parseInt(values.map) || 0;
  const coagulation = parseInt(values.coagulation) || 0;
  const neurologic = parseInt(values.neurologic) || 0;
      
      // 判断心血管是否异常，用于后续解释
      if (vasoactive > 0 || lactate > 0 || map > 0) {
        // 设置心血管状态为异常
        document.querySelector('input[name="cardiovascular_status"][value="1"]').checked = true;
      } else {
        // 设置心血管状态为正常
        document.querySelector('input[name="cardiovascular_status"][value="0"]').checked = true;
      }
      
      return respiratory + vasoactive + lactate + map + coagulation + neurologic;
    },
    formatScore: (values, totalScore) => {
      const cardiovascularScore = parseInt(values.vasoactive)+ parseInt(values.lactate) + parseInt(values.map);
      
      return {
        total: `${totalScore}`,
        detail: `呼吸: ${values.respiratory}, 心血管: ${cardiovascularScore}, 凝血: ${values.coagulation}, 神经: ${values.neurologic}`
      };
    },
    // 修改解释规则，只使用分数作为参数
    interpretations: [
      {
        condition: (score) => score < 2,
        risk: '无脓毒症',
        text: '目前不符合脓毒症诊断标准，但需继续观察感染情况的变化。'
      },
      {
        condition: (score) => {
          // 获取心血管状态
          const hasCardiovascularAbnormality = document.querySelector('input[name="cardiovascular_status"][value="1"]').checked;
          // 如果分数>=2且无心血管异常，则为脓毒症
          return score >= 2 && !hasCardiovascularAbnormality;
        },
        risk: '脓毒症',
        text: '符合脓毒症诊断标准（疑似感染且评分≥2分）。需要启动脓毒症处理流程。'
      },
      {
        condition: (score) => {
          // 获取心血管状态
          const hasCardiovascularAbnormality = document.querySelector('input[name="cardiovascular_status"][value="1"]').checked;
          // 如果分数>=2且有心血管异常，则为感染性休克
          return score >= 2 && hasCardiovascularAbnormality;
        },
        risk: '脓毒症休克',
        text: '符合脓毒症休克诊断标准（脓毒症伴≥1个心血管点）。需要立即进行积极治疗。'
      }
    ]
  },

  /**
   * STOP-BANG评分量表配置
   */
  stopbang: {
    id: 'stopbang',
    name: 'STOP-BANG评分',
    description: '用于评估阻塞性睡眠呼吸暂停综合征风险的工具',
    sections: [
      {
        id: 'factors',
        title: '风险因素',
        name: 'stopbang',
        type: 'checkbox',
        options: [
          { value: 'snoring', score: 1, label: '打鼾 (响亮到能透过关闭的房门听到)', checked: false },
          { value: 'tired', score: 1, label: '白天易疲劳、嗜睡', checked: false },
          { value: 'observed', score: 1, label: '有人观察到您睡眠时呼吸暂停', checked: false },
          { value: 'pressure', score: 1, label: '高血压或正在接受高血压治疗', checked: false },
          { value: 'bmi', score: 1, label: 'BMI > 35 kg/m²', checked: false },
          { value: 'age', score: 1, label: '年龄 > 50岁', checked: false },
          { value: 'neck', score: 1, label: '颈围 > 40 cm', checked: false },
          { value: 'gender', score: 1, label: '性别为男性', checked: false }
        ]
      }
    ],
    maxScore: 8,
    // 计算总分的函数
   calculateScore: (values) => {
  const selected = values.factors || [];
  return Array.isArray(selected) ? selected.reduce((sum, item) => sum + item, 0) : 0;
}
,
    // 计算特定格式的分数显示
    formatScore: (values, totalScore) => {
      return {
        total: `${totalScore}`,
        detail: ''
      };
    },
    // 解释规则
    interpretations: [
      {
        condition: (score) => score <= 2,
        risk: '低风险',
        text: '阻塞性睡眠呼吸暂停风险低'
      },
      {
        condition: (score) => score >= 3 && score <= 4,
        risk: '中风险',
        text: '阻塞性睡眠呼吸暂停风险中等'
      },
      {
        condition: (score) => score >= 5 && score <= 6,
        risk: '高风险',
        text: '阻塞性睡眠呼吸暂停风险高'
      },
      {
        condition: (score) => score >= 7,
        risk: '极高风险',
        text: '阻塞性睡眠呼吸暂停风险极高'
      }
    ]
  },


gfr: {
  id: 'gfr',
  name: 'GFR估算（2021 CKD-EPI）',
  description: '根据年龄、性别和血清肌酐估算肾小球滤过率（eGFR）',
  maxScore: 150,
  sections: [
    {
      id: 'sex',
      title: '性别',
      name: 'sex',
      type: 'radio',  
      options: [
        { value: 'male', score: 0, label: '男性', checked: true },
        { value: 'female', score: 0, label: '女性' }
      ]
    },
    {
      id: 'age',
      title: '年龄（岁）',
      name: 'age',
      type: 'radio',  
      options: [
        { input: true, label: '请输入年龄', name: 'age', inputType: 'number', min: 1 }
      ]
    },
    {
      id: 'scr',
      title: '血清肌酐 Scr (mg/dL)',
      name: 'scr',
      type: 'radio',  
      options: [
        { input: true, label: '请输入肌酐', name: 'scr', inputType: 'number', step: '0.01', min: 0 }
      ]
    }
  ],
  calculateScore: (values) => {
  const age = parseFloat(values.age);
  const scr = parseFloat(values.scr);
  const sex = values.sex;

  if (isNaN(age) || isNaN(scr)) return 0;

  let A = sex === 'female' ? 0.7 : 0.9;
  let B = sex === 'female'
    ? (scr <= 0.7 ? -0.241 : -1.2)
    : (scr <= 0.9 ? -0.302 : -1.2);
  let factor = sex === 'female' ? 1.012 : 1;

  return 142 * Math.pow(scr / A, B) * Math.pow(0.9938, age) * factor;
},

  formatScore: (values, total) => ({
    total: total.toFixed(1),
    detail: `年龄: ${values.age} 岁, Scr: ${values.scr} mg/dL`
  }),
  interpretations: [
    {
      condition: score => score >= 90,
      risk: '正常或高',
      text: '肾功能正常'
    },
    {
      condition: score => score >= 60 && score < 90,
      risk: '轻度下降',
      text: '建议随访'
    },
    {
      condition: score => score >= 30 && score < 60,
      risk: '中度下降',
      text: '需关注慢性肾病'
    },
    {
      condition: score => score < 30,
      risk: '重度下降',
      text: '请尽快就医'
    }
  ]
},


flacc: {
  id:'flacc',
  name:'疼痛FLACC评分法',
  description:'评估不能表达疼痛的儿童的疼痛程度',
  sections:[
    {
      id:'face',
      title:'脸部表情',
      name:'face',
      type:"radio",
      options:[
        {value:'0', score:0, label:'微笑或无特殊表情',checked:true},
        {value:"1", score:1, label:'偶尔出现痛苦表情，皱眉、不愿交流'},
        {value:'2', score:2, label:'经常或持续出现下颌颤抖或紧咬下唇'}
      ]
    },
    {
      id:'legs',
      title:'腿部表现',
      name:'legs',
      type:"radio",
      options:[
        {value:'0', score:0, label:'放松或保持正常姿势', checked:true},
        {value:'1', score:1, label:'不安、紧张，维持不舒服的姿势'},
        {value:'2', score:2, label:'踢腿或腿部拖动'}
      ]
    },
    {
      id:'activity',
      title:'活动度',
      name:'activity',
      type:"radio",
      options:[
        {value:'0', score:0, label:'安静躺着，正常体位，或轻松活动', checked:true},
        {value:'1', score:1, label:'扭动，翻来覆去，紧张'},
        {value:'2', score:2, label:'身体痉挛，成弓形，僵硬'}
      ]
    },
    {
      id:'cry',
      title:'哭闹',
      name:'cry',
      type:"radio",
      options:[
        {value:'0', score:0, label:'不哭（清醒或睡眠中）',checked:true},
        {value:'1', score:1, label:'呻吟、啜泣，偶尔诉痛'},
        {value:'2', score:2, label:'一直哭泣、尖叫、经常诉痛'}
      ]
    },
    {
      id:'consolability',
      title:'可安慰性',
      name:'consolability',
      type:"radio",
      options:[
        {value:'0', score:0, label:'满足、放松', checked:true},
        {value:'1', score:1, label:'偶尔抚摸拥抱和语言安慰后可以被安慰'},
        {value:'2', score:2, label:'难以被安慰'}
      ]
    }
  ],
  maxScore: 10,
  calculateScore: (values) => {
    return ['face','legs','activity','cry','consolability'].reduce((sum,key) => {
      return sum + (parseInt(values[key]) || 0);
    }, 0);
  },
  formatScore: (values, totalScore) => {
    return {
      total:`${totalScore}`,
      detail:`面部${values.face}，腿部${values.legs}，活动性${values.activity}，哭闹${values.cry}，可安慰性 ${values.consolability}`
    }
  },
  interpretations: [
    {
      condition: (score) => score == 0,
      risk:'无痛',
      text:'患者轻松舒适'
     },
     {
       condition: (score) => score >= 1 && score <= 3,
       risk:'轻度不适',
       text:'患者感到轻度不适，可继续观察'
      },
      {
        condition: (score) => score >= 4 && score <= 6,
        risk: '中度疼痛',
        text: '患者感到中度疼痛，建议采取镇痛措施'
      },
      {
        condition: (score) => score >= 7,
        risk:'重度疼痛',
        text:'患者感到重度疼痛，建议采取镇痛措施'
      }
  ]
}

    /**
   * CHA₂DS₂-VASc评分量表配置
   */
  
  // chads: {
  //   id: 'chads',
  //   name: 'CHA₂DS₂-VASc评分',
  //   description: '用于评估房颤患者卒中风险的评分系统',
  //   type: 'checkbox',
  //   sections: [
  //     {
  //       id: 'factors',
  //       title: '风险因素',
  //       name: 'chads',
  //       options: [
  //         { value: 'chf', score: 1, label: '充血性心力衰竭/左心室功能不全 (1分)', checked: false },
  //         { value: 'htn', score: 1, label: '高血压 (1分)', checked: false },
  //         { value: 'age75', score: 2, label: '年龄 ≥ 75岁 (2分)', checked: false },
  //         { value: 'diabetes', score: 1, label: '糖尿病 (1分)', checked: false },
  //         { value: 'stroke', score: 2, label: '卒中/TIA/血栓栓塞史 (2分)', checked: false },
  //         { value: 'vascular', score: 1, label: '血管疾病 (1分)', checked: false },
  //         { value: 'age65', score: 1, label: '年龄 65-74岁 (1分)', checked: false },
  //         { value: 'female', score: 1, label: '性别为女性 (1分)', checked: false }
  //       ]
  //     }
  //   ],
  //   maxScore: 9,
  //   // 计算总分的函数
  //   calculateScore: (values) => {
  //     return values.reduce((total, item) => total + item, 0);
  //   },
  //   // 计算特定格式的分数显示
  //   formatScore: (values, totalScore) => {
  //     return {
  //       total: `${totalScore}/9`,
  //       detail: ''
  //     };
  //   },
  //   // 解释规则
  //   interpretations: [
  //     {
  //       condition: (score) => score === 0,
  //       risk: '低风险',
  //       text: '每年卒中风险 < 1%'
  //     },
  //     {
  //       condition: (score) => score === 1,
  //       risk: '低-中风险',
  //       text: '每年卒中风险约 1.3%'
  //     },
  //     {
  //       condition: (score) => score === 2,
  //       risk: '中风险',
  //       text: '每年卒中风险约 2.2%'
  //     },
  //     {
  //       condition: (score) => score === 3,
  //       risk: '中-高风险',
  //       text: '每年卒中风险约 3.2%'
  //     },
  //     {
  //       condition: (score) => score === 4,
  //       risk: '高风险',
  //       text: '每年卒中风险约 4.0%'
  //     },
  //     {
  //       condition: (score) => score === 5,
  //       risk: '高风险',
  //       text: '每年卒中风险约 6.7%'
  //     },
  //     {
  //       condition: (score) => score === 6,
  //       risk: '高风险',
  //       text: '每年卒中风险约 9.8%'
  //     },
  //     {
  //       condition: (score) => score === 7,
  //       risk: '高风险',
  //       text: '每年卒中风险约 9.6%'
  //     },
  //     {
  //       condition: (score) => score === 8,
  //       risk: '高风险',
  //       text: '每年卒中风险约 6.7%'
  //     },
  //     {
  //       condition: (score) => score >= 9,
  //       risk: '极高风险',
  //       text: '每年卒中风险约 15.2%'
  //     }
  //   ]
  // },

,

  chadsvasc: {
  id: 'chadsvasc',
  name: 'CHADSVASc评分',
  description: '评估房颤患者卒中风险的工具',
  sections: [
    {
      id: 'age',
      title: '年龄',
      name: 'age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '小于65岁', checked: true },
        { value: '1', score: 1, label: '65-74岁', checked: false },
        { value: '2', score: 2, label: '大于等于75岁', checked: false }
      ]
    },
    {
      id: 'sex',
      title: '性别',
      name: 'sex',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '男性', checked: true },
        { value: '1', score: 1, label: '女性', checked: false }
      ]
    },
    {
      id: 'congestive_heart_failure_history',
      title: '心力衰竭史',
      name: 'congestive_heart_failure_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'hypertension_history',
      title: '高血压史',
      name: 'hypertension_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'stroke_tia_thromboembolism_history',
      title: '卒中/短暂性脑缺血发作/栓塞性事件历史',
      name: 'stroke_tia_thromboembolism_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '2', score: 2, label: '有', checked: false }
      ]
    },
    {
      id: 'vascular_disease_history_pior_MI_peripheral_artery_disease_or_aortic_plaque',
      title: '(既往)冠状动脉疾病(包括前壁梗死、外周动脉疾病或主动脉粥样硬化病变)',
      name: 'vascular_disease_history_pior_MI_peripheral_artery_disease_or_aortic_plaque',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'diabetes_mellitus_history',
      title: '糖尿病史',
      name: 'diabetes_mellitus_history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    }
  ],
  maxScore: 9,
  calculateScore: (values) => {
    const age = parseInt(values.age) || 0;
    const sex = parseInt(values.sex) || 0;
    const congestiveHeartFailure = parseInt(values.congestive_heart_failure_history) || 0;
    const hypertension = parseInt(values.hypertension_history) || 0;
    const strokeTIA = parseInt(values.stroke_tia_thromboembolism_history) || 0;
    const vascularDisease = parseInt(values.vascular_disease_history_pior_MI_peripheral_artery_disease_or_aortic_plaque) || 0;
    const diabetes = parseInt(values.diabetes_mellitus_history) || 0;

    return age + sex + congestiveHeartFailure + hypertension + strokeTIA + vascularDisease + diabetes;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `年龄: ${values.age}, 性别: ${values.sex}, 心力衰竭史: ${values.congestive_heart_failure_history}, 高血压史: ${values.hypertension_history}, 卒中/短暂性脑缺血发作/栓塞性事件历史: ${values.stroke_tia_thromboembolism_history}, 冠状动脉疾病: ${values.vascular_disease_history_pior_MI_peripheral_artery_disease_or_aortic_plaque}, 糖尿病史: ${values.diabetes_mellitus_history}`
    };
  },
  interpretations: [
    {
      condition: (score) => score === 0,
      risk: '低风险',
      text: '卒中风险极低，无需抗凝治疗。'
    },
    {
      condition: (score) => score >= 1 && score <= 2,
      risk: '中风险',
      text: '建议根据患者具体情况考虑抗凝治疗。'
    },
    {
      condition: (score) => score > 2,
      risk: '高风险',
      text: '卒中风险较高，建议进行抗凝治疗。'
    }
  ]
}
,

  child_pugh: {
  id: 'child_pugh',
  name: 'Child-Pugh评分',
  description: '用于评估慢性肝病患者的肝功能状态及预后',
  sections: [
    {
      id: 'bilirubin',
      title: '总胆红素',
      name: 'bilirubin',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '<2 mg/dL (<34.2 µmol/L)', checked: true },
        { value: '2', score: 2, label: '2-3 mg/dL (34.2-51.3 µmol/L)', checked: false },
        { value: '3', score: 3, label: '>3 mg/dL (>51.3 µmol/L)', checked: false }
      ]
    },
    {
      id: 'albumin',
      title: '白蛋白',
      name: 'albumin',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '>3.5 g/dL (>35 g/L)', checked: true },
        { value: '2', score: 2, label: '2.8-3.5 g/dL (28-35 g/L)', checked: false },
        { value: '3', score: 3, label: '<2.8 g/dL (<28 g/L)', checked: false }
      ]
    },
    {
      id: 'inr',
      title: '国际标准化比率',
      name: 'inr',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '<1.7', checked: true },
        { value: '2', score: 2, label: '1.7-2.3', checked: false },
        { value: '3', score: 3, label: '>2.3', checked: false }
      ]
    },
    {
      id: 'ascites',
      title: '腹水',
      name: 'ascites',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '没有', checked: true },
        { value: '2', score: 2, label: '轻度', checked: false },
        { value: '3', score: 3, label: '中度', checked: false }
      ]
    },
    {
      id: 'encephalopathy',
      title: '肝性脑病',
      name: 'encephalopathy',
      type: 'radio',
      options: [
        { value: '1', score: 1, label: '无脑病', checked: true },
        { value: '2', score: 2, label: '1-2级', checked: false },
        { value: '3', score: 3, label: '3-4级', checked: false }
      ]
    }
  ],
  maxScore: 15,
  calculateScore: (values) => {
    const bilirubin = parseInt(values.bilirubin) || 0;
    const albumin = parseInt(values.albumin) || 0;
    const inr = parseInt(values.inr) || 0;
    const ascites = parseInt(values.ascites) || 0;
    const encephalopathy = parseInt(values.encephalopathy) || 0;
    return bilirubin + albumin + inr + ascites + encephalopathy;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `总胆红素: ${values.bilirubin}, 白蛋白: ${values.albumin}, INR: ${values.inr}, 腹水: ${values.ascites}, 肝性脑病: ${values.encephalopathy}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 6,
      risk: 'A级',
      text: '肝功能良好，预后较好。'
    },
    {
      condition: (score) => score >= 7 && score <= 9,
      risk: 'B级',
      text: '肝功能中度受损，需密切监测。'
    },
    {
      condition: (score) => score >= 10,
      risk: 'C级',
      text: '肝功能严重受损，预后较差，需积极治疗。'
    }
  ]
}
,

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
,

  heart_score: {
  id: 'heart_score',
  name: 'HEART评分',
  description: '用于评估胸痛患者的心血管事件风险',
  sections: [
    {
      id: 'history',
      title: '病史',
      name: 'history',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '稍微可疑', checked: true },
        { value: '1', score: 1, label: '中等可疑', checked: false },
        { value: '2', score: 2, label: '高度可疑', checked: false }
      ]
    },
    {
      id: 'ekg',
      title: '心电图',
      name: 'ekg',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常', checked: true },
        { value: '1', score: 1, label: '非特异性复极化异常', checked: false },
        { value: '2', score: 2, label: '显著ST段偏移', checked: false }
      ]
    },
    {
      id: 'age',
      title: '年龄',
      name: 'age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<45', checked: true },
        { value: '1', score: 1, label: '45-64', checked: false },
        { value: '2', score: 2, label: '≥65', checked: false }
      ]
    },
    {
      id: 'risk_factors',
      title: '风险因素',
      name: 'risk_factors',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无已知风险因素', checked: true },
        { value: '1', score: 1, label: '1-2个风险因素', checked: false },
        { value: '2', score: 2, label: '≥3个风险因素或有动脉粥样硬化疾病史', checked: false }
      ]
    },
    {
      id: 'initial_troponin',
      title: '初始肌钙蛋白',
      name: 'initial_troponin',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≤正常限值', checked: true },
        { value: '1', score: 1, label: '1-3倍正常限值', checked: false },
        { value: '2', score: 2, label: '>3倍正常限值', checked: false }
      ]
    }
  ],
  maxScore: 10,
  calculateScore: (values) => {
    const history = parseInt(values.history) || 0;
    const ekg = parseInt(values.ekg) || 0;
    const age = parseInt(values.age) || 0;
    const riskFactors = parseInt(values.risk_factors) || 0;
    const initialTroponin = parseInt(values.initial_troponin) || 0;
    return history + ekg + age + riskFactors + initialTroponin;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `病史: ${values.history}, 心电图: ${values.ekg}, 年龄: ${values.age}, 风险因素: ${values.risk_factors}, 肌钙蛋白: ${values.initial_troponin}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 3,
      risk: '低风险',
      text: '建议门诊随访或观察。'
    },
    {
      condition: (score) => score >= 4 && score <= 6,
      risk: '中风险',
      text: '建议住院观察并进一步检查。'
    },
    {
      condition: (score) => score >= 7,
      risk: '高风险',
      text: '建议立即住院并启动积极治疗。'
    }
  ]
}
,

  padua: {
  id: 'padua',
  name: 'Padua预测评分',
  description: '用于评估住院患者静脉血栓栓塞（VTE）风险的工具',
  sections: [
    {
      id: 'active_cancer',
      title: '活动性癌症',
      name: 'active_cancer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'previous_vte',
      title: '既往VTE（排除浅表静脉血栓）',
      name: 'previous_vte',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'reduced_mobility',
      title: '活动能力下降',
      name: 'reduced_mobility',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'thrombophilic_condition',
      title: '已知的血栓形成倾向条件',
      name: 'thrombophilic_condition',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'recent_trauma_surgery',
      title: '近期（≤1个月）创伤和/或手术',
      name: 'recent_trauma_surgery',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '2', score: 2, label: '是', checked: false }
      ]
    },
    {
      id: 'elderly_age',
      title: '高龄（≥70岁）',
      name: 'elderly_age',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'heart_respiratory_failure',
      title: '心脏和/或呼吸衰竭',
      name: 'heart_respiratory_failure',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'acute_mi_stroke',
      title: '急性心肌梗死和/或缺血性中风',
      name: 'acute_mi_stroke',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'acute_infection_rheumatologic',
      title: '急性感染和/或风湿性疾病',
      name: 'acute_infection_rheumatologic',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'obesity',
      title: '肥胖（BMI≥30）',
      name: 'obesity',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'hormonal_treatment',
      title: '持续激素治疗',
      name: 'hormonal_treatment',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    }
  ],
  maxScore: 20,
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
      condition: (score) => score < 4,
      risk: '低风险',
      text: '静脉血栓栓塞风险较低，无需预防性抗凝治疗。'
    },
    {
      condition: (score) => score >= 4,
      risk: '高风险',
      text: '静脉血栓栓塞风险较高，建议预防性抗凝治疗。'
    }
  ]
}
,

  wells_criteria_for_pulmonary_embolism: {
  id: 'wells_criteria_for_pulmonary_embolism',
  name: 'Wells肺栓塞评分',
  description: '用于评估肺栓塞的可能性',
  sections: [
    {
      id: 'clinical_signs_and_symptoms_of_dvt',
      title: '深静脉血栓的临床症状和体征',
      name: 'clinical_signs_and_symptoms_of_dvt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'pe_is_1_diagnosis_or_equally_likely',
      title: '肺栓塞为首要诊断或同等可能',
      name: 'pe_is_1_diagnosis_or_equally_likely',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '3', score: 3, label: '是', checked: false }
      ]
    },
    {
      id: 'heart_rate_gt_100',
      title: '心率 > 100',
      name: 'heart_rate_gt_100',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1.5', score: 1.5, label: '是', checked: false }
      ]
    },
    {
      id: 'immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks',
      title: '至少3天的制动或过去4周内手术',
      name: 'immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1.5', score: 1.5, label: '是', checked: false }
      ]
    },
    {
      id: 'previous_objectively_diagnosed_pe_or_dvt',
      title: '既往客观诊断的肺栓塞或深静脉血栓',
      name: 'previous_objectively_diagnosed_pe_or_dvt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1.5', score: 1.5, label: '是', checked: false }
      ]
    },
    {
      id: 'hemoptysis',
      title: '咯血',
      name: 'hemoptysis',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    },
    {
      id: 'malignancy_w_treatment_within_6_months_or_palliative',
      title: '恶性肿瘤且在6个月内接受治疗或姑息治疗',
      name: 'malignancy_w_treatment_within_6_months_or_palliative',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '是', checked: false }
      ]
    }
  ],
  maxScore: 12.5,
  calculateScore: (values) => {
    const clinicalSigns = parseFloat(values.clinical_signs_and_symptoms_of_dvt) || 0;
    const peDiagnosis = parseFloat(values.pe_is_1_diagnosis_or_equally_likely) || 0;
    const heartRate = parseFloat(values.heart_rate_gt_100) || 0;
    const immobilization = parseFloat(values.immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks) || 0;
    const previousPE = parseFloat(values.previous_objectively_diagnosed_pe_or_dvt) || 0;
    const hemoptysis = parseFloat(values.hemoptysis) || 0;
    const malignancy = parseFloat(values.malignancy_w_treatment_within_6_months_or_palliative) || 0;

    return clinicalSigns + peDiagnosis + heartRate + immobilization + previousPE + hemoptysis + malignancy;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `深静脉血栓: ${values.clinical_signs_and_symptoms_of_dvt}, 肺栓塞诊断: ${values.pe_is_1_diagnosis_or_equally_likely}, 心率: ${values.heart_rate_gt_100}, 制动/手术: ${values.immobilization_at_least_3_days_or_surgery_in_the_previous_4_weeks}, 既往肺栓塞: ${values.previous_objectively_diagnosed_pe_or_dvt}, 咯血: ${values.hemoptysis}, 恶性肿瘤: ${values.malignancy_w_treatment_within_6_months_or_palliative}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 4,
      risk: '低风险',
      text: '肺栓塞可能性低，建议进一步排除其他诊断。'
    },
    {
      condition: (score) => score > 4 && score <= 6,
      risk: '中风险',
      text: '肺栓塞可能性中等，建议进行影像学检查以确认诊断。'
    },
    {
      condition: (score) => score > 6,
      risk: '高风险',
      text: '肺栓塞可能性高，建议立即进行影像学检查并启动治疗。'
    }
  ]
}
};

export default scales;

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
*/

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
,

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
,

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
,

  prismiii: {
  id: 'prismiii',
  name: 'PRISM III评分',
  description: '用于评估儿童重症监护病房患者的病情严重程度',
  sections: [
    {
      id: 'systolic_blood_pressure',
      title: '收缩压（mmHg）',
      name: 'systolic_blood_pressure',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 40–55；婴儿 45–65；儿童 55–75；青少年 65–85', checked: false },
        { value: '7', score: 7, label: '新生儿 <40；婴儿 <45；儿童 <55；青少年 <65', checked: false }
      ]
    },
    {
      id: 'heart_rate',
      title: '心率（次/分）',
      name: 'heart_rate',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 215–225；婴儿 215–225；儿童 185–205；青少年 145–155', checked: false },
        { value: '7', score: 7, label: '新生儿 >225；婴儿 >225；儿童 >205；青少年 >155', checked: false }
      ]
    },
    {
      id: 'temperature',
      title: '体温',
      name: 'temperature',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '所有年龄 <33℃（91.4℉）或 >40℃（104.0℉）', checked: false }
      ]
    },
    {
      id: 'pupillary_reflexes',
      title: '瞳孔反射',
      name: 'pupillary_reflexes',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '7', score: 7, label: '所有年龄 一侧消失', checked: false },
        { value: '11', score: 11, label: '所有年龄 双侧消失', checked: false }
      ]
    },
    {
      id: 'mental_status',
      title: '神志状态',
      name: 'mental_status',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '5', score: 5, label: '所有年龄 昏迷（GCS <8）', checked: false }
      ]
    },
    {
      id: 'acidosis',
      title: '酸中毒 (总CO₂或pH)',
      name: 'acidosis',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 pH=7.0–7.28 或 TCO₂ 5–16.9 mmol/L', checked: false },
        { value: '6', score: 6, label: '所有年龄 pH<7.0 或 TCO₂ <5 mmol/L', checked: false }
      ]
    },
    {
      id: 'total_co2',
      title: 'CO₂总含量 (mmol/L)',
      name: 'total_co2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '4', score: 4, label: '所有年龄 >34 mmol/L', checked: false }
      ]
    },
    {
      id: 'ph',
      title: 'pH',
      name: 'ph',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 7.48–7.55', checked: false },
        { value: '3', score: 3, label: '所有年龄 >7.55', checked: false }
      ]
    },
    {
      id: 'pao2',
      title: '动脉氧分压 (PaO₂, mmHg)',
      name: 'pao2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '所有年龄 42–49.9', checked: false },
        { value: '6', score: 6, label: '所有年龄 <42.0', checked: false }
      ]
    },
    {
      id: 'pco2',
      title: '动脉二氧化碳分压 (PaCO₂, mmHg)',
      name: 'pco2',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '1', score: 1, label: '所有年龄 50–75', checked: false },
        { value: '3', score: 3, label: '所有年龄 >75', checked: false }
      ]
    },
    {
      id: 'glucose',
      title: '血糖',
      name: 'glucose',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 >200 mg/dL 或 >11 mmol/L', checked: false }
      ]
    },
    {
      id: 'potassium',
      title: '血钾',
      name: 'potassium',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '所有年龄 >6.9 mmol/L', checked: false }
      ]
    },
    {
      id: 'creatinine',
      title: '肌酐',
      name: 'creatinine',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '新生儿 >0.85 mg/dL 或 >75 μmol/L；婴儿 >0.90 mg/dL 或 >80 μmol/L；儿童 >0.90 mg/dL 或 >80 μmol/L；青少年 >1.30 mg/dL 或 >115 μmol/L', checked: false }
      ]
    },
    {
      id: 'bun',
      title: '血尿素氮 (BUN)',
      name: 'bun',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 >11.9 mg/dL 或 >4.3 μmol/L；其他年龄 >14.9 mg/dL 或 >5.4 μmol/L', checked: false }
      ]
    },
    {
      id: 'wbc',
      title: '白细胞计数 (cells/mm³)',
      name: 'wbc',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '4', score: 4, label: '所有年龄 <3000', checked: false }
      ]
    },
    {
      id: 'platelet',
      title: '血小板计数 (cells/mm³)',
      name: 'platelet',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '2', score: 2, label: '所有年龄 100,000–200,000', checked: false },
        { value: '4', score: 4, label: '所有年龄 50,000–99,999', checked: false },
        { value: '5', score: 5, label: '所有年龄 <50,000', checked: false }
      ]
    },
    {
      id: 'pt_aptt',
      title: 'PT或APTT (s)',
      name: 'pt_aptt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '正常范围', checked: true },
        { value: '3', score: 3, label: '新生儿 PT>22.0 或 PTT>85.0；其他年龄 PT>22.0 或 PTT>57.0', checked: false }
      ]
    }
  ],
  maxScore: 74,
  calculateScore: (values) => {
    return Object.values(values).reduce((total, value) => total + (parseInt(value) || 0), 0);
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `各项评分: ${JSON.stringify(values)}`
    };
  },
  interpretations: [
    {
      condition: (score) => score < 10,
      risk: '低风险',
      text: '病情较轻，建议密切观察。'
    },
    {
      condition: (score) => score >= 10 && score < 20,
      risk: '中风险',
      text: '病情中等，建议加强监护。'
    },
    {
      condition: (score) => score >= 20,
      risk: '高风险',
      text: '病情严重，建议立即采取积极治疗措施。'
    }
  ]
}
,

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
,

  cdss: {
  id: 'cdss',
  name: 'CDSS评分',
  description: '用于评估弥散性血管内凝血（DIC）的严重程度',
  sections: [
    {
      id: 'primary_disease',
      title: '存在导致 DIC 的原发病',
      name: 'primary_disease',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '2', score: 2, label: '有', checked: false }
      ]
    },
    {
      id: 'bleeding_tendency',
      title: '不能用原发病解释的严重或多发出血倾向',
      name: 'bleeding_tendency',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'microcirculation_disorder',
      title: '不能用原发病解释的微循环障碍或休克',
      name: 'microcirculation_disorder',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'organ_dysfunction',
      title: '广泛性皮肤、黏膜栓塞，灶性缺血性坏死、脱落及溃疡形成，不宁原因的肺、肾、脑等脏器功能障碍',
      name: 'organ_dysfunction',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'platelet_count_non_malignant',
      title: '血小板计数（非恶性血液病）',
      name: 'platelet_count_non_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≥100*10^9/L', checked: true },
        { value: '1', score: 1, label: '80-<100*10^9/L', checked: false },
        { value: '2', score: 2, label: '<80*10^9/L', checked: false }
      ]
    },
    {
      id: 'platelet_drop_non_malignant',
      title: '血小板计数（非恶性血液病）24h内下降',
      name: 'platelet_drop_non_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '未下降', checked: true },
        { value: '1', score: 1, label: '≥50%', checked: false }
      ]
    },
    {
      id: 'platelet_count_malignant',
      title: '血小板计数（恶性血液病）',
      name: 'platelet_count_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≥50*10^9/L', checked: true },
        { value: '1', score: 1, label: '<50*10^9/L', checked: false }
      ]
    },
    {
      id: 'platelet_drop_malignant',
      title: '血小板计数（恶性血液病）24h内下降',
      name: 'platelet_drop_malignant',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '未下降', checked: true },
        { value: '1', score: 1, label: '≥50%', checked: false }
      ]
    },
    {
      id: 'd_dimer',
      title: 'D-2聚体',
      name: 'd_dimer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '<5mg/L', checked: true },
        { value: '2', score: 2, label: '5-<9mg/L', checked: false },
        { value: '3', score: 3, label: '≥9mg/L', checked: false }
      ]
    },
    {
      id: 'pt_aptt',
      title: 'PT及APTT延长',
      name: 'pt_aptt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: 'PT延长<3s且APTT延长<10s', checked: true },
        { value: '1', score: 1, label: 'PT延长≥3s且APTT延长≥10s', checked: false },
        { value: '2', score: 2, label: 'PT延长≥6s', checked: false }
      ]
    },
    {
      id: 'fibrinogen',
      title: '纤维蛋白原',
      name: 'fibrinogen',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '≥1.0g/L', checked: true },
        { value: '1', score: 1, label: '<1.0g/L', checked: false }
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
      detail: Object.keys(values)
        .map((key) => `${key}: ${values[key]}`)
        .join(', ')
    };
  },
  interpretations: [
    {
      condition: (score) => score < 5,
      risk: '低风险',
      text: 'DIC风险较低，建议密切观察。'
    },
    {
      condition: (score) => score >= 5 && score <= 9,
      risk: '中风险',
      text: '存在DIC中度风险，建议进一步检查和治疗。'
    },
    {
      condition: (score) => score > 9,
      risk: '高风险',
      text: 'DIC高风险，需立即干预和治疗。'
    }
  ]
}
,



  faril: {
  id: 'faril',
  name: 'FARIL评分',
  description: '用于评估老年人衰弱状态的工具',
  sections: [
    {
      id: 'fatigue',
      title: '疲乏',
      name: 'fatigue',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '过去4周内大部分时间或所有时间感到疲乏', checked: false }
      ]
    },
    {
      id: 'resistance',
      title: '阻力增加/耐力减退',
      name: 'resistance',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '在不用任何辅助工具及不用他人帮助的情况下，中途不休息爬1层楼梯有困难', checked: false }
      ]
    },
    {
      id: 'ambulation',
      title: '自由活动下降',
      name: 'ambulation',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '在不用任何辅助工具及不用他人帮助的情况下，走完1个街区（100m）较困难', checked: false }
      ]
    },
    {
      id: 'illness',
      title: '疾病情况',
      name: 'illness',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '医生曾告诉你存在5种以上如下疾病：高血压、糖尿病、急性心脏疾病发作、卒中、恶性肿瘤（皮肤癌除外）充血性心力衰竭、哮喘、关节炎、慢性肺病、肾脏疾病、心绞痛等', checked: false }
      ]
    },
    {
      id: 'weight_loss',
      title: '体重下降',
      name: 'weight_loss',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '否', checked: true },
        { value: '1', score: 1, label: '1年或更短时间内出现体重下降≥5%', checked: false }
      ]
    }
  ],
  maxScore: 5,
  calculateScore: (values) => {
    const fatigue = parseInt(values.fatigue) || 0;
    const resistance = parseInt(values.resistance) || 0;
    const ambulation = parseInt(values.ambulation) || 0;
    const illness = parseInt(values.illness) || 0;
    const weightLoss = parseInt(values.weight_loss) || 0;
    return fatigue + resistance + ambulation + illness + weightLoss;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `疲乏: ${values.fatigue}, 阻力: ${values.resistance}, 自由活动: ${values.ambulation}, 疾病: ${values.illness}, 体重: ${values.weight_loss}`
    };
  },
  interpretations: [
    {
      condition: (score) => score === 0,
      risk: '无衰弱',
      text: '未发现衰弱状态，建议保持健康生活方式。'
    },
    {
      condition: (score) => score >= 1 && score <= 2,
      risk: '潜在衰弱',
      text: '存在轻度衰弱风险，建议加强锻炼和营养管理。'
    },
    {
      condition: (score) => score >= 3,
      risk: '衰弱',
      text: '存在明显衰弱状态，建议进行全面评估并制定干预计划。'
    }
  ]
}
,

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
,

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
,

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
,

 
  wells: {
  id: 'wells',
  name: 'Wells肺栓塞评分',
  description: '用于评估肺栓塞的可能性',
  sections: [
    {
      id: 'history_pe_dvt',
      title: '既往肺栓塞或深静脉血栓',
      name: 'history_pe_dvt',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有', checked: false }
      ]
    },
    {
      id: 'heart_rate',
      title: '心率>100次/分钟',
      name: 'heart_rate',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '心率大于100次/分钟', checked: false }
      ]
    },
    {
      id: 'recent_surgery',
      title: '过去4周内手术或制动',
      name: 'recent_surgery',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '过去4周内有手术或制动', checked: false }
      ]
    },
    {
      id: 'hemoptysis',
      title: '咯血',
      name: 'hemoptysis',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有咯血', checked: false }
      ]
    },
    {
      id: 'active_cancer',
      title: '活动性癌症',
      name: 'active_cancer',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '1', score: 1, label: '有活动性癌症', checked: false }
      ]
    },
    {
      id: 'dvt_signs',
      title: '深静脉血栓临床体征',
      name: 'dvt_signs',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '3', score: 3, label: '有深静脉血栓临床体征', checked: false }
      ]
    },
    {
      id: 'pe_more_likely',
      title: '其他诊断可能性小于肺栓塞',
      name: 'pe_more_likely',
      type: 'radio',
      options: [
        { value: '0', score: 0, label: '无', checked: true },
        { value: '3', score: 3, label: '其他诊断可能性小于肺栓塞', checked: false }
      ]
    }
  ],
  maxScore: 12,
  calculateScore: (values) => {
    const history_pe_dvt = parseInt(values.history_pe_dvt) || 0;
    const heart_rate = parseInt(values.heart_rate) || 0;
    const recent_surgery = parseInt(values.recent_surgery) || 0;
    const hemoptysis = parseInt(values.hemoptysis) || 0;
    const active_cancer = parseInt(values.active_cancer) || 0;
    const dvt_signs = parseInt(values.dvt_signs) || 0;
    const pe_more_likely = parseInt(values.pe_more_likely) || 0;

    return history_pe_dvt + heart_rate + recent_surgery + hemoptysis + active_cancer + dvt_signs + pe_more_likely;
  },
  formatScore: (values, totalScore) => {
    return {
      total: `${totalScore}`,
      detail: `既往肺栓塞/深静脉血栓: ${values.history_pe_dvt}, 心率: ${values.heart_rate}, 手术/制动: ${values.recent_surgery}, 咯血: ${values.hemoptysis}, 活动性癌症: ${values.active_cancer}, 深静脉血栓体征: ${values.dvt_signs}, 其他诊断可能性: ${values.pe_more_likely}`
    };
  },
  interpretations: [
    {
      condition: (score) => score <= 4,
      risk: '肺栓塞不太可能',
      text: '建议进一步检查以排除肺栓塞。'
    },
    {
      condition: (score) => score >= 5,
      risk: '肺栓塞可能',
      text: '建议进一步检查以确诊肺栓塞。'
    }
  ]
}
};

export default scales;

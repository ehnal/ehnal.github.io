from openai import OpenAI
import re
import ast
import os
import json

def generate_scale_js_from_text(ocr_text: str, key: str, base_url: str, output_path: str):
    """
    输入OCR识别出的评分量表文本，调用GPT生成scale.js代码并保存
    """
    prompt = f"""请根据以下评分量表的介绍文本，生成一个 JavaScript 配置对象。

**重要要求**：
1. 只返回 JavaScript 对象内容，不要包含任何 Markdown 标记（如 ```js 或 ```javascript）
2. 不要包含对象名称（如 chads2vasc:），只返回花括号内的对象内容
3. 确保 JavaScript 语法完全正确
4. 对于互斥选项（年龄组、性别），请按组织化 sections
5. interpretations 中的 condition 必须是箭头函数：(score) => score >= 2

**返回格式示例**：
phoenix: {{ 
  id: 'phoenix',
  name: 'Phoenix脓毒症评分',
  description: '评估儿童脓毒症严重程度及感染性休克风险的工具',
  type: 'radio',
  sections: [
    {{
      id: "respiratory",
      title: "呼吸（最高3分）",
      name: "respiratory",
      options: [
        {{ value: "0", score: 0, label: "PaO2/FiO2 ≥400 或 SpO2/FiO2 ≥292", checked: true }},
        {{ value: "1", score: 1, label: "任何呼吸支持上的 PaO2/FiO2 <400 或 SpO2/FiO2 <292", checked: false }},
        {{ value: "2", score: 2, label: "PaO2/FiO2 100-200 和 IMV 或 SpO2/FiO2 148-220 和 IMV", checked: false }},
        {{ value: "3", score: 3, label: "PaO2/FiO2 <100 和 IMV 或 SpO2/FiO2 <148 和 IMV", checked: false }}
      ]
    }},
    {{
      id: "vasoactive",
      title: "心血管 - 血管活性药物（最高2分）",
      name: "vasoactive",
      options: [
        {{ value: "0", score: 0, label: "无血管活性药物使用", checked: true }},
        {{ value: "1", score: 1, label: "使用1种血管活性药物", checked: false }},
        {{ value: "2", score: 2, label: "使用≥2种血管活性药物", checked: false }}
      ]
    }},
    {{
      id: "lactate",
      title: "心血管 - 乳酸水平（最高2分）",
      name: "lactate",
      options: [
        {{ value: "0", score: 0, label: "乳酸 ≤2 mmol/L", checked: true }},
        {{ value: "1", score: 1, label: "乳酸 >2 且 ≤4 mmol/L", checked: false }},
        {{ value: "2", score: 2, label: "乳酸 >4 mmol/L", checked: false }}
      ]
    }},
    {{
      id: "map",
      title: "心血管 - 平均动脉压（MAP）（最高1分）",
      name: "map",
      options: [
        {{ value: "0", score: 0, label: "MAP ≥1/3 位数", checked: true }},
        {{ value: "1", score: 1, label: "MAP <1/3 位数", checked: false }}
      ]
    }},
    {{
      id: "coagulation",
      title: "凝血功能（最高2分）",
      name: "coagulation",
      options: [
        {{ value: "0", score: 0, label: "INR ≤1.5", checked: true }},
        {{ value: "1", score: 1, label: "INR >1.5 且 ≤2.5", checked: false }},
        {{ value: "2", score: 2, label: "INR >2.5", checked: false }}
      ]
    }},
    {{
      id: "neurologic",
      title: "神经系统（最高3分）",
      name: "neurologic",
      options: [
        {{ value: "0", score: 0, label: "GCS ≥14", checked: true }},
        {{ value: "1", score: 1, label: "GCS 10–13", checked: false }},
        {{ value: "2", score: 2, label: "GCS 6–9", checked: false }},
        {{ value: "3", score: 3, label: "GCS ≤5", checked: false }}
      ]
    }},
    {{
      id: "cardiovascular_status",
      title: "心血管状态辅助判断",
      name: "cardiovascular_status",
      options: [
        {{ value: "0", score: 0, label: "无心血管异常", checked: true }},
        {{ value: "1", score: 0, label: "存在心血管异常（包括乳酸、MAP 或血管活性药物异常）", checked: false }}
      ]
    }},
  ]
  maxScore: 13,
  calculateScore: (values) => {{
    const respiratory = parseInt(values.respiratory) || 0;
    const vasoactive = parseInt(values.vasoactive) || 0;
    const lactate = parseInt(values.lactate) || 0;
    const map = parseInt(values.map) || 0;
    const coagulation = parseInt(values.coagulation) || 0;
    const neurologic = parseInt(values.neurologic) || 0;

    if (vasoactive > 0 || lactate > 0 || map > 0) {{
      document.querySelector('input[name="cardiovascular_status"][value="1"]').checked = true;
    }} else {{
      document.querySelector('input[name="cardiovascular_status"][value="0"]').checked = true;
    }}
    return respiratory + vasoactive + lactate + map + coagulation + neurologic;
  }},
  formatScore: (values, totalScore) => {{
    const cardiovascularScore = parseInt(values.vasoactive) + parseInt(values.lactate) + parseInt(values.map);
    return {{
      total: `${{totalScore}}`,
      detail: `呼吸: ${{values.respiratory}}, 心血管: ${{cardiovascularScore}}, 凝血: ${{values.coagulation}}, 神经: ${{values.neurologic}}`
    }};
  }},
  interpretations: [
    {{
      condition: (score) => score < 2,
      risk: '无脓毒症',
      text: '目前不符合脓毒症诊断标准，但需继续观察感染情况的变化。'
    }},
    {{
      condition: (score) => {{
        const hasCardiovascularAbnormality = document.querySelector('input[name="cardiovascular_status"][value="1"]').checked;
        return score >= 2 && !hasCardiovascularAbnormality;
      }},
      risk: '脓毒症',
      text: '符合脓毒症诊断标准（疑似感染且评分≥2分）。需要启动脓毒症处理流程。'
    }},
    {{
      condition: (score) => {{
        const hasCardiovascularAbnormality = document.querySelector('input[name="cardiovascular_status"][value="1"]').checked;
        return score >= 2 && hasCardiovascularAbnormality;
      }},
      risk: '脓毒症休克',
      text: '符合脓毒症休克诊断标准（脓毒症伴≥1个心血管点）。需要立即进行积极治疗。'
    }}
  ]
}}

评分量表介绍如下：
---------------------
{ocr_text}
---------------------

请严格按照上述格式返回，不要添加任何额外的文本或标记。
"""

    client = OpenAI(api_key=key, base_url=base_url)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "你是一个专业医疗评分量表系统的代码生成助手。请严格按照要求返回纯 JavaScript 对象，不包含任何 Markdown 标记。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0,
        seed=42,
    )

    js_code = response.choices[0].message.content
    
    # 清理 GPT 返回的内容
    cleaned_code = clean_gpt_response(js_code)
    print(cleaned_code)
    
    # 生成量表ID（从OCR文本中提取或生成默认ID）
    scale_id = extract_scale_id(cleaned_code)
    
    # 包装成完整的对象
    final_code = f"""  {scale_id}: {cleaned_code}"""
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 保存到指定文件
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(final_code)
    
    print(f"✅ 成功生成并保存至 {output_path}")
    print(f"📋 量表ID: {scale_id}")
    return scale_id

def clean_gpt_response(response_text: str) -> str:
    """
    清理GPT返回的内容，移除Markdown标记和多余的空白
    """
    # 移除 Markdown 代码块标记
    response_text = re.sub(r'^```(?:javascript|js)?\s*\n', '', response_text, flags=re.MULTILINE)
    response_text = re.sub(r'\n```\s*$', '', response_text, flags=re.MULTILINE)
    
    # 移除开头和结尾的空白行
    response_text = response_text.strip()
    
    # 确保以花括号开始和结束
    if not response_text.startswith('{'):
        # 如果不是以花括号开始，尝试找到第一个花括号
        brace_index = response_text.find('{')
        if brace_index != -1:
            response_text = response_text[brace_index:]
    
    if not response_text.endswith('}'):
        # 如果不是以花括号结束，尝试找到最后一个花括号
        brace_index = response_text.rfind('}')
        if brace_index != -1:
            response_text = response_text[:brace_index + 1]
    
    return response_text

def extract_scale_id(cleaned_code) -> str:
    """
    从字符串形式的 cleaned_code 中提取 id 字段作为量表名称
    """
    if isinstance(cleaned_code, str):
        match = re.search(r"id\s*:\s*['\"](\w+)['\"]", cleaned_code)
        if match:
            return match.group(1)
        else:
            return "custom_scale"

    elif isinstance(cleaned_code, dict):
        return cleaned_code.get("id", "custom_scale")

    return "custom_scale"

def append_to_scales_file(scale_content: str, scales_file_path: str):
    """
    将生成的量表内容追加到现有的scales.js文件中
    """
    if not os.path.exists(scales_file_path):
        print(f"❌ 目标文件不存在: {scales_file_path}")
        return
    
    try:
        # 读取现有文件内容
        with open(scales_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 找到最后一个量表对象的位置
        # 寻找最后一个 '}' 在 'export default scales;' 之前
        export_index = content.rfind('export default scales;')
        if export_index == -1:
            print("❌ 未找到 'export default scales;' 标记")
            return
        
        # 在最后一个量表后添加新的量表
        # 找到 scales 对象的结束位置
        scales_end = content.rfind('}', 0, export_index)
        if scales_end == -1:
            print("❌ 未找到 scales 对象结束位置")
            return
        
        # 插入新的量表内容
        new_content = content[:scales_end] + f",\n\n{scale_content}\n" + content[scales_end:]
        
        # 写回文件
        with open(scales_file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ 成功追加到 {scales_file_path}")
        
    except Exception as e:
        print(f"❌ 追加到scales文件时出错: {e}")

# 示例调用
if __name__ == "__main__":
    KEY = ""
    BASE_URL = ""
    OCR_TEXT = """
{
  "formula_table": {
    "age": {
      "label": "年龄",
      "range": [0, 2],
      "criteria": {
        "0": "<65 years old",
        "+1": "65-74 years old",
        "+2": ">=75 years old"
      }
    },
    "sex": {
      "label": "性别",
      "range": [0, 1],
      "criteria": {
        "0": "Male",
        "+1": "Female"
      }
    },
    "congestive_heart_failure_history": {
      "label": "心力衰竭史",
      "range": [1, 1],
      "criteria": {
        "+1": "Congestive heart failure history"
      }
    },
    "hypertension_history": {
      "label": "高血压史",
      "range": [1, 1],
      "criteria": {
        "+1": "Hypertension history"
      }
    },
    "stroke_tia_thromboembolism_history": {
      "label": "卒中/短暂性脑缺血发作/栓塞性事件历史",
      "range": [2, 2],
      "criteria": {
        "+2": "Stroke/TIA/thromboembolism history"
      }
    },
"vascular_disease_history_pior_MI_peripheral_artery_disease_or_aortic_plaque": {
      "label": "(既往)冠状动脉疾病(包括前壁梗死、外周动脉疾病或主动脉粥样硬化病变)",
      "range": [1, 1],
      "criteria": {
        "+1": "Vascular disease history(prior MI,pripheral artery diseae,aortic plaques)"
      }
    },
    "diabetes_mellitus_history": {
      "label": "糖尿病史",
      "range": [1, 1],
      "criteria": {
        "+1": "Diabetes mellitus history"
      }
    }
  },
  "facts_figures_table": {
    "chadsvasc_score_risk_of_ischemic_stroke": {
      "label": "CHADSVASc评分 - 缺血性卒中风险",
      "range": [0, 9],
      "criteria": {
        "0": "0.2%",
        "1": "0.6%",
        "2": "2.2%",
        "3": "3.2%",
        "4": "4.8%",
        "5": "7.2%",
        "6": "9.7%",
        "7": "11.2%",
        "8": "10.8%",
        "9": "12.2%"
      }
    },
    "chadsvasc_score_risk_of_stroke_tia_systemic_embolism": {
      "label": "CHADSVASc评分 - 短暂性脑缺血发作/全身栓塞风险",
      "range": [0, 9],
      "criteria": {
        "0": "0.3%",
        "1": "0.9%",
        "2": "2.9%",
        "3": "4.6%",
        "4": "6.7%",
        "5": "10.0%",
        "6": "13.6%",
        "7": "15.7%",
        "8": "15.2%",
        "9": "17.4%"
      }
    }
  }
}
"""
    
    # 生成单个量表文件
    OUTPUT_FILE = "js/new_scale.js"
    scale_id = generate_scale_js_from_text(OCR_TEXT, KEY, BASE_URL, OUTPUT_FILE)
    
    # 可选：追加到现有的scales.js文件
    SCALES_FILE = "js/scales.js"
    with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
        scale_content = f.read()
    append_to_scales_file(scale_content, SCALES_FILE)

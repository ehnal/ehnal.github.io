from openai import OpenAI
import re
import ast
import os
import json
from pathlib import Path
from dotenv import load_dotenv
def generate_scale_js_from_text(ocr_text: str, key: str, base_url: str, output_path: str):
    """
    输入OCR识别出的评分量表文本，调用GPT生成scale.js代码并保存
    """
    prompt = f"""请根据以下评分量表的介绍文本，生成一个 JavaScript 配置对象。

**重要要求**：
1. 只返回 JavaScript 对象内容，不要包含任何 Markdown 标记（如 ```js 或 ```javascript）
2.  对于 score 只有一个选项的部分，输出为 radio 类型，包含“无”与“有”两项
3. 确保 JavaScript 语法完全正确
4. 对于互斥选项（年龄组、性别），请按组织化 sections
5. interpretations 中的 condition 必须是箭头函数：(score) => score >= 2
6.所有 label 均翻译为中文
7.返回内容时，量表对象前加上量表 id 和冒号。例如：chadsvasc: {{ id: 'chadsvasc', ... }}

**返回格式示例(多个）**：
（示例一）phoenix: {{
  id: 'phoenix',
  name: 'Phoenix脓毒症评分',
  description: '评估儿童脓毒症严重程度及感染性休克风险的工具，',
  sections: [
    {{
      id: 'respiratory',
      title: '呼吸（最高3分）',
      name: 'respiratory',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: 'PaO2/FiO2 ≥400 或 SpO2/FiO2 ≥292', checked: true }},
        {{ value: '1', score: 1, label: '任何呼吸支持上的 PaO2/FiO2 <400 或 SpO2/FiO2 <292', checked: false }},
        {{ value: '2', score: 2, label: 'PaO2/FiO2 100-200和IMV 或 SpO2/FiO2 148-220和IMV', checked: false }},
        {{ value: '3', score: 3, label: 'PaO2/FiO2 <100和IMV 或 SpO2/FiO2 <148和IMV', checked: false }}
      ]
    }},
    {{
      id: 'vasoactive',
      title: '心血管 - 血管活性药物（最高2分）',
      name: 'vasoactive',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '无血管活性药物使用', checked: true }},
        {{ value: '1', score: 1, label: '使用1种血管活性药物', checked: false }},
        {{ value: '2', score: 2, label: '使用≥2种血管活性药物', checked: false }}
      ]
    }},
    {{
      id: 'lactate',
      title: '心血管 - 乳酸（最高2分）',
      name: 'lactate',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '<5 mmol/L', checked: true }},
        {{ value: '1', score: 1, label: '5-10.9 mmol/L', checked: false }},
        {{ value: '2', score: 2, label: '>10.9 mmol/L', checked: false }}
      ]
    }},
    {{
      id: 'map',
      title: '心血管 - 平均动脉压(MAP)（最高2分）',
      name: 'map',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '正常范围（符合年龄的MAP正常值）<br><1个月: >30 mmHg<br>1-11个月: >38 mmHg<br>1-<2岁: >43 mmHg<br>2-<5岁: >44 mmHg<br>5-<12岁: >48 mmHg<br>12-<18岁: >51 mmHg', checked: true }},
        {{ value: '1', score: 1, label: '轻度低于正常（符合年龄的MAP轻度异常）', checked: false }},
        {{ value: '2', score: 2, label: '显著低于正常（符合年龄的MAP显著异常）', checked: false }}
      ]
    }},
    {{
      id: 'coagulation',
      title: '凝血（最高2分）',
      name: 'coagulation',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '无凝血异常', checked: true }},
        {{ value: '1', score: 1, label: '单项凝血异常（任一项异常）', checked: false }},
        {{ value: '2', score: 2, label: '多项凝血异常（两项或更多异常）', checked: false }}
      ]
    }},
    {{
      id: 'neurologic',
      title: '神经系统（最高2分）',
      name: 'neurologic',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: 'GCS >10且瞳孔反应正常', checked: true }},
        {{ value: '1', score: 1, label: 'GCS ≤10', checked: false }},
        {{ value: '2', score: 2, label: '双侧固定瞳孔', checked: false }}
      ]
    }},
    {{
      id: 'cardiovascular_status',
      title: '心血管状态（不要修改此项）',
      name: 'cardiovascular_status',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '无心血管异常', checked: true }},
        {{ value: '1', score: 0, label: '有心血管异常', checked: false }}
      ]
    }}
  ],
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
}}，
示例二CURB-65简化评分）：
curb65: {{
  id: 'curb65',
  name: 'CURB-65评分',
  description: '用于评估社区获得性肺炎患者的严重程度与住院需求',
  sections: [
    {{
      id: 'confusion',
      title: '意识状态',
      name: 'confusion',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '无意识障碍', checked: true }},
        {{ value: '1', score: 1, label: '存在意识混乱', checked: false }}
      ]
    }},
    {{
      id: 'urea',
      title: '血尿素氮 >7mmol/L',
      name: 'urea',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '≤7 mmol/L', checked: true }},
        {{ value: '1', score: 1, label: '>7 mmol/L', checked: false }}
      ]
    }},
    {{
      id: 'age',
      title: '年龄',
      name: 'age',
      type: 'radio',
      options: [
        {{ value: '0', score: 0, label: '<65 岁', checked: true }},
        {{ value: '1', score: 1, label: '≥65 岁', checked: false }}
      ]
    }},
    {{
      id: 'symptoms',
      title: '伴随症状',
      name: 'symptoms',
      type: 'checkbox',
      options: [
        {{ value: 'fever', score: 1, label: '发热', checked: false }},
        {{ value: 'dyspnea', score: 1, label: '呼吸困难', checked: false }},
        {{ value: 'cough', score: 1, label: '咳痰', checked: false }}
      ]
    }}
  ],
  maxScore: 6,
  calculateScore: (values) => {{
    const confusion = parseInt(values.confusion) || 0;
    const urea = parseInt(values.urea) || 0;
    const age = parseInt(values.age) || 0;
    const symptoms = values.symptoms || [];
    const symptomsScore = Array.isArray(symptoms) ? symptoms.length : 0;
    return confusion + urea + age + symptomsScore;
  }},
  formatScore: (values, totalScore) => {{
    return {{
      total: `${{totalScore}}`,
      detail: `意识: ${{values.confusion}}, 年龄: ${{values.age}}, 尿素: ${{values.urea}}, 症状数: ${{(values.symptoms || []).length}}`
    }};
  }},
  interpretations: [
    {{
      condition: (score) => score <= 1,
      risk: '低风险',
      text: '建议门诊治疗'
    }},
    {{
      condition: (score) => score === 2,
      risk: '中风险',
      text: '建议住院观察'
    }},
    {{
      condition: (score) => score >= 3,
      risk: '高风险',
      text: '强烈建议住院，必要时 ICU 管理'
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
    将生成的量表内容追加到现有的 scales.js 文件中（避免重复追加）
    """
    if not os.path.exists(scales_file_path):
        print(f"❌ 目标文件不存在: {scales_file_path}")
        return

    try:
        # 提取要追加的量表 ID
        match = re.search(r"^\s*(\w+)\s*:", scale_content)
        if not match:
            print("⚠️ 未能提取 scale_id，跳过追加")
            return
        scale_id = match.group(1)

        # 读取原始内容
        with open(scales_file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已包含该量表 ID
        if re.search(rf"\b{scale_id}\s*:", content):
            print(f"⚠️ scales.js 中已存在 {scale_id}，跳过追加")
            return

        # 找到 export 前插入
        export_index = content.rfind('export default scales;')
        if export_index == -1:
            print("❌ 未找到 'export default scales;'")
            return

        # 找到最后一个 '}' 位置
        scales_end = content.rfind('}', 0, export_index)
        if scales_end == -1:
            print("❌ 未找到 scales 对象结尾")
            return

        # 插入量表对象
        new_content = content[:scales_end] + f",\n\n  {scale_content.strip()}\n" + content[scales_end:]
        
        with open(scales_file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ 成功追加到 {scales_file_path}")

    except Exception as e:
        print(f"❌ 追加到 scales 文件时出错: {e}")



# 读取 .env 文件
load_dotenv()
# 示例调用
if __name__ == "__main__":
    KEY = os.getenv("KEY")
    BASE_URL = os.getenv("BASE_URL")

    if not KEY or not BASE_URL:
        raise ValueError("请在 .env 文件中配置 KEY 和 BASE_URL")
    BASE_DIR = Path(__file__).resolve().parent   # model.py 所在目录
    SCALES_FILE = BASE_DIR /"js/scales.js"
 
    # 加载 OCR 结构化 JSON
    
    input_file =   BASE_DIR /"tables2.json"
    with open(input_file, "r", encoding="utf-8") as f:
        OCR_DICT = json.load(f)

    # 统计列表
    generated_scales = []

    for group_key, group in OCR_DICT.items():
        for scale_key, scale_content in group.items():
            output_path = f"ehnal.github.io/js/{scale_key}.js"

            # 如果 JS 文件已存在就跳过 GPT 请求
            if os.path.exists(output_path):
                print(f"⚠️ 已存在，跳过: {scale_key}（文件: {output_path}）")
                continue

            print(f"🔄 正在处理量表: {scale_key}")
            single_ocr_json = json.dumps({scale_key: scale_content}, ensure_ascii=False, indent=2)

            # 调用 GPT 生成配置文件
            scale_id = generate_scale_js_from_text(single_ocr_json, KEY, BASE_URL, output_path)

            # 尝试追加到 scales.js 中（避免重复）
            with open(output_path, 'r', encoding='utf-8') as f:
                content = f.read()
            append_to_scales_file(content, SCALES_FILE)

            print(f"✅ 已生成量表: {scale_id}, 写入到 {output_path}")
            generated_scales.append(scale_id)

    # 输出统计
    print("\n✅ 批量处理完成")
    print(f"📦 共生成 {len(generated_scales)} 个量表：")
    for i, sid in enumerate(generated_scales, start=1):
        print(f"  {i}. {sid}")



 
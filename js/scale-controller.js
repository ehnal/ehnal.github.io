/**
 * scale-controller.js
 * 量表控制器 - 处理量表的交互逻辑（支持 input 输入类型）
 */

import ScaleRenderer from './scale-renderer.js';

class ScaleController {
  constructor() {
    this.states = {};
  }

  initScale(scaleConfig) {
    const scaleId = scaleConfig.id;
    this.addEventListeners(scaleConfig);
    this.restoreState(scaleConfig);
    this.calculateScore(scaleConfig);
  }

  addEventListeners(scaleConfig) {
    const scaleId = scaleConfig.id;
    scaleConfig.sections.forEach(section => {
      const inputs = document.querySelectorAll(`input[name="${section.name}"]`);
      inputs.forEach(input => {
        input.addEventListener('input', () => this.calculateScore(scaleConfig));
        input.addEventListener('change', () => this.calculateScore(scaleConfig));
      });
    });
  }

  calculateScore(scaleConfig) {
    const scaleId = scaleConfig.id;
    const values = {};

    scaleConfig.sections.forEach(section => {
      const name = section.name;
      const inputs = document.querySelectorAll(`input[name="${name}"]`);

      if (section.type === 'radio') {
        const checkedInput = Array.from(inputs).find(input => input.checked);
        if (checkedInput) values[section.id] = checkedInput.value;
      } else if (section.type === 'checkbox') {
        const checkedInputs = Array.from(inputs).filter(input => input.checked);
        values[section.id] = checkedInputs.map(input => parseFloat(input.getAttribute('data-score')) || 0);
      }

      section.options.forEach(option => {
        if (option.input) {
          const input = document.querySelector(`input[name="${option.name}"]`);
          if (input) values[option.name] = input.value;
        }
      });
    });

    let totalScore = scaleConfig.calculateScore(values);
    const scoreData = scaleConfig.formatScore ? scaleConfig.formatScore(values, totalScore) : { total: totalScore, detail: '' };

    let risk = '', interpretation = '';
    for (const rule of scaleConfig.interpretations) {
      if (rule.condition(totalScore)) {
        risk = rule.risk;
        interpretation = rule.text;
        break;
      }
    }

    ScaleRenderer.updateResults(scaleId, scoreData, risk, interpretation);
    this.saveState(scaleConfig);
    return { totalScore, risk, interpretation };
  }

  saveState(scaleConfig) {
    const scaleId = scaleConfig.id;
    const state = {};

    scaleConfig.sections.forEach(section => {
      const name = section.name;
      const inputs = document.querySelectorAll(`input[name="${name}"]`);
      const input = Array.from(inputs).find(i => i.checked || i.type === 'text' || i.type === 'number');
      if (input) state[section.id] = input.value;

      section.options.forEach(option => {
        if (option.input) {
          const el = document.querySelector(`input[name="${option.name}"]`);
          if (el) state[option.name] = el.value;
        }
      });
    });

    localStorage.setItem(`${scaleId}State`, JSON.stringify(state));
    this.states[scaleId] = state;
  }

  restoreState(scaleConfig) {
    const scaleId = scaleConfig.id;
    const savedState = localStorage.getItem(`${scaleId}State`);
    if (!savedState) return;

    try {
      const state = JSON.parse(savedState);
      this.states[scaleId] = state;

      for (const key in state) {
        const el = document.querySelector(`input[name="${key}"]`);
        if (el) {
          if (el.type === 'radio' || el.type === 'checkbox') el.checked = true;
          else el.value = state[key];
        }
      }
    } catch (error) {
      console.error(`恢复${scaleId}状态失败:`, error);
    }
  }

  copyResult(scaleId, scaleConfig) {
    let resultText = '';
    const scoreElement = document.getElementById(`${scaleId}-score`);
    const detailElement = document.getElementById(`${scaleId}-detail`);
    const riskElement = document.getElementById(`${scaleId}-risk`);
    const interpretationElement = document.getElementById(`${scaleId}-interpretation`);

    resultText = `${scaleConfig.name}: ${scoreElement.textContent}${scaleConfig.maxScore ? `/${scaleConfig.maxScore}` : ''}\n`;
    if (detailElement && detailElement.textContent) resultText += `分项: ${detailElement.textContent}\n`;
    if (riskElement && riskElement.textContent !== '-') resultText += `风险级别: ${riskElement.textContent}\n`;
    resultText += `解释: ${interpretationElement.textContent}`;
    return resultText;
  }
}

export default new ScaleController();

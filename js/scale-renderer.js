/**
 * scale-renderer.js
 * 量表渲染引擎 - 负责根据配置动态生成量表的HTML结构
 */

/**
 * 量表渲染器类
 * 提供将量表配置转换为HTML结构的功能
 */
class ScaleRenderer {
  /**
   * 渲染指定的量表到指定容器
   * @param {Object} scaleConfig - 量表配置对象
   * @param {HTMLElement} container - 容器元素
   * @returns {HTMLElement} - 渲染后的量表元素
   */
  renderScale(scaleConfig, container) {
    // 创建量表容器
    const scaleElement = document.createElement('div');
    scaleElement.id = scaleConfig.id;
    scaleElement.className = 'tab-content';

    const hasRadioSection = scaleConfig.sections.some(sec => sec.type === 'radio');
    
    // 添加量表标题和描述
    scaleElement.innerHTML = `
      <h2>${scaleConfig.name}</h2>
      <p class="description">${scaleConfig.description}</p>
      
      <div class="score-form" id="form-${scaleConfig.id}"></div>
      
      <div class="result-container">
        <div class="result-header">
          <h3>评分结果</h3>
          <button class="copy-btn" data-tab="${scaleConfig.id}">复制结果</button>
        </div>
        <div class="result-content">
          <p>总分: <span id="${scaleConfig.id}-score">0</span>${scaleConfig.maxScore ? `/${scaleConfig.maxScore}` : ''}</p>
          ${hasRadioSection ? `<p>分项: <span id="${scaleConfig.id}-detail"></span></p>` : ''}
          <p>风险级别: <span id="${scaleConfig.id}-risk">-</span></p>
          <p>解释: <span id="${scaleConfig.id}-interpretation">-</span></p>
        </div>
      </div>
    `;
    
    // 渲染量表表单部分
    const formContainer = scaleElement.querySelector(`#form-${scaleConfig.id}`);
    this.renderFormSections(scaleConfig, formContainer);
    
    // 添加到容器
    if (container) {
      container.appendChild(scaleElement);
    }
    
    return scaleElement;
  }
  
  /**
   * 渲染量表的表单部分
   * @param {Object} scaleConfig - 量表配置对象
   * @param {HTMLElement} container - 表单容器
   */
  renderFormSections(scaleConfig, container) {
    scaleConfig.sections.forEach(section => {
      const sectionElement = document.createElement('div');
      sectionElement.className = 'form-group';
      
      sectionElement.innerHTML = `
        <h3>${section.title}</h3>
        <div class="options" id="options-${scaleConfig.id}-${section.id}"></div>
      `;
      
      const optionsContainer = sectionElement.querySelector(`#options-${scaleConfig.id}-${section.id}`);
      this.renderOptions(scaleConfig, section, optionsContainer);
      
      container.appendChild(sectionElement);
    });
  }
  
  /**
   * 渲染表单选项
   * @param {Object} scaleConfig - 量表配置对象
   * @param {Object} section - 表单部分配置
   * @param {HTMLElement} container - 选项容器
   */
 renderOptions(scaleConfig, section, container) {
  section.options.forEach(option => {
    if (option.input) {
      // 如果是输入框类型（例如年龄、肌酐），渲染 <input>
      const label = document.createElement('label');
      label.innerHTML = `${option.label}: <input 
        type="${option.inputType || 'text'}"
        name="${option.name}"
        ${option.step ? `step='${option.step}'` : ''}
        ${option.min ? `min='${option.min}'` : ''}
      >`;
      container.appendChild(label);
      return; // 继续下一个 option
    }

    // 否则是默认的 radio / checkbox
    const inputType = scaleConfig.type === 'radio' ? 'radio' : 'checkbox';
    const label = document.createElement('label');
    label.innerHTML = `
      <input 
        type="${inputType}" 
        name="${section.name}" 
        value="${option.value}" 
        data-score="${option.score}"
        ${option.checked ? 'checked' : ''}
      >
      <span>${option.label}</span>
    `;
    container.appendChild(label);
  });
}

  
  /**
   * 更新量表结果显示
   * @param {string} scaleId - 量表ID
   * @param {Object} scoreData - 分数数据，包含总分和详情
   * @param {string} risk - 风险级别
   * @param {string} interpretation - 解释文本
   */
  updateResults(scaleId, scoreData, risk, interpretation) {
    // 更新总分
    const scoreElement = document.getElementById(`${scaleId}-score`);
    if (scoreElement) {
      scoreElement.textContent = scoreData.total;
    }
    
    // 如果有详细分项，则更新
    const detailElement = document.getElementById(`${scaleId}-detail`);
    if (detailElement && scoreData.detail) {
      detailElement.textContent = scoreData.detail;
    }
    
    // 更新风险级别
    const riskElement = document.getElementById(`${scaleId}-risk`);
    if (riskElement) {
      riskElement.textContent = risk || '-';
    }
    
    // 更新解释文本
    const interpretationElement = document.getElementById(`${scaleId}-interpretation`);
    if (interpretationElement) {
      interpretationElement.textContent = interpretation || '-';
    }
  }
}

export default new ScaleRenderer();

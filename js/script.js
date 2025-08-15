/**
 * script.js
 * 医学评分量表系统 - 主程序（侧栏 + 单容器动态加载结构）
 */

import scales from './scales.js';
import ScaleRenderer from './scale-renderer.js';
import ScaleController from './scale-controller.js';

/**
 * 页面加载完毕后初始化
 */
document.addEventListener('DOMContentLoaded', () => {
  initScaleList();
  initScaleEvents();
  initCopyButtons();     // 初始化复制功能
  loadDefaultScale();    // 加载第一个量表
  initSearchFilter();
});

/**
 * 初始化左侧列表）
 */

function initScaleList() {
  const scaleList = document.getElementById('scale-list');
  if (!scaleList) return;

  Object.entries(scales).forEach(([scaleId, scaleConfig]) => {
    const li = document.createElement('li');
    li.textContent = scaleConfig.name;
    li.dataset.scaleId = scaleId;
    scaleList.appendChild(li);
  });
}

function initSearchFilter() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    const keyword = input.value.trim().toLowerCase();

    document.querySelectorAll('#scale-list li').forEach(li => {
      const name = li.textContent.toLowerCase();
      const match = name.includes(keyword);
      li.style.display = match ? '' : 'none';
    });
  });
}

/**
 * 点击切换量表
 */
function initScaleEvents() {
  const container = document.getElementById('scale-list');
  if (!container) return;

  container.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li || !li.dataset.scaleId) return;

    const scaleId = li.dataset.scaleId;
    renderScaleById(scaleId);

    // 切换高亮
    document.querySelectorAll('#scale-list li, #favorite-list li').forEach(item => {
      item.classList.remove('active');
    });
    li.classList.add('active');
  });
}

/**
 * 根据量表ID渲染内容
 */
function renderScaleById(scaleId) {
  const scaleConfig = scales[scaleId];
  if (!scaleConfig) return;

  const container = document.getElementById('scale-container');
  if (!container) return;

  container.innerHTML = '';
  ScaleRenderer.renderScale(scaleConfig, container);
  ScaleController.initScale(scaleConfig);

  if (typeof scaleConfig.onInit === 'function') {
    try {
      scaleConfig.onInit();
    } catch (error) {
      console.error(`初始化量表 ${scaleId} 出错:`, error);
    }
  }
}

/**
 * 默认加载第一个量表
 */
function loadDefaultScale() {
  const firstId = Object.keys(scales)[0];
  if (firstId) {
    renderScaleById(firstId);

    // 默认选中左侧列表中第一个
    const firstLi = document.querySelector(`#scale-list li[data-scale-id="${firstId}"]`);
    if (firstLi) {
      firstLi.classList.add('active');
    }
  }
}

/**
 * 初始化复制按钮（事件委托方式，兼容动态插入）
 */
function initCopyButtons() {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('copy-btn')) return;

    const tabId = e.target.getAttribute('data-tab');
    if (!tabId) return;
    copyResult(tabId);
  });
}


/**
 * 复制评分结果
 */
function copyResult(tabId) {
  const scaleConfig = scales[tabId];
  if (!scaleConfig) return;

  const resultText = ScaleController.copyResult(tabId, scaleConfig);

  navigator.clipboard.writeText(resultText)
    .then(() => {
      const button = document.querySelector(`.copy-btn[data-tab="${tabId}"]`);
      if (!button) return;
      const originalText = button.textContent;
      button.textContent = '已复制!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制。');
    });
}

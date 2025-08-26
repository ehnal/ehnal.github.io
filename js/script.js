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
  filteredScaleIds = Object.keys(scales);
  currentPage = 1;
  renderScaleListPage(currentPage);
}


function initSearchFilter() {
  const input = document.getElementById('search-input');
  const button = document.getElementById('search-button');
  if (!input || !button) return;

   button.addEventListener('click', () => {
    const keyword = input.value.trim().toLowerCase();

    filteredScaleIds = Object.keys(scales).filter(id => {
      const name = scales[id].name.toLowerCase();
      return name.includes(keyword);
    });

    currentPage = 1;
    renderScaleListPage(currentPage);
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


/**
 * 左侧量表栏分页
 */

let currentPage = 1;
const itemsPerPage = 9;  //每一页展示多少个量表
let filteredScaleIds = Object.keys(scales);

function renderScaleListPage(page = 1) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const scaleListContainer = document.getElementById('scale-list');
  scaleListContainer.innerHTML = '';

  const pageItems = filteredScaleIds.slice(startIndex, endIndex);
  pageItems.forEach(scaleId => {
    const li = document.createElement('li');
    li.textContent = scales[scaleId].name;
 li.setAttribute('data-scale-id', scaleId); // ← 和事件、默认选中保持一致
    scaleListContainer.appendChild(li);
  });

  updatePaginationControls();
}


function updatePaginationControls() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(filteredScaleIds.length / itemsPerPage);

  if (currentPage > 1) {
    const prev = document.createElement('button');
    prev.textContent = '上一页';
    prev.onclick = () => {
      currentPage--;
      renderScaleListPage(currentPage);
    };
    pagination.appendChild(prev);
  }

  if (currentPage < totalPages) {
    const next = document.createElement('button');
    next.textContent = '下一页';
    next.onclick = () => {
      currentPage++;
      renderScaleListPage(currentPage);
    };
    pagination.appendChild(next);
  }
}

/**
 * 量表管理器
 * 全局管理所有量表配置和切换
 */

/**
 * 量表管理器类
 */
class ScaleManager {
  /**
   * 创建量表管理器
   * @param {HTMLElement} container - 主容器元素
   */
  constructor(container) {
    this.container = container;
    this.scales = new Map();  // 存储所有量表控制器
    this.tabsContainer = null;
  }

  /**
   * 注册量表控制器
   * @param {string} id - 量表ID
   * @param {Object} controller - 量表控制器
   */
  registerScaleController(id, controller) {
    this.scales.set(id, controller);
  }

  /**
   * 初始化标签页
   * @param {Array} scaleConfigs - 量表配置对象数组
   */
  initTabs(scaleConfigs) {
    // 创建标签容器
    this.tabsContainer = document.createElement('div');
    this.tabsContainer.className = 'tabs';
    
    // 为每个量表创建标签按钮
    scaleConfigs.forEach((config, index) => {
      const button = document.createElement('button');
      button.className = 'tab-btn';
      button.setAttribute('data-tab', config.id);
      button.textContent = config.name.split(' ')[0]; // 只使用名称的第一部分作为标签
      
      // 默认第一个标签为活动状态
      if (index === 0) {
        button.classList.add('active');
      }
      
      this.tabsContainer.appendChild(button);
    });
    
    return this.tabsContainer;
  }

  /**
   * 初始化标签切换功能
   */
  initTabSwitching() {
    if (!this.tabsContainer) return;
    
    const tabButtons = this.tabsContainer.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 切换到选中的标签
        this.switchToScale(button.getAttribute('data-tab'));
      });
    });
    
    // 验证标签切换功能
    console.assert(
      document.querySelector('.tab-btn.active') !== null,
      "标签按钮初始化失败，没有活动状态的标签按钮"
    );
  }

  /**
   * 切换到指定的量表
   * @param {string} scaleId - 量表ID
   */
  switchToScale(scaleId) {
    // 获取所有标签按钮和量表
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // 移除所有活动状态
    tabButtons.forEach(btn => btn.classList.remove('active'));
    this.scales.forEach(controller => controller.hide());
    
    // 激活选中的标签和量表
    const activeButton = document.querySelector(`.tab-btn[data-tab="${scaleId}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
    
    // 显示选中的量表
    const controller = this.scales.get(scaleId);
    if (controller) {
      controller.show();
    }
  }

  /**
   * 初始化所有量表的复制功能
   */
  initCopyFunctionality() {
    // 为每个量表添加复制按钮和功能
    this.scales.forEach((controller, scaleId) => {
      this.addCopyButton(
        `${scaleId}-result-container`, 
        `${scaleId}-result`,
        `复制${controller.config.name.split(' ')[0]}评分结果`
      );
    });
  }

  /**
   * 添加复制按钮到指定容器
   * @param {string} containerID - 容器的ID
   * @param {string} contentID - 要复制内容的元素ID
   * @param {string} buttonText - 按钮显示的文字
   */
  addCopyButton(containerID, contentID, buttonText) {
    const container = document.getElementById(containerID);
    if (!container) return;
    
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.textContent = buttonText;
    
    // 添加复制功能
    copyButton.addEventListener('click', function() {
      const content = document.getElementById(contentID);
      if (!content) return;
      
      // 创建选区，选择要复制的内容
      const range = document.createRange();
      range.selectNodeContents(content);
      
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      try {
        // 执行复制命令
        document.execCommand('copy');
        
        // 成功反馈
        copyButton.textContent = '已复制!';
        setTimeout(() => {
          copyButton.textContent = buttonText;
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
        copyButton.textContent = '复制失败';
        setTimeout(() => {
          copyButton.textContent = buttonText;
        }, 2000);
      }
      
      // 清除选区
      selection.removeAllRanges();
    });
    
    // 添加按钮到容器
    container.appendChild(copyButton);
  }
}

export { ScaleManager };

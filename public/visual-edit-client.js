/**
 * Visual Edit Client Script
 *
 * This script is loaded on all deployed stores and enables visual element selection
 * when the store is loaded in an iframe in the editor.
 */

(function() {
  // Only run if we're in an iframe
  if (window.self === window.top) {
    console.log('📝 Visual Edit Client: Not in iframe, skipping initialization');
    return;
  }

  console.log('🎨 Visual Edit Client: Initializing in iframe');

  let isSelectionEnabled = false;
  let currentHoveredElement = null;

  // Create overlay element for hover effect
  const overlay = document.createElement('div');
  overlay.id = 'lovable-selection-overlay';
  overlay.style.cssText = `
    position: fixed;
    pointer-events: none;
    border: 2px solid #3b82f6;
    background: rgba(59, 130, 246, 0.1);
    z-index: 999999;
    transition: all 0.1s ease;
    display: none;
  `;

  // Create tooltip for element info
  const tooltip = document.createElement('div');
  tooltip.id = 'lovable-selection-tooltip';
  tooltip.style.cssText = `
    position: fixed;
    background: #1f2937;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: monospace;
    z-index: 1000000;
    pointer-events: none;
    display: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  `;

  // Wait for DOM to be ready
  function initialize() {
    if (document.body) {
      document.body.appendChild(overlay);
      document.body.appendChild(tooltip);

      // Make all common elements selectable
      const selectableSelectors = 'h1, h2, h3, h4, h5, h6, p, span, button, a, img, div[class*="hero"], div[class*="card"], div[class*="section"], section, article, header, footer, nav';
      const elements = document.querySelectorAll(selectableSelectors);

      elements.forEach((el, index) => {
        // Add stable ID
        el.setAttribute('data-lovable-id', `el-${index}`);
        el.setAttribute('data-lovable-tag', el.tagName.toLowerCase());

        // Store original content
        if (el.textContent && el.textContent.trim()) {
          el.setAttribute('data-lovable-original-text', el.textContent.trim());
        }
        el.setAttribute('data-lovable-original-classes', el.className);
      });

      console.log(`✅ Visual Edit Client: Prepared ${elements.length} elements for selection`);
    } else {
      setTimeout(initialize, 100);
    }
  }

  // Listen for enable/disable selection mode
  window.addEventListener('message', (event) => {
    if (event.data.type === 'toggle-selection-mode') {
      isSelectionEnabled = event.data.enabled;
      console.log('🎯 Selection mode:', isSelectionEnabled ? 'ON' : 'OFF');

      if (!isSelectionEnabled) {
        overlay.style.display = 'none';
        tooltip.style.display = 'none';
        document.body.style.cursor = '';
      } else {
        document.body.style.cursor = 'crosshair';
      }
    }

    // Apply instant updates from parent
    if (event.data.type === 'apply-instant-update') {
      const { elementId, changes } = event.data;
      const element = document.querySelector(`[data-lovable-id="${elementId}"]`);

      if (element) {
        console.log('⚡ Applying instant update to:', elementId, changes);

        // Apply text change - ONLY if it's not null/undefined
        if (changes.text !== undefined && changes.text !== null) {
          if (element.tagName === 'IMG') {
            element.alt = changes.text;
          } else {
            element.textContent = changes.text;
          }
        }

        // Apply class changes - ONLY if it's not null/undefined
        if (changes.classes !== undefined && changes.classes !== null) {
          element.className = changes.classes;
        }

        // Apply style changes (direct styles for instant preview) - ONLY if truthy
        if (changes.fontSize) {
          element.style.fontSize = changes.fontSize;
        }
        if (changes.color) {
          element.style.color = changes.color;
        }
        if (changes.backgroundColor) {
          element.style.backgroundColor = changes.backgroundColor;
        }

        // Flash effect to show change
        element.style.transition = 'background-color 0.3s';
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = '#fef3c7';
        setTimeout(() => {
          // Restore to the new background if one was set, otherwise clear
          if (changes.backgroundColor) {
            element.style.backgroundColor = changes.backgroundColor;
          } else {
            element.style.backgroundColor = originalBg || '';
          }
        }, 500);
      }
    }
  });

  // Mouse move handler for hover overlay
  document.addEventListener('mousemove', (e) => {
    if (!isSelectionEnabled) return;

    const target = e.target;
    const lovableId = target.getAttribute('data-lovable-id');

    if (lovableId && target !== currentHoveredElement) {
      currentHoveredElement = target;

      const rect = target.getBoundingClientRect();

      // Update overlay
      overlay.style.display = 'block';
      overlay.style.top = rect.top + 'px';
      overlay.style.left = rect.left + 'px';
      overlay.style.width = rect.width + 'px';
      overlay.style.height = rect.height + 'px';

      // Update tooltip
      const tagName = target.getAttribute('data-lovable-tag');
      const text = target.textContent?.trim().substring(0, 30) || '';
      const tooltipText = `<${tagName}> ${text ? '"' + text + '..."' : ''}`;

      tooltip.textContent = tooltipText;
      tooltip.style.display = 'block';
      tooltip.style.top = (rect.top - 30) + 'px';
      tooltip.style.left = rect.left + 'px';
    }
  });

  // Click handler for element selection
  document.addEventListener('click', (e) => {
    if (!isSelectionEnabled) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    const lovableId = target.getAttribute('data-lovable-id');

    if (lovableId) {
      console.log('🎯 Element selected:', lovableId);

      // Get computed styles
      const computed = window.getComputedStyle(target);

      // Extract Tailwind classes (approximate)
      const classes = target.className;

      // Send to parent
      window.parent.postMessage({
        type: 'element-selected',
        element: {
          id: lovableId,
          tagName: target.getAttribute('data-lovable-tag'),
          text: target.textContent?.trim() || '',
          originalText: target.getAttribute('data-lovable-original-text') || '',
          classes: classes,
          originalClasses: target.getAttribute('data-lovable-original-classes') || '',
          computedStyles: {
            fontSize: computed.fontSize,
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontWeight: computed.fontWeight,
            textAlign: computed.textAlign,
            padding: computed.padding,
            margin: computed.margin,
          }
        }
      }, '*');
    }
  });

  // Disable selection mode on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isSelectionEnabled) {
      window.parent.postMessage({
        type: 'disable-selection-mode'
      }, '*');
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Notify parent that visual edit client is ready
  window.addEventListener('load', () => {
    window.parent.postMessage({
      type: 'visual-edit-client-ready'
    }, '*');
  });
})();

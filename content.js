// **Credits**
// repository 
// Based on https://greasyfork.org/en/scripts/463493-openai-chat-copy-code-button

'use strict';

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied code to clipboard');
  }, (err) => {
    console.error('Failed to copy code: ', err);
  });
};

const addButton = (elem) => {
  const button = document.createElement('button');
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  textContainer.textContent = 'Copy Code';
  const svgContainer = document.createElement('div');
  svgContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"></path><path d="M9 6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>';

  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '.5rem';

  button.style.position = 'absolute';
  button.style.bottom = '.5rem';
  button.style.right = '.5rem';
  button.style.fontSize = '12px';
  button.style.padding = '4px 8px';
  button.style.border = '.5rem';
  button.style.borderRadius = '.5rem';
  button.style.background = 'transparent';
  button.style.color = 'white';
  button.style.cursor = 'pointer';
  button.style.zIndex = '10';

  // Aplicar la fuente Söhne
  container.style.fontFamily = 'Söhne, sans-serif';
  textContainer.style.fontFamily = 'Söhne, sans-serif';

  button.addEventListener('mouseover', () => {
    button.style.background = '#202123';
  });

  button.addEventListener('mouseout', () => {
    button.style.background = 'transparent';
  });

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    try {
      copyToClipboard(elem.querySelector('code').textContent);

      textContainer.textContent = 'Copied!';
      svgContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M5.5 12L10 16.5L18.5 8" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

      setTimeout(() => {
        textContainer.textContent = 'Copy Code';
        svgContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"></path><path d="M9 6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>';
      }, 1000);
    } catch (error) {
      console.error('Error copying code:', error);
    }
  });

  container.appendChild(svgContainer);
  container.appendChild(textContainer);
  button.appendChild(container);
  elem.style.position = 'relative';
  elem.appendChild(button);
};

const observeCodeBlocks = () => {
  chrome.storage.sync.get(['extensionEnabled'], function (result) {
    if (result.extensionEnabled !== false) {
      const codeBlocks = document.querySelectorAll('pre:not(.copy-code-processed)');
      if (codeBlocks.length) {
        codeBlocks.forEach(block => {
          addButton(block);
          block.classList.add('copy-code-processed');
        });
      }
    }
  });
};

const observer = new MutationObserver(observeCodeBlocks);
observer.observe(document.body, { childList: true, subtree: true });

observeCodeBlocks();

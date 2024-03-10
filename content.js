// **Credits**
// repository https://github.com/Glouwhy/CodeGrab
// Based on https://greasyfork.org/en/scripts/463493-openai-chat-copy-code-button
// Svg's & Font from https://chat.openai.com

'use strict';

const copyToClipboard = (codeElement) => {
  const text = codeElement.textContent.trim();
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
  container.style.gap = '.2rem';

  button.style.position = 'absolute';
  button.style.bottom = '.5rem';
  button.style.right = '.5rem';
  button.style.fontSize = '12px';
  button.style.padding = '4px 8px';
  button.style.border = '.5rem';
  button.style.borderRadius = '.375rem';
  button.style.background = 'transparent';
  button.style.color = 'white';
  button.style.cursor = 'pointer';
  button.style.zIndex = '10';

  container.style.fontFamily = 'Söhne, sans-serif';
  textContainer.style.fontFamily = 'Söhne, sans-serif';

  button.addEventListener('mouseover', () => {
    button.style.background = '#202123ae';
  });

  button.addEventListener('mouseout', () => {
    button.style.background = 'transparent';
  });

  button.addEventListener('click', (e) => {
  e.stopPropagation();
  const codeElement = elem.querySelector('code');
  if (codeElement) {
    copyToClipboard(codeElement);
    textContainer.textContent = 'Copied!';
    svgContainer.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z" fill="currentColor"></path></svg>';

    setTimeout(() => {
      textContainer.textContent = 'Copy Code';
      svgContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"></path><path d="M9 6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>';
    }, 1000);
  } else {
    console.error('Code element not found');
  }
});

  container.appendChild(svgContainer);
  container.appendChild(textContainer);
  button.appendChild(container);
  elem.style.position = 'relative';
  elem.appendChild(button);
};

const observeCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll('pre:not(.copy-code-processed)');
  if (codeBlocks.length) {
    codeBlocks.forEach(block => {
      addButton(block);
      block.classList.add('copy-code-processed');
    });
  }
};

const observer = new MutationObserver(observeCodeBlocks);
observer.observe(document.body, { childList: true, subtree: true });

observeCodeBlocks();

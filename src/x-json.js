// Warning: it is dependent on jsonata.
document.addEventListener('alpine:init', () => {
  const cache = new Map();
  
  Alpine.directive('json', (el, { expression, modifiers }, { cleanup }) => {
    if (!expression) return;

    const [url, ...exprParts] = expression.split('|').map(s => s.trim());
    const jsonataExpr = exprParts.join('|') || '$';
    const isHtml = modifiers.includes('html');

    const controller = new AbortController();

    (async () => {
      try {
        
        !cache.has(url) && cache.set(url, fetch(url, { signal: controller.signal }).then(r => r.json()));
        
        const data = await cache.get(url);
        const result = await jsonata(jsonataExpr).evaluate(data);

        isHtml
          ? el.innerHTML = result ?? ''
          : el.textContent = result ?? ''
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('[x-json]', e + ' : ' + url);
          el.textContent = '';
        }
      }
    })();

    cleanup(() => controller.abort());
  });
});
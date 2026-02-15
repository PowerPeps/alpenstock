document.addEventListener('alpine:init', () => {
  Alpine.directive('template', (el, { modifiers }) => {
    const original = el.innerHTML;
    const regex = /\\([{}])|{\s*([^}]+)\s*}/g;
    Alpine.effect(() => {
      const html = original.replace(regex, (_, escaped, key) => escaped ?? (Alpine.evaluate(el, key) ?? ''));
      
      modifiers.includes('html')
        ? (el.innerHTML = html)
        : (el.textContent = html);
    });
  });
});
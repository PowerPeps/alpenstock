document.addEventListener('alpine:init', () => {
  Alpine.directive('anchor', (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
    
    effect(() => {
      let anchorEl = Alpine.$data(el).$refs?.[expression];
      if (!anchorEl) return;
      
      anchorEl.style.anchorName = `--${expression}`;
    });

    Object.assign(el.style, {
      position: 'absolute',
      positionAnchor: `--${expression}`,
    });

    const positions = {
      top: () => el.style.top = 'anchor(top)',
      bottom: () => el.style.top = 'anchor(bottom)',
      left: () => el.style.left = 'anchor(left)',
      right: () => el.style.left = 'anchor(right)',
    };

    modifiers.forEach(m => positions[m]?.());
    
    cleanup(() => {
      el.style.positionAnchor = '';
      anchorEl.style.anchorName = '';
    });
    
  });
});
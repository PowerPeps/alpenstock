document.addEventListener('alpine:init', () => {
  Alpine.directive('draggable', (el, { expression, modifiers }, { evaluate, cleanup }) => {
    let drag = null;
    
    const getContainers = () => expression.split(/\s+/).map(r => evaluate(`$refs.${r}`)).filter(Boolean);
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const inRect = (x, y, r) => x > r.left && x < r.right && y > r.top && y < r.bottom;
    
    el.style.cssText = 'position:absolute;cursor:grab;touch-action:none;';

    const down = e => {
      const containers = getContainers();
      if (!containers.length) return;
      
      e.preventDefault();
      const p = e.touches?.[0] ?? e;
      const r = el.getBoundingClientRect();
      
      const rects = containers.map(c => ({ el: c, rect: c.getBoundingClientRect() }));
      const union = {
        left: Math.min(...rects.map(r => r.rect.left)),
        top: Math.min(...rects.map(r => r.rect.top)),
        right: Math.max(...rects.map(r => r.rect.right)),
        bottom: Math.max(...rects.map(r => r.rect.bottom))
      };
      
      drag = {
        ox: p.clientX - r.left,
        oy: p.clientY - r.top,
        w: r.width,
        h: r.height,
        rects,
        union
      };
      
      el.style.cursor = 'grabbing';
    };

    const move = e => {
      if (!drag) return;
      const p = e.touches?.[0] ?? e;
      const { ox, oy, w, h, rects, union } = drag;
      
      let x = clamp(p.clientX - ox, union.left, union.right - w);
      let y = clamp(p.clientY - oy, union.top, union.bottom - h);
      
      const cx = x + w / 2, cy = y + h / 2;
      const target = rects.find(r => r.el !== el.parentElement && inRect(cx, cy, r.rect));
      if (target) el.parentElement !== target.el && target.el.appendChild(el);
      
      const parent = rects.find(r => r.el === el.parentElement);
      if (parent) {
        const b = parent.rect;
        x = clamp(x, b.left, b.right - w);
        y = clamp(y, b.top, b.bottom - h);
        el.style.left = x - b.left + 'px';
        el.style.top = y - b.top + 'px';
      }
      
      if (modifiers.includes('opacity')) {
        const valid = rects.some(r => inRect(p.clientX, p.clientY, r.rect));
        el.style.opacity = valid ? 1 : 0.5;
      }
    };

    const up = () => {
      if (!drag) return;
      drag = null;
      el.style.cursor = 'grab';
      el.style.opacity = 1;
    };

    el.addEventListener('mousedown', down);
    el.addEventListener('touchstart', down, { passive: false });
    addEventListener('mousemove', move);
    addEventListener('touchmove', move, { passive: false });
    addEventListener('mouseup', up);
    addEventListener('touchend', up);

    cleanup(() => {
      removeEventListener('mousemove', move);
      removeEventListener('touchmove', move);
      removeEventListener('mouseup', up);
      removeEventListener('touchend', up);
    });
  });
});
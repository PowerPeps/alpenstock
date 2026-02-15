document.addEventListener('alpine:init', () => {
  Alpine.directive('write', (el, { expression, modifiers }, { cleanup }) => {
    let delay = Number(expression) || 0;
    let startDelay = Number(modifiers[0]) || 0;
    let chars = Array.from(el.textContent);
    
    if (!chars.length) return;
    
    el.setAttribute('aria-label', el.textContent);
    el.textContent = '';
    
    let animationId, timeoutId, index=0, lastTime=0, running=0;
    
    function animate(currentTime) {
      if (!running) return;
      
      if (currentTime - lastTime >= delay) {
        el.textContent += chars[index++];
        lastTime = currentTime;
      }
      
      index < chars.length
        ? animationId = requestAnimationFrame(animate)
        : running = 0;
    }
    
    function start() {
      running = !0;
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }
    
    function cleanup() {
      running = 0;
      animationId && cancelAnimationFrame(animationId);
      timeoutId && clearTimeout(timeoutId);
    }
    
    startDelay
      ? timeoutId = setTimeout(start, startDelay)
      : start();
  });
});
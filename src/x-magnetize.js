document.addEventListener('alpine:init', () => {
  window.Alpine.directive('magnetize', (el, { expression, modifiers }, { evaluate }) => {
    const targetRefs = expression ? expression.split(/[,\s]+/).filter(t => t.trim()) : [];
    let targets = [];
    let animationFrameId = null;
    let lastBarycenter = null;
    let lastRotation = null;
    let retryCount = 0;
    const MAX_RETRIES = 10;
    
    const findTargets = () => {
      return targetRefs
        .map(r => evaluate(`$refs.${r}`))
        .filter(Boolean);
    };
    
    const getCenter = (element) => {
      const rect = element.getBoundingClientRect();
      return { 
        x: rect.left + rect.width / 2, 
        y: rect.top + rect.height / 2 
      };
    };
    
    const calculateBarycenter = (targets) => {
      if (targets.length === 0) return null;
      
      let sumX = 0, sumY = 0;
      for (const target of targets) {
        const center = getCenter(target);
        sumX += center.x;
        sumY += center.y;
      }
      
      return {
        x: sumX / targets.length, 
        y: sumY / targets.length 
      };
    };
    
    const calculateRotation = (targets) => {
      if (targets.length < 2) return 0;
      
      const center1 = getCenter(targets[0]);
      const center2 = getCenter(targets[1]);
      
      const deltaX = center2.x - center1.x;
      const deltaY = center2.y - center1.y;
      
      const angleRad = Math.atan2(deltaY, deltaX);
      const angleDeg = angleRad * (180 / Math.PI);
      
      return angleDeg;
    };
    
    const positionElement = (position, rotation) => {
      const rect = el.getBoundingClientRect();
      const finalX = position.x - rect.width / 2;
      const finalY = position.y - rect.height / 2;
      
      el.style.position = 'fixed';
      el.style.left = '0';
      el.style.top = '0';
      el.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${rotation}deg)`;
      el.style.zIndex = '1000';
      el.style.willChange = 'transform';
    };
    
    const updatePosition = () => {
      if (targets.length === 0 && retryCount < MAX_RETRIES) {
        targets = findTargets();
        retryCount++;
        if (targets.length === 0) return;
      }
      
      if (targets.length === 0) return;
      
      const barycenter = calculateBarycenter(targets);
      const rotation = modifiers.includes('rotate') ? calculateRotation(targets) : 0;
      
      const positionChanged = barycenter && (!lastBarycenter || 
        Math.abs(barycenter.x - lastBarycenter.x) > 0.5 || 
        Math.abs(barycenter.y - lastBarycenter.y) > 0.5);
      
      const rotationChanged = lastRotation === null || 
        Math.abs(rotation - lastRotation) > 0.5;
      
      if (positionChanged || rotationChanged) {
        positionElement(barycenter, rotation);
        lastBarycenter = barycenter;
        lastRotation = rotation;
      }
    };
    
    const initialize = () => {
      targets = findTargets();
      if (targets.length > 0) {
        updatePosition();
      } else if (retryCount < MAX_RETRIES) {
        requestAnimationFrame(initialize);
      }
    };
    
    requestAnimationFrame(initialize);
    
    if (modifiers.includes('live')) {
      const animationLoop = () => {
        updatePosition();
        animationFrameId = requestAnimationFrame(animationLoop);
      };
      animationFrameId = requestAnimationFrame(animationLoop);
    } else {
      const resizeObserver = new ResizeObserver(updatePosition);
      targets.forEach(target => resizeObserver.observe(target));
      window.addEventListener('scroll', updatePosition, { passive: true });
      
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('scroll', updatePosition);
      };
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      el.style.willChange = 'auto';
    };
  });
});
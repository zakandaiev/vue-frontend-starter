/*
  Before usage:
  1. npm install animate.css --save
  2. Uncomment import in @src/sass/vendor/_all.scss
*/

import { vibrate } from '@/util/vibrate';
import { ref, useTemplateRef } from 'vue';

function useAnimate(animationRefName = 'animateNode', animationPrefix = 'animate__') {
  const nodeRef = useTemplateRef(animationRefName);
  const isAnimating = ref(false);

  function animate(animationName, vibrateName) {
    if (!nodeRef.value || isAnimating.value || typeof animationName !== 'string') {
      return false;
    }

    return new Promise((resolve) => {
      const node = nodeRef.value;
      const coreClassName = `${animationPrefix}animated`;
      const animationClassName = `${animationPrefix}${animationName}`;

      node.classList.add(coreClassName, animationClassName);
      node.addEventListener('animationend', handleAnimationEnd, { once: true });

      if (vibrateName) {
        vibrate(vibrateName);
      }

      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(coreClassName, animationClassName);
        isAnimating.value = false;
        resolve(true);
      }
    });
  }

  return {
    nodeRef,
    isAnimating,
    animate,
  };
}

export default useAnimate;

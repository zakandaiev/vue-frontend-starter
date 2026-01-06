const KeyboardFocusFix = {
  paddingMap: new WeakMap(),
  stickyElements: new Set(),

  install() {
    document.body.addEventListener('focus', KeyboardFocusFix.handleFocus, true);
    document.body.addEventListener('blur', KeyboardFocusFix.handleBlur, true);
  },

  isDeviceIos() {
    return window.navigator?.userAgent
      ? /iphone|ipad|macintosh/.test(window.navigator.userAgent.toLowerCase())
      : false;
  },

  isNodeInputable(node) {
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName);
  },

  isNodeForcedToScroll(node) {
    return node.hasAttribute('data-force-scroll-on-focus');
  },

  findScrollableParent(el) {
    let current = el.parentElement;

    while (current) {
      const { overflowY } = getComputedStyle(current);

      const isScrollable = overflowY === 'auto' || overflowY === 'scroll' ? true : false;
      if (isScrollable) {
        return current;
      }

      current = current.parentElement;
    }

    return document.body;
  },

  disableStickyElements(parentNode) {
    if (!parentNode) {
      return false;
    }

    parentNode.querySelectorAll('*').forEach((el) => {
      const style = getComputedStyle(el);
      if (style.position !== 'sticky') {
        return false;
      }

      el.originalPosition = el.style.position;
      el.style.position = 'static';

      KeyboardFocusFix.stickyElements.add(el);
    });
  },

  restoreStickyElements() {
    KeyboardFocusFix.stickyElements.forEach((el) => {
      el.style.position = el.originalPosition || '';
      delete el.originalPosition;
    });

    KeyboardFocusFix.stickyElements.clear();
  },

  handleFocus(event) {
    const { target } = event;

    const isDeviceIos = KeyboardFocusFix.isDeviceIos();
    const isNodeInputable = KeyboardFocusFix.isNodeInputable(target);
    const isNodeForcedToScroll = KeyboardFocusFix.isNodeForcedToScroll(target);
    if (!isNodeForcedToScroll && (!isDeviceIos || !isNodeInputable)) {
      return false;
    }

    const scrollContainer = KeyboardFocusFix.findScrollableParent(target);
    const originalPadding = parseFloat(getComputedStyle(scrollContainer).paddingBottom) || 0;

    KeyboardFocusFix.disableStickyElements(scrollContainer);

    // Wait for keyboard loaded
    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const viewportHeightCenter = viewportHeight / 2;

      const isNodePlacedAboveViewportCenter = rect.bottom <= viewportHeightCenter
        ? true
        : false;

      if (isNodePlacedAboveViewportCenter && !isNodeForcedToScroll) {
        return false;
      }

      if (!KeyboardFocusFix.paddingMap.has(scrollContainer)) {
        KeyboardFocusFix.paddingMap.set(scrollContainer, originalPadding);
        scrollContainer.style.paddingBottom = `${originalPadding + (isNodeForcedToScroll && isNodePlacedAboveViewportCenter ? viewportHeight : viewportHeightCenter)}px`;
      }

      target.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }, 1000);
  },

  handleBlur(event) {
    const { target } = event;

    const isDeviceIos = KeyboardFocusFix.isDeviceIos();
    const isNodeInputable = KeyboardFocusFix.isNodeInputable(target);
    const isNodeForcedToScroll = KeyboardFocusFix.isNodeForcedToScroll(target);
    if (!isNodeForcedToScroll && (!isDeviceIos || !isNodeInputable)) {
      return false;
    }

    const scrollContainer = KeyboardFocusFix.findScrollableParent(target);
    const originalPadding = KeyboardFocusFix.paddingMap.get(scrollContainer);

    KeyboardFocusFix.restoreStickyElements();

    if (originalPadding !== undefined) {
      let isCleaned = false;

      const cleanup = () => {
        if (isCleaned) {
          return false;
        }

        scrollContainer.style.paddingBottom = `${originalPadding}px`;
        KeyboardFocusFix.paddingMap.delete(scrollContainer);

        document.removeEventListener('click', onClick, true);
        document.removeEventListener('touchend', onClick, true);

        isCleaned = true;
      };

      const onClick = () => {
        requestAnimationFrame(cleanup);
      };

      document.addEventListener('click', onClick, true);
      document.addEventListener('touchend', onClick, true);

      setTimeout(cleanup, 1000);
    }
  },
};

export default KeyboardFocusFix;

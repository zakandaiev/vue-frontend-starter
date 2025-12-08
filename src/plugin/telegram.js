const Telegram = {
  startParam: {},
  isInstalled: false,
  isReady: false,

  install: (app, options = {}) => {
    if (Telegram.isInstalled) {
      return true;
    }

    app.config.globalProperties.$telegram = Telegram;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.onload = () => {
      const webApp = window?.Telegram?.WebApp;
      const isPlatformSupported = typeof webApp.platform === 'string' && webApp.platform.length && webApp.platform !== 'unknown';

      const optOnLoad = typeof options.onLoad === 'function' ? options.onLoad : false;
      if (optOnLoad) {
        optOnLoad(isPlatformSupported, webApp);
      }

      if (!isPlatformSupported) {
        return false;
      }

      Object.assign(Telegram, webApp);
      Telegram.startParam = Telegram.parseStartParam(webApp.initDataUnsafe?.start_param);
      Telegram.isReady = true;

      const optRouter = options.router ? options.router : false;
      if (optRouter) {
        Telegram.setRouterHistoryToBackButton(optRouter);
      }

      const optOnReady = typeof options.onReady === 'function' ? options.onReady : false;
      if (optOnReady) {
        optOnReady(webApp);
      }
    };

    // https://github.com/Telegram-Mini-Apps/tma.js/issues/664#issuecomment-2667879251
    window.TelegramGameProxy = { receiveEvent() {} };

    document.head.appendChild(script);

    Telegram.isInstalled = true;

    return true;
  },

  /**
   * Parse start_param from Telegram init data object
   * returns object
   * "__" is equal to "&"
   * "--" is equal to "="
   * example in:
   * "x--123__y--321__z"
   * example out:
   * { "x": "123", "y": "321", "z": true }
   */
  parseStartParam: (startParamString) => {
    const result = {};

    if (typeof startParamString !== 'string' || !startParamString.length) {
      return result;
    }

    const pairs = startParamString.split('__').filter(Boolean);
    pairs.forEach((pair) => {
      const [key, ...rest] = pair.split('--').filter(Boolean);
      const value = rest.join('--');

      if (!key) {
        return false;
      }

      if (typeof value === 'string' && value.length) {
        result[key] = value;
      } else {
        result[key] = true;
      }
    });

    return result;
  },

  setRouterHistoryToBackButton: (router) => {
    if (!router?.afterEach || !Telegram?.BackButton?.hide || !Telegram?.BackButton?.show) {
      return false;
    }

    Telegram.BackButton.onClick(() => {
      if (window?.history?.state?.back) {
        window.history.back();
      } else {
        Telegram.BackButton.hide();
      }
    });

    router.afterEach(() => {
      if (window?.history?.state?.back) {
        Telegram.BackButton.show();
      } else {
        Telegram.BackButton.hide();
      }
    });

    return true;
  },
};

export default Telegram;

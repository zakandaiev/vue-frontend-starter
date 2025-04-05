const Telegram = {
  isInstalled: false,
  isReady: false,

  install: (app, options = {}) => {
    if (Telegram.isInstalled) {
      return true;
    }

    app.config.globalProperties.$telegram = Telegram;

    const optDisableSwipes = options.disableSwipes === false ? false : true;
    const optExpand = options.expand === false ? false : true;
    const optRouter = options.router ? options.router : false;
    const optOnReady = typeof options.onReady === 'function' ? options.onReady : false;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.onload = () => {
      const webApp = window?.Telegram?.WebApp;

      if (!webApp.platform || !webApp.platform.length || webApp.platform === 'unknown') {
        return false;
      }

      Object.assign(Telegram, webApp);

      if (optDisableSwipes) {
        Telegram.disableVerticalSwipes();
      }

      if (optExpand) {
        Telegram.expand();
      }

      if (optRouter) {
        Telegram.setRouterHistoryToBackButton(optRouter);
      }

      if (optOnReady) {
        optOnReady(webApp);
      }

      Telegram.isReady = true;
    };

    document.head.appendChild(script);

    Telegram.isInstalled = true;

    return true;
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

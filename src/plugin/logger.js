import Config from '@/config';
import { request } from '@/util/request';
import { urlFull } from '@/util/route';

const Logger = {
  isInstalled: false,
  isReady: false,
  isEnabled: true,

  install: (app, options = {}) => {
    if (Logger.isInstalled) {
      return true;
    }

    app.config.globalProperties.$logger = Logger;

    Logger.isEnabled = options.enabled === false ? false : true;

    window.onerror = async (message, source, line, col, error) => Logger.logError({
      message,
      source,
      line,
      col,
      stack: error?.stack || null,
    });

    Logger.isInstalled = true;
    Logger.isReady = true;

    return true;
  },

  logError: async (error) => {
    if (!Logger.isEnabled || error?.message === 'Script error.') {
      return false;
    }

    const url = `${Config.api.backend}/logError`;

    const options = {
      method: 'POST',
      body: {
        app: { ...Config.app },
        url: urlFull,
        error,
      },
    };

    const data = await request(url, options);

    return data;
  },
};

export default Logger;

const Config = {
  app: {
    /* eslint-disable no-undef */
    name: APP_NAME,
    version: APP_VERSION,
    mode: APP_MODE,
  },
  api: {
    delayMs: 500,
    timeoutMs: 30000,

    backend: 'http://localhost:4173',
  },
  i18n: {
    default: 'en',
    supported: ['en', 'uk'],
  },
  search: {
    debounceMs: 1000,
  },
};

export default Config;

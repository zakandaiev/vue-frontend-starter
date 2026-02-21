import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@/App.vue';
import i18n from '@/i18n';
// import Clarity from '@/plugin/clarity';
import Translation from '@/i18n/translation';
import KeyboardFocusFix from '@/plugin/keyboard-focus-fix';
// import Logger from '@/plugin/logger';
// import Telegram from '@/plugin/telegram';
import router from '@/router';

let isAppMounted = false;
const mountApp = () => {
  if (!isAppMounted) {
    app.mount('#app');
    isAppMounted = true;
    return true;
  }
  return false;
};

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Translation);
app.use(KeyboardFocusFix);

// app.use(Clarity, {
//   id: import.meta.env.APP_CLARITY_ID,
//   enabled: import.meta.env.PROD,
// });

// app.use(Logger, {
//   enabled: import.meta.env.PROD,
// });

// app.use(Telegram, {
//   router,
//   onLoad: (isPlatformSupported) => {
//     if (!isPlatformSupported) {
//       mountApp();
//     }
//   },
//   onReady: (webApp) => {
//     webApp.disableVerticalSwipes();
//     webApp.enableClosingConfirmation();
//     webApp.expand();
//     webApp.lockOrientation();
//     // webApp.requestFullscreen();

//     mountApp();
//   },
// });

mountApp();

// eslint-disable-next-line no-console
console.log('%cMade by Zakandaiev', 'background:#41b883;color:#fff;padding:10px;font-weight:bold;');

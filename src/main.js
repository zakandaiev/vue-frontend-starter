import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';
import Translation from '@/i18n/translation';
import KeyboardFocusFix from '@/plugin/keyboard-focus-fix';
import Logger from '@/plugin/logger';
// import Telegram from '@/plugin/telegram';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Translation);
app.use(KeyboardFocusFix);

app.use(Logger, {
  enabled: import.meta.env.PROD,
});

// app.use(Telegram, {
//   router,
//   onReady: (webApp) => {
//     webApp.disableVerticalSwipes();
//     webApp.enableClosingConfirmation();
//     webApp.expand();
//     webApp.lockOrientation();
//     // webApp.requestFullscreen();
//   },
// });

app.mount('#app');

// eslint-disable-next-line
console.log('%cMade by Zakandaiev', 'background:#41b883;color:#fff;padding:10px;font-weight:bold;');

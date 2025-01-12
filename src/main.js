import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';
import Translation from '@/i18n/translation';
import i18nLocalScope from '@/plugin/i18n-local-scope';
import Logger from '@/plugin/logger';
// import Telegram from '@/plugin/telegram';

// eslint-disable-next-line
console.log('%cMade by Zakandaiev', 'background:#41b883;color:#fff;padding:10px;font-weight:bold;');

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(i18nLocalScope);
app.use(Translation);
app.use(Logger, { enabled: import.meta.env.PROD });
// app.use(Telegram, { router });

app.mount('#app');

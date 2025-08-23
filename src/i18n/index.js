import { createI18n } from 'vue-i18n';
import pluralRules from './rule/pluralization';
import numberFormats from './rule/numbers';
import datetimeFormats from './rule/datetime';
import messages from '@intlify/unplugin-vue-i18n/messages';
import Config from '@/config';

const defaultLocale = Config.i18n.default;

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  globalInjection: true,
  legacy: false,
  runtimeOnly: false,
  pluralRules,
  numberFormats,
  datetimeFormats,
  messages,
});

export default i18n;

import Config from '@/config';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';
import datetimeFormats from './rule/datetime';
import numberFormats from './rule/numbers';
import pluralRules from './rule/pluralization';

const defaultLocale = Config.i18n.default;

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  globalInjection: true,
  legacy: false,
  runtimeOnly: false,
  fallbackWarn: false,
  missingWarn: false,
  messages,
  datetimeFormats,
  numberFormats,
  pluralRules,
});

export default i18n;

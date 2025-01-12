import { createI18n } from 'vue-i18n';
import pluralRules from './rule/pluralization';
import numberFormats from './rule/numbers';
import datetimeFormats from './rule/datetime';
import Config from '@/config';
import messages from '@intlify/unplugin-vue-i18n/messages';

const defaultLocale = Config.i18n.default;

export default createI18n({
  globalInjection: true,
  legacy: false,
  runtimeOnly: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  pluralRules,
  numberFormats,
  datetimeFormats,
  messages,
});

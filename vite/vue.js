import VueI18nPluginInstance from '@intlify/unplugin-vue-i18n/vite';
import vueInstance from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import vueDevToolsInstance from 'vite-plugin-vue-devtools';
import { absPath } from './path.js';

const vueConfig = {};
const vue = () => vueInstance(vueConfig);

const vueDevToolsConfig = {};
const vueDevTools = () => vueDevToolsInstance(vueDevToolsConfig);

const vueI18nConfig = {
  include: resolve(absPath.i18n, 'locale', '**'),
};
const vueI18n = () => VueI18nPluginInstance(vueI18nConfig);

export {
  vue,
  vueDevTools,
  vueI18n,
};

export default vue;

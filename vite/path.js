import nodePath from 'node:path';
import { cwd } from 'node:process';
import { processArg } from './app.js';

const pathDist = processArg.dist || './dist';
const pathNodeModules = './node_modules';
const pathPublic = './public';
const pathSrc = './src';

const absPath = {
  root: nodePath.resolve(cwd()),
  dist: nodePath.resolve(cwd(), pathDist),
  nodeModules: nodePath.resolve(cwd(), pathNodeModules),
  public: nodePath.resolve(cwd(), pathPublic),
  src: nodePath.resolve(cwd(), pathSrc),
  api: nodePath.resolve(cwd(), pathSrc, 'api'),
  component: nodePath.resolve(cwd(), pathSrc, 'component'),
  composable: nodePath.resolve(cwd(), pathSrc, 'composable'),
  font: nodePath.resolve(cwd(), pathSrc, 'font'),
  i18n: nodePath.resolve(cwd(), pathSrc, 'i18n'),
  img: nodePath.resolve(cwd(), pathSrc, 'img'),
  layout: nodePath.resolve(cwd(), pathSrc, 'layout'),
  plugin: nodePath.resolve(cwd(), pathSrc, 'plugin'),
  router: nodePath.resolve(cwd(), pathSrc, 'router'),
  sass: nodePath.resolve(cwd(), pathSrc, 'sass'),
  store: nodePath.resolve(cwd(), pathSrc, 'store'),
  util: nodePath.resolve(cwd(), pathSrc, 'util'),
  view: nodePath.resolve(cwd(), pathSrc, 'view'),
};

export {
  absPath,
  pathDist,
  pathSrc,
};

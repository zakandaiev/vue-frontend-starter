import { processArg } from '#core/app.js';
import nodePath from 'node:path';
import { cwd } from 'node:process';

const pathCore = './core';
const pathNodeModules = './node_modules';
const pathPublic = './public';
const pathSrc = './src';
const pathDist = processArg.dist || './dist';

const absPath = {
  root: nodePath.resolve(cwd()),
  core: nodePath.resolve(cwd(), pathCore),
  nodeModules: nodePath.resolve(cwd(), pathNodeModules),
  public: nodePath.resolve(cwd(), pathPublic),
  dist: nodePath.resolve(cwd(), pathDist),
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

function joinPath(...args) {
  return nodePath.join(...args);
}

function resolvePath(...args) {
  return nodePath.resolve(cwd(), ...args);
}

export {
  absPath,
  joinPath,
  pathCore,
  pathDist,
  pathNodeModules,
  pathPublic,
  pathSrc,
  resolvePath,
};

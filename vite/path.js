import nodePath from 'node:path';
import { cwd } from 'node:process';
import { processArg } from './app.js';

const pathDist = processArg.dist || './dist';
const pathSrc = './src';

const absPath = {
  root: nodePath.resolve(cwd()),
  node: nodePath.resolve(cwd(), 'node_modules'),
  dist: nodePath.resolve(cwd(), pathDist),
  src: nodePath.resolve(cwd(), pathSrc),
  api: nodePath.resolve(cwd(), `${pathSrc}/api`),
  component: nodePath.resolve(cwd(), `${pathSrc}/component`),
  composable: nodePath.resolve(cwd(), `${pathSrc}/composable`),
  font: nodePath.resolve(cwd(), `${pathSrc}/font`),
  i18n: nodePath.resolve(cwd(), `${pathSrc}/i18n`),
  img: nodePath.resolve(cwd(), `${pathSrc}/img`),
  layout: nodePath.resolve(cwd(), `${pathSrc}/layout`),
  plugin: nodePath.resolve(cwd(), `${pathSrc}/plugin`),
  public: nodePath.resolve(cwd(), `${pathSrc}/../public`),
  router: nodePath.resolve(cwd(), `${pathSrc}/router`),
  sass: nodePath.resolve(cwd(), `${pathSrc}/sass`),
  store: nodePath.resolve(cwd(), `${pathSrc}/store`),
  util: nodePath.resolve(cwd(), `${pathSrc}/util`),
  view: nodePath.resolve(cwd(), `${pathSrc}/view`),
};

export {
  absPath,
  pathDist,
  pathSrc,
};

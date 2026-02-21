/*
  Before usage:
  1. npm install @microsoft/clarity --save
  2. Uncomment import and app.use in @src/main.js
*/

import { isString } from '@/util/misc';
import route from '@/util/route';
import ClarityInstance from '@microsoft/clarity';

const Clarity = {
  isInstalled: false,
  isReady: false,
  isEnabled: true,

  install: (app, options = {}) => {
    if (Clarity.isInstalled) {
      return true;
    }

    Clarity.isEnabled = options.enabled === false ? false : true;

    if (Clarity.isEnabled && options.id) {
      ClarityInstance.init(options.id);
      Object.assign(Clarity, ClarityInstance);
      Clarity.isReady = true;
      Clarity.setTagsFromRouteQuery();
    }

    Clarity.isInstalled = true;

    return true;
  },

  /**
   * Parse clarity-tags from route query and pass to JS API
   * returns boolean
   * "__" is equal to "&"
   * "--" is equal to "="
   * example in:
   * "x--123__y--321__z"
   * example out:
   * Clarity.setTag('x', 123);
   * Clarity.setTag('y', 123);
   * Clarity.setTag('z', true);
   */
  setTagsFromRouteQuery: () => {
    if (!Clarity.isReady) {
      return false;
    }

    const clarityTags = route.query['clarity-tags'];
    if (!clarityTags || !isString(clarityTags) || !clarityTags.length) {
      return true;
    }

    const tagsData = {};

    const pairs = clarityTags.split('__').filter(Boolean);
    pairs.forEach((pair) => {
      const [key, ...rest] = pair.split('--').filter(Boolean);
      const value = rest.join('--');

      if (!key) {
        return false;
      }

      if (isString(value) && value.length) {
        tagsData[key] = value;
      } else {
        tagsData[key] = true;
      }
    });

    Object.keys(tagsData).forEach((key) => {
      Clarity.setTag(key, tagsData[key]);
    });

    return true;
  },
};

export default Clarity;

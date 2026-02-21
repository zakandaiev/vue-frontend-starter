import Translation from '@/i18n/translation';
import Telegram from '@/plugin/telegram';
import { isObject, isString } from '@/util/misc';

function hadleTelegramStartAppRouting(router) {
  if (!Telegram.isReady || !isObject(Telegram.startParam)) {
    return false;
  }

  const utmData = {};
  Object.keys(Telegram.startParam).forEach((key) => {
    if (key.startsWith('utm')) {
      utmData[key] = Telegram.startParam[key];
    }
  });

  const { route } = Telegram.startParam;
  if (!isString(route)) {
    return hadleUtm(router, utmData);
  }

  const [key, ...rest] = route.split('_').filter(Boolean);
  const value = rest.join('_');

  if (key === 'test') {
    return hadleTestRoute(router, value, utmData);
  }

  if (key === 'guide') {
    return hadleGuideRoute(router, value, utmData);
  }

  if (key === 'components') {
    return hadleComponentsRoute(router, value, utmData);
  }
}

function hadleTestRoute(router, testId = null, utmData = {}) {
  if (!router) {
    return false;
  }

  if (testId) {
    return router.replace(
      Translation.i18nRoute({
        name: 'test.page',
        params: {
          testId,
        },
        query: {
          ...utmData,
        },
      }),
    );
  }

  return router.replace(
    Translation.i18nRoute({
      name: 'test',
      query: {
        ...utmData,
      },
    }),
  );
}

function hadleGuideRoute(router, guideId = null, utmData = {}) {
  if (!router) {
    return false;
  }

  return router.replace(
    Translation.i18nRoute({
      name: 'guide',
      query: {
        ...utmData,
        guideId,
      },
    }),
  );
}

function hadleComponentsRoute(router, componentId = null, utmData = {}) {
  if (!router) {
    return false;
  }

  return router.replace(
    Translation.i18nRoute({
      name: 'components',
      query: {
        ...utmData,
        componentId,
      },
    }),
  );
}

function hadleUtm(router, utmData) {
  if (!router || !isObject(utmData)) {
    return false;
  }

  return router.replace(
    Translation.i18nRoute({
      query: {
        ...utmData,
      },
    }),
  );
}

export default hadleTelegramStartAppRouting;

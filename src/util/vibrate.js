import Telegram from '@/plugin/telegram';
import { isString } from '@/util/misc';

function getVibrate(type) {
  if (type === 'success') {
    return [40];
  }

  if (type === 'warning') {
    return [40, 20, 40];
  }

  if (type === 'error') {
    return [20, 20, 20, 20, 20];
  }

  return [20];
}

function vibrate(type = null) {
  const isTelegram = Telegram.isReady ? true : false;
  const isNavigatorVibrate = window.navigator && window.navigator.vibrate ? true : false;

  if (!isTelegram && !isNavigatorVibrate) {
    return false;
  }

  if (isTelegram && ['success', 'warning', 'error'].includes(type)) {
    Telegram.HapticFeedback.notificationOccurred(type);
  } else {
    window.navigator.vibrate(isString(type) ? getVibrate(type) : type);
  }

  return true;
}

export {
  getVibrate,
  vibrate,
};

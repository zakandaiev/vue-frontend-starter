import Telegram from '@/plugin/telegram';

function getVibrate(type) {
  switch (type) {
    case 'success': {
      return [40];
    }
    case 'warning': {
      return [40, 20, 40];
    }
    case 'error': {
      return [20, 20, 20, 20, 20];
    }
    default: {
      return [20];
    }
  }
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
    window.navigator.vibrate(typeof type === 'string' ? getVibrate(type) : type);
  }

  return true;
}

export {
  getVibrate,
  vibrate,
};

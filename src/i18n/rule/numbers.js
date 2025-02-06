const latin = {
  currency: {
    style: 'currency', // decimal, currency, percent, unit
    currency: 'USD',
    currencyDisplay: 'narrowSymbol', // code, symbol, narrowSymbol, name
  },
  distance: {
    style: 'unit',
    unit: 'kilometer',
    unitDisplay: 'short', // short, narrow, long
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};

const cyrylic = {
  currency: {
    style: 'currency', // decimal, currency, percent, unit
    currency: 'UAH',
    currencyDisplay: 'narrowSymbol', // code, symbol, narrowSymbol, name
  },
  distance: {
    style: 'unit',
    unit: 'kilometer',
    unitDisplay: 'short', // short, narrow, long
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};

export default {
  en: latin,
  uk: cyrylic,
};

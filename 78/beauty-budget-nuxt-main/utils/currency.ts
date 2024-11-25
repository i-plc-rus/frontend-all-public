import { CURRENCY_LOCALE_STRING, CURRENCY_SIGN, CURRENCY_SUBUNIT_COUNT } from "~/constants/currency";

export function getMainCurrencyAmountFromSubunits(subunitsAmount: number) {
  return Math.floor(subunitsAmount / CURRENCY_SUBUNIT_COUNT) || 0;
} 
export function getSubunitsAmountFromMainCurrency(mainCurrencyAmount: number) {
  return Math.floor(mainCurrencyAmount * CURRENCY_SUBUNIT_COUNT) || 0;
}

export function formatSum(subunitsAmount: number, withSubunitsShown = true, withCurrencySign = true) {
  const mainCurrencySum = subunitsAmount / CURRENCY_SUBUNIT_COUNT;
  const options = withSubunitsShown
    ? {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }
    : { maximumFractionDigits: 0 };

  return withCurrencySign
    ? `${mainCurrencySum.toLocaleString(CURRENCY_LOCALE_STRING, options)}${CURRENCY_SIGN}`
    : `${mainCurrencySum.toLocaleString(CURRENCY_LOCALE_STRING, options)}`;
}
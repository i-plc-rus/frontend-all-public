import {
  getTimestampFromKey,
  TRANSACTION_KEY_PREFIX
} from './transaction-util';

//this is dev api only, should be disabled in prod build
export default defineEventHandler(async (event) => {
  const storedTransactions = useStorage('mockApi');

  const params = getQuery(event);
  const startTimestamp = Number(params.timestamp_gte);
  const endTimestamp = Number(params.timestamp_lt);
  const limit = Number(params._limit);

  const keys = await storedTransactions.getKeys(TRANSACTION_KEY_PREFIX);
  const filteredKeys = keys
    .filter((k) => {
      const timestmap = getTimestampFromKey(k);
      return timestmap >= startTimestamp && timestmap < endTimestamp;
    })
    .slice(0, limit);

  //storedTransactions.getItems doesn't return values
  const result = await Promise.all(
    filteredKeys.map((k) => storedTransactions.getItem(k))
  );
  result.sort((a: any, b: any) => Number(b.timestamp) - Number(a.timestamp));
  return result;
});

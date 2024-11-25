import { getTransactionFromBody, getTransactionKey } from './transaction-util';

//this is dev api only, should be disabled in prod build
export default defineEventHandler(async (event) => {
  const storedTransactions = useStorage('mockApi');

  const id = String(getRouterParam(event, 'id'));
  const body = await readBody(event);

  if (body.timestamp == null || body.id == null) {
    return {};
  }
  const transaction = getTransactionFromBody(body);

  const keyPrefix = getTransactionKey(id);
  const matches = await storedTransactions.getKeys(keyPrefix);
  await Promise.all(matches.map((k) => storedTransactions.removeItem(k)));

  const key = getTransactionKey(transaction.id, transaction.timestamp);
  await storedTransactions.setItem(key, transaction);

  const saved = await storedTransactions.getItem(key);
  return saved;

});

import { getTransactionFromBody, getTransactionKey } from './transaction-util';

//this is dev api only, should be disabled in prod build
export default defineEventHandler(async (event) => {
  const storedTransactions = useStorage('mockApi');

  const body = await readBody(event);

  if (body.timestamp == null || body.id == null) {
    return {};
  }
  const transaction = getTransactionFromBody(body);
  const key = getTransactionKey(transaction.id, transaction.timestamp);

  await storedTransactions.setItem(key, transaction);

  const saved = await storedTransactions.getItem(key);
  return saved;
});

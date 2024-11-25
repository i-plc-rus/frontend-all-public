import { getTransactionKey } from './transaction-util';

//this is dev api only, should be disabled in prod build
export default defineEventHandler(async (event) => {
  const storedTransactions = useStorage('mockApi');

  const id = String(getRouterParam(event, 'id'));

  const keyPrefix = getTransactionKey(id);
  const matches = await storedTransactions.getKeys(keyPrefix);
  await Promise.all(matches.map((k) => storedTransactions.removeItem(k)));
});

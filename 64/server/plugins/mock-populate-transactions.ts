import { getTransactionKey } from '../mock-api/transaction-util';
import db from '../../mock-server/large-db.json';

export default defineNitroPlugin(async () => {
  const storedTransactions = useStorage('mockApi');
  await Promise.all(
    db.transactions.map((t) =>
      storedTransactions.setItem(getTransactionKey(t.id, t.timestamp), t)
    )
  );
});

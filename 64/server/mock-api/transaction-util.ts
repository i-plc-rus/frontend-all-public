export const TRANSACTION_KEY_PREFIX = 'transaction';

export function getTransactionKey(id: string, timestamp?: number) {
  return `${TRANSACTION_KEY_PREFIX}:${id}:${timestamp ?? ''}`;
}

export function getTimestampFromKey(key: string) {
  return Number(key.split(':')[2]);
}

export function getTransactionFromBody(body: Record<string, string>) {
  const timestamp = Number(body.timestamp);
  return {
    id: body.id || `${timestamp}-${Math.trunc(Math.random() * 100000000)}`,
    timestamp,
    amount: Number(body.amount),
    category: body.category
  };
}

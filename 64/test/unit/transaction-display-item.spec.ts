import { describe, it, expect } from 'vitest';
import {
  getTransactionDisplayItemsByDate,
  type TransactionDisplayItem
} from '../../utils/transaction-display-item';

describe('TransactionDisplayItem', () => {
  let idCounter = 1;

  it('by date', () => {
    const data = [
      createItem(new Date('2024-10-01T00:00:00Z').getTime()),
      createItem(new Date('2024-10-01T00:00:00Z').getTime()),
      createItem(new Date('2024-10-02T00:00:00Z').getTime()),
      createItem(new Date('2024-10-03T00:00:00Z').getTime()),
      createItem(new Date('2024-11-08T00:00:00Z').getTime())
    ];
    const result = getTransactionDisplayItemsByDate(data);
    expect(result).toEqual(<TransactionDisplayItem[]>[
      { dateHeaderTimestamp: new Date('2024-10-01T00:00:00Z').getTime() },
      { transaction: data[0] },
      { transaction: data[1] },
      { dateHeaderTimestamp: new Date('2024-10-02T00:00:00Z').getTime() },
      { transaction: data[2] },
      { dateHeaderTimestamp: new Date('2024-10-03T00:00:00Z').getTime() },
      { transaction: data[3] },
      { dateHeaderTimestamp: new Date('2024-11-08T00:00:00Z').getTime() },
      { transaction: data[4] }
    ]);
  });

  it('by amount', () => {
    const data = [
      createItem(new Date('2024-10-01T00:00:00Z').getTime(), 100),
      createItem(new Date('2024-10-01T00:00:00Z').getTime(), -200),
      createItem(new Date('2024-10-02T00:00:00Z').getTime(), 50),
      createItem(new Date('2024-10-03T00:00:00Z').getTime(), -10),
      createItem(new Date('2024-11-08T00:00:00Z').getTime(), 100.01)
    ];
    const result = getTransactionDisplayItemsByAmount(data);
    expect(result).toEqual(
      data
        .map((t) => ({ transaction: t }))
        .sort(
          (a, b) =>
            Math.abs(b.transaction.amount) - Math.abs(a.transaction.amount)
        )
    );
  });

  function createItem(timestamp: number, amount = 0): Transaction {
    return {
      id: String(idCounter++),
      amount,
      category: '',
      timestamp
    };
  }
});

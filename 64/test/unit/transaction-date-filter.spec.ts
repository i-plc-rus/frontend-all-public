// @vitest-environment nuxt
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TransactionDateFilterStore', () => {
  const DEFAULT_DATE = new Date('2024-10-25T17:34:54Z');

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.setSystemTime(DEFAULT_DATE);
  });

  it('month default', () => {
    const store = useTransactionDateFilterStore();
    expect(store.monthOffset).toBe(0);
    expect(store.yearOffset).toBe(0);
    expect(store.mode).toBe('month');
    expect(store.customInterval).toBe(null);
    expect(store.effectiveUtcInterval).toEqual([
      new Date('2024-10-01T00:00:00Z'),
      new Date('2024-10-31T00:00:00Z')
    ]);
  });

  it('month offset', () => {
    const store = useTransactionDateFilterStore();
    store.monthOffset = -1;
    expect(store.effectiveUtcInterval).toEqual([
      new Date('2024-09-01T00:00:00Z'),
      new Date('2024-09-30T00:00:00Z')
    ]);
  });

  it('year default', () => {
    const store = useTransactionDateFilterStore();
    store.mode = 'year';
    expect(store.effectiveUtcInterval).toEqual([
      new Date('2024-01-01T00:00:00Z'),
      new Date('2024-12-31T00:00:00Z')
    ]);
  });

  it('year offset', () => {
    const store = useTransactionDateFilterStore();
    store.mode = 'year';
    store.yearOffset = -1;
    expect(store.effectiveUtcInterval).toEqual([
      new Date('2023-01-01T00:00:00Z'),
      new Date('2023-12-31T00:00:00Z')
    ]);
  });

  it('custom', () => {
    const store = useTransactionDateFilterStore();
    store.mode = 'custom';
    const start = new Date('2023-06-04T00:00:00Z');
    const end = new Date('2023-07-12T00:00:00Z');
    store.customInterval = [start.getTime(), end.getTime()];
    expect(store.effectiveUtcInterval).toEqual([start, end]);
  });
});

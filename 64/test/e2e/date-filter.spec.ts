import { test, expect, type Page } from '@playwright/test';
import { setupMockServer, type MockServer } from './mock-server';
import { setupPage } from './setup-page';

let mockServer: MockServer;

test.beforeAll(async () => {
  mockServer = await setupMockServer();
});

test.afterAll(async () => {
  await mockServer.destroy();
});

const stubTransaction: Transaction = {
  id: '42',
  amount: 2,
  category: '2',
  timestamp: 0
};

test.describe('Date filter', () => {
  test.afterEach(() => {
    mockServer.reset();
  });

  async function expectTransactionCount(page: Page, count: number) {
    await expect(page.getByTestId(/transaction:*/)).toHaveCount(count);
  }

  test('Initial month', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));

    mockServer.transactionsAssert = (query) => {
      expect(query).toEqual({
        timestamp_gte: new Date('2024-09-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2024-10-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      });
    };
    await setupPage(page);

    // just to await something
    await expectTransactionCount(page, 3);
  });

  test('Prev month', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));
    await setupPage(page);

    // just to await something
    await expectTransactionCount(page, 3);

    // prepare expectation for date interval switched to prev month
    mockServer.transactionsAssert = (query) => {
      expect(query).toEqual({
        timestamp_gte: new Date('2024-08-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2024-09-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      });
    };
    mockServer.transactionsHandler = () => ({ data: [stubTransaction] });

    await page.getByTestId('dateFilterPrev').click();
    await expectTransactionCount(page, 1);
  });

  test('Next month', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));
    await setupPage(page);

    // just to await something
    await expectTransactionCount(page, 3);

    // prepare expectation for date interval switched to next month
    mockServer.transactionsAssert = (query) => {
      expect(query).toEqual({
        timestamp_gte: new Date('2024-10-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2024-11-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      });
    };
    mockServer.transactionsHandler = () => ({ data: [stubTransaction] });

    await page.getByTestId('dateFilterNext').click();
    await expectTransactionCount(page, 1);
  });

  test('Initial year', async ({ page, context }) => {
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));
    await context.addCookies([
      { name: 'dateFilterMode', value: 'year', path: '/', domain: 'localhost' }
    ]);

    mockServer.transactionsAssert = (query) => {
      expect(query).toEqual({
        timestamp_gte: new Date('2024-01-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2025-01-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      });
    };
    await setupPage(page);

    // just to await something
    await expectTransactionCount(page, 3);
  });

  test('Prev year', async ({ page, context }) => {
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));
    await context.addCookies([
      { name: 'dateFilterMode', value: 'year', path: '/', domain: 'localhost' }
    ]);
    await setupPage(page);

    // just to await something
    await expectTransactionCount(page, 3);

    // prepare expectation for date interval switched to prev year
    mockServer.transactionsAssert = (query) => {
      expect(query).toEqual({
        timestamp_gte: new Date('2023-01-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2024-01-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      });
    };
    mockServer.transactionsHandler = () => ({ data: [stubTransaction] });

    await page.getByTestId('dateFilterPrev').click();
    await expectTransactionCount(page, 1);
  });

  test('Next year', async ({ page, context }) => {
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));
    await context.addCookies([
      { name: 'dateFilterMode', value: 'year', path: '/', domain: 'localhost' }
    ]);
    await setupPage(page);

    // just to await something
    await expectTransactionCount(page, 3);

    // prepare expectation for date interval switched to next year
    mockServer.transactionsAssert = (query) => {
      expect(query).toEqual({
        timestamp_gte: new Date('2025-01-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2026-01-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      });
    };
    mockServer.transactionsHandler = () => ({ data: [stubTransaction] });

    await page.getByTestId('dateFilterNext').click();
    await expectTransactionCount(page, 1);
  });

  test('Transactions cache', async ({ page }) => {
    const cacheCapacity = 5;
    await page.clock.setFixedTime(new Date('2024-09-03T10:23:00Z'));
    let sentRequests: any[] = [];

    const stubTransactions = new Array(cacheCapacity + 1).fill(null).map(
      (v, i) =>
        <Transaction>{
          id: String(1000 + i),
          amount: 100,
          category: '2',
          timestamp: 0
        }
    );

    function mockToSendTransactions(count: number) {
      mockServer.transactionsHandler = (query) => {
        sentRequests.push({ ...query });
        return { data: stubTransactions.slice(0, count) };
      };
    }
    mockToSendTransactions(1);

    await setupPage(page);
    await expectTransactionCount(page, 1);

    let intervalsUsed = 2; //initial and next from loop
    // switch interval cacheCapacity+1 times to fill it and abandon the first entry
    for (; intervalsUsed <= cacheCapacity + 1; ++intervalsUsed) {
      mockToSendTransactions(intervalsUsed);
      await page.getByTestId('dateFilterPrev').click();
      await expectTransactionCount(page, intervalsUsed);
    }

    sentRequests.length = 0;
    // now go back in time to initial interval
    intervalsUsed -= 2; //compensate side switch and last loop iteration
    for (; intervalsUsed > 0; --intervalsUsed) {
      mockToSendTransactions(intervalsUsed);
      await page.getByTestId('dateFilterNext').click();
      await expectTransactionCount(page, intervalsUsed);
    }

    //check that only one (first) entry was re-fetched
    expect(sentRequests).toEqual([
      {
        timestamp_gte: new Date('2024-09-01T00:00:00Z').getTime().toString(),
        timestamp_lt: (
          new Date('2024-10-01T00:00:00Z').getTime() - 1
        ).toString(),
        _limit: '10000',
        _sort: '-timestamp'
      }
    ]);
  });
});

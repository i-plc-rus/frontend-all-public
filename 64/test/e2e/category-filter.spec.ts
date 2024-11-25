import { test, expect } from '@playwright/test';
import { setupMockServer, type MockServer } from './mock-server';
import { setupPage } from './setup-page';

let mockServer: MockServer;

test.beforeAll(async () => {
  mockServer = await setupMockServer();
});

test.afterAll(async () => {
  await mockServer.destroy();
});

test.describe('Category filter', () => {
  test('Initial state', async ({ page }) => {
    await setupPage(page);

    const categoryFilters = page.getByTestId(/category-filter:*/);
    await expect(categoryFilters).toHaveCount(2);
    const categoryTexts = await categoryFilters.allInnerTexts();

    expect(categoryTexts).toEqual(['Restaurants', 'Leisure']);

    const transactions = page.getByTestId(/transaction:*/);
    await expect(transactions).toHaveCount(3);
    expect(page.getByTestId(/transaction:110001/)).toBeVisible();
    expect(page.getByTestId(/transaction:110002/)).toBeVisible();
    expect(page.getByTestId(/transaction:5182/)).toBeVisible();

    await expect(page.getByTestId('chartTotalIncome')).toHaveText('+10,600');
    await expect(page.getByTestId('chartTotalExpenses')).toHaveText('-4,220');

    await expect(page.getByTestId('totalsIncome')).toHaveText('10,600 (72%)');
    await expect(page.getByTestId('totalsExpenses')).toHaveText('-4,220 (28%)');
    await expect(page.getByTestId('totalsNet')).toHaveText('Net: 6,380');
  });

  test('Select category', async ({ page }) => {
    await setupPage(page);

    const categoryFilter = page.getByTestId(/category-filter:2/);
    await categoryFilter.click(); //select category

    // ensure filter is applied
    const transactions = page.getByTestId(/transaction:*/);
    await expect(transactions).toHaveCount(1);
    expect(page.getByTestId(/transaction:110002/)).toBeVisible();

    // chart totals should switch to category view
    await expect(page.getByTestId('chartTotalIncome')).toBeVisible({
      visible: false
    });
    await expect(page.getByTestId('chartTotalExpenses')).toHaveText('-4,100');

    // totals shouldn't be affected
    await expect(page.getByTestId('totalsIncome')).toHaveText('10,600 (72%)');
    await expect(page.getByTestId('totalsExpenses')).toHaveText('-4,220 (28%)');
    await expect(page.getByTestId('totalsNet')).toHaveText('Net: 6,380');
  });
});

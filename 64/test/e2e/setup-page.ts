import type { Page } from 'playwright-core';
import { expect } from '@playwright/test';

export async function setupPage(page: Page) {
  await page.goto('/');
  await expect(page.getByTestId('app')).toBeVisible({ timeout: 60_000 });
}

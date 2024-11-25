import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  outputDir: 'test-output',
  snapshotDir: 'test-output',
  /* Tests depend on express server for API requests, which occupies a port, so they can't run in parallel */
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'on',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],

  /* Start local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    port: 3000
  }
});

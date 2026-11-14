import { defineConfig, devices } from '@playwright/test';
const externalBase = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: false,
  workers: 2,
  use: { baseURL: externalBase || 'http://localhost:3200', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 820, height: 1180 },
        hasTouch: true,
      },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel: 'chrome' },
    },
  ],
  webServer: externalBase
    ? undefined
    : {
        command: 'npm run start',
        url: 'http://localhost:3200',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
});

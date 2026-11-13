import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: false,
  workers: 2,
  use: { baseURL: 'http://localhost:3200', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel: 'chrome' },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3200',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

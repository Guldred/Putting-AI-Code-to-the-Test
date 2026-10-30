import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.DEMO_TEST_PORT ?? 4173);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 15_000,
  expect: { timeout: 2500 },
  reporter: [['list'], ['json', { outputFile: 'reports/browser/results.json' }]],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run preview -- --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 15_000,
  },
});

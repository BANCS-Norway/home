import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for accessibility testing
 *
 * This config automatically manages the VitePress preview server:
 * - Builds the site before tests
 * - Starts the preview server
 * - Waits for it to be ready
 * - Runs tests
 * - Kills the server when done
 */
export default defineConfig({
  testDir: './tests',

  // Run tests in files matching this pattern
  testMatch: '**/*.test.ts',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: false, // Run accessibility tests sequentially
  forbidOnly: !!process.env.CI, // Fail CI if test.only is left in
  retries: process.env.CI ? 2 : 0, // Retry on CI, not locally
  workers: 1, // Run one test at a time for accessibility tests

  // Reporter to use
  reporter: 'list',

  use: {
    // Base URL for tests
    baseURL: 'http://localhost:4173',

    // Collect trace on failure
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Configure projects for different browsers if needed
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Web server configuration - this is the magic!
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true, // Reuse server for faster subsequent runs
    timeout: 120 * 1000, // 2 minutes to build and start
    stdout: 'pipe',
    stderr: 'pipe',
  },
});

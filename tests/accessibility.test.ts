/**
 * Accessibility compliance tests using Playwright and axe-core
 *
 * Tests all VitePress pages for WCAG 2.1 Level AA compliance.
 * The preview server is automatically managed by playwright.config.ts
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

interface TestPage {
  path: string;
  name: string;
}

// Pages to test for accessibility
const pagesToTest: TestPage[] = [
  { path: '/', name: 'Home' },
  { path: '/blog/', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
  { path: '/contact', name: 'Contact' },
  { path: '/about', name: 'About' },
];

// Create a test for each page
for (const pageInfo of pagesToTest) {
  test(`${pageInfo.name} page should have no accessibility violations`, async ({ page }) => {
    // Navigate to the page
    await page.goto(pageInfo.path, { waitUntil: 'networkidle' });

    // Run axe accessibility tests
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}

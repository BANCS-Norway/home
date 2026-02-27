/**
 * Accessibility compliance tests using Playwright and axe-core
 *
 * Tests all VitePress pages for WCAG 2.1 Level AA compliance.
 * The preview server is automatically managed by playwright.config.ts
 *
 * Blog posts are discovered automatically from docs/blog/ — no manual
 * updates needed when new posts are added.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface TestPage {
  path: string;
  name: string;
}

// Discover all blog posts automatically from the blog directory
function getBlogPostPages(): TestPage[] {
  const blogDir = join(__dirname, '..', 'docs', 'blog');
  return readdirSync(blogDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const slug = basename(file, '.md');
      return { path: `/blog/${slug}`, name: `Blog: ${slug}` };
    });
}

// Static pages to test
const staticPages: TestPage[] = [
  { path: '/', name: 'Home' },
  { path: '/blog/', name: 'Blog index' },
  { path: '/projects', name: 'Projects' },
  { path: '/contact', name: 'Contact' },
  { path: '/about', name: 'About' },
];

const pagesToTest: TestPage[] = [...staticPages, ...getBlogPostPages()];

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

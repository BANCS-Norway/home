#!/usr/bin/env tsx
/**
 * Accessibility compliance testing using axe-core
 *
 * This script runs automated accessibility tests on VitePress pages
 * to ensure WCAG 2.1 Level AA compliance.
 */

import { chromium, type Browser, type Page } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';

interface TestPage {
  url: string;
  name: string;
}

// Pages to test for accessibility
const pagesToTest: TestPage[] = [
  { url: 'http://localhost:4173/', name: 'Home' },
  { url: 'http://localhost:4173/blog/', name: 'Blog' },
  { url: 'http://localhost:4173/projects', name: 'Projects' },
  { url: 'http://localhost:4173/contact', name: 'Contact' },
  { url: 'http://localhost:4173/about', name: 'About' },
];

/**
 * Format violation for display
 */
function formatViolation(violation: Result): string {
  const impact = violation.impact ? `[${violation.impact.toUpperCase()}]` : '[UNKNOWN]';
  const nodes = violation.nodes.map(node =>
    `    - ${node.html}\n      ${node.failureSummary}`
  ).join('\n');

  return `
  ${impact} ${violation.id}: ${violation.description}
  Help: ${violation.helpUrl}
  Affected elements (${violation.nodes.length}):
${nodes}
`;
}

/**
 * Test a single page for accessibility violations
 */
async function testPage(page: Page, testPage: TestPage): Promise<Result[]> {
  console.log(`\n🔍 Testing: ${testPage.name} (${testPage.url})`);

  try {
    await page.goto(testPage.url, { waitUntil: 'networkidle' });

    const axeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = axeResults.violations;

    if (violations.length === 0) {
      console.log(`✅ ${testPage.name}: No violations found`);
    } else {
      console.log(`❌ ${testPage.name}: ${violations.length} violation(s) found`);
    }

    return violations;
  } catch (error) {
    console.error(`❌ Error testing ${testPage.name}:`, error);
    return [];
  }
}

/**
 * Main test runner
 */
async function runAccessibilityTests(): Promise<void> {
  console.log('🚀 Starting accessibility compliance tests...\n');
  console.log('Standards: WCAG 2.1 Level AA\n');
  console.log('⚠️  Make sure the preview server is running: npm run preview\n');

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const allViolations: Map<string, Result[]> = new Map();

    // Test each page
    for (const pageInfo of pagesToTest) {
      const violations = await testPage(page, pageInfo);
      if (violations.length > 0) {
        allViolations.set(pageInfo.name, violations);
      }
    }

    // Summary report
    console.log('\n' + '='.repeat(80));
    console.log('📊 ACCESSIBILITY TEST SUMMARY');
    console.log('='.repeat(80));

    if (allViolations.size === 0) {
      console.log('\n✅ All pages passed accessibility tests!');
      console.log('\nTotal pages tested: ' + pagesToTest.length);
    } else {
      console.log(`\n❌ Found violations on ${allViolations.size} page(s):\n`);

      let totalViolations = 0;
      const violationsBySeverity = {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
      };

      for (const [pageName, violations] of allViolations.entries()) {
        console.log(`\n📄 ${pageName} (${violations.length} violation(s))`);
        console.log('-'.repeat(80));

        violations.forEach(violation => {
          console.log(formatViolation(violation));
          totalViolations++;

          if (violation.impact) {
            violationsBySeverity[violation.impact]++;
          }
        });
      }

      console.log('\n' + '='.repeat(80));
      console.log('📈 VIOLATION BREAKDOWN');
      console.log('='.repeat(80));
      console.log(`Total violations: ${totalViolations}`);
      console.log(`  Critical: ${violationsBySeverity.critical}`);
      console.log(`  Serious: ${violationsBySeverity.serious}`);
      console.log(`  Moderate: ${violationsBySeverity.moderate}`);
      console.log(`  Minor: ${violationsBySeverity.minor}`);

      // Exit with error code if violations found
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Fatal error during accessibility testing:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run tests
runAccessibilityTests().catch(console.error);

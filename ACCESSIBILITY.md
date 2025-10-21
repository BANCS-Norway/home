# Accessibility Compliance

This project is committed to web accessibility and follows WCAG 2.1 Level AA standards.

## Our Commitment

As outlined in our [Code of Conduct](./CODE_OF_CONDUCT.md), we are committed to making our website accessible to everyone, including people with disabilities.

## Standards

We comply with:

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **WAI-ARIA** - Accessible Rich Internet Applications
- **Section 508** - US federal accessibility requirements

## Automated Testing

We use **axe-core** for automated accessibility testing to ensure compliance.

### Running Tests Locally

```bash
# Run full validation (includes accessibility)
npm run validate

# Run only accessibility tests
# Make sure preview server is running first
npm run preview &
npm run test:a11y
```

### What We Test

Our automated tests check for:

- ✅ Color contrast ratios (WCAG AA)
- ✅ Proper heading hierarchy
- ✅ Landmark regions
- ✅ Form labels and accessibility
- ✅ Button and link names
- ✅ HTML language attributes
- ✅ Keyboard navigation
- ✅ ARIA attributes

## CI/CD Integration

Accessibility tests run automatically on:

- Every pull request
- Before deployment to production
- As part of the validation suite

## Test Configuration

Configuration files:

- `.axerc.json` - axe-core rules and settings
- `scripts/accessibility-test.ts` - Test runner

### Pages Tested

- Home page (`/`)
- Blog listing (`/blog/`)
- Projects page (`/projects`)
- Contact page (`/contact`)
- About page (`/about`)

## Manual Testing

While automated tests catch many issues, we also perform manual accessibility testing:

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Logical tab order
- Visible focus indicators
- No keyboard traps

### Screen Readers

We test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)

### Browser Testing

- Chrome with ChromeVox
- Firefox with accessibility features
- Safari with VoiceOver

## Known Issues

We maintain a list of known accessibility issues and our plans to address them in our [issue tracker](https://github.com/BANCS-Norway/home/issues?q=is%3Aissue+is%3Aopen+label%3Aaccessibility).

## Reporting Issues

If you encounter accessibility barriers on our website:

1. **Open an issue**: [Report accessibility issue](https://github.com/BANCS-Norway/home/issues/new?labels=accessibility)
2. **Provide details**:
   - Page URL
   - Browser and assistive technology used
   - Description of the issue
   - Expected behavior

We will respond within 48 hours and prioritize accessibility fixes.

## For Developers

### Before Committing

Always run validation before committing:

```bash
npm run validate
```

This ensures your changes don't introduce accessibility regressions.

### Adding New Pages

When adding new pages:

1. Add the page URL to `scripts/accessibility-test.ts`
2. Run accessibility tests
3. Fix any violations before committing
4. Document any exceptions with justification

### Common Fixes

#### Color Contrast

Ensure text has sufficient contrast:

```css
/* Bad - fails WCAG AA */
.text {
  color: #999;
  background: #fff;
}

/* Good - passes WCAG AA */
.text {
  color: #666;
  background: #fff;
}
```

#### Semantic HTML

Use proper semantic elements:

```html
<!-- Bad -->
<div onclick="...">Click me</div>

<!-- Good -->
<button type="button">Click me</button>
```

#### Form Labels

Always label form inputs:

```html
<!-- Bad -->
<input type="text" placeholder="Email">

<!-- Good -->
<label for="email">Email</label>
<input type="text" id="email" name="email">
```

#### ARIA Attributes

Use ARIA when semantic HTML isn't enough:

```html
<!-- Accessible custom component -->
<div role="button" tabindex="0" aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</div>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Commitment to Improvement

Accessibility is an ongoing effort. We continuously:

- Monitor for new accessibility standards
- Update our testing tools
- Train our team on accessibility best practices
- Listen to user feedback
- Improve our processes

---

**Questions about accessibility?** Contact us at [your-email@bancs.no] or open an issue on GitHub.

# BANCS Scripts

This directory contains automation and validation scripts for the BANCS website.

## Available Scripts

Run all validations:

```bash
npm run validate
```

This runs both style and license validation.

---

### `validate-blog-styles.ts`

Validates that blog posts maintain consistent typography and don't introduce custom styles that could break the site's design system.

**Purpose**: Ensures all blog posts follow the same styling guidelines, maintaining a professional and consistent appearance across the site.

**Usage**:

```bash
npm run validate
# or
npm run validate:styles
```

**What it checks**:

- ❌ No custom `<style>` tags (except VitePress scoped styles at end of files)
- ❌ No inline `style=` attributes
- ❌ No custom CSS classes (except whitelisted ones)
- ❌ No deprecated HTML tags (`<font>`, `<center>`)
- ✅ Standard markdown formatting
- ✅ VitePress components (:::tip, :::warning, etc.)
- ✅ Code blocks with syntax highlighting

**Exceptions**:

- Files in `docs-internal/examples/` directory are skipped (examples can have custom styles)
- Whitelisted classes: `vp-*`, `language-*`, `blog-card`, `mb-*`
- VitePress scoped styles at the end of blog posts are allowed

**Example output**:

```
🔍 Validating blog post styles...

Found 3 blog post(s) to validate

✓ Validating: docs/blog/post-1.md
✓ Validating: docs/blog/post-2.md
✓ Validating: docs/blog/index.md

✅ All blog posts follow the style guidelines!
```

**Error example**:

```
❌ Style validation failed!

The following issues were found:

  docs/blog/my-post.md:42
    ⚠️  Inline styles are not allowed. Use markdown or VitePress components.
    Found: style="color: red"
```

## Adding New Scripts

When adding new validation or automation scripts:

1. Create a TypeScript file in this directory
2. Add a script entry in `package.json`:
   ```json
   {
     "scripts": {
       "validate:my-check": "tsx scripts/my-script.ts"
     }
   }
   ```
3. Update the main `validate` script to include your check
4. Document it in this README
5. Add it to the CI/CD pipeline in `.github/workflows/deploy.yml`

## CI/CD Integration

All validation scripts run automatically on every push to main via GitHub Actions:

1. Install dependencies
2. Run `npm run validate`
3. Build the site
4. Deploy to GitHub Pages

If validation fails, the deployment is blocked.

---

### `validate-example-licenses.ts`

Validates that all code examples include proper MIT license headers.

**Purpose**: Ensures legal clarity - all code examples must be MIT licensed so BANCS can freely use them and users can freely copy them.

**Usage**:

```bash
npm run validate:licenses
```

**What it checks**:

- ✅ All `.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.rs`, `.go`, `.java` files in `docs-internal/examples/`
- ✅ Each file has "License: MIT" in the header
- ❌ Skips `_template` and `node_modules` directories

**Required header format**:

```typescript
/**
 * Example: Your Feature Name
 * Author: Your Name (optional)
 * License: MIT
 */
```

**Example output**:

```
🔍 Validating example licenses...

Found 5 code file(s) to validate

✓ Checking: docs-internal/examples/my-example/demo.ts
✓ Checking: docs-internal/examples/my-example/advanced.ts

✅ All code examples have proper license headers!
```

**Error example**:

```
❌ License validation failed!

The following files are missing license headers:

  docs-internal/examples/my-example/demo.ts
    ⚠️  Missing MIT license header. Add a comment at the top with "License: MIT"
```

**Why this matters**:

- Legal protection for BANCS
- Clear licensing for contributors
- Users know they can freely use the examples
- No copyright ambiguity

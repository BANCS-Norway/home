# Contributing to BANCS

Thank you for your interest in contributing to the BANCS professional website! We welcome guest blog posts, bug fixes, and improvements.

**Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing. By participating, you agree to abide by its terms.**

## Ways to Contribute

1. **Guest Blog Posts** - Share your technical knowledge
2. **Bug Fixes** - Fix typos, broken links, or code issues
3. **Improvements** - Enhance documentation or code examples
4. **Translations** - Help translate content (future)

## Guest Blog Post Guidelines

### Before You Start

1. **Check existing content** - Avoid duplicate topics
2. **Propose your idea** - Open an issue to discuss your post
3. **Get approval** - Wait for maintainer feedback

### Writing Your Post

#### 1. Fork & Clone

```bash
git fork https://github.com/BANCS-Norway/home
git clone https://github.com/YOUR-USERNAME/home.git
cd pages
npm install
```

#### 2. Create Your Post

Create a new file: `docs/blog/your-post-title.md`

Use this template:

```markdown
# Your Post Title

**Published**: YYYY-MM-DD
**Author**: Your Name ([Your Website](https://example.com))
**Reading Time**: X minutes

---

## Introduction

Brief introduction to your topic...

## Main Content

Your content here with code examples...

## Conclusion

Summary and key takeaways...

---

*Guest post by [Your Name](https://yourwebsite.com). Want to contribute? See our [contributing guidelines](/CONTRIBUTING.md).*
```

#### 3. Add Code Examples

**IMPORTANT**: Don't paste code into your markdown! Import it from actual files instead.

Create a directory for working code examples:

```bash
mkdir -p docs-internal/examples/your-post-title
cd docs-internal/examples/your-post-title
```

Add working, testable code files with MIT license header:

```typescript
// docs-internal/examples/your-post-title/demo.ts

/**
 * Example: Your Feature Description
 * Author: Your Name (optional)
 * License: MIT
 *
 * Clear description of what this code does
 */
export function example() {
  // Implementation
}
```

**IMPORTANT - Licensing:**
- ✅ All code examples must be MIT licensed
- ✅ You must have the right to license the code
- ✅ BANCS can freely use, modify, and display your examples
- ✅ Include license header in all code files
- ✅ See `docs-internal/examples/LICENSE` for full details

**Import code into your blog post** using the snippet syntax:

```markdown
# Your Blog Post

Here's a basic example:

<<< @/docs-internal/examples/your-post-title/demo.ts
```

**Import specific lines:**

```markdown
<<< @/docs-internal/examples/your-post-title/demo.ts{5-10}
```

**Import named regions:**

```typescript
// In your code file:
// #region authentication
export function login() { /* ... */ }
// #endregion
```

```markdown
// In your blog post:
<<< @/docs-internal/examples/your-post-title/demo.ts#authentication
```

Add a README for your examples:

```markdown
# Your Post Title - Code Examples

Description of examples...

## Running

\`\`\`bash
npm install
npx tsx demo.ts
\`\`\`
```

**Benefits:**
- ✅ Code examples stay in sync with actual files
- ✅ Examples can be tested and run
- ✅ No copy/paste errors
- ✅ Single source of truth

**Using External Code:**

If you want to reference code from external sources:

1. **Don't copy external code directly** - Link to it instead
2. **If you must include external code:**
   - Ensure it's MIT-compatible (MIT, Apache 2.0, BSD, etc.)
   - Include proper attribution in the header
   - Note the original source and license
   - Get permission if required

Example with attribution:

```typescript
/**
 * Example: OAuth Implementation
 * Based on: https://github.com/example/oauth
 * Original Author: Jane Doe
 * Original License: MIT
 * Adapted by: Your Name
 * License: MIT
 */
```

3. **Better approach** - Write your own implementation inspired by the concept:

```markdown
# OAuth Tutorial

Inspired by [this excellent implementation](https://github.com/example/oauth),
here's our take on OAuth:

<<< @/docs-internal/examples/oauth-tutorial/demo.ts
```

#### 4. Add Your Post to the Blog Index

**IMPORTANT**: After creating your blog post file, you must add it to the blog index so it appears on the main blog page.

Edit `docs/blog/index.md` and add your post at the **top** of the "Recent Posts" section (newest first):

```markdown
## Recent Posts

<BlogCard>

### [Your Post Title](/blog/your-post-title)
**Date**: YYYY-MM-DD

Brief description of your post (1-2 sentences).

**Topics**: Topic1, Topic2, Topic3

[Read more →](/blog/your-post-title)

</BlogCard>

<!-- Existing posts below -->
```

**Remember**: Posts should be listed in **reverse chronological order** (newest first).

#### 5. Follow Style Guidelines

**Markdown**:
- Use proper heading hierarchy (H1 for title, H2 for sections)
- Include code syntax highlighting
- Add images to `docs/public/blog/your-post-title/`
- Use relative links for internal content

**Typography & Styling - IMPORTANT**:
- ❌ **NO custom `<style>` tags** in blog posts (maintains site consistency)
- ❌ **NO inline `style=` attributes** on elements
- ❌ **NO custom CSS classes** (except VitePress built-in classes)
- ❌ **NO deprecated HTML tags** (`<font>`, `<center>`, etc.)
- ✅ **USE standard markdown** for formatting (bold, italic, headings, lists)
- ✅ **USE VitePress components** (:::tip, :::warning, etc.)
- ✅ **USE code blocks** with proper syntax highlighting

**Exception**: The `docs-internal/examples/` directory CAN have custom styles for demonstration purposes.

**Automated Validation**: Run `npm run validate` to check your post follows these guidelines.

**Code**:
- Follow TypeScript best practices
- Include JSDoc comments
- Add error handling
- Write runnable examples
- Pass ESLint checks (`npm run lint`)

**Content**:
- Keep it technical and professional
- Cite sources and references
- Provide working code examples
- Include troubleshooting sections

### 6. Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173/blog/your-post-title` and verify:
- ✅ Formatting looks correct
- ✅ Code blocks render properly
- ✅ Links work
- ✅ Images load
- ✅ Dark/light mode both work

**Run validation checks**:

```bash
npm run validate
```

This will check that your blog post:
- Doesn't use custom styles or typography
- Follows the site's design guidelines
- Uses only allowed markdown and VitePress components
- Passes ESLint code quality checks

### 7. Submit Pull Request

```bash
git checkout -b blog/your-post-title
git add .
git commit -m "feat: add blog post about [topic]"
git push origin blog/your-post-title
```

Create a PR with:
- **Title**: `feat: add blog post - Your Post Title`
- **Description**:
  ```markdown
  ## Summary
  Brief description of your post

  ## Checklist
  - [ ] Post follows template
  - [ ] Code examples included
  - [ ] Tested locally
  - [ ] No spelling/grammar errors
  - [ ] Author bio included
  ```

## Code Quality and Linting

This project uses ESLint to ensure consistent code quality across all TypeScript, JavaScript, and Vue files.

### Running the Linter

**Check for issues:**
```bash
npm run lint
```

**Auto-fix issues:**
```bash
npm run lint:fix
```

### Pre-commit Hooks

ESLint runs automatically before every commit via husky pre-commit hooks. If linting fails, the commit will be blocked until issues are fixed.

### IDE Setup (Recommended)

For the best development experience, configure your IDE to show ESLint warnings in real-time:

**VS Code:**
1. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. ESLint will automatically use the project's `eslint.config.ts`
3. Errors and warnings will appear as you type

**Other IDEs:**
- Most modern IDEs support ESLint
- Configure them to use the project root's `eslint.config.ts`

### Linting Rules

The project uses:
- **ESLint v9+** with flat config
- **typescript-eslint** for TypeScript support
- **eslint-plugin-vue** for Vue 3 components

**Key rules:**
- Prefer `const` over `let`, never use `var`
- Use TypeScript types (warnings for `any`)
- Minimize console.log (use `console.warn` or `console.error` for intentional logging)
- Follow Vue 3 best practices for components

**Relaxed rules for:**
- Config files (`*.config.js/ts`)
- Test files (`*.test.ts`, `*.spec.ts`)
- Example files (`examples/**`, `scripts/**`)

### Handling Linting Errors

**If you see linting errors:**

1. Run `npm run lint:fix` to auto-fix simple issues
2. Review remaining issues and fix manually
3. If a rule seems incorrect for your use case:
   - Add an inline comment to disable it with justification
   - Discuss with maintainers if it should be changed globally

**Example of inline disable:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function legacyCode(data: any) {
  // Temporary: interfacing with untyped legacy API
  // TODO: Add proper types once API is documented
}
```

## Code Contributions

### Bug Fixes

1. Open an issue describing the bug
2. Fork and create a branch: `fix/description`
3. Make your changes
4. Test thoroughly
5. Submit PR with clear description

### Improvements

1. Open an issue to discuss your idea
2. Get maintainer approval
3. Fork and create a branch: `chore/description`
4. Make your changes
5. Submit PR

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/) for automated versioning.

### Important: Blog Posts are Features

**Blog posts are considered features** and trigger a minor version bump (e.g., 1.0.0 → 1.1.0).

```bash
# New blog post (triggers MINOR version bump: 1.0.0 → 1.1.0)
git commit -m "feat(blog): add post about TypeScript generics"

# Fix in existing blog post (triggers PATCH version bump: 1.0.0 → 1.0.1)
git commit -m "fix(blog): correct code example in Vue post"

# Documentation changes (no version bump)
git commit -m "docs: update contributing guidelines"

# Styling (no version bump)
git commit -m "style: fix markdown formatting"

# Refactor (no version bump)
git commit -m "refactor: reorganize blog post structure"

# Chore (no version bump)
git commit -m "chore: update dependencies"
```

### Commit Types and Versioning

- `feat`: New blog post or feature → **MINOR version bump** (1.0.0 → 1.1.0)
- `fix`: Bug fix → **PATCH version bump** (1.0.0 → 1.0.1)
- `docs`: Documentation changes → No version bump
- `style`: Formatting, typos → No version bump
- `refactor`: Code restructuring → No version bump
- `test`: Adding tests → No version bump
- `chore`: Maintenance tasks → No version bump

### Breaking Changes

For a professional company website, breaking changes are rare but include:

**Examples of Breaking Changes:**
- Changing page URLs (breaks external links to About, Projects, Contact, etc.)
- Removing published blog posts or major pages
- Restructuring the site navigation that breaks bookmarks
- Changing the domain or base URL
- Major API changes if exposing any public APIs
- Removing or significantly changing public-facing features

**Not Breaking Changes:**
- Adding new blog posts
- Adding new pages or sections
- Fixing typos or errors in existing content
- Updating code examples to newer versions
- Improving styling/design without changing URLs
- Updating company information (about, projects, etc.)
- Adding new features that don't break existing functionality

If your commit introduces a breaking change, add `BREAKING CHANGE:` in the commit body:

```bash
git commit -m "feat: reorganize site structure

BREAKING CHANGE: Page URLs have changed. /about is now /company/about.
Old URLs will return 404. Redirects configured in netlify.toml."
```

This triggers a **MAJOR version bump** (1.0.0 → 2.0.0).

**Note:** For this professional website, you'll rarely need breaking changes. Most contributions will be:
- `feat(blog):` for new blog posts
- `feat:` for new pages or features
- `fix:` for corrections and bug fixes

## Review Process

1. **Submission**: You submit a PR
2. **Initial Review**: Maintainer reviews within 48 hours
3. **Feedback**: Requested changes or approval
4. **Revision**: You address feedback
5. **Approval**: Maintainer approves
6. **Merge**: PR is merged to main
7. **Deployment**: Site automatically deploys

## Content Standards

### Required

- ✅ Original content (no plagiarism)
- ✅ Technical accuracy
- ✅ Working code examples
- ✅ Proper attribution for third-party content
- ✅ Professional tone

### Prohibited

- ❌ Promotional content or spam
- ❌ Offensive or discriminatory content
- ❌ Copyrighted material without permission
- ❌ Malicious code
- ❌ Misleading information

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/BANCS-Norway/home/discussions)
- **Issues**: Open an [Issue](https://github.com/BANCS-Norway/home/issues)
- **Contact**: Email contact@bancs.no

## Recognition

All contributors will be:
- Listed as post author with link to your site/profile
- Mentioned in release notes
- Added to contributors list (future)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BANCS! 🎉

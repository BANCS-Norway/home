# Quick Start Guide

Get your BANCS blog up and running in 5 minutes!

## Prerequisites

- Node.js 22+ (LTS) installed
- npm 10+ installed
- GitHub account (for deployment)

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site!

### 3. Make Changes

Edit any markdown file in the `docs/` directory. Changes will hot-reload automatically.

**Main files to customize:**
- `docs/index.md` - Homepage
- `docs/about.md` - About page (add your LinkedIn info here)
- `docs/blog/*.md` - Blog posts
- `docs/.vitepress/config.ts` - Site configuration

### 4. Build for Production

```bash
npm run build
```

This creates optimized files in `docs/.vitepress/dist/`

### 5. Preview Production Build

```bash
npm run preview
```

## GitHub Setup

### 1. Create Repository

```bash
# Initialize git (if not already done)
git init

# Add remote (replace YOUR-USERNAME with BANCS-Norway or your fork)
git remote add origin https://github.com/BANCS-Norway/home.git

# Commit and push
git add .
git commit -m "feat: initial commit of BANCS blog"
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. The site will deploy automatically on push to main

### 3. Configure Custom Domain (www.bancs.no)

**DNS Settings** (at your domain registrar):
```
Type: CNAME
Name: www
Value: bancs-norway.github.io
```

**GitHub Settings**:
1. Settings → Pages
2. Custom domain: `www.bancs.no`
3. Wait for DNS check (can take up to 48 hours)
4. Enable "Enforce HTTPS"

The `docs/public/CNAME` file is already configured.

## Writing Your First Blog Post

### 1. Create Post File

```bash
# Create new post
touch docs/blog/my-first-post.md

# Create examples directory (if needed)
mkdir -p examples/my-first-post
```

### 2. Use the Template

```markdown
# My First Post

**Published**: 2024-10-21
**Author**: Your Name
**Reading Time**: 5 minutes

---

## Introduction

Your content here...

## Code Example

\`\`\`typescript
function hello() {
  console.log('Hello, BANCS!')
}
\`\`\`

## Conclusion

Summary...
```

### 3. Add to Blog Index

Edit `docs/blog/index.md` and add your post to the list.

### 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173/blog/my-first-post`

### 5. Commit and Deploy

```bash
git add .
git commit -m "feat: add blog post - My First Post"
git push
```

Your post will automatically deploy to GitHub Pages!

## Customizing Your Site

### Update Colors

Edit `docs/.vitepress/theme/custom.css`:

```css
:root {
  --vp-c-brand: #6366f1;        /* Change primary color */
  --vp-c-brand-light: #8b5cf6;  /* Change accent color */
}
```

### Update Navigation

Edit `docs/.vitepress/config.ts`:

```typescript
nav: [
  { text: 'Home', link: '/' },
  { text: 'Blog', link: '/blog/' },
  // Add more nav items here
]
```

### Add Social Links

Edit `docs/.vitepress/config.ts`:

```typescript
socialLinks: [
  { icon: 'github', link: 'https://github.com/BANCS-Norway' },
  { icon: 'linkedin', link: 'https://linkedin.com/company/bancs' },
  { icon: 'twitter', link: 'https://twitter.com/YOUR-HANDLE' }
]
```

## Common Tasks

### Add Your LinkedIn Experience

Edit `docs/about.md` and fill in the Experience section:

```markdown
### Experience

**Senior Software Developer** @ Company Name
*Jan 2020 - Present*
- Key achievement 1
- Key achievement 2

**Developer** @ Previous Company
*Jan 2018 - Dec 2019*
- Achievement 1
```

### Accept Guest Blog Posts

Contributors can:
1. Fork your repository
2. Add their post to `docs/blog/`
3. Submit a pull request

See `CONTRIBUTING.md` for full guidelines.

### Create a New Release

Commits using [Conventional Commits](https://www.conventionalcommits.org/) will automatically trigger releases:

```bash
# New feature (minor version bump)
git commit -m "feat: add dark mode toggle"

# Bug fix (patch version bump)
git commit -m "fix: correct typo in about page"

# Breaking change (major version bump)
git commit -m "feat!: redesign homepage

BREAKING CHANGE: removed old homepage layout"
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf docs/.vitepress/dist docs/.vitepress/cache
npm run build
```

### Dev Server Port Conflict

```bash
# Use different port
npm run dev -- --port 3000
```

### CSS Not Loading

Make sure `@import "tailwindcss";` is at the top of `docs/.vitepress/theme/custom.css`

## Next Steps

1. ✅ Customize your About page with LinkedIn info
2. ✅ Write your first blog post
3. ✅ Update social links
4. ✅ Configure custom domain DNS
5. ✅ Share your new site!

## Resources

- [VitePress Documentation](https://vitepress.dev)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Need help?** Open an issue at https://github.com/BANCS-Norway/home/issues

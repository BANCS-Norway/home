# Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/).

## Commit Format

```bash
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Commit Types

### Commits That Trigger Version Bumps (Site Deployments)

**IMPORTANT**: Only use these commit types for changes that affect the VitePress site itself. Changes to tooling, documentation, or internal processes should use `chore:` or `docs:` instead.

These commit types result in a new version and site deployment:

- `feat`: New features or enhancements visible to site users → **MINOR version bump** (1.0.0 → 1.1.0)
  - Example: `feat(blog): add search functionality`
  - Example: `feat: add contact form validation`
  - **Use for**: New site pages, features, components that users see

- `fix`: Bug fixes that affect site functionality or appearance → **PATCH version bump** (1.0.0 → 1.0.1)
  - Example: `fix(blog): correct code example in Vue post`
  - Example: `fix: repair broken navigation links`
  - **Use for**: Fixing site bugs, broken links, display issues

- `style`: CSS/styling changes that affect visual appearance → **PATCH version bump** (1.0.0 → 1.0.1)
  - Example: `style: convert Footer to Tailwind CSS utility classes`
  - Example: `style: add gradient background to contact page`
  - **Use for**: Visual/CSS changes to the site
  - **Note**: This is for visual/CSS changes, NOT code formatting

### Commits That Don't Trigger Version Bumps

These commit types are for internal changes that don't affect the VitePress site:

- `docs`: Documentation-only changes (CLAUDE.md, README, code comments, workflow docs) → No version bump
  - Example: `docs: update git workflow documentation`
  - Example: `docs: clarify commit guidelines`
  - Example: `docs: update CONTRIBUTING.md`
  - **Use for**: Any documentation that isn't part of the VitePress site content

- `chore`: Build process, tooling, dependencies, maintenance, project configuration → No version bump
  - Example: `chore: update dependencies`
  - Example: `chore: add worktrees to .gitignore`
  - Example: `chore: configure semantic-release`
  - **Use for**: Tooling, configs, dependencies, internal processes

- `refactor`: Code restructuring without changing functionality → No version bump
  - Example: `refactor: extract reusable component`
  - Example: `refactor: simplify authentication logic`
  - **Note**: This is for internal code changes, NOT visual changes

- `test`: Test-only changes → No version bump
  - Example: `test: add unit tests for utility functions`

- `ci`: CI/CD pipeline changes → No version bump
  - Example: `ci: update deployment workflow`

### Important Distinction: `style:` vs `refactor:`

- **`style:`** = CSS/visual changes → **triggers version bump** → user-visible changes
- **`refactor:`** = Code restructuring → **no version bump** → internal-only changes

## Breaking Changes

Add `BREAKING CHANGE:` in the commit body for breaking changes → **MAJOR version bump** (1.0.0 → 2.0.0)

## Examples

```bash
# New blog post
git commit -m "feat(blog): add post about TypeScript generics"

# Bug fix
git commit -m "fix(blog): correct code example in Vue post"

# Documentation
git commit -m "docs: update contributing guidelines"
```

## Claude Code Footer

All commits made with Claude Code assistance include:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

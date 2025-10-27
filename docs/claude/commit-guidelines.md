# Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/).

## Commit Format

```bash
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Commit Types

- `feat`: New feature → **MINOR version bump** (1.0.0 → 1.1.0)
- `fix`: Bug fix → **PATCH version bump** (1.0.0 → 1.0.1)
- `style`: Visual/CSS changes → **PATCH version bump** (1.0.0 → 1.0.1)
- `docs`: Documentation changes → No version bump
- `refactor`: Code restructuring → No version bump
- `test`: Adding tests → No version bump
- `chore`: Maintenance tasks → No version bump

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

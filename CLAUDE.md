# Working with Claude Code

## Overview

This project was developed in collaboration with Claude Code by Anthropic. This document outlines best practices, guidelines, and important notes for working with Claude Code on this project.

## Philosophy

Claude Code is a powerful AI assistant that enhances human productivity and code quality. The collaboration model is:

- **AI-Assisted Development**: Claude helps with code generation, refactoring, and problem-solving
- **Human Oversight**: All AI-generated code is reviewed, tested, and validated by experienced developers
- **Best Practices**: Combining AI capabilities with decades of software engineering experience
- **Transparency**: We're open about our use of AI tools in development

## Git and GitHub Safety

### Important: Claude Code Will NEVER Push to GitHub

**Claude Code will NEVER push to GitHub or any remote repository without explicit user permission.**

When working with git:
- ✅ Claude can help prepare commits and draft commit messages
- ✅ Claude can stage files and create commits locally
- ✅ Claude can analyze git history and diffs
- ❌ Claude will ALWAYS ask before pushing to remote repositories
- ❌ Claude will NOT run `git push` without explicit user approval

**You maintain full control over what gets pushed to GitHub.**

### Git Workflow with Claude

1. **Local Development**: Claude can freely work with local git operations
2. **Commit Preparation**: Claude will help stage files and draft commit messages
3. **Review**: You review the changes and commit message
4. **Approval Required**: Before any `git push`, Claude will ask for your explicit permission
5. **You Push**: You control when and what gets pushed to remote repositories

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/).

### Commit Format

```bash
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat`: New feature → **MINOR version bump** (1.0.0 → 1.1.0)
- `fix`: Bug fix → **PATCH version bump** (1.0.0 → 1.0.1)
- `docs`: Documentation changes → No version bump
- `style`: Formatting, typos → No version bump
- `refactor`: Code restructuring → No version bump
- `test`: Adding tests → No version bump
- `chore`: Maintenance tasks → No version bump

### Breaking Changes

Add `BREAKING CHANGE:` in the commit body for breaking changes → **MAJOR version bump** (1.0.0 → 2.0.0)

### Examples

```bash
# New blog post
git commit -m "feat(blog): add post about TypeScript generics"

# Bug fix
git commit -m "fix(blog): correct code example in Vue post"

# Documentation
git commit -m "docs: update contributing guidelines"
```

### Claude Code Footer

All commits made with Claude Code assistance include:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Development Workflow

### For External Contributors

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the standard contribution workflow.

### For Internal BANCS Development

This is the workflow for BANCS team members working with Claude Code on features.

#### 0. Initial Repository Setup

**IMPORTANT: Protect the main branch after first commit**

After pushing the initial commit to `main`, immediately protect the branch on GitHub:

##### Step 1: Create Personal Access Token (PAT) for semantic-release

Semantic-release needs permission to bypass branch protection to create releases:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
3. Copy the token (you won't see it again!)
4. Add to repository secrets:
   - Go to Repository Settings → Secrets and variables → Actions
   - Create new secret: `GH_TOKEN` = your PAT
   - (Also add `GITHUB_TOKEN` if needed by workflows)

**This allows semantic-release to create tags, releases, and update the repository during automated releases.**

##### Step 2: Protect the main branch

1. Go to Repository Settings → Branches
2. Add branch protection rule for `main`:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Allow specified actors to bypass required pull requests
     - Add the GitHub Actions bot or your account (for semantic-release)
   - ✅ Do not allow force pushes
   - ✅ Do not allow deletions

**This ensures ALL work goes through the feature branch → PR → merge workflow.**

No direct commits to `main` are allowed after initial setup (except semantic-release automated releases).

##### Step 3: Verify semantic-release configuration

The `.releaserc.json` should already be configured. Verify it includes:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
}
```

And GitHub Actions workflow uses the `GH_TOKEN`:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```

#### 1. Create GitHub Issue

Before starting any feature work:

```bash
# Claude will help create a GitHub issue with:
# - Clear feature description
# - List of todos/tasks for the feature
# - Acceptance criteria
```

**Example Issue Format:**
```markdown
## Feature: [Feature Name]

Description of what we're building...

### Tasks
- [ ] Task 1: Description
- [ ] Task 2: Description
- [ ] Task 3: Description
- [ ] Task 4: Description

### Acceptance Criteria
- Criteria 1
- Criteria 2
```

#### 2. Create Feature Branch

```bash
# Branch naming: feature/issue-number-description
git checkout -b feature/123-add-blog-search
```

#### 3. Work in Batches (3-4 Tasks Maximum)

**IMPORTANT: Never do more than 3-4 tasks before committing.**

Work in small, focused batches:

1. **Select 3-4 tasks** from the issue
2. **Update progress** as you complete each task
3. **Stop and commit** after 3-4 tasks
4. **Repeat** until feature is complete

**Example Batch:**
```markdown
Batch 1: Setup and Infrastructure
- [x] Task 1: Add search dependencies
- [x] Task 2: Create search component
- [x] Task 3: Wire up search to VitePress

Batch 2: Styling and UX
- [x] Task 4: Style search results
- [x] Task 5: Add keyboard navigation
- [x] Task 6: Mobile responsive design

Batch 3: Testing and Polish
- [x] Task 7: Test on all browsers
- [x] Task 8: Add loading states
```

#### 4. Commit Each Batch

After completing 3-4 tasks:

```bash
# Claude prepares the commit
git add .
git commit -m "feat(search): add search component and styling

- Added search dependencies
- Created search component
- Wired up to VitePress
- Styled search results

Part of #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push the batch
git push origin feature/123-add-blog-search
```

#### 5. Complete Feature

When all tasks are done:

1. **Review all commits** in the feature branch
2. **Test the complete feature**
3. **Rebase commits together** (squash into logical commits)
4. **Update the issue** to mark complete

```bash
# Interactive rebase to clean up commits
git rebase -i main

# Force push the cleaned up branch
git push --force origin feature/123-add-blog-search
```

#### 6. Create Pull Request

```bash
# Create PR that references the issue
gh pr create --title "feat: add blog search functionality" \
  --body "Closes #123

## Summary
- Implemented search functionality
- Added keyboard navigation
- Mobile responsive design

## Testing
- [x] Tested on Chrome, Firefox, Safari
- [x] Mobile testing complete
- [x] Accessibility verified"
```

**The PR will automatically close when merged.**

#### 7. Merge and Deploy

- PR gets reviewed (if needed)
- Merge to `main`
- GitHub Actions deploys automatically
- Semantic release handles versioning
- Issue closes automatically via PR

### Batch Workflow Summary

```
0. Initial setup: Push first commit → Protect main branch
   ↓
1. Create Issue with todos
   ↓
2. Create feature branch
   ↓
3. Work on 3-4 tasks
   ↓
4. Commit batch
   ↓
5. Push batch
   ↓
6. More tasks? → Go to step 3
   ↓
7. All done? → Rebase commits
   ↓
8. Create PR (closes issue)
   ↓
9. Merge → Deploys automatically
```

**Remember: After initial setup, ALL changes must go through feature branches and PRs. No direct commits to `main`.**

### Why This Workflow?

- ✅ **Progress tracking**: Issues show what's being worked on
- ✅ **Small commits**: Easier to review and revert if needed
- ✅ **Continuous integration**: Each batch is tested
- ✅ **Clean history**: Rebase creates logical commit structure
- ✅ **Automatic closure**: PR closes issue automatically
- ✅ **Never lose work**: Frequent commits protect progress

### Testing

Between batches and before final rebase:

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run validation
npm run validate
```

### Deployment

- Only happens when you merge to `main` branch
- GitHub Actions automatically deploys to GitHub Pages
- Semantic release handles versioning

## Best Practices

### Communication

- Be clear and specific about requirements
- Ask Claude to explain code when needed
- Request alternatives if the first approach doesn't fit
- Provide feedback on generated code

### Code Quality

- Claude follows TypeScript best practices
- All code includes proper error handling
- Code is documented with JSDoc comments
- Examples are runnable and tested

### Project Structure

Claude understands the project structure:

```
pages/
├── docs/                      # VitePress content
│   ├── .vitepress/           # Configuration
│   ├── blog/                 # Blog posts
│   ├── public/               # Static assets
│   └── *.md                  # Pages
├── examples/                  # Code examples
├── scripts/                   # Build scripts
└── *.md                      # Documentation
```

### File Operations

- Claude prefers editing existing files over creating new ones
- Claude uses Read tool before Edit tool
- Claude validates changes after editing

## Safety and Permissions

### Approved Operations (No Approval Needed)

- Reading any file in the project
- Running `npm` commands (install, build, dev, validate)
- Running `git status`, `git diff`, `git log`
- Creating commits locally
- Using web fetch for documentation

### Operations Requiring Approval

- **Pushing to GitHub** (always requires explicit permission)
- Running destructive git commands
- Modifying git configuration
- Force pushing

### Forbidden Operations

- ❌ `git push --force` to main/master
- ❌ Skipping git hooks (`--no-verify`)
- ❌ Amending other developers' commits
- ❌ Running commands that could lose data

## Emergency Recovery

If something goes wrong:

```bash
# View recent commits
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- <file>

# View remote status
git remote -v
git branch -vv
```

## Contributing

When contributors work with Claude Code:

1. Read this document first
2. Follow the commit guidelines
3. Never let Claude push without review
4. Use the validation tools (`npm run validate`)
5. Test locally before committing

## Questions?

- **About Claude Code**: See [Claude Code Documentation](https://docs.claude.com/claude-code)
- **About this project**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Code of Conduct**: See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## Attribution

This project development was assisted by [Claude](https://claude.ai) by Anthropic. All code has been reviewed and validated by human developers.

---

**Remember**: Claude Code is a powerful assistant, but you're always in control. Review, test, and approve everything before it leaves your machine.

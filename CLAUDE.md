# Working with Claude Code

## Overview

This project was developed in collaboration with Claude Code by Anthropic. This guide provides best practices, guidelines, and important notes for working with Claude Code on this project.

## First Time Working with Claude?

**Quick Start (5 minutes):**

1. ⏱️ **Read this document** (5 min) - Get the big picture
2. 🚨 **Review [Git Safety Guidelines](./docs/claude/git-safety.md)** (critical!)
3. 🔄 **Scan [Development Workflow](./docs/claude/workflow.md)** - Understand the 3 phases
4. 📚 **Optional**: [Best Practices](./docs/claude/best-practices.md) for deeper insights

**That's it!** You're ready to start collaborating with Claude Code.

## Prerequisites

Before you begin, ensure you have:

- ✅ **Claude Code CLI installed** - See [Claude Code Documentation](https://docs.claude.com/claude-code)
- ✅ **Git configured** with your GitHub account
- ✅ **Familiarity with Conventional Commits** - See [conventionalcommits.org](https://www.conventionalcommits.org/)
- ✅ **Understanding of Git Safety Guidelines** - Read [docs/claude/git-safety.md](./docs/claude/git-safety.md)

## Philosophy

Claude Code is a powerful AI assistant that enhances human productivity and code quality. The collaboration model is:

- **AI-Assisted Development**: Claude helps with code generation, refactoring, and problem-solving
- **Human Oversight**: All AI-generated code is reviewed, tested, and validated by experienced developers
- **Best Practices**: Combining AI capabilities with decades of software engineering experience
- **Transparency**: We're open about our use of AI tools in development
- **Question and Validate**: Always maintain healthy skepticism and verify Claude's solutions. If something doesn't look right, investigate and challenge it.

## Documentation

This guide has been split into focused documents for easier navigation:

### Core Guides

- **[Git and GitHub Safety](./docs/claude/git-safety.md)** - Git workflow and safety guidelines
- **[Commit Guidelines](./docs/claude/commit-guidelines.md)** - Conventional commits and semantic versioning
- **[Development Workflow](./docs/claude/workflow.md)** - Feature development process with batches
- **[Multi-Batch Workflow](./docs/claude/multi-batch-workflow.md)** - Managing large issues across sessions
- **[Best Practices](./docs/claude/best-practices.md)** - Code quality and project conventions

### Quick Reference

#### 🔄 Workflow (3 Phases)

1. **Issue-First** - Every feature starts with issue + feature branch ([details](./docs/claude/workflow.md#1-issue-first-workflow-primary))
2. **Batch Development** - Work in small batches:
   - Complete 3-4 tasks
   - Show changes to review
   - Get your approval
   - Commit (after approval)
   - Repeat until feature is complete
3. **Completion** - Rebase → YOU push → YOU create PR

#### 🚫 Git Safety

Claude will NEVER push or pull to/from GitHub. You always push and pull yourself.

**Why?** This keeps you in full control and prevents accidental changes to the remote repository.

#### 🏷️ First Push

The first time you push a new feature branch, you need to set the upstream:

```bash
git push -u origin feature/your-branch-name
```

After that, subsequent pushes can just use `git push`.

#### 📝 Commit Format

Use [Conventional Commits](https://www.conventionalcommits.org/) for semantic versioning:

- `feat:` → Minor version (1.0.0 → 1.1.0)
- `fix:` → Patch version (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → Major version (1.0.0 → 2.0.0)

## Common Pitfalls

Learn from real-world experience. Here are common mistakes and how to avoid them:

### ❌ Creating duplicate resources

**Wrong**: Creating a new label/branch/file without checking if it exists

**✅ Right**: Always check existing labels/branches/files first using `gh label list`, `git branch -a`, or file searches

### ❌ Committing without review

**Wrong**: Letting Claude commit changes immediately without your review

**✅ Right**: Claude should ask for your approval before every commit. Review the changes first!

### ❌ Wrong branch context

**Wrong**: Assuming you're on the right branch and making changes

**✅ Right**: Always check current branch and context before operations using `git status` and `git branch`

### ❌ Forgetting status labels

**Wrong**: Not updating issue labels as work progresses

**✅ Right**: Manage issue status throughout workflow (in-progress, review, etc.)

### ❌ Pushing during development

**Wrong**: Pushing to GitHub during active development

**✅ Right**: Push only happens at the END, after all batches are complete and you've reviewed everything

## Getting Help

Need assistance? Here's where to look:

- 🆕 **New to Claude Code?** → [Official Documentation](https://docs.claude.com/claude-code)
- 🔄 **Workflow questions?** → [Development Workflow](./docs/claude/workflow.md)
- 🚨 **Git confusion?** → [Git Safety Guidelines](./docs/claude/git-safety.md)
- 📋 **Project questions?** → [CONTRIBUTING.md](./CONTRIBUTING.md)
- 🤝 **Code of Conduct** → [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- 🐛 **Found an issue?** → [Open an issue](https://github.com/BANCS-Norway/home/issues/new)

## Continuous Improvement

This documentation is a **living document** that evolves with the project:

- 📈 **Ongoing Enhancements**: See [Issue #30](https://github.com/BANCS-Norway/home/issues/30) for planned improvements
- 💡 **Suggest Improvements**: Found something unclear? Open an issue or submit a PR
- 🔗 **Contributing to Docs**: When contributing documentation improvements, use `Part of #30` in your PR description (not `Closes #30`) to keep the improvement tracking issue open

Your feedback helps make this documentation better for everyone!

## Attribution

This project development was assisted by [Claude](https://claude.ai) by Anthropic. All code has been reviewed and validated by human developers.

---

**Remember**: Claude Code is a powerful assistant, but you're always in control. Review, test, and approve everything before it leaves your machine.

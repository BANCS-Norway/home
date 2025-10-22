# Working with Claude Code

## Overview

This project was developed in collaboration with Claude Code by Anthropic. This guide provides best practices, guidelines, and important notes for working with Claude Code on this project.

## Philosophy

Claude Code is a powerful AI assistant that enhances human productivity and code quality. The collaboration model is:

- **AI-Assisted Development**: Claude helps with code generation, refactoring, and problem-solving
- **Human Oversight**: All AI-generated code is reviewed, tested, and validated by experienced developers
- **Best Practices**: Combining AI capabilities with decades of software engineering experience
- **Transparency**: We're open about our use of AI tools in development

## Documentation

This guide has been split into focused documents for easier navigation:

### Core Guides

- **[Git and GitHub Safety](./docs/claude/git-safety.md)** - Git workflow and safety guidelines
- **[Commit Guidelines](./docs/claude/commit-guidelines.md)** - Conventional commits and semantic versioning
- **[Development Workflow](./docs/claude/workflow.md)** - Feature development process with batches
- **[Multi-Batch Workflow](./docs/claude/multi-batch-workflow.md)** - Managing large issues across sessions
- **[Best Practices](./docs/claude/best-practices.md)** - Code quality and project conventions

### Quick Reference

**Git Safety**: Claude will NEVER push to GitHub without explicit permission. You maintain full control.

**Commit Format**: Use [Conventional Commits](https://www.conventionalcommits.org/) for semantic versioning
- `feat:` → Minor version (1.0.0 → 1.1.0)
- `fix:` → Patch version (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → Major version (1.0.0 → 2.0.0)

**Workflow**: Work in batches of 3-4 tasks → Commit → Push → Repeat

## Questions?

- **About Claude Code**: See [Claude Code Documentation](https://docs.claude.com/claude-code)
- **About this project**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Code of Conduct**: See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## Attribution

This project development was assisted by [Claude](https://claude.ai) by Anthropic. All code has been reviewed and validated by human developers.

---

**Remember**: Claude Code is a powerful assistant, but you're always in control. Review, test, and approve everything before it leaves your machine.

# Quick Workflow Reference

Show me the 3-phase development workflow for this project:

## Phase 1: Issue-First Workflow

- Every feature starts with a GitHub issue
- Create feature branch from issue number
- Use worktree for isolated development (optional but recommended)
- Add "status: in progress" label

## Phase 2: Batch Development

Work in small batches (3-4 tasks):
1. Complete a small set of related tasks
2. Show changes for review
3. Get approval from developer
4. Create commit (ONLY after approval)
5. Repeat until feature is complete

**Important**: Never commit without review and approval!

## Phase 3: Completion

1. Rebase if needed to keep history clean
2. Developer pushes to GitHub (Claude never pushes)
3. Developer creates Pull Request
4. Update issue with PR link
5. Add "status: review" label

## Git Safety Rules

- Claude NEVER pushes or pulls to/from GitHub
- All commits use Conventional Commits format
- Developer reviews all changes before commits
- Developer controls all GitHub interactions

## Quick Commands

- Check status: `git status`
- View changes: `git diff`
- View commits: `git log --oneline -5`
- Current branch: `git branch --show-current`

---

For detailed workflow documentation, see:
- [Development Workflow](../../docs/claude/workflow.md)
- [Git Safety Guidelines](../../docs/claude/git-safety.md)

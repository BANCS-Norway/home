# Git Safety Guidelines

Remind me of the Git safety rules for this project:

## What Claude Will Do

- ✅ Create commits with your approval
- ✅ Create feature branches
- ✅ Show you diffs and changes
- ✅ Rebase branches when needed
- ✅ Use Conventional Commits format
- ✅ Stage files for commits
- ✅ Create and manage worktrees

## What Claude Will NEVER Do

- ❌ Push to GitHub (you always push)
- ❌ Pull from GitHub (you always pull)
- ❌ Force push (especially to main/master)
- ❌ Commit without your review and approval
- ❌ Modify git config
- ❌ Run destructive git commands without explicit request
- ❌ Skip git hooks (--no-verify)

## Push/Pull Policy

**You are always in control of remote operations:**

1. **First Push**: Use `git push -u origin <branch-name>` to set upstream
2. **Subsequent Pushes**: Use `git push` after reviewing all commits
3. **Pull Updates**: Use `git pull` when you need remote changes

## Commit Process

1. Claude makes changes to files
2. Claude shows you a diff or summary
3. You review the changes
4. You approve the commit
5. Claude creates commit with proper format
6. You verify with `git log`
7. You push when ready

## Commit Message Format

Using Conventional Commits for semantic versioning:

- `feat:` → Minor version bump (1.0.0 → 1.1.0)
- `fix:` → Patch version bump (1.0.0 → 1.0.1)
- `docs:` → No version bump
- `style:` → No version bump
- `refactor:` → No version bump
- `test:` → No version bump
- `chore:` → No version bump
- `BREAKING CHANGE:` → Major version bump (1.0.0 → 2.0.0)

## Emergency: Undo Last Commit

If you need to undo the last commit (before pushing):

```bash
# Undo commit, keep changes
git reset --soft HEAD~1

# Undo commit and changes (CAREFUL!)
git reset --hard HEAD~1
```

## Quick Safety Check

Before any major operation, verify:

```bash
git status              # What's changed?
git branch --show-current  # Where am I?
git log --oneline -5   # Recent commits?
```

---

For detailed guidelines, see [Git Safety Documentation](../../docs/claude/git-safety.md)

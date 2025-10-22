# Git and GitHub Safety

## Important: Claude Code Will NEVER Push to GitHub

**Claude Code will NEVER push to GitHub or any remote repository without explicit user permission.**

When working with git:
- ✅ Claude can help prepare commits and draft commit messages
- ✅ Claude can stage files and create commits locally
- ✅ Claude can analyze git history and diffs
- ❌ Claude will ALWAYS ask before pushing to remote repositories
- ❌ Claude will NOT run `git push` without explicit user approval

**You maintain full control over what gets pushed to GitHub.**

## Git Workflow with Claude

1. **Local Development**: Claude can freely work with local git operations
2. **Commit Preparation**: Claude will help stage files and draft commit messages
3. **Review**: You review the changes and commit message
4. **Approval Required**: Before any `git push`, Claude will ask for your explicit permission
5. **You Push**: You control when and what gets pushed to remote repositories

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

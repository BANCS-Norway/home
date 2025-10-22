# Git and GitHub Safety

## Important: Claude Code Will NEVER Push or Pull

**Claude Code shall NEVER push or pull to/from GitHub or any remote repository.**

When working with git:
- ✅ Claude can help prepare commits and draft commit messages
- ✅ Claude can stage files and create commits locally
- ✅ Claude can analyze git history and diffs
- ❌ Claude will NEVER run `git push` - you always push yourself
- ❌ Claude will NEVER run `git pull` - you always pull yourself
- ❌ Claude will NOT ask for permission to push - it's not an option

**You maintain full control over what gets pushed to and pulled from GitHub.**

## Git Workflow with Claude

1. **Local Development**: Claude can freely work with local git operations
2. **Commit Preparation**: Claude will help stage files and draft commit messages
3. **Review**: You review the changes and commit message
4. **You Push**: You control when and what gets pushed to remote repositories
5. **You Pull**: You control when to pull updates from remote repositories

**Claude never pushes or pulls. You always do this yourself.**

## Safety and Permissions

### Approved Operations (No Approval Needed)

- Reading any file in the project
- Running `npm` commands (install, build, dev, validate)
- Running `git status`, `git diff`, `git log`
- Creating commits locally
- Using web fetch for documentation

### Operations Claude Will NEVER Do

- **Pushing to GitHub** (`git push`) - You always do this yourself
- **Pulling from GitHub** (`git pull`) - You always do this yourself
- Running destructive git commands
- Modifying git configuration
- Force pushing to any branch

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

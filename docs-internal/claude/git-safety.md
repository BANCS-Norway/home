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

## Git Worktrees and Safety

**Note**: Git worktrees are **optional** for most workflows. They're useful for parallel work but not required unless you're using the `/new-feature` slash command.

Git worktrees are safe to use with Claude Code, following the same principles:

### Safe Worktree Operations

Claude can help with worktree management:

```bash
# ✅ Claude can help create worktrees
git worktree add worktrees/feature-123 -b feature/123-new-feature

# ✅ Claude can list worktrees
git worktree list

# ✅ Claude can remove worktrees
git worktree remove worktrees/feature-123

# ✅ Claude can prune stale worktree references
git worktree prune
```

### Safety Considerations

1. **Never Work Directly on Main Branch**
   - Always create a feature branch for any work
   - Keep main branch clean and in sync with remote
   - This is the most important safety rule
   - Example:
     ```bash
     # ❌ WRONG - Working on main
     git checkout main
     # ... making changes to main

     # ✅ CORRECT - Create feature branch
     git checkout -b feature/123-new-feature
     # ... or use worktree:
     git worktree add worktrees/feature-123 -b feature/123-new-feature
     ```

2. **Git's Built-in Worktree Protection**
   - Git prevents the same branch from being checked out in multiple worktrees
   - This is automatic protection - you cannot accidentally violate it
   - Error message: `fatal: 'feature/123' is already checked out at '...'`
   - This ensures you never work on the same branch in two places

3. **Be Careful with Multiple Claude Sessions** ⚠️
   - Running multiple Claude Code sessions in the same worktree/directory could lead to conflicting changes
   - Most users run one Claude session at a time for simplicity
   - Advanced users may run multiple sessions in different worktrees on different branches

4. **Working with Worktrees**
   - **Option 1 (Recommended)**: Claude works from main repository directory
     - Uses full paths to access files in different worktrees
     - No need to restart Claude when creating worktrees
   - **Option 2 (Advanced)**: Start Claude in specific worktree directory
     - All operations use relative paths within that worktree
     - Requires restarting Claude to switch contexts

5. **Worktree-Specific Operations**
   - All git operations in a worktree are local to that directory
   - Commits made in one worktree don't affect the working state of others
   - Each worktree maintains its own working directory and index

6. **YOU Still Control Push/Pull**
   - Even with worktrees, Claude NEVER pushes or pulls
   - You push from whichever worktree you're working in
   - Example workflow:
     ```bash
     # In worktree directory
     cd ~/projects/worktrees/feature-123

     # Claude commits locally
     # (After you review and approve)

     # YOU push when ready
     git push -u origin feature/123-new-feature
     ```

7. **Cleanup After Merging**
   - Remove worktrees promptly after PRs are merged
   - Prevents confusion and disk space waste
   - Use `git worktree remove` (not manual directory deletion)

### Worktree Safety Checklist

Before working in a worktree:
- ✅ Verify current directory: `pwd`
- ✅ Check current branch: `git branch --show-current`
- ✅ List all worktrees: `git worktree list`
- ✅ Confirm correct worktree context before operations

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

# Worktree-specific recovery
git worktree list           # See all worktrees
git worktree prune          # Clean up stale references
git worktree repair         # Fix worktree links after moving
```

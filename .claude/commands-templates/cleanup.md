# Cleanup Worktree After Merge

Help me clean up a worktree after its feature branch has been merged.

## Steps to Execute

1. **Verify Merge Status**
   - Ask user: "Which issue number/branch should I clean up?"
   - Check that the PR is merged and branch is safe to delete
   - Show: `gh pr view {issue-number}` to confirm merged status

2. **Navigate to Main Repository**
   - Run `pwd` to check current location
   - If in a worktree, navigate back: `cd ../../` (or to main repo path)
   - Verify on main branch: `git branch --show-current`

3. **List Current Worktrees**
   - Run: `git worktree list`
   - Identify the worktree path to remove

4. **Prune Stale Worktree References**
   - ALWAYS run first: `git worktree prune -v`
   - This cleans up references to deleted worktrees
   - Prepares for both normal and orphaned worktree removal

5. **Detect and Remove Worktree**
   - Check if worktree is tracked: `git worktree list | grep "worktrees/{worktree-name}"`
   - **If tracked (normal case):**
     - Try: `git worktree remove worktrees/{worktree-name}`
     - If fails, try: `git worktree remove --force worktrees/{worktree-name}`
     - Inform user: "Removed tracked worktree using git worktree remove"
   - **If orphaned (not in git worktree list):**
     - Check if directory exists: `ls worktrees/{worktree-name}`
     - If exists, use: `rm -rf worktrees/{worktree-name}`
     - Inform user: "Detected orphaned worktree, removed manually with rm -rf"

6. **Delete Local Branch**
   - Command: `git branch -d {branch-name}`
   - Example: `git branch -d feature/67_templates`
   - If branch not fully merged, warn user before using `-D`

7. **Update Issue Label**
   - Run: `gh issue edit {issue-number} --remove-label "status: in progress"`
   - Run: `gh issue edit {issue-number} --add-label "status: done"`

8. **Verify Cleanup**
   - Run: `git worktree list` to confirm removal
   - Run: `ls -la worktrees/` to verify directory is gone
   - Run: `git branch` to confirm branch deletion

## Example Flow (Normal Case)

```bash
# From main repository
gh pr view 67                              # Verify merged
git worktree prune -v                      # Clean stale references first
git worktree remove worktrees/feature-67-templates
git branch -d feature/67_templates
gh issue edit 67 --remove-label "status: in progress"
gh issue edit 67 --add-label "status: done"
git worktree list                          # Verify removal
ls -la worktrees/                          # Verify directory gone
```

## Example Flow (Orphaned Worktree)

```bash
# From main repository
gh pr view 67                              # Verify merged
git worktree prune -v                      # Clean stale references first
git worktree list                          # Check if worktree is tracked
# If not in list, it's orphaned
ls worktrees/feature-67-templates          # Verify directory exists
rm -rf worktrees/feature-67-templates      # Manual removal
git branch -d feature/67_templates
gh issue edit 67 --remove-label "status: in progress"
gh issue edit 67 --add-label "status: done"
```

## Understanding Orphaned Worktrees

A worktree becomes "orphaned" when:
- The directory was manually deleted (e.g., `rm -rf worktrees/{name}`)
- Git still has a reference to it in `.git/worktrees/`
- `git worktree list` no longer shows it OR shows invalid path

**Detection:**
- Directory missing from `worktrees/` but git remembers it
- OR directory exists but not in `git worktree list` output

**Solution:**
- Always run `git worktree prune` first to clean stale references
- Then use manual removal (`rm -rf`) if needed

## Safety Checks

- ⚠️ Only remove worktrees for merged PRs
- ⚠️ Verify you're in the main repository before removal
- ⚠️ Use `-d` (not `-D`) to safely delete branches
- ⚠️ Keep worktree if you need to reference the code later
- ⚠️ Always run `git worktree prune` before removal

## What Gets Cleaned Up

- ✅ Worktree directory removed from `worktrees/`
- ✅ Local feature branch deleted
- ✅ Issue status updated to "done"
- ✅ Stale worktree references pruned

## What Stays

- ✅ Remote branch (deleted automatically by GitHub after merge)
- ✅ Commit history (merged into main)
- ✅ PR and issue (closed but preserved)

---

Ready to clean up? Let me know the issue number!

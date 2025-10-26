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

4. **Remove the Worktree**
   - Command: `git worktree remove worktrees/{worktree-name}`
   - Example: `git worktree remove worktrees/feature-67-templates`

5. **Delete Local Branch**
   - Command: `git branch -d {branch-name}`
   - Example: `git branch -d feature/67_templates`
   - If branch not fully merged, warn user before using `-D`

6. **Update Issue Label**
   - Run: `gh issue edit {issue-number} --remove-label "status: in progress"`
   - Run: `gh issue edit {issue-number} --add-label "status: done"`

7. **Verify Cleanup**
   - Run: `git worktree list` to confirm removal
   - Run: `git branch` to confirm branch deletion

## Example Flow

```bash
# From main repository
gh pr view 67  # Verify merged
git worktree remove worktrees/feature-67-templates
git branch -d feature/67_templates
gh issue edit 67 --remove-label "status: in progress"
gh issue edit 67 --add-label "status: done"
```

## Safety Checks

- ⚠️ Only remove worktrees for merged PRs
- ⚠️ Verify you're in the main repository before removal
- ⚠️ Use `-d` (not `-D`) to safely delete branches
- ⚠️ Keep worktree if you need to reference the code later

## What Gets Cleaned Up

- ✅ Worktree directory removed from `worktrees/`
- ✅ Local feature branch deleted
- ✅ Issue status updated to "done"

## What Stays

- ✅ Remote branch (deleted automatically by GitHub after merge)
- ✅ Commit history (merged into main)
- ✅ PR and issue (closed but preserved)

---

Ready to clean up? Let me know the issue number!

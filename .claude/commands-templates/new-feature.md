# Start New Feature with Worktree

Follow the Issue-First workflow with mandatory worktree creation.

## Steps to Execute

1. **Verify Current Location**
   - Run `pwd` to check current directory
   - Run `git branch --show-current` to see current branch
   - If not in main repository directory, navigate there first

2. **Check/Create Issue**
   - Ask user: "Should I create a new issue for this work, or is there an existing issue number?"
   - If creating new issue:
     - Ask for work description
     - Determine issue type: `docs`, `style`, or `feature`
     - Create issue with clear description, task list, and acceptance criteria
     - Get the issue number from response

3. **Create Worktree for Feature Branch**
   - Branch naming: `{type}/{issue}_{descriptive-name}`
   - Worktree naming: `worktrees/{type}-{issue}-{descriptive-name}`
   - Command: `git worktree add worktrees/{type}-{issue}-{desc} -b {type}/{issue}_{desc}`
   - Example: `git worktree add worktrees/feature-123-search -b feature/123_add-blog-search`

4. **Add Status Label**
   - Run: `gh issue edit {issue-number} --add-label "status: in progress"`

5. **Navigate to Worktree**
   - Run: `cd worktrees/{worktree-name}`
   - Verify: `pwd` and `git branch --show-current`

6. **Confirm Ready**
   - Tell user: "Worktree created at `worktrees/{name}` for issue #{number}. Ready to start work?"

## Example Flow

```bash
# From main repository directory
git worktree add worktrees/feature-123-search -b feature/123_add-blog-search
gh issue edit 123 --add-label "status: in progress"
cd worktrees/feature-123-search
```

Now you're ready to start batch development in the new worktree!

# Worktree Workflow Reminder

Show me the git worktree-based workflow for this project:

## Why Use Worktrees?

Git worktrees allow you to work on multiple branches simultaneously without switching branches. Each worktree is a separate working directory linked to the same repository.

## Worktree Structure

```
bancs/home/               # Main repository (main branch)
├── worktrees/           # All feature worktrees live here
│   ├── feature-67-slash-commands/
│   ├── docs-42-workflow-guide/
│   └── fix-28-layout-issue/
└── .git/                # Shared git database
```

## Common Worktree Commands

### List All Worktrees
```bash
git worktree list
```

### Create New Worktree
```bash
# From main repository
git worktree add worktrees/{type}-{issue}-{desc} -b {type}/{issue}_{desc}

# Example
git worktree add worktrees/feature-67-templates -b feature/67_templates
```

### Navigate to Worktree
```bash
cd worktrees/feature-67-templates
```

### Check Current Location
```bash
pwd                      # Where am I?
git branch --show-current   # What branch?
```

### Remove Worktree (After Merge)
```bash
# From main repository
git worktree remove worktrees/feature-67-templates
git branch -d feature/67_templates
```

## Workflow with Worktrees

1. **Start in Main Repo** - Always create worktrees from the main repository
2. **Create Worktree** - One worktree per feature/issue
3. **Work in Worktree** - Navigate to worktree directory, make changes
4. **Commit in Worktree** - All git operations work normally
5. **Push from Worktree** - Push your feature branch
6. **Clean Up After Merge** - Remove worktree and delete branch

## Benefits

- ✅ Work on multiple features without branch switching
- ✅ Keep main repository clean and on main branch
- ✅ Test features side-by-side
- ✅ No need to stash changes when switching contexts
- ✅ Each worktree has its own node_modules/build

## Tips

- Always verify location with `pwd` before operations
- Use descriptive worktree names: `{type}-{issue}-{description}`
- Don't forget to clean up merged worktrees
- Main repo should stay on `main` branch

## Quick Reference

```bash
# Create
git worktree add worktrees/feature-123-search -b feature/123_search

# List
git worktree list

# Remove
git worktree remove worktrees/feature-123-search

# Delete branch
git branch -d feature/123_search
```

---

For detailed worktree documentation, see [Git Worktree Guide](../../docs/claude/git-worktree.md)

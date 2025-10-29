# Continuing Work on Multi-Batch Issues

## Context Management Strategy

When working on large issues that require multiple batches across separate Claude sessions, follow this protocol to maintain efficiency and avoid duplicate work or resource exhaustion.

## Session Restart Protocol

### When to Restart
- After completing 3-4 file operations in a batch
- When noticing performance degradation (forgetting conventions, verbose responses, mistakes)
- Before IDE instability occurs (Claude sessions can cause Cursor crashes if run too long)
- Use `/clear` for light resets, but expect to fully close Claude session for heavy file operations

### Resuming Work Checklist

When starting a new Claude session to continue work on an existing issue:

1. **Review the Issue**
   - Understand the overall scope and requirements
   - Note acceptance criteria and deliverables
   - Check for any special instructions or conventions

2. **Check Recent Commits** (Critical - Source of Truth)
   - Review the **last 1-3 commits** on the branch
   - Identify which files have been completed
   - Understand the current state of progress
   - **Why multiple commits?** To understand patterns and maintain consistency:
     - Code style and structure
     - Documentation format (e.g., JSDoc patterns)
     - Naming conventions
     - Test patterns
     - Implementation approach

3. **Review a Completed File** (If Needed)
   - If uncertain about conventions, examine a recently completed file
   - Use it as a reference template for remaining work
   - Ensures consistency across all files in the issue

4. **Execute the Next Batch**
   - Work on 3-4 files maximum per batch
   - Maintain focus and follow established patterns
   - Commit when batch is complete

5. **Update Progress**
   - **Always update the issue progress** after completing work
   - Don't wait to be asked - make this automatic
   - Update checkboxes, add comments about what was completed
   - Helps next session (or next developer) understand current state

## Batch Size Guidelines

### Optimal Batch Sizes
- **Simple updates** (formatting, imports): 3-4 files
- **Documentation** (JSDoc, comments): 3-4 files
- **Code changes** (refactoring, new features): 2-3 files
- **Complex operations** (major refactors, multi-file coordination): 1-2 files

### Warning Signs of Overload
- Forgetting project conventions (CLAUDE.md rules)
- Inconsistent code style across files
- Verbose or unfocused responses
- Making mistakes or introducing bugs
- Losing track of what's been completed

## Git Workflow Integration

### Commit Strategy
- Commit after each batch completion
- Keep commits focused and atomic
- Use clear commit messages referencing the issue
- **Final step:** Rebase all batch commits into a single commit before pushing
  - Keeps git history clean
  - One commit per issue closed
  - Professional history despite incremental process

### Example Workflow
```bash
# Batch 1 (Claude commits after your approval)
git add file1.ts file2.ts file3.ts
git commit -m "feat: add JSDoc to processors (batch 1/4) #46"

# Batch 2 (Claude commits after your approval)
git add file4.ts file5.ts file6.ts
git commit -m "feat: add JSDoc to processors (batch 2/4) #46"

# Batch 3 (Claude commits after your approval)
git add file7.ts file8.ts file9.ts
git commit -m "feat: add JSDoc to processors (batch 3/4) #46"

# Batch 4 (Claude commits after your approval)
git add file10.ts
git commit -m "feat: add JSDoc to processors (batch 4/4) #46"

# Rebase into single commit (Claude can help, or you do it)
git rebase -i HEAD~4
# (squash all commits into one)

# YOU push when ready (Claude NEVER pushes)
git push -u origin feature/jsdoc-processors-batch1

# YOU create PR to close issue
gh pr create --title "..." --body "Closes #46..."
```

## Communication Patterns

### Starting a New Session
**Good:**
- "Continue work on issue #46"
- (Claude should then check commits and issue state)

**Better:**
- "Continue issue #46, starting with batch 3"
- (Provides explicit context about where we are)

**Best:**
- "Continue issue #46. Check the last commits to see progress, then work on the next batch of 3 files"
- (Clear instruction to check state before proceeding)

### During Work
- Request progress updates: "Update the issue with what we've completed"
- Stop before overload: "Commit this batch, we'll continue in a fresh session"
- Verify understanding: "What files remain in this issue?"

## Key Principles

1. **Git commits are the source of truth**, not issue checkboxes or memory
2. **Smaller batches are better** - 3-4 files maximum, even if it creates more sessions
3. **Always check state** before starting work in a new session
4. **Always update progress** after completing work
5. **Restart proactively** before degradation occurs, not after
6. **Maintain consistency** by reviewing previous work

## Why This Works

This approach manages Claude's context limitations by:
- Creating natural checkpoints (commits) that preserve work
- Resetting cognitive load between batches (fresh sessions)
- Using version control as ground truth (eliminates confusion)
- Preventing resource exhaustion (avoids IDE crashes)
- Maintaining code quality (consistency through pattern review)

The overhead of restarting sessions is worth it to ensure high-quality, consistent output throughout the entire issue.

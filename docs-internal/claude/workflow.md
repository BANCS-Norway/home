# Development Workflow

## For External Contributors

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the standard contribution workflow.

## For Internal BANCS Development

This is the workflow for BANCS team members working with Claude Code on features.

**Three-Phase Workflow:**
1. **[Issue-First Workflow](#1-issue-first-workflow-primary)** ← START HERE (PRIMARY)
2. **[Batch Development Workflow](#3-batch-development-workflow)** (Work in batches of 3-4 tasks)
3. **[Completion Workflow](#5-completion-workflow)** (Rebase, YOU push, Create PR)

---

## 1. Issue-First Workflow (PRIMARY)

**When a user requests work, Claude MUST follow this protocol:**

1. **Check Current Branch**
   ```bash
   git branch --show-current
   ```
   - If on `main`, proceed to step 2
   - If on feature branch, proceed with work

2. **Ask About Issue**
   - "Should I create a new issue for this work, or is there an existing issue?"
   - User will either:
     - Point to existing issue number (e.g., "#42")
     - Say "yes" to create new issue

3. **Gather Issue Details** (if creating new)
   - Ask user for work description
   - Determine issue type/label:
     - `docs` - Documentation changes
     - `style` - Styling, formatting, UI/UX
     - `feature` - New features or enhancements
   - Claude creates issue with:
     - Clear description
     - Task list (checkboxes)
     - Acceptance criteria
     - Appropriate label

4. **Create Feature Branch**
   - Branch naming convention: `{type}/{issue-number}_descriptive-title`
   - Examples:
     - `docs/42_refactor-claude-md`
     - `feature/23_add-search-functionality`
     - `style/15_update-button-colors`

5. **Add Status Label**
   - Mark issue with `status: in progress` label:
   ```bash
   gh issue edit {issue-number} --add-label "status: in progress"
   ```
   - This signals to the team that work has started

6. **Ready to Start**
   - Confirm with user: "Branch created. Ready to start work on issue #{number}?"

**Example Flow:**

```
User: "Split the CLAUDE.md into multiple files"
Claude: *checks branch* "We're on main. Should I create an issue for this work?"
User: "Yes"
Claude: "What type of work is this? (docs/style/feature)"
User: "docs"
Claude: *creates issue #42*
Claude: *creates branch docs/42_split-claude-md*
Claude: *adds "status: in progress" label to issue #42*
Claude: "Branch created. Ready to start work on issue #42?"
```

**Why This Convention?**

- ✅ Ensures all work is tracked in issues
- ✅ Maintains clean main branch (no direct commits)
- ✅ Provides clear context and history
- ✅ Consistent branch naming makes navigation easier
- ✅ Labels help organize and filter work

---

## 2. Initial Repository Setup (One-Time)

**IMPORTANT: This is a one-time setup for new repositories. For regular feature work, skip to [Section 3: Batch Development Workflow](#3-batch-development-workflow).**

**Protect the main branch after first commit**

After pushing the initial commit to `main`, immediately protect the branch on GitHub:

#### Step 1: Create Personal Access Token (PAT) for semantic-release

Semantic-release needs permission to bypass branch protection to create releases:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
3. Copy the token (you won't see it again!)
4. Add to repository secrets:
   - Go to Repository Settings → Secrets and variables → Actions
   - Create new secret: `GH_TOKEN` = your PAT
   - (Also add `GITHUB_TOKEN` if needed by workflows)

**This allows semantic-release to create tags, releases, and update the repository during automated releases.**

#### Step 2: Protect the main branch

1. Go to Repository Settings → Branches
2. Add branch protection rule for `main`:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Allow specified actors to bypass required pull requests
     - Add the GitHub Actions bot or your account (for semantic-release)
   - ✅ Do not allow force pushes
   - ✅ Do not allow deletions

**This ensures ALL work goes through the feature branch → PR → merge workflow.**

No direct commits to `main` are allowed after initial setup (except semantic-release automated releases).

#### Step 3: Verify semantic-release configuration

The `.releaserc.json` should already be configured. Verify it includes:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
}
```

And GitHub Actions workflow uses the `GH_TOKEN`:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```

---

## 3. Batch Development Workflow

This is the core workflow for feature development. You'll repeat the batch cycle (work → commit) until the feature is complete.

### 1. Create GitHub Issue

Before starting any feature work:

```bash
# Claude will help create a GitHub issue with:
# - Clear feature description
# - List of todos/tasks for the feature
# - Acceptance criteria
```

**Example Issue Format:**
```markdown
## Feature: [Feature Name]

Description of what we're building...

### Tasks
- [ ] Task 1: Description
- [ ] Task 2: Description
- [ ] Task 3: Description
- [ ] Task 4: Description

### Acceptance Criteria
- Criteria 1
- Criteria 2
```

### 2. Create Feature Branch

```bash
# Branch naming: feature/issue-number-description
git checkout -b feature/123-add-blog-search
```

### 3. Work in Batches (3-4 Tasks Maximum)

**IMPORTANT: Never do more than 3-4 tasks before committing.**

Work in small, focused batches:

1. **Select 3-4 tasks** from the issue
2. **Update progress** as you complete each task
3. **Stop and commit** after 3-4 tasks
4. **Repeat** until feature is complete

**Example Batch:**
```markdown
Batch 1: Setup and Infrastructure
- [x] Task 1: Add search dependencies
- [x] Task 2: Create search component
- [x] Task 3: Wire up search to VitePress

Batch 2: Styling and UX
- [x] Task 4: Style search results
- [x] Task 5: Add keyboard navigation
- [x] Task 6: Mobile responsive design

Batch 3: Testing and Polish
- [x] Task 7: Test on all browsers
- [x] Task 8: Add loading states
```

### 4. Commit Each Batch

After completing 3-4 tasks:

**IMPORTANT: Always ask for approval before committing**

1. **Show what was done**: Present a summary of completed tasks
2. **Show the commit message**: Display the full commit message you plan to use
3. **Ask for approval**: "Are you satisfied with these changes? Should I commit?"
4. **Wait for confirmation**: Only proceed after user approves
5. **Commit the batch**: Create the commit after approval

```bash
# Claude prepares the commit (after receiving approval)
git add .
git commit -m "feat(search): add search component and styling

- Added search dependencies
- Created search component
- Wired up to VitePress
- Styled search results

Part of #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Why ask before committing?**
- ✅ You review the work before it's saved
- ✅ Frequent commits protect against data loss
- ✅ You maintain oversight of all changes
- ✅ Easier to undo if something is wrong

**You control when to push:**
```bash
# First push: Use -u flag to set up tracking
git push -u origin feature/123-add-blog-search

# Subsequent pushes: Can use shorthand
git push
```

**Why use `-u` flag on first push?**
- ✅ Sets up tracking relationship between local and remote branch
- ✅ Makes `gh pr create` easier (automatically knows the branch)
- ✅ Future pushes can use just `git push` without specifying remote/branch
- ✅ `git status` shows if branch is ahead/behind remote

---

## 4. Workflow Summary

Here's the complete workflow from start to finish:

```
0. Initial setup (one-time): YOU push first commit → Protect main branch
   ↓
1. Issue-First Workflow (EVERY feature starts here):
   ├─ Check current branch (on main?)
   ├─ Ask about issue (create or use existing)
   ├─ Create feature branch: {type}/{issue-number}_descriptive-title
   └─ Add "status: in progress" label
   ↓
2. BATCH CYCLE (Repeat until all tasks done):
   ├─ Work on 3-4 tasks
   ├─ Claude commits (after your approval)
   └─ More tasks? → Repeat step 2
   ↓
3. COMPLETION (YOU control):
   ├─ Rebase all batch commits into one
   ├─ YOU push to remote
   └─ YOU create PR (closes issue)
   ↓
4. Merge → Deploys automatically
```

**Key Points:**
- **Issue-First** - Every feature starts with an issue and feature branch
- **Claude commits** frequently (after approval) to protect your work
- **YOU push** when you're ready (after all batches are complete and rebased)
- **YOU create PR** to merge into main

---

## 5. Completion Workflow

When all batch work is complete, YOU take control to finish the feature.

### Step 1: Rebase and Clean Up

1. **Review all commits** in the feature branch
2. **Test the complete feature**
3. **Rebase commits together** (squash into logical commits)
4. **Remove status label** from the issue:
   ```bash
   gh issue edit {issue-number} --remove-label "status: in progress"
   ```

```bash
# Interactive rebase to clean up commits (Claude can help, or you do it)
git rebase -i main
```

### Step 2: YOU Push to Remote

**Claude NEVER pushes. You always control this step.**

```bash
# YOU push the cleaned up branch (use --force after rebase)
git push --force origin feature/123-add-blog-search
```

### Step 3: YOU Create Pull Request

```bash
# YOU create PR that references the issue
gh pr create --title "feat: add blog search functionality" \
  --body "Closes #123

## Summary
- Implemented search functionality
- Added keyboard navigation
- Mobile responsive design

## Testing
- [x] Tested on Chrome, Firefox, Safari
- [x] Mobile testing complete
- [x] Accessibility verified"
```

**The PR will automatically close the issue when merged.**

### Step 4: Merge and Deploy

- PR gets reviewed (if needed)
- Merge to `main`
- GitHub Actions deploys automatically
- Semantic release handles versioning
- Issue closes automatically via PR

---

## 6. Why This Workflow?

- ✅ **Progress tracking**: Issues show what's being worked on
- ✅ **Small commits**: Easier to review and revert if needed
- ✅ **Continuous integration**: Each batch is tested
- ✅ **Clean history**: Rebase creates logical commit structure
- ✅ **Automatic closure**: PR closes issue automatically
- ✅ **Never lose work**: Frequent commits protect progress

---

## 7. Using Git Worktrees for Parallel Work (Advanced)

Git worktrees allow you to work on multiple branches simultaneously without constantly switching branches or stashing changes. This is particularly useful when working on multiple issues in parallel or when you need to quickly switch between feature work and urgent hotfixes.

### What are Git Worktrees?

A git worktree allows you to have multiple working directories attached to the same repository, each checked out to a different branch. This means you can:

- Work on multiple features simultaneously
- Review code on one branch while developing on another
- Handle urgent hotfixes without disrupting current work
- Avoid the overhead of stashing/unstashing changes

### When to Use Worktrees

**Good Use Cases:**
- 🔥 **Hotfix scenarios**: Need to fix production bug while feature work is in progress
- 👀 **Code reviews**: Review a colleague's PR without switching branches
- 🔀 **Parallel features**: Work on multiple independent features simultaneously
- 🧪 **Testing approaches**: Try different implementation approaches in parallel

**When NOT to use:**
- ⚠️ Working on a single feature (just use regular branch switching)
- ⚠️ When branches have interdependencies
- ⚠️ If you're new to Git (master regular workflow first)

### Directory Structure Best Practice

Keep your worktrees organized in a dedicated directory:

```
~/projects/
└── bancs-home/               # Main repository (bare or regular)
    ├── main/                 # Main worktree (if using bare repo)
    └── worktrees/            # All feature worktrees
        ├── feature-123-search/
        ├── docs-42-refactor/
        └── hotfix-99-critical/
```

### Setting Up Worktrees

#### Option 1: Standard Repository Setup (Recommended for beginners)

If you already have a cloned repository:

```bash
# Navigate to your repository
cd ~/projects/bancs-home

# Create a new worktree for a feature branch
git worktree add ../worktrees/feature-123-search -b feature/123-add-blog-search

# Work in the new worktree
cd ../worktrees/feature-123-search
```

#### Option 2: Bare Repository Setup (Recommended for advanced users)

For a cleaner setup where all branches are worktrees:

```bash
# Clone as bare repository
git clone --bare git@github.com:BANCS-Norway/home.git ~/projects/bancs-home

# Create main worktree
cd ~/projects/bancs-home
git worktree add main main

# Create feature worktrees
git worktree add worktrees/feature-123-search -b feature/123-add-blog-search
```

### Worktree Workflow Integration

Git worktrees integrate seamlessly with the existing Issue-First workflow:

#### 1. Standard Workflow (Single Issue)

```bash
# On main branch in primary working directory
git checkout -b feature/123-add-blog-search
# ... work on feature ...
```

#### 2. Parallel Workflow (Multiple Issues with Worktrees)

```bash
# Currently working on feature #123 in primary directory
# Urgent issue #99 comes in

# Create worktree for hotfix
git worktree add ../worktrees/hotfix-99 -b feature/99-critical-fix

# Work on hotfix in separate directory
cd ../worktrees/hotfix-99
# ... fix the bug, commit, push ...

# Return to feature work (no stashing needed!)
cd ~/projects/bancs-home
# Continue working on feature #123
```

### Managing Worktrees

#### List All Worktrees

```bash
git worktree list
```

Example output:
```
/home/user/projects/bancs-home                    1201401 [main]
/home/user/projects/worktrees/feature-123-search  abc1234 [feature/123-add-blog-search]
/home/user/projects/worktrees/hotfix-99           def5678 [feature/99-critical-fix]
```

#### Remove Worktree (After Branch is Merged)

**IMPORTANT: Always clean up worktrees after merging branches**

```bash
# Option 1: Remove worktree and delete branch (recommended after merge)
git worktree remove worktrees/feature-123-search
git branch -d feature/123-add-blog-search

# Option 2: If worktree directory was manually deleted
git worktree prune
```

#### Move or Rename Worktree

```bash
# Move the directory
mv worktrees/old-name worktrees/new-name

# Update Git's records
git worktree repair
```

### Best Practices for Worktrees

1. **Consistent Naming**: Use the same naming convention as branches
   ```bash
   # Branch: feature/123-add-blog-search
   # Worktree: worktrees/feature-123-search
   ```

2. **Dedicated Directory**: Keep all worktrees in a `worktrees/` subdirectory
   - Easier to find and manage
   - Avoids confusion with the main working directory
   - Clearer organization when listing

3. **Regular Cleanup**: Remove worktrees promptly after branches are merged
   ```bash
   # After PR is merged, clean up
   git worktree remove worktrees/feature-123-search
   git branch -d feature/123-add-blog-search
   ```

4. **Track Your Worktrees**: Use `git worktree list` regularly
   - Identify stale worktrees
   - See which branches are being worked on
   - Verify correct branch checkout in each worktree

5. **One Branch, One Worktree**: Never checkout the same branch in multiple worktrees
   - Git prevents this by default
   - Ensures data integrity

### Common Issues and Solutions

#### Issue: "Branch already checked out"

```bash
# Error: fatal: 'feature/123' is already checked out at '...'

# Solution: You can't checkout the same branch in multiple worktrees
# Use git worktree list to find where it's checked out
git worktree list

# Switch to different branch or remove the other worktree
```

#### Issue: Worktree Directory Deleted Manually

```bash
# If you deleted the directory without using 'git worktree remove'
# Git still tracks it

# Clean up the references
git worktree prune
```

#### Issue: Lost Track of Worktrees

```bash
# List all worktrees to see what exists
git worktree list

# Repair worktrees if directories were moved
git worktree repair
```

### Worktrees with Claude Code

When using git worktrees with Claude Code:

1. **Start Claude in the Worktree Directory**
   ```bash
   cd ~/projects/worktrees/feature-123-search
   claude-code
   ```

2. **Each Worktree is Independent**
   - Claude works in the current worktree's context
   - Changes in one worktree don't affect others
   - Each worktree has its own working directory state

3. **Avoid Running Multiple Claude Sessions in Same Repository**
   - Claude might get confused by multiple concurrent sessions
   - Work on one worktree at a time
   - Complete batch work in one worktree before switching

### Quick Reference: Worktree Commands

```bash
# Create new worktree
git worktree add <path> -b <branch-name>

# List all worktrees
git worktree list

# Remove worktree
git worktree remove <path>

# Prune stale worktree references
git worktree prune

# Repair worktree references (after moving directories)
git worktree repair

# Lock worktree (prevent accidental removal)
git worktree lock <path>

# Unlock worktree
git worktree unlock <path>
```

---

## 8. Testing

Between batches and before final rebase:

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run validation
npm run validate
```

---

## 8. Deployment

- Only happens when you merge to `main` branch
- GitHub Actions automatically deploys to GitHub Pages
- Semantic release handles versioning

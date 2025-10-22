# Development Workflow

## For External Contributors

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the standard contribution workflow.

## For Internal BANCS Development

This is the workflow for BANCS team members working with Claude Code on features.

### Claude Code Convention: Issue-First Workflow

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

5. **Ready to Start**
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
Claude: "Branch created. Ready to start work on issue #42?"
```

**Why This Convention?**

- ✅ Ensures all work is tracked in issues
- ✅ Maintains clean main branch (no direct commits)
- ✅ Provides clear context and history
- ✅ Consistent branch naming makes navigation easier
- ✅ Labels help organize and filter work

### 0. Initial Repository Setup

**IMPORTANT: Protect the main branch after first commit**

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

```bash
# Claude prepares the commit
git add .
git commit -m "feat(search): add search component and styling

- Added search dependencies
- Created search component
- Wired up to VitePress
- Styled search results

Part of #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push the batch
git push origin feature/123-add-blog-search
```

### 5. Complete Feature

When all tasks are done:

1. **Review all commits** in the feature branch
2. **Test the complete feature**
3. **Rebase commits together** (squash into logical commits)
4. **Update the issue** to mark complete

```bash
# Interactive rebase to clean up commits
git rebase -i main

# Force push the cleaned up branch
git push --force origin feature/123-add-blog-search
```

### 6. Create Pull Request

```bash
# Create PR that references the issue
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

**The PR will automatically close when merged.**

### 7. Merge and Deploy

- PR gets reviewed (if needed)
- Merge to `main`
- GitHub Actions deploys automatically
- Semantic release handles versioning
- Issue closes automatically via PR

## Batch Workflow Summary

```
0. Initial setup: Push first commit → Protect main branch
   ↓
1. Create Issue with todos
   ↓
2. Create feature branch
   ↓
3. Work on 3-4 tasks
   ↓
4. Commit batch
   ↓
5. Push batch
   ↓
6. More tasks? → Go to step 3
   ↓
7. All done? → Rebase commits
   ↓
8. Create PR (closes issue)
   ↓
9. Merge → Deploys automatically
```

**Remember: After initial setup, ALL changes must go through feature branches and PRs. No direct commits to `main`.**

## Why This Workflow?

- ✅ **Progress tracking**: Issues show what's being worked on
- ✅ **Small commits**: Easier to review and revert if needed
- ✅ **Continuous integration**: Each batch is tested
- ✅ **Clean history**: Rebase creates logical commit structure
- ✅ **Automatic closure**: PR closes issue automatically
- ✅ **Never lose work**: Frequent commits protect progress

## Testing

Between batches and before final rebase:

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run validation
npm run validate
```

## Deployment

- Only happens when you merge to `main` branch
- GitHub Actions automatically deploys to GitHub Pages
- Semantic release handles versioning

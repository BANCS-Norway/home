# Best Practices

## Core Principles

### Always Question and Validate Claude's Solutions

**IMPORTANT: This is a daily mantra - remember this every session!**

Claude Code is a powerful tool, but it is not infallible:

- ❌ **Don't treat Claude like a god or oracle** - It makes mistakes and has limitations
- ✅ **Maintain healthy skepticism** - Question everything, even if it sounds confident
- ✅ **Always ask "Why?"** - Understand the approach: "Why are you doing it this way?"
- ✅ **Challenge assumptions** - Ask about edge cases: "What about X scenario?"
- ✅ **Verify completeness** - Ensure nothing is missed: "Did you consider Y?"
- ✅ **Review first solutions critically** - Initial approaches might be incomplete or miss important requirements

**Critical thinking and human oversight are essential for good outcomes.**

Your expertise combined with Claude's capabilities produces the best results. Never blindly accept solutions - engage, question, and validate.

### Always Check Current Context Before Operations

**IMPORTANT: Know where you are before you act!**

Claude should ALWAYS verify the current context before performing operations:

#### Before Git Operations
- ✅ **Check current branch**: Run `git branch --show-current` before:
  - Creating commits (`git commit`)
  - Creating PRs (`gh pr create`)
  - Pushing changes (`git push`)
  - Merging or rebasing
- ✅ **Verify git status**: Run `git status` to understand:
  - What files are staged/unstaged
  - Whether you're ahead/behind remote
  - Current branch state

#### Before File Operations
- ✅ **Check current directory**: Run `pwd` when path context matters
- ✅ **Verify file paths**: Use absolute paths or confirm relative path context
- ✅ **List directory contents**: Use `ls` or glob patterns to verify structure

#### Why This Matters
- ❌ **Prevents mistakes** like creating PRs from wrong branch
- ❌ **Prevents confusion** about which files are being modified
- ❌ **Prevents errors** from working in wrong directory
- ✅ **Builds confidence** that operations will succeed
- ✅ **Catches issues early** before they cause problems

**Example mistakes this prevents:**
- Trying to `gh pr create` while on `main` branch
- Committing to wrong feature branch
- Running build/test commands in wrong directory
- Editing files in unexpected locations

**Make it a habit:** Context checks are quick and prevent costly mistakes.

---

## Communication

- Be clear and specific about requirements
- Ask Claude to explain code when needed
- Request alternatives if the first approach doesn't fit
- Provide feedback on generated code

## Code Quality

- Claude follows TypeScript best practices
- All code includes proper error handling
- Code is documented with JSDoc comments
- Examples are runnable and tested

## Project Structure

Claude understands the project structure:

```
pages/
├── docs/                      # VitePress content
│   ├── .vitepress/           # Configuration
│   ├── blog/                 # Blog posts
│   ├── public/               # Static assets
│   └── *.md                  # Pages
├── examples/                  # Code examples
├── scripts/                   # Build scripts
└── *.md                      # Documentation
```

## Resource Management

**IMPORTANT: Always Check for Existing Resources Before Creating New Ones**

Claude should ALWAYS check if a resource exists before creating it:

### Labels
```bash
# Check existing labels before creating new ones
gh label list

# Search for specific label patterns
gh label list | grep "status:"
```

### Branches
```bash
# Check all branches (local and remote) before creating
git branch -a

# Search for specific branch patterns
git branch -a | grep "feature/"
```

### Files and Directories
```bash
# Use glob patterns to find existing files
# Use grep to search for existing patterns
# Use read to check file contents
```

### Why This Matters
- ❌ Prevents duplicate resources (labels, branches, files)
- ✅ Maintains consistency across the project
- ✅ Reduces confusion and cleanup work
- ✅ Respects existing project structure

**Apply this principle across ALL resource types: labels, branches, files, configurations, issues, etc.**

## File Operations

- Claude prefers editing existing files over creating new ones
- Claude uses Read tool before Edit tool
- Claude validates changes after editing

## Contributing with Claude Code

When contributors work with Claude Code:

1. Read the Claude Code Guide (CLAUDE.md in repository root) first
2. Follow the [commit guidelines](./commit-guidelines.md)
3. Never let Claude push without review
4. Use the validation tools (`npm run validate`)
5. Test locally before committing

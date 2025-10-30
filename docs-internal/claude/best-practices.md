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

## What NOT to Remove: Protecting Custom Features

**IMPORTANT: This section helps Claude avoid accidentally breaking custom VitePress features.**

When working with VitePress theme files and components, some code may appear redundant or unused, but it serves critical purposes. Follow these guidelines to avoid breaking custom features like the 404 page or other customizations.

### Never Remove Without Understanding

Before removing ANY code from theme/layout files, ask these questions:

1. **Why does this code exist?**
   - Check git history: `git log -p -- path/to/file`
   - Look for related issues/PRs that explain it
   - Search documentation for its purpose

2. **What depends on this code?**
   - Search codebase for usage: `grep -r "code-pattern" docs/`
   - Check theme configuration: `docs/.vitepress/theme/index.ts`
   - Identify custom components that might rely on it

3. **What breaks if I remove it?**
   - Test all custom features (404 page, custom layouts, etc.)
   - Test in both development AND production builds
   - Check browser console for errors

### Common "Redundant-Looking" Code That You Should NOT Remove

#### 1. v-bind="$attrs" in Layout Components

**Looks like:** This appears to do nothing in the component itself

```vue
<!-- DON'T remove v-bind="$attrs" without analysis! -->
<template>
  <VPContent v-bind="$attrs">
    <slot />
  </VPContent>
</template>
```

**Why it's critical:**
- Forwards all attributes and slots to child components
- Required for custom pages (like NotFound.vue) to receive their props/slots
- Breaking this breaks slot forwarding chain
- Custom 404 page won't display without it

**Before removing:**
- Trace complete slot forwarding chain
- Test all custom pages that use layouts
- Verify no custom components depend on attr forwarding

#### 2. Empty-Looking Slot Forwards

**Looks like:** Slot is just passed through without being used

```vue
<!-- DON'T remove slot forwards without analysis! -->
<template>
  <div>
    <slot name="page-top" />  <!-- Looks unused -->
    <Content />
    <slot name="page-bottom" />  <!-- Looks unused -->
  </div>
</template>
```

**Why it's critical:**
- Allows parent components to inject content into specific positions
- Custom components may use these slots even if theme doesn't
- VitePress plugins may inject content via slots

**Before removing:**
- Search for all uses of the slot: `grep -r "page-top" docs/`
- Check theme config for slot usage
- Test with and without the slot

#### 3. Theme Configuration Overrides

**Looks like:** Config option that doesn't seem to change anything

```typescript
// DON'T remove theme config without analysis!
export default defineConfig({
  themeConfig: {
    // Looks unused but might be critical
    layout: 'custom',
    // Or other seemingly redundant options
  }
})
```

**Why it's critical:**
- May control behavior not visible in simple testing
- Might affect build output or static generation
- Could be required by custom components or plugins

**Before removing:**
- Check VitePress documentation for option purpose
- Test production build with and without option
- Verify all pages build correctly

#### 4. Import Statements That "Aren't Used"

**Looks like:** Component imported but not directly used in template

```typescript
// DON'T remove imports without analysis!
import NotFound from './NotFound.vue'  // Looks unused

export default {
  // But it's actually registered here:
  components: { NotFound },
  // Or used in theme config
}
```

**Why it's critical:**
- May be used in theme configuration
- Could be dynamically imported
- Might be used by VitePress internals

**Before removing:**
- Search for component usage in entire theme directory
- Check if it's registered globally
- Verify it's not used in theme config

### Red Flags: Signs You Should NOT Remove Code

🚩 **If you see these patterns, investigate thoroughly before removing:**

1. **Attribute/Prop Forwarding:**
   - `v-bind="$attrs"`
   - `v-on="$listeners"`
   - `...props` spreading in script

2. **Slot Forwarding:**
   - `<slot name="anything" />`
   - Multiple slots in layout components
   - Slot usage in theme files

3. **Component Registration:**
   - `app.component()` calls
   - Components object in theme config
   - Dynamic imports

4. **Theme Configuration:**
   - Layout property assignments
   - Custom theme options
   - Plugin configurations

5. **VitePress-Specific Patterns:**
   - `.vitepress/theme/` files
   - `enhanceApp` function content
   - Theme index.ts configurations

### Verification Checklist: Before Removing Code

When tempted to remove code, complete this checklist:

- [ ] I checked git history to understand why code was added
- [ ] I searched entire codebase for usage of this code
- [ ] I traced slot/prop/event flow through component tree
- [ ] I tested custom 404 page (if touching layout/theme)
- [ ] I tested all custom pages/components
- [ ] I ran production build successfully
- [ ] I verified no console errors in browser
- [ ] I checked theme configuration for dependencies
- [ ] I reviewed VitePress docs for this pattern
- [ ] I documented why removal is safe (or kept the code)

**If you can't check ALL boxes, keep the code until you can.**

### When in Doubt: ASK First

**Better to ask than to break production:**

- "Why does this `v-bind="$attrs"` exist in Layout.vue?"
- "What components use this slot?"
- "Is it safe to remove this import?"
- "Does the 404 page depend on this code?"

**Remember:** Restoring broken functionality takes much longer than asking a clarifying question.

### Related Resources

For detailed guidance on analyzing structural changes:
- [Structural Changes Checklist](./workflow.md#8-structural-changes-checklist)
- [Impact Analysis Guide](./impact-analysis.md)

---

## File Operations

- Claude prefers editing existing files over creating new ones
- Claude uses Read tool before Edit tool
- Claude validates changes after editing
- Claude ALWAYS checks if code is safe to remove before removing it

## Contributing with Claude Code

When contributors work with Claude Code:

1. Read the Claude Code Guide (CLAUDE.md in repository root) first
2. Follow the [commit guidelines](./commit-guidelines.md)
3. Never let Claude push without review
4. Use the validation tools (`npm run validate`)
5. Test locally before committing

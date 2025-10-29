# Code Import Demo

This example demonstrates how to import code snippets from repository files into blog posts.

## The Problem

Traditional approach - copying code into markdown:

```markdown
# My Blog Post

Here's an example:

\`\`\`typescript
export function greet(name: string) {
  return `Hello, ${name}!`
}
\`\`\`
```

**Issues:**
- ❌ Code can become outdated
- ❌ Copy/paste errors
- ❌ Can't test the code in the blog post
- ❌ Duplicate code maintenance

## The Solution

Import code directly from files:

```markdown
# My Blog Post

Here's an example:

<<< @/docs-internal/examples/code-import-demo/demo.ts#basicExample
```

**Benefits:**
- ✅ Always up-to-date
- ✅ Code is testable
- ✅ Single source of truth
- ✅ No duplication

## Usage Examples

### Import Entire File

```markdown
<<< @/docs-internal/examples/code-import-demo/demo.ts
```

### Import Specific Lines

```markdown
<<< @/docs-internal/examples/code-import-demo/demo.ts{1-5}
```

### Import Named Region

```markdown
<<< @/docs-internal/examples/code-import-demo/demo.ts#basicExample
```

or

```markdown
<<< @/docs-internal/examples/code-import-demo/demo.ts#advancedExample
```

## Testing This Example

You can run this example:

```bash
npx tsx docs-internal/examples/code-import-demo/demo.ts
```

## See Also

- [VitePress Plugins README](/.vitepress/plugins/README)
- [CONTRIBUTING.md](/CONTRIBUTING)

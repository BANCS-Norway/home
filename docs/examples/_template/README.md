# Example Template

Use this template when creating new code examples for blog posts.

## Quick Start

1. **Copy this directory:**
   ```bash
   cp -r docs/examples/_template docs/examples/your-blog-post-title
   cd docs/examples/your-blog-post-title
   ```

2. **Update this README** with your example details

3. **Edit demo.ts** with your working code

4. **Test it works:**
   ```bash
   npx tsx demo.ts
   ```

5. **Import into your blog post:**
   ```markdown
   <<< @/docs/examples/your-blog-post-title/demo.ts
   ```

## About This Example

[Replace this with a description of what your example demonstrates]

This example shows:
- Feature 1
- Feature 2
- Feature 3

## Prerequisites

[List any prerequisites]

- Node.js 22+
- Understanding of [concept]

## Running

```bash
# Install dependencies (if package.json exists)
npm install

# Run the demo
npx tsx demo.ts
```

## File Structure

```
your-blog-post-title/
├── README.md        # This file - explains the example
├── demo.ts          # Main example code
├── advanced.ts      # Advanced examples (optional)
└── package.json     # Dependencies (if needed)
```

## Using in Blog Posts

**Import entire file:**
```markdown
<<< @/docs/examples/your-blog-post-title/demo.ts
```

**Import specific lines:**
```markdown
<<< @/docs/examples/your-blog-post-title/demo.ts{10-20}
```

**Import named region:**
```markdown
<<< @/docs/examples/your-blog-post-title/demo.ts#yourRegion
```

## Related Blog Post

[Link to your blog post once published]

## License

MIT - See [LICENSE](../LICENSE)

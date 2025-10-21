# BANCS Code Examples

This directory contains all code examples used in blog posts and documentation.

## 🎯 Purpose

All examples in this directory:
- Are **working, runnable code** (not just snippets)
- Can be **imported into blog posts** using the `<<< @/` syntax
- Are **tested and maintained** alongside the site
- Are **MIT licensed** for free use

## 📁 Structure

```
docs/examples/
├── LICENSE                    # MIT License for all examples
├── README.md                  # This file
├── code-import-demo/          # Example of the import system
│   ├── README.md
│   └── demo.ts
└── your-blog-post-title/      # One directory per blog post
    ├── README.md              # How to run the examples
    ├── package.json           # Dependencies (if needed)
    ├── demo.ts                # Main example
    └── advanced.ts            # Additional examples
```

## ✅ Requirements for Examples

### 1. Working Code

All code must be runnable:

```bash
cd docs/examples/your-example
npm install  # if package.json exists
npx tsx demo.ts  # should run without errors
```

### 2. MIT License

All examples are MIT licensed. Add a header to your files:

```typescript
/**
 * Example: [Description]
 * Author: [Your Name] (optional)
 * License: MIT
 */
```

### 3. Documentation

Each example directory must have a README.md:

```markdown
# Example Title

Brief description of what this example demonstrates.

## Running

\`\`\`bash
npm install
npx tsx demo.ts
\`\`\`

## What It Shows

- Key concept 1
- Key concept 2

## Related Blog Post

[Title](/blog/your-post)
```

### 4. Dependencies

If your example needs dependencies:

```json
{
  "name": "example-name",
  "private": true,
  "type": "module",
  "scripts": {
    "demo": "tsx demo.ts"
  },
  "dependencies": {
    "your-deps": "^1.0.0"
  }
}
```

## 🔧 Using Examples in Blog Posts

Import code using the snippet syntax:

```markdown
# My Blog Post

Here's the basic example:

<<< @/docs/examples/my-example/demo.ts

Here's just the authentication part:

<<< @/docs/examples/my-example/demo.ts#authentication

Here's lines 10-20:

<<< @/docs/examples/my-example/demo.ts{10-20}
```

See [VitePress Plugins README](../.vitepress/plugins/README.md) for details.

## 🎨 Styling Examples

Examples can use custom styles since they're demonstrations. The style validation automatically skips the `docs/examples/` directory.

## 🤝 Contributing Examples

1. **Create a directory** for your blog post:
   ```bash
   mkdir -p docs/examples/your-post-title
   ```

2. **Write working code**:
   ```typescript
   // docs/examples/your-post-title/demo.ts

   /**
    * Example: Your Feature
    * Author: Your Name
    * License: MIT
    */

   export function yourExample() {
     // Working code here
   }
   ```

3. **Test it**:
   ```bash
   npx tsx docs/examples/your-post-title/demo.ts
   ```

4. **Add README.md** explaining how to run it

5. **Import into your blog post**:
   ```markdown
   <<< @/docs/examples/your-post-title/demo.ts
   ```

## 📜 License

All examples are licensed under the [MIT License](./LICENSE).

By contributing:
- ✅ You grant BANCS permission to use and modify your examples
- ✅ You retain copyright to your original work
- ✅ Your examples become freely available to everyone under MIT

## ❓ Questions?

- Read [CONTRIBUTING.md](../../CONTRIBUTING.md)
- Check [VitePress Plugins README](../.vitepress/plugins/README.md)
- Open an issue on GitHub

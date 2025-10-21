# VitePress Plugins

Custom VitePress plugins for the BANCS website.

## Code Snippets Plugin

Imports code snippets directly from repository files, ensuring examples stay in sync with actual code.

### Basic Usage

In your markdown files, use the `<<< @/` syntax to import code:

```markdown
<<< @/docs/examples/my-example/demo.ts
```

This will:
1. Read the file from the repository
2. Detect the language from file extension
3. Create a syntax-highlighted code block

### Import Specific Lines

Import only certain line ranges:

```markdown
<<< @/docs/examples/my-example/demo.ts{5-10}
```

This imports only lines 5-10 from the file.

Multiple ranges:

```markdown
<<< @/docs/examples/my-example/demo.ts{1-5,10-15,20}
```

### Import Named Regions

Use region markers in your source files:

```typescript
// docs/examples/my-example/demo.ts

// #region authentication
export function login(user: string, password: string) {
  // Login implementation
}
// #endregion

// Other code...
```

Then import just that region:

```markdown
<<< @/docs/examples/my-example/demo.ts#authentication
```

### Supported Languages

Auto-detects language from file extension:

- `.ts`, `.tsx` → TypeScript
- `.js`, `.jsx` → JavaScript
- `.vue` → Vue
- `.py` → Python
- `.rs` → Rust
- `.go` → Go
- `.java` → Java
- `.rb` → Ruby
- `.php` → PHP
- `.sh`, `.bash`, `.zsh` → Bash
- `.yaml`, `.yml` → YAML
- `.json` → JSON
- `.css`, `.scss` → CSS/SCSS
- `.html` → HTML
- `.sql` → SQL

### Benefits

1. **Single Source of Truth**: Code examples come from actual working files
2. **Always Up-to-Date**: Changes to code automatically reflect in blog posts
3. **Testable**: Code examples can be tested and run
4. **No Duplication**: Don't copy/paste code into markdown
5. **Maintainable**: Update code once, blog posts update automatically

### Example Blog Post Structure

```
docs/
├── blog/
│   └── my-tutorial.md           # Blog post
└── examples/
    └── my-tutorial/
        ├── README.md             # Example documentation
        ├── package.json          # Dependencies
        ├── demo.ts               # Working code
        └── advanced.ts           # Advanced examples
```

In `my-tutorial.md`:

```markdown
# My Tutorial

Here's a basic example:

<<< @/docs/examples/my-tutorial/demo.ts

And here's the advanced version:

<<< @/docs/examples/my-tutorial/advanced.ts{10-25}
```

### Region Markers

Both comment styles work:

```typescript
// TypeScript/JavaScript
// #region myRegion
// code here
// #endregion
```

```typescript
// Alternative syntax
#region myRegion
// code here
#endregion
```

### File Paths

All paths are relative to the project root:

- `@/docs/examples/...` - Examples directory
- `@/docs/.vitepress/...` - VitePress config
- `@/scripts/...` - Build scripts
- `@/package.json` - Package file

### Error Handling

If a file can't be loaded:
- Warning logged to console
- Original `<<<` syntax left in markdown
- Build continues (non-blocking)

### Testing Your Imports

Before committing, verify imports work:

```bash
npm run dev
```

Visit your blog post and check:
- ✅ Code blocks render correctly
- ✅ Syntax highlighting works
- ✅ Line numbers are correct (if using ranges)
- ✅ No error messages in console

## Adding More Plugins

To add a new plugin:

1. Create `yourPlugin.ts` in this directory
2. Export a Vite plugin function
3. Import and add to `config.ts`:

```typescript
import { yourPlugin } from './plugins/yourPlugin'

export default defineConfig({
  vite: {
    plugins: [
      codeSnippetsPlugin({ root: __root }),
      yourPlugin()
    ]
  }
})
```

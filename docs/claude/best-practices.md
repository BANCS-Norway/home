# Best Practices

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

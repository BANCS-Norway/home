# Working with Claude - Code Examples

This directory contains all code examples referenced in the blog post "Working with Claude: An AI Pair Programming Experience".

## Files

### Configuration Examples
- **vitepress-config.ts** - Complete VitePress configuration with TypeScript
- **theme-config.ts** - Custom theme setup with BANCS color palette
- **custom.css** - Tailwind CSS integration (see `/docs/.vitepress/theme/custom.css`)

### Utilities
- **blog-parser.ts** - TypeScript utility for parsing blog post markdown

## Running the Examples

### Prerequisites
```bash
npm install -D vitepress vue typescript @types/node
```

### VitePress Configuration
The `vitepress-config.ts` file can be used as `.vitepress/config.ts`:

```bash
cp vitepress-config.ts ../docs/.vitepress/config.ts
```

### Blog Parser
Run the blog parser example:

```bash
npx tsx blog-parser.ts
```

Expected output:
```
Parsed post: {
  title: 'My First Blog Post',
  date: '2024-10-21',
  author: 'Benny',
  content: '# Introduction\n\nThis is my first blog post...',
  tags: ['TypeScript', 'Tutorial'],
  readingTime: 1
}
```

### Theme Configuration
The theme configuration demonstrates:
- Custom color palette integration
- Global component registration
- Router hooks
- CSS variable generation

## Key Concepts

### Type Safety
All examples use TypeScript for type safety:
- Interfaces for data structures
- Type inference
- Generic types

### Best Practices
- **Validation**: Always validate user input
- **Error Handling**: Use try-catch and throw meaningful errors
- **Documentation**: Clear JSDoc comments
- **Modularity**: Small, focused functions

### Code Quality
- ESLint compatible
- Follows TypeScript strict mode
- Consistent naming conventions
- Comprehensive comments

## Integration

These examples are designed to work with:
- VitePress v1.x
- TypeScript 5.x
- Node.js 22+ (LTS)
- Tailwind CSS 4.x

## Contributing

Found an issue or have an improvement? Submit a PR to the [main repository](https://github.com/BANCS-Norway/home).

## License

MIT - See LICENSE file in the root directory.

---

**Related Blog Post**: [Working with Claude: An AI Pair Programming Experience](/blog/working-with-claude)

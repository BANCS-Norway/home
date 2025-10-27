# Create New Blog Post

This command helps you create a new blog post following the project's blog workflow.

## Steps to Execute

1. **Ask for Blog Post Details**
   - Ask user for:
     - Post title (e.g., "Understanding TypeScript Generics")
     - Brief description (1-2 sentences)
     - Topics/tags (comma-separated, e.g., "TypeScript, Generics, Advanced Patterns")
     - Author name
     - Author website/profile URL (optional)

2. **Generate URL-Safe Slug**
   - Convert title to lowercase
   - Replace spaces with hyphens
   - Remove special characters
   - Example: "Understanding TypeScript Generics" → "understanding-typescript-generics"

3. **Create Blog Post File**
   - Create: `docs/blog/{slug}.md`
   - Use the template from CONTRIBUTING.md
   - Fill in title, author, topics
   - Add current date
   - Include placeholder sections (Introduction, Main Content, Conclusion)

4. **Create Examples Directory**
   - Create: `docs/examples/{slug}/`
   - Add `README.md` with instructions
   - Add placeholder example file: `demo.ts`
   - Include MIT license header in code files

5. **Update Blog Index**
   - **CRITICAL**: Add new post to the TOP of `docs/blog/index.md`
   - Use BlogCard format
   - Include title, date, description, topics
   - Ensure reverse chronological order (newest first)

6. **Remind User of Next Steps**
   - Tell user: "Blog post scaffolding created! Next steps:"
     1. Fill in the content in `docs/blog/{slug}.md`
     2. Add working code examples to `docs/examples/{slug}/`
     3. Test locally with `npm run dev`
     4. Run validation with `npm run validate`
     5. Create commit using `feat(blog): add post about {topic}`

## Example BlogCard Format

```markdown
<BlogCard>

### [Your Post Title](/blog/your-slug)
**Date**: YYYY-MM-DD

Brief description of your post (1-2 sentences).

**Topics**: Topic1, Topic2, Topic3

[Read more →](/blog/your-slug)

</BlogCard>
```

## Important Reminders

- ✅ Always update the blog index at `docs/blog/index.md`
- ✅ Add post to the TOP (newest first)
- ✅ Use BlogCard component format
- ✅ Create examples directory with working code
- ✅ Follow semantic versioning: `feat(blog):` for new posts
- ✅ Test locally before committing
- ✅ Run `npm run validate` to check styling compliance

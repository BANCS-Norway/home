# Issue #97: Dynamic Blog Post Loading - Implementation Complete

**Status:** ✅ Implemented
**Date:** November 3, 2025
**Issue:** [#97 - Explore dynamic blog post loading alternatives](https://github.com/BANCS-Norway/home/issues/97)

## Executive Summary

✅ **Implemented: VitePress Data Loaders with createContentLoader**

Successfully implemented dynamic blog post loading using VitePress Data Loaders. The solution:
- **Native to VitePress** - No external dependencies
- **Build-time generation** - SEO-friendly and performant
- **Type-safe** - Full TypeScript support
- **Zero maintenance** - Automatically discovers new posts
- **Date-based filtering** - Progressive disclosure for future-dated posts

## Current Problem

The blog index (`docs/blog/index.md`) requires manual updates for each new post:
- Manual copying of metadata from frontmatter to BlogCard components
- Risk of inconsistency between post metadata and index display
- Human error potential (forgetting to update, typos, wrong dates)
- 8 current posts, will grow over time

## Solution Overview

### Architecture

```
docs/blog/*.md (posts)
       ↓
posts.data.ts (Data Loader)
   - Scans blog directory
   - Extracts frontmatter
   - Filters by date
   - Sorts chronologically
       ↓
BlogIndex.vue (Component)
   - Imports data
   - Renders BlogCards
   - Zero manual maintenance
```

### Key Components

1. **Data Loader** (`docs/.vitepress/theme/posts.data.ts`)
   - Uses `createContentLoader('blog/*.md')`
   - Extracts: title, date, description, tags, excerpt
   - Implements date-based filtering
   - Sorts by date (newest first)
   - Runs at build time only

2. **BlogIndex Component** (`docs/.vitepress/theme/components/BlogIndex.vue`)
   - Imports data from posts.data.ts
   - Filters to only published posts
   - Renders using existing BlogCard component
   - Fully styled and themed

3. **Theme Registration** (`docs/.vitepress/theme/index.ts`)
   - Registered BlogIndex as global component
   - Available in any markdown file via `<BlogIndex />`

## Implementation Details

### Date-Based Progressive Disclosure

**Requirement** (from blog-format.md:239):
> Posts with future dates should be hidden from the blog index but accessible via direct link.

**Solution:**
```typescript
function isPublished(dateString: string): boolean {
  const postDate = new Date(dateString)
  const today = new Date()
  postDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return postDate <= today
}
```

**Test Results:**
- Total posts: 7
- Published (date <= today): 4
- Hidden (future dates): 3
- Chronicles posts (Nov 4, 11, 25) correctly hidden ✅

### Data Transformation

```typescript
export default createContentLoader('blog/*.md', {
  excerpt: true,  // Extract excerpt from content
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        excerpt,
        isPublished: isPublished(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})
```

### Build Performance

- ✅ Build succeeds with no TypeScript errors
- ✅ Build time: ~6 seconds (no noticeable increase)
- ✅ Type-safe with full IntelliSense support
- ✅ Hot-reload works during development

## Comparison of Approaches

### 1. VitePress Data Loaders ⭐ RECOMMENDED

**Pros:**
- ✅ Native VitePress feature
- ✅ Build-time generation (SEO-friendly)
- ✅ Type-safe with TypeScript
- ✅ Hot-reload support during development
- ✅ No runtime overhead
- ✅ No external dependencies
- ✅ Official documentation and examples
- ✅ Used by Vue.js blog (proven solution)

**Cons:**
- ⚠️ Requires learning data loaders API (minimal learning curve)

**Verdict:** Best solution for our needs.

### 2. Custom Build Script

**Pros:**
- ✅ Simple and explicit
- ✅ Easy to understand

**Cons:**
- ❌ Extra build step to maintain
- ❌ Generated file in git (or needs gitignore)
- ❌ No hot-reload during development
- ❌ More complex CI/CD integration
- ❌ Not the "VitePress way"

**Verdict:** Unnecessary complexity compared to Data Loaders.

### 3. Dynamic Vue Component (import.meta.glob)

**Pros:**
- ✅ Most flexible
- ✅ Runtime capabilities

**Cons:**
- ❌ More complex implementation
- ❌ Runtime performance overhead
- ❌ Potential SSR issues
- ❌ Harder to optimize for SEO
- ❌ All blog metadata loaded to client

**Verdict:** Over-engineered for static blog content.

### 4. Hybrid Approach

**Analysis:** Not necessary. VitePress Data Loaders already provide the best of both worlds (build-time generation + flexibility).

## Implementation Files

Created files:
- ✅ `docs/.vitepress/theme/posts.data.ts` - Data loader with date filtering
- ✅ `docs/.vitepress/theme/components/BlogIndex.vue` - Dynamic blog index component

Modified files:
- ✅ `docs/.vitepress/theme/index.ts` - Component registration
- ✅ `docs/blog/index.md` - Replaced manual BlogCards with `<BlogIndex />`
- ✅ `docs/blog/from-problem-solver-to-systems-builder.md` - Fixed date (2024→2025)

## Usage Example

### For Blog Index Page

Replace manual `<BlogCard>` entries with:

```markdown
# Blog

Welcome to the BANCS blog...

## Recent Posts

<BlogIndex />
```

### For Future Enhancements

The data loader can be extended to support:
- Tag-based filtering
- Pagination
- Search functionality
- RSS feed generation
- Related posts suggestions

Example:
```vue
<script setup>
import { data as posts } from '../posts.data'

// Filter by tag
const aiPosts = posts.filter(post =>
  post.tags.includes('AI Development')
)
</script>
```

## Testing

✅ **Build Test:** `npm run build` - Success (6.00s)
✅ **Type Safety:** Full TypeScript support, no errors
✅ **Date Filtering:** Verified with test script
✅ **Demo Page:** `docs/blog/index-dynamic-demo.md`

## Implementation Notes

### Key Fixes Applied

**1. NaN Sort Bug Fix**
- **Problem:** Index pages without dates created `NaN` timestamps that broke sort stability
- **Solution:** Filter posts by `frontmatter.date` existence before sorting
- **Code:** `.filter(({ frontmatter }) => frontmatter.date)`

**2. Tailwind-Only Styling**
- **Problem:** Initial implementation used custom scoped CSS
- **Solution:** Refactored to use Tailwind utility classes
- **Benefits:** Consistent with project styling approach

**3. Date Formatting**
- Posts sorted by frontmatter date (newest first)
- Date filtering for progressive disclosure
- Timezone handling with UTC noon to avoid edge cases

### Future Enhancements

Tracked in [Issue #166](https://github.com/BANCS-Norway/home/issues/166):
- Tag-based filtering
- Pagination
- Search functionality
- RSS feed generation

## Impact on Existing Workflows

### `/new-blog-post` Slash Command
**Current:** Creates post + updates index
**Future:** Creates post only (index updates automatically)

**Required Changes:**
- Remove index.md update logic
- Simplify workflow
- Less error-prone

### Developer Experience
- ✅ **Simpler:** Just create markdown file
- ✅ **Faster:** No manual index editing
- ✅ **Safer:** No risk of forgetting to update index
- ✅ **Consistent:** Metadata always matches

## Results

**Implementation completed successfully:**

1. ✅ **Proven technology** - Used by Vue.js blog
2. ✅ **Native solution** - No dependencies
3. ✅ **Type-safe** - Full TypeScript support
4. ✅ **Performant** - Build-time generation (6-7s)
5. ✅ **Maintainable** - Clean, simple code (< 100 lines)
6. ✅ **Extensible** - Ready for tags/pagination (#166)

**Developer Experience:**

- **Before:** Create post + manually update index
- **After:** Create post with frontmatter → automatically appears in index
- **Benefit:** Eliminates manual maintenance and inconsistency risk

## References

- [VitePress Data Loading](https://vitepress.dev/guide/data-loading)
- [Vue.js Blog Implementation](https://github.com/vuejs/blog/blob/main/.vitepress/theme/posts.data.ts)
- [Issue #97](https://github.com/BANCS-Norway/home/issues/97)
- [Blog Format Documentation](docs-internal/blog/blog-format.md)

---

**Implementation Status:** ✅ Complete
**Build Status:** ✅ Passing
**Tests:** ✅ Verified
**Follow-up:** [Issue #166](https://github.com/BANCS-Norway/home/issues/166) for enhancements

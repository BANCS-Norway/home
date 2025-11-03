# Blog Post Format Guide

This guide explains the structure and requirements for creating blog posts in the BANCS blog.

## File Structure

```
docs/blog/
├── index.md              # Blog index (manually maintained for now)
├── post-title.md         # Individual blog post
└── ...

docs/public/images/
├── blog/                 # Blog-specific images
│   └── chronicles/       # Series-specific subfolder
└── hero-image.jpg        # General hero images (root level)
```

## Frontmatter Schema

All blog posts use a standardized frontmatter schema. The `<BlogHeading />` component reads this data automatically.

### Required Fields

```yaml
---
title: string           # Post title (supports smart breaking at `:` or `-`)
description: string     # Post summary for meta tags and blog index
date: YYYY-MM-DD       # Publication date (controls visibility and blur)
---
```

### Optional Fields

```yaml
---
subtitle: string        # Explicit subtitle (overrides title splitting)
author: string          # Author name (defaults to "Benny (Bancs AS)")
readingTime: number     # Minutes to read (auto-calculated if omitted)
tags: string[]          # Topic tags for categorization
hero:                   # Hero image configuration
  image: string         # Path to image (e.g., /images/blog/my-post.jpg)
  alt: string           # Alt text for accessibility
  attribution:          # Photo credit (optional)
    author: string      # Photographer name
    authorUrl: string   # Photographer profile URL
    source: string      # Source name (e.g., "Pexels", "Unsplash")
    sourceUrl: string   # Source website URL
    license: string     # License type (e.g., "CC BY-SA 4.0")
    licenseUrl: string  # License URL
    modifications: string # Any modifications made (e.g., "grayscale adjustment")
---
```

## Blog Post Template

```markdown
---
title: Your Blog Post Title
subtitle: Optional explicit subtitle
description: A compelling summary of your post for SEO and blog index
date: 2025-11-04
readingTime: 8
tags: [topic1, topic2, topic3]
hero:
  image: /images/blog/your-hero-image.jpg
  alt: Descriptive alt text for the hero image
  attribution:
    author: Photographer Name
    authorUrl: https://example.com/photographer
    source: Pexels
    sourceUrl: https://www.pexels.com/
---

<BlogHeading />

<DisclaimerBox type="claude" />

## Introduction

Your content starts here...
```

## Claude Disclaimer and Attribution

### 1. DisclaimerBox (Beginning of Post)

**Purpose:** Transparency that content about Claude might appear promotional, even though it reflects genuine experience.

**Placement:** Immediately after `<BlogHeading />` and before the first content section.

```markdown
<DisclaimerBox type="claude" />
```

**When to include:**
- ✅ Posts about working with Claude/AI development
- ✅ Posts discussing Claude Code features or workflow
- ✅ Content that could be perceived as promotional
- ❌ Posts where Claude is only mentioned in passing
- ❌ Guest posts not about Claude

### 2. Ending Attribution (End of Post)

**Purpose:** Credit Claude for writing assistance, as per our transparency commitment.

**Placement:** At the very end of the post, after all content and before any footer components.

```markdown
---

*This post was written with assistance from [Claude](https://claude.ai) by Anthropic.*
```

**When to include:**
- ✅ All posts drafted with Claude Code assistance
- ✅ Posts where Claude contributed significant content or structure
- ✅ Posts co-authored with Claude
- ❌ Posts with only minor Claude edits (grammar, formatting)
- ❌ Guest posts not using Claude

### Combined Example

```markdown
<BlogHeading />

<DisclaimerBox type="claude" />

## Introduction

Your content here...

## Conclusion

Final thoughts...

---

*This post was written with assistance from [Claude](https://claude.ai) by Anthropic.*
```

## Hero Image Requirements

### Image Specifications

**Required Formats:** 4 image variants for responsive display
- `image.jpg` - Base JPEG (1x resolution)
- `image@2x.jpg` - Retina JPEG (2x resolution)
- `image.webp` - Base WebP (1x resolution)
- `image@2x.webp` - Retina WebP (2x resolution)

**Naming Convention:**
```
/images/blog/your-post-name.jpg
/images/blog/your-post-name@2x.jpg
/images/blog/your-post-name.webp
/images/blog/your-post-name@2x.webp
```

**Image Style:**
- **Monochrome/grayscale preferred** for visual consistency
- High contrast for readability
- Avoid busy or distracting backgrounds
- Ensure images work in both light and dark themes

**Dimensions:**
- 1x: Typically 1200px wide (adjust based on aspect ratio)
- 2x: 2400px wide (retina display support)
- Aspect ratio: 16:9 or similar (avoid extreme ratios)

### Creating Hero Images

1. **Source Image**
   - Use high-quality images from Pexels, Unsplash, or similar
   - Ensure proper licensing (include attribution in frontmatter)
   - Choose images that conceptually relate to post content

2. **Convert to Monochrome**
   ```bash
   # Example using ImageMagick
   convert original.jpg -colorspace Gray monochrome.jpg
   ```

3. **Generate Variants**
   ```bash
   # Base image (1x)
   convert monochrome.jpg -resize 1200x675 image.jpg

   # Retina image (2x)
   convert monochrome.jpg -resize 2400x1350 image@2x.jpg

   # WebP variants
   convert image.jpg image.webp
   convert image@2x.jpg image@2x.webp
   ```

4. **Optimize File Size**
   - JPEG quality: 85-90%
   - WebP quality: 80-85%
   - Keep file sizes under 500KB for 1x, 1MB for 2x

## Title Smart Breaking

The `<BlogHeading />` component automatically breaks titles at specific characters for responsive display.

**Breaking Rules:**
1. **Colon (`:`)** - Most common pattern
   ```yaml
   title: Why Claude Code is a Stalactite: And Why That Matters
   # Breaks to:
   # Desktop: "Why Claude Code is a Stalactite: And Why That Matters"
   # Mobile:   "Why Claude Code is a Stalactite"
   #           "And Why That Matters"
   ```

2. **Hyphen with spaces (` - `)** - Alternative pattern
   ```yaml
   title: Working with Claude - An AI Pair Programming Experience
   # Breaks to:
   # Desktop: "Working with Claude - An AI Pair Programming Experience"
   # Mobile:   "Working with Claude"
   #           "An AI Pair Programming Experience"
   ```

3. **Explicit Subtitle** - Override automatic breaking
   ```yaml
   title: The Collective
   subtitle: When One Claude Becomes Many
   # Full control over title and subtitle display
   ```

## Date-Based Progressive Disclosure

The `date` field controls both visibility and content blur:

**Before Publication Date:**
- ✅ Post accessible via direct link (bookmarkable)
- ✅ Hero image automatically blurred
- ❌ Hidden from blog index (requires manual implementation in #97)

**On/After Publication Date:**
- ✅ Post accessible via direct link
- ✅ Hero image fully visible (no blur)
- ✅ Should appear in blog index (requires dynamic loading in #97)

**Example:**
```yaml
# Today is November 3, 2025
date: 2025-11-04  # Tomorrow

# Result:
# - Direct link works: /blog/my-post ✅
# - Hero image is blurred ✅
# - Not in blog index ❌ (currently manual)
```

**Chronicles Use Case:**
The Claude Code Chronicles posts (Nov 4, 11, 25) use future dates for progressive reveal. They're bookmarkable now, but hero images blur until their publication dates.

## Reading Time

**Auto-calculated** if not specified:
- Algorithm: Word count ÷ 200 words/minute
- Rounds up to nearest minute
- Excludes code blocks and frontmatter

**Manual Override:**
```yaml
readingTime: 10  # Specify exact minutes if auto-calc is inaccurate
```

## Author Field

**Default:** "Benny (Bancs AS)" if not specified

**Override:**
```yaml
author: The Claude Code Conductor  # For special series or personas
```

## Attribution Guidelines

Always provide proper attribution for images:

**Required Fields:**
- `author` - Photographer/creator name
- `source` - Platform name (Pexels, Unsplash, etc.)

**Optional but Recommended:**
- `authorUrl` - Link to photographer's profile
- `sourceUrl` - Link to image source page
- `license` - License type (CC BY-SA 4.0, etc.)
- `licenseUrl` - Link to license details
- `modifications` - Note any edits (grayscale, crop, etc.)

## Series Posts

For multi-part series (like Chronicles):

1. **Consistent Naming:**
   ```
   series-name-part-1.md
   series-name-part-2.md
   ```

2. **Shared Image Folder:**
   ```
   /images/blog/series-name/
   ```

3. **Consistent Metadata:**
   ```yaml
   tags: [series-name, topic1, topic2]
   ```

4. **Staggered Dates:**
   ```yaml
   # Part 1
   date: 2025-11-04

   # Part 2
   date: 2025-11-11
   ```

## Future Enhancements

The following features are planned but not yet implemented:

- **Dynamic Blog Index (#97)** - Auto-generate index from frontmatter
- **Tag Filtering** - Browse posts by topic tags
- **Search Functionality** - Full-text search across posts
- **RSS Feed** - Subscribe to new posts
- **Related Posts** - Suggest similar content

## Related Issues

- #153 - BlogHeading frontmatter integration (✅ completed)
- #97 - Dynamic blog post loading
- #149 - HeroImage responsive images (✅ completed)
- #145 - ImageAttribution component (✅ completed)

## Questions?

For questions or suggestions about blog format:
- Open an issue on GitHub
- Reference this document in discussions
- Propose changes via PR

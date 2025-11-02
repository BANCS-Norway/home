# Chronicles Reveal System - Quick Reference

**Status:** ✅ Implemented (Issue #102)
**Tech Stack:** VitePress + Tailwind CSS + Vue 3

---

## Components

- **PostPreview** - Container with blur/reveal states
- **RevealStamp** - 4 style variants (default, banner, minimal, vintage)
- **SeriesNav** - Previous/next navigation
- **HeroImage** - Hero images with blur effect

---

## Usage Examples

### Blurred Post (Before Publication)

```vue
<PostPreview blurred>
  <template #stamp>
    <RevealStamp date="Monday, November 4th" />
  </template>

  Your content here...
</PostPreview>
```

### Revealed Post (On Publication Day)

```vue
<PostPreview revealed>
  Your content here...
</PostPreview>
```

**To reveal:** Change `blurred` to `revealed` and remove the stamp template.

---

## Stamp Variants

```vue
<!-- Default (red official stamp) -->
<RevealStamp date="November 4th" />

<!-- Banner (red diagonal) -->
<RevealStamp date="November 4th" variant="banner" />

<!-- Minimal (clean black) -->
<RevealStamp date="November 4th" variant="minimal" />

<!-- Vintage (brown paper) -->
<RevealStamp date="November 4th" variant="vintage" />
```

---

## Demo

Visit `/reveal-demo` to see all variants in action.

---

## Related Issues

- Master: #111 (The Claude Code Chronicles - Chapter 1)
- This: #102 (Phase 1: Setup & Infrastructure)
- Next: #103 (Phase 2: Landing Page)

---
name: Bancs Home
colors:
  primary: "#4338ca"
  primary-light: "#4f46e5"
  primary-lighter: "#6366f1"
  primary-dark: "#3730a3"
  primary-darker: "#312e81"

  bg: "#ffffff"
  bg-alt: "#f8fafc"
  bg-elv: "#ffffff"

  text-1: "#0f172a"
  text-2: "#475569"
  text-3: "#64748b"

  bg-dark: "#0f172a"
  bg-alt-dark: "#1e293b"
  bg-elv-dark: "#1e1b4b"

  text-1-dark: "#e2e8f0"
  text-2-dark: "#cbd5e1"
  text-3-dark: "#94a3b8"

  danger: "#b91c1c"
  success: "#047857"
  warning: "#b45309"
  info: "#1d4ed8"

typography:
  mono:
    fontFamily: JetBrains Mono

rounded:
  sm: 0.5rem
  md: 0.75rem
  lg: 1rem

spacing:
  sm: 1rem
  md: 1.5rem
  lg: 2rem
---

## Overview

The Bancs Home site is a personal blog and engineering log built on VitePress. The visual identity is **deep-indigo on cool slate** — technical, calm, AA-compliant by default, dark-mode first-class. We override the VitePress indigo defaults (which fail WCAG AA on secondary buttons) and otherwise inherit VitePress typography and layout primitives.

This file is the contract. Any agent or human writing UI for this repo should:

1. Reach for the tokens defined here before introducing literal hex values.
2. Read the rationale below before deviating.
3. File a change to this document if the rationale no longer holds.

## Colors

### Primary (brand indigo)

The five-step indigo scale is the backbone of every interactive element. **`primary` is the default**; `primary-dark` and `primary-darker` are reserved for hover/active states and high-contrast contexts (focus rings, active tabs). `primary-light` and `primary-lighter` are decorative — gradient stops, hero accents, illustrations.

- Why indigo? It reads as technical without being cold. It pairs with the slate text scale without competing.
- Why not VitePress defaults? Their `#646cff` fails WCAG AA on white at body text size. Our scale starts darker.

### Surfaces

`bg` is the default page background. `bg-alt` is the elevated-but-passive surface — sidebars, nav backgrounds, code blocks. `bg-elv` is for true elevation (modals, popovers); in dark mode it shifts to `#1e1b4b` (a touch of indigo) to differentiate from `bg-alt-dark`.

### Text

Three steps: primary (`text-1`) for body and headings, secondary (`text-2`) for captions and metadata, tertiary (`text-3`) for muted/placeholder. Never invent a fourth — if you need lower contrast than `text-3`, you're hiding information that shouldn't be there.

### Semantic

`danger`, `success`, `warning`, `info` are reserved for **status communication only** — never decorative. The values are tuned to hit AA on both `bg` and `bg-dark` at body text size; the previous reveal.js values (`#d63031`, `#00b894`, `#e17055`, `#0984e3`) were "presentation-screen punchy" but failed contrast on light backgrounds at small sizes.

## Typography

We inherit VitePress's type scale — taking ownership of `h1` / `body` etc. invites maintenance we don't want. The only override is **JetBrains Mono** for code blocks and inline code. Reasons: ligatures matter for code samples, the figure proportions read better at small sizes, and it's distinctive enough that readers know they're looking at runnable text.

## Components and conventions

- **Sticky nav offset:** all `vp-doc` headings (h1–h4) carry `scroll-margin-top: var(--vp-nav-height)`. Async-rendered content that introduces new anchored sections must re-trigger the hash scroll (see issues #318, #320).
- **Hero images:** see `HeroImage.vue`. Always provide 1x + 2x WebP and JPEG variants under `docs/public/images/blog/{series}/`. Attribution lives in the post frontmatter, not the image.
- **Container width:** `.container-custom` caps at `72rem` with responsive horizontal padding — `spacing.sm` / `spacing.md` / `spacing.lg` at the sm / md / lg breakpoints. Don't introduce new max-width values; use this class. The spacing scale is currently container-only; expand it here before reaching for new values elsewhere.
- **Code-block radius:** `rounded.sm` (0.5rem). **Example-section radius:** `rounded.md` (0.75rem) with a 4px left border in `primary`.
- **Logo hover:** scales 1.1× over 300ms — keep it; it's a small piece of personality.

## WCAG target

**AA mandatory, AAA aspirational.**

- Body text and interactive UI must meet AA (4.5:1 small text, 3:1 large text). Non-negotiable.
- Body text and code prose target AAA (7:1) where it doesn't compromise the palette.
- Large headings, badges, and decorative elements need only AA Large (3:1).

W3C themselves do not recommend AAA as a site-wide policy because it's not satisfiable for all content. We follow that guidance.

## Anti-patterns

- **Don't introduce literal hex values** in component CSS. If a color isn't in this file, propose adding it here first.
- **Don't use semantic colors decoratively.** `danger` red is for actual danger (errors, destructive actions). Not "I need a red here for vibes."
- **Don't override the primary scale per-component.** If `primary-light` looks wrong somewhere, the design is asking a question — answer it here, not in a one-off rule.
- **Don't add a fourth text step.** If you need lower contrast than `text-3`, the content is wrong, not the palette.
- **Don't ship typography overrides** without updating this file. VitePress defaults are our defaults; deltas are visible only here.

## Validation

```bash
npx @google/design.md lint DESIGN.md
```

This runs in CI on every PR that touches `DESIGN.md` or `docs/.vitepress/theme/custom.css`.

The upstream tool currently validates structural correctness (schema + hex format). Broken token references and WCAG contrast checks are aspirational features tracked upstream — until they ship, those checks are a human review responsibility. Tailwind v4 export is also pending upstream ([issue #19](https://github.com/google-labs-code/design.md/issues/19)); when it lands we can wire automatic token sync into `custom.css`.

# Claude Code Chronicles - Image Assets

This directory contains all visual assets for The Claude Code Chronicles blog series.

## Hero Images

All hero images have been optimized and converted to monochrome for visual consistency.

### Landing Page: Progressive Reveal
- **Files**: `landing-hero-reveal.jpg` (69KB), `landing-hero-reveal@2x.jpg` (225KB)
- **WebP**: `landing-hero-reveal.webp` (21KB), `landing-hero-reveal@2x.webp` (78KB)
- **Dimensions**: 1920x1080 (1x), 3840x2160 (2x)
- **Alt Text**: "Progressive reveal - symbolizing the staggered content disclosure of the Chronicles series"
- **Attribution**: Not specified (likely original or free-to-use)
- **Status**: ✅ Optimized, grayscale

### Part 2: Systematic Workflow (Sunflower Spiral)
- **Files**: `pexels-sunflower-10492046.jpg` (401KB), `pexels-sunflower-10492046@2x.jpg` (1.1MB)
- **WebP**: `pexels-sunflower-10492046.webp` (303KB), `pexels-sunflower-10492046@2x.webp` (710KB)
- **Dimensions**: 1920x1080 (1x), 3840x2160 (2x) - 16:9 aspect ratio
- **Alt Text**: "Sunflower seed pattern showing natural spiral workflow and systematic growth"
- **Source**: Pexels (Scott Schumacher)
- **Status**: ✅ Optimized, converted to grayscale

### Part 1: Stalactite Growth
- **Files**: `pexels-paulseling-12275644.jpg` (341KB), `pexels-paulseling-12275644@2x.jpg` (2.0MB)
- **WebP**: `pexels-paulseling-12275644.webp` (217KB), `pexels-paulseling-12275644@2x.webp` (2.0MB)
- **Original Size**: 2.6MB → Optimized to 341KB (87% reduction)
- **Dimensions**: 1920x1278 (1x), 3840x2556 (2x)
- **Alt Text**: "Crystal formations representing persistent knowledge accumulation"
- **Source**: Pexels (Paul Seling)
- **Status**: ✅ Optimized, converted to grayscale

### Part 3: The Collective
- **Files**: `the-borg-collective.jpg` (288KB), `the-borg-collective@2x.jpg` (702KB)
- **WebP**: `the-borg-collective.webp` (239KB), `the-borg-collective@2x.webp` (449KB)
- **Original Size**: 573KB → Optimized to 288KB (50% reduction)
- **Dimensions**: 1920x768 (1x), 3840x1536 (2x)
- **Alt Text**: "The Borg Collective - distributed AI consciousness"
- **Attribution**: Basile Morin, CC BY-SA 4.0
- **Status**: ✅ Optimized, converted to grayscale

### Part 4: Workflow Diagram
- **File**: `claude-code-cycle-diagram.svg` (6.9KB)
- **Alt Text**: "Circular workflow diagram showing the 6-step development cycle"
- **Status**: ✅ Vector format (SVG), no optimization needed

## Other Assets

### Two-Terminal Screenshot
- **File**: `1761653748400_image.jpg` (94KB)
- **Status**: ✅ Already optimized
- **Usage**: To be determined (possibly inline content)

### Alternative Hero Images
- **File**: `pexels-daria-nekipelova-112078039-9665491.jpg` (545KB)
- **Status**: ⚠️ Not currently used, needs optimization if used

## Optimization Summary

### Image Processing Applied
1. **Grayscale Conversion**: All hero images converted to monochrome for visual consistency
2. **Responsive Variants**: Created @2x versions for high-DPI displays
3. **WebP Format**: Generated WebP versions for ~40-70% better compression
4. **Quality**: JPEG quality set to 85 (optimal balance)
5. **Size Optimization**: Resized to 1920px width (1x) and 3840px width (2x)
6. **Metadata Stripping**: Removed EXIF data to reduce file size

### HeroImage Component
The VitePress HeroImage component automatically serves responsive images:
- Provides appropriate size based on viewport
- Prefers WebP when browser supports it
- Falls back to JPEG for older browsers
- Implements lazy loading for performance

## Accessibility

All hero images include:
- ✅ Descriptive alt text in frontmatter
- ✅ Proper attribution where required
- ✅ License information (CC BY-SA 4.0 where applicable)

## File Naming Convention

- Base images: `image-name.jpg`
- 2x variants: `image-name@2x.jpg`
- WebP versions: `image-name.webp` and `image-name@2x.webp`
- Use kebab-case for multi-word filenames

## Future Screenshots (Issue #107)

Still needed:
- [ ] Screenshot of Issue #96 structure
- [ ] Screenshot of Issue #100 (self-correction)
- [ ] Screenshot of Issue #31 roadmap
- [ ] Commit message before/after cleanup example

These will be added as content development progresses.

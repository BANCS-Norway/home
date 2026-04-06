/**
 * BANCS Brand Carousel — Portrait (4:5)
 *
 * Pure data. Layout values are pre-computed from constants below.
 * Assembly is handled by scripts/carousel/builder.ts.
 */

import type { CarouselTemplate, FontDef } from '../types.js';

const W   = 285.75;   // mm  (1080px @ 96dpi)
const H   = 357.19;   // mm  (1350px @ 96dpi)
const PAD = 21;       // mm  (80px safe zone)

const C = {
  bg:      '#0f172a',
  accent:  '#38bdf8',
  heading: '#f1f5f9',
  body:    '#a8b8cb',
  muted:   '#94a3b8',
};

// Image — 5% smaller than inner width, centred
const IMG_W     = Math.round((W - PAD * 2) * 0.95 * 10) / 10;   // 231.6mm
const IMG_H     = Math.round(IMG_W * (510 / 1200) * 10) / 10;   // 98.4mm
const IMG_X     = PAD + Math.round(((W - PAD * 2) - IMG_W) / 2 * 10) / 10;
const IMG_Y     = 50;
const TITLE_H   = 55;
const TITLE_GAP = 4;

const IW = W - PAD * 2;   // 243.75mm

const TAG_X = W - PAD - 40;
const TAG_Y = H - PAD - 14;

const fonts: FontDef[] = [
  { name: 'Inter',      fallback: true  },
  { name: 'Inter-Bold', fallback: false },
];
const [F, F_BOLD] = fonts.map(f => f.name) as [string, string];

const def: CarouselTemplate = {
  name: 'brand-portrait',

  description: `BANCS brand carousel — portrait (4:5, 1080×1350px). RESERVED — do not use until LinkedIn native document post support is confirmed.
Style: dark navy background, sky-blue accents, high-contrast heading/body.
Structure: hero image + caption on head slide, N content slides, CTA tail with URL hotspot.
Intended for LinkedIn-only document (swipeable PDF) posts where portrait takes up more feed space on mobile.
Word budgets — head caption: ~40 words. Page body: ~70 words per section (13 lines at 24pt). Titles: 1–2 lines max (3 lines will crowd the eyebrow).`,

  dimensions: { W, H },

  fonts,

  urlField: 'url',

  // ---------------------------------------------------------------------------
  // Head slide
  // ---------------------------------------------------------------------------
  head: [
    { name: 'bg',          type: 'rectangle', position: { x: 0,     y: 0       }, width: W,    height: H,       rotate: 0, opacity: 1, color: C.bg,     borderWidth: 0, borderColor: C.bg     },
    { name: 'accentBar',   type: 'rectangle', position: { x: PAD,   y: PAD     }, width: IW,   height: 2.5,     rotate: 0, opacity: 1, color: C.accent, borderWidth: 0, borderColor: C.accent },
    { name: 'brand',       type: 'text', position: { x: PAD, y: PAD + 5 }, width: IW, height: 14, fontSize: 14, fontColor: C.accent,  fontName: F,      alignment: 'left',   verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'image',       type: 'image', position: { x: IMG_X, y: IMG_Y }, width: IMG_W, height: IMG_H },
    { name: 'attribution', type: 'text', position: { x: PAD, y: IMG_Y + IMG_H + 3          }, width: IW, height: 14,      fontSize: 11, fontColor: C.muted,   fontName: F,      alignment: 'center', verticalAlignment: 'top',    lineHeight: 1.3  },
    { name: 'title',       type: 'text', position: { x: PAD, y: IMG_Y + IMG_H + TITLE_GAP  }, width: IW, height: TITLE_H, fontSize: 48, fontColor: C.heading, fontName: F_BOLD, alignment: 'left',   verticalAlignment: 'bottom', lineHeight: 1.15 },
    { name: 'caption',     type: 'text', position: { x: PAD, y: IMG_Y + IMG_H + TITLE_GAP + TITLE_H + 4 }, width: IW, height: 65, fontSize: 22, fontColor: C.body, fontName: F, alignment: 'left', verticalAlignment: 'top', lineHeight: 1.6 },
    { name: 'tag',         type: 'text', position: { x: TAG_X, y: TAG_Y }, width: 40, height: 10, fontSize: 12, fontColor: C.muted, fontName: F, alignment: 'right', verticalAlignment: 'top', lineHeight: 1 },
  ],

  // ---------------------------------------------------------------------------
  // Content slide
  // ---------------------------------------------------------------------------
  page: [
    { name: 'bg',        type: 'rectangle', position: { x: 0,   y: 0       }, width: W,  height: H,                           rotate: 0, opacity: 1, color: C.bg,     borderWidth: 0, borderColor: C.bg     },
    { name: 'accentBar', type: 'rectangle', position: { x: PAD, y: PAD     }, width: 15, height: 2.5,                         rotate: 0, opacity: 1, color: C.accent, borderWidth: 0, borderColor: C.accent },
    { name: 'eyebrow',   type: 'text', position: { x: PAD, y: PAD + 5   }, width: IW, height: 14,  fontSize: 14, fontColor: C.accent,  fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'title',     type: 'text', position: { x: PAD, y: PAD + 29  }, width: IW, height: 75,  fontSize: 36, fontColor: C.heading, fontName: F_BOLD, alignment: 'left', verticalAlignment: 'bottom', lineHeight: 1.25 },
    { name: 'body',      type: 'text', position: { x: PAD, y: PAD + 107 }, width: IW, height: H - PAD * 2 - 107 - 20, fontSize: 24, fontColor: C.body, fontName: F, alignment: 'left', verticalAlignment: 'top', lineHeight: 1.6 },
    { name: 'tag',       type: 'text', position: { x: TAG_X, y: TAG_Y   }, width: 40, height: 10,  fontSize: 12, fontColor: C.muted,   fontName: F,      alignment: 'right', verticalAlignment: 'top',   lineHeight: 1    },
  ],

  // ---------------------------------------------------------------------------
  // Tail slide
  // ---------------------------------------------------------------------------
  tail: [
    { name: 'bg',        type: 'rectangle', position: { x: 0,   y: 0     }, width: W,  height: H,   rotate: 0, opacity: 1, color: C.bg,     borderWidth: 0, borderColor: C.bg     },
    { name: 'accentBar', type: 'rectangle', position: { x: PAD, y: PAD   }, width: IW, height: 2.5, rotate: 0, opacity: 1, color: C.accent, borderWidth: 0, borderColor: C.accent },
    { name: 'eyebrow',   type: 'text', position: { x: PAD, y: PAD + 5 }, width: IW, height: 14,  fontSize: 14, fontColor: C.accent,  fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'title',     type: 'text', position: { x: PAD, y: 43      }, width: IW, height: 110, fontSize: 48, fontColor: C.heading, fontName: F_BOLD, alignment: 'left', verticalAlignment: 'bottom', lineHeight: 1.2  },
    { name: 'thanks',    type: 'text', position: { x: PAD, y: 161     }, width: IW, height: 36,  fontSize: 22, fontColor: C.body,    fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.6  },
    { name: 'body',      type: 'text', position: { x: PAD, y: 216     }, width: IW, height: 14,  fontSize: 18, fontColor: C.accent,  fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'url',       type: 'text', position: { x: PAD, y: 232     }, width: IW, height: 16,  fontSize: 18, fontColor: C.heading, fontName: F_BOLD, alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.2  },
    { name: 'tag',       type: 'text', position: { x: TAG_X, y: TAG_Y }, width: 40, height: 10,  fontSize: 12, fontColor: C.muted,   fontName: F,      alignment: 'right', verticalAlignment: 'top',   lineHeight: 1    },
  ],
};

export default def;

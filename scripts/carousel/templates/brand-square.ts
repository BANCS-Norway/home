/**
 * BANCS Brand Carousel — Square (1:1)
 *
 * Pure data. Layout values are pre-computed from constants below.
 * Assembly is handled by scripts/carousel/builder.ts.
 */

import type { CarouselTemplate, FontDef } from '../types.js';

const W   = 285.75;   // mm  (1080px @ 96dpi)
const H   = 285.75;   // mm  (1080px @ 96dpi — square)
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
const IMG_Y     = 42;
const TITLE_H   = 40;
const TITLE_GAP = 4;

const IW = W - PAD * 2;   // 243.75mm

const TAG_X = W - PAD - 40;
const TAG_Y = H - PAD - 12;

const fonts: FontDef[] = [
  { name: 'Inter',      fallback: true  },
  { name: 'Inter-Bold', fallback: false },
];
const [F, F_BOLD] = fonts.map(f => f.name) as [string, string];

const def: CarouselTemplate = {
  name: 'brand-square',

  description: `BANCS brand carousel — square (1:1, 1080×1080px). CURRENT DEFAULT — always use this template.
Style: dark navy background, sky-blue accents, high-contrast heading/body.
Structure: hero image + caption on head slide, N content slides, CTA tail with URL hotspot.
Required for Instagram (1:1 is the only supported carousel format). Also works for LinkedIn.
Word budgets — head caption: ~40 words. Page body: ~50 words per section (10 lines at 24pt). Titles: 1–2 lines max (3 lines will crowd the eyebrow). Square is more constrained than portrait — keep sections tight.`,

  dimensions: { W, H },

  fonts,

  urlField: 'url',

  // ---------------------------------------------------------------------------
  // Head slide
  // ---------------------------------------------------------------------------
  head: [
    { name: 'bg',          type: 'rectangle', position: { x: 0,     y: 0         }, width: W,    height: H,       rotate: 0, opacity: 1, color: C.bg,     borderWidth: 0, borderColor: C.bg     },
    { name: 'accentBar',   type: 'rectangle', position: { x: PAD,   y: PAD       }, width: IW,   height: 2.5,     rotate: 0, opacity: 1, color: C.accent, borderWidth: 0, borderColor: C.accent },
    { name: 'brand',       type: 'text',      position: { x: PAD,   y: PAD + 5   }, width: IW,   height: 12,   fontSize: 13, fontColor: C.accent,  fontName: F,      alignment: 'left',   verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'image',       type: 'image',     position: { x: IMG_X, y: IMG_Y     }, width: IMG_W, height: IMG_H },
    { name: 'attribution', type: 'text',      position: { x: PAD,   y: IMG_Y + IMG_H + 3           }, width: IW,   height: 12,   fontSize: 10, fontColor: C.muted,   fontName: F,      alignment: 'center', verticalAlignment: 'top',    lineHeight: 1.3  },
    { name: 'title',       type: 'text',      position: { x: PAD,   y: IMG_Y + IMG_H + TITLE_GAP   }, width: IW,   height: TITLE_H, fontSize: 40, fontColor: C.heading, fontName: F_BOLD, alignment: 'left',   verticalAlignment: 'bottom', lineHeight: 1.15 },
    { name: 'caption',     type: 'text',      position: { x: PAD,   y: IMG_Y + IMG_H + TITLE_GAP + TITLE_H + 4 }, width: IW, height: 50, fontSize: 18, fontColor: C.body, fontName: F, alignment: 'left', verticalAlignment: 'top', lineHeight: 1.55 },
    { name: 'tag',         type: 'text',      position: { x: TAG_X, y: TAG_Y     }, width: 40,   height: 10,   fontSize: 12, fontColor: C.muted,   fontName: F,      alignment: 'right',  verticalAlignment: 'top',    lineHeight: 1    },
  ],

  // ---------------------------------------------------------------------------
  // Content slide
  // ---------------------------------------------------------------------------
  page: [
    { name: 'bg',        type: 'rectangle', position: { x: 0,     y: 0         }, width: W,  height: H,                            rotate: 0, opacity: 1, color: C.bg,     borderWidth: 0, borderColor: C.bg     },
    { name: 'accentBar', type: 'rectangle', position: { x: PAD,   y: PAD       }, width: 15, height: 2.5,                          rotate: 0, opacity: 1, color: C.accent, borderWidth: 0, borderColor: C.accent },
    { name: 'eyebrow',   type: 'text',      position: { x: PAD,   y: PAD + 5   }, width: IW, height: 12,  fontSize: 13, fontColor: C.accent,  fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'title',     type: 'text',      position: { x: PAD,   y: PAD + 27  }, width: IW, height: 60,  fontSize: 36, fontColor: C.heading, fontName: F_BOLD, alignment: 'left', verticalAlignment: 'bottom', lineHeight: 1.25 },
    { name: 'body',      type: 'text',      position: { x: PAD,   y: PAD + 90  }, width: IW, height: H - PAD * 2 - 90 - 18, fontSize: 24, fontColor: C.body, fontName: F, alignment: 'left', verticalAlignment: 'top', lineHeight: 1.55 },
    { name: 'tag',       type: 'text',      position: { x: TAG_X, y: TAG_Y     }, width: 40, height: 10,  fontSize: 12, fontColor: C.muted,   fontName: F,      alignment: 'right', verticalAlignment: 'top',   lineHeight: 1    },
  ],

  // ---------------------------------------------------------------------------
  // Tail slide
  // ---------------------------------------------------------------------------
  tail: [
    { name: 'bg',        type: 'rectangle', position: { x: 0,     y: 0     }, width: W,  height: H,   rotate: 0, opacity: 1, color: C.bg,     borderWidth: 0, borderColor: C.bg     },
    { name: 'accentBar', type: 'rectangle', position: { x: PAD,   y: PAD   }, width: IW, height: 2.5, rotate: 0, opacity: 1, color: C.accent, borderWidth: 0, borderColor: C.accent },
    { name: 'eyebrow',   type: 'text', position: { x: PAD, y: PAD + 5 }, width: IW, height: 12, fontSize: 13, fontColor: C.accent,  fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'title',     type: 'text', position: { x: PAD, y: 41      }, width: IW, height: 90, fontSize: 40, fontColor: C.heading, fontName: F_BOLD, alignment: 'left', verticalAlignment: 'bottom', lineHeight: 1.2  },
    { name: 'thanks',    type: 'text', position: { x: PAD, y: 139     }, width: IW, height: 56, fontSize: 22, fontColor: C.body,    fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.6  },
    { name: 'body',      type: 'text', position: { x: PAD, y: 195     }, width: IW, height: 12, fontSize: 16, fontColor: C.accent,  fontName: F,      alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.5  },
    { name: 'url',       type: 'text', position: { x: PAD, y: 209     }, width: IW, height: 14, fontSize: 16, fontColor: C.heading, fontName: F_BOLD, alignment: 'left', verticalAlignment: 'top',    lineHeight: 1.2  },
    { name: 'tag',       type: 'text', position: { x: TAG_X, y: TAG_Y }, width: 40, height: 10, fontSize: 12, fontColor: C.muted,   fontName: F,      alignment: 'right', verticalAlignment: 'top',   lineHeight: 1    },
  ],
};

export default def;

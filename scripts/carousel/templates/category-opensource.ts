import { makeSquareTemplate } from './factory.js';

export default makeSquareTemplate(
  'category-opensource',
  `BANCS brand carousel — opensource category (1:1, 1080×1080px).
Style: deep forest background, green accents. Use for posts about open source projects, contributions, and community.
Word budgets — head caption: ~40 words. Page body: ~50 words per section. Titles: 1–2 lines max.`,
  {
    bg:      '#051a0f',
    accent:  '#4ade80',
    heading: '#f0fdf4',
    body:    '#a3c4a8',
    muted:   '#94a3b8',
  },
);

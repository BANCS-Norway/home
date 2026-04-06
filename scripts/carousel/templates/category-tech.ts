import { makeSquareTemplate } from './factory.js';

export default makeSquareTemplate(
  'category-tech',
  `BANCS brand carousel — tech category (1:1, 1080×1080px).
Style: deep teal-black background, cyan accents. Use for posts about technology, engineering practices, and developer tools.
Word budgets — head caption: ~40 words. Page body: ~50 words per section. Titles: 1–2 lines max.`,
  {
    bg:      '#051520',
    accent:  '#67e8f9',
    heading: '#ecfeff',
    body:    '#9abdc6',
    muted:   '#94a3b8',
  },
);

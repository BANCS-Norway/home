import { makeSquareTemplate } from './factory.js';

export default makeSquareTemplate(
  'category-brand',
  `BANCS brand carousel — brand category (1:1, 1080×1080px).
Style: dark navy background, sky-blue accents. Use for posts about BANCS itself, announcements, and organisation news.
Word budgets — head caption: ~40 words. Page body: ~50 words per section. Titles: 1–2 lines max.`,
  {
    bg:      '#0f172a',
    accent:  '#38bdf8',
    heading: '#f1f5f9',
    body:    '#a8b8cb',
    muted:   '#94a3b8',
  },
);

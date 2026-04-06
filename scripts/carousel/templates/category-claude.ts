import { makeSquareTemplate } from './factory.js';

export default makeSquareTemplate(
  'category-claude',
  `BANCS brand carousel — claude category (1:1, 1080×1080px).
Style: deep indigo background, violet accents. Use for posts about Claude, AI tools, and Anthropic-related content.
Word budgets — head caption: ~40 words. Page body: ~50 words per section. Titles: 1–2 lines max.`,
  {
    bg:      '#0f0a1e',
    accent:  '#c4b5fd',
    heading: '#f1f5f9',
    body:    '#b8aecb',
    muted:   '#94a3b8',
  },
);

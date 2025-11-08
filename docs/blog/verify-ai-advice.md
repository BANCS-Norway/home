---
title: "A Cautionary Tale: Always Verify What AI Tells You"
description: How trusting AI advice without verification cost me my weekly Claude limit - and why exhaustion makes it worse
date: 2025-11-07
readingTime: 6
hero:
  image: /images/blog/verify-ai/following-blind-hero.jpg
  alt: Person following another blindly through forest - metaphor for trusting AI without verification
  attribution:
    author: Erik Mclean
    authorUrl: https://www.pexels.com/@erik-mclean-12793860/
    source: Pexels
    sourceUrl: https://www.pexels.com/photo/unrecognizable-man-following-girlfriend-in-forest-4365413/
    modifications: Converted to monochrome, centered, and cropped for blog format by Claude Code
---

<BlogHeading />

<DisclaimerBox type="claude" />

## Don't Follow Claude Blindly

I learned an expensive lesson this week: verification means nothing if you're too tired to think critically about what you're seeing.

I was deep into implementing Storybook for a project when a big yellow banner appeared: **"Approaching weekly limit"** - I'd hit 82% of my weekly Claude message limit. (Props to Anthropic for making this visible and clear!) Frustrating timing - I still had work to finish, and the weekly reset was two days away.

So I asked Claude Code how to handle it.

The answer came back confident: "Switch to Opus. It has its own separate limit that won't count against your weekly limit."

That sounded... plausible? Different models, different limits. Makes sense, right?

I even checked the [Usage tab](https://claude.ai/settings/usage) and saw "All models: 82%" and "Opus: 0%". That seemed to confirm it! Separate limits, just like Claude said.

So I switched to Opus and kept working.

Two hours later: **92%**.

Wait, what?

## The Triple Penalty

Turns out Claude Code was completely wrong. All models - Sonnet, Opus, whatever - count against the same weekly message limit. There are no separate limits per model.

But I didn't just waste my quota. I paid a triple penalty:

1. **Burned faster**: Opus messages are more expensive per message than Sonnet
2. **Worse results**: Opus gave me Storybook 8 when I needed version 10
3. **Confidently wrong**: When I questioned it, Opus insisted "Storybook 9 is only in preview, we should avoid it." (Storybook 9 was released months earlier.)

More expensive model. Worse results. More confident wrong answers.

I went from 82% to 92% in two hours - and accomplished nothing.

## How to Verify Properly

Before following AI advice - especially about account limits, billing, or anything that could lock you out of your tools - take 30 seconds to verify:

- **Check the [Usage tab](https://claude.ai/settings/usage)** - but actually READ it carefully, don't just glance
- **Check official documentation** - Claude Code can fetch it: "show me the docs about usage limits"
- **Ask Claude to cite sources** - "Where did you get that information?"
- **Search the Anthropic help center** - often faster than waiting for support

I looked at the Usage tab, but confirmation bias made me see what I expected to see. "Opus: 0%" seemed to confirm "separate limits" instead of making me question what "All models: 82%" actually meant.

Exhaustion makes you skip steps you know matter. ([Remember my post about taking breaks?](/blog/pause-not-procrastination) Yeah, I didn't follow that advice this week.)

## The Real Lesson

AI tools like Claude are incredibly helpful. I use them constantly. But they're not infallible, and **they can sound confident even when they're completely wrong.**

The Storybook version mistake is the perfect example. Opus didn't say "I think" or "I'm not sure." It stated outdated information as fact with complete confidence.

**Two takeaways:**

1. **AI confidence ≠ AI accuracy** - The more confident the answer sounds, the more important verification becomes
2. **Verification requires critical thinking** - I checked the data but confirmation bias made me misinterpret it. Looking isn't enough; you have to question what you're seeing

Trust AI tools, but always verify. Especially when tired, and especially when the stakes are high.

---

*This blog post was co-written with [Claude](https://claude.ai) (Chat for ideation and outline, Code for assembly and refinement). The experiences, insights, and creative direction are human; the execution and polish are collaborative.*

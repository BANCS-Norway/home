---
title: Two Sides of the Same Coin
subtitle: The Stalactite Principle and autoDream, Five Months Apart
description: In November 2025 I documented the Stalactite Principle. In March 2026, a packaging error exposed Claude Code's internals. Researchers found autoDream. They're not parallel discoveries. They're the same coin.
date: 2026-04-02
readingTime: 4
tags:
  - claude-code
  - ai
  - memory
  - architecture
hero:
  image: /images/blog/stalactite-autodream/coin.png
  alt: A 1907 Double Eagle gold coin showing both obverse and reverse — two sides of the same coin

  attribution:
    author: National Numismatic Collection, Smithsonian Institution
    authorUrl: https://americanhistory.si.edu/collections/numismatics
    source: Wikimedia Commons
    sourceUrl: https://commons.wikimedia.org/wiki/File:NNC-US-1907-G%2420-Saint_Gaudens_(Roman,_ultra_high_relief,_wire_edge).jpg
    license: Public Domain
    licenseUrl: https://creativecommons.org/publicdomain/zero/1.0/
---

<BlogHeading />

<DisclaimerBox type="claude" />

On November 4, 2025, I documented something I called [the Stalactite Principle](/blog/claude-code-stalactite). The core idea was simple: AI coding sessions are ephemeral, but knowledge shouldn't be. By externalising context to GitHub Issues — letting insights accumulate like mineral deposits over time — you could give Claude Code a persistent memory that survived terminal restarts, context resets, and session boundaries.

I built it out of laziness. Re-explaining the same architectural decisions every session felt like a tax on thinking. The Issues became the externalisation layer. The model became stateless. The knowledge stayed.

Five months later, on March 31, 2026, a packaging error in `@anthropic-ai/claude-code` v2.1.88 accidentally exposed the tool's entire TypeScript source. Researchers digging through 512,000 lines [found something called **autoDream**](https://kuber.studio/blog/AI/Claude-Code's-Entire-Source-Code-Got-Leaked-via-a-Sourcemap-in-npm,-Let's-Talk-About-it) — a background memory consolidation system. It activates on a three-gate trigger: 24 hours elapsed, 5 sessions completed, a consolidation lock preventing concurrent runs. All three must pass. Then it moves through four phases: Orient → Gather → Consolidate → Prune.

[Anthropic confirmed the incident](https://www.theregister.com/2026/03/31/anthropic_claude_code_source_code/) as "a release packaging issue caused by human error, not a security breach." They said nothing about the architecture.

## Two Faces

autoDream is the inside of the coin. The Stalactite Principle is the outside. You only ever see one face at a time — but they're the same metal.

Both are solving the same problem: AI agents lose context, and that loss is expensive. Both treat memory as something to be actively maintained rather than passively accumulated. Both separate *what the model is doing right now* from *what the model needs to remember across time*.

The difference is infrastructure. autoDream is a daemon. The Stalactite Principle is a discipline.

One runs automatically, triggered by elapsed time and session count. The other requires intent — a developer who noticed the cost of repetition and decided to externalise rather than re-explain. One is engineered. The other is improvised. Both arrive at the same architectural shape: a persistent layer, outside the model, that accumulates signal and prunes noise.

## The Convergence

I didn't arrive here by reading Anthropic's internal documentation. I arrived here by hitting the same wall their engineers hit, and building around it with the tools I had — a shell function, GitHub Issues, and a `.claude` folder.

This post is not a claim that I built what Anthropic built. It is an observation that two independent paths, taken at roughly the same time, arrived at strikingly similar conclusions.

That convergence is itself the signal: the problem is real, the solution space is constrained, and the architectural shape of the answer is probably not a coincidence.

The Stalactite Principle is documented. The timestamp is November 4, 2025. autoDream is now public, whether Anthropic intended it to be or not.

Draw your own conclusions.

---

*This post was written in dialogue — with Claude Chat for framing, with Claude Code for fact-checking, and with the sources themselves for honesty. Three passes to get it right. That's the methodology too.*

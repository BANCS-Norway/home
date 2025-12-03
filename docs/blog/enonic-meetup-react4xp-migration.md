---
title: From Legacy to Lightning Fast - Modernizing with React4XP 6
subtitle: Enonic Oslo Meetup Talk - December 4, 2025
description: The story of migrating Liberalistene.no from React4XP v3 to v6 in 2.5 weeks - forced upgrades, desperate hacks, and the PartShim pattern breakthrough
date: 2025-12-04
readingTime: 10
tags:
  - enonic
  - react4xp
  - migration
  - architecture
  - ai-assisted
---

<BlogHeading />

<DisclaimerBox type="claude" />

On December 4, 2025, I presented at the [Enonic Oslo Meetup](https://www.meetup.com/enonic-oslo/events/311761294) about modernizing [Liberalistene.no](https://liberalistene.no) from React4XP v3 to v6. What started as a forced upgrade turned into a complete infrastructure overhaul in 2.5 weeks—and became a story about effective human-AI collaboration.

<RevealPresentation
  theme="white"
  transition="slide"
  backgroundImage="https://www.enonic.com/images/globe.svg"
  backgroundSize="cover"
  backgroundPosition="center"
  backgroundOpacity="0.12"
>
  <!-- Slide 1: Title -->
  <section>
    <h1 class="slide-title">From Legacy to Lightning Fast</h1>
    <h2 class="slide-subtitle">Modernizing with React4XP 6</h2>
    <p class="slide-text-large">Liberalistene.no Transformation Story</p>
    <p class="slide-text-medium">Benny Thomas</p>
    <p class="slide-text-small">December 4, 2025</p>
  </section>

  <!-- Slide 2: The Forced Upgrade -->
  <section>
    <h2 class="slide-heading">Why We Had To Migrate</h2>
    <div class="slide-content">
      <p class="slide-text">Running on Enonic Cloud</p>
      <p class="slide-text">Enonic upgrading XP to latest version</p>
      <p class="slide-text slide-text-danger">React4XP v3 was blocking the upgrade</p>
      <p class="slide-text-spaced slide-result">Forced migration to v6</p>
      <p class="slide-text-spaced slide-text-muted slide-text-italic">No choice. Had to do it.</p>
    </div>
  </section>

  <!-- Slide 3: The Journey Begins -->
  <section>
    <h2 class="slide-heading">October 3: Started the Migration</h2>
    <div class="slide-content-small">
      <p class="slide-text-tight"><strong>Infrastructure Modernization:</strong></p>
      <ul class="slide-list">
        <li>Node 16 → 22</li>
        <li>Gradle 6.5 → 8.5</li>
        <li>Webpack → RSpack</li>
        <li>Babel → TSup</li>
        <li>Tailwind CSS v4 integration</li>
      </ul>
      <p class="slide-text-spaced"><strong>Layouts:</strong> 9 migrated from Thymeleaf to React/TSX</p>
      <p class="slide-text slide-text-large-bold"><strong>Pending: 36 Parts to migrate</strong></p>
    </div>
  </section>

  <!-- Slide 4: The Struggle -->
  <section>
    <h2 class="slide-heading-danger">Oct 10-15: Content Studio Breaking</h2>
    <div class="slide-content">
      <p class="slide-text">Migrating the 36 remaining Parts</p>
      <p class="slide-text">Content Studio acting up on pages</p>
      <p class="slide-text slide-text-danger">5 days of workarounds and desperate hacks</p>
    </div>
  </section>

  <!-- Slide 5: The Answer -->
  <section>
    <h2 class="slide-heading">October 16: Slack to the Rescue</h2>
    <div class="slide-content">
      <p class="slide-text">Asked Enonic community developer channel</p>
      <p class="slide-text slide-text-italic">"Pavel: Can't reproduce... what versions are you on?"</p>
      <p class="slide-text slide-text-highlight">Answer: Upgrade Content Studio!</p>
      <p class="slide-text slide-text-muted">React4XP v6 docs didn't mention CS version requirement</p>
    </div>
  </section>

  <!-- Slide 6: Launch Day -->
  <section>
    <h2 class="slide-heading-success">October 19: We're Live!</h2>
    <div class="slide-content">
      <p class="slide-text">Content Studio upgraded</p>
      <p class="slide-text">Migration complete</p>
      <p class="slide-text-spaced slide-text-xl"><strong>398 files changed</strong></p>
      <p class="slide-text">Site launched with React4XP v6</p>
      <p class="slide-result slide-text-2xl slide-text-success">Made the deadline!</p>
    </div>
  </section>

  <!-- Slide 7: The Secret Sauce -->
  <section>
    <h2 class="slide-heading-small">The PartShim Pattern</h2>
    <p class="slide-code-caption">3 lines per Part (was 50-100 lines)</p>
    <img src="/images/blog/partshim-pattern-code.png" alt="PartShim Pattern Code Example" class="slide-image" />
    <div class="slide-content-tiny">
      <p class="slide-text-tight">Clean separation: Processor to Shim to Component</p>
      <p class="slide-text-tight">Testable in isolation (Storybook, unit tests)</p>
      <p class="slide-text-tight">Pure React components</p>
      <p class="slide-text slide-text-xl"><strong>36 Parts x 3 lines = Maintainable!</strong></p>
    </div>
  </section>

  <!-- Slide 8: The Numbers -->
  <section>
    <h2 class="slide-heading">What Changed (Oct 3-19)</h2>
    <ul class="slide-numbers">
      <li class="slide-text-bold">398 files modified</li>
      <li class="slide-text-success">+55,306 lines added</li>
      <li class="slide-text-danger">-45,733 lines deleted</li>
      <li>Complete infrastructure overhaul</li>
      <li><strong>2.5 weeks</strong></li>
    </ul>
  </section>

  <!-- Slide 9: Before & After -->
  <section class="slide-table-wrapper">
    <h2 class="slide-heading">Before & After</h2>
    <table class="slide-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="metric">React4XP</td>
          <td class="danger">v3 (blocked)</td>
          <td class="success">v6</td>
        </tr>
        <tr>
          <td class="metric">Architecture</td>
          <td>Controllers</td>
          <td class="success">Processors</td>
        </tr>
        <tr>
          <td class="metric">Test Coverage</td>
          <td class="danger">0%</td>
          <td class="success">70%+</td>
        </tr>
        <tr>
          <td class="metric">Node</td>
          <td>16</td>
          <td class="success">22</td>
        </tr>
        <tr>
          <td class="metric">Styling</td>
          <td>SCSS</td>
          <td class="success">Tailwind CSS</td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Slide 10: Key Lessons -->
  <section>
    <h2 class="slide-heading">Key Lessons</h2>
    <div class="slide-content-small">
      <p class="slide-text"><strong>1.</strong> Forced upgrades can be blessings in disguise</p>
      <p class="slide-text"><strong>2.</strong> Check environment requirements early (docs matter!)</p>
      <p class="slide-text"><strong>3.</strong> Community support saves days (ask sooner!)</p>
      <p class="slide-text"><strong>4.</strong> Clean architecture patterns scale beautifully</p>
      <p class="slide-text"><strong>5.</strong> Testing enables confidence for future changes</p>
    </div>
  </section>

  <!-- Slide 11: The Reveal -->
  <section>
    <h2 class="slide-heading">What Actually Happened</h2>
    <div class="slide-content-center">
      <p class="slide-text-tight">AI: 398 files, 55K+ lines of code</p>
      <p class="slide-text-tight">Human: Architecture, vision, course corrections</p>
      <p class="slide-transform">I transformed from Developer to Claude Code Conductor</p>
      <p class="slide-result"><strong>Result: 2.5 weeks instead of 2.5 months</strong></p>
    </div>
  </section>

  <!-- Slide 12: Questions -->
  <section>
    <h1 class="slide-heading-large">Time for Questions</h1>
  </section>

  <!-- Slide 13: Read More -->
  <section>
    <h2 class="slide-heading">Read the Full Story</h2>
    <p class="slide-link-wrapper">
      <a href="https://bancs.no/blog/enonic-meetup-react4xp-migration" class="slide-link">bancs.no/blog/enonic-meetup-react4xp-migration</a>
    </p>
  </section>

</RevealPresentation>

## The Forced Upgrade

In early October 2025, [Liberalistene.no](https://liberalistene.no) was running smoothly on Enonic Cloud with React4XP v3. Then came the notification: Enonic needed to upgrade XP to the latest version, and **React4XP v3 was blocking the upgrade**.

We had no choice. We had to migrate to React4XP v6 as fast as possible.

## The Migration Journey

**October 3, 2025** - We started the migration, but not just React4XP. We decided to modernize the entire infrastructure:

- Node 16 → 22
- Gradle 6.5 → 8.5
- Webpack → RSpack
- Babel → TSup
- Integrated Tailwind CSS v4

The 9 layouts migrated from Thymeleaf to React/TSX went smoothly. Then came the challenge: **36 Parts** that needed migration.

**October 10-15, 2025** - Five days of struggle. Content Studio started breaking when we worked on pages. We tried increasingly desperate workarounds and hacks. The AI pair programmer I was working with (Claude Code) was making crazier and crazier suggestions as the problem persisted.

**October 16, 2025** - Finally, I did what I should have done days earlier: I asked the [Enonic Slack developer channel](https://enonic.slack.com) for help.

Pavel responded: *"I can't reproduce the error... what versions are you on?"*

The answer was simple and frustrating: **Upgrade Content Studio**.

The React4XP v6 documentation never mentioned the Content Studio version requirement. All those workarounds, all that time lost—for a simple environment issue. 🤦

**October 19, 2025** - We went live. Content Studio upgraded, migration complete, **398 files changed**. 🎉

## The Architectural Breakthrough: PartShim

The real innovation wasn't just completing the migration—it was how we restructured the code. In React4XP v3, Parts had controllers with 50-100 lines of mixed server logic and component rendering. Tightly coupled, hard to test.

We created the **PartShim pattern**. Every Part file became just **3 lines**:

```tsx
import {Book} from '/react4xp/common/Book/Book';
import {createPartShim} from '/react4xp/common/PartShim/PartShim';

export const BookPart = createPartShim(Book);
```

### The Architecture

```
Part File (BookPart.tsx)     → 3 lines: createPartShim(Book)
   ↓
Processor (BookProcessor.ts) → Fetches/transforms data
   ↓
Component (Book.tsx)         → Pure React, testable in Storybook
```

**Benefits:**
- ✅ Clean separation of concerns
- ✅ Components are pure React (testable in isolation)
- ✅ Reusable in Storybook, tests, and production
- ✅ Type-safe with TypeScript generics
- ✅ **36 Parts × 3 lines = Highly maintainable**

You can see the full implementation in the [GitHub repository](https://github.com/Liberalistene-Developers/lib.no):
- [PartShim pattern](https://github.com/Liberalistene-Developers/lib.no/blob/main/src/main/resources/react4xp/common/PartShim/PartShim.tsx)
- [Example Part usage](https://github.com/Liberalistene-Developers/lib.no/tree/main/src/main/resources/react4xp/parts)
- [Foundation commit](https://github.com/Liberalistene-Developers/lib.no/commit/6d876acbe789b8c23fa10f3c408e5e41169c34e3)

## The Human-AI Collaboration

Here's what I revealed in the final slide of the talk: **This entire migration was co-authored with Claude Code**.

But it wasn't magic. The collaboration model was:

1. **I had the architectural vision** - I understood the clean separation we needed
2. **Claude initially didn't get it** - It over-engineered, made it more complicated
3. **I taught the pattern through examples** - Showed what I wanted, refined the approach
4. **Claude learned and replicated** - Once it understood, it applied the pattern consistently across all 36 Parts

### From Developer to Conductor

I transformed from **Developer** to **Claude Code Conductor**:

- **Set architectural vision** - Define the patterns and principles
- **Teach through examples** - Show, don't just tell
- **Conduct when it goes off-key** - Course-correct when the AI diverges
- **Review and refine output** - Final approval on all code

**The result:** What would have taken 2.5 months solo took **2.5 weeks** with AI assistance.

## The Numbers

```
398 files modified
+55,306 lines added
-45,733 lines deleted

Complete infrastructure overhaul
2.5 weeks from start to production
```

## Key Takeaways

**1. Forced upgrades can be blessings in disguise**
We ended up with better architecture, modern tooling, and 70% test coverage—all because we were forced to upgrade.

**2. Check environment requirements early**
5 days wasted because the docs didn't mention Content Studio version requirements. Always verify your entire environment stack.

**3. Ask for help sooner**
The Enonic Slack community had the answer in minutes. Don't spend days on workarounds before asking.

**4. Clean architecture patterns scale**
The PartShim pattern made 36 migrations trivial. Good abstractions compound.

**5. AI amplifies human vision**
Claude Code didn't design the architecture—I did. But it executed at scale, maintaining consistency across 36 implementations.

## About the Meetup

The [Enonic Oslo Meetup on December 4, 2025](https://www.meetup.com/enonic-oslo/events/311761294) featured four technical talks:

- **12:00** - My talk: "From Legacy to Lightning Fast: Modernizing with React4XP 6"
- **12:30** - "HTML-over-the-wire" by Tom Arild Jakobsen (Tech Lead, Item Consulting)
- **13:00** - "Schemas Go YAML" by Thomas Sigdestad (CTO, Enonic)
- **13:30** - "Enonic UI Behind the Scenes" by Alan Semenov (VP Engineering, Enonic)

The event brought together 41 Enonic developers at Enonic HQ in Oslo for lunch, networking, and knowledge sharing.

## Resources

- **Repository:** [Liberalistene.no on GitHub](https://github.com/Liberalistene-Developers/lib.no)
- **Foundation Commit:** [`6d876ac`](https://github.com/Liberalistene-Developers/lib.no/commit/6d876acbe789b8c23fa10f3c408e5e41169c34e3)
- **Modernization Roadmap:** [Issue #31](https://github.com/Liberalistene-Developers/lib.no/issues/31)
- **Enonic Slack:** [Join the community](https://enonic.slack.com)
- **Meetup Event:** [Enonic Oslo Meetup](https://www.meetup.com/enonic-oslo/events/311761294)

---

## About This Post

Like the migration it describes, this blog post was co-authored with Claude Code. The pattern continues: human vision and architecture, AI assistance for execution and consistency.

*Interested in the collaboration model? Read more in [The Claude Code Chronicles](/blog/claude-code-chronicles) series.*

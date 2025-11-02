---
title: The 6-Step Workflow That Makes It Work - The Claude Code Chronicles Part 2
description: Discover the systematic 6-step workflow that transforms how you build software with Claude Code, from issue creation to pull request
date: 2025-11-11
---

<BlogHeading
  title="The 6-Step Workflow That Makes It Work"
  subtitle="Part 2 of The Claude Code Chronicles"
  publishDate="November 11, 2025"
  readingTime="10 minutes"
/>

---

<HeroImage
  src="/images/blog/chronicles/claude-code-cycle-diagram.svg"
  alt="Circular workflow diagram showing the 6-step development cycle"
  blurred
/>

<PostPreview blurred>
  <template #stamp>
    <RevealStamp date="Tuesday, November 11th" />
  </template>

In Part 1, we discovered why Claude Code is like a stalactite - it builds knowledge drop by drop through persistent GitHub Issues. But knowledge alone isn't enough. You need a systematic workflow that transforms those drops into solid, production-ready features.

After six months of daily development with Claude Code, I've refined a 6-step workflow that eliminates context switching, prevents scope creep, and ensures every commit is intentional. This isn't theoretical - it's battle-tested through hundreds of issues and pull requests.

## Why Traditional Workflows Break with AI

Most developers work in two modes: planning and coding. AI tools like Claude Code introduce a third mode: collaboration. Without a clear workflow, you end up in a chaotic cycle of half-finished features, unclear commit history, and the nagging question: "Did I commit that change?"

The 6-step workflow solves this by making collaboration explicit. Every step has a clear purpose, and Claude knows exactly what to do at each stage. No ambiguity, no confusion, just systematic progress.

## The 6-Step Workflow

This workflow ensures every feature starts with an issue and ends with a clean pull request. Here's how it works:

### Step 1: Check Current Branch

Before starting any work, verify where you are. Are you on main? A feature branch? This simple check prevents the most common mistake in Git: working on the wrong branch.

```bash
git branch --show-current
```

If you're on main, you need an issue and a feature branch. If you're on a feature branch, you're ready to continue work. This one command saves hours of cleanup later.

### Step 2: Ask About Issue

Every feature needs an issue. Not because of bureaucracy, but because issues provide:
- Persistent context that survives browser refreshes
- A single source of truth for what needs to be done
- Clear acceptance criteria before you start coding
- Automatic documentation of why decisions were made

Claude asks: "Should I create a new issue for this work, or is there an existing issue?" This forces intentionality. You're not just coding - you're solving a documented problem.

### Step 3: Gather Issue Details

If creating a new issue, Claude collects:
- Clear description of the work
- Issue type (docs, style, feature)
- Task list with checkboxes
- Acceptance criteria

This isn't busywork. It's the scaffolding that keeps complex features on track. When you return to a feature three days later, the issue tells you exactly where you left off.

### Step 4: Create Feature Branch

Branch naming follows a strict convention: `{type}/{issue-number}_descriptive-title`

Examples:
- `docs/42_refactor-claude-md`
- `feature/23_add-search-functionality`
- `style/15_update-button-colors`

This convention makes branch purpose obvious at a glance. Six months from now, you'll know exactly what `docs/42_refactor-claude-md` was about without opening the issue.

### Step 5: Add Status Label

Mark the issue with "status: in progress". This one label provides:
- Team visibility (someone's working on this)
- Personal tracking (which issues am I actively developing)
- Process clarity (which issues are stalled, which are moving)

Status labels turn GitHub Issues into a lightweight project management system. No external tools needed.

### Step 6: Ready to Start

Claude confirms: "Branch created. Ready to start work on issue #42?" This explicit confirmation creates a mental checkpoint. You're no longer in planning mode - you're in execution mode.

## Real Example: Issue #96 to PR #99

Let's see this workflow in action. Issue #96 was about adding a landing page for The Claude Code Chronicles blog series. Here's how the 6-step workflow played out:

**Steps 1-3**: Verified we were on main, created Issue #96 with clear tasks and acceptance criteria. The issue documented exactly what "landing page" meant - no assumptions.

**Step 4**: Created branch `blog/96_chronicles-landing` following the naming convention. The branch name immediately tells anyone browsing the repository what this work is about.

**Step 5**: Added "status: in progress" label. The issue moved from "planned" to "active" in our mental model of the project.

**Step 6**: Started development with full context. Every commit referenced #96, creating a clear history trail from issue to implementation.

The result? PR #99 was clean, focused, and merged without confusion. The commit history reads like a story: "This is what we set out to do, here's how we did it, and here's why we made each decision."

## What Claude Code Handles Automatically

With this workflow in place, Claude Code manages:
- Branch verification before starting work
- Issue creation with proper formatting
- Status label management
- Conventional commit messages
- Batch development with review checkpoints
- Git operations (except pushing - that's always you)

You focus on decisions: "Should we build this feature?" Claude handles mechanics: "Here's how we'll build it systematically."

## Why This Works for Solo Developers

You might think this workflow is overkill for solo projects. I thought the same thing. But here's what changed my mind:

**Context persistence**: You will get interrupted. Phone calls, meetings, life. Issues ensure you never lose your place.

**Decision documentation**: Six months from now, you'll ask "Why did I build it this way?" The issue contains your reasoning.

**Scope control**: Task lists and acceptance criteria prevent the dreaded "while I'm here, I'll also..." that derails features.

**Professional habits**: When you eventually work on team projects, these workflows are second nature.

The 6-step workflow isn't about process for process sake. It's about building muscle memory for sustainable development. Whether you're working solo today or joining a team tomorrow, the habits are identical.

## Try It Yourself

Next time you start a feature, follow the 6 steps exactly. No shortcuts, no "I'll create the issue later." Notice how it changes your mindset from "I'm going to code" to "I'm going to solve this specific, documented problem."

That shift in perspective is the difference between code that works today and systems that scale for years.

---

📅 **Publishing Date:** Tuesday, November 11th, 2025

🔙 [Back to Series Overview](/blog/claude-code-chronicles)

</PostPreview>

---

<SeriesNav
  :prev="{ text: 'Part 1: The Stalactite', link: '/blog/claude-code-stalactite' }"
  :next="{ text: 'Part 3: The Collective', link: '/blog/claude-code-collective' }"
/>

---
title: The 6-Step Workflow That Makes It Work
subtitle: Part 2 of The Claude Code Chronicles
description: Discover the systematic 6-step workflow that transforms how you build software with Claude Code, from issue creation to pull request
date: 2025-11-11
readingTime: 10
hero:
  image: /images/blog/chronicles/pexels-sunflower-10492046.jpg
  alt: Sunflower seed pattern showing natural spiral workflow and systematic growth
  attribution:
    author: Scott Schumacher
    source: Pexels
    sourceUrl: https://www.pexels.com/photo/yellow-sunflower-in-close-up-photography-10492046/
---

<BlogHeading />

<DisclaimerBox type="claude" revealed />

In my last post, I introduced the stalactite principle: Claude Code with GitHub Issues creates persistent, accumulating knowledge instead of ephemeral conversations.

**The response I got:** "Okay, this sounds great. But *how* do you actually do this?"

**Today:** I'm sharing the exact 6-step workflow I use for every feature and fix. From problem statement to merged PR to updated documentation, with only minimal prompts from me.

## The Problem with Traditional AI Workflows

I used to work like this:

Start a Claude Code session. Build a feature. Context gets heavy. Claude gets confused. I commit half-finished work just to clear the context. Close the session. Next day, start fresh and try to remember where I was.

Sound familiar?

The problem isn't Claude Code. It's trying to cram an entire feature into a single session without structure. Without checkpoints. Without a system that survives context limits and interruptions.

I needed a workflow that:
- Works across multiple sessions (context resets don't destroy progress)
- Creates natural checkpoints (batches of 2-3 tasks, not everything at once)
- Documents automatically (I hate manual documentation)
- Stays out of my way (minimal prompts from me)

**The difference:** One workflow keeps you building. The other keeps you fighting context limits and forgotten decisions.

## The 6-Step Workflow

Each step deposits knowledge. The cycle repeats. The stalactite grows.

![The Claude Code 6-step workflow cycle](/images/blog/chronicles/claude-code-cycle-diagram.svg)

### Step 1: Create the Issue

I was looking at PageSpeed Insights results one day. The report showed several performance problems. Instead of diving into fixes immediately, I tried something:

**My prompt:**
```
"PageSpeed Insights found concerns about my page, create an issue for this please."
```

Ten seconds later, Claude Code gave me [Issue #96](https://github.com/BANCS-Norway/home/issues/96) with:
- 5 distinct problem areas (images, JavaScript, fonts, caching, CSS)
- Technical analysis of each problem
- Proposed solutions with tradeoffs
- Complete testing plan
- Effort estimates

**I gave one sentence. Claude generated a complete project specification.**

But here's the real value: I could review this *before any code changed*. Catch misunderstandings. Adjust the approach. Clarify requirements. All before a single line of code got modified.

**Your prompt:**
```
"I have [problem/feature], please create an issue for me."
```

**Time investment:** 10 seconds to type. 2 minutes to review.

<InfinityDivider />

### Step 2: Create Feature Branch and Start Work

Claude creates a feature branch following your project's naming convention, then starts work in small batches:

**Your prompt:**
```
"Please start working on [issue #96](https://github.com/BANCS-Norway/home/issues/96) in batches of 2-3 tasks."
```

**Why batches are crucial:**

When I first tried Claude Code, I'd give it the whole issue at once. "Optimize all these PageSpeed items." It would work for a while, context would balloon, and Claude would start getting confused or missing things.

Batches solve this. Claude picks 2-3 related tasks, implements them, shows you what changed, then asks: "Ready to commit?"

This creates natural checkpoint moments. Small, reviewable changes. Steady progress without context overload.

**Batch 1 on [Issue #96](https://github.com/BANCS-Norway/home/issues/96):** Logo conversion to WebP + image lazy loading
**Batch 2:** Font loading optimization + theme script deferral
**Batch 3:** Security headers + accessibility fixes

Seven batches total. Each one small enough to review in 2 minutes. Each one a complete checkpoint.

**Pro tip:** If Claude seems stuck or confused, it's trying to do too much at once. "Let's tackle this in smaller batches" fixes it immediately.

<InfinityDivider />

### Step 3: Review and Commit

**Your actions:**
1. Review the changes Claude Code made
2. Approve or request adjustments
3. Claude drafts the commit message
4. You review and commit

**Critical commit message tip:** Claude Code loves to list changed files in commit messages. Remove those. You want meaningful descriptions, not file inventories.

**What Claude might generate:**
```
feat: optimize logo loading with WebP format

- Added WebP conversion for logo
- Implemented lazy loading for images
- Files changed: docs/public/bancs.webp, docs/index.md, docs/.vitepress/config.ts
```

**What you should use:**
```
feat: optimize logo loading with WebP format

Converted logo to WebP format (73% size reduction) with PNG fallback.
Implemented lazy loading for blog post images to improve initial page load.
```

See the difference? The second one tells you *why* and *what improved*. The first one just lists mechanics.

<InfinityDivider />

### Step 4: Repeat Until Complete

**The loop:** Repeat steps 2-3 until the entire issue is solved.

For [Issue #96](https://github.com/BANCS-Norway/home/issues/96), this was:
- 2 batches on day one (logo + images)
- Session ended (context limit approaching)
- 3 batches the next morning (fonts + scripts + CSS)
- Another session break (life happened)
- 2 final batches a day later (security + accessibility)

**Seven batches. Three separate Claude Code sessions. Zero lost context.**

Each time I started a new session, I just said: "Continue work on [issue #96](https://github.com/BANCS-Norway/home/issues/96) in batches." Claude read the issue, saw what was already committed, and picked up exactly where we left off.

This is the stalactite principle in action. The GitHub Issue persists. The commits persist. The context survives session boundaries.

**When all batches are complete:**

```
"Please squash these commits and rewrite the commit message."
```

Claude combines all batch commits into one clean commit with a comprehensive message summarizing the entire feature. Clean git history, clear change narrative.

<InfinityDivider />

### Step 5: Push and Create PR

**Critical: You always push. Claude never touches the remote.**

When the feature is complete and squashed:

**You push manually:**
```bash
git push -u origin feature/96-pagespeed-optimization
```

Then ask Claude to help with the PR:

**Your prompt:**
```
"Please create a PR for this work."
```

**What Claude Code does:**
```bash
gh pr create --title "PageSpeed Optimization" --body "..."
```

Claude creates a pull request with:
- Summary of all work completed
- References to the original issue
- Links to related commits
- Clear description for reviewers

**Your job:** Review and merge the PR in GitHub UI.

**Why you push, not Claude:** Full control over what reaches the remote repository. Especially important with multiple parallel sessions. You decide exactly when and what gets pushed. No surprises. No accidental pushes to wrong branches.

<InfinityDivider />

### Step 6: Update the Issue

After you merge the PR:

**Your prompt:**
```
"The PR is merged, please update the issue."
```

**What Claude Code does:**
- Updates the issue with:
  - ✅ Completed items with actual results and metrics
  - ❌ Not implemented items with honest explanations
  - Links to merged PR
  - Any discovered limitations or gotchas

For [Issue #96](https://github.com/BANCS-Norway/home/issues/96), this meant:
- ✅ 7 successful optimizations with before/after metrics
- ❌ 2 items not feasible (VitePress internals, GitHub Pages limitations)
- Complete explanation of *why* some things couldn't be done

**The magic:** The issue now reflects reality, not just plans. Future sessions read accurate state. When you return three months later, the issue tells you exactly what happened and why.

**The loop completes:** Issue updated, stalactite layer deposited, ready for the next problem.

## What This Workflow Actually Gives You

After using this workflow for six months, here's what changed:

**Before:** Features took 3-4 sessions to complete because I kept losing context. Documentation was always stale. I'd forget why I made decisions.

**After:** Features complete faster because context persists across sessions. Documentation updates automatically. Issues contain the complete story of what happened and why.

**What you're NOT doing anymore:**
✓ Manually writing comprehensive issue descriptions
✓ Fighting context limits mid-feature
✓ Manually drafting commit messages
✓ Updating documentation after the fact
✓ Remembering why you made a decision three months ago

**What you ARE doing:**
✓ Giving minimal prompts
✓ Reviewing batches (2 minutes each)
✓ Making decisions
✓ Staying in control

**Total prompts for a complex feature:** 6 core prompts + batch reviews
**Total documentation written by you:** Zero
**Context that survives across sessions:** Everything

## Why This Works for Solo Developers

Here's the reality of solo development:

**You're the only one who knows why.** Why you chose that approach. Why you skipped that optimization. Why you structured it this way. There's no team to fill in gaps, no pair programmer to remember details, no documentation team to capture decisions.

**You will get interrupted.** Phone call from a client. Meeting with a stakeholder. Life. When you return three days later, the context is gone. What were you working on? Where did you leave off? Why were you doing it that way?

**This workflow solves both problems:**

The GitHub Issue captures the "why" before you forget. The batched commits show incremental progress. The updated issue at the end documents what actually happened versus what you planned.

When you return three days later, you don't reconstruct context from git logs. You read the issue and continue exactly where you left off.

**The transformation:** You go from "solo developer drowning in context" to "solo developer with institutional memory." No hiring required.

## Try It Yourself (And Adapt It)

This workflow works for me. It might not work exactly the same way for you, and that's fine.

**Here's what I suggest:**

Pick your next small feature (1-2 hours of work). Try the 6 steps:

1. Ask Claude to create an issue
2. Start work in batches of 2-3 tasks
3. Review and commit each batch
4. Repeat until done
5. Push and create a PR (you, not Claude)
6. Update the issue after merge

**Notice what works. Notice what doesn't.**

Maybe you prefer larger batches. Maybe you don't need commit squashing. Maybe you work in a single session and don't need multi-session persistence. Maybe your commit messages are fine without the file list removal.

**Adapt the workflow to your needs.** The core principle stays the same: GitHub Issues as persistent memory, batches as checkpoints. But the details are yours to adjust.

**Start small.** See if the stalactite principle holds for your work. See if batches prevent context overload. See if issues actually save you time or just feel like overhead.

Then decide if it's worth it.

## Configuring Safe Boundaries

If you decide to use this workflow seriously, here's how I enforce strict safety:

I use `.claude/settings.local.json` to configure exactly what Claude can and cannot do:

```json
{
  "permissions": {
    "deny": [
      "Bash(git pull:*)",
      "Bash(git push:*)",
      "Bash(git fetch:*)"
    ],
    "ask": [
      "Bash(git restore:*)",
      "Bash(git commit:*)",
      "Bash(git reset:*)"
    ]
  }
}
```

**Deny array:** Claude will NEVER be allowed to run these commands, even if it tries.
- `git pull`, `git push`, and `git fetch` are completely blocked
- YOU control all interaction with the remote repository
- This prevents unexpected changes to/from remote
- Critical when running multiple parallel sessions. No accidental pushes from the wrong session.

**Ask array:** Claude must ask for permission before running these:
- `git restore` - Reverting changes should be deliberate
- `git commit` - You review before committing (batch checkpoint)
- `git reset` - Potentially destructive, requires confirmation

**The boundary:** Claude handles the mechanics (staging, branch management, PR descriptions). You make all the critical decisions (commit, push, restore, reset). You stay in complete control.

## What's Coming Next

You now have a workflow that turns Claude Code into a persistent, self-documenting development partner that survives context limits and session boundaries.

But I haven't told you about the most powerful part yet.

**Next post (November 25, 2025):** The moment I realized I could run multiple Claude Code instances in parallel. Each working on different issues, all sharing the same memory through GitHub.

When one Claude becomes many.

Meet **the Collective**.

---

**Attribution**: This blog post was co-written with [Claude](https://claude.ai) (Chat for ideation and outline, Code for assembly and refinement). The experiences, insights, and creative direction are human; the execution and polish are collaborative.

---

<SeriesNav
  :prev="{ text: 'Part 1: The Stalactite', link: '/blog/claude-code-stalactite' }"
  :next="{ text: 'Part 3: The Collective', link: '/blog/claude-code-collective' }"
/>

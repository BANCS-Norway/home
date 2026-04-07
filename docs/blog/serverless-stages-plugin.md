---
title: '31 Lines, 5 Years, and Finally: Open Source'
description: The serverless-stages-plugin has been silently protecting production
  deploys in a flood prediction system since March 2021. This is the story of extracting
  it, doing it properly, and giving it back.
date: 2026-03-25
readingTime: 6
tags:
- open-source
- serverless
- typescript
- npm
- testing
hero:
  image: /images/blog/serverless-stages-plugin/creation-of-adam.jpg
  alt: Michelangelo's Creation of Adam — two hands reaching toward each other, in
    black and white
  attribution:
    author: Michelangelo
    authorUrl: https://en.wikipedia.org/wiki/Michelangelo
    source: Wikimedia Commons
    sourceUrl: https://commons.wikimedia.org/wiki/File:%27Adam%27s_Creation_Sistine_Chapel_ceiling%27_by_Michelangelo_JBU33cut.jpg
    license: Public Domain
    licenseUrl: https://creativecommons.org/publicdomain/zero/1.0/
    modifications: Converted to grayscale and cropped
socialDate: '2026-04-12'
---

<BlogHeading />

<DisclaimerBox type="claude" />

In March 2021, I wrote a small Serverless Framework plugin. It was 31 lines of JavaScript, untyped, untested, and it lived inside `.serverless_plugins/` in a production API. I never thought much about it. It did its job. That was enough.

Five years later — 58 lines, strict TypeScript, 15 tests, and OIDC publishing — it lives at [`@bancs/serverless-stages-plugin`](https://www.npmjs.com/package/@bancs/serverless-stages-plugin) on npm.

This is the story of how a small guard plugin made its way out.

## The Problem

If you've worked with the Serverless Framework long enough, you've had a close call with stage deployments.

The Serverless Framework lets you deploy to any stage name you want. `sls deploy --stage prod`. `sls deploy --stage production`. `sls deploy`. It doesn't validate. It doesn't ask. It just deploys.

When you're managing a sensor network for a flood prediction system — with a `dev` environment and a `prod` environment and real sensor data flowing through the latter — the idea of an accidental deploy to the wrong stage, or to a stage that simply shouldn't exist, is not theoretical. It is a 2am incident waiting to happen.

## The Solution

The Serverless Framework has a plugin system, and plugins can hook into lifecycle events before a deploy starts. The idea was simple: declare an allowlist of valid stages in `serverless.yml`, and block the deploy before it starts if the current stage isn't on the list.

```yaml
plugins:
  - '@bancs/serverless-stages-plugin'

custom:
  stages:
    - dev
    - staging
    - prod
```

From that point on, `sls deploy --stage typo` throws immediately — before a single CloudFormation call is made. The deploy never starts. The system stays clean.

It works with Serverless Framework v2, v3, and v4 — no lockstep upgrades required.

31 lines of JavaScript. One thing. In five years, the logic has never changed.

## Why It Stayed Internal

The honest answer is: it didn't feel worth publishing.

It was small. It was obvious. Surely someone had already published something like this? And even if they hadn't, a 31-line internal file was quick to copy — not something that needed a proper package, a README, a release pipeline.

This kind of reasoning is how useful things stay trapped inside `.serverless_plugins/` folders for years.

The Serverless Framework community is built on exactly this kind of small, focused, composable plugin. The framework itself ships almost no opinions — it expects the ecosystem to provide them. A stage guard is a legitimate, reusable concern. Other teams have the same problem. And the cost of finding it on npm is much lower than writing it, discovering the edge cases, and maintaining it forever inside your own codebase.

It should have been published five years ago. It wasn't, because I was being pragmatic in the wrong direction.

## What Changed During Extraction

When I finally extracted the plugin, I used the opportunity to do it properly.

**Strict TypeScript.** The original was plain JavaScript. The extracted version uses strict TypeScript with minimal interfaces — no `any` casts, proper types throughout. Defining its own narrow interfaces rather than importing from the Serverless package is also what keeps it compatible across v2, v3, and v4.

**15 tests, all edge cases covered.** The original had none. The test suite covers valid stages, invalid stages, missing configuration, type edge cases, and the full range of ways the current stage can be resolved — CLI flag, provider config, or fallback.

**c8 coverage reporting.** Accurate coverage against compiled output, not just TypeScript source.

**OIDC npm publishing.** The `NPM_TOKEN` never touched GitHub secrets. The release workflow uses OpenID Connect to authenticate directly with npm — the same approach we use for everything we publish now.

## Giving Back

The Serverless Framework made it possible for a small team to build and operate production infrastructure at a scale that would have required significantly more people — and cost — without it. The plugin ecosystem, the offline tooling, the community around it: none of that was built by us.

We've been taking from that ecosystem for years. Publishing something this small — properly, with types and tests and a release pipeline — is one way to put things back. Our plan to give back to the community started with [taking stewardship of serverless-offline-sns](/blog/serverless-offline-sns-stewardship) earlier this year — a plugin nearly 10 years old that hundreds of teams depend on for local development. This is the next step.

## Get Involved

The plugin is published and actively maintained at [github.com/BANCS-Norway/serverless-stages-plugin](https://github.com/BANCS-Norway/serverless-stages-plugin).

If you use the Serverless Framework and you've been managing stage safety with manual checks, a shared convention, or nothing at all:

```bash
npm install --save-dev @bancs/serverless-stages-plugin
```

If you use the plugin:

- ⭐ Star the repository so others can find it
- 🐛 Report issues — edge cases you've hit in production are the most useful
- 💡 Submit pull requests — the contributor guide is there to help you

---

There's a version of this where the plugin stays internal forever, and we keep a comment in the codebase that says "this could probably be extracted." That version is easier. But the ecosystem doesn't get better from things that stay internal.

Small things done properly matter. Five years late is better than never.

---

*This post was written with assistance from [Claude](https://claude.ai) by Anthropic.*

---
title: Giving Back - Taking Stewardship of serverless-offline-sns
description: BANCS has formally taken over maintenance of serverless-offline-sns after nearly 10 years under its original author. Here's the full story of why we stepped up, what we found, and what we've done with it.
date: 2026-02-27
readingTime: 9
tags:
  - open-source
  - serverless
  - aws
  - community
  - stewardship
hero:
  image: /images/blog/serverless-offline-sns-stewardship.jpg
  alt: A lighthouse standing firm against crashing waves in black and white
  attribution:
    author: Gary Walker-Jones
    authorUrl: https://unsplash.com/@gwj72
    source: Unsplash
    sourceUrl: https://unsplash.com/photos/a-black-and-white-photo-of-waves-crashing-against-a-lighthouse-pwgUjijr71k
    license: Unsplash License
    licenseUrl: https://unsplash.com/license
    modifications: Converted to grayscale
---

<BlogHeading />

<DisclaimerBox type="claude" />

In October 2023, someone opened [Issue #184](https://github.com/BANCS-Norway/serverless-offline-sns/issues/184) on the `serverless-offline-sns` repository. The title was simply: **"Is it still maintained?"**

It sat open for over two years.

I was one of the people who could have written that question.

We'd been using `serverless-offline-sns` in one of our projects and had hit the SNS→SQS delivery bug — messages silently disappearing because of a faulty `Records` assumption in the message body. I had a fix sitting in a local branch. I'd been meaning to clean it up and submit a PR, because contributing back to open source was something I'd been wanting to make more time for.

When I finally went to the repository to do exactly that, I found something unexpected at the top of the README. Matthew was looking for a new maintainer.

For someone already looking for a way to give back, that wasn't a burden — it was an opportunity. I grabbed it.

That's what this post is about.

## What is serverless-offline-sns?

If you build serverless applications on AWS, you know the pain of local development. Deploying to AWS just to test an SNS event flow is slow and expensive. [`serverless-offline-sns`](https://github.com/BANCS-Norway/serverless-offline-sns) solves this by running a local SNS server that simulates AWS SNS and invokes your Lambda functions with real SNS event payloads—all on your machine, without touching AWS.

It integrates with the popular [`serverless-offline`](https://github.com/dherault/serverless-offline) plugin and supports topic subscriptions, message filtering, SQS delivery, HTTP endpoints, and more. It's the kind of tool that quietly disappears into your `package.json` and just works—until it doesn't, and you realise how much you depended on it.

## Nearly 10 Years of Work

[Matthew James](https://github.com/mj1618) built and maintained this plugin for almost a decade. That's a serious commitment. He kept it working through major shifts in the Serverless Framework ecosystem, AWS SDK evolutions, and countless edge cases reported by users across the community.

But here's the thing about open source burnout that doesn't get talked about enough: it's rarely about the workload. Matthew had moved on from the Serverless Framework stack in his day-to-day work. When you're no longer living in the tools yourself, the motivation to fix edge cases and triage issues from users who are fades fast. You stop feeling the pain they're describing. The pull requests start looking like abstract puzzles instead of real problems worth solving.

He wasn't being negligent. He was being human. When you don't use a thing anymore, caring deeply about it is hard—and pretending otherwise doesn't serve anyone.

When he reached out, he didn't just hand it over—he asked whether we actually wanted to take on such a big responsibility. It was a fair question. A decade-old plugin with an active user base isn't a small thing to inherit.

My answer was straightforward: our [lib.no](https://github.com/Liberalistene-Developers/lib.no) repository had accumulated 527 commits in 6 years. This plugin had 351 over nearly 9 years. We weren't going to be the bottleneck.

## What We Found

Matthew had built a solid foundation. The core of the plugin worked, and the architecture was sound. What we found wasn't bad code—it was a project that the ecosystem had moved around while no one was steering.

Serverless Framework v4 had been released, and the plugin crashed on startup with it. AWS was in the process of retiring Node.js 18 support. Dependencies had drifted. Community pull requests with genuine fixes were sitting unmerged. And without an automated release process, even if someone had been reviewing and merging, getting a fix out to users required manual intervention.

The codebase was a good starting point. It just needed someone paying attention again.

## Phase A: Stabilise First

Rather than modernising everything at once, we took a phased approach. Before touching Node versions or major dependencies, we needed to make the project safe to contribute to and release from.

### Contributor Infrastructure

A maintained project needs processes, not just code. We established the full contributor workflow in one focused effort:

- **CONTRIBUTING.md** — Clear guide for new contributors
- **PR description template** — Structured pull request format
- **Commitlint** — Enforced [Conventional Commits](https://www.conventionalcommits.org/) on every PR
- **Semantic PR title enforcement** — GitHub Actions check on PR titles
- **Semantic-release** — Automated versioning and npm publishing based on commit messages
- **All-contributors bot** — Proper recognition for everyone who contributes
- **OIDC-based npm publishing** — Replaced long-lived secrets with OpenID Connect tokens for more secure, auditable releases

This wasn't glamorous work. But without it, every fix is a manual one-off and every release is a risk.

### Code Quality

- **Strict TypeScript** — The tsconfig had `noImplicitAny: false` and most class members were typed as `any`. These were reasonable choices when the project started in 2017 and TypeScript was still maturing—but the ecosystem had long since moved on. We enabled strict mode throughout
- **ESLint with type-awareness** — `tslint` was the right tool when this project was created, but it was deprecated in 2019. We migrated to type-aware ESLint rules that actually enforce correctness
- **Test infrastructure** — Migrated from `nyc`/`ts-mocha` to `c8`/`mocha` for accurate TypeScript coverage reporting
- **LocalStack integration tests in CI** — Real integration tests against a local AWS stack running in GitHub Actions, not just unit tests against mocks

### Early Bug Fixes

With the foundation in place, we addressed the first round of real issues:

- **CloudFormation SQS routing** — `queueName` was not being passed through CloudFormation resource subscriptions, causing silent SNS→SQS routing failures (#135, #173)
- **Repo URLs and versioning** — Updated all repository references and corrected a version inconsistency that had crept into `package.json`
- **README cleanup** — Rewrote the README to reflect the current state of the project

## Phase B: Modernise

With the codebase stabilised and the release pipeline running, we tackled the dependency overhaul and the backlog of community-requested features.

### Dependency Modernisation

| Component | Before | After |
| --- | --- | --- |
| Node.js | 18/20 (AWS retiring 18) | **22+** |
| Serverless Framework v4 | crashed on startup | **fully supported** |
| Express | 4 | **5** |
| TypeScript | 5.3 (loose, `noImplicitAny: false`) | **5.9 (strict)** |
| `body-parser` | separate dep | **removed** (Express 5 built-in) |
| `shelljs` | — | **removed** |

### Bug Fixes

- **SQS envelope delivery** — The fix we'd originally come to submit. SNS envelope was not being delivered as `MessageBody` to SQS in non-raw mode, causing messages to silently disappear (#134)
- **CloudFormation Protocol:sqs** — Subscriptions now correctly route through `subscribeQueue` (#179)
- **Request body guard** — Added handling for `undefined` request body in the SNS server route handler, preventing crashes on malformed requests
- **Integration test cleanup** — Fixed flaky test teardown using detached process group kills

### New Features

- **HTTP delivery retry** — Configurable retry attempts and interval for HTTP subscriptions (#87)
- **`FilterPolicyScope MessageBody`** — Support for subscription filter policies scoped to the message body (#170)
- **`PublishBatch` / `PublishBatchCommand`** — Batch publishing support (#215)
- **Lambda SNS subscription protocol** — Direct Lambda subscriptions via the SNS protocol (#233)
- **`LambdaClient InvokeCommand`** — Migrated to the modern AWS SDK Lambda client (#210)

## The Bigger Picture

Issue #184 — "Is it still maintained?" — had answers, but they were from other confused users. No maintainer had responded. Over two years, that silence became the answer.

And yet, 45 contributors had put their time into this project. Bug fixes, features, documentation, edge cases they'd hit in production and cared enough to solve. That's not a dead project—that's a community that kept showing up even when the lights were off.

We don't think of this as charity. The serverless-offline-sns plugin is infrastructure that hundreds of teams depend on for local development. If it decays, those teams either ship broken code or pay the tax of always testing against real AWS. Neither is acceptable when a well-maintained local alternative exists.

Matthew built something worth sustaining over nearly 10 years of his own time, and 45 people cared enough to contribute to it. Carrying it forward is the right thing to do.

## What's Next

We're committed to keeping the plugin current with the Serverless Framework and AWS SDK ecosystems. The automated release pipeline means fixes and features ship without manual intervention. The contributor infrastructure means the project can accept help from the community, not just from us.

If there are issues you've been waiting on, now is a good time to check whether they've been resolved—and if not, to open a clear reproduction.

### Beyond This Plugin

This isn't a one-off. We actively use the Serverless ecosystem and plan to contribute pull requests to other plugins when we see clear value to deliver—bug fixes, modernisation, features that are missing and shouldn't be.

And if we encounter other plugins in the same situation as this one—stale, but still relied on by real teams—we're open to stepping up there too. Not every valuable plugin needs to die because its original author moved on. Sometimes it just needs someone who still lives in the stack to say yes.

If you maintain a Serverless-related plugin and are looking for a way out, or if you're a user of something that's gone quiet and you think is worth saving, [reach out](https://bancs.no/contact).

## Get Involved

The plugin is actively maintained at [github.com/BANCS-Norway/serverless-offline-sns](https://github.com/BANCS-Norway/serverless-offline-sns).

If you use the plugin:

- ⭐ Star the repository so others can find it
- 🐛 Report issues — clear reproduction cases help enormously
- 💡 Submit pull requests — the contributor guide is there to help you
- 📣 Tell other serverless developers it's actively maintained again

Open source works when people show up. We did. We'd love company.

---

*This post was written with assistance from [Claude](https://claude.ai) by Anthropic.*

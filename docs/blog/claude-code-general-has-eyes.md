---
title: The General Has Eyes
subtitle: Part 6 of The Claude Code Chronicles
description: Claude Chat designs the missions. Claude Code executes them. Until now, they couldn't actually see each other. This is the post about building the bridge — a TMUX MCP server — and the security compromise it forced along the way.
date: 2026-04-23
socialDate: '2026-04-23'
readingTime: 10
tags:
  - claude-code
  - mcp
  - tmux
  - methodology
  - open-source
hero:
  image: /images/blog/chronicles/pexels-reflectivepath-26347133.jpg
  alt: A narrow road bridging two pieces of land over open water — the Atlantic Ocean Road in Norway
  attribution:
    author: Peter B
    authorUrl: https://www.pexels.com/@reflectivepath/
    source: Pexels
    sourceUrl: https://www.pexels.com/photo/road-passing-through-a-river-26347133/
    license: Pexels License
    licenseUrl: https://www.pexels.com/license/
---

<BlogHeading />

<DisclaimerBox type="claude" />

For six months, the two-mode methodology had a quiet gap in the middle.

Claude Chat is where I think. Strategy, architecture, the shape of a missing feature, the trade-offs of a refactor — all of that happens in a long conversation with a model that is good at holding context and asking uncomfortable questions. Claude Code is where things actually get built. Sessions run inside tmux panes, branches get cut, commits get made, tests either pass or don't. Two brains, two roles, and between them a shared understanding of the project that lives inside GitHub issues.

That understanding was always asymmetric. Claude Code reads the issues. Claude Code writes the issues. Claude Code knows what it's doing because the stalactite of accumulated decisions drips down into every new session. Claude Chat, meanwhile, issues orders into the void. "Have Hunter start on #323." "Tell Tech to check the auth flow." And then — silence. No way to see whether the clone was stuck, finished, off on a tangent, or sitting at 306k tokens and begging to be cleared.

The General was commanding a battlefield he couldn't see.

## The Missing Link

The Stalactite Principle, from [Part 1](/blog/claude-code-stalactite), works because every session deposits knowledge downward. Issues turn into comments, comments turn into decisions, decisions turn into commits. A new session reads the stalactite and inherits the work.

But stalactites are history. They tell you what was true when the last drop landed. They don't tell you what's happening **right now**, inside a running terminal, in a conversation that is already halfway through its context window.

Parallelism came next — [Part 3](/blog/claude-code-collective) laid out how multiple Claude Code sessions can work the same repo at once, and [the Bad Batch](/upcoming?issue=311) gave each session a named identity to keep them straight. Three clones in three worktrees, three conversations each dripping into its own stalactite, all feeding the same repository.

Most of the time, that runs on its own. Each clone has its pane, the stalactite carries context across sessions, and Chat isn't in the loop. The friction shows up at the edges: when a clone gets wedged, or when a strategic call needs a second brain. That's when I'd bring Chat in — describe the pane's state to it by hand, listen to the recommendation, decide what to do with it, type the decision back into the clone's terminal. Not every day. But often enough to notice the cost, and — more to the point — the asymmetry. Chat could talk to me. It couldn't see the clones, and it couldn't speak to them.

## FastMCP and the Security Compromise

The obvious fix was an MCP server. Specifically: a server that Claude Chat could call, that would reach into my tmux sessions, read what the panes were showing, and — when needed — send a new prompt into a specific pane.

Why tmux? Because tmux is what stops me from losing work. Every Claude Code session I run is a pane inside a tmux window, and has been long before any of this was on the table — if Code crashes, if my terminal dies, if I close the laptop, the pane keeps running, holds its scrollback, and is waiting exactly where I left it when I reattach. That resilience was already load-bearing in my day. Putting MCP on top of it meant I was reading from something that survives the things that normally lose context, not something fragile I'd have to nurse.

The other half of the answer is that tmux ships the two primitives I needed and nothing else. `capture-pane` dumps any pane's visible history as plain text. `send-keys` injects keystrokes into a pane from outside. No screen-scraping, no accessibility APIs, no daemon to stand up. The pane is the state; tmux is a thin, stable shell over both reading and writing it. Every MCP call is one subprocess away from the thing I actually wanted to know or do.

Three tools were enough:

- `list_sessions` — which clones are alive, and on which panes.
- `get_summary` — the last N lines from a pane, so Chat can read the current state.
- `send_prompt` — type a message into a pane and press enter.

[FastMCP](https://gofastmcp.com) handles the protocol. The business logic is maybe two hundred lines of Python wrapping `tmux list-sessions`, `tmux capture-pane`, and `tmux send-keys`. A clone and I built it in a single afternoon.

The plan had one more piece, and it was the piece I cared about: the whole thing would live behind Tailscale. Bound to `127.0.0.1`. Reachable only from machines already inside the VPN. No public surface, no authentication at the MCP layer, no OAuth dance — just network isolation doing what network isolation does well. The right way.

Anthropic had other ideas.

Claude's MCP integration — the mechanism that lets Claude Chat talk to a custom MCP server — requires a public endpoint with authentication. No Tailscale tunnels, no private networks, no "it's fine, the network is the firewall". The server has to live on the open internet, and it has to speak OAuth.

So the security model inverted. Instead of "nobody can reach it," I ended up with "anyone can reach it, but they need to prove who they are." Tailscale didn't leave — it just changed jobs. Their [Funnel](https://tailscale.com/kb/1223/funnel) beta gave me public HTTPS for free: server bound to `127.0.0.1`, Funnel terminating TLS and forwarding traffic in from the open internet. No certificate pipeline, no reverse proxy to babysit. The Tailscale-as-security-boundary plan is gone; the Tailscale-as-friendly-infrastructure role quietly replaced it. But the MCP server now has to stand on its own — exposed, in public, with auth as the only thing between it and everyone else.

The VPN approach was safer. Auth is not a worse security model — done right, it is just as good — but it **loads the whole weight of the thing onto the auth layer**. If OAuth is misconfigured, or the token cache leaks, or a scope is too broad, the shield is gone. With Tailscale, a misconfiguration wouldn't have mattered, because nobody outside the VPN could have reached it. "Public endpoint with auth" is a perfectly defensible default for most people, but for anyone already running their infrastructure behind a VPN, forcing a public surface removes an entire layer of defense in depth — and does so silently, as a requirement of the integration rather than a configurable choice.

## What We Discovered Along the Way

The internet scanner problem is real, and it is immediate.

Within minutes of the MCP server going public, the logs started filling with probes. Requests for `twint_ch.js`. For `.known_hosts`. For `robots.txt`, `/.env`, `/.git/config`, `/phpmyadmin`. Random IPs walking the standard attack surface, hoping to find something misconfigured. The auth wall held — every probe bounced off the OAuth layer with a 401 — but the exposure is undeniable. One of those IPs hammered the server with twenty-plus unauthenticated requests in a handful of seconds, which turned into the first issue filed on the new repo: [whitelist + freeze-list protection](https://github.com/BANCS-Norway/tmux-mcp/issues/1). Authenticated IPs bypass rate limiting; unauthenticated IPs that exceed a threshold get auto-frozen. Not glamorous. Necessary. An unauthenticated server in that position would not have lasted the hour.

A Cloudflare tunnel sits on the roadmap as a reasonable next layer — not as a replacement for Funnel, but as a hardening step in front of it. Funnel is beta, its DDoS posture is whatever Tailscale chooses to make it, and Cloudflare would add a real WAF and edge-level filtering for free. The server would still stay on `127.0.0.1`. The gains would be in the fabric around it, not the exposure surface itself.

GitHub OAuth turned out to be the right auth layer. FastMCP has built-in support: point it at a GitHub OAuth app, tell it which orgs or users are allowed, and you get the full handshake — discovery, client registration, authorization, token exchange, scope enforcement — playing out in the server logs like a textbook OAuth 2.0 flow. Zero custom auth code. Zero password storage. The identity model is "does GitHub know who you are, and are you me?" — which, for a personal tool, is exactly right.

The refresh token was the detail that almost killed it. On the first few tries, the connection would work beautifully for a few minutes and then die silently. Reconnect, same thing. The access token was expiring, and without a refresh token the client had no way to get a new one — it just gave up. Adding `offline_access` to the OAuth scopes fixed it. Small detail, huge UX impact: the difference between "I have to re-authorise every ten minutes" and "it just works for weeks."

And then, the unexpected benefit. Because the server is now on the public internet with OAuth, I can reach it **from anywhere**, on any device, without a VPN client. My laptop in a café. My phone on the train. A browser on a borrowed machine. The compromise I didn't want — going public instead of staying behind Tailscale — accidentally bought me full mobility. The same design choice that expanded the attack surface also expanded the useful surface. Whether that trade is worth it depends on the tool. For this one, watching my clones from the bus seat while reviewing a PR, it turned out to be worth it.

## The Discovery Moment

Nothing about this landed cleanly the first time. The interesting part is **how** we got it unstuck.

The first attempt returned `403` on every request. The MCP spec and FastMCP's OAuth helper disagreed, subtly, about where the bearer token was supposed to live in the envelope — a mismatch that is invisible from the docs and only becomes obvious when you actually read the code. Which is exactly what happened: the clone read the FastMCP source, found the disagreement, pointed at it, and fixed it. Minutes, not days. This is the thing I keep underestimating about the methodology — the clone can read an upstream library's source as casually as I can read a README, and that collapses debugging time in a way that still surprises me.

The second bug was stateless restarts. The server would work for one session, die between requests, and then refuse to accept any new connection because the OAuth state it expected had evaporated. The fix was to move the session state out of memory and into something persistent. Not a heroic refactor. But the kind of thing you find only by running the system, not by reading the docs.

And then, the first successful call. Claude Chat, in a browser tab, called `get_summary` on my Tech clone's session. The response came back — the last forty lines of what Tech had been doing, in plain text. The file it had just read. The grep it had just run. The sentence it had just typed to me. Live. Readable. Directly from the pane, round-tripped through OAuth, landing in the other brain's hands.

The architecture clicked into place in a way I hadn't expected. Chat was no longer shouting into a void.

## What This Actually Unlocks

The General has eyes.

Concretely, that means:

- **Chat reads live session state before advising.** No more "I don't know what Tech is doing right now" — Chat can look. The advice is grounded in what actually happened in the last thirty seconds, not a reconstruction of what should have happened.
- **Chat sends precise prompts to workers.** No more me copy-pasting. Chat drafts, Chat delivers, Chat watches the response land. I'm out of the router role.
- **Cross-session triage.** Three clones running, one is wedged, two are productive. Chat reads all three, picks the stuck one, injects a course correction. Takes seconds. Used to take me minutes of context-switching.
- **Continuity across strategy and execution.** The gap that used to exist — Chat's plan, my typing hand, Code's execution — is gone. Plan and execution now live in the same conversation, seen by the same brain.

## The Workflow Pattern

The specific pattern I've leaned on most so far is context hygiene at a distance.

I'll be working in Chat on something else entirely — sketching a new feature, talking through a tricky architectural choice — and Chat will casually note that Tech's token count on issue #323 is at 306k and climbing, and that the last few turns have been unproductive loops around the same file. Without me asking. Chat just **knows**, because Chat can see.

The fix, when it goes, is surgical: `send_prompt` with `/clear`, followed by a fresh, focused prompt summarising the state from the issue work log. Tech comes back from `/clear` with a clean context window, pointed at exactly the thing it was about to find before it lost the thread. I didn't touch Tech's terminal. I didn't even look at it.

Scale that up to three sessions during a morning standup with myself. Chat scans all of them, tells me which one is stuck, which one is close to a commit, which one is drifting. I ask questions. Chat answers from the pane output. We pick the one that needs attention. It is the closest I've been to a real command centre, and it works.

## The Stalactite Connection

[Part 1](/blog/claude-code-stalactite) argued that GitHub issues are persistent memory — the stalactite, dripping down through time, load-bearing across sessions. That still holds. The issues are the **history**.

What was missing was a heartbeat. A way to feel the current moment across sessions the same way the issues let you feel the accumulated past.

tmux turned out to be the nervous system. Every running Claude Code session is a pane. Every pane is a stream of live state. And MCP is the bridge that lets the architect brain feel those streams in real time.

Put together:

- **Issues** → persistent memory, the stalactite, the load-bearing past.
- **tmux + MCP** → live nervous system, the pulse, the load-bearing present.

Full situational awareness across both. The Stalactite Principle wasn't wrong — it was half the picture. The other half is the heartbeat.

## What's Next

Observation is the easy part. The harder — and more interesting — frontier is **active orchestration**.

Right now, Chat mostly reads and occasionally intervenes. The next step is Chat that routes. Clone A finishes early, Chat reallocates the next task. Clone B is blocked, Chat pulls the unblocking piece from the backlog and hands it to Clone C. The MCP surface already supports it. It's a matter of prompting and patterns, not plumbing.

There's a double irony I want to name before I close.

The first irony is that this is something Anthropic will almost certainly build natively. A first-class way for Claude Chat to see and talk to Claude Code sessions — their own product, their own surface, done properly. It will obsolete this MCP server the day it ships. I will retire it happily. That is the right outcome. We built this because we were tired of waiting, not because we believed we were the right people to own it forever.

The second irony is closer to the bone. Six months ago, I tried to ship my first MCP tool — [claude_session_coordinator](https://github.com/BANCS-Norway/claude_session_coordinator), aimed at the memory hole — and failed. [That's a post of its own, coming up](/upcoming?issue=324), but the one-line lesson is this: **an MCP tool pays rent in the context window, every turn it's connected**. That one cost too much. This one was designed, from the first line, to be as small as it could possibly be while still doing the one useful thing — three tools, thin payloads, no stored state. Four hours from idea to live server, and the single most immediately useful thing in the entire methodology. The first attempt wasn't wasted. It was the post that taught me how much an MCP tool is allowed to cost.

That's the lesson I keep relearning in this series. The stalactite grows one drop at a time. So do I.

The General has eyes. For now, at least, that's enough.

---

*Postscript: as I was making these final edits, Chat was reading the draft through `get_summary`, disagreed with a cut I'd made — the series-closing couplet about the stalactite growing one drop at a time — and sent the correction back into my terminal via `send_prompt`. The tool reviewing the tool, in the middle of the post about the tool. I restored the line.*

---

**Attribution**: This blog post was co-written with [Claude](https://claude.ai) (Chat for ideation and outline, Code for assembly and refinement). The experiences, insights, and creative direction are human; the execution and polish are collaborative. The underlying MCP server is open source at [github.com/BANCS-Norway/tmux-mcp](https://github.com/BANCS-Norway/tmux-mcp).

---

<SeriesNav
  :prev="{ text: 'Series Overview', link: '/blog/claude-code-chronicles' }"
  :next="{ text: 'Series Overview', link: '/blog/claude-code-chronicles' }"
/>

#!/usr/bin/env python3
"""
Local dry-run for the social-schedule CI pipeline.

Usage:
    python3 scripts/test-social-schedule.py <path-to-blog-post.md> [--date YYYY-MM-DD]

Runs both Claude prompts (social content + carousel slides), assembles the
LinkedIn post, and generates the carousel PDF. Writes artefacts to /tmp/ and
pretty-prints everything to stdout. Does NOT touch Publer.

Date resolution (highest priority wins):
  1. --date flag (explicit override)
  2. socialDate frontmatter field, if it is in the future
  3. Today's date
"""

import argparse
import datetime
import json
import os
import re
import string
import subprocess
import sys
import textwrap
from pathlib import Path

import yaml

REPO_ROOT    = Path(__file__).resolve().parent.parent
PROMPTS_DIR  = REPO_ROOT / "scripts" / "prompts"

# ── Helpers ────────────────────────────────────────────────────────────────────

def hr(label=""):
    width = 72
    if label:
        print(f"\n{'─' * 4} {label} {'─' * (width - len(label) - 6)}\n")
    else:
        print("─" * width)


def run_claude(prompt: str, allowed_tools: str = "Read,Write") -> str:
    """Invoke `claude -p` with the given prompt. Returns stdout."""
    result = subprocess.run(
        ["claude", "-p", prompt, "--allowedTools", allowed_tools],
        capture_output=True,
        text=True,
        cwd=REPO_ROOT,
    )
    if result.returncode != 0:
        print(f"[claude stderr]\n{result.stderr}", file=sys.stderr)
        raise SystemExit(f"Claude exited with code {result.returncode}")
    return result.stdout


# ── Step 1: Parse frontmatter ──────────────────────────────────────────────────

def parse_post(blog_file: Path):
    raw = blog_file.read_text()
    parts = raw.split("---\n", 2)
    if len(parts) < 3:
        raise SystemExit("ERROR: No frontmatter found in post.")

    fm = yaml.safe_load(parts[1])
    content = parts[2]

    title    = fm.get("title", "")
    date     = str(fm.get("socialDate") or fm.get("date", ""))
    subtitle = fm.get("subtitle", "")
    hero     = fm.get("hero", {}) or {}
    hero_attribution = (hero.get("attribution") or {}).get("author", "")
    tags     = fm.get("tags", []) or []
    hero_image_url   = hero.get("image") or ""
    hero_image_path  = (REPO_ROOT / "docs/public").joinpath(hero_image_url.lstrip("/")) \
                       if hero_image_url.startswith("/") else Path("")

    related = fm.get("relatedArticles", []) or []
    related_links = "\n".join(
        f"* {a.get('title', '')}: https://www.bancs.no{a.get('url', '')}"
        for a in related if a.get("title") and a.get("url")
    )

    # SeriesNav
    prev_title = prev_url = next_title = next_url = ""
    nav_match = re.search(r"<SeriesNav([^/]*)/>\s*", content, re.DOTALL)
    if nav_match:
        nav_str = nav_match.group(1)
        prev_m = re.search(r':prev="[^"]*text:\s*[\'"](.+?)[\'"][^"]*link:\s*[\'"](.+?)[\'"]', nav_str)
        next_m = re.search(r':next="[^"]*text:\s*[\'"](.+?)[\'"][^"]*link:\s*[\'"](.+?)[\'"]', nav_str)
        if prev_m:
            prev_title, prev_url = prev_m.group(1), "https://www.bancs.no" + prev_m.group(2)
        if next_m:
            next_title, next_url = next_m.group(1), "https://www.bancs.no" + next_m.group(2)

    # Strip Vue components for Claude
    clean = re.sub(r"<[A-Z][^\n>]*/>\s*", "", content)
    clean = re.sub(r"<[A-Z][^>]*>.*?</[A-Z][^>]*>", "", clean, flags=re.DOTALL)
    clean = clean.strip()

    slug = blog_file.stem
    url  = f"https://www.bancs.no/blog/{slug}"

    return {
        "title": title,
        "date": date,
        "subtitle": subtitle,
        "hero_attribution": hero_attribution,
        "hero_image_path": str(hero_image_path) if hero_image_path.suffix else "",
        "prev_title": prev_title,
        "prev_url": prev_url,
        "next_title": next_title,
        "next_url": next_url,
        "has_related": bool(related_links),
        "related_links": related_links,
        "tags": tags,
        "tags_str": ", ".join(tags),
        "url": url,
        "clean_content": clean,
    }


# ── Step 2 & 3: Load prompts from files ───────────────────────────────────────

def load_prompt(name: str, **vars) -> str:
    """Read a prompt template from scripts/prompts/ and substitute $VARS."""
    tmpl = (PROMPTS_DIR / name).read_text()
    return string.Template(tmpl).substitute(**vars)


# ── Step 4: Assemble LinkedIn post ────────────────────────────────────────────

def assemble_linkedin(meta: dict, linkedin_body: str, hashtags: list) -> str:
    parts = [linkedin_body.strip()]

    series_links = []
    if meta["prev_title"] and meta["prev_url"]:
        series_links.append(f"* {meta['prev_title']}: {meta['prev_url']}")
    if meta["next_title"] and meta["next_url"]:
        series_links.append(f"* {meta['next_title']}: {meta['next_url']}")
    if series_links:
        parts.append("Catch up on the series:\n\n" + "\n".join(series_links))

    if meta["has_related"] and meta["related_links"]:
        parts.append("Did you like this topic? Read more about it in these articles:\n\n" + meta["related_links"])

    parts.append(" ".join(f"#{tag.lstrip('#')}" for tag in hashtags))
    return "\n\n".join(parts)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Local dry-run for the social-schedule CI pipeline."
    )
    parser.add_argument("post", type=Path, help="Path to the blog post .md file")
    parser.add_argument(
        "--date",
        metavar="YYYY-MM-DD",
        help="Override the post date (default: today, or socialDate if it is in the future)",
    )
    args = parser.parse_args()

    blog_file = args.post.resolve()
    if not blog_file.exists():
        raise SystemExit(f"File not found: {blog_file}")

    date_override = datetime.date.fromisoformat(args.date) if args.date else None

    print(f"Testing social schedule pipeline for: {blog_file.name}")
    hr()

    # ── Parse ──────────────────────────────────────────────────────────────────
    print("Parsing frontmatter...")
    meta = parse_post(blog_file)

    # Smart date resolution
    today = datetime.date.today()
    if date_override:
        resolved_date = date_override
        date_source = "--date flag"
    else:
        social_date_raw = meta["date"]
        social_date = datetime.date.fromisoformat(social_date_raw) if social_date_raw else None
        if social_date and social_date > today:
            resolved_date = social_date
            date_source = "socialDate (future)"
        else:
            resolved_date = today
            date_source = "today (default)"
    meta["date"] = str(resolved_date)

    print(f"  Title : {meta['title']}")
    print(f"  Date  : {meta['date']}  [{date_source}]")
    print(f"  URL   : {meta['url']}")
    if meta["hero_image_path"]:
        print(f"  Hero  : {meta['hero_image_path']}")
    if meta["tags"]:
        print(f"  Tags  : {meta['tags_str']}")

    Path("/tmp/post_content.md").write_text(meta["clean_content"])
    Path("/tmp/related_links.txt").write_text(meta["related_links"])
    print("  → /tmp/post_content.md written")

    # ── Social content ─────────────────────────────────────────────────────────
    hr("1/3  Generating social content")
    prompt = load_prompt("social-content.txt", TITLE=meta["title"], DATE=meta["date"], URL=meta["url"])
    run_claude(prompt)

    if not Path("/tmp/claude-output.json").exists():
        raise SystemExit("Claude did not write /tmp/claude-output.json")

    with open("/tmp/claude-output.json") as f:
        social = json.load(f)

    required = {"linkedin_body", "twitter", "instagram_body", "instagram_hashtags"}
    missing = required - social.keys()
    if missing:
        raise SystemExit(f"Missing keys in claude-output.json: {missing}\n{json.dumps(social, indent=2)}")

    # Assemble instagram text: body + blank line + hashtags on separate lines
    instagram_text = social["instagram_body"].strip() + "\n\n" + "\n".join(
        f"#{tag.lstrip('#')}" for tag in social["instagram_hashtags"]
    )
    social["instagram"] = instagram_text

    print("  → /tmp/claude-output.json validated")

    # ── Carousel slides ────────────────────────────────────────────────────────
    hr("2/3  Generating carousel slides")
    prompt = load_prompt("carousel-slides.txt", TITLE=meta["title"], URL=meta["url"], HERO_ATTRIBUTION=meta["hero_attribution"], TAGS=meta["tags_str"] or "(none)")
    run_claude(prompt)

    if not Path("/tmp/carousel-slides.json").exists():
        raise SystemExit("Claude did not write /tmp/carousel-slides.json")

    with open("/tmp/carousel-slides.json") as f:
        slides = json.load(f)

    if not (slides.get("template") and slides.get("head") and slides.get("pages") and slides.get("tail")):
        raise SystemExit(f"Unexpected structure in carousel-slides.json:\n{json.dumps(slides, indent=2)}")

    print(f"  → /tmp/carousel-slides.json validated ({len(slides['pages'])} content pages, template: {slides['template']})")

    # ── PDF ────────────────────────────────────────────────────────────────────
    hr("3/3  Generating carousel PDF")
    env = {**os.environ, "HERO_IMAGE_PATH": meta["hero_image_path"]}
    result = subprocess.run(
        ["npx", "tsx", "scripts/carousel/generate.ts"],
        capture_output=True, text=True, cwd=REPO_ROOT, env=env,
    )
    if result.returncode != 0:
        print(f"[generate.ts stderr]\n{result.stderr}", file=sys.stderr)
        raise SystemExit("PDF generation failed")
    print(f"  {result.stdout.strip()}")

    # ── Assemble LinkedIn ──────────────────────────────────────────────────────
    linkedin_post = assemble_linkedin(meta, social["linkedin_body"], social["instagram_hashtags"])
    Path("/tmp/linkedin_post.txt").write_text(linkedin_post)

    # ── Validate output ────────────────────────────────────────────────────────
    hr("4/4  Validating output")
    run_claude((PROMPTS_DIR / "validate-output.txt").read_text(), allowed_tools="Read,Write")

    if not Path("/tmp/validation-report.json").exists():
        print("  WARNING: Claude did not write /tmp/validation-report.json — skipping validation")
        report = None
    else:
        with open("/tmp/validation-report.json") as f:
            report = json.load(f)

        STATUS_ICON = {"pass": "✓", "warn": "!", "fail": "✗"}
        overall_icon = STATUS_ICON.get(report.get("overall", ""), "?")
        print(f"  Overall: {overall_icon}  {report.get('overall', '?').upper()}")
        print()

        for key, check in report.get("checks", {}).items():
            icon = STATUS_ICON.get(check.get("status", ""), "?")
            extras = ""
            if "char_count" in check:
                extras += f"  {check['char_count']} chars"
            if "hashtag_count" in check:
                extras += f"  {check['hashtag_count']} hashtags"
            if "page_count" in check:
                extras += f"  {check['page_count']} pages"
            print(f"  {icon}  {key:<20} {extras}")
            if check.get("notes"):
                print(f"       {textwrap.shorten(check['notes'], 65)}")

        suggestions = report.get("suggestions", [])
        if suggestions:
            print()
            print("  Suggestions:")
            for s in suggestions:
                print(f"    → {textwrap.fill(s, 68, subsequent_indent='      ')}")

        print()
        print(f"  {report.get('summary', '')}")

    # ── Pretty-print outputs ───────────────────────────────────────────────────
    hr("TWITTER / X")
    print(textwrap.fill(social["twitter"] + " " + meta["url"], width=72))
    print(f"\n({len(social['twitter'])} chars, {len(social['twitter'] + ' ' + meta['url'])} with URL)")

    hr("INSTAGRAM (carousel caption)")
    print(textwrap.fill(social["instagram"], width=72))
    print(f"\n({len(social['instagram'])} chars)")

    hr("CAROUSEL SLIDES  →  /tmp/carousel-slides.json")
    print(f"Template  : {slides['template']}")
    print(f"Head      : {slides['head']['title']!r}")
    print(f"Caption   : {slides['head']['caption']!r}")
    print()
    for i, page in enumerate(slides["pages"], 1):
        print(f"  Slide {i}  [{page.get('eyebrow', '')}]")
        print(f"           {page.get('title', '')!r}")
        print(f"           {textwrap.shorten(page.get('body', ''), 60)!r}")
    print()
    print(f"Tail      : {slides['tail']['title']!r}")
    print(f"Thanks    : {slides['tail'].get('thanks', '')!r}")

    hr("LINKEDIN POST  →  /tmp/linkedin_post.txt")
    print(linkedin_post)

    hr()
    print("Artefacts written:")
    for path in ["/tmp/post_content.md", "/tmp/claude-output.json",
                 "/tmp/carousel-slides.json", "/tmp/carousel.pdf",
                 "/tmp/linkedin_post.txt", "/tmp/validation-report.json"]:
        size = Path(path).stat().st_size if Path(path).exists() else 0
        print(f"  {path}  ({size:,} bytes)")


if __name__ == "__main__":
    main()

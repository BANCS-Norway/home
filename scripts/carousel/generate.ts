/**
 * Carousel PDF generator — CI entry point.
 *
 * Reads:
 *   /tmp/carousel-slides.json  — structured slide content from Claude
 * Env:
 *   HERO_IMAGE_PATH            — filesystem path to hero image (relative to cwd)
 * Writes:
 *   /tmp/carousel.pdf
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { generate } from '@pdfme/generator';
import { text, image, rectangle } from '@pdfme/schemas';
import { buildFont, buildTemplate, buildInput } from './builder.js';
import type { SlideData } from './builder.js';

interface CarouselSlides {
  template: string;
  head:     Record<string, string>;
  pages:    Record<string, string>[];
  tail:     Record<string, string>;
}

const slides: CarouselSlides = JSON.parse(readFileSync('/tmp/carousel-slides.json', 'utf-8'));

// Dynamically import the selected template by name
const mod = await import(`./templates/${slides.template}.js`);
const def = mod.default;

// Load and base64-encode the hero image
const heroImagePath = process.env.HERO_IMAGE_PATH ?? '';
let heroImage = '';
if (heroImagePath) {
  const ext = heroImagePath.split('.').pop()?.toLowerCase() ?? 'png';
  const mime = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : 'image/png';
  heroImage = `data:${mime};base64,${readFileSync(resolve(heroImagePath)).toString('base64')}`;
}

// Slide count drives tag field and template schema
const totalSlides = 2 + slides.pages.length; // head + N content + tail

const data: SlideData = {
  head:  { ...slides.head,  image: heroImage,  tag: `1 / ${totalSlides}` },
  pages: slides.pages.map((p, i) => ({ ...p,  tag: `${i + 2} / ${totalSlides}` })),
  tail:  { ...slides.tail,                     tag: `${totalSlides} / ${totalSlides}` },
};

const pdf = await generate({
  template: buildTemplate(def, slides.pages.length),
  inputs:   [buildInput(def, data)],
  options:  { font: buildFont(def) },
  plugins:  { text, image, rectangle },
});

const out = '/tmp/carousel.pdf';
writeFileSync(out, pdf);
console.log(`Carousel PDF written: ${out} (${pdf.length} bytes, ${totalSlides} slides)`);

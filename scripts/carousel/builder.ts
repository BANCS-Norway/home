/**
 * Carousel Builder
 *
 * Assembles pdfme templates and inputs from declarative CarouselTemplate definitions.
 * Template files are pure data. This module owns all logic.
 *
 * Font resolution order for buildFont():
 *   1. f.path supplied → use that path (relative to cwd or absolute)
 *   2. f.name in KNOWN_FONTS → resolve from scripts/carousel/fonts/
 *   3. Neither → throw with a helpful message
 *
 * To add a new known font:
 *   1. Add the download entry to install-fonts.ts
 *   2. Run: npx tsx scripts/carousel/install-fonts.ts
 *   3. Commit the TTF file from scripts/carousel/fonts/
 *   4. Register it here: 'FontName': 'filename.ttf'
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, PDFName, PDFString } from 'pdf-lib';
import type { Template } from '@pdfme/common';
import type { CarouselTemplate, FieldDef } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR  = resolve(__dirname, 'fonts');

// ---------------------------------------------------------------------------
// Known fonts registry — TTF files committed to scripts/carousel/fonts/
// ---------------------------------------------------------------------------

const KNOWN_FONTS: Record<string, string> = {
  'Inter':        'Inter-Regular.ttf',
  'Inter-Bold':   'Inter-Bold.ttf',
  'Inter-Medium': 'Inter-Medium.ttf',
};

// ---------------------------------------------------------------------------
// buildFont
// ---------------------------------------------------------------------------

export function buildFont(def: CarouselTemplate): Record<string, { data: Buffer; fallback: boolean }> {
  const font: Record<string, { data: Buffer; fallback: boolean }> = {};

  for (const f of def.fonts) {
    let fontPath: string;

    if (f.path) {
      fontPath = resolve(f.path);
    } else if (KNOWN_FONTS[f.name]) {
      fontPath = resolve(FONTS_DIR, KNOWN_FONTS[f.name]);
    } else {
      throw new Error(
        `Font "${f.name}" is not a known font and no path was provided.\n` +
        `Known fonts: ${Object.keys(KNOWN_FONTS).join(', ')}\n` +
        `Run npx tsx scripts/carousel/install-fonts.ts to install known fonts, or supply a path.`
      );
    }

    if (!existsSync(fontPath)) {
      throw new Error(
        `Font file not found: ${fontPath}\n` +
        `Run npx tsx scripts/carousel/install-fonts.ts to install known fonts.`
      );
    }

    font[f.name] = { data: readFileSync(fontPath), fallback: f.fallback };
  }

  return font;
}

// ---------------------------------------------------------------------------
// buildTemplate — assemble a pdfme template for contentCount content slides
// ---------------------------------------------------------------------------

export function buildTemplate(def: CarouselTemplate, contentCount: number): Template {
  const { W, H } = def.dimensions;

  function prefixSchema(fields: FieldDef[], prefix: string) {
    return fields.map(f => ({ ...f, name: `${prefix}_${f.name}` }));
  }

  const schemas = [
    prefixSchema(def.head, 'head'),
    ...Array.from({ length: contentCount }, (_, i) =>
      prefixSchema(def.page, `page_${i + 1}`)
    ),
    prefixSchema(def.tail, 'tail'),
  ];

  return {
    basePdf: { width: W, height: H, padding: [0, 0, 0, 0] as [number, number, number, number] },
    schemas,
  };
}

// ---------------------------------------------------------------------------
// buildInput — assemble a single pdfme input record from structured slide data
// ---------------------------------------------------------------------------

export interface SlideData {
  head: Record<string, string>;
  pages: Record<string, string>[];
  tail: Record<string, string>;
}

export function buildInput(def: CarouselTemplate, { head, pages, tail }: SlideData): Record<string, string> {
  const input: Record<string, string> = {};

  for (const field of def.head) {
    input[`head_${field.name}`] = head[field.name] ?? '';
  }

  pages.forEach((page, i) => {
    for (const field of def.page) {
      input[`page_${i + 1}_${field.name}`] = page[field.name] ?? '';
    }
  });

  for (const field of def.tail) {
    input[`tail_${field.name}`] = tail[field.name] ?? '';
  }

  return input;
}

// ---------------------------------------------------------------------------
// addUriAnnotation — post-process: overlay a clickable URI hotspot on the
// tail URL field of the last page.
// ---------------------------------------------------------------------------

export async function addUriAnnotation(pdfBytes: Uint8Array, def: CarouselTemplate, url: string): Promise<Uint8Array> {

  const urlFieldDef = def.tail.find(f => f.name === def.urlField);
  if (!urlFieldDef) throw new Error(`urlField "${def.urlField}" not found in tail schema`);

  const { W, H } = def.dimensions;
  const MM = 72 / 25.4;

  const x = urlFieldDef.position.x * MM;
  const h = urlFieldDef.height * MM;
  const y = (H - urlFieldDef.position.y - urlFieldDef.height) * MM;
  const w = urlFieldDef.width * MM;

  const doc   = await PDFDocument.load(pdfBytes);
  const pages = doc.getPages();
  const page  = pages[pages.length - 1];

  const annot = doc.context.obj({
    Type:    PDFName.of('Annot'),
    Subtype: PDFName.of('Link'),
    Rect:    [x, y, x + w, y + h],
    A: { Type: PDFName.of('Action'), S: PDFName.of('URI'), URI: PDFString.of(url) },
    Border:  [0, 0, 0],
  });

  const annotRef = doc.context.register(annot);
  page.node.set(PDFName.of('Annots'), doc.context.obj([annotRef]));

  return doc.save();
}

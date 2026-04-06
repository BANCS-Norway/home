/**
 * Install known fonts for the PDF carousel generator.
 *
 * Downloads the Inter release zip from GitHub and extracts the TTF files
 * into scripts/carousel/fonts/. Run once locally when adding a new font,
 * then commit the TTF file — CI never needs to run this script.
 *
 * Usage: npx tsx scripts/carousel/install-fonts.ts
 */

import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR  = resolve(__dirname, 'fonts');

const INTER_VERSION = '4.1';
const INTER_ZIP_URL = `https://github.com/rsms/inter/releases/download/v${INTER_VERSION}/Inter-${INTER_VERSION}.zip`;

// Files to extract from the zip → local filename
const EXTRACT: Record<string, string> = {
  'extras/ttf/Inter-Regular.ttf': 'Inter-Regular.ttf',
  'extras/ttf/Inter-Medium.ttf':  'Inter-Medium.ttf',
  'extras/ttf/Inter-Bold.ttf':    'Inter-Bold.ttf',
};

const allExist = Object.values(EXTRACT).every(f => existsSync(resolve(FONTS_DIR, f)));
if (allExist) {
  console.log('All fonts already installed.');
  process.exit(0);
}

mkdirSync(FONTS_DIR, { recursive: true });

console.log(`Downloading Inter ${INTER_VERSION}...`);
const res = await fetch(INTER_ZIP_URL);
if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${INTER_ZIP_URL}`);
const zipBytes = new Uint8Array(await res.arrayBuffer());
console.log(`  ${(zipBytes.byteLength / 1024 / 1024).toFixed(1)} MB downloaded\n`);

// Parse zip and extract target files
const view = new DataView(zipBytes.buffer);
let offset = 0;

while (offset < zipBytes.byteLength - 4) {
  const sig = view.getUint32(offset, true);
  if (sig !== 0x04034b50) break;

  const compression = view.getUint16(offset + 8,  true);
  const compSize    = view.getUint32(offset + 18, true);
  const uncompSize  = view.getUint32(offset + 22, true);
  const nameLen     = view.getUint16(offset + 26, true);
  const extraLen    = view.getUint16(offset + 28, true);

  const nameBytes = zipBytes.slice(offset + 30, offset + 30 + nameLen);
  const name      = new TextDecoder().decode(nameBytes);
  const dataStart = offset + 30 + nameLen + extraLen;

  if (EXTRACT[name]) {
    let fileData: Uint8Array;

    if (compression === 0) {
      fileData = zipBytes.slice(dataStart, dataStart + uncompSize);
    } else if (compression === 8) {
      const compressed = zipBytes.slice(dataStart, dataStart + compSize);
      const ds = new DecompressionStream('deflate-raw');
      const writer = ds.writable.getWriter();
      writer.write(compressed);
      writer.close();
      const chunks: Uint8Array[] = [];
      const reader = ds.readable.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      const total = chunks.reduce((n, c) => n + c.byteLength, 0);
      fileData = new Uint8Array(total);
      let pos = 0;
      for (const chunk of chunks) { fileData.set(chunk, pos); pos += chunk.byteLength; }
    } else {
      throw new Error(`Unsupported compression method ${compression} for ${name}`);
    }

    const dest = resolve(FONTS_DIR, EXTRACT[name]);
    writeFileSync(dest, fileData);
    console.log(`  extracted: ${EXTRACT[name]} (${(fileData.byteLength / 1024).toFixed(0)} KB)`);
  }

  offset = dataStart + compSize;
}

console.log(`\nFonts installed to ${FONTS_DIR}`);
console.log('Remember to commit the TTF files so CI never needs to run this script.');

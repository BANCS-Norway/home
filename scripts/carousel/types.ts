/**
 * Carousel template type definitions.
 *
 * Templates are pure data — no logic. Assembly is handled by builder.ts.
 * The JSON schema at carousel-template.schema.json is the authoritative spec.
 */

export interface FontDef {
  /** Key used in TextField.fontName. Must be registered in builder KNOWN_FONTS or have a path. */
  name: string;
  /** Exactly one font per template must be true (pdfme requirement). */
  fallback: boolean;
  /** Path to TTF/OTF file. Omit for known fonts (resolved from scripts/carousel/fonts/). */
  path?: string;
}

export interface Position {
  x: number;
  y: number;
}

interface BaseField {
  name: string;
  position: Position;
  width: number;
  height: number;
}

export interface TextField extends BaseField {
  type: 'text';
  fontSize: number;
  fontColor: string;
  /** Must match a name declared in the template's fonts array. */
  fontName: string;
  alignment: 'left' | 'center' | 'right';
  verticalAlignment: 'top' | 'middle' | 'bottom';
  lineHeight: number;
}

export interface RectangleField extends BaseField {
  type: 'rectangle';
  rotate?: number;
  opacity?: number;
  color: string;
  borderWidth: number;
  borderColor: string;
}

export interface ImageField extends BaseField {
  type: 'image';
}

export type FieldDef = TextField | RectangleField | ImageField;

export interface CarouselTemplate {
  name: string;
  description: string;
  dimensions: { W: number; H: number };
  fonts: FontDef[];
  /** Name of the tail field that receives a URI annotation (clickable hotspot). */
  urlField: string;
  head: FieldDef[];
  page: FieldDef[];
  tail: FieldDef[];
}

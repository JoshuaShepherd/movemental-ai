export type WizardStep = "typography" | "templates" | "images" | "colors" | "results";

export type ColorMode = "curated" | "generate";

export type ApproachId =
  | "editorial"
  | "typography"
  | "warmmin"
  | "handmade"
  | "scrolly"
  | "motion"
  | "bento"
  | "cinematic"
  | "depth3d"
  | "adaptive";

export type ApproachPromptFields = {
  pal?: string;
  ty?: string;
  lay?: string;
  sig?: string;
  mo?: string;
};

export type PaletteMood = "ink" | "warm" | "earthy" | "muted" | "dark" | "bold" | "painterly";

export type Palette = {
  id: string;
  nm: string;
  mood: PaletteMood;
  c: [string, string, string, string, string];
};

export type TemplateKind = "site" | "template";

export type Template = {
  id: string;
  nm: string;
  dm: string;
  url: string;
  tag: string;
  ap: ApproachId;
  kind: TemplateKind;
};

export type TypePair = {
  id: string;
  nm: string;
  hn: string;
  bn: string;
  head: string;
  body: string;
  hw: number;
  vibe: string;
  tags?: string[];
};

export type StyleImage = {
  id: string;
  n: number;
  alt: string;
  w: number;
  h: number;
  src: string;
};

export type ColorRole = "bg" | "surface" | "muted" | "ink" | "accent";

export type ColorFamilyId = "ink" | "warm" | "earthy" | "muted" | "dark" | "bold" | "painterly";

export type ColorFamilySeed = {
  base: number[];
  accent: number[];
  neutralS: [number, number];
  baseS: [number, number];
  accentS: [number, number];
  dark?: boolean;
};

export type GenRampSlot = {
  L: [number, number];
  hue: string;
  S: string;
};

export type GenColumn = {
  hex: string;
  locked: boolean;
  role: ColorRole;
};

export type GeneratedPalette = {
  id: string;
  nm: string;
  c: string[];
  roles: ColorRole[];
};

export type SelectionState = {
  type: Set<string>;
  templates: Set<string>;
  images: Set<string>;
  palettes: Set<string>;
  generated: GeneratedPalette[];
};

export type WizardState = {
  page: number;
  sel: SelectionState;
  colorMode: ColorMode;
  activeType: string;
  genFamily: ColorFamilyId | "any";
  gen: GenColumn[];
};

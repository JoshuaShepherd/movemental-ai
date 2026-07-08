import type { ColorFamilyId, ColorFamilySeed, ColorRole, GenRampSlot } from "../types";

export const FAMILIES: Record<ColorFamilyId, ColorFamilySeed> = {
  ink:      {base:[40,36],       accent:[220,224],    neutralS:[4,10],  baseS:[6,15],  accentS:[52,72]},
  warm:     {base:[32,26,40],    accent:[16,34,44],   neutralS:[8,16],  baseS:[22,42], accentS:[58,82]},
  earthy:   {base:[74,92,110],   accent:[80,50,36],   neutralS:[6,14],  baseS:[14,30], accentS:[34,54]},
  muted:    {base:[210,200,196], accent:[205,24,168], neutralS:[3,9],   baseS:[6,16],  accentS:[18,40]},
  dark:     {base:[222,224],     accent:[212,28,150], neutralS:[6,16],  baseS:[10,22], accentS:[54,80], dark:true},
  bold:     {base:[220,150,45],  accent:[350,208,45], neutralS:[4,10],  baseS:[40,68], accentS:[66,90]},
  painterly:{base:[196,44,332],  accent:[332,196,52], neutralS:[6,12],  baseS:[24,44], accentS:[46,70]}
};

export const FAM_ORDER: ColorFamilyId[] = ['ink', 'warm', 'earthy', 'muted', 'dark', 'bold', 'painterly'];

export const FAM_LABEL: Record<ColorFamilyId | "any", string>={ink:'Ink',warm:'Warm',earthy:'Earthy',muted:'Muted',dark:'Dark',bold:'Bold',painterly:'Painterly',any:'Surprise'};

export const LIGHT_RAMP: Record<ColorRole, GenRampSlot>={ bg:{L:[93,97],hue:'neutral',S:'neutral'}, surface:{L:[80,89],hue:'neutral',S:'neutral'}, muted:{L:[48,64],hue:'base',S:'base'}, ink:{L:[12,20],hue:'base',S:'inkS'}, accent:{L:[38,52],hue:'accent',S:'accent'} };

export const DARK_RAMP: Record<ColorRole, GenRampSlot> ={ bg:{L:[9,15],hue:'base',S:'baseLow'}, surface:{L:[18,27],hue:'base',S:'baseLow'}, muted:{L:[54,68],hue:'base',S:'base'}, ink:{L:[88,95],hue:'neutral',S:'neutral'}, accent:{L:[46,58],hue:'accent',S:'accent'} };

export const ROLE_ORDER: ColorRole[]=['bg','surface','muted','ink','accent'];


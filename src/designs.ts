/** Shared selections for the model, room dimensions and design controls. */
export interface RenovationLayout {
  groundFloor: boolean;
  masterExtension: boolean;
  autoGate: boolean;
  kitchen: 'open' | 'enclosed';
  bathroomAccess: 'shared' | 'ensuite';
  masterZone: 'open' | 'study' | 'dressing';
  wideKitchenOpening: boolean;
}

export interface RenovationPlan extends RenovationLayout {
  id: 'none' | 'open-plan';
  label: string;
  description: string;
}

export const RENOVATION_PLANS: readonly RenovationPlan[] = [
  {
    id: 'none', label: 'Existing house',
    description: 'Original layout, open rear yard, full balcony and existing gate.',
    groundFloor: false, masterExtension: false, autoGate: false,
    kitchen: 'open', bathroomAccess: 'shared', masterZone: 'open', wideKitchenOpening: false,
  },
  {
    id: 'open-plan', label: 'Open family plan',
    description: 'Keep the original wall and opening between the living passage and dining, with an open rear kitchen. Bathroom 3 stays shared; the extended master is one open room. Translucent polycarbonate awnings over the car porch and balcony admit daylight.',
    groundFloor: true, masterExtension: true, autoGate: true,
    kitchen: 'open', bathroomAccess: 'shared', masterZone: 'open', wideKitchenOpening: false,
  },
];

export const ORIGINAL_HOUSE = RENOVATION_PLANS[0];

export type InteriorStyle = 'none' | 'japanese' | 'scandinavian' | 'soft-grey';
interface Finish {
  color: string;
  /** Keep the timber colour map; other finishes retain only surface relief. */
  woodGrain?: boolean;
}
export interface InteriorDesign {
  id: Exclude<InteriorStyle, 'none'>;
  label: string;
  description: string;
  swatches: readonly { color: string; label: string }[];
  masterNook: 'tatami' | 'reading' | 'desk';
  finishes: Readonly<Record<string, Finish>>;
}

export const INTERIOR_STYLES: readonly InteriorDesign[] = [
  {
    id: 'japanese', label: 'Japanese minimal',
    description: 'Pale oak, cream linen, a compact wooden coffee table on wheels and simple storage.',
    swatches: [
      { color: '#c9ae86', label: 'Pale oak' },
      { color: '#e9e0cf', label: 'Cream linen' },
      { color: '#ded3bd', label: 'Warm stone' },
    ],
    masterNook: 'tatami', finishes: {},
  },
  {
    id: 'scandinavian', label: 'Scandinavian minimal',
    description: 'Light timber, off-white walls, oatmeal fabric and a compact wooden coffee table on wheels.',
    swatches: [
      { color: '#d6c6a7', label: 'Light timber' },
      { color: '#f5f4ee', label: 'Off-white' },
      { color: '#cbc4b7', label: 'Oatmeal' },
    ],
    masterNook: 'reading',
    finishes: {
      jpOak: { color: '#fff9ee', woodGrain: true },
      jpOakDark: { color: '#c5b391' },
      jpLinen: { color: '#f4f1e9' }, jpLinenGrey: { color: '#cbc4b7' },
      jpCushion: { color: '#b4b4a8' }, jpRug: { color: '#e7e2d8' },
      modernLinen: { color: '#cbc4b7' }, modernPlaster: { color: '#f5f4ee' },
      modernStone: { color: '#e5e0d5' }, modernFloor: { color: '#e1dbcf' },
      cabinet: { color: '#f5f4ee' }, worktop: { color: '#c9c6bc' },
    },
  },
  {
    id: 'soft-grey', label: 'Soft grey minimal',
    description: 'Soft grey upholstery, matte grey cabinetry and white walls with a compact wooden coffee table on wheels.',
    swatches: [
      { color: '#f1f1ee', label: 'Soft white' },
      { color: '#bfc1be', label: 'Light grey' },
      { color: '#777b79', label: 'Muted charcoal' },
    ],
    masterNook: 'desk',
    finishes: {
      jpOak: { color: '#c8cbc7' }, jpOakDark: { color: '#777b79' },
      jpLinen: { color: '#efefeb' }, jpLinenGrey: { color: '#bec2bf' },
      jpCushion: { color: '#989e99' }, jpRug: { color: '#d5d7d3' },
      modernLinen: { color: '#bfc1be' }, modernPlaster: { color: '#f1f1ee' },
      modernStone: { color: '#d4d6d2' }, modernFloor: { color: '#d1d3cf' },
      cabinet: { color: '#c8cbc7' }, worktop: { color: '#888e89' },
    },
  },
];

export const interiorDesign = (style: InteriorStyle) => INTERIOR_STYLES.find((design) => design.id === style);
export const finishKey = (style: InteriorStyle, material: string) => `${style}/${material}`;

export function interiorMaterials(style: InteriorStyle): Record<string, string> {
  const finishes = interiorDesign(style)?.finishes ?? {};
  return Object.fromEntries(Object.keys(finishes).map((material) => [material, finishKey(style, material)]));
}

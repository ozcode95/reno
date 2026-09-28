/**
 * Feng shui (八宅 Eight Mansions) reading of the house layout.
 *
 * The house sits north and faces south (front = street = +Z = south), i.e. a 坎宅 (Kan house, East group).
 * Each floor's enclosed footprint is split into a 3 × 3 Lo Shu grid (N at the rear, S at the street,
 * W at x = 0, E at x = W) and every palace gets its Eight Mansions star, either for the house itself or for
 * an occupant's personal Kua (命卦) from the birth date and gender.
 */
import * as THREE from 'three';
import {
  W, Z_FRONT, Z_BATH_FRONT, Z_LOT_REAR, Z_MASTER_EXTENSION_FRONT, Z_LIVING_N, Z_STAIR_N,
  X_DOOR_A, X_DOOR_B, X_STAIR_FOOT, X_STAIR_TOP, Y_FF, RENOVATED_REAR_DOOR, type RoomInfo,
} from '../config';
import { canvasToTexture } from '../builder/textures';
import { roomsFor } from './annotations';

export type Dir = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export type Palace = Dir | 'C';
export type Star = 'sheng' | 'tian' | 'yan' | 'fu' | 'huo' | 'liu' | 'wu' | 'jue';
export type Gender = 'm' | 'f';
export interface Occupant { name: string; birth: string; gender: Gender }

export const DIRS: Dir[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export const DIR_ZH: Record<Palace, string> = { N: '北', NE: '东北', E: '东', SE: '东南', S: '南', SW: '西南', W: '西', NW: '西北', C: '中宫' };
export const TRIGRAM: Record<Palace, { zh: string; py: string; element: string }> = {
  N: { zh: '坎', py: 'Kan', element: 'Water' },
  NE: { zh: '艮', py: 'Gen', element: 'Earth' },
  E: { zh: '震', py: 'Zhen', element: 'Wood' },
  SE: { zh: '巽', py: 'Xun', element: 'Wood' },
  S: { zh: '离', py: 'Li', element: 'Fire' },
  SW: { zh: '坤', py: 'Kun', element: 'Earth' },
  W: { zh: '兑', py: 'Dui', element: 'Metal' },
  NW: { zh: '乾', py: 'Qian', element: 'Metal' },
  C: { zh: '中', py: 'Centre', element: 'Earth' },
};
export const STARS: Record<Star, { zh: string; en: string; good: boolean; rank: number; meaning: string }> = {
  sheng: { zh: '生气', en: 'Sheng Qi', good: true, rank: 1, meaning: 'vitality, wealth & career' },
  tian: { zh: '天医', en: 'Tian Yi', good: true, rank: 2, meaning: 'health & recovery' },
  yan: { zh: '延年', en: 'Yan Nian', good: true, rank: 3, meaning: 'relationships & longevity' },
  fu: { zh: '伏位', en: 'Fu Wei', good: true, rank: 4, meaning: 'stability & calm' },
  huo: { zh: '祸害', en: 'Huo Hai', good: false, rank: 5, meaning: 'mishaps & quarrels (mild)' },
  liu: { zh: '六煞', en: 'Liu Sha', good: false, rank: 6, meaning: 'disputes & romance troubles' },
  wu: { zh: '五鬼', en: 'Wu Gui', good: false, rank: 7, meaning: 'fire, theft & gossip' },
  jue: { zh: '绝命', en: 'Jue Ming', good: false, rank: 8, meaning: 'the worst: illness & loss' },
};

/** Eight Mansions table: row = sitting trigram, columns in DIRS order (N NE E SE S SW W NW) */
const TABLE: Record<Dir, Star[]> = {
  N: ['fu', 'wu', 'tian', 'sheng', 'yan', 'jue', 'huo', 'liu'],
  SW: ['jue', 'sheng', 'huo', 'wu', 'liu', 'fu', 'tian', 'yan'],
  E: ['tian', 'liu', 'fu', 'yan', 'sheng', 'huo', 'jue', 'wu'],
  SE: ['sheng', 'jue', 'yan', 'fu', 'tian', 'wu', 'liu', 'huo'],
  NW: ['liu', 'tian', 'wu', 'huo', 'jue', 'yan', 'sheng', 'fu'],
  W: ['huo', 'yan', 'jue', 'liu', 'wu', 'tian', 'fu', 'sheng'],
  NE: ['wu', 'fu', 'liu', 'jue', 'huo', 'sheng', 'yan', 'tian'],
  S: ['yan', 'huo', 'sheng', 'tian', 'fu', 'liu', 'wu', 'jue'],
};
export function starAt(sitting: Dir, d: Dir): Star {
  return TABLE[sitting][DIRS.indexOf(d)];
}
/** the four good (or bad) directions of a sitting trigram, best first */
export function dirsByStar(sitting: Dir, good: boolean): Dir[] {
  return DIRS.filter((d) => STARS[starAt(sitting, d)].good === good).sort((a, b) => STARS[starAt(sitting, a)].rank - STARS[starAt(sitting, b)].rank);
}

export const HOUSE_SITTING: Dir = 'N'; // sits north, faces south
export const KUA_DIR: Record<number, Dir> = { 1: 'N', 2: 'SW', 3: 'E', 4: 'SE', 6: 'NW', 7: 'W', 8: 'NE', 9: 'S' };
const EAST_GROUP = new Set([1, 3, 4, 9]);

/**
 * Personal Kua (命卦). Uses the Chinese solar year, which starts at 立春 (taken as 4 February;
 * the real date moves between 3 and 5 February, so check births on those days).
 */
export function kuaNumber(birth: string, gender: Gender): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birth);
  if (!m) return null;
  let y = Number(m[1]);
  const mon = Number(m[2]), day = Number(m[3]);
  if (mon < 2 || (mon === 2 && day < 4)) y -= 1;
  let k = gender === 'm' ? (11 - (y % 9)) % 9 : (y % 9 + 4) % 9;
  if (k === 0) k = 9;
  if (k === 5) k = gender === 'm' ? 2 : 8;
  return k;
}
export const isEastGroup = (kua: number) => EAST_GROUP.has(kua);

/* ------------------------------------------------------------------ */
/*  Lo Shu grid over each floor                                        */
/* ------------------------------------------------------------------ */
interface Rect { x0: number; x1: number; z0: number; z1: number }
const PALACES: Palace[][] = [
  ['NW', 'N', 'NE'], // rear row (small z = north)
  ['W', 'C', 'E'],
  ['SW', 'S', 'SE'], // street row (large z = south)
];

/** enclosed footprint of a floor (balcony, porch and yard are outside) */
export function floorBounds(level: 'gf' | 'ff', renovated: boolean): Rect {
  if (level === 'gf') return { x0: 0, x1: W, z0: renovated ? Z_LOT_REAR : 0, z1: Z_FRONT };
  return { x0: 0, x1: W, z0: 0, z1: renovated ? Math.max(Z_MASTER_EXTENSION_FRONT, Z_BATH_FRONT) : Z_BATH_FRONT };
}
function cells(b: Rect) {
  const out: { palace: Palace; rect: Rect }[] = [];
  const dx = (b.x1 - b.x0) / 3, dz = (b.z1 - b.z0) / 3;
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
    out.push({ palace: PALACES[j][i], rect: { x0: b.x0 + i * dx, x1: b.x0 + (i + 1) * dx, z0: b.z0 + j * dz, z1: b.z0 + (j + 1) * dz } });
  }
  return out;
}
const overlap = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) * Math.max(0, Math.min(a.z1, b.z1) - Math.max(a.z0, b.z0));
const area = (r: Rect) => (r.x1 - r.x0) * (r.z1 - r.z0);

/** palaces a rectangle covers, largest share first */
export function palacesOf(r: Rect, level: 'gf' | 'ff', renovated: boolean) {
  const a = area(r);
  return cells(floorBounds(level, renovated))
    .map((c) => ({ palace: c.palace, share: overlap(r, c.rect) / a }))
    .filter((c) => c.share > 0.02)
    .sort((p, q) => q.share - p.share);
}
export function palaceAt(x: number, z: number, level: 'gf' | 'ff', renovated: boolean): Palace {
  return palacesOf({ x0: x - 0.01, x1: x + 0.01, z0: z - 0.01, z1: z + 0.01 }, level, renovated)[0]?.palace ?? 'C';
}

/* ------------------------------------------------------------------ */
/*  Advice                                                             */
/* ------------------------------------------------------------------ */
export interface AdviceItem { ok: 'good' | 'warn' | 'info'; title: string; text: string }
export interface PersonReading {
  occupant: Occupant;
  kua: number;
  east: boolean;
  good: Dir[];
  bad: Dir[];
  bedrooms: { room: RoomInfo; palace: Palace; star: Star | null }[];
}

/* ------------------------------------------------------------------ */
/*  Language (English / 中文)                                           */
/* ------------------------------------------------------------------ */
export type Lang = 'en' | 'zh';
let lang: Lang = 'en';
export const getLang = () => lang;
export function setLang(l: Lang) {
  lang = l;
}
/** pick the string for the current language */
export const L = (en: string, zh: string) => (lang === 'zh' ? zh : en);

const ELEMENT_ZH: Record<string, string> = { Water: '水', Earth: '土', Wood: '木', Fire: '火', Metal: '金' };
const MEANING_ZH: Record<Star, string> = {
  sheng: '旺财、事业、活力', tian: '健康、康复', yan: '感情、长寿', fu: '稳定、平静',
  huo: '小是非、口角', liu: '纠纷、烂桃花', wu: '火灾、盗窃、口舌', jue: '最凶：疾病、破财',
};
const ROOM_ZH: Record<string, string> = {
  living: '客厅', dining: '饭厅', kitchen: '厨房', bed4: '卧室 4', bath3: '浴室 3', yard: '后院',
  bed3: '卧室 3', bed2: '卧室 2', family: '家庭厅', master: '主卧', bath2: '浴室 2', bath1: '浴室 1（主卧套厕）', balcony: '阳台', porch: '车廊',
};
export const elementName = (e: string) => L(e, ELEMENT_ZH[e] ?? e);
export const starMeaning = (s: Star) => L(STARS[s].meaning, MEANING_ZH[s]);
/** star name: "生气 Sheng Qi" in English, "生气" in Chinese */
export const starName = (s: Star) => L(`${STARS[s].zh} ${STARS[s].en}`, STARS[s].zh);
/** direction: "SE 东南" in English, "东南" in Chinese */
export const dirName = (d: Palace) => (d === 'C' ? L('Centre 中宫', '中宫') : L(`${d} ${DIR_ZH[d]}`, DIR_ZH[d]));
export const dirList = (ds: Dir[]) => ds.map(dirName).join(L(', ', '、'));
export function roomName(r: RoomInfo) {
  if (lang === 'en') return r.name;
  if (r.id === 'yard' && r.level === 'gf') return '后扩建（湿厨房）';
  return ROOM_ZH[r.id] ?? r.name;
}

const starTag = starName;
const palaceTag = (p: Palace) => (p === 'C' ? L('the centre (中宫)', '中宫') : L(`${p} ${DIR_ZH[p]}`, `${DIR_ZH[p]}方`));
const isBath = (r: RoomInfo) => r.id.startsWith('bath');
const isBed = (r: RoomInfo) => r.id.startsWith('bed') || r.id === 'master';
const isKitchen = (r: RoomInfo, renovated: boolean) => r.id === 'kitchen' || (renovated && r.id === 'yard');
const levelName = (l: 'gf' | 'ff') => (l === 'gf' ? L('ground floor', '一楼') : L('first floor', '二楼'));

/** indoor rooms per floor (outdoor porch / yard / balcony are left out) */
export function indoorRooms(renovated: boolean) {
  return roomsFor(renovated).filter((r) => r.level !== 'site' && r.id !== 'balcony') as (RoomInfo & { level: 'gf' | 'ff' })[];
}

/** induction hob of the renovated L-kitchen (mirrors buildLKitchen: east leg, backing onto the east wall) */
const RENOVATED_HOB = { x: W - 0.05 - 0.3, z: Z_LOT_REAR + 0.1 + 0.58 + 0.9 };
const inside = (p: { x: number; z: number }, r: Rect) => p.x > r.x0 && p.x < r.x1 && p.z > r.z0 && p.z < r.z1;

export function houseAdvice(renovated: boolean): { general: AdviceItem[]; rooms: AdviceItem[] } {
  const general: AdviceItem[] = [];
  const rooms: AdviceItem[] = [];
  const sit = HOUSE_SITTING;
  const goodDirs = dirsByStar(sit, true);
  const pct = (v: number) => `${Math.round(v * 100)}%`;

  general.push({
    ok: 'info', title: L('House type: 坎宅 (sits north, faces south)', '宅型：坎宅（坐北朝南）'),
    text: L(
      `An East-group (东四宅) house. Its auspicious sectors are ${dirList(goodDirs)}; people whose Kua is 1, 3, 4 or 9 (East group) suit it best.`,
      `属东四宅。吉方为${dirList(goodDirs)}；命卦为 1、3、4、9（东四命）的人最合适住。`,
    ),
  });

  // main door
  const doorPalace = palaceAt((X_DOOR_A + X_DOOR_B) / 2, Z_FRONT - 0.05, 'gf', renovated);
  const doorFacing = starAt(sit, 'S');
  const doorByPos = doorPalace !== 'C' && doorPalace !== 'S' ? starAt(sit, doorPalace as Dir) : null;
  general.push({
    ok: 'good', title: L(`Main door faces south: ${starTag(doorFacing)}`, `大门朝南：${starTag(doorFacing)}`),
    text: L(
      `The door direction is auspicious (${starMeaning(doorFacing)}). By position it sits in the ${palaceTag(doorPalace)} palace of the plan` +
        (doorByPos ? ` (${starTag(doorByPos)}); keep the porch side of the entrance bright, tidy and well lit. A plant or lamp there helps.` : '.'),
      `门向吉利（${starMeaning(doorFacing)}）。按平面位置，大门位于${palaceTag(doorPalace)}` +
        (doorByPos ? `（${starTag(doorByPos)}），入口靠车廊一侧要保持明亮、整洁、灯光充足，可放一盆植物或一盏灯。` : '。'),
    ),
  });

  // screen wall in front of the entrance
  const screen = (Z_FRONT - Z_LIVING_N).toFixed(1);
  general.push({
    ok: 'good', title: L('Entrance faces a wall, not the stairs or the back door', '进门见墙，不见楼梯、不见后门'),
    text: L(
      `The living-room back wall stands ${screen} m inside the front door. It works as a screen, so the stairs and back door can't be seen from the entrance, and the living room in front acts as the "bright hall" (明堂). Keep this zone open and uncluttered.`,
      `客厅后墙距大门约 ${screen} 米，起到屏风（玄关）的作用：从门口看不到楼梯和后门，前面的客厅就是"明堂"。这一带要保持开阔、不要堆放杂物。`,
    ),
  });

  // front / back door alignment (穿堂煞)
  const rear = renovated ? RENOVATED_REAR_DOOR : { a: 3.98, b: W - 0.05 - 1.2 };
  const aligned = Math.min(X_DOOR_B, rear.b) - Math.max(X_DOOR_A, rear.a) > 0.1;
  const range = (a: number, b: number) => `x ${a.toFixed(1)}–${b.toFixed(1)} m`;
  general.push(aligned
    ? {
      ok: 'warn', title: L('Front and back doors are in line (穿堂煞)', '前后门成一直线（穿堂煞）'),
      text: L('Qi rushes straight through. Put a screen, cabinet or bead curtain between them.', '气流直进直出、留不住财气。可在两门之间放屏风、柜子或珠帘挡一挡。'),
    }
    : {
      ok: 'good', title: L('Front and back doors are not in line', '前后门不对冲'),
      text: L(
        `The main door (${range(X_DOOR_A, X_DOOR_B)}) and the back door (${range(rear.a, rear.b)}) are offset, so there is no "piercing hall" (穿堂煞).`,
        `大门（${range(X_DOOR_A, X_DOOR_B)}）与后门（${range(rear.a, rear.b)}）错开，没有穿堂煞。`,
      ),
    });

  // stairs in the centre
  const stairGF: Rect = { x0: 0.05, x1: X_STAIR_FOOT, z0: Z_STAIR_N, z1: Z_LIVING_N };
  const centreShare = palacesOf(stairGF, 'gf', renovated).find((p) => p.palace === 'C')?.share ?? 0;
  if (centreShare > 0.25) {
    general.push({
      ok: 'warn', title: L('Staircase in the centre of the house (中宫)', '楼梯位于房子中央（中宫）'),
      text: L(
        `About ${pct(centreShare)} of the stair sits in the centre palace, the house's "heart". Keep the area under and around the stairs clean, bright and free of storage clutter. Don't put a toilet or store room there. A good light at the stair foot helps.`,
        `楼梯约 ${pct(centreShare)} 落在中宫，即房子的"心脏"。楼梯下方和周围要保持干净、明亮，不要堆放杂物，也不要改成厕所或储物间。楼梯口装一盏好灯会有帮助。`,
      ),
    });
  }
  const stairFF: Rect = { x0: 0.05, x1: X_STAIR_TOP, z0: Z_STAIR_N, z1: Z_LIVING_N };
  if ((palacesOf(stairFF, 'ff', renovated).find((p) => p.palace === 'C')?.share ?? 0) > 0.25) {
    general.push({
      ok: 'info', title: L('Stair well in the first-floor centre', '二楼中央是楼梯井'),
      text: L('The open stair well links both floors through the centre, so keep the family hall around it tidy and well lit.', '开放的楼梯井在中央连通上下两层，周围的家庭厅要保持整洁、光线充足。'),
    });
  }

  // vertical stacking: toilet over bedroom / kitchen, bedroom over kitchen or over the open porch
  const all = indoorRooms(renovated);
  const gf = all.filter((r) => r.level === 'gf'), ff = all.filter((r) => r.level === 'ff');
  const bedOverStove = L('Traditionally the bed should not sit right above the stove (heat under the bed). Keep the bed away from the spot over the hob.', '传统上床不宜压在炉灶正上方（床下有火）。床位要避开炉灶正上方的位置。');
  for (const up of ff) {
    for (const down of gf) {
      if (overlap(up, down) < 0.3) continue;
      if (isBath(up) && (isBed(down) || isKitchen(down, renovated))) {
        const bed = isBed(down);
        general.push({
          ok: 'warn', title: L(`${roomName(up)} is above ${roomName(down)}`, `${roomName(up)}在${roomName(down)}正上方`),
          text: L(
            `A toilet over a ${bed ? 'bed' : 'stove'} is a classic taboo. Don't put the ${bed ? 'bed' : 'hob'} directly under the toilet.`,
            `厕所压${bed ? '床' : '灶'}是传统大忌，${bed ? '床' : '炉灶'}不要放在厕所正下方。`,
          ),
        });
      }
      // renovated: the only stove is the hob in the rear extension (checked below)
      if (isBed(up) && !renovated && isKitchen(down, renovated)) {
        general.push({ ok: 'warn', title: L(`${roomName(up)} is above the ${roomName(down)}`, `${roomName(up)}在${roomName(down)}正上方`), text: bedOverStove });
      }
    }
    if (renovated && isBed(up) && inside(RENOVATED_HOB, up)) {
      general.push({ ok: 'warn', title: L(`${roomName(up)} is above the hob`, `${roomName(up)}在炉灶正上方`), text: bedOverStove });
    }
    if (isBed(up) && up.z1 > Z_FRONT + 0.3) {
      const over = (up.z1 - Z_FRONT).toFixed(1);
      general.push({
        ok: 'info', title: L(`Part of ${roomName(up)} is over the car porch`, `${roomName(up)}有一部分悬在车廊上方`),
        text: L(
          `About ${over} m of the room hangs over the open porch (empty space below). Keep the bed on the part over the living room, not over the porch.`,
          `房间约有 ${over} 米悬在车廊上方（下方是空的）。床要放在客厅上方那一边，不要放在车廊上方。`,
        ),
      });
    }
  }

  // room by room
  for (const r of all) {
    const ps = palacesOf(r, r.level, renovated);
    if (!ps.length) continue;
    const main = ps[0].palace;
    const star = main === 'C' ? null : starAt(sit, main);
    const second = ps[1] && ps[1].share >= 0.3 ? ` / ${palaceTag(ps[1].palace)} (${pct(ps[1].share)})` : '';
    const where = `${palaceTag(main)}${second ? ` (${pct(ps[0].share)})${second}` : ''}${star ? ` · ${starTag(star)}` : ''}`;
    const title = L(`${roomName(r)} (${levelName(r.level)}): ${where}`, `${roomName(r)}（${levelName(r.level)}）：${where}`);
    const good = star ? STARS[star].good : false;
    const m = star ? starMeaning(star) : '';
    if (isBath(r)) {
      rooms.push(main === 'C'
        ? { ok: 'warn', title, text: L('A toilet in the centre is the most unfavourable spot. Keep it spotless, dry and ventilated with the door shut.', '厕所在中宫最不利。要保持非常干净、干燥、通风，并随手关门。') }
        : good
          ? { ok: 'warn', title, text: L(`This toilet takes up an auspicious sector (${m}). Keep the door shut and the lid down, run the exhaust fan, and keep it dry and bright. A small plant helps.`, `厕所占了吉方（${m}）。平时关门、盖上马桶盖，开抽风机，保持干燥明亮，可放一小盆植物。`) }
          : { ok: 'good', title, text: L('A toilet here "presses down" an inauspicious sector, which is the preferred placement.', '厕所设在凶方可以"压煞"，是理想的位置。') });
    } else if (isKitchen(r, renovated) && renovated) {
      // renovated: the stove verdict belongs to the hob (below); a kitchen room without it is a dry kitchen
      if (!inside(RENOVATED_HOB, r)) rooms.push({ ok: 'info', title, text: L('No stove in this part of the kitchen after the renovation, so its sector matters less. Keep it tidy and use it for preparation, dining or storage.', '装修后这里没有炉灶，所以方位影响较小。保持整洁，可用作备餐、用餐或收纳。') });
    } else if (isKitchen(r, renovated)) {
      rooms.push(good
        ? { ok: 'warn', title, text: L(`The kitchen fire "burns" an auspicious sector. Put the hob on the side nearest an inauspicious sector and make it face ${dirList(goodDirs)}.`, `厨房的火会"烧"掉吉方。炉灶尽量放在靠近凶方的一侧，灶口朝向${dirList(goodDirs)}。`) }
        : { ok: 'good', title, text: L(`Kitchen on an inauspicious sector: "sit on bad, face good" (坐凶向吉) is the classic placement. Face the hob towards ${dirList(goodDirs)} if possible.`, `厨房在凶方，符合"坐凶向吉"的传统布局。灶口尽量朝向${dirList(goodDirs)}。`) });
      if (main === 'N') rooms.push({ ok: 'info', title: L(`${roomName(r)}: fire in a Water sector`, `${roomName(r)}：火在水位`), text: waterFire() });
    } else if (isBed(r)) {
      rooms.push(good
        ? { ok: 'good', title, text: L(`A good bedroom sector (${m}). For each person, check their own Kua below.`, `适合做卧室的吉方（${m}）。每个人的情况请看下面的个人命卦。`) }
        : {
          ok: 'warn', title,
          text: main === 'C'
            ? L("The centre of the house (the house's heart). It suits a guest room or study better, or someone whose personal Kua is good here (see below).", '房子的中宫（心脏位置）。更适合做客房或书房，或者给命卦在这里是吉方的人住（见下方）。')
            : L(`An inauspicious sector for the house (${m}). It suits a guest room or study better, or someone whose personal Kua is good here (see below).`, `对这间屋子来说是凶方（${m}）。更适合做客房或书房，或者给命卦在这里是吉方的人住（见下方）。`),
        });
    } else {
      rooms.push(good || main === 'C'
        ? {
          ok: 'good', title,
          text: main === 'C'
            ? L('An open, shared room in the centre keeps the heart of the house active. Good.', '中宫是开放的公共空间，能让房子的"心脏"保持活跃，很好。')
            : L(`A lively family room on an auspicious sector (${m}) activates it. Good.`, `常有人活动的公共空间落在吉方（${m}），可以把吉气带动起来，很好。`),
        }
        : { ok: 'info', title, text: L(`Inauspicious for the house (${m}). This is fine for a busy shared space; avoid a desk or sofa facing ${dirList(dirsByStar(sit, false))} for long periods.`, `对这间屋子来说是凶方（${m}）。做热闹的公共空间问题不大，但避免书桌或沙发长时间朝向${dirList(dirsByStar(sit, false))}。`) });
    }
  }

  if (renovated) {
    const hp = palaceAt(RENOVATED_HOB.x, RENOVATED_HOB.z, 'gf', true);
    const hs = hp === 'C' ? null : starAt(sit, hp);
    const hobRoom = all.find((r) => r.level === 'gf' && inside(RENOVATED_HOB, r));
    const bad = !!hs && !STARS[hs].good;
    rooms.push({
      ok: bad ? 'good' : 'warn',
      title: L(`Induction hob${hobRoom ? ` (${roomName(hobRoom)})` : ''}: `, `电磁炉${hobRoom ? `（${roomName(hobRoom)}）` : ''}：`) + `${palaceTag(hp)}${hs ? ` · ${starTag(hs)}` : ''}`,
      text: L(
        (bad ? 'The stove sits on an inauspicious sector, which suppresses it. Good. ' : 'The stove sits on an auspicious sector. ') +
          `It backs onto the east wall, so it faces west (${starTag(starAt(sit, 'W'))}). Some masters prefer a stove facing ${dirList(goodDirs)}, but this is a minor point for an induction hob.`,
        (bad ? '炉灶坐在凶方，可以压住凶星，很好。' : '炉灶坐在吉方。') +
          `它背靠东墙，所以灶口朝西（${starTag(starAt(sit, 'W'))}）。有些师傅认为灶口最好朝向${dirList(goodDirs)}，不过对电磁炉来说影响不大。`,
      ),
    });
    if (hp === 'N') rooms.push({ ok: 'info', title: L('Hob: fire in a Water sector', '炉灶：火在水位'), text: waterFire() });
  }
  return { general, rooms };
}

function waterFire() {
  return L("Water–fire clash. Don't put the sink and the hob right next to or facing each other; leave a worktop gap between them.", '水火相冲。水槽和炉灶不要紧挨着或正对着，中间留一段台面隔开。');
}

export function personReading(o: Occupant, renovated: boolean): PersonReading | null {
  const kua = kuaNumber(o.birth, o.gender);
  if (!kua) return null;
  const sit = KUA_DIR[kua];
  const bedrooms = indoorRooms(renovated).filter(isBed).map((room) => {
    const palace = palacesOf(room, room.level, renovated)[0]?.palace ?? 'C';
    return { room, palace, star: palace === 'C' ? null : starAt(sit, palace) };
  }).sort((a, b) => (a.star ? STARS[a.star].rank : 9) - (b.star ? STARS[b.star].rank : 9));
  return { occupant: o, kua, east: isEastGroup(kua), good: dirsByStar(sit, true), bad: dirsByStar(sit, false), bedrooms };
}

/* ------------------------------------------------------------------ */
/*  3D overlay                                                          */
/* ------------------------------------------------------------------ */
const STAR_COLOR: Record<Star, string> = {
  sheng: '#1e8e3e', tian: '#34a853', yan: '#5bb974', fu: '#81c995',
  huo: '#f6aea9', liu: '#ee675c', wu: '#d93025', jue: '#a50e0e',
};
const FONT = '"Segoe UI", "Microsoft YaHei", "PingFang SC", Roboto, Arial, sans-serif';

function palaceLabel(p: Palace, star: Star | null) {
  const c = document.createElement('canvas');
  c.width = 560;
  c.height = 250;
  const ctx = c.getContext('2d')!;
  const col = star ? STAR_COLOR[star] : '#f9ab00';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.roundRect(6, 6, c.width - 12, c.height - 12, 24);
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = col;
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1d2a36';
  ctx.font = `700 52px ${FONT}`;
  const t = TRIGRAM[p];
  ctx.fillText(p === 'C' ? L('中宫 Centre', '中宫') : L(`${p} ${DIR_ZH[p]} · ${t.zh}`, `${DIR_ZH[p]} · ${t.zh}卦`), c.width / 2, 70);
  ctx.font = `500 32px ${FONT}`;
  ctx.fillStyle = '#5b6b78';
  ctx.fillText(L(t.element, `五行属${ELEMENT_ZH[t.element]}`), c.width / 2, 112);
  ctx.fillStyle = col;
  ctx.font = `700 54px ${FONT}`;
  ctx.fillText(star ? starName(star) : L('Keep open & bright', '宜开阔明亮'), c.width / 2, 178);
  ctx.font = `500 28px ${FONT}`;
  ctx.fillStyle = '#34495e';
  ctx.fillText(star ? starMeaning(star) : L('heart of the house', '房子的心脏'), c.width / 2, 222);
  return canvasToTexture(c);
}

export class FengShuiOverlay {
  root = new THREE.Group();
  groups: Record<'gf' | 'ff', THREE.Group> = { gf: new THREE.Group(), ff: new THREE.Group() };
  renovated = false;
  /** sitting trigram the stars are read from: the house (N) or an occupant's Kua */
  sitting: Dir = HOUSE_SITTING;
  /** language the palace labels were drawn in */
  lang: Lang = lang;

  constructor() {
    this.root.name = 'fengshui';
    this.root.userData.noAO = true;
    this.root.add(this.groups.gf, this.groups.ff);
    this.rebuild();
  }

  rebuild() {
    for (const g of Object.values(this.groups)) {
      for (const c of [...g.children]) {
        g.remove(c);
        const m = c as THREE.Mesh;
        m.geometry.dispose();
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
    }
    for (const level of ['gf', 'ff'] as const) {
      const y = (level === 'gf' ? 0 : Y_FF) + 0.009;
      for (const { palace, rect } of cells(floorBounds(level, this.renovated))) {
        const star = palace === 'C' ? null : starAt(this.sitting, palace);
        const color = star ? STAR_COLOR[star] : '#f9ab00';
        const w = rect.x1 - rect.x0, d = rect.z1 - rect.z0;
        const tint = new THREE.Mesh(
          new THREE.PlaneGeometry(w - 0.06, d - 0.06),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.28, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
        );
        tint.rotation.x = -Math.PI / 2;
        tint.position.set((rect.x0 + rect.x1) / 2, y, (rect.z0 + rect.z1) / 2);
        tint.renderOrder = 8;
        this.groups[level].add(tint);
        const lw = Math.min(1.7, w * 0.85);
        const label = new THREE.Mesh(
          new THREE.PlaneGeometry(lw, lw * (250 / 560)),
          new THREE.MeshBasicMaterial({ map: palaceLabel(palace, star), transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -5, polygonOffsetUnits: -5 }),
        );
        label.rotation.x = -Math.PI / 2;
        // near the palace's north edge so it doesn't cover the room labels at the room centres
        label.position.set((rect.x0 + rect.x1) / 2, y + 0.004, rect.z0 + 0.25 + lw * (125 / 560));
        label.renderOrder = 11;
        this.groups[level].add(label);
      }
    }
  }
}

/**
 * Sun position for the house site, clocked in Malaysia time (MYT = UTC+8, no DST).
 * Uses the NOAA / Astronomical Almanac low-precision formulae (≈0.01° accuracy),
 * more than enough for shadows.
 *
 * Azimuth is a compass bearing: 0° = north, 90° = east, 180° = south, 270° = west.
 * The house front (street side, +Z in the 3D scene) faces SOUTH, so in world space
 * north = −Z, east = +X, south = +Z, west = −X.
 */
export const SITE = { name: 'Kuala Lumpur', lat: 3.139, lon: 101.687 };
export const MYT_OFFSET_H = 8;
export const HOUSE_FACING = 'south';

const RAD = Math.PI / 180;

export interface SunPos {
  azimuth: number; // degrees, compass bearing
  elevation: number; // degrees above the horizon (refraction corrected)
}

export function sunPosition(date: Date, lat = SITE.lat, lon = SITE.lon): SunPos {
  const n = date.getTime() / 86400000 + 2440587.5 - 2451545.0; // days since J2000
  const L = (280.46 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * RAD;
  const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
  const eps = (23.439 - 0.0000004 * n) * RAD;
  const ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
  const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
  const gmst = (280.46061837 + 360.98564736629 * n) % 360;
  const H = (gmst + lon) * RAD - ra; // local hour angle
  const phi = lat * RAD;
  const sinEl = Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H);
  let el = Math.asin(Math.max(-1, Math.min(1, sinEl))) / RAD;
  const az = Math.atan2(-Math.sin(H), Math.tan(dec) * Math.cos(phi) - Math.sin(phi) * Math.cos(H)) / RAD;
  // atmospheric refraction (Saemundsson), only meaningful near / above the horizon
  if (el > -1) el += 1.02 / Math.tan((el + 10.3 / (el + 5.11)) * RAD) / 60;
  return { azimuth: (az + 360) % 360, elevation: el };
}

/* ---------------- Malaysia-time helpers ---------------- */

/** calendar parts of an instant as seen on a clock in Malaysia */
export function mytParts(d: Date) {
  const s = new Date(d.getTime() + MYT_OFFSET_H * 3600000);
  return { y: s.getUTCFullYear(), m: s.getUTCMonth() + 1, d: s.getUTCDate(), min: s.getUTCHours() * 60 + s.getUTCMinutes(), dow: s.getUTCDay() };
}

/** instant for a Malaysia wall-clock date (YYYY-MM-DD) + minutes after midnight */
export function fromMYT(ymd: string, minutes: number): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0) - MYT_OFFSET_H * 3600000 + minutes * 60000);
}

export function ymdOf(d: Date) {
  const p = mytParts(d);
  return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
}

export function fmtClock(minutes: number) {
  const h = Math.floor(minutes / 60) % 24, m = Math.floor(minutes % 60);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function fmtDate(d: Date) {
  const p = mytParts(d);
  return `${DOW[p.dow]}, ${p.d} ${MON[p.m - 1]} ${p.y}`;
}

export function compass(az: number) {
  const pts = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return pts[Math.round(az / 22.5) % 16];
}

/** sunrise / solar noon / sunset (minutes after MYT midnight) for a Malaysia date */
export function sunTimes(ymd: string) {
  let rise = NaN, set = NaN, noon = 0, best = -99;
  let prev = sunPosition(fromMYT(ymd, 0)).elevation;
  for (let t = 1; t <= 1440; t++) {
    const e = sunPosition(fromMYT(ymd, t)).elevation;
    // upper limb touches the horizon at −0.27° (refraction is already included)
    if (prev < -0.27 && e >= -0.27) rise = t - 1 + (-0.27 - prev) / (e - prev);
    if (prev >= -0.27 && e < -0.27) set = t - 1 + (prev + 0.27) / (prev - e);
    if (e > best) { best = e; noon = t; }
    prev = e;
  }
  return { rise, set, noon, maxEl: best };
}

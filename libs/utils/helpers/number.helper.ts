import { BettingSlip } from '@lib/core/databases/postgres';

export function round(number: number, precision: number) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function isNegative(num: unknown) {
  if (typeof num === 'number' && Math.sign(num) === -1) return true;
  return false;
}

export function calTotalOdds(slips: BettingSlip[]) {
  return slips.length
    ? slips.reduce((total, slips) => (total *= slips.odds), 1)
    : 0;
}

export function parseFloat(number: number, precision: number): number {
  let str = number.toString();
  str = str.slice(0, str.indexOf('.') + precision + 1);
  return Number(str);
}

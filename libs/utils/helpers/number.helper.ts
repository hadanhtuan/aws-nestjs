
export function round(number: number, precision: number) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function isNegative(num: unknown) {
  if (typeof num === 'number' && Math.sign(num) === -1) return true;
  return false;
}

export function parseFloat(number: number, precision: number): number {
  let str = number.toString();
  str = str.slice(0, str.indexOf('.') + precision + 1);
  return Number(str);
}

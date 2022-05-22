export function NFKDbytes(str: string): Uint8Array {
  str = str.normalize('NFKD');
  const points: number[] = [];
  let i = 0;
  while (i < str.length) {
    const point = str.codePointAt(i);
    if (point == null) {
      i += 1;
      continue;
    }
    points.push(point);
    const ch = String.fromCodePoint(point);
    i += ch.length;
  }
  return new Uint8Array(points);
}

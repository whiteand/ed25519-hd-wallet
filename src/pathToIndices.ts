export function pathToIndices(path: string): number[] {
  const parts = path.split('/');
  let indices: number[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isHardened = part.slice(-1) === "'";
    const index = isHardened
      ? parseInt(part.slice(0, -1), 10) + 2 ** 31
      : parseInt(part, 10);
    if (Number.isNaN(index) || index < 0) throw new Error('Invalid BIP32 path');
    indices[i] = index;
  }
  return indices;
}

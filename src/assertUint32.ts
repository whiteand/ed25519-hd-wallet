export function assertUint32(i: number): void {
  if (i < 0) {
    throw new Error('i should be not less than 0');
  }
  if (i >= 2 ** 32) {
    throw new Error('i should be less than 2**32');
  }
}

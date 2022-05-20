export function concat(...arrs: (Uint8Array | number[])[]): Uint8Array {
  let len = 0;
  for (const arr of arrs) {
    len += arr.length;
  }
  const result = new Uint8Array(len);
  let offset = 0;
  for (const arr of arrs) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

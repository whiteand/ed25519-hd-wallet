// [[kL, kR], A, c]
export function uint32ToBytes(uint32: number): Uint8Array {
  const res = new Uint8Array(4);
  const dw = new DataView(res.buffer, 0, 4);
  dw.setUint32(0, uint32, true);
  return res;
}

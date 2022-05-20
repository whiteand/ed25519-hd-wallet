import { Uint256, Uint256Bytes } from './types';

export function uint256ToBytes(uint256: Uint256): Uint256Bytes {
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    const byte = Number((uint256 >> BigInt(8 * i)) & 0xffn);
    bytes[i] = byte;
  }
  return bytes as Uint256Bytes;
}

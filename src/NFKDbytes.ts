import { TextEncoder } from 'util';

export function NFKDbytes(str: string): Uint8Array {
  const textEncoder = new TextEncoder();
  return textEncoder.encode(str.normalize('NFKD'));
}

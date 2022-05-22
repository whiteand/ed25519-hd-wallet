import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';
import { Uint512Bytes } from './types';

export function Fk(message: Uint8Array, secret: Uint8Array): Uint512Bytes {
  return hmac(sha512, secret, message) as Uint512Bytes;
}
export function Fk256(message: Uint8Array, secret: Uint8Array): Uint512Bytes {
  return hmac(sha256, secret, message) as Uint512Bytes;
}

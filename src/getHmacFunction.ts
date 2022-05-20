import * as c from 'crypto';
import { Uint512Bytes } from './types';

function getHmacFunction(
  algorithm: 'sha256' | 'sha512'
): (message: Uint8Array, secret: Uint8Array) => Uint512Bytes {
  return (message: Uint8Array, secret: Uint8Array) => {
    const hmac = c.createHmac(algorithm, secret);
    hmac.update(message);
    const digest = hmac.digest();
    return new Uint8Array(digest) as Uint512Bytes;
  };
}
export const Fk = getHmacFunction('sha512');
export const Fk256 = getHmacFunction('sha256');

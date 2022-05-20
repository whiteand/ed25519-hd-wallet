import { concat } from './concat';
import { Fk } from './getHmacFunction';
import { Uint256Bytes, Uint512Bytes } from './types';

export function getZAndCForNotHardernedDerivation(
  AP: Uint256Bytes,
  cP: Uint256Bytes,
  iBytes: Uint8Array
): { Z: Uint512Bytes; c: Uint256Bytes } {
  return {
    Z: Fk(concat([2], AP, iBytes), cP),
    c: Fk(concat([3], AP, iBytes), cP).slice(32) as Uint256Bytes,
  };
}

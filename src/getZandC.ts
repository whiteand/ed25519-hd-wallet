import { concat } from './concat';
import { Fk } from './getHmacFunction';
import { getZAndCForNotHardernedDerivation } from './getZAndCForNotHardernedDerivation';
import { Uint256Bytes, Uint512Bytes } from './types';
import { uint32ToBytes } from './uint32ToBytes';

export function getZandC(
  kLP: Uint256Bytes,
  kRP: Uint256Bytes,
  AP: Uint256Bytes,
  cP: Uint256Bytes,
  i: number
): { Z: Uint512Bytes; c: Uint256Bytes } {
  const iBytes = uint32ToBytes(i);
  return i < 2 ** 31
    ? // regular child
      getZAndCForNotHardernedDerivation(AP, cP, iBytes)
    : // hardened child
      {
        Z: Fk(concat([0], kLP, kRP, iBytes), cP),
        c: Fk(concat([1], kLP, kRP, iBytes), cP).slice(32) as Uint256Bytes,
      };
}

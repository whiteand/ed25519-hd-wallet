import { deriveSeedPublic } from './deriveSeedPublic';
import { pathToIndices } from './pathToIndices';
import { Uint256Bytes, Uint512Bytes } from './types';

export function deriveSeedPublicFromStringPath(
  path: string,
  seed: Uint512Bytes
): [Uint256Bytes, Uint256Bytes] | null {
  return deriveSeedPublic(pathToIndices(path), seed);
}

import { deriveSeedPublic } from './deriveSeedPublic';
import { pathToIndices } from './pathToIndices';
import { Uint512Bytes } from './types';
import { IPublicDerivationNode } from './types';

export function deriveSeedPublicFromStringPath(
  path: string,
  seed: Uint512Bytes
): IPublicDerivationNode | null {
  return deriveSeedPublic(pathToIndices(path), seed);
}

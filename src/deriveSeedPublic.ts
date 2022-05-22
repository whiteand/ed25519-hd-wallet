import { derivePublic } from './derivePublic';
import { rootKeySlip10 } from './rootKeySlip10';
import { Uint256Bytes, Uint512Bytes } from './types';

export function deriveSeedPublic(
  derivationPathIndices: number[],
  seed: Uint512Bytes
): [Uint256Bytes, Uint256Bytes] | null {
  const root = rootKeySlip10(seed);
  return derivePublic(derivationPathIndices, root[1], root[2]);
}

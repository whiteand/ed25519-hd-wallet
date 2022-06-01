import { derivePublic } from './derivePublic';
import { rootKeySlip10 } from './rootKeySlip10';
import { Uint512Bytes } from './types';
import { IPublicDerivationNode } from './types';

export function deriveSeedPublic(
  derivationPathIndices: number[],
  seed: Uint512Bytes
): IPublicDerivationNode | null {
  const root = rootKeySlip10(seed);
  return derivePublic(derivationPathIndices, root.publicKey, root.chainCode);
}

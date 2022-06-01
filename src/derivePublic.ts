import { publicChildKey } from './publicChildKey';
import { Uint256Bytes } from './types';
import { IPublicDerivationNode } from './types';

export function derivePublic(
  derivationPathIndices: number[],
  publicKey: Uint256Bytes,
  chainCode: Uint256Bytes
): IPublicDerivationNode | null {
  return derivationPathIndices.reduce(
    (node: IPublicDerivationNode | null, ind) =>
      publicChildKey(node, ind),
    { publicKey, chainCode }
  );
}

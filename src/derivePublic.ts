import { publicChildKey } from './publicChildKey';
import { Uint256Bytes } from './types';

export function derivePublic(
  derivationPathIndices: number[],
  A: Uint256Bytes,
  c: Uint256Bytes
): [Uint256Bytes, Uint256Bytes] | null {
  return derivationPathIndices.reduce(
    (node: [Uint256Bytes, Uint256Bytes] | null, ind) =>
      publicChildKey(node, ind),
    [A, c]
  );
}

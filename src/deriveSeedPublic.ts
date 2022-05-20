import { pathToIndices } from './pathToIndices';
import { publicChildKey } from './publicChildKey';
import { rootKeySlip10 } from './rootKeySlip10';
import { Uint256Bytes, Uint512Bytes } from './types';

export function deriveSeedPublic(
  path: string,
  seed: Uint512Bytes
): [Uint256Bytes, Uint256Bytes] | null {
  const root = rootKeySlip10(seed);
  return pathToIndices(path).reduce(
    (node: [Uint256Bytes, Uint256Bytes] | null, ind) =>
      publicChildKey(node, ind),
    [root[1], root[2]]
  );
}

import { pathToIndices } from './pathToIndices';
import { privateChildKey } from './privateChildKey';
import { rootKeySlip10 } from './rootKeySlip10';
import { TNode, Uint512Bytes } from './types';

/**
   INPUT:
        path: string path to derive (eg 42'/1/2)
        seed: 512 bits seed (eg: 512bits from BIP39 words)
    OUTPUT
        kL,kR : 64bytes private EDDSA key
        c     : 32 bytes chain code
 */

export function deriveSeedPrivate(
  path: string,
  seed: Uint512Bytes
): TNode | null {
  const root = rootKeySlip10(seed);
  return pathToIndices(path).reduce(
    (node: TNode | null, ind) => privateChildKey(node, ind),
    root
  );
}

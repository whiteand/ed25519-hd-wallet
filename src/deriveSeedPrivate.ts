import { pathToIndices } from './pathToIndices';
import { rootKeySlip10 } from './rootKeySlip10';
import { IPrivateDerivationNode, Uint512Bytes } from './types';
import { derivePrivate } from './derivePrivate';

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
): IPrivateDerivationNode | null {
  const root = rootKeySlip10(seed);
  const indicies = pathToIndices(path);
  return derivePrivate(indicies, root);
}

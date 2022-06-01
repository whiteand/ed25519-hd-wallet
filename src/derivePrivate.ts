import { privateChildKey } from './privateChildKey';
import { IPrivateDerivationNode } from './types';

export function derivePrivate(indicies: number[], root: IPrivateDerivationNode): IPrivateDerivationNode | null {
  return indicies.reduce(
    (node: IPrivateDerivationNode | null, ind) => privateChildKey(node, ind),
    root
  );
}

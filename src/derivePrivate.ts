import { privateChildKey } from './privateChildKey';
import { TNode } from './types';

export function derivePrivate(indicies: number[], root: TNode): TNode | null {
  return indicies.reduce(
    (node: TNode | null, ind) => privateChildKey(node, ind),
    root
  );
}

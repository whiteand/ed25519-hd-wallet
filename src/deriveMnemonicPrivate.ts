import { deriveSeedPrivate } from './deriveSeedPrivate';
import { mnemonicToSeed } from './mnemonicToSeed';
import { TNode } from './types';

export async function deriveMnemonicPrivate(
  path: string,
  mnemonic: string[],
  passphrase: string = '',
  prefix: string = 'mnemonic'
): Promise<TNode | null> {
  const seed = await mnemonicToSeed(mnemonic, passphrase, prefix);
  return deriveSeedPrivate(path, seed);
}

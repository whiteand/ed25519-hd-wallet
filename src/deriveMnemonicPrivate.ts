import { deriveSeedPrivate } from './deriveSeedPrivate';
import { mnemonicToSeed } from './mnemonicToSeed';
import { IPrivateDerivationNode } from './types';

export async function deriveMnemonicPrivate(
  path: string,
  mnemonic: string,
  passphrase: string = '',
  prefix: string = 'mnemonic'
): Promise<IPrivateDerivationNode | null> {
  const seed = await mnemonicToSeed(mnemonic, passphrase, prefix);
  return deriveSeedPrivate(path, seed);
}

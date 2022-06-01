import { deriveSeedPublicFromStringPath } from './deriveSeedPublicFromStringPath';
import { mnemonicToSeed } from './mnemonicToSeed';
import { IPublicDerivationNode } from './types';

export async function deriveMnemonicPublic(
  path: string,
  mnemonic: string,
  passphrase: string = '',
  prefix: string = 'mnemonic'
): Promise<IPublicDerivationNode | null> {
  const seed = await mnemonicToSeed(mnemonic, passphrase, prefix);
  return deriveSeedPublicFromStringPath(path, seed);
}

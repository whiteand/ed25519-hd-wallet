import { deriveSeedPublicFromStringPath } from './deriveSeedPublicFromStringPath';
import { mnemonicToSeed } from './mnemonicToSeed';

export async function deriveMnemonicPublic(
  path: string,
  mnemonic: string,
  passphrase: string = '',
  prefix: string = 'mnemonic'
) {
  const seed = await mnemonicToSeed(mnemonic, passphrase, prefix);
  return deriveSeedPublicFromStringPath(path, seed);
}

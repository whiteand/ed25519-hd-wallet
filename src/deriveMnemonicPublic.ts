import { deriveSeedPublic } from './deriveSeedPublic';
import { mnemonicToSeed } from './mnemonicToSeed';

export async function deriveMnemonicPublic(
  path: string,
  mnemonic: string[],
  passphrase: string = '',
  prefix: string = 'mnemonic'
) {
  const seed = await mnemonicToSeed(mnemonic, passphrase, prefix);
  return deriveSeedPublic(path, seed);
}

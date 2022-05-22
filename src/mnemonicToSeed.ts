import { NFKDbytes } from './NFKDbytes';
import { Uint512Bytes } from './types';
import { pbkdf2Async } from '@noble/hashes/pbkdf2';
import { sha512 } from '@noble/hashes/sha512';

/**
 INPUT:
       mnemonic: BIP39 words
       passphrase: optional passphrase
       prefix: optional prefix
    OUTPUT:
       512bits seed
    PROCESS:
       1. if passphrase not provided, set passphrase to empty string
       2. if prefix not provided, set prefix to empty string 'mnemonic'
       3. compute seed:
            - compute m_ = NFKD(mnemonic)
            - compute p_ = NFKD(prefix | passphrase)
            - seed = PBKDF_SHA512(password=m_, salt=p_, round=2048)
       4. return 512bits seed
 */

export async function mnemonicToSeed(
  mnemonic: string[],
  passphrase: string = '',
  prefix: string = 'mnemonic'
): Promise<Uint512Bytes> {
  const res = await pbkdf2Async(
    sha512,
    NFKDbytes(mnemonic.join(' ')),
    NFKDbytes(prefix + passphrase),
    {
      c: 2048,
      dkLen: 64,
    }
  );
  return res as Uint512Bytes;
}

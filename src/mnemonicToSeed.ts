import * as c from 'crypto';
import { NFKDbytes } from './NFKDbytes';
import { Uint512Bytes } from './types';

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
  //   const seed = hashlib.pbkdf2_hmac('sha512', _NFKDbytes(mnemonic), _NFKDbytes(prefix+passphrase), 2048)
  return new Promise<Uint512Bytes>((resolve, reject) =>
    c.pbkdf2(
      NFKDbytes(mnemonic.join(' ')),
      NFKDbytes(prefix + passphrase),
      2048,
      64,
      'sha512',
      (err, derivedKey) => {
        if (err != null) {
          reject(err);
          return;
        }
        const bytes = new Uint8Array(derivedKey) as Uint512Bytes;
        resolve(bytes);
      }
    )
  );
}

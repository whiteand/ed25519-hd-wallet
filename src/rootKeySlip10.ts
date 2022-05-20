import { concat } from './concat';
import { fromLE } from './fromLE';
import { Fk, Fk256 } from './getHmacFunction';
import { multiplyBase } from './multiplyBase';
import { NFKDbytes } from './NFKDbytes';
import { TNode, Uint256Bytes } from './types';

/**
INPUT:
    S: 512 bits seed from BIP39/BIP32
    seedkey:"ed25519 seed"
OUTPUT:
    k = (kL,kR), c
PROCESS:
    1. compute c = HMAC-SHA256(key=seedkey,0x01 || Data = S)
    2. compute I = HMAC-SHA512(key=seedkey, Data=S)
    3. split I = into tow sequence of 32-bytes sequence kL,Kr
    4. if the third highest bit of the last byte ok kL is not zero:
        S = I
        goto step 1
    5. Set the bits in kL as follows:
        - the lowest 3 bits of the first byte of kL of are cleared
        - the highest bit of the last byte is cleared
        - the second highest bit of the last byte is set
    6. return (kL,kR), c
 */

export function rootKeySlip10(masterSecret: Uint8Array): TNode {
  const key = NFKDbytes('ed25519 seed');
  // root chain code
  const c = (Fk256(concat([1], masterSecret), key) as unknown) as Uint256Bytes;
  // KL:KR
  let I = Fk(masterSecret, key);
  let kL: Uint256Bytes = I.slice(0, 32) as Uint256Bytes;
  let kR: Uint256Bytes = I.slice(32, 64) as Uint256Bytes;
  while ((kL[31] & 0b00100000) !== 0) {
    masterSecret = I;
    I = Fk(masterSecret, key);
    kL = I.slice(0, 32) as Uint256Bytes;
    kR = I.slice(32, 64) as Uint256Bytes;
  }
  // the lowest 3 bits of the first byte of kL of are cleared
  kL[0] &= 248;
  // the highest bit of the last byte is cleared
  kL[31] &= 127;
  // the second highest bit of the last byte is set
  kL[31] |= 64;

  const kScalar = fromLE(kL);
  const P = multiplyBase(kScalar);
  const A = P.toRawBytes() as Uint256Bytes;
  return [[kL, kR], A, c];
}

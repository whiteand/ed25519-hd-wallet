import { CURVE } from '@noble/ed25519';
import { assertUint32 } from './assertUint32';
import { fromLE } from './fromLE';
import { getZandC } from './getZandC';
import { multiplyBase } from './multiplyBase';
import { IPrivateDerivationNode, Uint256, Uint256Bytes } from './types';
import { uint256ToBytes } from './uint256ToBytes';

/**
    INPUT:
      (kL,kR): 64 bytes private eddsa key
      A      : 32 bytes public key (y coordinatte only), optionnal as A = kR.G (y coordinatte only)
      c      : 32 bytes chain code
      i      : child index to compute (hardened if >= 0x80000000)
    OUTPUT:
      (kL_i,kR_i): 64 bytes ith-child private eddsa key
      A_i        : 32 bytes ith-child public key, A_i = kR_i.G (y coordinatte only)
      c_i        : 32 bytes ith-child chain code
    PROCESS:
      1. encode i 4-bytes little endian, il = encode_U32LE(i)
      2. if i is less than 2^31
           - compute Z   = HMAC-SHA512(key=c, Data=0x02 | A | il )
           - compute c_  = HMAC-SHA512(key=c, Data=0x03 | A | il )
         else
           - compute Z   = HMAC-SHA512(key=c, Data=0x00 | kL | kR | il )
           - compute c_  = HMAC-SHA512(key=c, Data=0x01 | kL | kR | il )
      3. ci = lowest_32bytes(c_)
      4. set ZL = highest_28bytes(Z)
         set ZR = lowest_32bytes(Z)
      5. compute kL_i:
            zl_  = LEBytes_to_int(ZL)
            kL_  = LEBytes_to_int(kL)
            kLi_ = zl_*8 + kL_
            if kLi_ % order == 0: child does not exist
            kL_i = int_to_LEBytes(kLi_)
      6. compute kR_i
            zr_  = LEBytes_to_int(ZR)
            kR_  = LEBytes_to_int(kR)
            kRi_ = (zr_ + kRn_) % 2^256
            kR_i = int_to_LEBytes(kRi_)
      7. compute A
            A = kLi_.G
      8. return (kL_i,kR_i), A_i, c
 */

export function privateChildKey(node: IPrivateDerivationNode | null, i: number): IPrivateDerivationNode | null {
  if (node == null) return null;
  assertUint32(i);
  // unpack argument
  const { KL: parentKL, KR: parentKR, publicKey: parentPublicKey, chainCode: parentChainCode } = node

  const { Z, c } = getZandC(parentKL, parentKR, parentPublicKey, parentChainCode, i);
  const ZL = Z.slice(0, 28);
  const ZR = Z.slice(32) as Uint256Bytes;
  const kLn = (fromLE(ZL) * 8n + fromLE(parentKL)) as Uint256;
  if (kLn % CURVE.n == 0n) {
    return null;
  }
  // compute KRi
  const kRn = ((fromLE(ZR) + fromLE(parentKR)) % 2n ** 256n) as Uint256;
  const kL = uint256ToBytes(kLn);
  const kR = uint256ToBytes(kRn);

  // compute Ai
  const kScalar = fromLE(kL);
  const P = multiplyBase(kScalar);
  const A = P.toRawBytes() as Uint256Bytes;

  return {
    KL: kL,
    KR: kR,
    publicKey: A,
    chainCode: c
  }
}

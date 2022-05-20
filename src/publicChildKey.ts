import { Point } from '@noble/ed25519';
import { assertUint32 } from './assertUint32';
import { fromLE } from './fromLE';
import { getZAndCForNotHardernedDerivation } from './getZAndCForNotHardernedDerivation';
import { multiplyBase } from './multiplyBase';
import { Uint256Bytes } from './types';
import { uint32ToBytes } from './uint32ToBytes';

/**
    INPUT:
      A      : 32 bytes public key (y coordinatte only), optionnal as A = kR.G (y coordinatte only)
      c      : 32 bytes chain code
      i      : child index to compute (hardened if >= 0x80000000)
    OUTPUT:
      A_i        : 32 bytes ith-child public key, A_i = kR_i.G (y coordinatte only)
      c_i        : 32 bytes ith-child chain code
    PROCESS:
      1. encode i 4-bytes little endian, il = encode_U32LE(i)
      2. if i is less than 2^31
           - compute Z   = HMAC-SHA512(key=c, Data=0x02 | A | il )
           - compute c_  = HMAC-SHA512(key=c, Data=0x03 | A | il )
         else
           - reject inputed, hardened path for public path is not possible
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

export function publicChildKey(
  node: [Uint256Bytes, Uint256Bytes] | null,
  i: number
): [Uint256Bytes, Uint256Bytes] | null {
  if (node == null) return null;

  const AP = node[0];
  const cP = node[1];

  assertUint32(i);

  if (i >= 2 ** 31) {
    // harderned input:hardened path for public path is not possible
    return null;
  }

  const { Z, c } = getZAndCForNotHardernedDerivation(AP, cP, uint32ToBytes(i));

  const ZL = Z.slice(0, 28);

  const ZLint = fromLE(ZL);
  const ZLint_x_8 = 8n * ZLint;
  const P = multiplyBase(ZLint_x_8);
  const Q = Point.fromHex(AP);
  const PQ = P.add(Q);
  const A = PQ.toRawBytes() as Uint256Bytes;
  return [A, c];
}

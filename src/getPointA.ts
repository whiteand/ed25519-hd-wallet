import { fromLE } from './fromLE';
import { multiplyBase } from './multiplyBase';
import { Uint256Bytes } from './types';

export function getPointA(kL: Uint256Bytes): Uint256Bytes {
  const kScalar = fromLE(kL);
  const P = multiplyBase(kScalar);
  return P.toRawBytes() as Uint256Bytes;
}

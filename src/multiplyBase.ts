import { CURVE, Point } from '@noble/ed25519';

export function multiplyBase(scalar: bigint): Point {
  return Point.BASE.multiply(scalar % CURVE.l);
}

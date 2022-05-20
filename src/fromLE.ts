export function fromLE(bytes: Uint8Array | number[]): bigint {
  let result = 0n;
  for (let i = bytes.length - 1; i >= 0; i--) {
    result = result * 256n + BigInt(bytes[i]);
  }
  return result;
}

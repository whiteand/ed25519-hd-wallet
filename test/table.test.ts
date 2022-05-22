import testcases from './testcases.json';
import { derivePublic } from '../src/derivePublic';
import { derivePrivate } from '../src/derivePrivate';
import { getPointA } from '../src/getPointA';
import { Uint256Bytes } from '../src/types';

function fromHex(string: string): Uint8Array {
  if (string.length % 2 !== 0) {
    throw new Error('invalid hex: ' + string);
  }
  const res = new Uint8Array(string.length / 2);
  for (let i = 0; i < string.length; i += 2) {
    const byteHex = string.slice(i, i + 2);
    const byte = parseInt(byteHex, 16);
    if (!Number.isSafeInteger(byte)) {
      throw new Error('invalid hex: ' + JSON.stringify(byteHex));
    }
    res[i / 2] = byte;
  }
  return res;
}

describe.each(testcases)('%#', obj => {
  const kl = fromHex(obj.kl) as Uint256Bytes;
  const kr = fromHex(obj.kr) as Uint256Bytes;
  const chainCode = fromHex(obj.chain_code) as Uint256Bytes;
  test('public derivations', () => {
    const publicDerivations = obj.public_derivations;
    for (const publicDerivation of publicDerivations) {
      const path = publicDerivation.path;
      const expectedChainCode = fromHex(publicDerivation.expected_chain_code);
      const expectedPublicKey = fromHex(publicDerivation.expected_public_key);
      const A = getPointA(kl);
      const res = derivePublic(path, A, chainCode);
      if (!res) {
        throw new Error('wrong result');
      }
      const resultChainCode = res[1];
      const resultPublicKey = res[0];
      if (!resultChainCode) {
        throw new Error('wrong result chain code');
      }
      if (!resultPublicKey) {
        throw new Error('wrong result public key');
      }
      expect(resultPublicKey).toEqual(expectedPublicKey);
      expect(resultChainCode).toEqual(expectedChainCode);
    }
  });
  test('private derivations', () => {
    const privateDerivations = obj.private_derivations;
    for (const privateDerivation of privateDerivations) {
      const expectedChainCode = fromHex(privateDerivation.expected_chain_code);
      const expectedKL = fromHex(privateDerivation.expected_kl);
      const expectedKR = fromHex(privateDerivation.expected_kr);
      const expectedPublicKey = fromHex(privateDerivation.expected_public_key);
      const path = privateDerivation.path;
      const res = derivePrivate(path, [[kl, kr], getPointA(kl), chainCode]);
      if (!res) {
        throw new Error('Wrong Result');
      }
      expect(res[0][0]).toEqual(expectedKL);
      expect(res[0][1]).toEqual(expectedKR);
      expect(res[1]).toEqual(expectedPublicKey);
      expect(res[2]).toEqual(expectedChainCode);
    }
  });
});

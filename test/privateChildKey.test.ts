import { privateChildKey } from '../src/privateChildKey';
import { rootKeySlip10 } from '../src/rootKeySlip10';
import { hex } from './hex';
import { seed } from './seed';

describe('privateChildKey', () => {
  it('private 0', () => {
    const root = rootKeySlip10(seed);
    const res = privateChildKey(root, 0);
    if (!res) {
      throw new Error('expected result');
    }
    expect(hex(res.KL)).toMatchInlineSnapshot(
      `"d00ecc6fab7b90f086e38c1e9480d671eeef013539ee01f750e488091be69d41"`
    );
    expect(hex(res.KR)).toMatchInlineSnapshot(
      `"97d802e2418cf809efa9794ff88fd52f682cb62deeb367383f3594b12140cabe"`
    );
    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"ec3d5540764b043b21b3744d37448d3f2f8b1ff7188ebec476ac190995f6b047"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"cb1f6e0d259c2b17cb1037d84f192fd419d3f674f6a553cbecda77f0e0bfd985"`
    );
  });
  it('private 1', () => {
    const root = rootKeySlip10(seed);
    const res = privateChildKey(root, 1);
    if (!res) {
      throw new Error('expected result');
    }
    expect(hex(res.KL)).toMatchInlineSnapshot(
      `"2040e575fc0f818b60489748f1323a13e401471899a460c806aa55d01ce69d41"`
    );
    expect(hex(res.KR)).toMatchInlineSnapshot(
      `"3ef6a9f8bde8b2071d25936e5e074206e1ffc2e6e0bd3683487f412aa5531e7f"`
    );
    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"7a9e720979f03095cf7af54420ab6e506a35657afe23600eed8bfde379524f1d"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"a2d829e1e17c13864fabffca3b82d2e259e2013d6465683123ed17af759c60d6"`
    );
  });
  it('private 2', () => {
    const root = rootKeySlip10(seed);
    const res = privateChildKey(root, 2);
    if (!res) {
      throw new Error('expected result');
    }
    expect(hex(res.KL)).toMatchInlineSnapshot(
      `"18453ff68ab7ecc7d9c9472c109b5862414e227b3030b01253a95b6a17e69d41"`
    );
    expect(hex(res.KR)).toMatchInlineSnapshot(
      `"5c2f6f9c3dbf3a508a6d37714474dff68ff09e808ce565ea2f23269ca071ccb8"`
    );
    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"0e531b620f8760c54d732cde1d14e8702bf43265a28dd5f9b9e147c312861403"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"1f565d31475c986e2a8dcfb59d315f85708cdb53ff4a7138bac543de91186718"`
    );
  });
  it('private 42', () => {
    const root = rootKeySlip10(seed);
    const res = privateChildKey(root, 42);
    if (!res) {
      throw new Error('expected result');
    }
    expect(hex(res.KL)).toMatchInlineSnapshot(
      `"585f91d6baf7ebde292cc5f968f9b6a63ed1cc9e13491d1412ef0a501ce69d41"`
    );
    expect(hex(res.KR)).toMatchInlineSnapshot(
      `"06070e036baaf7b97a769c8fa4762feb40a0faf60e6e9241f38582315eb9149d"`
    );
    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"8eb713cdfca83e975e6f3302db6fa37d6d26f5debcc1859ecce0eb487b9e9ad1"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"4fd76d7a08686ec75c86228e1e59a3a54a9a97e94c861e188710fd8983a4be23"`
    );
  });
  it('private 42/1', () => {
    const root = rootKeySlip10(seed);
    const res = privateChildKey(root, 42);
    const res2 = privateChildKey(res, 1);
    if (!res2) {
      throw new Error('expected result');
    }
    expect(hex(res2.KL)).toMatchInlineSnapshot(
      `"68dccd955fad1603cb9f85c9030246419ee6ae91fb2021b7c81885bb1ee69d41"`
    );
    expect(hex(res2.KR)).toMatchInlineSnapshot(
      `"aacb9c2c21da2df4521a88f4f05282b2c30bdf881c0fa85cf73d94adcbe23127"`
    );
    expect(hex(res2.publicKey)).toMatchInlineSnapshot(
      `"08a045fe4fb55ef9aada64f206db8afbc16f04c1eeef4ba9bbb33dd7c1717f8d"`
    );
    expect(hex(res2.chainCode)).toMatchInlineSnapshot(
      `"ecdee33430eb22253980f96daef7577a4f80549e0ff4c0d9f790bc88675fee0c"`
    );
  });
});

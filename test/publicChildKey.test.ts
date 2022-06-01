import { publicChildKey } from '../src/publicChildKey';
import { rootKeySlip10 } from '../src/rootKeySlip10';
import { hex } from './hex';
import { seed } from './seed';

describe('publicChildKey', () => {
  it('private 0', () => {
    const root = rootKeySlip10(seed);
    const res = publicChildKey(root, 0);
    if (!res) {
      throw new Error('expected result');
    }
    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"ec3d5540764b043b21b3744d37448d3f2f8b1ff7188ebec476ac190995f6b047"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"cb1f6e0d259c2b17cb1037d84f192fd419d3f674f6a553cbecda77f0e0bfd985"`
    );
  });
  it('private 1', () => {
    const root = rootKeySlip10(seed);
    const res = publicChildKey(root, 1);
    if (!res) {
      throw new Error('expected result');
    }

    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"7a9e720979f03095cf7af54420ab6e506a35657afe23600eed8bfde379524f1d"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"a2d829e1e17c13864fabffca3b82d2e259e2013d6465683123ed17af759c60d6"`
    );
  });
  it('private 2', () => {
    const root = rootKeySlip10(seed);
    const res = publicChildKey(root, 2);
    if (!res) {
      throw new Error('expected result');
    }

    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"0e531b620f8760c54d732cde1d14e8702bf43265a28dd5f9b9e147c312861403"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"1f565d31475c986e2a8dcfb59d315f85708cdb53ff4a7138bac543de91186718"`
    );
  });
  it('private 42', () => {
    const root = rootKeySlip10(seed);
    const res = publicChildKey(root, 42);
    if (!res) {
      throw new Error('expected result');
    }

    expect(hex(res.publicKey)).toMatchInlineSnapshot(
      `"8eb713cdfca83e975e6f3302db6fa37d6d26f5debcc1859ecce0eb487b9e9ad1"`
    );
    expect(hex(res.chainCode)).toMatchInlineSnapshot(
      `"4fd76d7a08686ec75c86228e1e59a3a54a9a97e94c861e188710fd8983a4be23"`
    );
  });
  it('private 42/1', () => {
    const root = rootKeySlip10(seed);
    const res = publicChildKey(root, 42);
    const res2 = publicChildKey(res, 1);
    if (!res2) {
      throw new Error('expected result');
    }
    expect(hex(res2.publicKey)).toMatchInlineSnapshot(
      `"08a045fe4fb55ef9aada64f206db8afbc16f04c1eeef4ba9bbb33dd7c1717f8d"`
    );
    expect(hex(res2.chainCode)).toMatchInlineSnapshot(
      `"ecdee33430eb22253980f96daef7577a4f80549e0ff4c0d9f790bc88675fee0c"`
    );
  });
});

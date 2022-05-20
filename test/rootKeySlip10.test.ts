import { rootKeySlip10 } from '../src/rootKeySlip10';
import { hex } from './hex';
import { seed } from './seed';

describe('rootKeySlip10', () => {
  it('works', () => {
    const result = rootKeySlip10(seed);
    expect(hex(result[0][0])).toMatchInlineSnapshot(
      `"402b03cd9c8bed9ba9f9bd6cd9c315ce9fcc59c7c25d37c85a36096617e69d41"`
    );
    expect(hex(result[0][1])).toMatchInlineSnapshot(
      `"8e35cb4a3b737afd007f0688618f21a8831643c0e6c77fc33c06026d2a0fc938"`
    );
    expect(hex(result[1])).toMatchInlineSnapshot(
      `"291ea7aa3766cd26a3a8688375aa07b3fed73c13d42543a9f19a48dc8b6bfd07"`
    );
    expect(hex(result[2])).toMatchInlineSnapshot(
      `"32596435e70647d7d98ef102a32ea40319ca8fb6c851d7346d3bd8f9d1492658"`
    );
  });
});

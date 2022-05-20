import { concat } from '../src/concat';

describe('concat', () => {
  it('works for uint8Arrays', () => {
    expect(concat(new Uint8Array([1]), new Uint8Array([2]))).toEqual(
      new Uint8Array([1, 2])
    );
  });
  it('works for number[]', () => {
    expect(concat([1], new Uint8Array([2]))).toEqual(new Uint8Array([1, 2]));
    expect(concat(new Uint8Array([1]), [2])).toEqual(new Uint8Array([1, 2]));
    expect(concat([1], [2])).toEqual(new Uint8Array([1, 2]));
  });
});

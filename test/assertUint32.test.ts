import { assertUint32 } from '../src/assertUint32';
describe('assertUint32', () => {
  it('works', () => {
    expect(() => assertUint32(-1)).toThrowErrorMatchingInlineSnapshot(
      `"i should be not less than 0"`
    );
    expect(() => assertUint32(2 ** 32)).toThrowErrorMatchingInlineSnapshot(
      `"i should be less than 2**32"`
    );
    expect(() => assertUint32(2 ** 32 + 1)).toThrowErrorMatchingInlineSnapshot(
      `"i should be less than 2**32"`
    );
    expect(() => assertUint32(2 ** 32 - 1)).not.toThrow();
    expect(() => assertUint32(0)).not.toThrow();
  });
});

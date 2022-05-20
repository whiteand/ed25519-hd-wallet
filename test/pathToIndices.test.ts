import { pathToIndices } from '../src/pathToIndices';

describe('pathToIndices', () => {
  it('works', () => {
    expect(pathToIndices("21/31'")).toMatchInlineSnapshot(`
      Array [
        21,
        2147483679,
      ]
    `);
  });
});

import { mnemonicToSeed } from '../src/mnemonicToSeed';
import { hex } from './hex';

describe('mnemonicToSeed', () => {
  it('works', async () => {
    const seed = await mnemonicToSeed(
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'.split(
        ' '
      ),
      '',
      'mnemonic'
    );
    expect(hex(seed)).toMatchInlineSnapshot(
      `"5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4"`
    );
  });
});

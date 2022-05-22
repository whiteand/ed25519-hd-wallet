export type Uint512Bytes = Uint8Array & { length: 64; byteLength: 64 };

export type Uint256 = bigint & { __UINT256__: true };
export type Uint256Bytes = Uint8Array & { length: 32; byteLength: 32 };
export type TNode = [[Uint256Bytes, Uint256Bytes], Uint256Bytes, Uint256Bytes];

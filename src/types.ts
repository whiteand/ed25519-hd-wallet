export type Uint512Bytes = Uint8Array & { length: 64; byteLength: 64 };

export type Uint256 = bigint & { __UINT256__: true };
export type Uint256Bytes = Uint8Array & { length: 32; byteLength: 32 };

export interface IPublicDerivationNode {
    publicKey: Uint256Bytes;
    chainCode: Uint256Bytes;
}

export interface IPrivateDerivationNode {
    KL: Uint256Bytes
    KR: Uint256Bytes
    publicKey: Uint256Bytes
    chainCode: Uint256Bytes
}

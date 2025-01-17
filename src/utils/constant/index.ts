export const STARKNET_OFFSET = 10 ** 18;
export const DEFAULT_TOKEN_TOTAL_SUPPLY = 10 ** 9;

export const SOLANA_RPC = [
  'https://solana-mainnet.core.chainstack.com/193e0929c7cca56899c54998410635a1',
  'https://solana-mainnet.core.chainstack.com/f0259fffae9f9b4095e692c4a47d4a44',
  'https://solana-mainnet.core.chainstack.com/29efd0e024664d25d9f775d8a89a40a9',
];

export const getRandomRpc = () => {
  return SOLANA_RPC[Math.floor(Math.random() * SOLANA_RPC.length)];
};

export const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

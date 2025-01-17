import { RpcProvider } from 'starknet';

export const getProvider = () => {
  const provider = new RpcProvider({
    nodeUrl:
      'https://starknet-mainnet.core.chainstack.com/a7cc4871885aa29bb7669275e838ea92',
  });

  return provider;
};

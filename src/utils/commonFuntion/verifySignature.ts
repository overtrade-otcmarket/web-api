import { Contract, RpcProvider, typedData } from 'starknet';

export const verifySignLoginStarknet = async (dataSign) => {
  try {
    const provider = new RpcProvider({
      nodeUrl:
        'https://starknet-mainnet.core.chainstack.com/a7cc4871885aa29bb7669275e838ea92',
    });
    const { walletAddress, signData, signature } = dataSign;

    if (Number(signData.message.expire) < Date.now()) {
      console.log('Expire');
      return false;
    }

    if (signData.message.signer !== walletAddress) {
      console.log('Wrong signer');
      return false;
    }

    const { abi: contractAbi } = await provider.getClassAt(walletAddress);

    if (!contractAbi) {
      console.log('No ABI');
      return false;
    }

    const accountContract = new Contract(contractAbi, walletAddress, provider);
    const messageHash = typedData.getMessageHash(signData, walletAddress);

    const verify = await accountContract.is_valid_signature(
      messageHash,
      signature,
    );

    return verify != 0 ? true : false;
  } catch (error) {
    console.log('Exception');
    return false;
  }
};

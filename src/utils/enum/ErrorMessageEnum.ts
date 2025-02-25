export const ErrorCodeEnum = {
  ERR_0: 'ERR_0',
  ERR_1: 'ERR_1',
  ERR_2: 'ERR_2',
  ERR_3: 'ERR_3',
  ERR_4: 'ERR_4',
  ERR_5: 'ERR_5',
  ERR_6: 'ERR_6',
  ERR_7: 'ERR_7',
};

export const ErrorMessageEnum = {
  ERR_0: 'INTERNAL SERVER ERROR',
  ERR_1: 'ROUTE NOT FOUND',
  ERR_2: 'SOMETHING WENT WRONG',
  ERR_3: 'USER NOT FOUND',
  ERR_4: 'UNAUTHORIZED',
  ERR_5: 'TOKEN EXPIRED',
  ERR_6: 'WRONG SIGNATURE',
  ERR_7: 'THE MAXIMUM NUMBER OF FILES IS 50',
  ERR_8: 'THE MAXIMUM SIZE OF FILES IS 50Mb',
  ERR_9: 'THE MAXIMUM SIZE OF FILE IS 10Mb',
  ERR_10: 'INVALID FILE TYPE',
  ERR_11: 'PLEASE DEPLOY AND UPGRADE YOUR WALLET',
  ERR_12: 'NFT DATA NOT EXIST',
  ERR_13: 'THIS TOKEN IS NOT ACTIVATED',
  ERR_14: 'YOU ARE NOT THE OWNER',
  ERR_15: 'PRICE MUST BE GREATER THAN 0',
  ERR_16: 'TOKEN NOT FOUND',
};

export function getMessage(errorCode: string) {
  return ErrorMessageEnum[errorCode];
}

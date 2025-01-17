export const formatStarknetWallet = (address: any) => {
  if (!address) return '';
  return (
    address.split('x')[0] +
    'x' +
    '0'.repeat(66 - address.length) +
    address.split('x')[1]
  ).toLocaleLowerCase();
};

export const getStartOfWeek = (date = new Date()) => {
  const day = date.getUTCDay();
  const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(date.setUTCDate(diff));
  startOfWeek.setUTCHours(0, 0, 0, 0);
  return startOfWeek.toISOString();
};

export const getNftTypeFromBaseUri = (baseUri: string) => {
  if (!baseUri) return 0;
  const baseUriArr = baseUri.split('/');
  const nftType = Number(baseUriArr[baseUriArr.length - 1]?.split('.')[0]);
  return nftType;
};

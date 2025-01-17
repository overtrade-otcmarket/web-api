export const genKeyRedis = (key: string, dataQuery: any) => {
  let result = `${key}`;
  Object.keys(dataQuery).forEach((key) => {
    result = result + `_${key}:${dataQuery[key]}`;
  });
  return result;
};

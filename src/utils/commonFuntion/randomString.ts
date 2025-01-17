export function generateReferralCode() {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const secondChar = '0123456789';
  let result = 'V';
  const charLength = charset.length;
  result += secondChar.charAt(Math.floor(Math.random() * secondChar.length));
  for (let i = 0; i < 4; ++i) {
    result += charset.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

export function transformString(str: string): string {
  // Biến tất cả các ký tự chữ cái thành viết thường
  let transformedStr = str.toLowerCase();

  // Bỏ dấu
  transformedStr = transformedStr
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Thay đổi khoảng trắng thành dấu '-'
  transformedStr = transformedStr.replace(/\s+/g, '-');

  // Xóa bỏ ký tự đặc biệt
  transformedStr = transformedStr.replace(/[^\w-]/g, '');

  return transformedStr;
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageEnum } from '../enum/ErrorMessageEnum';

const ADMIN_WALLET = [
  '0x0302eb001aabb0f3f740f5098125d461964187d04e67c9560981b8a57617dfb8',
  '0x04ce304015ec24279759a1fd22be8ac23165bc46e0cf704939557e4149be305e',
  '0x007d0ce21377ac81b22f9a4d30213a49793b60e656e971bd762e066387665089',
];

export const uploadFiles = async (
  dataUpload: any,
  collectionAddress: string,
  subData,
  walletAddress,
) => {
  try {
    const { fileToUpload, logo } = dataUpload;

    /// Check fileToUpload
    const arrLen = fileToUpload?.length || 0;
    let maxSize = 0;
    if (arrLen > 50) {
      throw new HttpException(ErrorMessageEnum.ERR_7, HttpStatus.BAD_REQUEST);
    }
    for (let index = 0; index < arrLen; index++) {
      const element = fileToUpload[index];
      maxSize += Number(element.size);
      if (
        element.mimetype != 'image/jpeg' &&
        element.mimetype != 'image/png' &&
        element.mimetype != 'image/svg+xml' &&
        element.mimetype != 'image/webp' &&
        element.mimetype != 'image/gif'
      ) {
        throw new HttpException(
          ErrorMessageEnum.ERR_10,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (!ADMIN_WALLET.includes(walletAddress) && maxSize > 52428800) {
      throw new HttpException(ErrorMessageEnum.ERR_8, HttpStatus.BAD_REQUEST);
    }
    /// Check logo
    if (!ADMIN_WALLET.includes(walletAddress) && logo[0].size > 52428800) {
      throw new HttpException(ErrorMessageEnum.ERR_9, HttpStatus.BAD_REQUEST);
    }

    const dataSubJson = JSON.parse(subData);
    const configAsset = [];
    for (let index = 0; index < dataSubJson.length; index++) {
      const element = dataSubJson[index];
      configAsset.push(Number(element.supply));
    }
    return {
      uri:
        'https://' +
        process.env.MINIO_ENDPOINT +
        ':' +
        process.env.MINIO_PORT +
        '/' +
        process.env.MINIO_BUCKET +
        `/otc/${collectionAddress}/`,
      configAsset,
    };
  } catch (error) {
    console.log(error);

    throw new HttpException(
      error.response || ErrorMessageEnum.ERR_2,
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const uploadSingle = async (dataUpload: any, tokenAddress: string) => {
  try {
    const { logo } = dataUpload;
    /// Check logo
    if (logo[0].size > 52428800) {
      throw new HttpException(ErrorMessageEnum.ERR_9, HttpStatus.BAD_REQUEST);
    }

    const fileMime = logo[0].originalname.slice(
      logo[0].originalname.lastIndexOf('.'),
      logo[0].originalname.length,
    );
    return {
      logo:
        'https://' +
        process.env.MINIO_ENDPOINT +
        ':' +
        process.env.MINIO_PORT +
        '/' +
        process.env.MINIO_BUCKET +
        `/otc/${tokenAddress}/logo` +
        fileMime,
      uri:
        'https://' +
        process.env.MINIO_ENDPOINT +
        ':' +
        process.env.MINIO_PORT +
        '/' +
        process.env.MINIO_BUCKET +
        `/otc/${tokenAddress}/uri.json`,
    };
  } catch (error) {
    console.log(error);

    throw new HttpException(
      error.response || ErrorMessageEnum.ERR_2,
      HttpStatus.BAD_REQUEST,
    );
  }
};

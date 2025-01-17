export const config = {
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_PORT: parseInt(process.env.MINIO_PORT),
  MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY,
  MINIO_SECRETKEY: process.env.MINIO_SECRETKEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET,
};

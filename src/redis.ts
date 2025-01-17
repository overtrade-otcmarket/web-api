import * as redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

export default client;

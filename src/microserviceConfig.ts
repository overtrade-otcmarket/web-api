import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'sol-fun-crawler',
      brokers: [
        '192.168.8.165:9092',
        '192.168.8.166:9092',
        '192.168.8.167:9092',
      ],
    },
    consumer: {
      groupId: 'auth-consumer',
      allowAutoTopicCreation: true,
    },
  },
};

import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
} from 'kafkajs';
import retry from 'async-retry';
import { sleep } from '../utils/commonFuntion/sleep';
import { IConsumer } from './consumer.interface';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    config: ConsumerConfig,
  ) {
    this.kafka = new Kafka({
      brokers: [
        '192.168.8.165:9092',
        '192.168.8.166:9092',
        '192.168.8.167:9092',
      ],
      connectionTimeout: 3000,
      clientId: 'sol-fun-crawler`',
    });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topic}-${config.groupId}`);
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic);
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3...`,
                error,
              ),
          });
        } catch (err) {
          console.log(err);

          this.logger.error(
            'Error consuming message. Adding to dead letter queue...',
            err,
          );
        }
      },
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      // await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}

import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from 'kafkajs';
import { IConsumer } from './consumer.interface';
import { KafkajsConsumer } from './kafkajs.consumer';

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(topic, config);
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}

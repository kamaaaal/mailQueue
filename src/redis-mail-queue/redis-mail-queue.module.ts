import { Module } from '@nestjs/common';
import { RedisMailQueueService } from './redis-mail-queue.service';
import { RedisMailQueueController } from './redis-mail-queue.controller';

@Module({
  providers: [RedisMailQueueService],
  controllers: [RedisMailQueueController]
})
export class RedisMailQueueModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { RedisMailQueueController } from './redis-mail-queue.controller';

describe('RedisMailQueueController', () => {
  let controller: RedisMailQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisMailQueueController],
    }).compile();

    controller = module.get<RedisMailQueueController>(RedisMailQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

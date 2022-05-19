import { Test, TestingModule } from '@nestjs/testing';
import { RedisMailQueueService } from './redis-mail-queue.service';

describe('RedisMailQueueService', () => {
  let service: RedisMailQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisMailQueueService],
    }).compile();

    service = module.get<RedisMailQueueService>(RedisMailQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

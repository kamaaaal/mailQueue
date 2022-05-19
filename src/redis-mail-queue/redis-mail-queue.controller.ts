import { Controller, Get } from '@nestjs/common';
import { RedisMailQueueService } from './redis-mail-queue.service';

@Controller('mailQueue')
export class RedisMailQueueController {
    constructor(private mailService : RedisMailQueueService){}

    @Get('test')
    test(){
        return {msg : 'done'}
    }
}

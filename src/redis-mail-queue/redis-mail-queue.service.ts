import { Injectable } from '@nestjs/common';
import redisMailQueue from 'src/utils/redisMailQueue';
@Injectable()
export class RedisMailQueueService {
    mailQueue : redisMailQueue; 
    constructor(){
        this.mailQueue = new redisMailQueue();
        this.mailQueue.clearQueue();
        this.mailQueue.addMails(['hello','hellow2','hellow3']);
        this.mailQueue.showQueue();
    }
}

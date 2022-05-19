import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerService } from './mailer/mailer.service';
import { MailerController } from './mailer/mailer.controller';
import { RedisMailQueueModule } from './redis-mail-queue/redis-mail-queue.module';

@Module({
  imports: [RedisMailQueueModule],
  controllers: [AppController, MailerController],
  providers: [AppService, MailerService],
})
export class AppModule {}

import { BullModule } from '@nestjs/bullmq';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueueAsync({
      name: 'mail',
    }),
  ],
  providers: [MailService, MailProcessor, Logger],
  exports: [MailService],
})
export class MailModule {}

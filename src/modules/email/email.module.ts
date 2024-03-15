import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports:[],
  providers: [EmailService,LoggerService],
  controllers: [EmailController],
  exports:[EmailService]
})
export class EmailModule {}

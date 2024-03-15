import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

@Module({
  imports:[WinstonModule.forRoot({
    transports: [
      new transports.File({
        filename: 'app.log'
      }),
    ],
  }),],
  providers: [LoggerService],
  exports:[LoggerService]
})
export class LoggerModule {}

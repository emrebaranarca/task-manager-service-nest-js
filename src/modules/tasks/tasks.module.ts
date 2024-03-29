import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService,TaskRepository,LoggerService]
})
export class TasksModule {}

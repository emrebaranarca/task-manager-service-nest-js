import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './modules/tasks/task.entity';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import emailConfig from './config/email.config';
import mainConfig from './config/main.config';




@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal:true,
      load:[databaseConfig,jwtConfig,emailConfig,mainConfig]
    }
  ),TasksModule,TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:async(configService:ConfigService)=>({
      type:"postgres",
      host:configService.get("database.host"),
      port:configService.get("database.port"),
      username:configService.get("database.username"),
      password:configService.get("database.password"),
      database:configService.get("database.database"),
      autoLoadEntities:true,
      synchronize: true,
      logging: true,
      entities: [Task],
      subscribers: [],
      migrations: [],
    })
  }),
  AuthModule,
  LoggerModule],
})


export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRespository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { EmailModule } from '../email/email.module';
import { ConfigService } from '@nestjs/config';


@Module({
  imports:[EmailModule,TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:async(configService:ConfigService)=>({
      secret:configService.get("secret"),
      signOptions:{
        expiresIn:'15m'
      }

    })
  }),PassportModule],
  providers: [AuthService,UserRespository,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

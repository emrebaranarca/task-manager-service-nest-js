import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UserRespository } from './user.repository';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository:UserRespository,private configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("secret"),
    });
  }

  async validate(payload: Payload) {
    const {username}=payload
    const user:User=await this.userRepository.findOneBy({username:username})
    if(!user){
        throw new UnauthorizedException()
    }
    
    return user

  }
}
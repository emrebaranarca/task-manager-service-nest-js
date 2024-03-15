import { Injectable } from '@nestjs/common';
import { UserRespository } from './user.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository:UserRespository){}

    signUp(signUpDto:SignUpDto):Promise<void>{
        return this.userRepository.createUser(signUpDto)
    }

    verifyEmail(verifyEmailDto:VerifyEmailDto):Promise<{message:string}>{
        return this.userRepository.verifyEmail(verifyEmailDto)
    }

    signIn(signInDto:SignInDto):Promise<{accessToken:string}>{
        return this.userRepository.signInUser(signInDto)
    }

}

import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/sign-up')
    signUp(@Body() signUpDto:SignUpDto):Promise<void>{
        return this.authService.signUp(signUpDto)
    }

    @Post('/sign-in')
    signIn(@Body() signInDto:SignInDto):Promise<{accessToken:string}>{
        return this.authService.signIn(signInDto)
    }

    @Get('/verify/:id')
    verifyEmail(@Param() verifyEmailDto:VerifyEmailDto):Promise<{message:string}>{
        return this.authService.verifyEmail(verifyEmailDto)
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    test(@Request() req){
        console.log(req)
    }

}

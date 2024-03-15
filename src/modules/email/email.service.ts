import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class EmailService {
    constructor(private configService:ConfigService,private loggerService:LoggerService){}

    async sendEmail(user:User){
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:this.configService.get("user"),
                pass:this.configService.get("pass")
            }
        })
    
        const mailOptions={
            from:this.configService.get("user"),
            to:user.email,
            subject:"demo",
            html:`<a href="http://127.0.0.1:3000/auth/verify/${user.id} </a>`
        }
    
        try{
            await transporter.sendMail(mailOptions)
            this.loggerService.log("email sent")
        }catch(err){
            this.loggerService.error("email didn't send")
        }
    }


}

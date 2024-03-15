import { EntityRepository, Repository,DataSource } from "typeorm"
import { User } from "./user.entity"
import { SignUpDto } from "./dto/sign-up.dto"
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "./interfaces/jwt-payload.interface";
import { EmailService } from "../email/email.service";
import { VerifyEmailDto } from "./dto/verify-email.dto";

@EntityRepository(User)
export class UserRespository extends Repository<User>{
    constructor(private dataSource:DataSource,private jwtService:JwtService,private emailService:EmailService){
        super(User,dataSource.createEntityManager())
    }

    async createUser(signUpDto:SignUpDto):Promise<void>{
        const {email,password,fullname,username,phone}=signUpDto
        
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)

        const user=this.create(
            {
                email,
                fullname,
                password:hashedPassword,
                username,
                phone,
                verified:false
            }
        )

        try {
            await this.save(user)
            await this.emailService.sendEmail(user)
        } catch (error) {
            if(error.code==23505){
                throw new ConflictException('Username already exists')
            }
            throw new InternalServerErrorException()
        }

        
    }

    async verifyEmail(verifyEmailDto:VerifyEmailDto):Promise<{message:string}> { 
        const { id } = verifyEmailDto;
        const user = await this.findOneBy({ id: id });
        user.verified = true;
        await this.save(user);
        return {message:"succesfull"}
    }

    async signInUser(signInDto:SignInDto):Promise<{accessToken:string}>{
        const {password,username}=signInDto
        const user=await this.findOneBy({username:username})
        if(user){
            if(user.verified==true &&(await bcrypt.compare(password,user.password))){
                const payload:Payload={username}
                const accessToken:string=await this.jwtService.sign(payload)
                return {accessToken}
            }else{
                throw new UnauthorizedException("please firstly email verify and enter correct password")
            }
        }else{
            throw new UnauthorizedException("please firstly register and email verify")
        }
    }

}

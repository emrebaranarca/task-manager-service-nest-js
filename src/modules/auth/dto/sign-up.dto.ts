import { IsEmail,Matches, IsMobilePhone, IsNotEmpty, IsString, MaxLength, MinLength, IsBoolean, isBoolean } from "class-validator"

export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    fullname:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    username:string

    @IsNotEmpty()
    @IsString()
    @IsMobilePhone()
    phone:string

    @IsEmail()
    email:string

    verified:boolean

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
      })
    password:string

}
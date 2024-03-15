import { IsNotEmpty } from "class-validator";

export class VerifyEmailDto {

    @IsNotEmpty()
    id: string;
}



import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUser{
    @IsEmail()
    @IsString()
    @IsOptional()
    email:string


    @IsString()
    @IsOptional()

    password:string
}
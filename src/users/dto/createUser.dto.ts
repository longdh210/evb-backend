import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    citizenId: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;
}
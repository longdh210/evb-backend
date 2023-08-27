import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    represent: string;

    @IsNotEmpty()
    companyName: string;

    @IsNotEmpty()
    companyInfo: string;

    @IsNotEmpty()
    businessInfo: string;

    @IsNotEmpty()
    companyLogo: string;
}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
    @Prop()
    @IsNotEmpty()
    represent: string;

    @Prop()
    @IsNotEmpty()
    companyName: string;

    @Prop()
    @IsNotEmpty()
    companyInfo: string;

    @Prop()
    @IsNotEmpty()
    businessInfo: string;

    @Prop()
    @IsNotEmpty()
    companyLogo: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
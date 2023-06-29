import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    @IsNotEmpty()
    citizenId: string;

    @Prop()
    @IsNotEmpty()
    username: string;

    @Prop()
    @IsNotEmpty()
    password: string;

    @Prop()
    @IsEmail()
    email: string;

    @Prop()
    @IsNotEmpty()
    address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
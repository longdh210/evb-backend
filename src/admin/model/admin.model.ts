import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    address: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
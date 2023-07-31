import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type CitizenInfoDocument = CitizenInfo & Document;

@Schema()
export class CitizenInfo {
    @Prop()
    citizenId: string;

    @Prop()
    name: string;

    @Prop()
    status: boolean
}

export const CitizenInfoSchema = SchemaFactory.createForClass(CitizenInfo);
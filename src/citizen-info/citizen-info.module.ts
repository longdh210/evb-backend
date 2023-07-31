import { Module } from '@nestjs/common';
import { CitizenInfoController } from './citizen-info.controller';
import { CitizenInfoService } from './citizen-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitizenInfoSchema } from './model/citizen-info.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'citizenInfo', schema: CitizenInfoSchema }])],
  controllers: [CitizenInfoController],
  providers: [CitizenInfoService]
})
export class CitizenInfoModule { }

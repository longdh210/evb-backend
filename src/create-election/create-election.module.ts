import { Module } from '@nestjs/common';
import { CreateElectionController } from './create-election.controller';
import { CreateElectionService } from './create-election.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './model/companies.model';

@Module({
    controllers: [CreateElectionController],
    providers: [CreateElectionService],
    imports: [MongooseModule.forFeature([{ name: "company", schema: CompanySchema }])]
})
export class CreateElectionModule { }

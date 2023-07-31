import { Module } from '@nestjs/common';
import { CreateElectionController } from './create-election.controller';
import { CreateElectionService } from './create-election.service';

@Module({
    controllers: [CreateElectionController],
    providers: [CreateElectionService],
    imports: []
})
export class CreateElectionModule { }

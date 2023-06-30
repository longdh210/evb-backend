import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateElectionService } from './create-election.service';

@Controller('create-election')
export class CreateElectionController {
    constructor(private readonly createElectionService: CreateElectionService) { }

    @Post('create')
    create(@Body('superAdmin') chairPersonAddress: string) {
        return this.createElectionService.createElection(chairPersonAddress);
    }

    @Get()
    getAllElection() {
        return this.createElectionService.getListElection();
    }
}

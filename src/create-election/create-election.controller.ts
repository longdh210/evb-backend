import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateElectionService } from './create-election.service';

@Controller('create-election')
export class CreateElectionController {
    constructor(private readonly createElectionService: CreateElectionService) { }

    @Post('create')
    create(@Body('superAdmin') chairPersonAddress: string, @Body('uri') uri: string) {
        return this.createElectionService.createElection(chairPersonAddress, uri);
    }

    @Get()
    getAllElection() {
        return this.createElectionService.getListElection();
    }
}

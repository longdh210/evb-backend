import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PartyService } from './party.service';

@Controller()
export class PartyController {
    constructor(private readonly partyService: PartyService) { }

    @Post('/proposal/vote')
    vote(@Body('ballotContractAddress') ballotContractAddress: string, @Body('partyId') partyId: number, @Body('proposalId') proposalId: number, @Body('signedData') signedData: string) {
        console.log("run", ballotContractAddress, partyId, proposalId, signedData);
        return this.partyService.vote(ballotContractAddress, partyId, proposalId, signedData);
    }

    @Post('/party/add')
    create(@Body('ballotContractAddress') ballotContractAddress: string, @Body('uri') uri: string, @Body('proposalsUri') proposalsUri: string[], @Body('listVoters') listVoters: string[]) {
        return this.partyService.addParty(ballotContractAddress, uri, proposalsUri, listVoters);
    }

    @Get('/party/get-party/:ballotContractAddress/:partyId')
    getPartyById(@Param('ballotContractAddress') ballotContractAddress: string, @Param('partyId') partyId: number) {
        return this.partyService.getPartyById(ballotContractAddress, partyId);
    }

    @Get('/party/list-proposals/:ballotContractAddress/:partyId')
    getListProposals(@Param('ballotContractAddress') ballotContractAddress: string, @Param('partyId') partyId: number) {
        return this.partyService.getListProposalInParty(ballotContractAddress, partyId);
    }

    @Get('/party/:ballotContractAddress')
    getAllParty(@Param('ballotContractAddress') ballotContractAddress: string) {
        return this.partyService.getAllParty(ballotContractAddress);
    }
}
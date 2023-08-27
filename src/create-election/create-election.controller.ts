import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateElectionService } from './create-election.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { Company } from './model/companies.model';

@Controller()
export class CreateElectionController {
    constructor(private readonly createElectionService: CreateElectionService) { }

    @Post('create-election/create')
    create(@Body('superAdmin') chairPersonAddress: string, @Body('uri') uri: string) {
        return this.createElectionService.createElection(chairPersonAddress, uri);
    }

    @Get('create-election')
    getAllElection() {
        return this.createElectionService.getListElection();
    }

    @Post('create-company-info/create')
    async createCompanyInfo(@Body() createCompanyDto: CreateCompanyDto) {
        const result = await this.createElectionService.createCompanyInfo(
            createCompanyDto.represent,
            createCompanyDto.companyName,
            createCompanyDto.companyInfo,
            createCompanyDto.businessInfo,
            createCompanyDto.companyLogo
        );
        return result;
    }

    @Get('list-companies')
    async getAllCompanies(): Promise<Company[]> {
        const result = await this.createElectionService.getAllCompany();
        return result;
    }
}

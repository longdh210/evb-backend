import { Body, Controller, Get, Post } from '@nestjs/common';
import { CitizenInfoService } from './citizen-info.service';

@Controller('citizen-info')
export class CitizenInfoController {
    constructor(private readonly citizenInfoService: CitizenInfoService) { }

    @Get()
    getCitizenInfo(@Body('citizenId') citizenId: string) {
        // return array
        return this.citizenInfoService.getInfoByCitizenId({ citizenId });
    }

    @Post()
    updateInfo(@Body('citizenId') citizenId: string) {
        console.log(citizenId);
        return this.citizenInfoService.updateInfo({ citizenId });
    }

    @Post('create')
    createCitizenInfo() {
        return this.citizenInfoService.createCitizenInfo();
    }
}

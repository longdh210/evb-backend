import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CitizenInfo, CitizenInfoDocument } from './model/citizen-info.model';

@Injectable()
export class CitizenInfoService {
    constructor(@InjectModel('citizenInfo') private readonly citizenInfoModel: Model<CitizenInfoDocument>) { }

    generateString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    async createCitizenInfo() {
        var citizenId = 19521000;
        for (let i = 0; i < 50; i++) {
            var name = this.generateString(5);
            this.citizenInfoModel.create({
                citizenId,
                name,
            })
            citizenId++;
        }
        return true;
    }

    async updateInfo(query: object) {
        return this.citizenInfoModel.updateOne(query, { '$set': { 'status': true } })
    }

    async getInfoByCitizenId(query: object) {
        return this.citizenInfoModel.find(query);
    }
}

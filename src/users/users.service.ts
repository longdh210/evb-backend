import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./model/users.model";
import { CitizenInfoService } from "src/citizen-info/citizen-info.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>, private readonly citizenInfoService: CitizenInfoService) { }
    async createUser(citizenId: string, username: string, password: string, email: string, address: string): Promise<any> {
        // const citizenInfo = await this.citizenInfoService.getInfoByCitizenId({ citizenId });
        // if (citizenInfo.length != 0) {
        // if (citizenInfo[0].status == true) {
        //     return "Citizen id is registered"
        // }
        const userNameExist = await this.getUser({ username });
        // const citizenIdExist = await this.getUser({ citizenId });
        const emailExist = await this.getUser({ email });
        const addressExist = await this.getUser({ address });

        // if (userNameExist) {
        //     return "Username already exists";
        // }
        // // else if (citizenIdExist) {
        // //     return "CitizenId already exists";
        // // } 
        // else if (emailExist) {
        //     return "Email already exists";
        // } else if (addressExist) {
        //     return "Address already exists";
        // }
        // else {
        await this.citizenInfoService.updateInfo({ citizenId });
        await this.userModel.create({
            citizenId,
            username,
            password,
            email,
            address
        });
        return "Signup successfully";
        // }
        // } else {
        //     return "Citizen Id does not exists";
        // }
    }

    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
}

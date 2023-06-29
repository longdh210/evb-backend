import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./model/users.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(citizenId: string, username: string, password: string, email: string, address: string): Promise<any> {
        const userNameExist = await this.getUser({ username });
        const citizenIdExist = await this.getUser({ citizenId });
        const emailExist = await this.getUser({ email });

        if (userNameExist || citizenIdExist || emailExist) {
            return "User already exists";
        } else {
            return this.userModel.create({
                citizenId,
                username,
                password,
                email,
                address
            });
        }
    }

    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
}

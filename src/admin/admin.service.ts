import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Admin, AdminDocument } from "./model/admin.model";

@Injectable()
export class AdminService {
    constructor(@InjectModel('admin') private readonly adminModel: Model<AdminDocument>) { }
    async createUser(username: string, password: string, address: string): Promise<any> {
        return this.adminModel.create({
            username,
            password,
            address
        });
    }

    async getUser(query: object): Promise<Admin> {
        return this.adminModel.findOne(query);
    }

    async getAllUsers(): Promise<Admin[]> {
        return this.adminModel.find();
    }
}

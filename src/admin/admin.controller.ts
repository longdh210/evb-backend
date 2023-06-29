import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Admin } from "./model/admin.model";
import * as bcrypt from 'bcrypt';
import 'dotenv/config'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('/signup')
    async createUser(
        @Body('username') username: string, @Body('password') password: string, @Body('address') address: string): Promise<Admin> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.adminService.createUser(
            username,
            hashedPassword,
            address,
        );
        return result;
    }

    @Get()
    async getAllUsers(): Promise<Admin[]> {
        const result = await this.adminService.getAllUsers();
        return result;
    }
}
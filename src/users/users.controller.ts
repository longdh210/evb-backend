import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./model/users.model";
import * as bcrypt from 'bcrypt';
import 'dotenv/config'
import { CreateUserDto } from "./dto/createUser.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        const result = await this.usersService.createUser(
            createUserDto.citizenId,
            createUserDto.username,
            hashedPassword,
            createUserDto.email,
            createUserDto.address
        );
        return result;
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        const result = await this.usersService.getAllUsers();
        return result;
    }
}
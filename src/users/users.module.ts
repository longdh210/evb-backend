import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./model/users.model";
import { CitizenInfoService } from "src/citizen-info/citizen-info.service";
import { CitizenInfoSchema } from "src/citizen-info/model/citizen-info.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }, { name: "citizenInfo", schema: CitizenInfoSchema }])],
    controllers: [UsersController],
    providers: [UsersService, CitizenInfoService]
})
export class UsersModule { }
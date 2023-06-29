import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./model/users.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }
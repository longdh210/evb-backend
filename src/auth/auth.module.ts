import { Module } from "@nestjs/common"
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "src/users/users.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../users/model/users.model"
import { LocalStrategy } from './local.auth';
import { AdminService } from "src/admin/admin.service";
import { AdminModule } from "src/admin/admin.module";
import { AdminSchema } from "src/admin/model/admin.model";


@Module({
    imports: [UsersModule, AdminModule, PassportModule, JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '60s' },
    }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }, { name: "admin", schema: AdminSchema }])],
    providers: [AuthService, UsersService, AdminService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
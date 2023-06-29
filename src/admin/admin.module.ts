import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminSchema } from "./model/admin.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: "admin", schema: AdminSchema }])],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule { }
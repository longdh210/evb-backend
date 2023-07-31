import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CreateElectionModule } from './create-election/create-election.module';
import { PartyModule } from './party/party.module';
import { CitizenInfoModule } from './citizen-info/citizen-info.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), UsersModule, AuthModule, AdminModule, CreateElectionModule, PartyModule, CitizenInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

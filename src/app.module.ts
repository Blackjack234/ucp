import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Report } from './modules/report/entities/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'db.sqlite',
      entities:[User,Report],
      synchronize:true
    }),
    UserModule, 
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

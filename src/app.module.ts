import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [UserModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Report } from './modules/report/entities/report.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserMiddleware } from './modules/user/middlewares/current-user.middleware';
const cookieSession = require('cookie-session')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development '}`
    }),
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject:[ConfigService],
    //   useFactory:(config : ConfigService)=>{
    //     return {
    //       type:'sqlite',
    //       database:config.getOrThrow<string>('DB_NAME'),
    //       entities:[User,Report],
    //       synchronize:true
    //     }
    //   }
    // }),
    // TypeOrmModule.forRoot({
    //   type:'sqlite',
    //   database:'db.sqlite',
    //   entities:[User,Report],
    //   synchronize:true
    // }),
    UserModule, 
    ReportModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true
      })
    }
  ],
})
export class AppModule {

  constructor(private readonly configService:ConfigService){

  }
  configure(consumer : MiddlewareConsumer){
    consumer.apply(cookieSession({
      name: 'session',
      keys: [this.configService.getOrThrow<string>('COOKIE_KEY')],
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    }), CurrentUserMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}

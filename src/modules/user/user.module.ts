import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    CurrentUserMiddleware
  //  { provide:APP_INTERCEPTOR,useClass:CurrentUserInterceptor}
  ],
  exports:[UserService, CurrentUserMiddleware]
})
export class UserModule {

}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe, Session, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUser } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { Serialize } from   '../../interceptor/serialize.interceptor';
@Controller('auth')
@Serialize(UserDto)
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) { }


    @Get('whoami')
    @UseGuards(AuthGuard)
    @UseInterceptors(CurrentUserInterceptor)
    WhoAmI(@CurrentUser() user:User)
    {
        return user
    }

    @Post('signout')
    SignOut(@Session() session:any){
       session.userId = null;
    }

    @Post('signup')
   async createUser(@Body(new ValidationPipe({ transform: true })) body: CreateUserDto,@Session() session:any) {
        console.log(body);

        const user = await this.authService.signup(body.email, body.password);

        session.userId = user.id

        return user
    }

    @Post('signin')
    async signin(@Body(new ValidationPipe({ transform: true })) body: CreateUserDto ,@Session() session:any) {
        const user =  await this.authService.signin(body.email, body.password)

        session.userId = user.id

        return user
    }

    @Get('finduser/:id')
    findOneUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id))
    }



    @Get()
    findUsers(@Query('email') email: string) {

        console.log('request handler is running.');

        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch("/:id")
    async updateUSer(@Body(new ValidationPipe({ transform: true })) body: UpdateUser, @Param('id') id: string) {
        return await this.userService.update(parseInt(id), body)
    }

  
}

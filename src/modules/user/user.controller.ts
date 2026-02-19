import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUser } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
@Controller('auth')
@Serialize(UserDto)
export class UserController {
    constructor(private userService:UserService,private authService : AuthService){}

    @Post('signup')
    createUser(@Body(new ValidationPipe({transform:true})) body:CreateUserDto){
        console.log(body);
        
        return this.authService.signup(body.email,body.password);
    }

    @Post('signin')
    async signin(@Body(new ValidationPipe({transform:true})) body:CreateUserDto){
     return await this.authService.signin(body.email,body.password)
    }

    @Get('/:id')
    findOneUser(@Param('id') id : string){
       return this.userService.findOne(parseInt(id))
    }
    

  
    @Get()
    findUsers(@Query('email') email:string){

        console.log('request handler is running.');
        
     return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string)
    {
     return this.userService.remove(parseInt(id));
    }

    @Patch("/:id")
   async updateUSer(@Body(new ValidationPipe({transform:true})) body:UpdateUser,@Param('id') id:string){
      return await this.userService.update(parseInt(id),body)
    }
}

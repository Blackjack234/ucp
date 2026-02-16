import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUser } from './dtos/update-user.dto';

@Controller('auth')
export class UserController {
    constructor(private userService:UserService){}

    @Post('signup')
    createUser(@Body(new ValidationPipe({transform:true})) body:CreateUserDto){
        console.log(body);
        
        return this.userService.CreateUserDto(body.email,body.password);
    }

    @Get('/:id')
    findOneUser(@Param('id') id : string){
       return this.userService.findOne(parseInt(id))
    }

    @Get()
    findUsers(@Query('email') email:string){
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

import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.enitity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto ){
    return await this.usersService.createUser(body.firstName, body.lastName, body.email, body.location);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string){
    return await this.usersService.find(parseInt(id));
  }

  @Get()
  allUsers(){
    return this.usersService.findAll();
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<User>){
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string){
    return this.usersService.remove(parseInt(id));
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.enitity';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }

  @Get('/count/:id')
  async getCount(@Param('id', ParseUUIDPipe) id: string): Promise<Number> {
    return await this.usersService.count(id);
  }

  @Get('/:id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.find(id);
  }

  @Get()
  allUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return this.usersService.findAll(paginationDto);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}

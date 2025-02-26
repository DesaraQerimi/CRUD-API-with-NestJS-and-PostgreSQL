import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.enitity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  findAll(): Promise<User[]> {
    return this.repo.find({relations: ['tasks']});
  }

  async count(id: string): Promise<Number> {
    const user = await this.repo.findOne({relations: ['tasks'], where: {id}});
    if(!user) throw new NotFoundException ('User not found');
    return user.tasks.length;
  }

  async createUser(newUserInfo: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(newUserInfo.email);
    if(user) throw new BadRequestException('Email in use!')
    const newUser = this.repo.create(newUserInfo);

    return this.repo.save(newUser);
  }

  async find(id: string): Promise<User>{
    const user = await this.repo.findOne({where: {id}});

    if(!user) throw new NotFoundException ('User not found');

    return user;
  }

   findByEmail(email: string){
    const user = this.repo.findOne({where: {email}})
    return user;
  }

  async update(id: string, newData: UpdateUserDto): Promise<User>{
    
    const user = await this.find(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    const updatedUser = { ...user, ...newData };

    return this.repo.save(updatedUser);
  }

  async remove(id: string){
    const user = await this.find(id);

    if(!user){
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
  
}

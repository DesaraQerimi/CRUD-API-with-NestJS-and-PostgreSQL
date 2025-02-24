import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.enitity';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  
  
  createUser(firstName: string, lastName: string, email: string, location: string){
    const user = this.repo.create({firstName, lastName, email, location});

    return this.repo.save(user);
  }

  find(id: number){
    const user = this.repo.findOne({where: {id}})
    
    return user;
  }

  async update(id: number, newData: Partial<User>){
    
    const user = await this.find(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    console.log(user, newData)
    Object.assign(user, newData);
    console.log(user)
    return this.repo.save(user);
  }

  async remove(id: number){
    const user = await this.find(id);

    if(!user){
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
  
}

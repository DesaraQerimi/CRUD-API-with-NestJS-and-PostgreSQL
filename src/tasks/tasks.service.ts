import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>, 
    private projectsService: ProjectsService, 
    private usersService: UsersService){}


  async create(title: string, desctription: string, status: string, userId: number, projectId: number){
    const user = await this.usersService.find(userId);
    const project = await this.projectsService.find(projectId);

    const task = this.repo.create({title, desctription, status});
  
    if(!user || !project) throw new NotFoundException('User or project not found');

    task.project = project;
    task.user = user;

    return this.repo.save(task);
  }

  find(id: number){
    return this.repo.findOne({where: {id}});
  }

  async update(id: number, newData: Partial<Task>){
      
    const task = await this.find(id);
    if(!task){
      throw new NotFoundException('task not found');
    }
    console.log(task, newData)
    Object.assign(task, newData);
    console.log(task)
    return this.repo.save(task);
  }
  
  async remove(id: number){
    const task = await this.find(id);
  
    if(!task){
      throw new NotFoundException('task not found');
    }
  
    return this.repo.remove(task);
  }
}

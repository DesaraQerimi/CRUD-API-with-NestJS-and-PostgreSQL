import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { UpdateTaskDto } from './dtos/update-task.dto';


@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>, 
    private projectsService: ProjectsService, 
    private usersService: UsersService){}


  async userTasks(){
    const users = await this.usersService.findAll();
    console.log(users);
    return Promise.all(users.map(async (user) => {
      return {
        userId: user.id,
        tasks: await this.getTasks(user.id),
      };
    }))
    // return await this.repo
    // .createQueryBuilder('task')
    // .leftJoinAndSelect('task.user', 'user')
    // .where('task.status = :status', { status: 'Done' })
    // .select(['user.firstName', 'task.title' ])
    // .orderBy('user.id', 'ASC')
    // .getRawMany();
  }

  getTasks(id: number){
    return this.repo.createQueryBuilder()
    .select('title, Task.projectId')
    .where( 'Task.userId = :id', {id: id})
    .getRawMany();
  } 


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

  async update(id: number, newData: UpdateTaskDto){
      
    const task = await this.find(id);
    if(!task){
      throw new NotFoundException('task not found');
    }
    const updatedTask = {...task, ...newData};
    return this.repo.save(updatedTask);
  }
  
  async remove(id: number){
    const task = await this.find(id);
  
    if(!task){
      throw new NotFoundException('task not found');
    }
  
    return this.repo.remove(task);
  }

  async getUnfinished(){
    return await this.repo.find({ where: {status: 'Pending'} })
  }

  count(id: number){
    return this.repo.createQueryBuilder()
    .select('count(*)')
    .where('Task.status = :status', {status: 'Done'})
    .andWhere( 'Task.userId = :id', {id: id})
    .getRawOne();

  }
}

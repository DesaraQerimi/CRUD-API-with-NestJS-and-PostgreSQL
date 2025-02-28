import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Status, Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { User } from 'src/users/user.enitity';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  // async userTasks(): Promise<{userId: number; tasks: Task[];}[]>{
  //   const users = await this.usersService.findAll();
  //   console.log(users);
  //   return Promise.all(users.map(async (user) => {
  //     return {
  //       userId: user.id,
  //       tasks: await this.getTasks(user.id),
  //     };
  //   }))
  //   // return await this.repo
  //   // .createQueryBuilder('task')
  //   // .leftJoinAndSelect('task.user', 'user')
  //   // .where('task.status = :status', { status: 'Done' })
  //   // .select(['user.firstName', 'task.title' ])
  //   // .orderBy('user.id', 'ASC')
  //   // .getRawMany();
  // }

  async getTasks(id: string): Promise<Task[]> {
    return await this.repo
      .createQueryBuilder()
      .select('title, Task.projectId')
      .where('Task.userId = :id', { id: id })
      .getRawMany();
  }

  async create(createTask: CreateTaskDto): Promise<Task> {
    const user = await this.usersService.find(createTask.userId);
    if (!user) throw new NotFoundException('User not found');
    const project = await this.projectsService.find(createTask.projectId);
    if (!project) throw new NotFoundException('Project not found');

    try {
      const task = this.repo.create({
        ...createTask,
        user: user,
        project: project,
      });

      return this.repo.save(task);
    } catch (err) {
      throw new InternalServerErrorException(
        'Task creation failed',
        err.message,
      );
    }
  }

  async find(id: string): Promise<Task> {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, newData: UpdateTaskDto): Promise<Task> {
    const task = await this.find(id);
    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (newData.userId) {
      const user = await this.usersService.find(newData.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      task.user = user;
    }
    if (newData.projectId) {
      const project = await this.projectsService.find(newData.projectId);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      task.project = project;
    }
    const updatedTask = { ...task, ...newData };
    try {
      return this.repo.save(updatedTask);
    } catch (err) {
      throw new InternalServerErrorException('Task update failed', err);
    }
  }

  async remove(id: string): Promise<Task> {
    const task = await this.find(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    try {
      return this.repo.remove(task);
    } catch (err) {
      throw new InternalServerErrorException('Task deletion failed!', err);
    }
  }

  async getUnfinished(): Promise<Task[]> {
    return await this.repo.find({
      where: { status: In([Status.PENDING, Status.IN_PROGRESS]) },
    });
  }

  async count(id: string): Promise<Number> {
    const count = await this.repo
      .createQueryBuilder()
      .select('count(*)')
      .where('Task.status = :status', { status: 'Done' })
      .andWhere('Task.userId = :id', { id: id })
      .getRawOne();

    return count;
  }
}

import { Post, Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TaskDto } from './dtos/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService ){}

  @Post('/create') 
  @Serialize(TaskDto)
  async createTask(@Body() body: CreateTaskDto){
    return await this.tasksService.create(body.title, body.description, body.status, body.userId, body.projectId)
  }

  @Get('/:id')
  async getTask(@Param('id') id: string){
    return await this.tasksService.find(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<Task>){
    return this.tasksService.update(parseInt(id), body);
  }
  
  @Delete('/:id')
  removeUser(@Param('id') id: string){
    return this.tasksService.remove(parseInt(id));
  }

}

import { Post, Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TaskDto } from './dtos/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService ){}

  @Get('/all')
  async everyUserTask(){
    return await this.tasksService.userTasks();
  }


  @Post('/create') 
  @Serialize(TaskDto)
  async createTask(@Body() body: CreateTaskDto){
    return await this.tasksService.create(body.title, body.description, body.status, body.userId, body.projectId)
  }

  //Get all the users tasks and their project
  @Get('/user/:id')
   getInfo(@Param('id') id: string){
    return this.tasksService.getTasks(parseInt(id));
  }

   //Get all the users tasks and their project
   @Get('/done/:id')
   countTask(@Param('id') id: string){
    return this.tasksService.count(parseInt(id));
  } 
  //Get all unfinished tasks
  @Get('/pending')
  async getPending(){
    return await this.tasksService.getUnfinished();
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

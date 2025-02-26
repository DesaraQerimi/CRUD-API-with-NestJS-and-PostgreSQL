import { Post, Body, Controller, Get, Param, Patch, Delete, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TaskDto } from './dtos/task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService ){}

//   @Get('/all')
//   async everyUserTask(): Promise<{
//     userId: number;
//     tasks: Task[];
// }[]>{
//     return await this.tasksService.userTasks();
//   }


  @Post('/create') 
  @Serialize(TaskDto)
  async createTask(@Body() body: CreateTaskDto): Promise<Task>{
    return await this.tasksService.create(body)
  }

  //Get all the users tasks and their project
  @Get('/user/:id')
   getInfo(@Param('id', ParseUUIDPipe) id: string): Promise<Task[]>{
    return this.tasksService.getTasks(id);
  }

   //Get users completed tasks
   @Get('/done/:id')
   countTask(@Param('id', ParseUUIDPipe) id: string): Promise<Number>{
    return this.tasksService.count(id);
  } 
  //Get all unfinished tasks
  @Get('/uncompleted')
  async getPending(): Promise<Task[]>{
    return await this.tasksService.getUnfinished();
  }

  @Get('/:id')
  async getTask(@Param('id', ParseUUIDPipe) id: string): Promise<Task>{
    return await this.tasksService.find(id);
  }

  @Patch('/:id')
  updateTask(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateTaskDto): Promise<Task>{
    return this.tasksService.update(id, body);
  }
  
  @Delete('/:id')
  removeTask(@Param('id', ParseUUIDPipe) id: string): Promise<Task>{
    return this.tasksService.remove(id);
  }

}

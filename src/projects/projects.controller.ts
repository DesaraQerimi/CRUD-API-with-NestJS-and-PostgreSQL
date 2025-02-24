import { Post, Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService){}

  @Post('/create')
  async createProject(@Body() body: CreateProjectDto){
    return await this.projectsService.create(body.name, body.description);
  }

  @Get('/:id')
  async getProject(@Param('id') id: string){
    return await this.projectsService.find(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<Project>){
    return this.projectsService.update(parseInt(id), body);
  }
  
  @Delete('/:id')
  removeUser(@Param('id') id: string){
    return this.projectsService.remove(parseInt(id));
  }  
}

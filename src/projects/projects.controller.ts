import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('/create')
  async createProject(@Body() body: CreateProjectDto): Promise<Project> {
    return await this.projectsService.create(body);
  }

  @Get('/:id')
  async getProject(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return await this.projectsService.find(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectsService.remove(id);
  }
}

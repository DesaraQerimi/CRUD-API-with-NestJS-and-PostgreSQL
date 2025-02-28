import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>) {}

  create(newProject: CreateProjectDto): Promise<Project> {
    const project = this.repo.create({
      name: newProject.name,
      description: newProject.description,
    });

    return this.repo.save(project);
  }

  async find(id: string): Promise<Project> {
    const project = await this.repo.findOne({ where: { id } });

    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, newData: UpdateProjectDto): Promise<Project> {
    const project = await this.find(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    const updatedProject = { ...project, ...newData };
    return this.repo.save(updatedProject);
  }

  async remove(id: string): Promise<Project> {
    const project = await this.find(id);

    if (!project) {
      throw new NotFoundException('project not found');
    }

    return this.repo.remove(project);
  }
}

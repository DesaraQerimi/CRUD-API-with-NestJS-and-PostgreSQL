import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>){}

  create(name: string, description: string){
    const project = this.repo.create({name, description});

    return this.repo.save(project);
  }

  find(id: number){
    return this.repo.findOne({where: {id}});
  }

  async update(id: number, newData: UpdateProjectDto){
        
    const project = await this.find(id);
    if(!project){
      throw new NotFoundException('project not found');
    }
    const updatedProject = {...project, ...newData}
    return this.repo.save(updatedProject);
  }
    
  async remove(id: number){
    const project = await this.find(id);
    
    if(!project){
      throw new NotFoundException('project not found');
    }
    
    return this.repo.remove(project);
  }
  
}

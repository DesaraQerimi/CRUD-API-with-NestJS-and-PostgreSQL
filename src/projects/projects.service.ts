import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>){}

  create(name: string, desctription: string){
    const project = this.repo.create({name, desctription});

    return this.repo.save(project);
  }

  find(id: number){
    return this.repo.findOne({where: {id}});
  }

  async update(id: number, newData: Partial<Project>){
        
    const project = await this.find(id);
    if(!project){
      throw new NotFoundException('project not found');
    }
    console.log(project, newData)
    Object.assign(project, newData);
    console.log(project)
    return this.repo.save(project);
  }
    
  async remove(id: number){
    const project = await this.find(id);
    
    if(!project){
      throw new NotFoundException('project not found');
    }
    
    return this.repo.remove(project);
  }
  
}

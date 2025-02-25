import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Project } from "src/projects/project.entity";
import { User } from "src/users/user.enitity";
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  upatedAt: Date;

  @ManyToOne(()=> Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(()=> User, (user) => user.tasks)
  user: User;
}
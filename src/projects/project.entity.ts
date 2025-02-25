import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Task } from "../tasks/task.entity";

@Entity()
export class Project{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  upatedAt: Date;

  @OneToMany(()=>Task, (task)=> task.project)
  tasks: Task[];
}
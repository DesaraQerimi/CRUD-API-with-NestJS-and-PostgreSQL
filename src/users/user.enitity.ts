import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "src/tasks/task.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email:string;

  @Column()
  location: string;

  @OneToMany(()=>Task, (task)=> task.user)
  tasks: Task[];
}
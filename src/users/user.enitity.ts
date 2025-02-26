import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "src/tasks/task.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'last_name'})
  lastName: string;

  @Column({unique: true})
  email:string;

  @Column()
  location: string;

  @OneToMany(()=>Task, (task)=> task.user)
  tasks: Task[];
}
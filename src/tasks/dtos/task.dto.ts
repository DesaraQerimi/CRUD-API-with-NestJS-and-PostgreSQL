import { Expose, Transform } from "class-transformer";

export class TaskDto {
  @Expose()
  id:number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: string;

  @Transform(({obj}) => obj.user.id)
  @Expose()
  userId: string;

  @Transform(({obj}) => obj.project.id)
  @Expose()
  projectId: string;
}
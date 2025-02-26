import { IsEnum, IsNumber, IsString, IsUUID } from "class-validator";
import { Status } from "../task.entity";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Status)
  status: Status;

  @IsUUID()
  userId: string;

  @IsUUID()
  projectId: string;
}
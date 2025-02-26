import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Status } from "../task.entity";

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsUUID()
  @IsOptional()
  userId: string;

  @IsUUID()
  @IsOptional()
  projectId: string;
}
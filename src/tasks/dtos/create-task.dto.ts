import { IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  projectId: number;
}
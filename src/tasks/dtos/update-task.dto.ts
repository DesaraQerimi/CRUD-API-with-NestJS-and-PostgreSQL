import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsOptional()
  projectId: number;
}
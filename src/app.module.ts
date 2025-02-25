import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.enitity';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { Task } from './tasks/task.entity';
import { Project } from './projects/project.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [    
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.config`,
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>{
        return {
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: Number(config.get<string>('DB_PORT')),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      entities: [User, Task, Project],
      synchronize: true,
      logging: true,}}
    }),
    UsersModule, TasksModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({whitelist: true})
  }],
})
export class AppModule {}

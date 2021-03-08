import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}

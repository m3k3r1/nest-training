import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  public async findById(id: string): Promise<Task | undefined> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  public async removeTask(id: string): Promise<void> {
    const task = await this.taskRepository.delete(id);

    if (task.affected === 0) {
      throw new NotFoundException();
    }
  }

  public async getTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterTaskDTO);
  }

  public async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async filterTasks({ status, search }: FilterTaskDTO): Promise<Task[]> {
    let task = await this.taskRepository.find();

    if (status) {
      task = await this.taskRepository.find({
        where: { status },
      });
    }
    if (search) {
      task = task.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return task;
  }
  public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDTO);
    return task;
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findById(id);
    task.status = status;
    await task.save();
    return task;
  }
}

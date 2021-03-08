import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { FilterTaskDTO } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public async findById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  public async removeTask(id: string): Promise<void> {
    const task = await this.findById(id);
    if (task) {
      const tasks = this.tasks.filter(task => task.id !== id);
      this.tasks = tasks;
    }
  }

  public async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  public async filterTasks({ status, search }: FilterTaskDTO): Promise<Task[]> {
    let task = await this.findAll();

    if (status) {
      task = task.filter(task => task.status === status);
    }

    if (search) {
      task = task.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return task;
  }

  public async createTask({
    title,
    description,
  }: CreateTaskDTO): Promise<Task> {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findById(id);
    task.status = status;
    return task;
  }
}

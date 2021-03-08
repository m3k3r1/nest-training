import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task: Task = new Task();
    Object.assign(task, createTaskDTO, { status: TaskStatus.OPEN });
    await task.save();
    return task;
  }

  async getTasks({ status, search }: FilterTaskDTO): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }
    if (search) {
      query.andWhere(
        `task.description LIKE :search OR task.title LIKE :search`,
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}

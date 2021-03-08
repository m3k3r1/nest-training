import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly validStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: any) {
    value = value.toLowerCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.validStatus.indexOf(status);
    return index !== -1;
  }
}

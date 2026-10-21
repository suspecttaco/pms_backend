import { Task } from '../domain/task.entity';
import { ITaskRepository } from '../repositories/task_repository.interface';
import { INotificationService } from './notification_service.interface';
import { TaskValidator } from './task_validator';

export class TaskServiceGood {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly notificationService: INotificationService
    ) {}

    async createTask(title: string, userEmail: string): Promise<Task> {
        TaskValidator.validateTitle(title);
        const task = new Task(title);
        await this.taskRepository.save(task);
        await this.notificationService.notifyTaskCreated(task, userEmail);
        return task;
    }
}

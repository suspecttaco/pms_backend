import { Task } from '../domain/task.entity';

export interface INotificationService {
    notifyTaskCreated(task: Task, userEmail: string): Promise<void>;
}

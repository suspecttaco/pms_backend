import { Task } from '../domain/task.entity';

export interface ITaskRepository {
    save(task: Task): Promise<Task>;
    findById(id: string): Promise<Task | null>;
}

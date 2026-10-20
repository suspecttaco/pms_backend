import { Repository } from "typeorm";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";
import { Tasks } from "./tasks_entity";

export class TaskService extends BaseService<Tasks> {
    private dbUtil: DatabaseUtil;
    constructor() {
        const dbutil = new DatabaseUtil();
        const repository: Repository<Tasks> = dbutil.getRepository(Tasks);
        super(repository, 'task_id');
        this.dbUtil = dbutil;
    }

    public async createTask(taskData: Partial<Tasks>, projectId?: string, assignedUserId?: string): Promise<any> {
        const taskRepo = this.dbUtil.getRepository(Tasks);
        const data: any = { ...taskData };
        if (projectId) data.project_id = projectId;
        if (assignedUserId) data.user_id = assignedUserId;
        const task = taskRepo.create(data);
        return await taskRepo.save(task);
    }

    public async updateTaskStatus(taskId: string, status: string): Promise<Tasks | null> {
        const taskRepo = this.dbUtil.getRepository(Tasks);
        const task = await taskRepo.findOneBy({ task_id: taskId });
        if (!task) return null;
        task.status = status as any;
        return await taskRepo.save(task);
    }
}
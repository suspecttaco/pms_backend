import { DatabaseUtil } from './db';
import { Projects } from '../components/projects/projects_entity';
import { Users } from '../components/users/users_entity';

export class ProjectsUtil {
    public static async getProjectMemberEmails(projectId: string): Promise<string[]> {
        const dbUtil = new DatabaseUtil();
        const projectRepo = dbUtil.getRepository(Projects);
        const project = await projectRepo.findOne({
            where: { project_id: projectId }
        });
        if (!project || !project.user_ids || project.user_ids.length === 0) {
            return [];
        }
        const userRepo = dbUtil.getRepository(Users);
        const users = await userRepo.find({ where: project.user_ids.map(id => ({ user_id: id })) as any });
        return users.map((u: any) => u.email).filter((email: any) => email);
    }
}

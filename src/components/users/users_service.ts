import { Repository } from "typeorm";
import { BaseService } from "../../utils/base_service";
import { DatabaseUtil } from "../../utils/db";
import { Users } from "./users_entity";

export class UserService extends BaseService<Users> {
    constructor() {
        const dbutil = new DatabaseUtil();
        const repository: Repository<Users> = dbutil.getRepository(Users);
        super(repository, 'user_id');
    }
}
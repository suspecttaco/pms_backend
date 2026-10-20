import { Repository } from "typeorm";
import { DatabaseUtil } from "../../utils/db";
import { BaseService } from "../../utils/base_service";
import { Comments } from "./comments_entity";

export class CommentService extends BaseService<Comments> {
    constructor() {
        const dbutil = new DatabaseUtil();
        const repository: Repository<Comments> = dbutil.getRepository(Comments);
        super(repository);
    }
}
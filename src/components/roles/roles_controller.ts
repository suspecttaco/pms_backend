import { Request, Response } from "express";
import { Rights } from "../../utils/common";
import { DatabaseUtil } from "../../utils/db";
import { Roles } from "./roles_entity";
import { In } from "typeorm";
import { RoleService } from "./roles_service";
import { hasPermission } from "../../utils/auth_util";

export class RoleUtil {
    public static getAllPermissionsFromRights(): string[] {
        return Object.values(Rights).flatMap((grupo) => grupo.ALL.split(','));
    }

    public static async getAllRightsFromRoles(roleIds: string[]): Promise<string[]> {
        if (!roleIds || roleIds.length === 0) return [];
        const repo = new DatabaseUtil().getRepository(Roles);
        const roles = await repo.find({ where: { role_id: In(roleIds) } });
        const permisos = new Set<string>();
        roles.forEach((r: { rights: string; }) => r.rights.split(',').forEach((p) => permisos.add(p.trim())));
        return [...permisos];
    }
}

export class RoleController {
    public async addHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'add_role')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para crear roles' });
            return;
        }

        const service = new RoleService();
        const result = await service.create(req.body);
        res.status(result.statusCode).json(result);
    }

    public async getAllHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'get_all_roles')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para consultar roles' });
            return;
        }

        const service = new RoleService();
        const result = await service.findAll(req.query);
        res.status(result.statusCode).json(result);
    }

    public async getDetailsHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'get_details_role')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para consultar el rol' });
            return;
        }

        const service = new RoleService();
        const result = await service.findOne(String(req.params.id));
        res.status(result.statusCode).json(result);
    }

    public async updateHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'edit_role')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para editar roles' });
            return;
        }

        const service = new RoleService();
        const result = await service.update(String(req.params.id), req.body);
        res.status(result.statusCode).json(result);
    }

    public async deleteHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'delete_role')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para eliminar roles' });
            return;
        }

        const service = new RoleService();
        const result = await service.delete(String(req.params.id));
        res.status(result.statusCode).json(result);
    }
}
import { Request, Response } from "express";
import { ProjectService } from "./projects_service";
import { hasPermission } from "../../utils/auth_util";

export class ProjectController {
    public async addHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'add_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para crear proyectos' });
            return;
        }

        try {
            const service = new ProjectService();
            const result = await service.create(req.body);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            if (error.code === '23505') {
                res.status(409).json({ statusCode: 409, status: 'error', message: 'Conflicto: Ya existe un proyecto registrado con ese nombre' });
                return;
            }
            res.status(500).json({ statusCode: 500, status: 'error', message: error.message });
        }
    }

    public async getAllHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'get_all_projects')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para consultar proyectos' });
            return;
        }

        const service = new ProjectService();
        const result = await service.findAll(req.query);
        res.status(result.statusCode).json(result);
    }

    public async getDetailsHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'get_details_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para consultar el proyecto' });
            return;
        }

        const service = new ProjectService();
        const result = await service.findOne(String(req.params.id));
        res.status(result.statusCode).json(result);
    }

    public async updateHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'edit_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para editar proyectos' });
            return;
        }

        try {
            const service = new ProjectService();
            const result = await service.update(String(req.params.id), req.body);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            if (error.code === '23505') {
                res.status(409).json({ statusCode: 409, status: 'error', message: 'Conflicto: Ya existe un proyecto registrado con ese nombre' });
                return;
            }
            res.status(500).json({ statusCode: 500, status: 'error', message: error.message });
        }
    }

    public async deleteHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'delete_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para eliminar proyectos' });
            return;
        }

        const service = new ProjectService();
        const result = await service.delete(String(req.params.id));
        res.status(result.statusCode).json(result);
    }

    public async createWithDefaultTask(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'add_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para crear proyectos' });
            return;
        }

        try {
            const ownerId = req.user?.user_id || req.body.ownerId;
            const service = new ProjectService();
            const project = await service.createProjectWithDefaultTask(req.body, ownerId);
            res.status(201).json({
                statusCode: 201,
                status: 'success',
                message: 'Proyecto creado exitosamente con tarea por defecto',
                data: project
            });
        } catch (error: any) {
            if (error.code === '23505') {
                res.status(409).json({ statusCode: 409, status: 'error', message: 'Conflicto: Ya existe un proyecto registrado con ese nombre' });
                return;
            }
            res.status(500).json({ statusCode: 500, status: 'error', message: error.message });
        }
    }
}
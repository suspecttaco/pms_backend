import { Request, Response } from "express";
import { TaskService } from "./tasks_service";
import { hasPermission } from "../../utils/auth_util";

export class TaskController {
    public async addHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'add_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para crear tareas' });
            return;
        }

        try {
            const service = new TaskService();
            const result = await service.create(req.body);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            if (error.code === '23505') {
                res.status(409).json({ statusCode: 409, status: 'error', message: 'Conflicto: Ya existe una tarea registrada con ese nombre' });
                return;
            }
            res.status(500).json({ statusCode: 500, status: 'error', message: error.message });
        }
    }

    public async getAllHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'get_all_tasks')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para consultar tareas' });
            return;
        }

        const service = new TaskService();
        const result = await service.findAll(req.query);
        res.status(result.statusCode).json(result);
    }

    public async getDetailsHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'get_details_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para consultar la tarea' });
            return;
        }

        const service = new TaskService();
        const result = await service.findOne(String(req.params.id));
        res.status(result.statusCode).json(result);
    }

    public async updateHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'edit_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para editar tareas' });
            return;
        }

        try {
            const service = new TaskService();
            const result = await service.update(String(req.params.id), req.body);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            if (error.code === '23505') {
                res.status(409).json({ statusCode: 409, status: 'error', message: 'Conflicto: Ya existe una tarea registrada con ese nombre' });
                return;
            }
            res.status(500).json({ statusCode: 500, status: 'error', message: error.message });
        }
    }

    public async deleteHandler(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'delete_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para eliminar tareas' });
            return;
        }

        const service = new TaskService();
        const result = await service.delete(String(req.params.id));
        res.status(result.statusCode).json(result);
    }

    public async updateStatus(req: Request, res: Response): Promise<void> {
        if (!hasPermission(req.user?.rights, 'edit_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'No tiene permisos para editar tareas' });
            return;
        }

        const service = new TaskService();
        const task = await service.updateTaskStatus(String(req.params.id), req.body.status);
        if (!task) {
            res.status(404).json({ statusCode: 404, status: 'error', message: 'Tarea no encontrada' });
            return;
        }
        res.status(200).json({ statusCode: 200, status: 'success', data: task });
    }
}
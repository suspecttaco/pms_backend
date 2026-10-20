import { Express } from "express";
import { TaskController } from "./tasks_controller";
import { authorize } from "../../utils/auth_util";
import { validate } from "../../utils/validator";
import { body } from "express-validator";

const validTaskInput = [
    body('name').trim().notEmpty().withMessage('El nombre de la tarea es obligatorio')
        .isLength({ min: 3, max: 30 }).withMessage('El nombre debe contener entre 3 y 30 caracteres'),
    body('project_id').notEmpty().withMessage('El proyecto es obligatorio'),
    body('user_id').notEmpty().withMessage('El usuario asignado es obligatorio')
];

export class TaskRoutes {
    private baseEndPoint = '/api/tasks';

    constructor(app: Express) {
        const controller = new TaskController();

        app.route(`${this.baseEndPoint}/:id/status`)
            .put(authorize, controller.updateStatus);

        app.route(this.baseEndPoint)
            .get(authorize, controller.getAllHandler)
            .post(authorize, validate(validTaskInput), controller.addHandler);

        app.route(`${this.baseEndPoint}/:id`)
            .get(authorize, controller.getDetailsHandler)
            .put(authorize, controller.updateHandler)
            .delete(authorize, controller.deleteHandler);
    }
}
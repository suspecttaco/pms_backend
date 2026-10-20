import { Express } from "express";
import { ProjectController } from "./projects_controller";
import { authorize } from "../../utils/auth_util";
import { validate } from "../../utils/validator";
import { body } from "express-validator";

const validProjectInput = [
    body('name').trim().notEmpty().withMessage('El nombre del proyecto es obligatorio')
        .isLength({ min: 3, max: 30 }).withMessage('El nombre debe contener entre 3 y 30 caracteres'),
    body('start_time').optional().isISO8601().withMessage('Fecha de inicio inválida'),
    body('end_time').optional().isISO8601().withMessage('Fecha de finalización inválida')
        .custom((end_time, { req }) => {
            if (end_time && req.body.start_time) {
                if (new Date(end_time) <= new Date(req.body.start_time)) {
                    throw new Error('La fecha de fin debe ser estrictamente posterior a la fecha de inicio');
                }
            }
            return true;
        })
];

export class ProjectRoutes {
    private baseEndPoint = '/api/projects';

    constructor(app: Express) {
        const controller = new ProjectController();

        app.route(`${this.baseEndPoint}/with-default-task`)
            .post(authorize, validate(validProjectInput), controller.createWithDefaultTask);

        app.route(this.baseEndPoint)
            .get(authorize, controller.getAllHandler)
            .post(authorize, validate(validProjectInput), controller.addHandler);

        app.route(`${this.baseEndPoint}/:id`)
            .get(authorize, controller.getDetailsHandler)
            .put(authorize, validate(validProjectInput), controller.updateHandler)
            .delete(authorize, controller.deleteHandler);
    }
}
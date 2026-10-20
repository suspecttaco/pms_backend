export class TaskValidator {
    static validateTitle(title: string): void {
        if (!title || title.length < 3) {
            throw new Error('El título de la tarea debe tener al menos 3 caracteres.');
        }
    }
}

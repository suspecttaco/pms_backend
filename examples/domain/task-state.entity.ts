export interface TaskContext {
    setState(state: TaskState): void;
    getTaskId(): string;
}

export interface TaskState {
    startWork(context: TaskContext): void;
    submitForReview(context: TaskContext): void;
    approve(context: TaskContext): void;
    getStatusName(): string;
}

export class DraftTaskState implements TaskState {
    startWork(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Iniciando desarrollo.`);
        context.setState(new InProgressTaskState());
    }
    submitForReview(context: TaskContext): void {
        console.log(`[PMS] No es posible enviar a revisión desde estado Draft.`);
    }
    approve(context: TaskContext): void {
        console.log(`[PMS] No es posible aprobar desde estado Draft.`);
    }
    getStatusName(): string {
        return 'Draft';
    }
}

export class InProgressTaskState implements TaskState {
    startWork(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Ya se encuentra en progreso.`);
    }
    submitForReview(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Enviada a revisión QA.`);
        context.setState(new ReviewTaskState());
    }
    approve(context: TaskContext): void {
        console.log(`[PMS] No es posible aprobar sin pasar por revisión.`);
    }
    getStatusName(): string {
        return 'InProgress';
    }
}

export class ReviewTaskState implements TaskState {
    startWork(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Retornada a desarrollo desde revisión.`);
        context.setState(new InProgressTaskState());
    }
    submitForReview(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Ya se encuentra en revisión.`);
    }
    approve(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Aprobada y finalizada.`);
        context.setState(new DoneTaskState());
    }
    getStatusName(): string {
        return 'Review';
    }
}

export class DoneTaskState implements TaskState {
    startWork(context: TaskContext): void {
        console.log(`[PMS] No es posible reiniciar una tarea finalizada.`);
    }
    submitForReview(context: TaskContext): void {
        console.log(`[PMS] No es posible enviar a revisión una tarea finalizada.`);
    }
    approve(context: TaskContext): void {
        console.log(`[PMS] Tarea ${context.getTaskId()}: Ya se encuentra finalizada.`);
    }
    getStatusName(): string {
        return 'Done';
    }
}

export class Task {
    private state: TaskState = new DraftTaskState();
    constructor(private taskId: string) {}
    public setState(state: TaskState): void {
        this.state = state;
    }
    public getTaskId(): string {
        return this.taskId;
    }
    public startWork(): void {
        this.state.startWork(this);
    }
    public submitForReview(): void {
        this.state.submitForReview(this);
    }
    public approve(): void {
        this.state.approve(this);
    }
    public getStatus(): string {
        return this.state.getStatusName();
    }
}

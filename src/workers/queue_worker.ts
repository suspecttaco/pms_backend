import Queue from 'bull';
import { NotificationUtil } from '../utils/notification_util';

export class QueueWorker {
    private static emailQueue = new Queue('emailQueue', 'redis://127.0.0.1:6379');

    constructor() {
        console.log('[OK] Inicializando QueueWorker...');
    }

    public beginProcessing(): void {
        QueueWorker.emailQueue.process(async (job) => {
            try {
                const { to, subject, body } = job.data;
                const success = await NotificationUtil.sendEmail(to, subject, body);
                if (!success) {
                    throw new Error(`Fallo en el transporte SMTP para destinatario: ${to}`);
                }
                console.log(`[OK] Correo enviado exitosamente a: ${to}`);
            } catch (error: any) {
                console.error(`[ERROR] Error procesando trabajo #${job.id}: ${error.message}`);
                throw error;
            }
        });

        QueueWorker.emailQueue.on('failed', async (job, err) => {
            console.warn(`[WARN] Trabajo #${job.id} falló. Intento ${job.attemptsMade} de 3`);
            if (job.attemptsMade < 3) {
                console.log(`[INFO] Reintentando trabajo #${job.id}...`);
                await job.retry();
            } else {
                console.error(`[CRITICAL] Trabajo #${job.id} superó el límite de reintentos.`);
            }
        });
    }
}

import * as nodemailer from 'nodemailer';
import Queue from 'bull';

export class NotificationUtil {
    private static transporter: nodemailer.Transporter;
    private static emailQueue = new Queue('emailQueue', 'redis://127.0.0.1:6379');

    constructor() {
        if (!NotificationUtil.transporter) {
            NotificationUtil.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
        }
    }

    public static async enqueueEmail(to: string, subject: string, body: string): Promise<void> {
        await NotificationUtil.emailQueue.add({
            to,
            subject,
            body
        });
    }

    public static async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
        try {
            const status = await NotificationUtil.transporter.sendMail({
                from: process.env.SMTP_FROM || 'no-reply@pms.com',
                to,
                subject,
                html: body
            });
            return !!status.messageId;
        } catch (error: any) {
            console.error(`[ERROR] Fallo al enviar email => ${error.message}`);
            return false;
        }
    }
}

import * as redis from 'redis';

export class CacheUtil {
    private static client: any = redis.createClient();
    private static isConnected = false;

    constructor() {
        if (!CacheUtil.isConnected) {
            CacheUtil.client.connect().then(() => {
                CacheUtil.isConnected = true;
                console.log('Conectado exitosamente a Redis Server');
            }).catch((err: any) => {
                console.error(`Error al conectar cliente Redis: ${err}`);
            });
        }
    }

    public static async get(cacheName: string, key: string): Promise<any | null> {
        try {
            if (!CacheUtil.isConnected) {
                await CacheUtil.client.connect();
                CacheUtil.isConnected = true;
            }
            const data = await CacheUtil.client.json.get(`${cacheName}:${key}`);
            return data;
        } catch (err) {
            console.error(`Error al obtener clave ${cacheName}:${key} de caché: ${err}`);
            return null;
        }
    }

    public static async set(cacheName: string, key: string, value: any): Promise<void> {
        try {
            if (!CacheUtil.isConnected) {
                await CacheUtil.client.connect();
                CacheUtil.isConnected = true;
            }
            await CacheUtil.client.json.set(`${cacheName}:${key}`, '.', value);
        } catch (err) {
            console.error(`Error al guardar clave ${cacheName}:${key} en caché: ${err}`);
        }
    }

    public static async remove(cacheName: string, key: string): Promise<void> {
        try {
            if (!CacheUtil.isConnected) {
                await CacheUtil.client.connect();
                CacheUtil.isConnected = true;
            }
            await CacheUtil.client.del(`${cacheName}:${key}`);
        } catch (err) {
            console.error(`Error al eliminar clave ${cacheName}:${key} de caché: ${err}`);
        }
    }
}

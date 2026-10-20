export interface IStorageService {
    saveFile(buffer: Buffer, fileName: string): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
}

export class DiskStorageService implements IStorageService {
    private uploadDir: string;

    constructor(uploadDir: string) {
        this.uploadDir = uploadDir;
    }

    async saveFile(buffer: Buffer, fileName: string): Promise<string> {
        const fs = require('fs/promises');
        const path = require('path');
        const destination = path.join(this.uploadDir, fileName);
        await fs.writeFile(destination, buffer);
        return `/uploads/${fileName}`;
    }

    async deleteFile(filePath: string): Promise<void> {
        console.log(`[LocalStorage] Eliminando recurso ${filePath}`);
    }
}

export class S3StorageService implements IStorageService {
    private bucket: string;
    private region: string;

    constructor(bucket: string, region: string) {
        this.bucket = bucket;
        this.region = region;
    }

    async saveFile(buffer: Buffer, fileName: string): Promise<string> {
        console.log(`[CloudStorage] Almacenando ${fileName} en el contenedor ${this.bucket}`);
        return `/cloud-storage/${this.bucket}/${fileName}`;
    }

    async deleteFile(filePath: string): Promise<void> {
        console.log(`[CloudStorage] Removiendo recurso ${filePath}`);
    }
}

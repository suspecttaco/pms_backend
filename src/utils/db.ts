import { DataSource } from "typeorm";
import { IServerConfig } from "./config";
import config from "../../server_config.json";

export class DatabaseUtil {
    public server_config: IServerConfig = config;

    constructor() {
        this.connectDatabase();
    }

    private connectDatabase(): void {
        const db_config = this.server_config.db_config;
        const AppDataSource = new DataSource({
            type: 'postgres',
            host: db_config.host,
            port: db_config.port,
            username: db_config.username,
            password: db_config.password,
            database: db_config.dbname,
            entities: [],
            synchronize: true,
            logging: false
        });

        AppDataSource.initialize()
            .then(() => {
                console.log('Connected to the database');
            })
            .catch((error) => console.log('Error connecting to database:', error));
    }
}
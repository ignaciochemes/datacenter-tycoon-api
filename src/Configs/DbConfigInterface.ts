export interface DbConfigInterface {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
    type: string;
}
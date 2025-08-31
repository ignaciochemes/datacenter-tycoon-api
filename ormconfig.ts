import { DataSource } from 'typeorm';

import * as Dotenv from 'dotenv';
import * as path from 'path';
import * as logger from 'better-console-log-plus';
import { envModelTransformer } from './src/Configs/NestEnvConfig';
import { envFilePathConfiguration } from './src/Configs/EnvFilePathConfig';

const basePath =
    process.platform === 'win32'
        ? process.cwd()
        : process.env.PWD || process.cwd();

logger.info(`Base path: ${basePath}`);
const envData = Dotenv.config({
    path: path.join(basePath, envFilePathConfiguration()),
}).parsed;

logger.info(`DATABASE CONNECTION: ${process.env.DATABASE_HOST}`);

const envs = envModelTransformer(envData);

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: envs.DATABASE.type,
    host: envs.DATABASE.host,
    port: envs.DATABASE.port,
    username: envs.DATABASE.username,
    password: envs.DATABASE.password,
    database: envs.DATABASE.database,
    logging: false,
    synchronize: envs.DATABASE.synchronize,
    migrations: ['src/Migrations/**/*.{ts,js}'],
    entities: ['src/Models/Entities/**/*.{ts,js}'],
});

connectionSource
    .initialize()
    .then(() => logger.info('Connection to database established'))
    .catch((error) => logger.error('TypeORM connection error: ', error));
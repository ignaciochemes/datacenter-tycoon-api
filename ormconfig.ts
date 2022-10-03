import { DataSource } from "typeorm";

const Dotenv = require('dotenv');
const path = require('path');
const NestEnvConfiguration = require('./src/Configs/NestEnvConfig');
const EnvConfiguration = require("./src/Configs/EnvFilePathConfig");

let envData = Dotenv.config({ path: `${path.join(process.env.PWD)}/${EnvConfiguration.envFilePathConfiguration()}` }).parsed
console.log(`\u001b[36mTYPEORM ENVIRONMENT: ${process.env.ETCT}\nDATABASE CONNECTION: ${process.env.PG_HOST}\u001b[39m`);
let envs;
if (process.env.API_VALIDATOR_ENV === 'dev' || process.env.ETCT === 'prod') {
    envs = NestEnvConfiguration.envModelTransformer(process.env);
} else {
    envs = NestEnvConfiguration.envModelTransformer(envData);
}

export const connectionSource: any = new DataSource({
    migrationsTableName: 'migrations',
    type: envs.DATABASE.type,
    host: envs.DATABASE.host,
    port: envs.DATABASE.port,
    username: envs.DATABASE.username,
    password: envs.DATABASE.password,
    database: envs.DATABASE.database,
    logging: false,
    synchronize: envs.DATABASE.synchronize,
    migrations: ["src/Migrations/**/*.{ts,js}"],
    entities: ["src/Models/Entities/**/*.{ts,js}"],
})
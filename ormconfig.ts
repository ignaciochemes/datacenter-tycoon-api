import { DataSource } from "typeorm";

const Dotenv = require('dotenv');
const path = require('path');
const NestEnvConfiguration = require('./src/Configs/NestEnvConfig');
const EnvConfiguration = require("./src/Configs/EnvFilePathConfig");

let envs;

if (process.env.DTCT === "local") {
    let envData = Dotenv.config({ path: `${path.join(process.env.PWD)}/${EnvConfiguration.envFilePathConfiguration()}` }).parsed;
    console.log(`\u001b[36mTYPEORM ENVIRONMENT: ${process.env.DTCT}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}\u001b[39m`);
    envs = NestEnvConfiguration.envModelTransformer(envData);
} else {
    console.log(`\u001b[36mTYPEORM ENVIRONMENT: ${process.env.DTCT}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}\u001b[39m`);
    envs = NestEnvConfiguration.envModelTransformer(process.env);
}

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
    migrations: ["src/Migrations/**/*.{ts,js}"],
    entities: ["src/Models/Entities/**/*.{ts,js}"],
})
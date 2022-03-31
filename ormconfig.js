try {
    const Dotenv = require('dotenv');
    const path = require('path');
    const NestEnvConfiguration = require('./src/Configs/NestEnvConfig');
    const EnvConfiguration = require("./src/Configs/EnvFilePathConfig");
    const { ModulesContainer } = require('@nestjs/core');

    let envData = Dotenv.config({ path: `${path.join(process.env.PWD)}/${EnvConfiguration.envFilePathConfiguration()}` }).parsed
    console.log(`\u001b[36mTYPEORM ENVIRONMENT: ${process.env.ETCT}\nDATABASE CONNECTION: ${envData.DATABASE_HOST}\u001b[39m`);
    let envs = NestEnvConfiguration.envModelTransformer(envData);
    module.exports = {
        ...envs.DATABASE,
        migrations: ["src/Migrations/*.{ts,js}"],
        entities: ["src/Models/Entities/**/*.{ts,js}"],
        cli: {
            entitiesDir: "src/Models/Entities",
            migrationsDir: "src/Migrations"
        }
    };
} catch (error) {
    console.log(error);
    module.exports = {};
}
export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: envs.APP_NAME,
    PORT: Number(envs.PORT) || 30000,
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: Number(envs.DATABASE_PORT) || 3306,
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASS,
        database: envs.DATABASE_NAME,
        type: envs.DATABASE_TYPE,
        synchronize: true,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
});

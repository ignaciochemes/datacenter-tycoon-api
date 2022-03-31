export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: envs.APP_NAME,
    PORT: parseInt(envs.PORT) || 30000,
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: parseInt(envs.DATABASE_PORT, 10) || 5432,
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASS,
        database: envs.DATABASE_NAME,
        type: envs.DATABASE_TYPE,
        synchronize: false,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
});

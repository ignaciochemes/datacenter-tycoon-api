export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: envs.APP_NAME,
    PORT: Number(envs.PORT) || 33000,
    PUBLIC_WEB_BASE_URL: envs.PUBLIC_WEB_BASE_URL,
    FEATURES: {
        EMAIL_INVITES: envs.FEATURE_EMAIL_INVITES === 'true',
    },
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: Number(envs.DATABASE_PORT) || 3307,
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASS,
        database: envs.DATABASE_NAME,
        type: envs.DATABASE_TYPE,
        synchronize: false,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
    RABBITMQ: {
        uri: envs.RABBITMQ_URI,
        connectionInitOptions: {
            wait: envs.RABBITMQ_CONNECTION_WAIT,
        },
        exchanges: [
            {
                name: envs.RABBITMQ_EXCHANGE,
                type: envs.RABBITMQ_EXCHANGE_TYPE,
            },
        ],
        uriOptions: {
            heartbeat: envs.RABBITMQ_HEARTBEAT,
        },
    },
});
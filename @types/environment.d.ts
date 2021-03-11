declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: number;
            APP_URL?: string;
            AWS_ACCESS_KEY_ID: string;
            AWS_SECRET_ACCESS_KEY: string;
            AWS_BUCKET_NAME: string;
            AWS_DEFAULT_REGION: string;
            DATABASE_URL: string;
        }
    }
}

export {};
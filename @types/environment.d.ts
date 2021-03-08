declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: number;
            APP_URL?: string;
        }
    }
}
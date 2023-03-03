declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            db_h: string;
            db_u: string;
            db_p: string;
            db: string;
        }
    }
}

export {};

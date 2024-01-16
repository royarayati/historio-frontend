export {};

declare global {
    interface Window { 
        env: {
            INLAB_API_URL: string;
        }
    }
}
interface ImportMetaEnv {
    readonly VITE_APP_BASE_API: string;
    readonly ENV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

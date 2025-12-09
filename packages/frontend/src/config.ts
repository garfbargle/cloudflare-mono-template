export const config = {
    // Always use the relative /api path.
    // In dev: Vite proxies to localhost:8787
    // In prod: Pages Function binds to the backend worker
    backendOrigin: '/api',
};

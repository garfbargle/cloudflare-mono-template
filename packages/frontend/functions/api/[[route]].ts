/// <reference types="@cloudflare/workers-types" />

interface Env {
    BACKEND: Fetcher;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const url = new URL(context.request.url);
    // Strip '/api' from the pathname to forward to the worker root
    const newPath = url.pathname.replace(/^\/api/, '');

    // Reconstruct the request to the backend
    const newRequest = new Request(newPath + url.search, context.request);

    return context.env.BACKEND.fetch(newRequest);
};

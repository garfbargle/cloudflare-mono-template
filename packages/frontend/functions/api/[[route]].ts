/// <reference types="@cloudflare/workers-types" />

interface Env {
    BACKEND: Fetcher;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const url = new URL(context.request.url);
        // Strip '/api' from the pathname to forward to the worker root
        // Ensure we preserve the query string
        url.pathname = url.pathname.replace(/^\/api/, '');

        // Construct a valid full URL (Origin + New Path)
        // Passing a path-only string to 'new Request' can fail in some environments
        const newRequest = new Request(url.toString(), context.request);

        return await context.env.BACKEND.fetch(newRequest);
    } catch (err) {
        return new Response(JSON.stringify({
            error: 'Pages Function Error',
            message: err instanceof Error ? err.message : String(err),
            stack: err instanceof Error ? err.stack : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

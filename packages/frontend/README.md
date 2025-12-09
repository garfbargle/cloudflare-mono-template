## cloudflare-mono-template-frontend

React + Vite single-page app that powers the cloudflare-mono-template-frontend. The project deploys as a standalone Cloudflare Pages site with Functions for API proxying.

### Local Development

```bash
npm install
npm run dev
```

The Vite dev server runs on [http://localhost:5173](http://localhost:5173). It proxies `/api` requests to the locally running backend worker.

### Architecture

This frontend talks to the backend via **Service Bindings**.

-   **Production**: The Cloudflare Pages Function at `functions/api/[[route]].ts` intercepts requests to `/api/*` and invokes the backend worker directly using the `BACKEND` binding. This happens internally on Cloudflare's network with zero latency overhead and no public internet exposure.
-   **Development**: Vite is configured to proxy `/api` requests to `http://127.0.0.1:8787`.

### Production Build

```bash
npm run build     # Generates dist/
npm run preview   # Optional: preview the production build locally
```

### Cloudflare Deploy

Use the package-local `wrangler.jsonc` to deploy through Cloudflare Pages:

```bash
npm run deploy
```

# Cloudflare Workers Monorepo Template

A structured monorepo template for building full-stack applications on Cloudflare Workers.

## Structure

This monorepo is managed by `npm` workspaces.

- **[packages/backend](./packages/backend)**: A Cloudflare Worker built with Hono.
- **[packages/frontend](./packages/frontend)**: A React application built with Vite and Tailwind CSS.
- **[packages/shared](./packages/shared)**: Shared code (types, constants, utilities) used by both backend and frontend.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    This command starts both the backend (Wrangler) and frontend (Vite) in parallel.
    ```bash
    npm run dev
    ```
    - Backend: http://127.0.0.1:8787
    - Frontend: http://localhost:5173

## Deployment

Deploy the backend and frontend separately.

### Backend

```bash
npm run deploy --workspace @template/backend
```

### Frontend

```bash
npm run deploy --workspace @template/frontend
```

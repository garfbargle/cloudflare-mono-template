## cloudflare-mono-template-frontend

React + Vite single-page app that powers the cloudflare-mono-template-frontend. The project deploys as a standalone Cloudflare Pages site with Functions for API proxying.

### Local Development

```bash
npm install
npm run dev
```

The Vite dev server runs on [http://localhost:5173](http://localhost:5173) by default.

### Production Build

```bash
npm run build     # Generates dist/
npm run preview   # Optional: preview the production build locally
```

### Linting

```bash
npm run lint
```

### Cloudflare Deploy

Use the package-local `wrangler.jsonc` to deploy through Cloudflare Pages:

```bash
npm run deploy
```


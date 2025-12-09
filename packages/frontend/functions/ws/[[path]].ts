import type { Fetcher, PagesFunction } from '@cloudflare/workers-types';

interface Env {
  TABLE_BACKEND: Fetcher;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  return env.TABLE_BACKEND.fetch(request);
};

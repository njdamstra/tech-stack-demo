import type { APIRoute } from 'astro';

export const GET: APIRoute = async (ctx) => {
  const runtimeEnv = (ctx.locals as any)?.runtime?.env as
    | Record<string, string>
    | undefined;
  const env = (runtimeEnv ?? ((globalThis as any).process?.env ?? {})) as Record<string, string>;
  const { APPWRITE_ENDPOINT, APPWRITE_PROJECT } = env;

  const auth = ctx.request.headers.get('authorization') ?? '';
  const jwt = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!jwt) return new Response(JSON.stringify({ error: 'Missing JWT' }), { status: 401 });

  console.log('[api] GET /api/me with JWT header? ', !!jwt);
  const res = await fetch(`${APPWRITE_ENDPOINT}/account`, {
    headers: {
      'X-Appwrite-Project': APPWRITE_PROJECT,
      'X-Appwrite-JWT': jwt,
      'accept': 'application/json'
    }
  });

  const body = await res.text();
  console.log('[api] /api/me status', res.status);
  return new Response(body, {
    status: res.status,
    headers: { 'content-type': 'application/json' }
  });
};


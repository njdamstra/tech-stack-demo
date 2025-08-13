import type { APIRoute } from 'astro';

export const GET: APIRoute = async (ctx) => {
  const { APPWRITE_ENDPOINT, APPWRITE_PROJECT } = ctx.locals.runtime.env;

  const auth = ctx.request.headers.get('authorization') ?? '';
  const jwt = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!jwt) return new Response(JSON.stringify({ error: 'Missing JWT' }), { status: 401 });

  const res = await fetch(`${APPWRITE_ENDPOINT}/account`, {
    headers: {
      'X-Appwrite-Project': APPWRITE_PROJECT,
      'X-Appwrite-JWT': jwt,
      'accept': 'application/json'
    }
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { 'content-type': 'application/json' }
  });
};


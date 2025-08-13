import type { APIRoute } from 'astro';

export const GET: APIRoute = async (ctx) => {
  const runtimeEnv = (ctx.locals as any)?.runtime?.env as
    | Record<string, string>
    | undefined;
  const env = (runtimeEnv ?? ((globalThis as any).process?.env ?? {})) as Record<string, string>;
  const { APPWRITE_ENDPOINT, APPWRITE_PROJECT, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_POSTS_ID } = env;

  const auth = ctx.request.headers.get('authorization') ?? '';
  const jwt = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!jwt) {
    console.log('[posts] GET missing JWT');
    return new Response(JSON.stringify({ error: 'Missing JWT' }), { status: 401 });
  }

  const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${APPWRITE_COLLECTION_POSTS_ID}/documents`;

  console.log('[posts] GET list documents', { url });
  const res = await fetch(url, {
    headers: {
      'X-Appwrite-Project': APPWRITE_PROJECT,
      'X-Appwrite-JWT': jwt,
      'accept': 'application/json'
    }
  });

  const text = await res.text();
  console.log('[posts] GET status', res.status);
  return new Response(text, {
    status: res.status,
    headers: { 'content-type': 'application/json' }
  });
};

export const POST: APIRoute = async (ctx) => {
  const runtimeEnv = (ctx.locals as any)?.runtime?.env as
    | Record<string, string>
    | undefined;
  const env = (runtimeEnv ?? ((globalThis as any).process?.env ?? {})) as Record<string, string>;
  const { APPWRITE_ENDPOINT, APPWRITE_PROJECT, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_POSTS_ID } = env;

  const auth = ctx.request.headers.get('authorization') ?? '';
  const jwt = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!jwt) {
    console.log('[posts] POST missing JWT');
    return new Response(JSON.stringify({ error: 'Missing JWT' }), { status: 401 });
  }

  const body = await ctx.request.json().catch(() => ({}));
  const data = { title: String(body.title ?? 'Untitled') };

  // Fetch current user for per-document permissions
  console.log('[posts] POST create -> fetch /account');
  const meRes = await fetch(`${APPWRITE_ENDPOINT}/account`, {
    headers: {
      'X-Appwrite-Project': APPWRITE_PROJECT,
      'X-Appwrite-JWT': jwt,
      'accept': 'application/json'
    }
  });
  if (!meRes.ok) {
    return new Response(await meRes.text(), { status: meRes.status });
  }
  const me = await meRes.json();
  const userId = me?.$id as string | undefined;

  console.log('[posts] POST create document for user', { userId });
  const res = await fetch(
    `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${APPWRITE_COLLECTION_POSTS_ID}/documents`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Appwrite-Project': APPWRITE_PROJECT,
        'X-Appwrite-JWT': jwt,
        'accept': 'application/json'
      },
      body: JSON.stringify({
        documentId: 'unique()',
        data,
        permissions: userId
          ? [
              `read(\"user:${userId}\")`,
              `write(\"user:${userId}\")`,
              `update(\"user:${userId}\")`,
              `delete(\"user:${userId}\")`
            ]
          : undefined
      })
    }
  );

  const out = await res.text();
  console.log('[posts] POST status', res.status);
  return new Response(out, {
    status: res.status,
    headers: { 'content-type': 'application/json' }
  });
};


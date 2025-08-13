import type { APIRoute } from 'astro';

// Triggers an Appwrite Function execution for "publish" on behalf of the user.
// Requires server env vars and a client JWT in Authorization: Bearer <jwt>.
export const POST: APIRoute = async (ctx) => {
  // Support Cloudflare runtime (deployment) and Node/Vite env (local dev)
  const runtimeEnv = (ctx.locals as any)?.runtime?.env as
    | Record<string, string>
    | undefined;
  const env = (runtimeEnv ?? ((globalThis as any).process?.env ?? {})) as Record<
    string,
    string
  >;

  const {
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT,
    APPWRITE_API_KEY,
    APPWRITE_FUNCTION_PUBLISH_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_POSTS_ID
  } = env;

  if (!APPWRITE_FUNCTION_PUBLISH_ID) {
    return new Response(
      JSON.stringify({ error: 'Missing APPWRITE_FUNCTION_PUBLISH_ID in server env' }),
      { status: 500 }
    );
  }

  const auth = ctx.request.headers.get('authorization') ?? '';
  const jwt = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!jwt) return new Response(JSON.stringify({ error: 'Missing JWT' }), { status: 401 });

  const body = await ctx.request.json().catch(() => ({} as any));

  // Create a function execution via Appwrite REST
  const res = await fetch(
    `${APPWRITE_ENDPOINT}/functions/${APPWRITE_FUNCTION_PUBLISH_ID}/executions`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'X-Appwrite-Project': APPWRITE_PROJECT,
        'X-Appwrite-Key': APPWRITE_API_KEY,
        // Pass user context; function can verify user via JWT if needed
        'X-Appwrite-JWT': jwt
      },
      // Appwrite Executions API accepts `body` (string) and `headers` (object)
      body: JSON.stringify({
        body: JSON.stringify(body),
        headers: {
          'x-appwrite-key': APPWRITE_API_KEY,
          'x-appwrite-endpoint': APPWRITE_ENDPOINT,
          'x-appwrite-project': APPWRITE_PROJECT,
          'x-appwrite-database-id': APPWRITE_DATABASE_ID,
          'x-appwrite-collection-id': APPWRITE_COLLECTION_POSTS_ID
        }
      })
    }
  );

  return new Response(await res.text(), {
    status: res.status,
    headers: { 'content-type': 'application/json' }
  });
};



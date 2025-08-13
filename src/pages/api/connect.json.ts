import type { APIRoute } from 'astro';
import { createAnonymous, currentUser, logout } from '../../server/UserApi';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

/** GET /api/connect.json -> whoami */
export const GET: APIRoute = async ({ locals }) => {
  const secret = locals.session?.get('userSession');
  console.log('[auth] GET /api/connect.json', { hasCookie: !!secret });
  if (!secret) return json({ user: null, loggedIn: false }, 200);

  try {
    const user = await currentUser(secret);
    return json({ user, loggedIn: true });
  } catch (e) {
    console.log('[auth] whoami failed', e);
    return json({ user: null, loggedIn: false, error: 'Not authenticated' }, 401);
  }
};

/** POST /api/connect.json -> anonymous login */
export const POST: APIRoute = async ({ locals }) => {
  const already = locals.session?.get('userSession');
  if (already) {
    const user = await currentUser(already).catch(() => null);
    console.log('[auth] POST connect (already logged in)', { ok: !!user });
    return json({ user, loggedIn: !!user, note: 'Already logged in' });
  }

  const s = await createAnonymous();
  // Fallback: session cookie without explicit expiry (session cookie) if not provided
  const exp = s.expire ? new Date(s.expire as any) : undefined;
  locals.session?.set('userSession', s.secret, { expires: exp });
  console.log('[auth] set cookie userSession', {
    hasSecret: !!s.secret,
    expire: exp?.toISOString()
  });

  const user = await currentUser(s.secret);
  console.log('[auth] POST connect -> currentUser ok', { userId: (user as any)?.$id });
  return json({ user, loggedIn: true });
};

/** DELETE /api/connect.json -> logout */
export const DELETE: APIRoute = async ({ locals }) => {
  const secret = locals.session?.get('userSession');
  console.log('[auth] DELETE /api/connect.json', { hasCookie: !!secret });
  if (secret) await logout(secret);
  locals.session?.destroy();
  return json({ ok: true });
};

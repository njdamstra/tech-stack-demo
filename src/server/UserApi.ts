import { Account } from 'appwrite';
import { getSSRClient } from './getSSRClient';

export type SessionLike = {
  secret: string;
  expire?: string | number | null;
};

/**
 * Create anonymous session (no server key needed).
 * Returns the session secret and optional expiration.
 */
// export async function createAnonymous(): Promise<SessionLike> {
//   const acc = new Account(getSSRClient());
//   const s = await acc.createAnonymousSession();
//   // Appwrite returns `secret` and typically `expire` (string timestamp).
//   console.log('createAnonymousSession result keys:', Object.keys(s as any), (s as any).secret);
//   return { secret: (s as any).secret, expire: (s as any).expire ?? null };
// }

/** Uses the provided session secret to fetch the current user */
export async function currentUser(sessionSecret?: string) {
  const acc = new Account(getSSRClient(sessionSecret));
  return acc.get();
}

/** Quick check — returns boolean */
export async function isLoggedIn(sessionSecret?: string) {
  try {
    await currentUser(sessionSecret);
    return true;
  } catch {
    return false;
  }
}

export async function createAnonymous(): Promise<SessionLike> {
  const endpoint = process.env.APPWRITE_ENDPOINT || (import.meta as any).env?.PUBLIC_APPWRITE_ENDPOINT;
  const project  = process.env.APPWRITE_PROJECT  || (import.meta as any).env?.PUBLIC_APPWRITE_PROJECT;
  const apiKey   = process.env.APPWRITE_API_KEY || 'standard_f98e2f58474c594a73fae04522aeb06aa736513b3d9266fbe1805b291603713410a75c3d0bb06fb55c35c7fa26eeb4fea2bd851bbc3bf00c8dd14f18a9f650d7fcab0d5f2b3446eaf64077f4be7ab5c7f57421aca1ee7401d62602cc991773507b1ef57ad1d46ab1fff5305a9464d7ff23dd4e8412f0e8b32ed5c23094b2f641'; // keep in server env only

  if (!endpoint || !project || !apiKey) {
    throw new Error('Missing APPWRITE_ENDPOINT/APPWRITE_PROJECT/APPWRITE_API_KEY');
  }

  const res = await fetch(`${endpoint.replace(/\/+$/,'')}/account/sessions/anonymous`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      'X-Appwrite-Project': project,
      'X-Appwrite-Key': apiKey
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anonymous session failed: ${res.status} ${text}`);
  }

  const s = await res.json() as any;
  try {
    const secretPreview = (s as any).secret ? `${(s as any).secret.slice(0,4)}...${(s as any).secret.slice(-4)}` : undefined;
    console.log('[auth] anonymous session created', {
      hasSecret: !!(s as any).secret,
      secretPreview,
      expire: s.expire
    });
  } catch {}
  return { secret: s.secret, expire: s.expire ?? null };
}

/** Logout current session (if available) */
export async function logout(sessionSecret?: string) {
  try {
    const acc = new Account(getSSRClient(sessionSecret));
    await acc.deleteSession('current');
  } catch {
    // ignore
  }
}

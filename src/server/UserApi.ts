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
export async function createAnonymous(): Promise<SessionLike> {
  const acc = new Account(getSSRClient());
  const s = await acc.createAnonymousSession();
  // Appwrite returns `secret` and typically `expire` (string timestamp).
  return { secret: (s as any).secret, expire: (s as any).expire ?? null };
}

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

/** Logout current session (if available) */
export async function logout(sessionSecret?: string) {
  try {
    const acc = new Account(getSSRClient(sessionSecret));
    await acc.deleteSession('current');
  } catch {
    // ignore
  }
}

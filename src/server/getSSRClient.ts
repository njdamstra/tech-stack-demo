// src/server/getSSRClient.ts
import { Client } from 'appwrite';

function readEnv(name: string): string {
  const v = (import.meta as any).env?.[name] ?? process.env[name];
  if (!v || typeof v !== 'string' || !v.trim()) {
    throw new Error(`[Config] Missing ${name}. Add it to .env and restart dev server.`);
  }
  return v.trim();
}

function normalizeEndpoint(url: string): string {
  let u = url.trim();
  if (!/^https?:\/\//i.test(u)) {
    throw new Error(`[Config] APPWRITE_ENDPOINT must start with http:// or https:// (got "${u}")`);
  }
  // Appwrite expects /v1
  if (!/\/v1\/?$/i.test(u)) u = u.replace(/\/+$/, '') + '/v1';
  return u;
}

const endpoint = normalizeEndpoint((() => {
  for (const k of ['APPWRITE_ENDPOINT', 'PUBLIC_APPWRITE_ENDPOINT']) {
    const v = (import.meta as any).env?.[k] ?? process.env[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  throw new Error('[Config] Missing APPWRITE_ENDPOINT (or PUBLIC_APPWRITE_ENDPOINT). Add it to .env and restart dev server.');
})());

const projectId = (() => {
  for (const k of ['APPWRITE_PROJECT_ID', 'APPWRITE_PROJECT', 'PUBLIC_APPWRITE_PROJECT']) {
    const v = (import.meta as any).env?.[k] ?? process.env[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  throw new Error('[Config] Missing APPWRITE_PROJECT (APPWRITE_PROJECT_ID or PUBLIC_APPWRITE_PROJECT). Add it to .env and restart dev server.');
})();

export function getSSRClient(sessionSecret?: string) {
  const c = new Client();
  c.setEndpoint(endpoint);
  c.setProject(projectId);
  if (sessionSecret) c.setSession(sessionSecret);
  try {
    const masked = sessionSecret
      ? `${sessionSecret.slice(0, 4)}...${sessionSecret.slice(-4)}`
      : undefined;
    console.log('[auth] getSSRClient', {
      endpoint,
      projectId,
      hasSession: !!sessionSecret,
      sessionPreview: masked
    });
  } catch {}
  return c;
}

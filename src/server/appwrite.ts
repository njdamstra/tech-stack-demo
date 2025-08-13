import { Client, Account } from 'appwrite';

// Prefer PUBLIC_* (vite) and fall back to Node env for SSR
const endpoint =
  (import.meta as any).env?.PUBLIC_APPWRITE_ENDPOINT ||
  (globalThis as any)?.process?.env?.APPWRITE_ENDPOINT ||
  '';
const project =
  (import.meta as any).env?.PUBLIC_APPWRITE_PROJECT ||
  (globalThis as any)?.process?.env?.APPWRITE_PROJECT ||
  '';

export function newClient() {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);

  return client;
}

export function newAccount(client?: Client) {
  const account = new Account(client ?? newClient());
  return account;
}

export function appwrite() {
  const client = newClient();
  const account = newAccount(client);
  return { client, account };
}


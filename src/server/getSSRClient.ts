import { Client } from 'appwrite';
import { newClient } from '../lib/appwrite';

/**
 * Returns a client configured for SSR.
 * If a session secret is provided, attaches it to the client.
 */
export function getSSRClient(sessionSecret?: string) {
  const client: Client = newClient();
  if (sessionSecret) {
    // Appwrite JS SDK supports attaching a session secret for Node env
    client.setSession(sessionSecret);
  }
  return client;
}

import { Client, Account } from 'appwrite';

export function appwrite() {
  const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT);

  return {
    account: new Account(client)
  };
}


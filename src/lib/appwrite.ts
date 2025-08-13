import { Client, Account } from 'appwrite';

const endpoint = import.meta.env.PUBLIC_APPWRITE_ENDPOINT;
const project = import.meta.env.PUBLIC_APPWRITE_PROJECT;

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


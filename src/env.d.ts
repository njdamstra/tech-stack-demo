/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APPWRITE_ENDPOINT: string;
  readonly PUBLIC_APPWRITE_PROJECT: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare runtime bindings for server-side API routes
declare global {
  namespace App {
    interface Locals {
      runtime: {
        env: {
          APPWRITE_ENDPOINT: string;
          APPWRITE_PROJECT: string;
          APPWRITE_DATABASE_ID: string;
          APPWRITE_COLLECTION_POSTS_ID: string;
          APPWRITE_API_KEY: string; // secret (set via wrangler secret)
          APPWRITE_FUNCTION_PUBLISH_ID: string; // deployed Appwrite Function id
        };
      };
    }
  }
}

export {};


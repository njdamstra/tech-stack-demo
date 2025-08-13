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
      session?: {
        get: <T = string>(key: string) => T | undefined;
        set: (key: string, value: string, opts?: { expires?: Date }) => void;
        destroy: () => void;
      };
    }
  }
}

// declare module 'astro:env/server' {
//   interface Env {
//     APPWRITE_ENDPOINT: string;
//     APPWRITE_PROJECT_ID: string;
//     SESSION_COOKIE_NAME?: string;
//     COOKIE_DOMAIN?: string;
//     CROSS_SITE?: 'true' | 'false';
//   }
// }


export {};


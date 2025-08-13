import vue from '@astrojs/vue';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';

export default {
  output: 'server',
  adapter: cloudflare(),
  integrations: [vue()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
};


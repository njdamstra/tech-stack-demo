// import vue from '@astrojs/vue';
// import cloudflare from '@astrojs/cloudflare';
// import { fileURLToPath } from 'node:url';

// export default {
//   output: 'server',
//   adapter: cloudflare(),
//   integrations: [vue()],
//   vite: {
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     }
//   }
// };

import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vue from '@astrojs/vue';
import { fileURLToPath } from 'node:url';

// Node adapter so API routes run SSR in dev and build
export default defineConfig({
  integrations: [vue()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    // helpful if you need to test cross-site locally with two ports
    port: 4321
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});
